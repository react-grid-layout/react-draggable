import {findInArray, isFunction, isNum, int} from './shims';
import browserPrefix from './getPrefix';
import assign from 'object-assign';
import React from 'react';

let matchesSelectorFunc = '';
export function matchesSelector(el, selector) {
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = findInArray([
      'matches',
      'webkitMatchesSelector',
      'mozMatchesSelector',
      'msMatchesSelector',
      'oMatchesSelector'
    ], function(method){
      return isFunction(el[method]);
    });
  }

  return el[matchesSelectorFunc].call(el, selector);
}

export function addEvent(el, event, handler) {
  if (!el) { return; }
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true);
  } else {
    el['on' + event] = handler;
  }
}

export function removeEvent(el, event, handler) {
  if (!el) { return; }
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true);
  } else {
    el['on' + event] = null;
  }
}

export function outerHeight(node) {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetTop which is including margin. See getBoundPosition
  let height = node.clientHeight;
  let computedStyle = window.getComputedStyle(node);
  height += int(computedStyle.borderTopWidth);
  height += int(computedStyle.borderBottomWidth);
  return height;
}

export function outerWidth(node) {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetLeft which is including margin. See getBoundPosition
  let width = node.clientWidth;
  let computedStyle = window.getComputedStyle(node);
  width += int(computedStyle.borderLeftWidth);
  width += int(computedStyle.borderRightWidth);
  return width;
}
export function innerHeight(node) {
  let height = node.clientHeight;
  let computedStyle = window.getComputedStyle(node);
  height -= int(computedStyle.paddingTop);
  height -= int(computedStyle.paddingBottom);
  return height;
}

export function innerWidth(node) {
  let width = node.clientWidth;
  let computedStyle = window.getComputedStyle(node);
  width -= int(computedStyle.paddingLeft);
  width -= int(computedStyle.paddingRight);
  return width;
}

export function createCSSTransform(style) {
  // Replace unitless items with px
  let x = style.x + 'px';
  let y = style.y + 'px';
  let out = {transform: 'translate(' + x + ',' + y + ')'};
  // Add single prefixed property as well
  if (browserPrefix) {
    out[browserPrefix + 'Transform'] = out.transform;
  }
  return out;
}

// User-select Hacks:
//
// Useful for preventing blue highlights all over everything when dragging.
let userSelectStyle = ';user-select: none;';
if (browserPrefix) {
  userSelectStyle += '-' + browserPrefix.toLowerCase() + '-user-select: none;';
}

export function addUserSelectStyles() {
  let style = document.body.getAttribute('style') || '';
  document.body.setAttribute('style', style + userSelectStyle);
}

export function removeUserSelectStyles() {
  let style = document.body.getAttribute('style') || '';
  document.body.setAttribute('style', style.replace(userSelectStyle, ''));
}

export function styleHacks(draggable) {
  // Create style object. We extend from existing styles so we don't
  // remove anything already set (like background, color, etc).
  let childStyle = draggable.props.children.props.style || {};

  // Workaround IE pointer events; see #51
  // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
  let touchHacks = {
    touchAction: 'none'
  };

  return assign(touchHacks, childStyle, draggable.props.style);
}

// Create an event exposed by <DraggableCore>
export function createCoreEvent(draggable, clientX, clientY) {
  // State changes are often (but not always!) async. We want the latest value.
  let state = draggable._pendingState || draggable.state;
  let isStart = !isNum(state.lastX);

  return {
    node: React.findDOMNode(draggable),
    position: isStart ?
      // If this is our first move, use the clientX and clientY as last coords.
      {
        deltaX: 0, deltaY: 0,
        lastX: clientX, lastY: clientY,
        clientX: clientX, clientY: clientY
      } :
      // Otherwise calculate proper values.
      {
        deltaX: clientX - state.lastX, deltaY: clientY - state.lastY,
        lastX: state.lastX, lastY: state.lastY,
        clientX: clientX, clientY: clientY
      }
  };
}

// Create an event exposed by <Draggable>
export function createUIEvent(draggable, coreEvent) {
  return {
    node: React.findDOMNode(draggable),
    position: {
      top: coreEvent.position.clientY,
      left: coreEvent.position.clientX
    }
  };
}
