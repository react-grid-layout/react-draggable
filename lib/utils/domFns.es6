// @flow
import {findInArray, isFunction, isNum, int} from './shims';
import browserPrefix, {getPrefix, browserPrefixToStyle, browserPrefixToKey} from './getPrefix';
import ReactDOM from 'react-dom';

import type Draggable from '../Draggable';
import type DraggableCore from '../DraggableCore';

export type CoreEvent = {
  node: HTMLElement,
  position: {
    deltaX: number, deltaY: number,
    lastX: number, lastY: number,
    clientX: number, clientY: number
  }
};

export type UIEvent = {
  node: HTMLElement,
  position: {
    left: number, top: number
  },
  deltaX: number, deltaY: number
};

let matchesSelectorFunc = '';
export function matchesSelector(el: HTMLElement, selector: string): boolean {
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = findInArray([
      'matches',
      'webkitMatchesSelector',
      'mozMatchesSelector',
      'msMatchesSelector',
      'oMatchesSelector'
    ], function(method){
      // $FlowIgnore: Doesn't think elements are indexable
      return isFunction(el[method]);
    });
  }

  // $FlowIgnore: Doesn't think elements are indexable
  return el[matchesSelectorFunc].call(el, selector);
}

export function addEvent(el: ?Node, event: string, handler: Function): void {
  if (!el) { return; }
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = handler;
  }
}

export function removeEvent(el: ?Node, event: string, handler: Function): void {
  if (!el) { return; }
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = null;
  }
}

export function outerHeight(node: HTMLElement): number {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetTop which is including margin. See getBoundPosition
  let height = node.clientHeight;
  let computedStyle = window.getComputedStyle(node);
  height += int(computedStyle.borderTopWidth);
  height += int(computedStyle.borderBottomWidth);
  return height;
}

export function outerWidth(node: HTMLElement): number {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetLeft which is including margin. See getBoundPosition
  let width = node.clientWidth;
  let computedStyle = window.getComputedStyle(node);
  width += int(computedStyle.borderLeftWidth);
  width += int(computedStyle.borderRightWidth);
  return width;
}
export function innerHeight(node: HTMLElement): number {
  let height = node.clientHeight;
  let computedStyle = window.getComputedStyle(node);
  height -= int(computedStyle.paddingTop);
  height -= int(computedStyle.paddingBottom);
  return height;
}

export function innerWidth(node: HTMLElement): number {
  let width = node.clientWidth;
  let computedStyle = window.getComputedStyle(node);
  width -= int(computedStyle.paddingLeft);
  width -= int(computedStyle.paddingRight);
  return width;
}

export function createCSSTransform({x, y}: {x: number, y: number}): Object {
  // Replace unitless items with px
  return {[browserPrefixToKey('transform', browserPrefix)]: 'translate(' + x + 'px,' + y + 'px)'};
}

export function createSVGTransform({x, y}: {x: number, y: number}): string {
  return 'translate(' + x + ',' + y + ')';
}

// User-select Hacks:
//
// Useful for preventing blue highlights all over everything when dragging.
const userSelectPrefix = getPrefix('user-select');
const userSelect = browserPrefixToStyle('user-select', userSelectPrefix);
const userSelectStyle = `;${userSelect}: none;`;

export function addUserSelectStyles() {
  let style = document.body.getAttribute('style') || '';
  document.body.setAttribute('style', style + userSelectStyle);
}

export function removeUserSelectStyles() {
  let style = document.body.getAttribute('style') || '';
  document.body.setAttribute('style', style.replace(userSelectStyle, ''));
}

export function styleHacks(childStyle: Object = {}): Object {
  // Workaround IE pointer events; see #51
  // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
  return {
    touchAction: 'none',
    ...childStyle
  };
}

// Create an event exposed by <DraggableCore>
export function createCoreEvent(draggable: DraggableCore, clientX: number, clientY: number): CoreEvent {
  // State changes are often (but not always!) async. We want the latest value.
  let state = draggable._pendingState || draggable.state;
  let isStart = !isNum(state.lastX);

  return {
    node: ReactDOM.findDOMNode(draggable),
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
export function createUIEvent(draggable: Draggable, coreEvent: CoreEvent): UIEvent {
  return {
    node: ReactDOM.findDOMNode(draggable),
    position: {
      left: draggable.state.clientX + coreEvent.position.deltaX,
      top: draggable.state.clientY + coreEvent.position.deltaY
    },
    deltaX: coreEvent.position.deltaX,
    deltaY: coreEvent.position.deltaY
  };
}
