import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  matchesSelector,
  matchesSelectorAndParentsTo,
  addEvent,
  removeEvent,
  outerHeight,
  outerWidth,
  innerHeight,
  innerWidth,
  addClassName,
  removeClassName,
  getTranslation,
} from '../../lib/utils/domFns';

describe('domFns utilities', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('matchesSelector', () => {
    it('should match simple class selectors', () => {
      const el = document.createElement('div');
      el.className = 'foo bar';
      expect(matchesSelector(el, '.foo')).toBe(true);
      expect(matchesSelector(el, '.bar')).toBe(true);
      expect(matchesSelector(el, '.baz')).toBe(false);
    });

    it('should match id selectors', () => {
      const el = document.createElement('div');
      el.id = 'test';
      expect(matchesSelector(el, '#test')).toBe(true);
      expect(matchesSelector(el, '#other')).toBe(false);
    });

    it('should match tag selectors', () => {
      const div = document.createElement('div');
      const span = document.createElement('span');
      expect(matchesSelector(div, 'div')).toBe(true);
      expect(matchesSelector(div, 'span')).toBe(false);
      expect(matchesSelector(span, 'span')).toBe(true);
    });
  });

  describe('matchesSelectorAndParentsTo', () => {
    it('should match element itself', () => {
      const el = document.createElement('div');
      el.className = 'target';
      container.appendChild(el);
      expect(matchesSelectorAndParentsTo(el, '.target', container)).toBe(true);
    });

    it('should match parent elements', () => {
      const parent = document.createElement('div');
      parent.className = 'parent';
      const child = document.createElement('span');
      parent.appendChild(child);
      container.appendChild(parent);

      expect(matchesSelectorAndParentsTo(child, '.parent', container)).toBe(true);
    });

    it('should stop at baseNode', () => {
      const outer = document.createElement('div');
      outer.className = 'outer';
      const inner = document.createElement('div');
      const target = document.createElement('span');
      inner.appendChild(target);
      outer.appendChild(inner);
      container.appendChild(outer);

      // Should not match outer because inner is the baseNode
      expect(matchesSelectorAndParentsTo(target, '.outer', inner)).toBe(false);
      // But should match if container is baseNode
      expect(matchesSelectorAndParentsTo(target, '.outer', container)).toBe(true);
    });

    it('should return false when no match', () => {
      const el = document.createElement('div');
      container.appendChild(el);
      expect(matchesSelectorAndParentsTo(el, '.nonexistent', container)).toBe(false);
    });
  });

  describe('addEvent / removeEvent', () => {
    it('should add and remove event listeners', () => {
      const handler = vi.fn();
      const el = document.createElement('div');

      addEvent(el, 'click', handler);
      el.dispatchEvent(new Event('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1);

      removeEvent(el, 'click', handler);
      el.dispatchEvent(new Event('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1); // Still 1, not called again
    });

    it('should handle null elements gracefully', () => {
      const handler = vi.fn();
      expect(() => addEvent(null, 'click', handler)).not.toThrow();
      expect(() => removeEvent(null, 'click', handler)).not.toThrow();
    });
  });

  describe('outerHeight / outerWidth', () => {
    it('should calculate outer dimensions including borders', () => {
      const el = document.createElement('div');
      el.style.width = '100px';
      el.style.height = '100px';
      el.style.borderWidth = '5px';
      el.style.borderStyle = 'solid';
      container.appendChild(el);

      // In jsdom, getBoundingClientRect returns 0s, so we test the function exists
      // Real dimension tests would need a real browser
      expect(typeof outerHeight(el)).toBe('number');
      expect(typeof outerWidth(el)).toBe('number');
    });
  });

  describe('innerHeight / innerWidth', () => {
    it('should calculate inner dimensions excluding padding', () => {
      const el = document.createElement('div');
      el.style.width = '100px';
      el.style.height = '100px';
      el.style.padding = '10px';
      container.appendChild(el);

      expect(typeof innerHeight(el)).toBe('number');
      expect(typeof innerWidth(el)).toBe('number');
    });
  });

  describe('addClassName / removeClassName', () => {
    it('should add class names', () => {
      const el = document.createElement('div');
      addClassName(el, 'foo');
      expect(el.classList.contains('foo')).toBe(true);
    });

    it('should not duplicate class names', () => {
      const el = document.createElement('div');
      addClassName(el, 'foo');
      addClassName(el, 'foo');
      expect(el.className).toBe('foo');
    });

    it('should remove class names', () => {
      const el = document.createElement('div');
      el.className = 'foo bar baz';
      removeClassName(el, 'bar');
      expect(el.classList.contains('foo')).toBe(true);
      expect(el.classList.contains('bar')).toBe(false);
      expect(el.classList.contains('baz')).toBe(true);
    });

    it('should handle removing non-existent classes', () => {
      const el = document.createElement('div');
      el.className = 'foo';
      expect(() => removeClassName(el, 'bar')).not.toThrow();
      expect(el.className).toBe('foo');
    });
  });

  describe('getTranslation', () => {
    it('should create translate string with px suffix', () => {
      const result = getTranslation({ x: 100, y: 200 }, null, 'px');
      expect(result).toBe('translate(100px,200px)');
    });

    it('should create translate string without suffix (for SVG)', () => {
      const result = getTranslation({ x: 100, y: 200 }, null, '');
      expect(result).toBe('translate(100,200)');
    });

    it('should include position offset when provided', () => {
      const result = getTranslation({ x: 100, y: 200 }, { x: 10, y: 20 }, 'px');
      expect(result).toBe('translate(10px, 20px)translate(100px,200px)');
    });

    it('should handle percentage offsets', () => {
      const result = getTranslation({ x: 100, y: 200 }, { x: '10%', y: '20%' }, 'px');
      expect(result).toBe('translate(10%, 20%)translate(100px,200px)');
    });
  });
});
