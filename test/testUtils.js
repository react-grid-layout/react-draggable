/**
 * Test utilities for simulating drag events
 */

/**
 * Create a MouseEvent with specified coordinates
 */
export function createMouseEvent(type, { clientX = 0, clientY = 0 } = {}) {
  // Use the modern MouseEvent constructor without view (jsdom is strict about it)
  return new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX,
    clientY,
    // Don't pass view - jsdom doesn't like it
  });
}

/**
 * Create a TouchEvent with specified coordinates
 */
export function createTouchEvent(type, { clientX = 0, clientY = 0, identifier = 0 } = {}) {
  const touch = {
    identifier,
    clientX,
    clientY,
    target: document.body,
  };

  const touchEvent = new Event(type, { bubbles: true, cancelable: true });
  touchEvent.targetTouches = type === 'touchend' ? [] : [touch];
  touchEvent.changedTouches = [touch];
  touchEvent.touches = type === 'touchend' ? [] : [touch];

  return touchEvent;
}

/**
 * Simulate a drag operation from one point to another
 */
export function simulateDrag(element, { from = { x: 0, y: 0 }, to = { x: 0, y: 0 } } = {}) {
  // Mouse down at start position
  element.dispatchEvent(createMouseEvent('mousedown', { clientX: from.x, clientY: from.y }));

  // Mouse move to end position (dispatched on document)
  document.dispatchEvent(createMouseEvent('mousemove', { clientX: to.x, clientY: to.y }));

  // Mouse up at end position (dispatched on document where DraggableCore listens)
  document.dispatchEvent(createMouseEvent('mouseup', { clientX: to.x, clientY: to.y }));
}

/**
 * Start a drag operation (mousedown only)
 */
export function startDrag(element, { x = 0, y = 0 } = {}) {
  element.dispatchEvent(createMouseEvent('mousedown', { clientX: x, clientY: y }));
}

/**
 * Move during a drag operation (mousemove on document)
 */
export function moveDrag({ x = 0, y = 0 } = {}) {
  document.dispatchEvent(createMouseEvent('mousemove', { clientX: x, clientY: y }));
}

/**
 * End a drag operation (mouseup on document where DraggableCore listens)
 */
export function endDrag(element, { x = 0, y = 0 } = {}) {
  // DraggableCore binds mouseup listener to ownerDocument, not the element
  document.dispatchEvent(createMouseEvent('mouseup', { clientX: x, clientY: y }));
}

/**
 * Simulate a touch drag operation
 */
export function simulateTouchDrag(element, { from = { x: 0, y: 0 }, to = { x: 0, y: 0 } } = {}) {
  element.dispatchEvent(createTouchEvent('touchstart', { clientX: from.x, clientY: from.y }));
  document.dispatchEvent(createTouchEvent('touchmove', { clientX: to.x, clientY: to.y }));
  element.dispatchEvent(createTouchEvent('touchend', { clientX: to.x, clientY: to.y }));
}

/**
 * Wait for the next tick
 */
export function nextTick() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}
