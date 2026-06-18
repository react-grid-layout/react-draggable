import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  matchesSelector,
  addEvent,
  removeEvent,
  offsetXYFromParent,
  createCSSTransform,
  createSVGTransform,
  getTouch,
  getTouchIdentifier,
  addUserSelectStyles,
  scheduleRemoveUserSelectStyles,
  addClassName,
  removeClassName,
} from '../../lib/utils/domFns';
import browserPrefix, { browserPrefixToKey } from '../../lib/utils/getPrefix';

describe('domFns - additional coverage', () => {
  describe('matchesSelector bail-out branch', () => {
    it('returns false for a node without any matches() implementation', () => {
      // A plain object has no matches/webkitMatchesSelector/etc.
      const fake = {};
      expect(matchesSelector(fake, '.anything')).toBe(false);
    });
  });

  describe('addEvent / removeEvent fallback branches', () => {
    it('uses attachEvent/detachEvent when present', () => {
      const attachEvent = vi.fn();
      const detachEvent = vi.fn();
      const handler = () => {};
      const legacy = { attachEvent, detachEvent };
      addEvent(legacy, 'click', handler);
      expect(attachEvent).toHaveBeenCalledWith('onclick', handler);
      removeEvent(legacy, 'click', handler);
      expect(detachEvent).toHaveBeenCalledWith('onclick', handler);
    });

    it('falls back to on<event> assignment when neither API exists', () => {
      const handler = () => {};
      const ancient = {};
      addEvent(ancient, 'click', handler);
      expect(ancient.onclick).toBe(handler);
      removeEvent(ancient, 'click', handler);
      expect(ancient.onclick).toBe(null);
    });
  });

  describe('offsetXYFromParent', () => {
    it('treats the body offsetParent as origin {0,0}', () => {
      const offsetParent = document.body;
      Object.defineProperty(offsetParent, 'scrollLeft', { configurable: true, value: 0 });
      Object.defineProperty(offsetParent, 'scrollTop', { configurable: true, value: 0 });
      const result = offsetXYFromParent({ clientX: 50, clientY: 60 }, offsetParent, 1);
      expect(result).toEqual({ x: 50, y: 60 });
    });

    it('subtracts the parent rect and adds scroll for non-body parents', () => {
      const offsetParent = document.createElement('div');
      document.body.appendChild(offsetParent);
      Object.defineProperty(offsetParent, 'scrollLeft', { configurable: true, value: 30 });
      Object.defineProperty(offsetParent, 'scrollTop', { configurable: true, value: 40 });
      vi.spyOn(offsetParent, 'getBoundingClientRect').mockReturnValue({ left: 10, top: 20 });
      const result = offsetXYFromParent({ clientX: 100, clientY: 100 }, offsetParent, 1);
      // x = (100 + 30 - 10)/1 = 120 ; y = (100 + 40 - 20)/1 = 120
      expect(result).toEqual({ x: 120, y: 120 });
      document.body.removeChild(offsetParent);
    });

    it('divides by scale', () => {
      const offsetParent = document.body;
      Object.defineProperty(offsetParent, 'scrollLeft', { configurable: true, value: 0 });
      Object.defineProperty(offsetParent, 'scrollTop', { configurable: true, value: 0 });
      const result = offsetXYFromParent({ clientX: 80, clientY: 40 }, offsetParent, 2);
      expect(result).toEqual({ x: 40, y: 20 });
    });
  });

  describe('createCSSTransform', () => {
    it('keys the transform under the browser-prefixed transform property', () => {
      const out = createCSSTransform({ x: 10, y: 20 }, null);
      const key = browserPrefixToKey('transform', browserPrefix);
      expect(out).toEqual({ [key]: 'translate(10px,20px)' });
    });

    it('prepends a positionOffset', () => {
      const out = createCSSTransform({ x: 10, y: 20 }, { x: 5, y: 6 });
      const key = browserPrefixToKey('transform', browserPrefix);
      expect(out[key]).toBe('translate(5px, 6px)translate(10px,20px)');
    });

    it('supports string (percentage) positionOffsets', () => {
      const out = createCSSTransform({ x: 10, y: 20 }, { x: '50%', y: '25%' });
      const key = browserPrefixToKey('transform', browserPrefix);
      expect(out[key]).toBe('translate(50%, 25%)translate(10px,20px)');
    });
  });

  describe('createSVGTransform', () => {
    it('produces a unit-less translate string', () => {
      expect(createSVGTransform({ x: 10, y: 20 }, null)).toBe('translate(10,20)');
    });

    it('prepends a unit-less positionOffset', () => {
      expect(createSVGTransform({ x: 10, y: 20 }, { x: 5, y: 6 })).toBe(
        'translate(5, 6)translate(10,20)'
      );
    });
  });

  describe('getTouch', () => {
    it('finds the touch in targetTouches by identifier', () => {
      const e = {
        targetTouches: [{ identifier: 2, clientX: 1, clientY: 2 }],
        changedTouches: [],
      };
      expect(getTouch(e, 2)).toEqual({ identifier: 2, clientX: 1, clientY: 2 });
    });

    it('falls back to changedTouches', () => {
      const e = {
        targetTouches: [],
        changedTouches: [{ identifier: 9, clientX: 4, clientY: 5 }],
      };
      expect(getTouch(e, 9)).toEqual({ identifier: 9, clientX: 4, clientY: 5 });
    });

    it('returns undefined when no touch matches', () => {
      const e = { targetTouches: [{ identifier: 1 }], changedTouches: [{ identifier: 3 }] };
      expect(getTouch(e, 99)).toBeUndefined();
    });
  });

  describe('getTouchIdentifier', () => {
    it('reads the first targetTouches identifier', () => {
      const e = { targetTouches: [{ identifier: 4 }], changedTouches: [{ identifier: 8 }] };
      expect(getTouchIdentifier(e)).toBe(4);
    });

    it('falls back to changedTouches when targetTouches is empty', () => {
      const e = { targetTouches: [], changedTouches: [{ identifier: 8 }] };
      expect(getTouchIdentifier(e)).toBe(8);
    });

    it('returns undefined when there are no touches', () => {
      expect(getTouchIdentifier({})).toBeUndefined();
      expect(getTouchIdentifier({ targetTouches: [], changedTouches: [] })).toBeUndefined();
    });
  });

  describe('addUserSelectStyles / scheduleRemoveUserSelectStyles', () => {
    afterEach(() => {
      // Clean up the injected style element and body class between tests.
      const styleEl = document.getElementById('react-draggable-style-el');
      if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
      document.body.classList.remove('react-draggable-transparent-selection');
      vi.restoreAllMocks();
    });

    it('is a no-op when doc is null/undefined', () => {
      expect(() => addUserSelectStyles(null)).not.toThrow();
      expect(() => addUserSelectStyles(undefined)).not.toThrow();
      expect(document.getElementById('react-draggable-style-el')).toBe(null);
    });

    it('injects a style element and tags the body once', () => {
      addUserSelectStyles(document);
      const styleEl = document.getElementById('react-draggable-style-el');
      expect(styleEl).not.toBe(null);
      expect(styleEl.tagName).toBe('STYLE');
      expect(styleEl.innerHTML).toContain('react-draggable-transparent-selection');
      expect(
        document.body.classList.contains('react-draggable-transparent-selection')
      ).toBe(true);
    });

    it('does not inject a second style element on repeated calls', () => {
      addUserSelectStyles(document);
      addUserSelectStyles(document);
      const all = document.querySelectorAll('#react-draggable-style-el');
      expect(all.length).toBe(1);
    });

    it('does not set a nonce attribute when none is provided', () => {
      addUserSelectStyles(document);
      const styleEl = document.getElementById('react-draggable-style-el');
      expect(styleEl.hasAttribute('nonce')).toBe(false);
    });

    it('applies an explicit nonce to the injected style element', () => {
      addUserSelectStyles(document, 'abc123');
      const styleEl = document.getElementById('react-draggable-style-el');
      expect(styleEl.getAttribute('nonce')).toBe('abc123');
    });

    it('does not retroactively set a nonce on an already-injected element', () => {
      addUserSelectStyles(document);
      addUserSelectStyles(document, 'abc123');
      const styleEl = document.getElementById('react-draggable-style-el');
      expect(styleEl.hasAttribute('nonce')).toBe(false);
    });

    it('falls back to __webpack_nonce__ when no explicit nonce is passed', () => {
      globalThis.__webpack_nonce__ = 'from-webpack';
      try {
        addUserSelectStyles(document);
        const styleEl = document.getElementById('react-draggable-style-el');
        expect(styleEl.getAttribute('nonce')).toBe('from-webpack');
      } finally {
        delete globalThis.__webpack_nonce__;
      }
    });

    it('prefers an explicit nonce over __webpack_nonce__', () => {
      globalThis.__webpack_nonce__ = 'from-webpack';
      try {
        addUserSelectStyles(document, 'explicit');
        const styleEl = document.getElementById('react-draggable-style-el');
        expect(styleEl.getAttribute('nonce')).toBe('explicit');
      } finally {
        delete globalThis.__webpack_nonce__;
      }
    });

    it('removes the body class via requestAnimationFrame', async () => {
      addUserSelectStyles(document);
      expect(
        document.body.classList.contains('react-draggable-transparent-selection')
      ).toBe(true);

      // Drive the rAF callback synchronously.
      const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
        cb();
        return 1;
      });
      // jsdom getSelection may be undefined; provide a stub so the function runs.
      const getSelectionSpy = vi
        .spyOn(window, 'getSelection')
        .mockReturnValue({ type: 'Range', removeAllRanges: vi.fn() });

      scheduleRemoveUserSelectStyles(document);
      expect(rafSpy).toHaveBeenCalled();
      expect(getSelectionSpy).toHaveBeenCalled();
      expect(
        document.body.classList.contains('react-draggable-transparent-selection')
      ).toBe(false);
    });

    it('is a no-op when scheduling removal with a null doc', () => {
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
        cb();
        return 1;
      });
      expect(() => scheduleRemoveUserSelectStyles(null)).not.toThrow();
    });

    it('does not clear a focused-input Caret selection', () => {
      addUserSelectStyles(document);
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
        cb();
        return 1;
      });
      const removeAllRanges = vi.fn();
      vi.spyOn(window, 'getSelection').mockReturnValue({ type: 'Caret', removeAllRanges });
      scheduleRemoveUserSelectStyles(document);
      // Caret type means we leave the selection alone.
      expect(removeAllRanges).not.toHaveBeenCalled();
    });
  });

  describe('addClassName / removeClassName classList-absent fallback', () => {
    it('adds via string concatenation when classList is unavailable', () => {
      const el = { className: 'existing' };
      addClassName(el, 'foo');
      expect(el.className).toBe('existing foo');
      // Idempotent: does not duplicate.
      addClassName(el, 'foo');
      expect(el.className).toBe('existing foo');
    });

    it('removes via regex when classList is unavailable', () => {
      const el = { className: 'foo bar baz' };
      removeClassName(el, 'bar');
      expect(el.className).not.toContain('bar');
      expect(el.className).toContain('foo');
      expect(el.className).toContain('baz');
    });
  });
});
