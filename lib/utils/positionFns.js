// @flow
import {isNum, int} from './shims';
import {getTouch, innerWidth, innerHeight, offsetXYFromParent, outerWidth, outerHeight} from './domFns';

import type Draggable from '../Draggable';
import type {Bounds, ControlPosition, DraggableData, MouseTouchEvent} from './types';
import type DraggableCore from '../DraggableCore';

export function getBoundPosition(draggable: Draggable, x: number, y: number): [number, number] {
  // If no bounds, short-circuit and move on
  if (!draggable.props.bounds) return [x, y];

  // Clone new bounds
  let {bounds} = draggable.props;
  bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds);
  const node = findDOMNode(draggable);

  if (typeof bounds === 'string') {
    const {ownerDocument} = node;
    const ownerWindow = ownerDocument.defaultView;
    let boundNode;
    if (bounds === 'parent') {
      boundNode = node.parentNode;
    } else {
      // Flow assigns the wrong return type (Node) for getRootNode(),
      // so we cast it to one of the correct types (Element).
      // The others are Document and ShadowRoot.
      // All three implement querySelector() so it's safe to call.
      const rootNode = (((node.getRootNode()): any): Element);
      boundNode = rootNode.querySelector(bounds);
    }

    if (!(boundNode instanceof ownerWindow.HTMLElement)) {
      throw new Error('Bounds selector "' + bounds + '" could not find an element.');
    }
    const boundNodeEl: HTMLElement = boundNode; // for Flow, can't seem to refine correctly
    const nodeStyle = ownerWindow.getComputedStyle(node);
    const boundNodeStyle = ownerWindow.getComputedStyle(boundNodeEl);
    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
    bounds = {
      left: -node.offsetLeft + int(boundNodeStyle.paddingLeft) + int(nodeStyle.marginLeft),
      top: -node.offsetTop + int(boundNodeStyle.paddingTop) + int(nodeStyle.marginTop),
      right: innerWidth(boundNodeEl) - outerWidth(node) - node.offsetLeft +
        int(boundNodeStyle.paddingRight) - int(nodeStyle.marginRight),
      bottom: innerHeight(boundNodeEl) - outerHeight(node) - node.offsetTop +
        int(boundNodeStyle.paddingBottom) - int(nodeStyle.marginBottom)
    };
  }

  // Keep x and y below right and bottom limits...
  if (isNum(bounds.right)) x = Math.min(x, bounds.right);
  if (isNum(bounds.bottom)) y = Math.min(y, bounds.bottom);

  // But above left and top limits.
  if (isNum(bounds.left)) x = Math.max(x, bounds.left);
  if (isNum(bounds.top)) y = Math.max(y, bounds.top);

  return [x, y];
}

export function snapToGrid(grid: [number, number], pendingX: number, pendingY: number): [number, number] {
  const x = Math.round(pendingX / grid[0]) * grid[0];
  const y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}

export function canDragX(draggable: Draggable): boolean {
  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
}

export function canDragY(draggable: Draggable): boolean {
  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
}

// Get {x, y} positions from event.
export function getControlPosition(e: MouseTouchEvent, touchIdentifier: ?number, draggableCore: DraggableCore): ?ControlPosition {
  const touchObj = typeof touchIdentifier === 'number' ? getTouch(e, touchIdentifier) : null;
  if (typeof touchIdentifier === 'number' && !touchObj) return null; // not the right touch
  const node = findDOMNode(draggableCore);
  // User can provide an offsetParent if desired.
  const offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
  return offsetXYFromParent(touchObj || e, offsetParent, draggableCore.props.scale);
}

// Create an data object exposed by <DraggableCore>'s events
export function createCoreData(draggable: DraggableCore, x: number, y: number): DraggableData {
  const isStart = !isNum(draggable.lastX);
  const node = findDOMNode(draggable);

  if (isStart) {
    // If this is our first move, use the x and y as last coords.
    return {
      node,
      deltaX: 0, deltaY: 0,
      lastX: x, lastY: y,
      x, y,
    };
  } else {
    // Otherwise calculate proper values.
    return {
      node,
      deltaX: x - draggable.lastX, deltaY: y - draggable.lastY,
      lastX: draggable.lastX, lastY: draggable.lastY,
      x, y,
    };
  }
}

// Create an data exposed by <Draggable>'s events
export function createDraggableData(draggable: Draggable, coreData: DraggableData): DraggableData {
  const scale = draggable.props.scale;
  return {
    node: coreData.node,
    x: draggable.state.x + (coreData.deltaX / scale),
    y: draggable.state.y + (coreData.deltaY / scale),
    deltaX: (coreData.deltaX / scale),
    deltaY: (coreData.deltaY / scale),
    lastX: draggable.state.x,
    lastY: draggable.state.y
  };
}

// A lot faster than stringify/parse
function cloneBounds(bounds: Bounds): Bounds {
  return {
    left: bounds.left,
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.bottom
  };
}

function findDOMNode(draggable: Draggable | DraggableCore): HTMLElement {
  const node = draggable.findDOMNode();
  if (!node) {
    throw new Error('<DraggableCore>: Unmounted during event!');
  }
  // $FlowIgnore we can't assert on HTMLElement due to tests... FIXME
  return node;
}
