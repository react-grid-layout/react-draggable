import { describe, it, expect } from 'vitest';
import { snapToGrid } from '../../lib/utils/positionFns';

describe('positionFns utilities', () => {
  describe('snapToGrid', () => {
    it('should snap to grid values', () => {
      expect(snapToGrid([10, 10], 15, 15)).toEqual([20, 20]);
      expect(snapToGrid([10, 10], 14, 14)).toEqual([10, 10]);
    });

    it('should handle different x and y grid values', () => {
      expect(snapToGrid([5, 10], 12, 12)).toEqual([10, 10]);
      expect(snapToGrid([5, 10], 13, 16)).toEqual([15, 20]);
    });

    it('should handle zero values', () => {
      expect(snapToGrid([10, 10], 0, 0)).toEqual([0, 0]);
    });

    it('should handle negative values', () => {
      // Math.round(-1.5) = -1 in JavaScript (rounds toward +∞)
      expect(snapToGrid([10, 10], -15, -15)).toEqual([-10, -10]);
      expect(snapToGrid([10, 10], -14, -14)).toEqual([-10, -10]);
      expect(snapToGrid([10, 10], -16, -16)).toEqual([-20, -20]);
    });

    it('should snap exactly at grid boundaries', () => {
      expect(snapToGrid([10, 10], 10, 10)).toEqual([10, 10]);
      expect(snapToGrid([10, 10], 20, 20)).toEqual([20, 20]);
    });

    it('should round at midpoint (standard Math.round behavior)', () => {
      // 5 is midpoint for grid of 10, rounds up
      expect(snapToGrid([10, 10], 5, 5)).toEqual([10, 10]);
      // 4 rounds down
      expect(snapToGrid([10, 10], 4, 4)).toEqual([0, 0]);
    });
  });
});
