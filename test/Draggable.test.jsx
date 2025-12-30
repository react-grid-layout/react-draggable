import React, { useRef, useState } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, cleanup, act } from '@testing-library/react';
import Draggable, { DraggableCore } from '../lib/Draggable';
import { simulateDrag, startDrag, moveDrag, endDrag } from './testUtils';

// Helper wrapper components that provide nodeRef (required in React 19)
function DraggableWrapper({ children, draggableRef, ...props }) {
  const nodeRef = useRef(null);
  return (
    <Draggable ref={draggableRef} nodeRef={nodeRef} {...props}>
      {React.cloneElement(children, { ref: nodeRef })}
    </Draggable>
  );
}

function DraggableCorWrapper({ children, coreRef, ...props }) {
  const nodeRef = useRef(null);
  return (
    <DraggableCore ref={coreRef} nodeRef={nodeRef} {...props}>
      {React.cloneElement(children, { ref: nodeRef })}
    </DraggableCore>
  );
}

describe('Draggable', () => {
  afterEach(() => {
    cleanup();
    // Clean up any leftover classes on body
    document.body.className = '';
  });

  describe('default props', () => {
    it('should have sensible defaults', () => {
      const draggableRef = React.createRef();
      render(
        <DraggableWrapper draggableRef={draggableRef}>
          <div />
        </DraggableWrapper>
      );

      expect(draggableRef.current.props.axis).toBe('both');
      expect(draggableRef.current.props.bounds).toBe(false);
      expect(draggableRef.current.props.defaultClassName).toBe('react-draggable');
      expect(draggableRef.current.props.defaultClassNameDragging).toBe('react-draggable-dragging');
      expect(draggableRef.current.props.defaultClassNameDragged).toBe('react-draggable-dragged');
      expect(draggableRef.current.props.scale).toBe(1);
    });
  });

  describe('rendering', () => {
    it('should render with default class', () => {
      const { container } = render(
        <DraggableWrapper>
          <div />
        </DraggableWrapper>
      );

      expect(container.firstChild.classList.contains('react-draggable')).toBe(true);
    });

    it('should preserve child className', () => {
      const { container } = render(
        <DraggableWrapper>
          <div className="my-class" />
        </DraggableWrapper>
      );

      expect(container.firstChild.classList.contains('my-class')).toBe(true);
      expect(container.firstChild.classList.contains('react-draggable')).toBe(true);
    });

    it('should preserve child styles', () => {
      const { container } = render(
        <DraggableWrapper>
          <div style={{ color: 'red' }} />
        </DraggableWrapper>
      );

      expect(container.firstChild.style.color).toBe('red');
    });

    it('should apply transform style', () => {
      const { container } = render(
        <DraggableWrapper>
          <div />
        </DraggableWrapper>
      );

      expect(container.firstChild.style.transform).toMatch(/translate\(0px,?\s*0px\)/);
    });

    it('should use custom defaultClassName', () => {
      const { container } = render(
        <DraggableWrapper defaultClassName="custom-draggable">
          <div />
        </DraggableWrapper>
      );

      expect(container.firstChild.classList.contains('custom-draggable')).toBe(true);
      expect(container.firstChild.classList.contains('react-draggable')).toBe(false);
    });
  });

  describe('dragging classes', () => {
    it('should add dragging class during drag', () => {
      const { container } = render(
        <DraggableWrapper>
          <div />
        </DraggableWrapper>
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
        <DraggableWrapper>
          <div />
        </DraggableWrapper>
      );

      expect(container.firstChild.classList.contains('react-draggable-dragged')).toBe(false);
      act(() => {
        simulateDrag(container.firstChild, { from: { x: 0, y: 0 }, to: { x: 100, y: 100 } });
      });
      expect(container.firstChild.classList.contains('react-draggable-dragged')).toBe(true);
    });

    it('should use custom class names', () => {
      const { container } = render(
        <DraggableWrapper
          defaultClassName="custom"
          defaultClassNameDragging="custom-dragging"
          defaultClassNameDragged="custom-dragged"
        >
          <div />
        </DraggableWrapper>
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
        <DraggableWrapper defaultPosition={{ x: 50, y: 50 }}>
          <div />
        </DraggableWrapper>
      );

      expect(container.firstChild.style.transform).toMatch(/translate\(50px,?\s*50px\)/);
    });

    it('should use controlled position', () => {
      const { container } = render(
        <DraggableWrapper position={{ x: 100, y: 100 }}>
          <div />
        </DraggableWrapper>
      );

      expect(container.firstChild.style.transform).toMatch(/translate\(100px,?\s*100px\)/);
    });

    it('should respect positionOffset with numbers', () => {
      const { container } = render(
        <DraggableWrapper positionOffset={{ x: 10, y: 20 }}>
          <div />
        </DraggableWrapper>
      );

      expect(container.firstChild.style.transform).toContain('translate(10px, 20px)');
    });

    it('should respect positionOffset with percentages', () => {
      const { container } = render(
        <DraggableWrapper positionOffset={{ x: '50%', y: '50%' }}>
          <div />
        </DraggableWrapper>
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
        <DraggableWrapper axis="none">
          <div />
        </DraggableWrapper>
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
        <DraggableWrapper onStart={onStart}>
          <div />
        </DraggableWrapper>
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
        <DraggableWrapper onStart={onStart} onDrag={onDrag}>
          <div />
        </DraggableWrapper>
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
      const draggableRef = React.createRef();
      render(
        <DraggableWrapper draggableRef={draggableRef}>
          <svg />
        </DraggableWrapper>
      );

      expect(draggableRef.current.state.isElementSVG).toBe(true);
    });

    it('should not set isElementSVG for non-SVG elements', () => {
      const draggableRef = React.createRef();
      render(
        <DraggableWrapper draggableRef={draggableRef}>
          <div />
        </DraggableWrapper>
      );

      expect(draggableRef.current.state.isElementSVG).toBe(false);
    });

    it('should set initial transform attribute for SVG', () => {
      const { container } = render(
        <DraggableWrapper>
          <svg />
        </DraggableWrapper>
      );

      expect(container.firstChild.getAttribute('transform')).toContain('translate(0,0)');
    });
  });

  describe('controlled component', () => {
    it('should respect position prop changes', () => {
      function ControlledTest() {
        const [position, setPosition] = useState({ x: 0, y: 0 });
        return (
          <>
            <button onClick={() => setPosition({ x: 100, y: 100 })}>Move</button>
            <DraggableWrapper position={position}>
              <div data-testid="draggable" />
            </DraggableWrapper>
          </>
        );
      }

      const { container, getByRole, getByTestId } = render(<ControlledTest />);

      expect(getByTestId('draggable').style.transform).toMatch(/translate\(0px,?\s*0px\)/);

      act(() => {
        getByRole('button').click();
      });

      expect(getByTestId('draggable').style.transform).toMatch(/translate\(100px,?\s*100px\)/);
    });

    it('should revert to controlled position after drag', () => {
      const onStop = vi.fn();
      const { container } = render(
        <DraggableWrapper position={{ x: 50, y: 50 }} onStop={onStop}>
          <div />
        </DraggableWrapper>
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
        <DraggableWrapper disabled onStart={onStart}>
          <div />
        </DraggableWrapper>
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
      const nodeRef = React.createRef();

      let threw = false;
      try {
        render(<Draggable nodeRef={nodeRef} />);
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
      const nodeRef = React.createRef();

      let threw = false;
      try {
        render(
          <Draggable nodeRef={nodeRef}>
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

    // Note: React 19 removed runtime propTypes checking, so these tests now just verify
    // that the component still renders correctly when invalid props are passed.
    // The dontSetMe validators are defined but no longer trigger warnings in React 19.
    it('should still render when className is set on Draggable', () => {
      const { container } = render(
        <DraggableWrapper className="invalid">
          <div />
        </DraggableWrapper>
      );

      // Component should still render
      expect(container.firstChild).toBeTruthy();
      expect(container.firstChild.classList.contains('react-draggable')).toBe(true);
    });

    it('should still render when style is set on Draggable', () => {
      const { container } = render(
        <DraggableWrapper style={{ color: 'red' }}>
          <div />
        </DraggableWrapper>
      );

      // Component should still render
      expect(container.firstChild).toBeTruthy();
    });

    it('should still render when transform is set on Draggable', () => {
      const { container } = render(
        <DraggableWrapper transform="translate(100px, 100px)">
          <div />
        </DraggableWrapper>
      );

      // Component should still render
      expect(container.firstChild).toBeTruthy();
    });
  });
});
