import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getBoundPosition, getControlPosition } from '../../lib/utils/positionFns';

// These tests exercise the bounds-parsing and getControlPosition branches of
// positionFns that the unit suite previously left uncovered. They live in a
// jsdom environment, so we stub the layout primitives (offsetLeft, computed
// styles, getBoundingClientRect) that jsdom does not implement, rather than
// asserting exact pixel math (that lives in test/browser/).

describe('positionFns getBoundPosition', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    vi.restoreAllMocks();
  });

  function makeDraggable(bounds, node) {
    return {
      props: { bounds },
      findDOMNode: () => node,
    };
  }

  it('short-circuits and returns x/y unchanged when bounds is falsy', () => {
    const node = document.createElement('div');
    const draggable = makeDraggable(undefined, node);
    expect(getBoundPosition(draggable, 42, 99)).toEqual([42, 99]);
  });

  it('clamps to object bounds (right/bottom upper limits)', () => {
    const node = document.createElement('div');
    const draggable = makeDraggable({ left: 0, top: 0, right: 100, bottom: 200 }, node);
    expect(getBoundPosition(draggable, 150, 250)).toEqual([100, 200]);
  });

  it('clamps to object bounds (left/top lower limits)', () => {
    const node = document.createElement('div');
    const draggable = makeDraggable({ left: 10, top: 20, right: 100, bottom: 200 }, node);
    expect(getBoundPosition(draggable, -5, -5)).toEqual([10, 20]);
  });

  it('ignores limits that are not numbers (partial bounds object)', () => {
    const node = document.createElement('div');
    // Only a left bound: x is clamped up to 50, but right/top/bottom are ignored.
    const draggable = makeDraggable({ left: 50 }, node);
    expect(getBoundPosition(draggable, 10, 9999)).toEqual([50, 9999]);
    expect(getBoundPosition(draggable, 80, -9999)).toEqual([80, -9999]);
  });

  it('does not mutate the original bounds object (clone)', () => {
    const node = document.createElement('div');
    const bounds = { left: 0, top: 0, right: 100, bottom: 100 };
    const draggable = makeDraggable(bounds, node);
    getBoundPosition(draggable, 200, 200);
    expect(bounds).toEqual({ left: 0, top: 0, right: 100, bottom: 100 });
  });

  it('throws when the node has been unmounted', () => {
    const draggable = makeDraggable({ left: 0 }, null);
    expect(() => getBoundPosition(draggable, 0, 0)).toThrow('Unmounted during event');
  });

  describe('string selector bounds', () => {
    // jsdom doesn't compute layout; stub the offset/style primitives so the
    // bounds math runs deterministically through every branch.
    function stubLayout(node, boundNode) {
      Object.defineProperty(node, 'offsetLeft', { configurable: true, value: 5 });
      Object.defineProperty(node, 'offsetTop', { configurable: true, value: 7 });
      Object.defineProperty(node, 'clientWidth', { configurable: true, value: 20 });
      Object.defineProperty(node, 'clientHeight', { configurable: true, value: 20 });
      Object.defineProperty(boundNode, 'clientWidth', { configurable: true, value: 200 });
      Object.defineProperty(boundNode, 'clientHeight', { configurable: true, value: 300 });

      vi.spyOn(window, 'getComputedStyle').mockImplementation((el) => {
        // Return zeroed box metrics for both nodes; specific values don't
        // matter, we only need int()-parseable strings.
        return {
          paddingLeft: '0px', paddingTop: '0px', paddingRight: '0px', paddingBottom: '0px',
          marginLeft: '0px', marginTop: '0px', marginRight: '0px', marginBottom: '0px',
          borderTopWidth: '0px', borderBottomWidth: '0px',
          borderLeftWidth: '0px', borderRightWidth: '0px',
        };
      });
    }

    it('resolves bounds="parent" against the parent node', () => {
      const parent = document.createElement('div');
      const node = document.createElement('div');
      parent.appendChild(node);
      container.appendChild(parent);
      stubLayout(node, parent);

      const draggable = makeDraggable('parent', node);
      // right = innerWidth(200) - outerWidth(20) - offsetLeft(5) = 175
      // bottom = innerHeight(300) - outerHeight(20) - offsetTop(7) = 273
      // left = -offsetLeft(5), top = -offsetTop(7)
      expect(getBoundPosition(draggable, 9999, 9999)).toEqual([175, 273]);
      expect(getBoundPosition(draggable, -9999, -9999)).toEqual([-5, -7]);
    });

    it('resolves bounds via a CSS selector against the root node', () => {
      const boundEl = document.createElement('div');
      boundEl.className = 'bound-box';
      const node = document.createElement('div');
      container.appendChild(boundEl);
      container.appendChild(node);
      stubLayout(node, boundEl);

      const draggable = makeDraggable('.bound-box', node);
      const [x, y] = getBoundPosition(draggable, 9999, 9999);
      expect(x).toBe(175);
      expect(y).toBe(273);
    });

    it('throws a descriptive error when the selector matches nothing', () => {
      const node = document.createElement('div');
      container.appendChild(node);
      const draggable = makeDraggable('.does-not-exist', node);
      expect(() => getBoundPosition(draggable, 0, 0)).toThrow(
        /Bounds selector ".does-not-exist" could not find an element/
      );
    });
  });
});

describe('positionFns getControlPosition', () => {
  afterEach(() => vi.restoreAllMocks());

  function makeCore(node, { offsetParent, scale = 1 } = {}) {
    return {
      props: { offsetParent, scale },
      findDOMNode: () => node,
    };
  }

  it('returns mouse coords mapped through the document body offsetParent', () => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    const core = makeCore(node, { scale: 1 });
    const evt = { clientX: 120, clientY: 240 };
    // body offsetParent => rect treated as {0,0}, scale 1
    expect(getControlPosition(evt, undefined, core)).toEqual({ x: 120, y: 240 });
    document.body.removeChild(node);
  });

  it('applies scale to the returned coordinates', () => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    const core = makeCore(node, { scale: 2 });
    const evt = { clientX: 120, clientY: 240 };
    expect(getControlPosition(evt, undefined, core)).toEqual({ x: 60, y: 120 });
    document.body.removeChild(node);
  });

  it('honors a user-provided offsetParent and its scroll/rect', () => {
    const node = document.createElement('div');
    const offsetParent = document.createElement('div');
    document.body.appendChild(offsetParent);
    offsetParent.appendChild(node);
    Object.defineProperty(offsetParent, 'scrollLeft', { configurable: true, value: 10 });
    Object.defineProperty(offsetParent, 'scrollTop', { configurable: true, value: 20 });
    vi.spyOn(offsetParent, 'getBoundingClientRect').mockReturnValue({ left: 5, top: 8 });

    const core = makeCore(node, { offsetParent, scale: 1 });
    const evt = { clientX: 100, clientY: 100 };
    // x = (100 + 10 - 5) / 1 = 105 ; y = (100 + 20 - 8) / 1 = 112
    expect(getControlPosition(evt, undefined, core)).toEqual({ x: 105, y: 112 });
    document.body.removeChild(offsetParent);
  });

  it('returns null when a touchIdentifier is given but the touch is absent', () => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    const core = makeCore(node, { scale: 1 });
    const evt = { targetTouches: [], changedTouches: [] };
    expect(getControlPosition(evt, 5, core)).toBe(null);
    document.body.removeChild(node);
  });

  it('reads the matching touch when a touchIdentifier is provided', () => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    const core = makeCore(node, { scale: 1 });
    const evt = {
      targetTouches: [
        { identifier: 0, clientX: 1, clientY: 1 },
        { identifier: 7, clientX: 70, clientY: 90 },
      ],
    };
    expect(getControlPosition(evt, 7, core)).toEqual({ x: 70, y: 90 });
    document.body.removeChild(node);
  });
});
