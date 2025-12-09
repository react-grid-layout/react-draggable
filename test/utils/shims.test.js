import { describe, it, expect } from 'vitest';
import { findInArray, isFunction, isNum, int, dontSetMe } from '../../lib/utils/shims';

describe('shims utilities', () => {
  describe('findInArray', () => {
    it('should find first element matching callback', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = findInArray(arr, (x) => x > 3);
      expect(result).toBe(4);
    });

    it('should return undefined if no match found', () => {
      const arr = [1, 2, 3];
      const result = findInArray(arr, (x) => x > 10);
      expect(result).toBeUndefined();
    });

    it('should work with objects', () => {
      const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const result = findInArray(arr, (x) => x.id === 2);
      expect(result).toEqual({ id: 2 });
    });

    it('should pass index and array to callback', () => {
      const arr = ['a', 'b', 'c'];
      const result = findInArray(arr, (val, idx, array) => idx === 1 && array.length === 3);
      expect(result).toBe('b');
    });
  });

  describe('isFunction', () => {
    it('should return true for regular functions', () => {
      expect(isFunction(function() {})).toBe(true);
    });

    it('should return true for arrow functions', () => {
      expect(isFunction(() => {})).toBe(true);
    });

    it('should return true for async functions', () => {
      expect(isFunction(async () => {})).toBe(true);
    });

    it('should return false for non-functions', () => {
      expect(isFunction(null)).toBe(false);
      expect(isFunction(undefined)).toBe(false);
      expect(isFunction(42)).toBe(false);
      expect(isFunction('string')).toBe(false);
      expect(isFunction({})).toBe(false);
      expect(isFunction([])).toBe(false);
    });
  });

  describe('isNum', () => {
    it('should return true for valid numbers', () => {
      expect(isNum(0)).toBe(true);
      expect(isNum(42)).toBe(true);
      expect(isNum(-10)).toBe(true);
      expect(isNum(3.14)).toBe(true);
      expect(isNum(Infinity)).toBe(true);
    });

    it('should return false for NaN', () => {
      expect(isNum(NaN)).toBe(false);
    });

    it('should return false for non-numbers', () => {
      expect(isNum(null)).toBe(false);
      expect(isNum(undefined)).toBe(false);
      expect(isNum('42')).toBe(false);
      expect(isNum({})).toBe(false);
    });
  });

  describe('int', () => {
    it('should parse integer strings', () => {
      expect(int('42')).toBe(42);
      expect(int('0')).toBe(0);
      expect(int('-10')).toBe(-10);
    });

    it('should parse pixel values', () => {
      expect(int('10px')).toBe(10);
      expect(int('100em')).toBe(100);
    });

    it('should handle decimal strings by truncating', () => {
      expect(int('3.14')).toBe(3);
      expect(int('99.99')).toBe(99);
    });
  });

  describe('dontSetMe', () => {
    it('should return error when prop is set', () => {
      const props = { className: 'foo' };
      const result = dontSetMe(props, 'className', 'Draggable');
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain('className');
      expect(result.message).toContain('Draggable');
    });

    it('should return undefined when prop is not set', () => {
      const props = {};
      const result = dontSetMe(props, 'className', 'Draggable');
      expect(result).toBeUndefined();
    });

    it('should return undefined for falsy values', () => {
      expect(dontSetMe({ className: null }, 'className', 'Draggable')).toBeUndefined();
      expect(dontSetMe({ className: '' }, 'className', 'Draggable')).toBeUndefined();
      expect(dontSetMe({ className: 0 }, 'className', 'Draggable')).toBeUndefined();
    });
  });
});
