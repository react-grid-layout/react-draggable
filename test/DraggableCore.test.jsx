import React, { useRef } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { DraggableCore } from '../lib/Draggable';
import { simulateDrag, startDrag, moveDrag, endDrag, createTouchEvent } from './testUtils';

// Helper wrapper component that provides nodeRef (required in React 19)
function DraggableCoreWrapper({ children, coreRef, ...props }) {
  const nodeRef = useRef(null);
  return (
    <DraggableCore ref={coreRef} nodeRef={nodeRef} {...props}>
      {React.cloneElement(children, { ref: nodeRef })}
    </DraggableCore>
  );
}

describe('DraggableCore', () => {
  afterEach(() => {
    cleanup();
  });

  describe('rendering', () => {
    it('should render its child', () => {
      const { container } = render(
        <DraggableCoreWrapper>
          <div data-testid="child">Hello</div>
        </DraggableCoreWrapper>
      );
      expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
      expect(container.textContent).toBe('Hello');
    });

    it('should accept a single child only', () => {
      // Suppress React error boundary logs for this test
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const nodeRef = React.createRef();

      // Use try/catch instead of expect().toThrow() to avoid stderr output
      let threw = false;
      try {
        render(
          <DraggableCore nodeRef={nodeRef}>
            <div>One</div>
            <div>Two</div>
          </DraggableCore>
        );
      } catch (e) {
        threw = true;
        expect(e.message).toContain('React.Children.only');
      }

      expect(threw).toBe(true);
      errorSpy.mockRestore();
    });
  });

  describe('mouse events', () => {
    it('should call onStart when mouse down', () => {
      const onStart = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper onStart={onStart}>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 0, y: 0 });
      expect(onStart).toHaveBeenCalledTimes(1);
    });

    it('should call onDrag during mouse move', () => {
      const onDrag = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper onDrag={onDrag}>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 0, y: 0 });
      moveDrag({ x: 100, y: 100 });

      expect(onDrag).toHaveBeenCalled();
      const callData = onDrag.mock.calls[0][1];
      expect(callData.deltaX).toBe(100);
      expect(callData.deltaY).toBe(100);
    });

    it('should call onStop when mouse up', () => {
      const onStop = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper onStop={onStop}>
          <div />
        </DraggableCoreWrapper>
      );

      simulateDrag(container.firstChild, { from: { x: 0, y: 0 }, to: { x: 100, y: 100 } });
      expect(onStop).toHaveBeenCalledTimes(1);
    });

    it('should provide correct data in callbacks', () => {
      const onDrag = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper onDrag={onDrag}>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 50, y: 50 });
      moveDrag({ x: 150, y: 200 });

      const [event, data] = onDrag.mock.calls[0];
      expect(data.x).toBe(150);
      expect(data.y).toBe(200);
      expect(data.deltaX).toBe(100);
      expect(data.deltaY).toBe(150);
      expect(data.lastX).toBe(50);
      expect(data.lastY).toBe(50);
      expect(data.node).toBe(container.firstChild);
    });
  });

  describe('disabled state', () => {
    it('should not start dragging when disabled', () => {
      const onStart = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper disabled onStart={onStart}>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 0, y: 0 });
      expect(onStart).not.toHaveBeenCalled();
    });
  });

  describe('cancellation', () => {
    it('should cancel drag when onStart returns false', () => {
      const onStart = vi.fn(() => false);
      const onDrag = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper onStart={onStart} onDrag={onDrag}>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 0, y: 0 });
      moveDrag({ x: 100, y: 100 });

      expect(onStart).toHaveBeenCalled();
      expect(onDrag).not.toHaveBeenCalled();
    });

    it('should stop drag when onDrag returns false', () => {
      const onDrag = vi.fn(() => false);
      const onStop = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper onDrag={onDrag} onStop={onStop}>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 0, y: 0 });
      moveDrag({ x: 100, y: 100 });

      expect(onDrag).toHaveBeenCalled();
      expect(onStop).toHaveBeenCalled();
    });
  });

  describe('handle prop', () => {
    it('should only drag from handle', () => {
      const onStart = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper handle=".handle" onStart={onStart}>
          <div>
            <div className="handle">Handle</div>
            <div className="content">Content</div>
          </div>
        </DraggableCoreWrapper>
      );

      // Click on content - should not start drag
      startDrag(container.querySelector('.content'), { x: 0, y: 0 });
      expect(onStart).not.toHaveBeenCalled();

      // Click on handle - should start drag
      startDrag(container.querySelector('.handle'), { x: 0, y: 0 });
      expect(onStart).toHaveBeenCalled();
    });

    it('should work with nested elements in handle', () => {
      const onStart = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper handle=".handle" onStart={onStart}>
          <div>
            <div className="handle">
              <span className="nested">Nested</span>
            </div>
          </div>
        </DraggableCoreWrapper>
      );

      startDrag(container.querySelector('.nested'), { x: 0, y: 0 });
      expect(onStart).toHaveBeenCalled();
    });
  });

  describe('cancel prop', () => {
    it('should not drag from cancel elements', () => {
      const onStart = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper cancel=".cancel" onStart={onStart}>
          <div>
            <div className="cancel">Cancel</div>
            <div className="content">Content</div>
          </div>
        </DraggableCoreWrapper>
      );

      // Click on cancel - should not start drag
      startDrag(container.querySelector('.cancel'), { x: 0, y: 0 });
      expect(onStart).not.toHaveBeenCalled();

      // Click on content - should start drag
      startDrag(container.querySelector('.content'), { x: 0, y: 0 });
      expect(onStart).toHaveBeenCalled();
    });
  });

  describe('grid prop', () => {
    it('should snap movement to grid', () => {
      const onDrag = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper grid={[50, 50]} onDrag={onDrag}>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 0, y: 0 });
      moveDrag({ x: 30, y: 30 }); // Less than half grid, should snap to 50

      expect(onDrag).toHaveBeenCalled();
      const data = onDrag.mock.calls[0][1];
      expect(data.x).toBe(50);
      expect(data.y).toBe(50);
    });

    it('should not call onDrag if movement is less than grid', () => {
      const onDrag = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper grid={[100, 100]} onDrag={onDrag}>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 0, y: 0 });
      moveDrag({ x: 20, y: 20 }); // Much less than half grid

      // Should not be called because snapped delta is 0
      expect(onDrag).not.toHaveBeenCalled();
    });
  });

  describe('scale prop', () => {
    it('should adjust position based on scale', () => {
      const onDrag = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper scale={2} onDrag={onDrag}>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 0, y: 0 });
      moveDrag({ x: 100, y: 100 });

      const data = onDrag.mock.calls[0][1];
      // With scale 2, 100px movement = 50 logical units
      expect(data.deltaX).toBe(50);
      expect(data.deltaY).toBe(50);
    });

    it('should work with scale < 1', () => {
      const onDrag = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper scale={0.5} onDrag={onDrag}>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 0, y: 0 });
      moveDrag({ x: 100, y: 100 });

      const data = onDrag.mock.calls[0][1];
      // With scale 0.5, 100px movement = 200 logical units
      expect(data.deltaX).toBe(200);
      expect(data.deltaY).toBe(200);
    });
  });

  describe('allowAnyClick prop', () => {
    it('should only respond to left click by default', () => {
      const onStart = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper onStart={onStart}>
          <div />
        </DraggableCoreWrapper>
      );

      // Right click (button 2)
      container.firstChild.dispatchEvent(new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        button: 2,
        clientX: 0,
        clientY: 0,
      }));
      expect(onStart).not.toHaveBeenCalled();
    });

    it('should respond to any click when allowAnyClick is true', () => {
      const onStart = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper allowAnyClick onStart={onStart}>
          <div />
        </DraggableCoreWrapper>
      );

      // Right click (button 2)
      container.firstChild.dispatchEvent(new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        button: 2,
        clientX: 0,
        clientY: 0,
      }));
      expect(onStart).toHaveBeenCalled();
    });
  });

  describe('nodeRef prop', () => {
    it('should use nodeRef instead of findDOMNode', () => {
      const onDrag = vi.fn();

      function TestComponent() {
        const nodeRef = useRef(null);
        return (
          <DraggableCore nodeRef={nodeRef} onDrag={onDrag}>
            <div ref={nodeRef} data-testid="target" />
          </DraggableCore>
        );
      }

      const { getByTestId } = render(<TestComponent />);
      const target = getByTestId('target');

      startDrag(target, { x: 0, y: 0 });
      moveDrag({ x: 100, y: 100 });

      expect(onDrag).toHaveBeenCalled();
      expect(onDrag.mock.calls[0][1].node).toBe(target);
    });

    it('should work with forwardRef components', () => {
      const onDrag = vi.fn();

      const CustomComponent = React.forwardRef((props, ref) => (
        <div {...props} ref={ref}>Custom</div>
      ));

      function TestComponent() {
        const nodeRef = useRef(null);
        return (
          <DraggableCore nodeRef={nodeRef} onDrag={onDrag}>
            <CustomComponent ref={nodeRef} data-testid="target" />
          </DraggableCore>
        );
      }

      const { getByTestId } = render(<TestComponent />);
      const target = getByTestId('target');

      startDrag(target, { x: 0, y: 0 });
      moveDrag({ x: 100, y: 100 });

      expect(onDrag).toHaveBeenCalled();
      expect(onDrag.mock.calls[0][1].node.textContent).toBe('Custom');
    });
  });

  describe('touch events', () => {
    it('should handle touch start', () => {
      const onStart = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper onStart={onStart}>
          <div />
        </DraggableCoreWrapper>
      );

      container.firstChild.dispatchEvent(createTouchEvent('touchstart', { clientX: 0, clientY: 0 }));
      expect(onStart).toHaveBeenCalled();
    });

    it('should call preventDefault on touchstart by default', () => {
      const { container } = render(
        <DraggableCoreWrapper>
          <div />
        </DraggableCoreWrapper>
      );

      const event = createTouchEvent('touchstart', { clientX: 0, clientY: 0 });
      let prevented = false;
      event.preventDefault = () => { prevented = true; };

      container.firstChild.dispatchEvent(event);
      expect(prevented).toBe(true);
    });

    it('should not call preventDefault when allowMobileScroll is true', () => {
      const { container } = render(
        <DraggableCoreWrapper allowMobileScroll>
          <div />
        </DraggableCoreWrapper>
      );

      const event = createTouchEvent('touchstart', { clientX: 0, clientY: 0 });
      let prevented = false;
      event.preventDefault = () => { prevented = true; };

      container.firstChild.dispatchEvent(event);
      expect(prevented).toBe(false);
    });
  });

  describe('onMouseDown prop', () => {
    it('should call onMouseDown callback', () => {
      const onMouseDown = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper onMouseDown={onMouseDown}>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 0, y: 0 });
      expect(onMouseDown).toHaveBeenCalled();
    });

    it('should call onMouseDown even when disabled', () => {
      const onMouseDown = vi.fn();
      const onStart = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper disabled onMouseDown={onMouseDown} onStart={onStart}>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 0, y: 0 });
      expect(onMouseDown).toHaveBeenCalled();
      expect(onStart).not.toHaveBeenCalled();
    });
  });

  describe('enableUserSelectHack prop', () => {
    it('should add transparent selection class by default', () => {
      const { container } = render(
        <DraggableCoreWrapper>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 0, y: 0 });
      expect(document.body.classList.contains('react-draggable-transparent-selection')).toBe(true);

      endDrag(container.firstChild, { x: 0, y: 0 });
      // rAF mock immediately calls the callback
      expect(document.body.classList.contains('react-draggable-transparent-selection')).toBe(false);
    });

    it('should not add class when enableUserSelectHack is false', () => {
      const { container } = render(
        <DraggableCoreWrapper enableUserSelectHack={false}>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 0, y: 0 });
      expect(document.body.classList.contains('react-draggable-transparent-selection')).toBe(false);
    });

    it('should not add user-select class when onStart returns false', () => {
      const onStart = vi.fn(() => false);
      const { container } = render(
        <DraggableCoreWrapper onStart={onStart}>
          <div />
        </DraggableCoreWrapper>
      );

      // Ensure class is not present before drag
      expect(document.body.classList.contains('react-draggable-transparent-selection')).toBe(false);

      startDrag(container.firstChild, { x: 0, y: 0 });

      // onStart returned false, so user-select hack should not be applied
      expect(onStart).toHaveBeenCalled();
      expect(document.body.classList.contains('react-draggable-transparent-selection')).toBe(false);
    });
  });

  describe('unmount safety', () => {
    it('should track mounted state correctly', () => {
      const coreRef = React.createRef();
      render(
        <DraggableCoreWrapper coreRef={coreRef}>
          <div />
        </DraggableCoreWrapper>
      );

      // Verify mounted is true after mount
      expect(coreRef.current.mounted).toBe(true);

      // Store reference before unmount since ref.current becomes null
      const instance = coreRef.current;
      cleanup();

      // Verify mounted is false after unmount (using stored reference)
      expect(instance.mounted).toBe(false);
    });

    it('should not continue drag if onStart returns false', () => {
      const onStart = vi.fn(() => false);
      const onDrag = vi.fn();
      const { container } = render(
        <DraggableCoreWrapper onStart={onStart} onDrag={onDrag}>
          <div />
        </DraggableCoreWrapper>
      );

      startDrag(container.firstChild, { x: 0, y: 0 });
      moveDrag({ x: 100, y: 100 });

      expect(onStart).toHaveBeenCalled();
      // onDrag should not be called because onStart returned false
      expect(onDrag).not.toHaveBeenCalled();
    });
  });

  describe('touch events with handle', () => {
    it('should call preventDefault on touchstart when using handle', () => {
      const { container } = render(
        <DraggableCoreWrapper handle=".handle">
          <div>
            <div className="handle">Handle</div>
          </div>
        </DraggableCoreWrapper>
      );

      const handle = container.querySelector('.handle');
      const event = createTouchEvent('touchstart', { clientX: 0, clientY: 0 });
      let prevented = false;
      event.preventDefault = () => { prevented = true; };

      handle.dispatchEvent(event);
      expect(prevented).toBe(true);
    });

    it('should not call preventDefault on touchstart for cancel elements', () => {
      const { container } = render(
        <DraggableCoreWrapper cancel=".cancel">
          <div>
            <div className="cancel">Cancel</div>
            <div className="content">Content</div>
          </div>
        </DraggableCoreWrapper>
      );

      const cancel = container.querySelector('.cancel');
      const event = createTouchEvent('touchstart', { clientX: 0, clientY: 0 });
      let prevented = false;
      event.preventDefault = () => { prevented = true; };

      cancel.dispatchEvent(event);
      // Should not prevent default since drag was cancelled
      expect(prevented).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should throw error when no children provided', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const nodeRef = React.createRef();

      let threw = false;
      try {
        render(<DraggableCore nodeRef={nodeRef} />);
      } catch (e) {
        threw = true;
        expect(e.message).toMatch(/React.Children.only|expected/i);
      }

      expect(threw).toBe(true);
      errorSpy.mockRestore();
    });
  });
});
