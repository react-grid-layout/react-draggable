import { describe, it, expect } from 'vitest';
import { snapToGrid, canDragX, canDragY, createCoreData, createDraggableData } from '../../lib/utils/positionFns';

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

  describe('canDragX', () => {
    it('should return true for axis "both"', () => {
      const draggable = { props: { axis: 'both' } };
      expect(canDragX(draggable)).toBe(true);
    });

    it('should return true for axis "x"', () => {
      const draggable = { props: { axis: 'x' } };
      expect(canDragX(draggable)).toBe(true);
    });

    it('should return false for axis "y"', () => {
      const draggable = { props: { axis: 'y' } };
      expect(canDragX(draggable)).toBe(false);
    });

    it('should return false for axis "none"', () => {
      const draggable = { props: { axis: 'none' } };
      expect(canDragX(draggable)).toBe(false);
    });
  });

  describe('canDragY', () => {
    it('should return true for axis "both"', () => {
      const draggable = { props: { axis: 'both' } };
      expect(canDragY(draggable)).toBe(true);
    });

    it('should return true for axis "y"', () => {
      const draggable = { props: { axis: 'y' } };
      expect(canDragY(draggable)).toBe(true);
    });

    it('should return false for axis "x"', () => {
      const draggable = { props: { axis: 'x' } };
      expect(canDragY(draggable)).toBe(false);
    });

    it('should return false for axis "none"', () => {
      const draggable = { props: { axis: 'none' } };
      expect(canDragY(draggable)).toBe(false);
    });
  });

  describe('createCoreData', () => {
    const mockNode = document.createElement('div');

    it('should create initial data when lastX/lastY are NaN', () => {
      const draggableCore = {
        lastX: NaN,
        lastY: NaN,
        findDOMNode: () => mockNode
      };
      const data = createCoreData(draggableCore, 100, 200);
      expect(data).toEqual({
        node: mockNode,
        deltaX: 0,
        deltaY: 0,
        lastX: 100,
        lastY: 200,
        x: 100,
        y: 200
      });
    });

    it('should calculate deltas when lastX/lastY are set', () => {
      const draggableCore = {
        lastX: 50,
        lastY: 100,
        findDOMNode: () => mockNode
      };
      const data = createCoreData(draggableCore, 150, 250);
      expect(data).toEqual({
        node: mockNode,
        deltaX: 100,
        deltaY: 150,
        lastX: 50,
        lastY: 100,
        x: 150,
        y: 250
      });
    });

    it('should throw when node is unmounted', () => {
      const draggableCore = {
        lastX: NaN,
        lastY: NaN,
        findDOMNode: () => null
      };
      expect(() => createCoreData(draggableCore, 0, 0)).toThrow('Unmounted during event');
    });
  });

  describe('createDraggableData', () => {
    const mockNode = document.createElement('div');

    it('should create data with scale of 1', () => {
      const draggable = {
        props: { scale: 1 },
        state: { x: 100, y: 200 }
      };
      const coreData = {
        node: mockNode,
        deltaX: 10,
        deltaY: 20,
        lastX: 100,
        lastY: 200,
        x: 110,
        y: 220
      };
      const data = createDraggableData(draggable, coreData);
      expect(data).toEqual({
        node: mockNode,
        x: 110,
        y: 220,
        deltaX: 10,
        deltaY: 20,
        lastX: 100,
        lastY: 200
      });
    });

    it('should apply scale to delta values', () => {
      const draggable = {
        props: { scale: 2 },
        state: { x: 100, y: 200 }
      };
      const coreData = {
        node: mockNode,
        deltaX: 20,
        deltaY: 40,
        lastX: 100,
        lastY: 200,
        x: 120,
        y: 240
      };
      const data = createDraggableData(draggable, coreData);
      expect(data).toEqual({
        node: mockNode,
        x: 110,  // 100 + (20/2)
        y: 220,  // 200 + (40/2)
        deltaX: 10,  // 20/2
        deltaY: 20,  // 40/2
        lastX: 100,
        lastY: 200
      });
    });
  });
});
