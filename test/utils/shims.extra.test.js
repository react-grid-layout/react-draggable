import { describe, it, expect } from 'vitest';
import { findInArray, isFunction, isNum, int, dontSetMe } from '../../lib/utils/shims';

describe('shims - additional edge cases', () => {
  describe('findInArray', () => {
    it('returns undefined for an empty array', () => {
      expect(findInArray([], () => true)).toBeUndefined();
    });

    it('works over array-like (TouchList-style) objects with a length', () => {
      const touchListLike = {
        0: { identifier: 1 },
        1: { identifier: 2 },
        length: 2,
      };
      const found = findInArray(touchListLike, (t) => t.identifier === 2);
      expect(found).toEqual({ identifier: 2 });
    });

    it('returns the first match when multiple satisfy the callback', () => {
      expect(findInArray([2, 4, 6], (n) => n % 2 === 0)).toBe(2);
    });

    it('does not return falsy elements even if the callback is truthy at that index', () => {
      // callback uses index so the matched element is 0 (falsy). The function
      // returns array[i] which is 0, NOT undefined — guard this contract.
      expect(findInArray([0, 1], (val, idx) => idx === 0)).toBe(0);
    });
  });

  describe('isFunction', () => {
    it('recognizes class constructors as functions', () => {
      class Foo {}
      expect(isFunction(Foo)).toBe(true);
    });

    it('recognizes generator functions as functions', () => {
      function* gen() {}
      expect(isFunction(gen)).toBe(true);
    });

    it('returns false for boolean values', () => {
      expect(isFunction(true)).toBe(false);
      expect(isFunction(false)).toBe(false);
    });
  });

  describe('isNum', () => {
    it('treats -Infinity as a number', () => {
      expect(isNum(-Infinity)).toBe(true);
    });

    it('returns false for boxed Number objects', () => {
      // typeof new Number(1) === 'object'
      // eslint-disable-next-line no-new-wrappers
      expect(isNum(new Number(1))).toBe(false);
    });

    it('returns false for arrays', () => {
      expect(isNum([1])).toBe(false);
    });
  });

  describe('int', () => {
    it('returns NaN for non-numeric strings', () => {
      expect(Number.isNaN(int('abc'))).toBe(true);
    });

    it('returns NaN for an empty string', () => {
      expect(Number.isNaN(int(''))).toBe(true);
    });

    it('parses leading sign and ignores trailing units', () => {
      expect(int('+15rem')).toBe(15);
      expect(int('-3.9%')).toBe(-3);
    });
  });

  describe('dontSetMe', () => {
    it('flags truthy non-string prop values', () => {
      const err = dontSetMe({ transform: { a: 1 } }, 'transform', 'DraggableCore');
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('transform');
      expect(err.message).toContain('DraggableCore');
    });

    it('returns undefined for an absent prop', () => {
      expect(dontSetMe({}, 'transform', 'DraggableCore')).toBeUndefined();
    });

    it('returns undefined for falsy NaN values', () => {
      expect(dontSetMe({ transform: NaN }, 'transform', 'DraggableCore')).toBeUndefined();
    });
  });
});
