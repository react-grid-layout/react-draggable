import {isNum, int} from './shims';
import React from 'react';
import {innerWidth, innerHeight, outerWidth, outerHeight} from './domFns';

export function getBoundPosition(draggable, clientX, clientY) {
  var bounds = JSON.parse(JSON.stringify(draggable.props.bounds));
  var node = React.findDOMNode(draggable);
  var parent = node.parentNode;

  if (bounds === 'parent') {
    var nodeStyle = window.getComputedStyle(node);
    var parentStyle = window.getComputedStyle(parent);
    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
    bounds = {
      left: -node.offsetLeft + int(parentStyle.paddingLeft) +
            int(nodeStyle.borderLeftWidth) + int(nodeStyle.marginLeft),
      top: -node.offsetTop + int(parentStyle.paddingTop) +
            int(nodeStyle.borderTopWidth) + int(nodeStyle.marginTop),
      right: innerWidth(parent) - outerWidth(node) - node.offsetLeft,
      bottom: innerHeight(parent) - outerHeight(node) - node.offsetTop
    };
  }

  // Keep x and y below right and bottom limits...
  if (isNum(bounds.right)) clientX = Math.min(clientX, bounds.right);
  if (isNum(bounds.bottom)) clientY = Math.min(clientY, bounds.bottom);

  // But above left and top limits.
  if (isNum(bounds.left)) clientX = Math.max(clientX, bounds.left);
  if (isNum(bounds.top)) clientY = Math.max(clientY, bounds.top);

  return [clientX, clientY];
}

export function snapToGrid(grid, pendingX, pendingY) {
  var x = Math.round(pendingX / grid[0]) * grid[0];
  var y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}

export function canDragX(draggable) {
  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
}

export function canDragY(draggable) {
  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
}

// Get {clientX, clientY} positions from event.
export function getControlPosition(e) {
  var position = (e.targetTouches && e.targetTouches[0]) || e;
  return {
    clientX: position.clientX,
    clientY: position.clientY
  };
}
