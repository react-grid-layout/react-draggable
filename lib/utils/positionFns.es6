// @flow
import {isNum, int} from './shims';
import ReactDOM from 'react-dom';
import {getTouch, innerWidth, innerHeight, offsetXYFromParentOf, outerWidth, outerHeight} from './domFns';

import type Draggable from '../Draggable';
import type {Bounds, ControlPosition, DraggableData} from './types';
import type DraggableCore from '../DraggableCore';

export function getBoundPosition(draggable: Draggable, x: number, y: number): [number, number] {
  // If no bounds, short-circuit and move on
  if (!draggable.props.bounds) return [x, y];

  // Clone new bounds
  let {bounds} = draggable.props;
  bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds);
  const node = ReactDOM.findDOMNode(draggable);

  if (typeof bounds === 'string') {
    let boundNode;
    if (bounds === 'parent') {
      boundNode = node.parentNode;
    } else {
      boundNode = document.querySelector(bounds);
      if (!boundNode) throw new Error('Bounds selector "' + bounds + '" could not find an element.');
    }
    const nodeStyle = window.getComputedStyle(node);
    const boundNodeStyle = window.getComputedStyle(boundNode);
    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
    bounds = {
      left: -node.offsetLeft + int(boundNodeStyle.paddingLeft) +
            int(nodeStyle.borderLeftWidth) + int(nodeStyle.marginLeft),
      top: -node.offsetTop + int(boundNodeStyle.paddingTop) +
            int(nodeStyle.borderTopWidth) + int(nodeStyle.marginTop),
      right: innerWidth(boundNode) - outerWidth(node) - node.offsetLeft,
      bottom: innerHeight(boundNode) - outerHeight(node) - node.offsetTop
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
export function getControlPosition(e: MouseEvent, touchIdentifier: ?number, draggableCore: DraggableCore): ?ControlPosition {
  const touchObj = typeof touchIdentifier === 'number' ? getTouch(e, touchIdentifier) : null;
  if (typeof touchIdentifier === 'number' && !touchObj) return null; // not the right touch
  return offsetXYFromParentOf(touchObj || e, ReactDOM.findDOMNode(draggableCore), draggableCore);
}

// Create an data object exposed by <DraggableCore>'s events
export function createCoreData(draggable: DraggableCore, x: number, y: number): DraggableData {
  // State changes are often (but not always!) async. We want the latest value.
  const state = draggable._pendingState || draggable.state;
  const isStart = !isNum(state.lastX);

  if (isStart) {
    // If this is our first move, use the x and y as last coords.
    return {
      node: ReactDOM.findDOMNode(draggable),
      deltaX: 0, deltaY: 0,
      lastX: x, lastY: y,
      x: x, y: y
    };
  } else {
    // Otherwise calculate proper values.
    return {
      node: ReactDOM.findDOMNode(draggable),
      deltaX: x - state.lastX, deltaY: y - state.lastY,
      lastX: state.lastX, lastY: state.lastY,
      x: x, y: y
    };
  }
}

// Create an data exposed by <Draggable>'s events
export function createDraggableData(draggable: Draggable, coreData: DraggableData): DraggableData {
  return {
    node: coreData.node,
    x: draggable.state.x + coreData.deltaX,
    y: draggable.state.y + coreData.deltaY,
    deltaX: coreData.deltaX,
    deltaY: coreData.deltaY,
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
