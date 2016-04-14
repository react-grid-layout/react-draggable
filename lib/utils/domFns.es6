// @flow
import {findInArray, isFunction, int} from './shims';
import browserPrefix, {getPrefix, browserPrefixToStyle, browserPrefixToKey} from './getPrefix';

import type {ControlPosition} from './types';

let matchesSelectorFunc = '';
export function matchesSelector(el: Node, selector: string): boolean {
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
  const computedStyle = window.getComputedStyle(node);
  height += int(computedStyle.borderTopWidth);
  height += int(computedStyle.borderBottomWidth);
  return height;
}

export function outerWidth(node: HTMLElement): number {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetLeft which is including margin. See getBoundPosition
  let width = node.clientWidth;
  const computedStyle = window.getComputedStyle(node);
  width += int(computedStyle.borderLeftWidth);
  width += int(computedStyle.borderRightWidth);
  return width;
}
export function innerHeight(node: HTMLElement): number {
  let height = node.clientHeight;
  const computedStyle = window.getComputedStyle(node);
  height -= int(computedStyle.paddingTop);
  height -= int(computedStyle.paddingBottom);
  return height;
}

export function innerWidth(node: HTMLElement): number {
  let width = node.clientWidth;
  const computedStyle = window.getComputedStyle(node);
  width -= int(computedStyle.paddingLeft);
  width -= int(computedStyle.paddingRight);
  return width;
}

// Get from offsetParent
export function offsetXYFromParentOf(e: MouseEvent, node: HTMLElement & {offsetParent: HTMLElement}): ControlPosition {
  const evt = e.targetTouches ? e.targetTouches[0] : e;

  const offsetParent = node.offsetParent || document.body;
  const offsetParentRect = node.offsetParent === document.body ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();

  const x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
  const y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;

  return {x, y};
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
  const style = document.body.getAttribute('style') || '';
  document.body.setAttribute('style', style + userSelectStyle);
}

export function removeUserSelectStyles() {
  const style = document.body.getAttribute('style') || '';
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
