import React, { useRef, useState } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, cleanup, act } from '@testing-library/react';
import Draggable, { DraggableCore } from '../lib/Draggable';
import { simulateDrag, startDrag, moveDrag, endDrag } from './testUtils';

describe('Draggable', () => {
  afterEach(() => {
    cleanup();
    // Clean up any leftover classes on body
    document.body.className = '';
  });

  describe('default props', () => {
    it('should have sensible defaults', () => {
      // Suppress findDOMNode deprecation warning
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const ref = React.createRef();
      render(
        <Draggable ref={ref}>
          <div />
        </Draggable>
      );

      expect(ref.current.props.axis).toBe('both');
      expect(ref.current.props.bounds).toBe(false);
      expect(ref.current.props.defaultClassName).toBe('react-draggable');
      expect(ref.current.props.defaultClassNameDragging).toBe('react-draggable-dragging');
      expect(ref.current.props.defaultClassNameDragged).toBe('react-draggable-dragged');
      expect(ref.current.props.scale).toBe(1);
      spy.mockRestore();
    });
  });

  describe('rendering', () => {
    it('should render with default class', () => {
      const { container } = render(
        <Draggable>
          <div />
        </Draggable>
      );

      expect(container.firstChild.classList.contains('react-draggable')).toBe(true);
    });

    it('should preserve child className', () => {
      const { container } = render(
        <Draggable>
          <div className="my-class" />
        </Draggable>
      );

      expect(container.firstChild.classList.contains('my-class')).toBe(true);
      expect(container.firstChild.classList.contains('react-draggable')).toBe(true);
    });

    it('should preserve child styles', () => {
      const { container } = render(
        <Draggable>
          <div style={{ color: 'red' }} />
        </Draggable>
      );

      expect(container.firstChild.style.color).toBe('red');
    });

    it('should apply transform style', () => {
      const { container } = render(
        <Draggable>
          <div />
        </Draggable>
      );

      expect(container.firstChild.style.transform).toMatch(/translate\(0px,?\s*0px\)/);
    });

    it('should use custom defaultClassName', () => {
      const { container } = render(
        <Draggable defaultClassName="custom-draggable">
          <div />
        </Draggable>
      );

      expect(container.firstChild.classList.contains('custom-draggable')).toBe(true);
      expect(container.firstChild.classList.contains('react-draggable')).toBe(false);
    });
  });

  describe('dragging classes', () => {
    it('should add dragging class during drag', () => {
      const { container } = render(
        <Draggable>
          <div />
        </Draggable>
      );

      expect(container.firstChild.classList.contains('react-draggable-dragging')).toBe(false);
      act(() => {
        startDrag(container.firstChild, { x: 0, y: 0 });
      });
      expect(container.firstChild.classList.contains('react-draggable-dragging')).toBe(true);
      act(() => {
        endDrag(container.firstChild, { x: 0, y: 0 });
      });
      expect(container.firstChild.classList.contains('react-draggable-dragging')).toBe(false);
    });

    it('should add dragged class after drag', () => {
      const { container } = render(
        <Draggable>
          <div />
        </Draggable>
      );

      expect(container.firstChild.classList.contains('react-draggable-dragged')).toBe(false);
      act(() => {
        simulateDrag(container.firstChild, { from: { x: 0, y: 0 }, to: { x: 100, y: 100 } });
      });
      expect(container.firstChild.classList.contains('react-draggable-dragged')).toBe(true);
    });

    it('should use custom class names', () => {
      const { container } = render(
        <Draggable
          defaultClassName="custom"
          defaultClassNameDragging="custom-dragging"
          defaultClassNameDragged="custom-dragged"
        >
          <div />
        </Draggable>
      );

      act(() => {
        startDrag(container.firstChild, { x: 0, y: 0 });
      });
      expect(container.firstChild.classList.contains('custom-dragging')).toBe(true);
      act(() => {
        endDrag(container.firstChild, { x: 0, y: 0 });
      });
      expect(container.firstChild.classList.contains('custom-dragged')).toBe(true);
    });
  });

  describe('position', () => {
    // Note: Transform updates during drag are tested in browser tests
    // (test/browser/browser.test.js) because jsdom doesn't support
    // coordinate calculations. See 'should update transform on drag' test there.

    it('should respect defaultPosition', () => {
      const { container } = render(
        <Draggable defaultPosition={{ x: 50, y: 50 }}>
          <div />
        </Draggable>
      );

      expect(container.firstChild.style.transform).toMatch(/translate\(50px,?\s*50px\)/);
    });

    it('should use controlled position', () => {
      const { container } = render(
        <Draggable position={{ x: 100, y: 100 }}>
          <div />
        </Draggable>
      );

      expect(container.firstChild.style.transform).toMatch(/translate\(100px,?\s*100px\)/);
    });

    it('should respect positionOffset with numbers', () => {
      const { container } = render(
        <Draggable positionOffset={{ x: 10, y: 20 }}>
          <div />
        </Draggable>
      );

      expect(container.firstChild.style.transform).toContain('translate(10px, 20px)');
    });

    it('should respect positionOffset with percentages', () => {
      const { container } = render(
        <Draggable positionOffset={{ x: '50%', y: '50%' }}>
          <div />
        </Draggable>
      );

      expect(container.firstChild.style.transform).toContain('translate(50%, 50%)');
    });
  });

  describe('axis constraint', () => {
    // Note: Axis constraint tests with actual dragging are in browser tests
    // (test/browser/browser.test.js) because jsdom doesn't support coordinate
    // calculations. See 'should honor x axis constraint' and 'should honor y axis constraint'.

    it('should not move when axis="none"', () => {
      const { container } = render(
        <Draggable axis="none">
          <div />
        </Draggable>
      );

      act(() => {
        startDrag(container.firstChild, { x: 0, y: 0 });
        moveDrag({ x: 100, y: 100 });
        endDrag(container.firstChild, { x: 100, y: 100 });
      });
      expect(container.firstChild.style.transform).toMatch(/translate\(0px,?\s*0px\)/);
    });
  });

  describe('callbacks', () => {
    it('should call onStart when drag starts', () => {
      const onStart = vi.fn();
      const { container } = render(
        <Draggable onStart={onStart}>
          <div />
        </Draggable>
      );

      act(() => {
        startDrag(container.firstChild, { x: 0, y: 0 });
      });
      expect(onStart).toHaveBeenCalledTimes(1);
    });

    // Note: onStop callback test is in browser tests (test/browser/browser.test.js)
    // because jsdom doesn't support coordinate calculations.
    // See 'should call onStop when drag ends' test there.

    it('should cancel drag when onStart returns false', () => {
      const onStart = vi.fn(() => false);
      const onDrag = vi.fn();
      const { container } = render(
        <Draggable onStart={onStart} onDrag={onDrag}>
          <div />
        </Draggable>
      );

      act(() => {
        startDrag(container.firstChild, { x: 0, y: 0 });
        moveDrag({ x: 100, y: 100 });
      });

      expect(onStart).toHaveBeenCalled();
      expect(onDrag).not.toHaveBeenCalled();
    });
  });

  describe('SVG support', () => {
    it('should detect SVG elements', () => {
      const ref = React.createRef();
      render(
        <Draggable ref={ref}>
          <svg />
        </Draggable>
      );

      expect(ref.current.state.isElementSVG).toBe(true);
    });

    it('should not set isElementSVG for non-SVG elements', () => {
      const ref = React.createRef();
      render(
        <Draggable ref={ref}>
          <div />
        </Draggable>
      );

      expect(ref.current.state.isElementSVG).toBe(false);
    });

    it('should set initial transform attribute for SVG', () => {
      const { container } = render(
        <Draggable>
          <svg />
        </Draggable>
      );

      expect(container.firstChild.getAttribute('transform')).toContain('translate(0,0)');
    });
  });

  describe('controlled component', () => {
    it('should respect position prop changes', () => {
      const { container, rerender } = render(
        <Draggable position={{ x: 0, y: 0 }}>
          <div />
        </Draggable>
      );

      expect(container.firstChild.style.transform).toMatch(/translate\(0px,?\s*0px\)/);

      rerender(
        <Draggable position={{ x: 100, y: 100 }}>
          <div />
        </Draggable>
      );

      expect(container.firstChild.style.transform).toMatch(/translate\(100px,?\s*100px\)/);
    });

    it('should revert to controlled position after drag', () => {
      const onStop = vi.fn();
      const { container } = render(
        <Draggable position={{ x: 50, y: 50 }} onStop={onStop}>
          <div />
        </Draggable>
      );

      act(() => {
        simulateDrag(container.firstChild, { from: { x: 50, y: 50 }, to: { x: 150, y: 150 } });
      });

      // After drag ends, should revert to controlled position
      expect(container.firstChild.style.transform).toMatch(/translate\(50px,?\s*50px\)/);
    });
  });

  describe('disabled prop', () => {
    it('should not drag when disabled', () => {
      const onStart = vi.fn();
      const { container } = render(
        <Draggable disabled onStart={onStart}>
          <div />
        </Draggable>
      );

      act(() => {
        startDrag(container.firstChild, { x: 0, y: 0 });
      });
      expect(onStart).not.toHaveBeenCalled();
    });
  });

  describe('validation', () => {
    it('should throw when no children provided', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      let threw = false;
      try {
        render(<Draggable />);
      } catch (e) {
        threw = true;
        // Can throw either React.Children.only error or props access error
        expect(e).toBeDefined();
      }

      expect(threw).toBe(true);
      errorSpy.mockRestore();
    });

    it('should throw when multiple children provided', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      let threw = false;
      try {
        render(
          <Draggable>
            <div>One</div>
            <div>Two</div>
          </Draggable>
        );
      } catch (e) {
        threw = true;
        // Can throw either React.Children.only error or className access error
        expect(e).toBeDefined();
      }

      expect(threw).toBe(true);
      errorSpy.mockRestore();
    });

    it('should warn when setting className on Draggable', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Draggable className="invalid">
          <div />
        </Draggable>
      );

      expect(spy).toHaveBeenCalled();
      // Check that any of the error calls contain 'className'
      const hasClassNameWarning = spy.mock.calls.some(call =>
        call.some(arg => typeof arg === 'string' && arg.includes('className'))
      );
      expect(hasClassNameWarning).toBe(true);
      spy.mockRestore();
    });

    it('should warn when setting style on Draggable', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Draggable style={{ color: 'red' }}>
          <div />
        </Draggable>
      );

      expect(spy).toHaveBeenCalled();
      // Check that any of the error calls contain 'style'
      const hasStyleWarning = spy.mock.calls.some(call =>
        call.some(arg => typeof arg === 'string' && arg.includes('style'))
      );
      expect(hasStyleWarning).toBe(true);
      spy.mockRestore();
    });

    it('should warn when setting transform on Draggable', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Draggable transform="translate(100px, 100px)">
          <div />
        </Draggable>
      );

      expect(spy).toHaveBeenCalled();
      // Check that any of the error calls contain 'transform'
      const hasTransformWarning = spy.mock.calls.some(call =>
        call.some(arg => typeof arg === 'string' && arg.includes('transform'))
      );
      expect(hasTransformWarning).toBe(true);
      spy.mockRestore();
    });
  });
});
