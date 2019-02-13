(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react-dom"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react-dom", "react"], factory);
	else if(typeof exports === 'object')
		exports["ReactDraggable"] = factory(require("react-dom"), require("react"));
	else
		root["ReactDraggable"] = factory(root["ReactDOM"], root["React"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = findInArray;
/* harmony export (immutable) */ __webpack_exports__["d"] = isFunction;
/* harmony export (immutable) */ __webpack_exports__["e"] = isNum;
/* harmony export (immutable) */ __webpack_exports__["c"] = int;
/* harmony export (immutable) */ __webpack_exports__["a"] = dontSetMe;

// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
function findInArray(array /*: Array<any> | TouchList*/, callback /*: Function*/) /*: any*/ {
  for (var i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}

function isFunction(func /*: any*/) /*: boolean*/ {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}

function isNum(num /*: any*/) /*: boolean*/ {
  return typeof num === 'number' && !isNaN(num);
}

function int(a /*: string*/) /*: number*/ {
  return parseInt(a, 10);
}

function dontSetMe(props /*: Object*/, propName /*: string*/, componentName /*: string*/) {
  if (props[propName]) {
    return new Error('Invalid prop ' + propName + ' passed to ' + componentName + ' - do not set this, set it on the child.');
  }
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./lib/utils/shims.js
var shims = __webpack_require__(0);

// CONCATENATED MODULE: ./lib/utils/getPrefix.js
var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
function getPrefix() /*: string*/ {
  var prop /*: string*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';

  // Checking specifically for 'window.document' is for pseudo-browser server-side
  // environments that define 'window' as the global context.
  // E.g. React-rails (see https://github.com/reactjs/react-rails/pull/84)
  if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';

  var style = window.document.documentElement.style;

  if (prop in style) return '';

  for (var i = 0; i < prefixes.length; i++) {
    if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
  }

  return '';
}

function browserPrefixToKey(prop /*: string*/, prefix /*: string*/) /*: string*/ {
  return prefix ? '' + prefix + kebabToTitleCase(prop) : prop;
}

function browserPrefixToStyle(prop /*: string*/, prefix /*: string*/) /*: string*/ {
  return prefix ? '-' + prefix.toLowerCase() + '-' + prop : prop;
}

function kebabToTitleCase(str /*: string*/) /*: string*/ {
  var out = '';
  var shouldCapitalize = true;
  for (var i = 0; i < str.length; i++) {
    if (shouldCapitalize) {
      out += str[i].toUpperCase();
      shouldCapitalize = false;
    } else if (str[i] === '-') {
      shouldCapitalize = true;
    } else {
      out += str[i];
    }
  }
  return out;
}

// Default export is the prefix itself, like 'Moz', 'Webkit', etc
// Note that you may have to re-test for certain things; for instance, Chrome 50
// can handle unprefixed `transform`, but not unprefixed `user-select`
/* harmony default export */ var utils_getPrefix = (getPrefix());
// CONCATENATED MODULE: ./lib/utils/domFns.js
/* unused harmony export matchesSelector */
/* harmony export (immutable) */ __webpack_exports__["i"] = matchesSelectorAndParentsTo;
/* harmony export (immutable) */ __webpack_exports__["a"] = addEvent;
/* harmony export (immutable) */ __webpack_exports__["m"] = removeEvent;
/* harmony export (immutable) */ __webpack_exports__["k"] = domFns_outerHeight;
/* harmony export (immutable) */ __webpack_exports__["l"] = domFns_outerWidth;
/* harmony export (immutable) */ __webpack_exports__["g"] = domFns_innerHeight;
/* harmony export (immutable) */ __webpack_exports__["h"] = domFns_innerWidth;
/* harmony export (immutable) */ __webpack_exports__["j"] = offsetXYFromParent;
/* harmony export (immutable) */ __webpack_exports__["c"] = createCSSTransform;
/* harmony export (immutable) */ __webpack_exports__["d"] = createSVGTransform;
/* harmony export (immutable) */ __webpack_exports__["e"] = getTouch;
/* harmony export (immutable) */ __webpack_exports__["f"] = getTouchIdentifier;
/* harmony export (immutable) */ __webpack_exports__["b"] = addUserSelectStyles;
/* harmony export (immutable) */ __webpack_exports__["n"] = removeUserSelectStyles;
/* harmony export (immutable) */ __webpack_exports__["o"] = styleHacks;
/* unused harmony export addClassName */
/* unused harmony export removeClassName */
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/*:: import type {ControlPosition, MouseTouchEvent} from './types';*/


var matchesSelectorFunc = '';
function matchesSelector(el /*: Node*/, selector /*: string*/) /*: boolean*/ {
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = Object(shims["b" /* findInArray */])(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
      // $FlowIgnore: Doesn't think elements are indexable
      return Object(shims["d" /* isFunction */])(el[method]);
    });
  }

  // Might not be found entirely (not an Element?) - in that case, bail
  // $FlowIgnore: Doesn't think elements are indexable
  if (!Object(shims["d" /* isFunction */])(el[matchesSelectorFunc])) return false;

  // $FlowIgnore: Doesn't think elements are indexable
  return el[matchesSelectorFunc](selector);
}

// Works up the tree to the draggable itself attempting to match selector.
function matchesSelectorAndParentsTo(el /*: Node*/, selector /*: string*/, baseNode /*: Node*/) /*: boolean*/ {
  var node = el;
  do {
    if (matchesSelector(node, selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);

  return false;
}

function addEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/) /*: void*/ {
  if (!el) {
    return;
  }
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = handler;
  }
}

function removeEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/) /*: void*/ {
  if (!el) {
    return;
  }
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = null;
  }
}

function domFns_outerHeight(node /*: HTMLElement*/) /*: number*/ {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetTop which is including margin. See getBoundPosition
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height += Object(shims["c" /* int */])(computedStyle.borderTopWidth);
  height += Object(shims["c" /* int */])(computedStyle.borderBottomWidth);
  return height;
}

function domFns_outerWidth(node /*: HTMLElement*/) /*: number*/ {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetLeft which is including margin. See getBoundPosition
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width += Object(shims["c" /* int */])(computedStyle.borderLeftWidth);
  width += Object(shims["c" /* int */])(computedStyle.borderRightWidth);
  return width;
}
function domFns_innerHeight(node /*: HTMLElement*/) /*: number*/ {
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height -= Object(shims["c" /* int */])(computedStyle.paddingTop);
  height -= Object(shims["c" /* int */])(computedStyle.paddingBottom);
  return height;
}

function domFns_innerWidth(node /*: HTMLElement*/) /*: number*/ {
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width -= Object(shims["c" /* int */])(computedStyle.paddingLeft);
  width -= Object(shims["c" /* int */])(computedStyle.paddingRight);
  return width;
}

// Get from offsetParent
function offsetXYFromParent(evt /*: {clientX: number, clientY: number}*/, offsetParent /*: HTMLElement*/) /*: ControlPosition*/ {
  var isBody = offsetParent === offsetParent.ownerDocument.body;
  var offsetParentRect = isBody ? { left: 0, top: 0 } : offsetParent.getBoundingClientRect();

  var x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
  var y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;

  return { x: x, y: y };
}

function createCSSTransform(_ref) /*: Object*/ {
  var x = _ref.x,
      y = _ref.y,
      r = _ref.r;

  // Replace unitless items with px
  return _defineProperty({}, browserPrefixToKey('transform', utils_getPrefix), 'translate(' + x + 'px, ' + y + 'px) rotate(' + r + 'deg)');
}

function createSVGTransform(_ref3) /*: string*/ {
  var x = _ref3.x,
      y = _ref3.y,
      r = _ref3.r;

  return 'translate(' + x + ', ' + y + ') rotate(' + r + 'deg)';
}

function getTouch(e /*: MouseTouchEvent*/, identifier /*: number*/) /*: ?{clientX: number, clientY: number}*/ {
  return e.targetTouches && Object(shims["b" /* findInArray */])(e.targetTouches, function (t) {
    return identifier === t.identifier;
  }) || e.changedTouches && Object(shims["b" /* findInArray */])(e.changedTouches, function (t) {
    return identifier === t.identifier;
  });
}

function getTouchIdentifier(e /*: MouseTouchEvent*/) /*: ?number*/ {
  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
}

// User-select Hacks:
//
// Useful for preventing blue highlights all over everything when dragging.

// Note we're passing `document` b/c we could be iframed
function addUserSelectStyles(doc /*: ?Document*/) {
  if (!doc) return;
  var styleEl = doc.getElementById('react-draggable-style-el');
  if (!styleEl) {
    styleEl = doc.createElement('style');
    styleEl.type = 'text/css';
    styleEl.id = 'react-draggable-style-el';
    styleEl.innerHTML = '.react-draggable-transparent-selection *::-moz-selection {background: transparent;}\n';
    styleEl.innerHTML += '.react-draggable-transparent-selection *::selection {background: transparent;}\n';
    doc.getElementsByTagName('head')[0].appendChild(styleEl);
  }
  if (doc.body) addClassName(doc.body, 'react-draggable-transparent-selection');
}

function removeUserSelectStyles(doc /*: ?Document*/) {
  try {
    if (doc && doc.body) removeClassName(doc.body, 'react-draggable-transparent-selection');
    // $FlowIgnore: IE
    if (doc.selection) {
      // $FlowIgnore: IE
      doc.selection.empty();
    } else {
      window.getSelection().removeAllRanges(); // remove selection caused by scroll
    }
  } catch (e) {
    // probably IE
  }
}

function styleHacks() /*: Object*/ {
  var childStyle /*: Object*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Workaround IE pointer events; see #51
  // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
  return _extends({
    touchAction: 'none'
  }, childStyle);
}

function addClassName(el /*: HTMLElement*/, className /*: string*/) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (!el.className.match(new RegExp('(?:^|\\s)' + className + '(?!\\S)'))) {
      el.className += ' ' + className;
    }
  }
}

function removeClassName(el /*: HTMLElement*/, className /*: string*/) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'g'), '');
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var ReactIs = require('react-is');

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(10)();
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = getBoundPosition;
/* harmony export (immutable) */ __webpack_exports__["g"] = snapToGrid;
/* harmony export (immutable) */ __webpack_exports__["a"] = canDragX;
/* harmony export (immutable) */ __webpack_exports__["b"] = canDragY;
/* harmony export (immutable) */ __webpack_exports__["f"] = getControlPosition;
/* harmony export (immutable) */ __webpack_exports__["c"] = createCoreData;
/* harmony export (immutable) */ __webpack_exports__["d"] = createDraggableData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shims__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__domFns__ = __webpack_require__(2);




/*:: import type Draggable from '../Draggable';*/
/*:: import type {Bounds, ControlPosition, DraggableData, MouseTouchEvent} from './types';*/
/*:: import type DraggableCore from '../DraggableCore';*/


function getBoundPosition(draggable /*: Draggable*/, x /*: number*/, y /*: number*/) /*: [number, number]*/ {
  // If no bounds, short-circuit and move on
  if (!draggable.props.bounds) return [x, y];

  // Clone new bounds
  var bounds = draggable.props.bounds;

  bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds);
  var node = findDOMNode(draggable);

  if (typeof bounds === 'string') {
    var ownerDocument = node.ownerDocument;

    var ownerWindow = ownerDocument.defaultView;
    var boundNode = void 0;
    if (bounds === 'parent') {
      boundNode = node.parentNode;
    } else {
      boundNode = ownerDocument.querySelector(bounds);
    }
    if (!(boundNode instanceof ownerWindow.HTMLElement)) {
      throw new Error('Bounds selector "' + bounds + '" could not find an element.');
    }
    var nodeStyle = ownerWindow.getComputedStyle(node);
    var boundNodeStyle = ownerWindow.getComputedStyle(boundNode);
    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
    bounds = {
      left: -node.offsetLeft + Object(__WEBPACK_IMPORTED_MODULE_0__shims__["c" /* int */])(boundNodeStyle.paddingLeft) + Object(__WEBPACK_IMPORTED_MODULE_0__shims__["c" /* int */])(nodeStyle.marginLeft),
      top: -node.offsetTop + Object(__WEBPACK_IMPORTED_MODULE_0__shims__["c" /* int */])(boundNodeStyle.paddingTop) + Object(__WEBPACK_IMPORTED_MODULE_0__shims__["c" /* int */])(nodeStyle.marginTop),
      right: Object(__WEBPACK_IMPORTED_MODULE_2__domFns__["h" /* innerWidth */])(boundNode) - Object(__WEBPACK_IMPORTED_MODULE_2__domFns__["l" /* outerWidth */])(node) - node.offsetLeft + Object(__WEBPACK_IMPORTED_MODULE_0__shims__["c" /* int */])(boundNodeStyle.paddingRight) - Object(__WEBPACK_IMPORTED_MODULE_0__shims__["c" /* int */])(nodeStyle.marginRight),
      bottom: Object(__WEBPACK_IMPORTED_MODULE_2__domFns__["g" /* innerHeight */])(boundNode) - Object(__WEBPACK_IMPORTED_MODULE_2__domFns__["k" /* outerHeight */])(node) - node.offsetTop + Object(__WEBPACK_IMPORTED_MODULE_0__shims__["c" /* int */])(boundNodeStyle.paddingBottom) - Object(__WEBPACK_IMPORTED_MODULE_0__shims__["c" /* int */])(nodeStyle.marginBottom)
    };
  }

  // Keep x and y below right and bottom limits...
  if (Object(__WEBPACK_IMPORTED_MODULE_0__shims__["e" /* isNum */])(bounds.right)) x = Math.min(x, bounds.right);
  if (Object(__WEBPACK_IMPORTED_MODULE_0__shims__["e" /* isNum */])(bounds.bottom)) y = Math.min(y, bounds.bottom);

  // But above left and top limits.
  if (Object(__WEBPACK_IMPORTED_MODULE_0__shims__["e" /* isNum */])(bounds.left)) x = Math.max(x, bounds.left);
  if (Object(__WEBPACK_IMPORTED_MODULE_0__shims__["e" /* isNum */])(bounds.top)) y = Math.max(y, bounds.top);

  return [x, y];
}

function snapToGrid(grid /*: [number, number]*/, pendingX /*: number*/, pendingY /*: number*/) /*: [number, number]*/ {
  var x = Math.round(pendingX / grid[0]) * grid[0];
  var y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}

function canDragX(draggable /*: Draggable*/) /*: boolean*/ {
  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
}

function canDragY(draggable /*: Draggable*/) /*: boolean*/ {
  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
}

// Get {x, y} positions from event.
function getControlPosition(e /*: MouseTouchEvent*/, touchIdentifier /*: ?number*/, draggableCore /*: DraggableCore*/) /*: ?ControlPosition*/ {
  var touchObj = typeof touchIdentifier === 'number' ? Object(__WEBPACK_IMPORTED_MODULE_2__domFns__["e" /* getTouch */])(e, touchIdentifier) : null;
  if (typeof touchIdentifier === 'number' && !touchObj) return null; // not the right touch
  var node = findDOMNode(draggableCore);
  // User can provide an offsetParent if desired.
  var offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
  return Object(__WEBPACK_IMPORTED_MODULE_2__domFns__["j" /* offsetXYFromParent */])(touchObj || e, offsetParent);
}

// Create an data object exposed by <DraggableCore>'s events
function createCoreData(draggable /*: DraggableCore*/, x /*: number*/, y /*: number*/) /*: DraggableData*/ {
  var state = draggable.state;
  var isStart = !Object(__WEBPACK_IMPORTED_MODULE_0__shims__["e" /* isNum */])(state.lastX);
  var node = findDOMNode(draggable);

  if (isStart) {
    // If this is our first move, use the x and y as last coords.
    return {
      node: node,
      deltaX: 0, deltaY: 0,
      lastX: x, lastY: y,
      x: x, y: y
    };
  } else {
    // Otherwise calculate proper values.
    return {
      node: node,
      deltaX: x - state.lastX, deltaY: y - state.lastY,
      lastX: state.lastX, lastY: state.lastY,
      x: x, y: y
    };
  }
}

// Create an data exposed by <Draggable>'s events
function createDraggableData(draggable /*: Draggable*/, coreData /*: DraggableData*/) /*: DraggableData*/ {
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
function cloneBounds(bounds /*: Bounds*/) /*: Bounds*/ {
  return {
    left: bounds.left,
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.bottom
  };
}

function findDOMNode(draggable /*: Draggable | DraggableCore*/) /*: HTMLElement*/ {
  var node = __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.findDOMNode(draggable);
  if (!node) {
    throw new Error('<DraggableCore>: Unmounted during event!');
  }
  // $FlowIgnore we can't assert on HTMLElement due to tests... FIXME
  return node;
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_domFns__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_positionFns__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_shims__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_log__ = __webpack_require__(7);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









/*:: import type {EventHandler, MouseTouchEvent} from './utils/types';*/


// Simple abstraction for dragging events names.
/*:: import type {Element as ReactElement} from 'react';*/
var eventsFor = {
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  },
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  }
};

// Default to mouse events.
var dragEventFor = eventsFor.mouse;

/*:: type DraggableCoreState = {
  dragging: boolean,
  lastX: number,
  lastY: number,
  touchIdentifier: ?number
};*/
/*:: export type DraggableBounds = {
  left: number,
  right: number,
  top: number,
  bottom: number,
};*/
/*:: export type DraggableData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number,
};*/
/*:: export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void;*/
/*:: export type ControlPosition = {x: number, y: number};*/


//
// Define <DraggableCore>.
//
// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
// work well with libraries that require more control over the element.
//

/*:: export type DraggableCoreProps = {
  allowAnyClick: boolean,
  cancel: string,
  children: ReactElement<any>,
  disabled: boolean,
  enableUserSelectHack: boolean,
  offsetParent: HTMLElement,
  grid: [number, number],
  handle: string,
  onStart: DraggableEventHandler,
  onDrag: DraggableEventHandler,
  onStop: DraggableEventHandler,
  onMouseDown: (e: MouseEvent) => void,
};*/

var DraggableCore = function (_React$Component) {
  _inherits(DraggableCore, _React$Component);

  function DraggableCore() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DraggableCore);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DraggableCore.__proto__ || Object.getPrototypeOf(DraggableCore)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dragging: false,
      // Used while dragging to determine deltas.
      lastX: NaN, lastY: NaN,
      touchIdentifier: null
    }, _this.handleDragStart = function (e) {
      // Make it possible to attach event handlers on top of this one.
      _this.props.onMouseDown(e);

      // Only accept left-clicks.
      if (!_this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false;

      // Get nodes. Be sure to grab relative document (could be iframed)
      var thisNode = __WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.findDOMNode(_this);
      if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
        throw new Error('<DraggableCore> not mounted on DragStart!');
      }
      var ownerDocument = thisNode.ownerDocument;

      // Short circuit if handle or cancel prop was provided and selector doesn't match.

      if (_this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || _this.props.handle && !Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["i" /* matchesSelectorAndParentsTo */])(e.target, _this.props.handle, thisNode) || _this.props.cancel && Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["i" /* matchesSelectorAndParentsTo */])(e.target, _this.props.cancel, thisNode)) {
        return;
      }

      // Set touch identifier in component state if this is a touch event. This allows us to
      // distinguish between individual touches on multitouch screens by identifying which
      // touchpoint was set to this element.
      var touchIdentifier = Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["f" /* getTouchIdentifier */])(e);
      _this.setState({ touchIdentifier: touchIdentifier });

      // Get the current drag point from the event. This is used as the offset.
      var position = Object(__WEBPACK_IMPORTED_MODULE_4__utils_positionFns__["f" /* getControlPosition */])(e, touchIdentifier, _this);
      if (position == null) return; // not possible but satisfies flow
      var x = position.x,
          y = position.y;

      // Create an event object with all the data parents need to make a decision here.

      var coreEvent = Object(__WEBPACK_IMPORTED_MODULE_4__utils_positionFns__["c" /* createCoreData */])(_this, x, y);

      Object(__WEBPACK_IMPORTED_MODULE_6__utils_log__["a" /* default */])('DraggableCore: handleDragStart: %j', coreEvent);

      // Call event handler. If it returns explicit false, cancel.
      Object(__WEBPACK_IMPORTED_MODULE_6__utils_log__["a" /* default */])('calling', _this.props.onStart);
      var shouldUpdate = _this.props.onStart(e, coreEvent);
      if (shouldUpdate === false) return;

      // Add a style to the body to disable user-select. This prevents text from
      // being selected all over the page.
      if (_this.props.enableUserSelectHack) Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["b" /* addUserSelectStyles */])(ownerDocument);

      // Initiate dragging. Set the current x and y as offsets
      // so we know how much we've moved during the drag. This allows us
      // to drag elements around even if they have been moved, without issue.
      _this.setState({
        dragging: true,

        lastX: x,
        lastY: y
      });

      // Add events to the document directly so we catch when the user's mouse/touch moves outside of
      // this element. We use different events depending on whether or not we have detected that this
      // is a touch-capable device.
      Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["a" /* addEvent */])(ownerDocument, dragEventFor.move, _this.handleDrag);
      Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["a" /* addEvent */])(ownerDocument, dragEventFor.stop, _this.handleDragStop);
    }, _this.handleDrag = function (e) {

      // Prevent scrolling on mobile devices, like ipad/iphone.
      if (e.type === 'touchmove') e.preventDefault();

      // Get the current drag point from the event. This is used as the offset.
      var position = Object(__WEBPACK_IMPORTED_MODULE_4__utils_positionFns__["f" /* getControlPosition */])(e, _this.state.touchIdentifier, _this);
      if (position == null) return;
      var x = position.x,
          y = position.y;

      // Snap to grid if prop has been provided

      if (Array.isArray(_this.props.grid)) {
        var _deltaX = x - _this.state.lastX,
            _deltaY = y - _this.state.lastY;

        var _snapToGrid = Object(__WEBPACK_IMPORTED_MODULE_4__utils_positionFns__["g" /* snapToGrid */])(_this.props.grid, _deltaX, _deltaY);

        var _snapToGrid2 = _slicedToArray(_snapToGrid, 2);

        _deltaX = _snapToGrid2[0];
        _deltaY = _snapToGrid2[1];

        if (!_deltaX && !_deltaY) return; // skip useless drag
        x = _this.state.lastX + _deltaX, y = _this.state.lastY + _deltaY;
      }

      var coreEvent = Object(__WEBPACK_IMPORTED_MODULE_4__utils_positionFns__["c" /* createCoreData */])(_this, x, y);

      Object(__WEBPACK_IMPORTED_MODULE_6__utils_log__["a" /* default */])('DraggableCore: handleDrag: %j', coreEvent);

      // Call event handler. If it returns explicit false, trigger end.
      var shouldUpdate = _this.props.onDrag(e, coreEvent);
      if (shouldUpdate === false) {
        try {
          // $FlowIgnore
          _this.handleDragStop(new MouseEvent('mouseup'));
        } catch (err) {
          // Old browsers
          var event = ((document.createEvent('MouseEvents') /*: any*/) /*: MouseTouchEvent*/);
          // I see why this insanity was deprecated
          // $FlowIgnore
          event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          _this.handleDragStop(event);
        }
        return;
      }

      _this.setState({
        lastX: x,
        lastY: y
      });
    }, _this.handleDragStop = function (e) {
      if (!_this.state.dragging) return;

      var position = Object(__WEBPACK_IMPORTED_MODULE_4__utils_positionFns__["f" /* getControlPosition */])(e, _this.state.touchIdentifier, _this);
      if (position == null) return;
      var x = position.x,
          y = position.y;

      var coreEvent = Object(__WEBPACK_IMPORTED_MODULE_4__utils_positionFns__["c" /* createCoreData */])(_this, x, y);

      var thisNode = __WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.findDOMNode(_this);
      if (thisNode) {
        // Remove user-select hack
        if (_this.props.enableUserSelectHack) Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["n" /* removeUserSelectStyles */])(thisNode.ownerDocument);
      }

      Object(__WEBPACK_IMPORTED_MODULE_6__utils_log__["a" /* default */])('DraggableCore: handleDragStop: %j', coreEvent);

      // Reset the el.
      _this.setState({
        dragging: false,
        lastX: NaN,
        lastY: NaN
      });

      // Call event handler
      _this.props.onStop(e, coreEvent);

      if (thisNode) {
        // Remove event handlers
        Object(__WEBPACK_IMPORTED_MODULE_6__utils_log__["a" /* default */])('DraggableCore: Removing handlers');
        Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["m" /* removeEvent */])(thisNode.ownerDocument, dragEventFor.move, _this.handleDrag);
        Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["m" /* removeEvent */])(thisNode.ownerDocument, dragEventFor.stop, _this.handleDragStop);
      }
    }, _this.onMouseDown = function (e) {
      dragEventFor = eventsFor.mouse; // on touchscreen laptops we could switch back to mouse

      return _this.handleDragStart(e);
    }, _this.onMouseUp = function (e) {
      dragEventFor = eventsFor.mouse;

      return _this.handleDragStop(e);
    }, _this.onTouchStart = function (e) {
      // We're on a touch device now, so change the event handlers
      dragEventFor = eventsFor.touch;

      return _this.handleDragStart(e);
    }, _this.onTouchEnd = function (e) {
      // We're on a touch device now, so change the event handlers
      dragEventFor = eventsFor.touch;

      return _this.handleDragStop(e);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DraggableCore, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Remove any leftover event handlers. Remove both touch and mouse handlers in case
      // some browser quirk caused a touch event to fire during a mouse move, or vice versa.
      var thisNode = __WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.findDOMNode(this);
      if (thisNode) {
        var ownerDocument = thisNode.ownerDocument;

        Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["m" /* removeEvent */])(ownerDocument, eventsFor.mouse.move, this.handleDrag);
        Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["m" /* removeEvent */])(ownerDocument, eventsFor.touch.move, this.handleDrag);
        Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["m" /* removeEvent */])(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
        Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["m" /* removeEvent */])(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
        if (this.props.enableUserSelectHack) Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["n" /* removeUserSelectStyles */])(ownerDocument);
      }
    }

    // Same as onMouseDown (start drag), but now consider this a touch device.

  }, {
    key: 'render',
    value: function render() {
      // Reuse the child provided
      // This makes it flexible to use whatever element is wanted (div, ul, etc)
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.only(this.props.children), {
        style: Object(__WEBPACK_IMPORTED_MODULE_3__utils_domFns__["o" /* styleHacks */])(this.props.children.props.style),

        // Note: mouseMove handler is attached to document so it will still function
        // when the user drags quickly and leaves the bounds of the element.
        onMouseDown: this.onMouseDown,
        onTouchStart: this.onTouchStart,
        onMouseUp: this.onMouseUp,
        onTouchEnd: this.onTouchEnd
      });
    }
  }]);

  return DraggableCore;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

DraggableCore.displayName = 'DraggableCore';
DraggableCore.propTypes = {
  /**
   * `allowAnyClick` allows dragging using any mouse button.
   * By default, we only accept the left button.
   *
   * Defaults to `false`.
   */
  allowAnyClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,

  /**
   * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
   * with the exception of `onMouseDown`, will not fire.
   */
  disabled: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,

  /**
   * By default, we add 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag. If this is causing problems
   * for your app, set this to `false`.
   */
  enableUserSelectHack: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,

  /**
   * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
   * instead of using the parent node.
   */
  offsetParent: function offsetParent(props /*: DraggableCoreProps*/, propName /*: $Keys<DraggableCoreProps>*/) {
    if (props[propName] && props[propName].nodeType !== 1) {
      throw new Error('Draggable\'s offsetParent must be a DOM Node.');
    }
  },

  /**
   * `grid` specifies the x and y that dragging should snap to.
   */
  grid: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number),

  /**
   * `handle` specifies a selector to be used as the handle that initiates drag.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable handle=".handle">
   *              <div>
   *                  <div className="handle">Click me to drag</div>
   *                  <div>This is some other content</div>
   *              </div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  handle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,

  /**
   * `cancel` specifies a selector to be used to prevent drag initialization.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *           return(
   *               <Draggable cancel=".cancel">
   *                   <div>
   *                     <div className="cancel">You can't drag from here</div>
   *                     <div>Dragging here works fine</div>
   *                   </div>
   *               </Draggable>
   *           );
   *       }
   *   });
   * ```
   */
  cancel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,

  /**
   * Called when dragging starts.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onStart: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,

  /**
   * Called while dragging.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onDrag: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,

  /**
   * Called when dragging stops.
   * If this function returns the boolean false, the drag will remain active.
   */
  onStop: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,

  /**
   * A workaround option which can be passed if onMouseDown needs to be accessed,
   * since it'll always be blocked (as there is internal use of onMouseDown)
   */
  onMouseDown: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,

  /**
   * These properties should be defined on the child, not here.
   */
  className: __WEBPACK_IMPORTED_MODULE_5__utils_shims__["a" /* dontSetMe */],
  style: __WEBPACK_IMPORTED_MODULE_5__utils_shims__["a" /* dontSetMe */],
  transform: __WEBPACK_IMPORTED_MODULE_5__utils_shims__["a" /* dontSetMe */]
};
DraggableCore.defaultProps = {
  allowAnyClick: false, // by default only accept left click
  cancel: null,
  disabled: false,
  enableUserSelectHack: true,
  offsetParent: null,
  handle: null,
  grid: null,
  transform: null,
  onStart: function onStart() {},
  onDrag: function onDrag() {},
  onStop: function onStop() {},
  onMouseDown: function onMouseDown() {}
};
/* harmony default export */ __webpack_exports__["default"] = (DraggableCore);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = log;

/*eslint no-console:0*/
function log() {
  var _console;

  if (true) (_console = console).log.apply(_console, arguments);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Draggable = __webpack_require__(9).default;

// Previous versions of this lib exported <Draggable> as the root export. As to not break
// them, or TypeScript, we export *both* as the root and as 'default'.
// See https://github.com/mzabriskie/react-draggable/pull/254
// and https://github.com/mzabriskie/react-draggable/issues/266
module.exports = Draggable;
module.exports.default = Draggable;
module.exports.DraggableCore = __webpack_require__(6).default;

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_domFns__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_positionFns__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_shims__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__DraggableCore__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_log__ = __webpack_require__(7);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









/*:: import type {ControlPosition, DraggableBounds, DraggableCoreProps} from './DraggableCore';*/


/*:: import type {DraggableEventHandler} from './utils/types';*/
/*:: import type {Element as ReactElement} from 'react';*/
/*:: type DraggableState = {
  dragging: boolean,
  dragged: boolean,
  x: number, y: number,
  slackX: number, slackY: number,
  isElementSVG: boolean
};*/


//
// Define <Draggable>
//

/*:: export type DraggableProps = {
  ...$Exact<DraggableCoreProps>,
  axis: 'both' | 'x' | 'y' | 'none',
  bounds: DraggableBounds | string | false,
  defaultClassName: string,
  defaultClassNameDragging: string,
  defaultClassNameDragged: string,
  defaultPosition: ControlPosition,
  position: ControlPosition,
};*/

var Draggable = function (_React$Component) {
  _inherits(Draggable, _React$Component);

  function Draggable(props /*: DraggableProps*/) {
    _classCallCheck(this, Draggable);

    var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this, props));

    _this.onDragStart = function (e, coreData) {
      Object(__WEBPACK_IMPORTED_MODULE_8__utils_log__["a" /* default */])('Draggable: onDragStart: %j', coreData);

      // Short-circuit if user's callback killed it.
      var shouldStart = _this.props.onStart(e, Object(__WEBPACK_IMPORTED_MODULE_5__utils_positionFns__["d" /* createDraggableData */])(_this, coreData));
      // Kills start event on core as well, so move handlers are never bound.
      if (shouldStart === false) return false;

      _this.setState({ dragging: true, dragged: true });
    };

    _this.onDrag = function (e, coreData) {
      if (!_this.state.dragging) return false;
      Object(__WEBPACK_IMPORTED_MODULE_8__utils_log__["a" /* default */])('Draggable: onDrag: %j', coreData);

      var uiData = Object(__WEBPACK_IMPORTED_MODULE_5__utils_positionFns__["d" /* createDraggableData */])(_this, coreData);

      var newState /*: $Shape<DraggableState>*/ = {
        x: uiData.x,
        y: uiData.y
      };

      // Keep within bounds.
      if (_this.props.bounds) {
        // Save original x and y.
        var _x = newState.x,
            _y = newState.y;

        // Add slack to the values used to calculate bound position. This will ensure that if
        // we start removing slack, the element won't react to it right away until it's been
        // completely removed.

        newState.x += _this.state.slackX;
        newState.y += _this.state.slackY;

        // Get bound position. This will ceil/floor the x and y within the boundaries.

        var _getBoundPosition = Object(__WEBPACK_IMPORTED_MODULE_5__utils_positionFns__["e" /* getBoundPosition */])(_this, newState.x, newState.y),
            _getBoundPosition2 = _slicedToArray(_getBoundPosition, 2),
            newStateX = _getBoundPosition2[0],
            newStateY = _getBoundPosition2[1];

        newState.x = newStateX;
        newState.y = newStateY;

        // Recalculate slack by noting how much was shaved by the boundPosition handler.
        newState.slackX = _this.state.slackX + (_x - newState.x);
        newState.slackY = _this.state.slackY + (_y - newState.y);

        // Update the event we fire to reflect what really happened after bounds took effect.
        uiData.x = newState.x;
        uiData.y = newState.y;
        uiData.deltaX = newState.x - _this.state.x;
        uiData.deltaY = newState.y - _this.state.y;
      }

      // Short-circuit if user's callback killed it.
      var shouldUpdate = _this.props.onDrag(e, uiData);
      if (shouldUpdate === false) return false;

      _this.setState(newState);
    };

    _this.onDragStop = function (e, coreData) {
      if (!_this.state.dragging) return false;

      // Short-circuit if user's callback killed it.
      var shouldStop = _this.props.onStop(e, Object(__WEBPACK_IMPORTED_MODULE_5__utils_positionFns__["d" /* createDraggableData */])(_this, coreData));
      if (shouldStop === false) return false;

      Object(__WEBPACK_IMPORTED_MODULE_8__utils_log__["a" /* default */])('Draggable: onDragStop: %j', coreData);

      var newState /*: $Shape<DraggableState>*/ = {
        dragging: false,
        slackX: 0,
        slackY: 0
      };

      // If this is a controlled component, the result of this operation will be to
      // revert back to the old position. We expect a handler on `onDragStop`, at the least.
      var controlled = Boolean(_this.props.position);
      if (controlled) {
        var _this$props$position = _this.props.position,
            _x2 = _this$props$position.x,
            _y2 = _this$props$position.y;

        newState.x = _x2;
        newState.y = _y2;
      }

      _this.setState(newState);
    };

    _this.state = {
      // Whether or not we are currently dragging.
      dragging: false,

      // Whether or not we have been dragged before.
      dragged: false,

      // Current transform x and y.
      x: props.position ? props.position.x : props.defaultPosition.x,
      y: props.position ? props.position.y : props.defaultPosition.y,

      // Used for compensating for out-of-bounds drags
      slackX: 0, slackY: 0,

      // Can only determine if SVG after mounting
      isElementSVG: false
    };
    return _this;
  }

  _createClass(Draggable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.position && !(this.props.onDrag || this.props.onStop)) {
        // eslint-disable-next-line
        console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' + 'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the ' + '`position` of this element.');
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Check to see if the element passed is an instanceof SVGElement
      if (typeof window.SVGElement !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.findDOMNode(this) instanceof window.SVGElement) {
        this.setState({ isElementSVG: true });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps /*: Object*/) {
      // Set x/y if position has changed
      if (nextProps.position && (!this.props.position || nextProps.position.x !== this.props.position.x || nextProps.position.y !== this.props.position.y)) {
        this.setState({ x: nextProps.position.x, y: nextProps.position.y });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setState({ dragging: false }); // prevents invariant if unmounted while dragging
    }
  }, {
    key: 'render',
    value: function render() /*: ReactElement<any>*/ {
      var _classNames;

      var style = {},
          svgTransform = null;

      // If this is controlled, we don't want to move it - unless it's dragging.
      var controlled = Boolean(this.props.position);
      var draggable = !controlled || this.state.dragging;

      var position = this.props.position || this.props.defaultPosition;
      var transformOpts = {
        // Set left if horizontal drag is enabled
        x: Object(__WEBPACK_IMPORTED_MODULE_5__utils_positionFns__["a" /* canDragX */])(this) && draggable ? this.state.x : position.x,

        // Set top if vertical drag is enabled
        y: Object(__WEBPACK_IMPORTED_MODULE_5__utils_positionFns__["b" /* canDragY */])(this) && draggable ? this.state.y : position.y,
        r: this.props.rotate ? this.props.rotate : 0
      };

      // If this element was SVG, we use the `transform` attribute.
      if (this.state.isElementSVG) {
        svgTransform = Object(__WEBPACK_IMPORTED_MODULE_4__utils_domFns__["d" /* createSVGTransform */])(transformOpts);
      } else {
        // Add a CSS transform to move the element around. This allows us to move the element around
        // without worrying about whether or not it is relatively or absolutely positioned.
        // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
        // has a clean slate.
        style = Object(__WEBPACK_IMPORTED_MODULE_4__utils_domFns__["c" /* createCSSTransform */])(transformOpts);
      }

      var _props = this.props,
          defaultClassName = _props.defaultClassName,
          defaultClassNameDragging = _props.defaultClassNameDragging,
          defaultClassNameDragged = _props.defaultClassNameDragged;


      var children = __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.only(this.props.children);

      // Mark with class while dragging
      var className = __WEBPACK_IMPORTED_MODULE_3_classnames___default()(children.props.className || '', defaultClassName, (_classNames = {}, _defineProperty(_classNames, defaultClassNameDragging, this.state.dragging), _defineProperty(_classNames, defaultClassNameDragged, this.state.dragged), _classNames));

      // Reuse the child provided
      // This makes it flexible to use whatever element is wanted (div, ul, etc)
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_7__DraggableCore__["default"],
        _extends({}, this.props, { onStart: this.onDragStart, onDrag: this.onDrag, onStop: this.onDragStop }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(children, {
          className: className,
          style: _extends({}, children.props.style, style),
          transform: svgTransform
        })
      );
    }
  }]);

  return Draggable;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Draggable.displayName = 'Draggable';
Draggable.propTypes = _extends({}, __WEBPACK_IMPORTED_MODULE_7__DraggableCore__["default"].propTypes, {

  /**
   * `axis` determines which axis the draggable can move.
   *
   *  Note that all callbacks will still return data as normal. This only
   *  controls flushing to the DOM.
   *
   * 'both' allows movement horizontally and vertically.
   * 'x' limits movement to horizontal axis.
   * 'y' limits movement to vertical axis.
   * 'none' limits all movement.
   *
   * Defaults to 'both'.
   */
  axis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['both', 'x', 'y', 'none']),

  /**
   * `bounds` determines the range of movement available to the element.
   * Available values are:
   *
   * 'parent' restricts movement within the Draggable's parent node.
   *
   * Alternatively, pass an object with the following properties, all of which are optional:
   *
   * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
   *
   * All values are in px.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable bounds={{right: 300, bottom: 300}}>
   *              <div>Content</div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  bounds: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    left: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    right: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    top: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    bottom: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
  }), __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf([false])]),

  defaultClassName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  defaultClassNameDragging: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  defaultClassNameDragged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,

  /**
   * `defaultPosition` specifies the x and y that the dragged item should start at
   *
   * Example:
   *
   * ```jsx
   *      let App = React.createClass({
   *          render: function () {
   *              return (
   *                  <Draggable defaultPosition={{x: 25, y: 25}}>
   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
   *                  </Draggable>
   *              );
   *          }
   *      });
   * ```
   */
  defaultPosition: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    x: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    y: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
  }),

  /**
   * `position`, if present, defines the current position of the element.
   *
   *  This is similar to how form elements in React work - if no `position` is supplied, the component
   *  is uncontrolled.
   *
   * Example:
   *
   * ```jsx
   *      let App = React.createClass({
   *          render: function () {
   *              return (
   *                  <Draggable position={{x: 25, y: 25}}>
   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
   *                  </Draggable>
   *              );
   *          }
   *      });
   * ```
   */
  position: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    x: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    y: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
  }),

  /**
   * These properties should be defined on the child, not here.
   */
  className: __WEBPACK_IMPORTED_MODULE_6__utils_shims__["a" /* dontSetMe */],
  style: __WEBPACK_IMPORTED_MODULE_6__utils_shims__["a" /* dontSetMe */],
  transform: __WEBPACK_IMPORTED_MODULE_6__utils_shims__["a" /* dontSetMe */]
});
Draggable.defaultProps = _extends({}, __WEBPACK_IMPORTED_MODULE_7__DraggableCore__["default"].defaultProps, {
  axis: 'both',
  bounds: false,
  defaultClassName: 'react-draggable',
  defaultClassNameDragging: 'react-draggable-dragging',
  defaultClassNameDragged: 'react-draggable-dragged',
  defaultPosition: { x: 0, y: 0 },
  position: null
});
/* harmony default export */ __webpack_exports__["default"] = (Draggable);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(11);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIi4uL3dlYnBhY2svYm9vdHN0cmFwIGVjMTgzNmE2YjZiMzEyNjA0OGNjIiwiLi4vLi9saWIvdXRpbHMvc2hpbXMuanMiLCIuLi9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmVhY3QtZG9tXCIsXCJjb21tb25qczJcIjpcInJlYWN0LWRvbVwiLFwiYW1kXCI6XCJyZWFjdC1kb21cIixcInJvb3RcIjpcIlJlYWN0RE9NXCJ9IiwiLi4vLi9saWIvdXRpbHMvZ2V0UHJlZml4LmpzIiwiLi4vLi9saWIvdXRpbHMvZG9tRm5zLmpzIiwiLi4vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCIsXCJyb290XCI6XCJSZWFjdFwifSIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanMiLCIuLi8uL2xpYi91dGlscy9wb3NpdGlvbkZucy5qcyIsIi4uLy4vbGliL0RyYWdnYWJsZUNvcmUuanMiLCIuLi8uL2xpYi91dGlscy9sb2cuanMiLCIuLi8uL2luZGV4LmpzIiwiLi4vLi9saWIvRHJhZ2dhYmxlLmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanMiLCIuLi8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIi4uLy4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiXSwibmFtZXMiOlsiZmluZEluQXJyYXkiLCJhcnJheSIsImNhbGxiYWNrIiwiaSIsImxlbmd0aCIsImFwcGx5IiwiaXNGdW5jdGlvbiIsImZ1bmMiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJpc051bSIsIm51bSIsImlzTmFOIiwiaW50IiwiYSIsInBhcnNlSW50IiwiZG9udFNldE1lIiwicHJvcHMiLCJwcm9wTmFtZSIsImNvbXBvbmVudE5hbWUiLCJFcnJvciIsInByZWZpeGVzIiwiZ2V0UHJlZml4IiwicHJvcCIsIndpbmRvdyIsImRvY3VtZW50Iiwic3R5bGUiLCJkb2N1bWVudEVsZW1lbnQiLCJicm93c2VyUHJlZml4VG9LZXkiLCJwcmVmaXgiLCJrZWJhYlRvVGl0bGVDYXNlIiwiYnJvd3NlclByZWZpeFRvU3R5bGUiLCJ0b0xvd2VyQ2FzZSIsInN0ciIsIm91dCIsInNob3VsZENhcGl0YWxpemUiLCJ0b1VwcGVyQ2FzZSIsIm1hdGNoZXNTZWxlY3RvckZ1bmMiLCJtYXRjaGVzU2VsZWN0b3IiLCJlbCIsInNlbGVjdG9yIiwibWV0aG9kIiwibWF0Y2hlc1NlbGVjdG9yQW5kUGFyZW50c1RvIiwiYmFzZU5vZGUiLCJub2RlIiwicGFyZW50Tm9kZSIsImFkZEV2ZW50IiwiZXZlbnQiLCJoYW5kbGVyIiwiYXR0YWNoRXZlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnQiLCJkZXRhY2hFdmVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvdXRlckhlaWdodCIsImhlaWdodCIsImNsaWVudEhlaWdodCIsImNvbXB1dGVkU3R5bGUiLCJvd25lckRvY3VtZW50IiwiZGVmYXVsdFZpZXciLCJnZXRDb21wdXRlZFN0eWxlIiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJCb3R0b21XaWR0aCIsIm91dGVyV2lkdGgiLCJ3aWR0aCIsImNsaWVudFdpZHRoIiwiYm9yZGVyTGVmdFdpZHRoIiwiYm9yZGVyUmlnaHRXaWR0aCIsImlubmVySGVpZ2h0IiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJpbm5lcldpZHRoIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJvZmZzZXRYWUZyb21QYXJlbnQiLCJldnQiLCJvZmZzZXRQYXJlbnQiLCJpc0JvZHkiLCJib2R5Iiwib2Zmc2V0UGFyZW50UmVjdCIsImxlZnQiLCJ0b3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ4IiwiY2xpZW50WCIsInNjcm9sbExlZnQiLCJ5IiwiY2xpZW50WSIsInNjcm9sbFRvcCIsImNyZWF0ZUNTU1RyYW5zZm9ybSIsInIiLCJicm93c2VyUHJlZml4IiwiY3JlYXRlU1ZHVHJhbnNmb3JtIiwiZ2V0VG91Y2giLCJlIiwiaWRlbnRpZmllciIsInRhcmdldFRvdWNoZXMiLCJ0IiwiY2hhbmdlZFRvdWNoZXMiLCJnZXRUb3VjaElkZW50aWZpZXIiLCJhZGRVc2VyU2VsZWN0U3R5bGVzIiwiZG9jIiwic3R5bGVFbCIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJpZCIsImlubmVySFRNTCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXBwZW5kQ2hpbGQiLCJhZGRDbGFzc05hbWUiLCJyZW1vdmVVc2VyU2VsZWN0U3R5bGVzIiwicmVtb3ZlQ2xhc3NOYW1lIiwic2VsZWN0aW9uIiwiZW1wdHkiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJzdHlsZUhhY2tzIiwiY2hpbGRTdHlsZSIsInRvdWNoQWN0aW9uIiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwiYWRkIiwibWF0Y2giLCJSZWdFeHAiLCJyZW1vdmUiLCJyZXBsYWNlIiwiZ2V0Qm91bmRQb3NpdGlvbiIsImRyYWdnYWJsZSIsImJvdW5kcyIsImNsb25lQm91bmRzIiwiZmluZERPTU5vZGUiLCJvd25lcldpbmRvdyIsImJvdW5kTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJIVE1MRWxlbWVudCIsIm5vZGVTdHlsZSIsImJvdW5kTm9kZVN0eWxlIiwib2Zmc2V0TGVmdCIsIm1hcmdpbkxlZnQiLCJvZmZzZXRUb3AiLCJtYXJnaW5Ub3AiLCJyaWdodCIsIm1hcmdpblJpZ2h0IiwiYm90dG9tIiwibWFyZ2luQm90dG9tIiwiTWF0aCIsIm1pbiIsIm1heCIsInNuYXBUb0dyaWQiLCJncmlkIiwicGVuZGluZ1giLCJwZW5kaW5nWSIsInJvdW5kIiwiY2FuRHJhZ1giLCJheGlzIiwiY2FuRHJhZ1kiLCJnZXRDb250cm9sUG9zaXRpb24iLCJ0b3VjaElkZW50aWZpZXIiLCJkcmFnZ2FibGVDb3JlIiwidG91Y2hPYmoiLCJjcmVhdGVDb3JlRGF0YSIsInN0YXRlIiwiaXNTdGFydCIsImxhc3RYIiwiZGVsdGFYIiwiZGVsdGFZIiwibGFzdFkiLCJjcmVhdGVEcmFnZ2FibGVEYXRhIiwiY29yZURhdGEiLCJSZWFjdERPTSIsImV2ZW50c0ZvciIsInRvdWNoIiwic3RhcnQiLCJtb3ZlIiwic3RvcCIsIm1vdXNlIiwiZHJhZ0V2ZW50Rm9yIiwiRHJhZ2dhYmxlQ29yZSIsImRyYWdnaW5nIiwiTmFOIiwiaGFuZGxlRHJhZ1N0YXJ0Iiwib25Nb3VzZURvd24iLCJhbGxvd0FueUNsaWNrIiwiYnV0dG9uIiwidGhpc05vZGUiLCJkaXNhYmxlZCIsInRhcmdldCIsIk5vZGUiLCJoYW5kbGUiLCJjYW5jZWwiLCJzZXRTdGF0ZSIsInBvc2l0aW9uIiwiY29yZUV2ZW50IiwibG9nIiwib25TdGFydCIsInNob3VsZFVwZGF0ZSIsImVuYWJsZVVzZXJTZWxlY3RIYWNrIiwiaGFuZGxlRHJhZyIsImhhbmRsZURyYWdTdG9wIiwicHJldmVudERlZmF1bHQiLCJBcnJheSIsImlzQXJyYXkiLCJvbkRyYWciLCJNb3VzZUV2ZW50IiwiZXJyIiwiY3JlYXRlRXZlbnQiLCJpbml0TW91c2VFdmVudCIsIm9uU3RvcCIsIm9uTW91c2VVcCIsIm9uVG91Y2hTdGFydCIsIm9uVG91Y2hFbmQiLCJSZWFjdCIsImNsb25lRWxlbWVudCIsIkNoaWxkcmVuIiwib25seSIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwiZGlzcGxheU5hbWUiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJib29sIiwibm9kZVR5cGUiLCJhcnJheU9mIiwibnVtYmVyIiwic3RyaW5nIiwidHJhbnNmb3JtIiwiZGVmYXVsdFByb3BzIiwicHJvY2VzcyIsIkRyYWdnYWJsZSIsInJlcXVpcmUiLCJkZWZhdWx0IiwibW9kdWxlIiwiZXhwb3J0cyIsIm9uRHJhZ1N0YXJ0Iiwic2hvdWxkU3RhcnQiLCJkcmFnZ2VkIiwidWlEYXRhIiwibmV3U3RhdGUiLCJzbGFja1giLCJzbGFja1kiLCJuZXdTdGF0ZVgiLCJuZXdTdGF0ZVkiLCJvbkRyYWdTdG9wIiwic2hvdWxkU3RvcCIsImNvbnRyb2xsZWQiLCJCb29sZWFuIiwiZGVmYXVsdFBvc2l0aW9uIiwiaXNFbGVtZW50U1ZHIiwiY29uc29sZSIsIndhcm4iLCJTVkdFbGVtZW50IiwibmV4dFByb3BzIiwic3ZnVHJhbnNmb3JtIiwidHJhbnNmb3JtT3B0cyIsInJvdGF0ZSIsImRlZmF1bHRDbGFzc05hbWUiLCJkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dpbmciLCJkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dlZCIsImNsYXNzTmFtZXMiLCJvbmVPZiIsIm9uZU9mVHlwZSIsInNoYXBlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzVEQTtBQUNPLFNBQVNBLFdBQVQsQ0FBcUJDLEtBQXJCLCtCQUFvREMsUUFBcEQsMkJBQTZFO0FBQ2xGLE9BQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLFNBQVNILE1BQU1HLE1BQS9CLEVBQXVDRCxJQUFJQyxNQUEzQyxFQUFtREQsR0FBbkQsRUFBd0Q7QUFDdEQsUUFBSUQsU0FBU0csS0FBVCxDQUFlSCxRQUFmLEVBQXlCLENBQUNELE1BQU1FLENBQU4sQ0FBRCxFQUFXQSxDQUFYLEVBQWNGLEtBQWQsQ0FBekIsQ0FBSixFQUFvRCxPQUFPQSxNQUFNRSxDQUFOLENBQVA7QUFDckQ7QUFDRjs7QUFFTSxTQUFTRyxVQUFULENBQW9CQyxJQUFwQiwwQkFBd0M7QUFDN0MsU0FBTyxPQUFPQSxJQUFQLEtBQWdCLFVBQWhCLElBQThCQyxPQUFPQyxTQUFQLENBQWlCQyxRQUFqQixDQUEwQkMsSUFBMUIsQ0FBK0JKLElBQS9CLE1BQXlDLG1CQUE5RTtBQUNEOztBQUVNLFNBQVNLLEtBQVQsQ0FBZUMsR0FBZiwwQkFBa0M7QUFDdkMsU0FBTyxPQUFPQSxHQUFQLEtBQWUsUUFBZixJQUEyQixDQUFDQyxNQUFNRCxHQUFOLENBQW5DO0FBQ0Q7O0FBRU0sU0FBU0UsR0FBVCxDQUFhQyxDQUFiLDRCQUFnQztBQUNyQyxTQUFPQyxTQUFTRCxDQUFULEVBQVksRUFBWixDQUFQO0FBQ0Q7O0FBRU0sU0FBU0UsU0FBVCxDQUFtQkMsS0FBbkIsZUFBa0NDLFFBQWxDLGVBQW9EQyxhQUFwRCxlQUEyRTtBQUNoRixNQUFJRixNQUFNQyxRQUFOLENBQUosRUFBcUI7QUFDbkIsV0FBTyxJQUFJRSxLQUFKLG1CQUEwQkYsUUFBMUIsbUJBQWdEQyxhQUFoRCw4Q0FBUDtBQUNEO0FBQ0YsQzs7Ozs7O0FDeEJELCtDOzs7Ozs7Ozs7Ozs7QUNDQSxJQUFNRSxXQUFXLENBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0IsR0FBbEIsRUFBdUIsSUFBdkIsQ0FBakI7QUFDTyxTQUFTQyxTQUFULGdCQUFxRDtBQUFBLE1BQWxDQyxJQUFrQyxvRkFBckIsV0FBcUI7O0FBQzFEO0FBQ0E7QUFDQTtBQUNBLE1BQUksT0FBT0MsTUFBUCxLQUFrQixXQUFsQixJQUFpQyxPQUFPQSxPQUFPQyxRQUFkLEtBQTJCLFdBQWhFLEVBQTZFLE9BQU8sRUFBUDs7QUFFN0UsTUFBTUMsUUFBUUYsT0FBT0MsUUFBUCxDQUFnQkUsZUFBaEIsQ0FBZ0NELEtBQTlDOztBQUVBLE1BQUlILFFBQVFHLEtBQVosRUFBbUIsT0FBTyxFQUFQOztBQUVuQixPQUFLLElBQUl6QixJQUFJLENBQWIsRUFBZ0JBLElBQUlvQixTQUFTbkIsTUFBN0IsRUFBcUNELEdBQXJDLEVBQTBDO0FBQ3hDLFFBQUkyQixtQkFBbUJMLElBQW5CLEVBQXlCRixTQUFTcEIsQ0FBVCxDQUF6QixLQUF5Q3lCLEtBQTdDLEVBQW9ELE9BQU9MLFNBQVNwQixDQUFULENBQVA7QUFDckQ7O0FBRUQsU0FBTyxFQUFQO0FBQ0Q7O0FBRU0sU0FBUzJCLGtCQUFULENBQTRCTCxJQUE1QixlQUEwQ00sTUFBMUMsNEJBQWtFO0FBQ3ZFLFNBQU9BLGNBQVlBLE1BQVosR0FBcUJDLGlCQUFpQlAsSUFBakIsQ0FBckIsR0FBZ0RBLElBQXZEO0FBQ0Q7O0FBRU0sU0FBU1Esb0JBQVQsQ0FBOEJSLElBQTlCLGVBQTRDTSxNQUE1Qyw0QkFBb0U7QUFDekUsU0FBT0EsZUFBYUEsT0FBT0csV0FBUCxFQUFiLFNBQXFDVCxJQUFyQyxHQUE4Q0EsSUFBckQ7QUFDRDs7QUFFRCxTQUFTTyxnQkFBVCxDQUEwQkcsR0FBMUIsNEJBQStDO0FBQzdDLE1BQUlDLE1BQU0sRUFBVjtBQUNBLE1BQUlDLG1CQUFtQixJQUF2QjtBQUNBLE9BQUssSUFBSWxDLElBQUksQ0FBYixFQUFnQkEsSUFBSWdDLElBQUkvQixNQUF4QixFQUFnQ0QsR0FBaEMsRUFBcUM7QUFDbkMsUUFBSWtDLGdCQUFKLEVBQXNCO0FBQ3BCRCxhQUFPRCxJQUFJaEMsQ0FBSixFQUFPbUMsV0FBUCxFQUFQO0FBQ0FELHlCQUFtQixLQUFuQjtBQUNELEtBSEQsTUFHTyxJQUFJRixJQUFJaEMsQ0FBSixNQUFXLEdBQWYsRUFBb0I7QUFDekJrQyx5QkFBbUIsSUFBbkI7QUFDRCxLQUZNLE1BRUE7QUFDTEQsYUFBT0QsSUFBSWhDLENBQUosQ0FBUDtBQUNEO0FBQ0Y7QUFDRCxTQUFPaUMsR0FBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQTtBQUNlWiwrREFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Q0E7QUFDQTs7Ozs7QUFJQSxJQUFJZSxzQkFBc0IsRUFBMUI7QUFDTyxTQUFTQyxlQUFULENBQXlCQyxFQUF6QixhQUFtQ0MsUUFBbkMsNkJBQThEO0FBQ25FLE1BQUksQ0FBQ0gsbUJBQUwsRUFBMEI7QUFDeEJBLDBCQUFzQnZDLG9DQUFXQSxDQUFDLENBQ2hDLFNBRGdDLEVBRWhDLHVCQUZnQyxFQUdoQyxvQkFIZ0MsRUFJaEMsbUJBSmdDLEVBS2hDLGtCQUxnQyxDQUFaLEVBTW5CLFVBQVMyQyxNQUFULEVBQWdCO0FBQ2pCO0FBQ0EsYUFBT3JDLG1DQUFVQSxDQUFDbUMsR0FBR0UsTUFBSCxDQUFYLENBQVA7QUFDRCxLQVRxQixDQUF0QjtBQVVEOztBQUVEO0FBQ0E7QUFDQSxNQUFJLENBQUNyQyxtQ0FBVUEsQ0FBQ21DLEdBQUdGLG1CQUFILENBQVgsQ0FBTCxFQUEwQyxPQUFPLEtBQVA7O0FBRTFDO0FBQ0EsU0FBT0UsR0FBR0YsbUJBQUgsRUFBd0JHLFFBQXhCLENBQVA7QUFDRDs7QUFFRDtBQUNPLFNBQVNFLDJCQUFULENBQXFDSCxFQUFyQyxhQUErQ0MsUUFBL0MsZUFBaUVHLFFBQWpFLDJCQUEwRjtBQUMvRixNQUFJQyxPQUFPTCxFQUFYO0FBQ0EsS0FBRztBQUNELFFBQUlELGdCQUFnQk0sSUFBaEIsRUFBc0JKLFFBQXRCLENBQUosRUFBcUMsT0FBTyxJQUFQO0FBQ3JDLFFBQUlJLFNBQVNELFFBQWIsRUFBdUIsT0FBTyxLQUFQO0FBQ3ZCQyxXQUFPQSxLQUFLQyxVQUFaO0FBQ0QsR0FKRCxRQUlTRCxJQUpUOztBQU1BLFNBQU8sS0FBUDtBQUNEOztBQUVNLFNBQVNFLFFBQVQsQ0FBa0JQLEVBQWxCLGNBQTZCUSxLQUE3QixlQUE0Q0MsT0FBNUMsNEJBQXFFO0FBQzFFLE1BQUksQ0FBQ1QsRUFBTCxFQUFTO0FBQUU7QUFBUztBQUNwQixNQUFJQSxHQUFHVSxXQUFQLEVBQW9CO0FBQ2xCVixPQUFHVSxXQUFILENBQWUsT0FBT0YsS0FBdEIsRUFBNkJDLE9BQTdCO0FBQ0QsR0FGRCxNQUVPLElBQUlULEdBQUdXLGdCQUFQLEVBQXlCO0FBQzlCWCxPQUFHVyxnQkFBSCxDQUFvQkgsS0FBcEIsRUFBMkJDLE9BQTNCLEVBQW9DLElBQXBDO0FBQ0QsR0FGTSxNQUVBO0FBQ0w7QUFDQVQsT0FBRyxPQUFPUSxLQUFWLElBQW1CQyxPQUFuQjtBQUNEO0FBQ0Y7O0FBRU0sU0FBU0csV0FBVCxDQUFxQlosRUFBckIsY0FBZ0NRLEtBQWhDLGVBQStDQyxPQUEvQyw0QkFBd0U7QUFDN0UsTUFBSSxDQUFDVCxFQUFMLEVBQVM7QUFBRTtBQUFTO0FBQ3BCLE1BQUlBLEdBQUdhLFdBQVAsRUFBb0I7QUFDbEJiLE9BQUdhLFdBQUgsQ0FBZSxPQUFPTCxLQUF0QixFQUE2QkMsT0FBN0I7QUFDRCxHQUZELE1BRU8sSUFBSVQsR0FBR2MsbUJBQVAsRUFBNEI7QUFDakNkLE9BQUdjLG1CQUFILENBQXVCTixLQUF2QixFQUE4QkMsT0FBOUIsRUFBdUMsSUFBdkM7QUFDRCxHQUZNLE1BRUE7QUFDTDtBQUNBVCxPQUFHLE9BQU9RLEtBQVYsSUFBbUIsSUFBbkI7QUFDRDtBQUNGOztBQUVNLFNBQVNPLGtCQUFULENBQXFCVixJQUFyQixpQ0FBZ0Q7QUFDckQ7QUFDQTtBQUNBLE1BQUlXLFNBQVNYLEtBQUtZLFlBQWxCO0FBQ0EsTUFBTUMsZ0JBQWdCYixLQUFLYyxhQUFMLENBQW1CQyxXQUFuQixDQUErQkMsZ0JBQS9CLENBQWdEaEIsSUFBaEQsQ0FBdEI7QUFDQVcsWUFBVTFDLDRCQUFHQSxDQUFDNEMsY0FBY0ksY0FBbEIsQ0FBVjtBQUNBTixZQUFVMUMsNEJBQUdBLENBQUM0QyxjQUFjSyxpQkFBbEIsQ0FBVjtBQUNBLFNBQU9QLE1BQVA7QUFDRDs7QUFFTSxTQUFTUSxpQkFBVCxDQUFvQm5CLElBQXBCLGlDQUErQztBQUNwRDtBQUNBO0FBQ0EsTUFBSW9CLFFBQVFwQixLQUFLcUIsV0FBakI7QUFDQSxNQUFNUixnQkFBZ0JiLEtBQUtjLGFBQUwsQ0FBbUJDLFdBQW5CLENBQStCQyxnQkFBL0IsQ0FBZ0RoQixJQUFoRCxDQUF0QjtBQUNBb0IsV0FBU25ELDRCQUFHQSxDQUFDNEMsY0FBY1MsZUFBbEIsQ0FBVDtBQUNBRixXQUFTbkQsNEJBQUdBLENBQUM0QyxjQUFjVSxnQkFBbEIsQ0FBVDtBQUNBLFNBQU9ILEtBQVA7QUFDRDtBQUNNLFNBQVNJLGtCQUFULENBQXFCeEIsSUFBckIsaUNBQWdEO0FBQ3JELE1BQUlXLFNBQVNYLEtBQUtZLFlBQWxCO0FBQ0EsTUFBTUMsZ0JBQWdCYixLQUFLYyxhQUFMLENBQW1CQyxXQUFuQixDQUErQkMsZ0JBQS9CLENBQWdEaEIsSUFBaEQsQ0FBdEI7QUFDQVcsWUFBVTFDLDRCQUFHQSxDQUFDNEMsY0FBY1ksVUFBbEIsQ0FBVjtBQUNBZCxZQUFVMUMsNEJBQUdBLENBQUM0QyxjQUFjYSxhQUFsQixDQUFWO0FBQ0EsU0FBT2YsTUFBUDtBQUNEOztBQUVNLFNBQVNnQixpQkFBVCxDQUFvQjNCLElBQXBCLGlDQUErQztBQUNwRCxNQUFJb0IsUUFBUXBCLEtBQUtxQixXQUFqQjtBQUNBLE1BQU1SLGdCQUFnQmIsS0FBS2MsYUFBTCxDQUFtQkMsV0FBbkIsQ0FBK0JDLGdCQUEvQixDQUFnRGhCLElBQWhELENBQXRCO0FBQ0FvQixXQUFTbkQsNEJBQUdBLENBQUM0QyxjQUFjZSxXQUFsQixDQUFUO0FBQ0FSLFdBQVNuRCw0QkFBR0EsQ0FBQzRDLGNBQWNnQixZQUFsQixDQUFUO0FBQ0EsU0FBT1QsS0FBUDtBQUNEOztBQUVEO0FBQ08sU0FBU1Usa0JBQVQsQ0FBNEJDLEdBQTVCLDJDQUFxRUMsWUFBckUsMENBQWlIO0FBQ3RILE1BQU1DLFNBQVNELGlCQUFpQkEsYUFBYWxCLGFBQWIsQ0FBMkJvQixJQUEzRDtBQUNBLE1BQU1DLG1CQUFtQkYsU0FBUyxFQUFDRyxNQUFNLENBQVAsRUFBVUMsS0FBSyxDQUFmLEVBQVQsR0FBNkJMLGFBQWFNLHFCQUFiLEVBQXREOztBQUVBLE1BQU1DLElBQUlSLElBQUlTLE9BQUosR0FBY1IsYUFBYVMsVUFBM0IsR0FBd0NOLGlCQUFpQkMsSUFBbkU7QUFDQSxNQUFNTSxJQUFJWCxJQUFJWSxPQUFKLEdBQWNYLGFBQWFZLFNBQTNCLEdBQXVDVCxpQkFBaUJFLEdBQWxFOztBQUVBLFNBQU8sRUFBQ0UsSUFBRCxFQUFJRyxJQUFKLEVBQVA7QUFDRDs7QUFFTSxTQUFTRyxrQkFBVCxvQkFBa0Y7QUFBQSxNQUFyRE4sQ0FBcUQsUUFBckRBLENBQXFEO0FBQUEsTUFBbERHLENBQWtELFFBQWxEQSxDQUFrRDtBQUFBLE1BQS9DSSxDQUErQyxRQUEvQ0EsQ0FBK0M7O0FBQ3ZGO0FBQ0EsNkJBQVM5RCxrQkFBa0JBLENBQUMsV0FBbkIsRUFBZ0MrRCxlQUFoQyxDQUFULGlCQUF1RVIsQ0FBdkUsWUFBK0VHLENBQS9FLG1CQUE4RkksQ0FBOUY7QUFDRDs7QUFFTSxTQUFTRSxrQkFBVCxxQkFBaUY7QUFBQSxNQUFwRFQsQ0FBb0QsU0FBcERBLENBQW9EO0FBQUEsTUFBakRHLENBQWlELFNBQWpEQSxDQUFpRDtBQUFBLE1BQTlDSSxDQUE4QyxTQUE5Q0EsQ0FBOEM7O0FBQ3RGLHdCQUFvQlAsQ0FBcEIsVUFBMEJHLENBQTFCLGlCQUF1Q0ksQ0FBdkM7QUFDRDs7QUFFTSxTQUFTRyxRQUFULENBQWtCQyxDQUFsQix3QkFBc0NDLFVBQXRDLHlEQUErRjtBQUNwRyxTQUFRRCxFQUFFRSxhQUFGLElBQW1CbEcsb0NBQVdBLENBQUNnRyxFQUFFRSxhQUFkLEVBQTZCO0FBQUEsV0FBS0QsZUFBZUUsRUFBRUYsVUFBdEI7QUFBQSxHQUE3QixDQUFwQixJQUNDRCxFQUFFSSxjQUFGLElBQW9CcEcsb0NBQVdBLENBQUNnRyxFQUFFSSxjQUFkLEVBQThCO0FBQUEsV0FBS0gsZUFBZUUsRUFBRUYsVUFBdEI7QUFBQSxHQUE5QixDQUQ1QjtBQUVEOztBQUVNLFNBQVNJLGtCQUFULENBQTRCTCxDQUE1QixzQ0FBeUQ7QUFDOUQsTUFBSUEsRUFBRUUsYUFBRixJQUFtQkYsRUFBRUUsYUFBRixDQUFnQixDQUFoQixDQUF2QixFQUEyQyxPQUFPRixFQUFFRSxhQUFGLENBQWdCLENBQWhCLEVBQW1CRCxVQUExQjtBQUMzQyxNQUFJRCxFQUFFSSxjQUFGLElBQW9CSixFQUFFSSxjQUFGLENBQWlCLENBQWpCLENBQXhCLEVBQTZDLE9BQU9KLEVBQUVJLGNBQUYsQ0FBaUIsQ0FBakIsRUFBb0JILFVBQTNCO0FBQzlDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNPLFNBQVNLLG1CQUFULENBQTZCQyxHQUE3QixrQkFBNkM7QUFDbEQsTUFBSSxDQUFDQSxHQUFMLEVBQVU7QUFDVixNQUFJQyxVQUFVRCxJQUFJRSxjQUFKLENBQW1CLDBCQUFuQixDQUFkO0FBQ0EsTUFBSSxDQUFDRCxPQUFMLEVBQWM7QUFDWkEsY0FBVUQsSUFBSUcsYUFBSixDQUFrQixPQUFsQixDQUFWO0FBQ0FGLFlBQVFHLElBQVIsR0FBZSxVQUFmO0FBQ0FILFlBQVFJLEVBQVIsR0FBYSwwQkFBYjtBQUNBSixZQUFRSyxTQUFSLEdBQW9CLHVGQUFwQjtBQUNBTCxZQUFRSyxTQUFSLElBQXFCLGtGQUFyQjtBQUNBTixRQUFJTyxvQkFBSixDQUF5QixNQUF6QixFQUFpQyxDQUFqQyxFQUFvQ0MsV0FBcEMsQ0FBZ0RQLE9BQWhEO0FBQ0Q7QUFDRCxNQUFJRCxJQUFJdkIsSUFBUixFQUFjZ0MsYUFBYVQsSUFBSXZCLElBQWpCLEVBQXVCLHVDQUF2QjtBQUNmOztBQUVNLFNBQVNpQyxzQkFBVCxDQUFnQ1YsR0FBaEMsa0JBQWdEO0FBQ3JELE1BQUk7QUFDRixRQUFJQSxPQUFPQSxJQUFJdkIsSUFBZixFQUFxQmtDLGdCQUFnQlgsSUFBSXZCLElBQXBCLEVBQTBCLHVDQUExQjtBQUNyQjtBQUNBLFFBQUl1QixJQUFJWSxTQUFSLEVBQW1CO0FBQ2pCO0FBQ0FaLFVBQUlZLFNBQUosQ0FBY0MsS0FBZDtBQUNELEtBSEQsTUFHTztBQUNMMUYsYUFBTzJGLFlBQVAsR0FBc0JDLGVBQXRCLEdBREssQ0FDcUM7QUFDM0M7QUFDRixHQVRELENBU0UsT0FBT3RCLENBQVAsRUFBVTtBQUNWO0FBQ0Q7QUFDRjs7QUFFTSxTQUFTdUIsVUFBVCxnQkFBcUQ7QUFBQSxNQUFqQ0MsVUFBaUMsb0ZBQVosRUFBWTs7QUFDMUQ7QUFDQTtBQUNBO0FBQ0VDLGlCQUFhO0FBRGYsS0FFS0QsVUFGTDtBQUlEOztBQUVNLFNBQVNSLFlBQVQsQ0FBc0J2RSxFQUF0QixvQkFBdUNpRixTQUF2QyxlQUEwRDtBQUMvRCxNQUFJakYsR0FBR2tGLFNBQVAsRUFBa0I7QUFDaEJsRixPQUFHa0YsU0FBSCxDQUFhQyxHQUFiLENBQWlCRixTQUFqQjtBQUNELEdBRkQsTUFFTztBQUNMLFFBQUksQ0FBQ2pGLEdBQUdpRixTQUFILENBQWFHLEtBQWIsQ0FBbUIsSUFBSUMsTUFBSixlQUF1QkosU0FBdkIsYUFBbkIsQ0FBTCxFQUFxRTtBQUNuRWpGLFNBQUdpRixTQUFILFVBQW9CQSxTQUFwQjtBQUNEO0FBQ0Y7QUFDRjs7QUFFTSxTQUFTUixlQUFULENBQXlCekUsRUFBekIsb0JBQTBDaUYsU0FBMUMsZUFBNkQ7QUFDbEUsTUFBSWpGLEdBQUdrRixTQUFQLEVBQWtCO0FBQ2hCbEYsT0FBR2tGLFNBQUgsQ0FBYUksTUFBYixDQUFvQkwsU0FBcEI7QUFDRCxHQUZELE1BRU87QUFDTGpGLE9BQUdpRixTQUFILEdBQWVqRixHQUFHaUYsU0FBSCxDQUFhTSxPQUFiLENBQXFCLElBQUlGLE1BQUosZUFBdUJKLFNBQXZCLGNBQTJDLEdBQTNDLENBQXJCLEVBQXNFLEVBQXRFLENBQWY7QUFDRDtBQUNGLEM7Ozs7OztBQzdMRCwrQzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksS0FBcUM7QUFDekM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLG1CQUFtQixtQkFBTyxDQUFDLEVBQTRCO0FBQ3ZEOzs7Ozs7OztBQ2pCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOzs7Ozs7O0FBTU8sU0FBU08sZ0JBQVQsQ0FBMEJDLFNBQTFCLGtCQUFnRDdDLENBQWhELGVBQTJERyxDQUEzRCxzQ0FBd0Y7QUFDN0Y7QUFDQSxNQUFJLENBQUMwQyxVQUFVL0csS0FBVixDQUFnQmdILE1BQXJCLEVBQTZCLE9BQU8sQ0FBQzlDLENBQUQsRUFBSUcsQ0FBSixDQUFQOztBQUU3QjtBQUo2RixNQUt4RjJDLE1BTHdGLEdBSzlFRCxVQUFVL0csS0FMb0UsQ0FLeEZnSCxNQUx3Rjs7QUFNN0ZBLFdBQVMsT0FBT0EsTUFBUCxLQUFrQixRQUFsQixHQUE2QkEsTUFBN0IsR0FBc0NDLFlBQVlELE1BQVosQ0FBL0M7QUFDQSxNQUFNckYsT0FBT3VGLFlBQVlILFNBQVosQ0FBYjs7QUFFQSxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0M7QUFBQSxRQUN2QnZFLGFBRHVCLEdBQ05kLElBRE0sQ0FDdkJjLGFBRHVCOztBQUU5QixRQUFNMEUsY0FBYzFFLGNBQWNDLFdBQWxDO0FBQ0EsUUFBSTBFLGtCQUFKO0FBQ0EsUUFBSUosV0FBVyxRQUFmLEVBQXlCO0FBQ3ZCSSxrQkFBWXpGLEtBQUtDLFVBQWpCO0FBQ0QsS0FGRCxNQUVPO0FBQ0x3RixrQkFBWTNFLGNBQWM0RSxhQUFkLENBQTRCTCxNQUE1QixDQUFaO0FBQ0Q7QUFDRCxRQUFJLEVBQUVJLHFCQUFxQkQsWUFBWUcsV0FBbkMsQ0FBSixFQUFxRDtBQUNuRCxZQUFNLElBQUluSCxLQUFKLENBQVUsc0JBQXNCNkcsTUFBdEIsR0FBK0IsOEJBQXpDLENBQU47QUFDRDtBQUNELFFBQU1PLFlBQVlKLFlBQVl4RSxnQkFBWixDQUE2QmhCLElBQTdCLENBQWxCO0FBQ0EsUUFBTTZGLGlCQUFpQkwsWUFBWXhFLGdCQUFaLENBQTZCeUUsU0FBN0IsQ0FBdkI7QUFDQTtBQUNBSixhQUFTO0FBQ1BqRCxZQUFNLENBQUNwQyxLQUFLOEYsVUFBTixHQUFtQjdILDJEQUFHQSxDQUFDNEgsZUFBZWpFLFdBQW5CLENBQW5CLEdBQXFEM0QsMkRBQUdBLENBQUMySCxVQUFVRyxVQUFkLENBRHBEO0FBRVAxRCxXQUFLLENBQUNyQyxLQUFLZ0csU0FBTixHQUFrQi9ILDJEQUFHQSxDQUFDNEgsZUFBZXBFLFVBQW5CLENBQWxCLEdBQW1EeEQsMkRBQUdBLENBQUMySCxVQUFVSyxTQUFkLENBRmpEO0FBR1BDLGFBQU92RSxtRUFBVUEsQ0FBQzhELFNBQVgsSUFBd0J0RSxtRUFBVUEsQ0FBQ25CLElBQVgsQ0FBeEIsR0FBMkNBLEtBQUs4RixVQUFoRCxHQUNMN0gsMkRBQUdBLENBQUM0SCxlQUFlaEUsWUFBbkIsQ0FESyxHQUM4QjVELDJEQUFHQSxDQUFDMkgsVUFBVU8sV0FBZCxDQUo5QjtBQUtQQyxjQUFRNUUsb0VBQVdBLENBQUNpRSxTQUFaLElBQXlCL0Usb0VBQVdBLENBQUNWLElBQVosQ0FBekIsR0FBNkNBLEtBQUtnRyxTQUFsRCxHQUNOL0gsMkRBQUdBLENBQUM0SCxlQUFlbkUsYUFBbkIsQ0FETSxHQUM4QnpELDJEQUFHQSxDQUFDMkgsVUFBVVMsWUFBZDtBQU4vQixLQUFUO0FBUUQ7O0FBRUQ7QUFDQSxNQUFJdkksNkRBQUtBLENBQUN1SCxPQUFPYSxLQUFiLENBQUosRUFBeUIzRCxJQUFJK0QsS0FBS0MsR0FBTCxDQUFTaEUsQ0FBVCxFQUFZOEMsT0FBT2EsS0FBbkIsQ0FBSjtBQUN6QixNQUFJcEksNkRBQUtBLENBQUN1SCxPQUFPZSxNQUFiLENBQUosRUFBMEIxRCxJQUFJNEQsS0FBS0MsR0FBTCxDQUFTN0QsQ0FBVCxFQUFZMkMsT0FBT2UsTUFBbkIsQ0FBSjs7QUFFMUI7QUFDQSxNQUFJdEksNkRBQUtBLENBQUN1SCxPQUFPakQsSUFBYixDQUFKLEVBQXdCRyxJQUFJK0QsS0FBS0UsR0FBTCxDQUFTakUsQ0FBVCxFQUFZOEMsT0FBT2pELElBQW5CLENBQUo7QUFDeEIsTUFBSXRFLDZEQUFLQSxDQUFDdUgsT0FBT2hELEdBQWIsQ0FBSixFQUF1QkssSUFBSTRELEtBQUtFLEdBQUwsQ0FBUzlELENBQVQsRUFBWTJDLE9BQU9oRCxHQUFuQixDQUFKOztBQUV2QixTQUFPLENBQUNFLENBQUQsRUFBSUcsQ0FBSixDQUFQO0FBQ0Q7O0FBRU0sU0FBUytELFVBQVQsQ0FBb0JDLElBQXBCLHlCQUE0Q0MsUUFBNUMsZUFBOERDLFFBQTlELHNDQUFrRztBQUN2RyxNQUFNckUsSUFBSStELEtBQUtPLEtBQUwsQ0FBV0YsV0FBV0QsS0FBSyxDQUFMLENBQXRCLElBQWlDQSxLQUFLLENBQUwsQ0FBM0M7QUFDQSxNQUFNaEUsSUFBSTRELEtBQUtPLEtBQUwsQ0FBV0QsV0FBV0YsS0FBSyxDQUFMLENBQXRCLElBQWlDQSxLQUFLLENBQUwsQ0FBM0M7QUFDQSxTQUFPLENBQUNuRSxDQUFELEVBQUlHLENBQUosQ0FBUDtBQUNEOztBQUVNLFNBQVNvRSxRQUFULENBQWtCMUIsU0FBbEIsZ0NBQWlEO0FBQ3RELFNBQU9BLFVBQVUvRyxLQUFWLENBQWdCMEksSUFBaEIsS0FBeUIsTUFBekIsSUFBbUMzQixVQUFVL0csS0FBVixDQUFnQjBJLElBQWhCLEtBQXlCLEdBQW5FO0FBQ0Q7O0FBRU0sU0FBU0MsUUFBVCxDQUFrQjVCLFNBQWxCLGdDQUFpRDtBQUN0RCxTQUFPQSxVQUFVL0csS0FBVixDQUFnQjBJLElBQWhCLEtBQXlCLE1BQXpCLElBQW1DM0IsVUFBVS9HLEtBQVYsQ0FBZ0IwSSxJQUFoQixLQUF5QixHQUFuRTtBQUNEOztBQUVEO0FBQ08sU0FBU0Usa0JBQVQsQ0FBNEIvRCxDQUE1Qix3QkFBZ0RnRSxlQUFoRCxnQkFBMEVDLGFBQTFFLDZDQUEwSDtBQUMvSCxNQUFNQyxXQUFXLE9BQU9GLGVBQVAsS0FBMkIsUUFBM0IsR0FBc0NqRSxpRUFBUUEsQ0FBQ0MsQ0FBVCxFQUFZZ0UsZUFBWixDQUF0QyxHQUFxRSxJQUF0RjtBQUNBLE1BQUksT0FBT0EsZUFBUCxLQUEyQixRQUEzQixJQUF1QyxDQUFDRSxRQUE1QyxFQUFzRCxPQUFPLElBQVAsQ0FGeUUsQ0FFNUQ7QUFDbkUsTUFBTXBILE9BQU91RixZQUFZNEIsYUFBWixDQUFiO0FBQ0E7QUFDQSxNQUFNbkYsZUFBZW1GLGNBQWM5SSxLQUFkLENBQW9CMkQsWUFBcEIsSUFBb0NoQyxLQUFLZ0MsWUFBekMsSUFBeURoQyxLQUFLYyxhQUFMLENBQW1Cb0IsSUFBakc7QUFDQSxTQUFPSiwyRUFBa0JBLENBQUNzRixZQUFZbEUsQ0FBL0IsRUFBa0NsQixZQUFsQyxDQUFQO0FBQ0Q7O0FBRUQ7QUFDTyxTQUFTcUYsY0FBVCxDQUF3QmpDLFNBQXhCLHNCQUFrRDdDLENBQWxELGVBQTZERyxDQUE3RCxtQ0FBdUY7QUFDNUYsTUFBTTRFLFFBQVFsQyxVQUFVa0MsS0FBeEI7QUFDQSxNQUFNQyxVQUFVLENBQUN6Siw2REFBS0EsQ0FBQ3dKLE1BQU1FLEtBQVosQ0FBakI7QUFDQSxNQUFNeEgsT0FBT3VGLFlBQVlILFNBQVosQ0FBYjs7QUFFQSxNQUFJbUMsT0FBSixFQUFhO0FBQ1g7QUFDQSxXQUFPO0FBQ0x2SCxnQkFESztBQUVMeUgsY0FBUSxDQUZILEVBRU1DLFFBQVEsQ0FGZDtBQUdMRixhQUFPakYsQ0FIRixFQUdLb0YsT0FBT2pGLENBSFo7QUFJTEgsVUFKSyxFQUlGRztBQUpFLEtBQVA7QUFNRCxHQVJELE1BUU87QUFDTDtBQUNBLFdBQU87QUFDTDFDLGdCQURLO0FBRUx5SCxjQUFRbEYsSUFBSStFLE1BQU1FLEtBRmIsRUFFb0JFLFFBQVFoRixJQUFJNEUsTUFBTUssS0FGdEM7QUFHTEgsYUFBT0YsTUFBTUUsS0FIUixFQUdlRyxPQUFPTCxNQUFNSyxLQUg1QjtBQUlMcEYsVUFKSyxFQUlGRztBQUpFLEtBQVA7QUFNRDtBQUNGOztBQUVEO0FBQ08sU0FBU2tGLG1CQUFULENBQTZCeEMsU0FBN0Isa0JBQW1EeUMsUUFBbkQsMENBQTJGO0FBQ2hHLFNBQU87QUFDTDdILFVBQU02SCxTQUFTN0gsSUFEVjtBQUVMdUMsT0FBRzZDLFVBQVVrQyxLQUFWLENBQWdCL0UsQ0FBaEIsR0FBb0JzRixTQUFTSixNQUYzQjtBQUdML0UsT0FBRzBDLFVBQVVrQyxLQUFWLENBQWdCNUUsQ0FBaEIsR0FBb0JtRixTQUFTSCxNQUgzQjtBQUlMRCxZQUFRSSxTQUFTSixNQUpaO0FBS0xDLFlBQVFHLFNBQVNILE1BTFo7QUFNTEYsV0FBT3BDLFVBQVVrQyxLQUFWLENBQWdCL0UsQ0FObEI7QUFPTG9GLFdBQU92QyxVQUFVa0MsS0FBVixDQUFnQjVFO0FBUGxCLEdBQVA7QUFTRDs7QUFFRDtBQUNBLFNBQVM0QyxXQUFULENBQXFCRCxNQUFyQiw0QkFBNkM7QUFDM0MsU0FBTztBQUNMakQsVUFBTWlELE9BQU9qRCxJQURSO0FBRUxDLFNBQUtnRCxPQUFPaEQsR0FGUDtBQUdMNkQsV0FBT2IsT0FBT2EsS0FIVDtBQUlMRSxZQUFRZixPQUFPZTtBQUpWLEdBQVA7QUFNRDs7QUFFRCxTQUFTYixXQUFULENBQXFCSCxTQUFyQixvREFBd0U7QUFDdEUsTUFBTXBGLE9BQU84SCxpREFBUUEsQ0FBQ3ZDLFdBQVQsQ0FBcUJILFNBQXJCLENBQWI7QUFDQSxNQUFJLENBQUNwRixJQUFMLEVBQVc7QUFDVCxVQUFNLElBQUl4QixLQUFKLENBQVUsMENBQVYsQ0FBTjtBQUNEO0FBQ0Q7QUFDQSxTQUFPd0IsSUFBUDtBQUNELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwSUQ7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7O0FBQ0EsSUFBTStILFlBQVk7QUFDaEJDLFNBQU87QUFDTEMsV0FBTyxZQURGO0FBRUxDLFVBQU0sV0FGRDtBQUdMQyxVQUFNO0FBSEQsR0FEUztBQU1oQkMsU0FBTztBQUNMSCxXQUFPLFdBREY7QUFFTEMsVUFBTSxXQUZEO0FBR0xDLFVBQU07QUFIRDtBQU5TLENBQWxCOztBQWFBO0FBQ0EsSUFBSUUsZUFBZU4sVUFBVUssS0FBN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCRSxhOzs7Ozs7Ozs7Ozs7OztvTUFvSW5CaEIsSyxHQUFRO0FBQ05pQixnQkFBVSxLQURKO0FBRU47QUFDQWYsYUFBT2dCLEdBSEQsRUFHTWIsT0FBT2EsR0FIYjtBQUlOdEIsdUJBQWlCO0FBSlgsSyxRQXFCUnVCLGUsR0FBaUQsVUFBQ3ZGLENBQUQsRUFBTztBQUN0RDtBQUNBLFlBQUs3RSxLQUFMLENBQVdxSyxXQUFYLENBQXVCeEYsQ0FBdkI7O0FBRUE7QUFDQSxVQUFJLENBQUMsTUFBSzdFLEtBQUwsQ0FBV3NLLGFBQVosSUFBNkIsT0FBT3pGLEVBQUUwRixNQUFULEtBQW9CLFFBQWpELElBQTZEMUYsRUFBRTBGLE1BQUYsS0FBYSxDQUE5RSxFQUFpRixPQUFPLEtBQVA7O0FBRWpGO0FBQ0EsVUFBTUMsV0FBV2YsaURBQVFBLENBQUN2QyxXQUFULE9BQWpCO0FBQ0EsVUFBSSxDQUFDc0QsUUFBRCxJQUFhLENBQUNBLFNBQVMvSCxhQUF2QixJQUF3QyxDQUFDK0gsU0FBUy9ILGFBQVQsQ0FBdUJvQixJQUFwRSxFQUEwRTtBQUN4RSxjQUFNLElBQUkxRCxLQUFKLENBQVUsMkNBQVYsQ0FBTjtBQUNEO0FBWHFELFVBWS9Dc0MsYUFaK0MsR0FZOUIrSCxRQVo4QixDQVkvQy9ILGFBWitDOztBQWN0RDs7QUFDQSxVQUFJLE1BQUt6QyxLQUFMLENBQVd5SyxRQUFYLElBQ0QsRUFBRTVGLEVBQUU2RixNQUFGLFlBQW9CakksY0FBY0MsV0FBZCxDQUEwQmlJLElBQWhELENBREMsSUFFRCxNQUFLM0ssS0FBTCxDQUFXNEssTUFBWCxJQUFxQixDQUFDbkosMEZBQTJCQSxDQUFDb0QsRUFBRTZGLE1BQTlCLEVBQXNDLE1BQUsxSyxLQUFMLENBQVc0SyxNQUFqRCxFQUF5REosUUFBekQsQ0FGckIsSUFHRCxNQUFLeEssS0FBTCxDQUFXNkssTUFBWCxJQUFxQnBKLDBGQUEyQkEsQ0FBQ29ELEVBQUU2RixNQUE5QixFQUFzQyxNQUFLMUssS0FBTCxDQUFXNkssTUFBakQsRUFBeURMLFFBQXpELENBSHhCLEVBRzZGO0FBQzNGO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsVUFBTTNCLGtCQUFrQjNELGlGQUFrQkEsQ0FBQ0wsQ0FBbkIsQ0FBeEI7QUFDQSxZQUFLaUcsUUFBTCxDQUFjLEVBQUNqQyxnQ0FBRCxFQUFkOztBQUVBO0FBQ0EsVUFBTWtDLFdBQVduQyxzRkFBa0JBLENBQUMvRCxDQUFuQixFQUFzQmdFLGVBQXRCLFFBQWpCO0FBQ0EsVUFBSWtDLFlBQVksSUFBaEIsRUFBc0IsT0E5QmdDLENBOEJ4QjtBQTlCd0IsVUErQi9DN0csQ0EvQitDLEdBK0J2QzZHLFFBL0J1QyxDQStCL0M3RyxDQS9CK0M7QUFBQSxVQStCNUNHLENBL0I0QyxHQStCdkMwRyxRQS9CdUMsQ0ErQjVDMUcsQ0EvQjRDOztBQWlDdEQ7O0FBQ0EsVUFBTTJHLFlBQVloQyxrRkFBY0EsUUFBTzlFLENBQXJCLEVBQXdCRyxDQUF4QixDQUFsQjs7QUFFQTRHLHlFQUFHQSxDQUFDLG9DQUFKLEVBQTBDRCxTQUExQzs7QUFFQTtBQUNBQyx5RUFBR0EsQ0FBQyxTQUFKLEVBQWUsTUFBS2pMLEtBQUwsQ0FBV2tMLE9BQTFCO0FBQ0EsVUFBTUMsZUFBZSxNQUFLbkwsS0FBTCxDQUFXa0wsT0FBWCxDQUFtQnJHLENBQW5CLEVBQXNCbUcsU0FBdEIsQ0FBckI7QUFDQSxVQUFJRyxpQkFBaUIsS0FBckIsRUFBNEI7O0FBRTVCO0FBQ0E7QUFDQSxVQUFJLE1BQUtuTCxLQUFMLENBQVdvTCxvQkFBZixFQUFxQ2pHLGtGQUFtQkEsQ0FBQzFDLGFBQXBCOztBQUVyQztBQUNBO0FBQ0E7QUFDQSxZQUFLcUksUUFBTCxDQUFjO0FBQ1paLGtCQUFVLElBREU7O0FBR1pmLGVBQU9qRixDQUhLO0FBSVpvRixlQUFPakY7QUFKSyxPQUFkOztBQU9BO0FBQ0E7QUFDQTtBQUNBeEMsNkVBQVFBLENBQUNZLGFBQVQsRUFBd0J1SCxhQUFhSCxJQUFyQyxFQUEyQyxNQUFLd0IsVUFBaEQ7QUFDQXhKLDZFQUFRQSxDQUFDWSxhQUFULEVBQXdCdUgsYUFBYUYsSUFBckMsRUFBMkMsTUFBS3dCLGNBQWhEO0FBQ0QsSyxRQUVERCxVLEdBQTRDLFVBQUN4RyxDQUFELEVBQU87O0FBRWpEO0FBQ0EsVUFBSUEsRUFBRVcsSUFBRixLQUFXLFdBQWYsRUFBNEJYLEVBQUUwRyxjQUFGOztBQUU1QjtBQUNBLFVBQU1SLFdBQVduQyxzRkFBa0JBLENBQUMvRCxDQUFuQixFQUFzQixNQUFLb0UsS0FBTCxDQUFXSixlQUFqQyxRQUFqQjtBQUNBLFVBQUlrQyxZQUFZLElBQWhCLEVBQXNCO0FBUDJCLFVBUTVDN0csQ0FSNEMsR0FRcEM2RyxRQVJvQyxDQVE1QzdHLENBUjRDO0FBQUEsVUFRekNHLENBUnlDLEdBUXBDMEcsUUFSb0MsQ0FRekMxRyxDQVJ5Qzs7QUFVakQ7O0FBQ0EsVUFBSW1ILE1BQU1DLE9BQU4sQ0FBYyxNQUFLekwsS0FBTCxDQUFXcUksSUFBekIsQ0FBSixFQUFvQztBQUNsQyxZQUFJZSxVQUFTbEYsSUFBSSxNQUFLK0UsS0FBTCxDQUFXRSxLQUE1QjtBQUFBLFlBQW1DRSxVQUFTaEYsSUFBSSxNQUFLNEUsS0FBTCxDQUFXSyxLQUEzRDs7QUFEa0MsMEJBRWZsQiw4RUFBVUEsQ0FBQyxNQUFLcEksS0FBTCxDQUFXcUksSUFBdEIsRUFBNEJlLE9BQTVCLEVBQW9DQyxPQUFwQyxDQUZlOztBQUFBOztBQUVqQ0QsZUFGaUM7QUFFekJDLGVBRnlCOztBQUdsQyxZQUFJLENBQUNELE9BQUQsSUFBVyxDQUFDQyxPQUFoQixFQUF3QixPQUhVLENBR0Y7QUFDaENuRixZQUFJLE1BQUsrRSxLQUFMLENBQVdFLEtBQVgsR0FBbUJDLE9BQXZCLEVBQStCL0UsSUFBSSxNQUFLNEUsS0FBTCxDQUFXSyxLQUFYLEdBQW1CRCxPQUF0RDtBQUNEOztBQUVELFVBQU0yQixZQUFZaEMsa0ZBQWNBLFFBQU85RSxDQUFyQixFQUF3QkcsQ0FBeEIsQ0FBbEI7O0FBRUE0Ryx5RUFBR0EsQ0FBQywrQkFBSixFQUFxQ0QsU0FBckM7O0FBRUE7QUFDQSxVQUFNRyxlQUFlLE1BQUtuTCxLQUFMLENBQVcwTCxNQUFYLENBQWtCN0csQ0FBbEIsRUFBcUJtRyxTQUFyQixDQUFyQjtBQUNBLFVBQUlHLGlCQUFpQixLQUFyQixFQUE0QjtBQUMxQixZQUFJO0FBQ0Y7QUFDQSxnQkFBS0csY0FBTCxDQUFvQixJQUFJSyxVQUFKLENBQWUsU0FBZixDQUFwQjtBQUNELFNBSEQsQ0FHRSxPQUFPQyxHQUFQLEVBQVk7QUFDWjtBQUNBLGNBQU05SixVQUFVdEIsU0FBU3FMLFdBQVQsQ0FBcUIsYUFBckIsQ0FBVixrQ0FBTjtBQUNBO0FBQ0E7QUFDQS9KLGdCQUFNZ0ssY0FBTixDQUFxQixTQUFyQixFQUFnQyxJQUFoQyxFQUFzQyxJQUF0QyxFQUE0Q3ZMLE1BQTVDLEVBQW9ELENBQXBELEVBQXVELENBQXZELEVBQTBELENBQTFELEVBQTZELENBQTdELEVBQWdFLENBQWhFLEVBQW1FLEtBQW5FLEVBQTBFLEtBQTFFLEVBQWlGLEtBQWpGLEVBQXdGLEtBQXhGLEVBQStGLENBQS9GLEVBQWtHLElBQWxHO0FBQ0EsZ0JBQUsrSyxjQUFMLENBQW9CeEosS0FBcEI7QUFDRDtBQUNEO0FBQ0Q7O0FBRUQsWUFBS2dKLFFBQUwsQ0FBYztBQUNaM0IsZUFBT2pGLENBREs7QUFFWm9GLGVBQU9qRjtBQUZLLE9BQWQ7QUFJRCxLLFFBRURpSCxjLEdBQWdELFVBQUN6RyxDQUFELEVBQU87QUFDckQsVUFBSSxDQUFDLE1BQUtvRSxLQUFMLENBQVdpQixRQUFoQixFQUEwQjs7QUFFMUIsVUFBTWEsV0FBV25DLHNGQUFrQkEsQ0FBQy9ELENBQW5CLEVBQXNCLE1BQUtvRSxLQUFMLENBQVdKLGVBQWpDLFFBQWpCO0FBQ0EsVUFBSWtDLFlBQVksSUFBaEIsRUFBc0I7QUFKK0IsVUFLOUM3RyxDQUw4QyxHQUt0QzZHLFFBTHNDLENBSzlDN0csQ0FMOEM7QUFBQSxVQUszQ0csQ0FMMkMsR0FLdEMwRyxRQUxzQyxDQUszQzFHLENBTDJDOztBQU1yRCxVQUFNMkcsWUFBWWhDLGtGQUFjQSxRQUFPOUUsQ0FBckIsRUFBd0JHLENBQXhCLENBQWxCOztBQUVBLFVBQU1tRyxXQUFXZixpREFBUUEsQ0FBQ3ZDLFdBQVQsT0FBakI7QUFDQSxVQUFJc0QsUUFBSixFQUFjO0FBQ1o7QUFDQSxZQUFJLE1BQUt4SyxLQUFMLENBQVdvTCxvQkFBZixFQUFxQ3RGLHFGQUFzQkEsQ0FBQzBFLFNBQVMvSCxhQUFoQztBQUN0Qzs7QUFFRHdJLHlFQUFHQSxDQUFDLG1DQUFKLEVBQXlDRCxTQUF6Qzs7QUFFQTtBQUNBLFlBQUtGLFFBQUwsQ0FBYztBQUNaWixrQkFBVSxLQURFO0FBRVpmLGVBQU9nQixHQUZLO0FBR1piLGVBQU9hO0FBSEssT0FBZDs7QUFNQTtBQUNBLFlBQUtuSyxLQUFMLENBQVcrTCxNQUFYLENBQWtCbEgsQ0FBbEIsRUFBcUJtRyxTQUFyQjs7QUFFQSxVQUFJUixRQUFKLEVBQWM7QUFDWjtBQUNBUywyRUFBR0EsQ0FBQyxrQ0FBSjtBQUNBL0ksa0ZBQVdBLENBQUNzSSxTQUFTL0gsYUFBckIsRUFBb0N1SCxhQUFhSCxJQUFqRCxFQUF1RCxNQUFLd0IsVUFBNUQ7QUFDQW5KLGtGQUFXQSxDQUFDc0ksU0FBUy9ILGFBQXJCLEVBQW9DdUgsYUFBYUYsSUFBakQsRUFBdUQsTUFBS3dCLGNBQTVEO0FBQ0Q7QUFDRixLLFFBRURqQixXLEdBQTZDLFVBQUN4RixDQUFELEVBQU87QUFDbERtRixxQkFBZU4sVUFBVUssS0FBekIsQ0FEa0QsQ0FDbEI7O0FBRWhDLGFBQU8sTUFBS0ssZUFBTCxDQUFxQnZGLENBQXJCLENBQVA7QUFDRCxLLFFBRURtSCxTLEdBQTJDLFVBQUNuSCxDQUFELEVBQU87QUFDaERtRixxQkFBZU4sVUFBVUssS0FBekI7O0FBRUEsYUFBTyxNQUFLdUIsY0FBTCxDQUFvQnpHLENBQXBCLENBQVA7QUFDRCxLLFFBR0RvSCxZLEdBQThDLFVBQUNwSCxDQUFELEVBQU87QUFDbkQ7QUFDQW1GLHFCQUFlTixVQUFVQyxLQUF6Qjs7QUFFQSxhQUFPLE1BQUtTLGVBQUwsQ0FBcUJ2RixDQUFyQixDQUFQO0FBQ0QsSyxRQUVEcUgsVSxHQUE0QyxVQUFDckgsQ0FBRCxFQUFPO0FBQ2pEO0FBQ0FtRixxQkFBZU4sVUFBVUMsS0FBekI7O0FBRUEsYUFBTyxNQUFLMkIsY0FBTCxDQUFvQnpHLENBQXBCLENBQVA7QUFDRCxLOzs7OzsyQ0F0THNCO0FBQ3JCO0FBQ0E7QUFDQSxVQUFNMkYsV0FBV2YsaURBQVFBLENBQUN2QyxXQUFULENBQXFCLElBQXJCLENBQWpCO0FBQ0EsVUFBSXNELFFBQUosRUFBYztBQUFBLFlBQ0wvSCxhQURLLEdBQ1krSCxRQURaLENBQ0wvSCxhQURLOztBQUVaUCxrRkFBV0EsQ0FBQ08sYUFBWixFQUEyQmlILFVBQVVLLEtBQVYsQ0FBZ0JGLElBQTNDLEVBQWlELEtBQUt3QixVQUF0RDtBQUNBbkosa0ZBQVdBLENBQUNPLGFBQVosRUFBMkJpSCxVQUFVQyxLQUFWLENBQWdCRSxJQUEzQyxFQUFpRCxLQUFLd0IsVUFBdEQ7QUFDQW5KLGtGQUFXQSxDQUFDTyxhQUFaLEVBQTJCaUgsVUFBVUssS0FBVixDQUFnQkQsSUFBM0MsRUFBaUQsS0FBS3dCLGNBQXREO0FBQ0FwSixrRkFBV0EsQ0FBQ08sYUFBWixFQUEyQmlILFVBQVVDLEtBQVYsQ0FBZ0JHLElBQTNDLEVBQWlELEtBQUt3QixjQUF0RDtBQUNBLFlBQUksS0FBS3RMLEtBQUwsQ0FBV29MLG9CQUFmLEVBQXFDdEYscUZBQXNCQSxDQUFDckQsYUFBdkI7QUFDdEM7QUFDRjs7QUE2SkQ7Ozs7NkJBZVM7QUFDUDtBQUNBO0FBQ0EsYUFBTzBKLDZDQUFLQSxDQUFDQyxZQUFOLENBQW1CRCw2Q0FBS0EsQ0FBQ0UsUUFBTixDQUFlQyxJQUFmLENBQW9CLEtBQUt0TSxLQUFMLENBQVd1TSxRQUEvQixDQUFuQixFQUE2RDtBQUNsRTlMLGVBQU8yRix5RUFBVUEsQ0FBQyxLQUFLcEcsS0FBTCxDQUFXdU0sUUFBWCxDQUFvQnZNLEtBQXBCLENBQTBCUyxLQUFyQyxDQUQyRDs7QUFHbEU7QUFDQTtBQUNBNEoscUJBQWEsS0FBS0EsV0FMZ0Q7QUFNbEU0QixzQkFBYyxLQUFLQSxZQU4rQztBQU9sRUQsbUJBQVcsS0FBS0EsU0FQa0Q7QUFRbEVFLG9CQUFZLEtBQUtBO0FBUmlELE9BQTdELENBQVA7QUFVRDs7OztFQWhWd0NDLDZDQUFLQSxDQUFDSyxTOztBQUE1QnZDLGEsQ0FFWndDLFcsR0FBYyxlO0FBRkZ4QyxhLENBSVp5QyxTLEdBQVk7QUFDakI7Ozs7OztBQU1BcEMsaUJBQWVxQyxrREFBU0EsQ0FBQ0MsSUFQUjs7QUFTakI7Ozs7QUFJQW5DLFlBQVVrQyxrREFBU0EsQ0FBQ0MsSUFiSDs7QUFlakI7Ozs7O0FBS0F4Qix3QkFBc0J1QixrREFBU0EsQ0FBQ0MsSUFwQmY7O0FBc0JqQjs7OztBQUlBakosZ0JBQWMsc0JBQVMzRCxLQUFULDJCQUFvQ0MsUUFBcEMsa0NBQXlFO0FBQ3JGLFFBQUlELE1BQU1DLFFBQU4sS0FBbUJELE1BQU1DLFFBQU4sRUFBZ0I0TSxRQUFoQixLQUE2QixDQUFwRCxFQUF1RDtBQUNyRCxZQUFNLElBQUkxTSxLQUFKLENBQVUsK0NBQVYsQ0FBTjtBQUNEO0FBQ0YsR0E5QmdCOztBQWdDakI7OztBQUdBa0ksUUFBTXNFLGtEQUFTQSxDQUFDRyxPQUFWLENBQWtCSCxrREFBU0EsQ0FBQ0ksTUFBNUIsQ0FuQ1c7O0FBcUNqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkFuQyxVQUFRK0Isa0RBQVNBLENBQUNLLE1BekREOztBQTJEakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBbkMsVUFBUThCLGtEQUFTQSxDQUFDSyxNQS9FRDs7QUFpRmpCOzs7O0FBSUE5QixXQUFTeUIsa0RBQVNBLENBQUN2TixJQXJGRjs7QUF1RmpCOzs7O0FBSUFzTSxVQUFRaUIsa0RBQVNBLENBQUN2TixJQTNGRDs7QUE2RmpCOzs7O0FBSUEyTSxVQUFRWSxrREFBU0EsQ0FBQ3ZOLElBakdEOztBQW1HakI7Ozs7QUFJQWlMLGVBQWFzQyxrREFBU0EsQ0FBQ3ZOLElBdkdOOztBQXlHakI7OztBQUdBbUgsYUFBV3hHLCtEQTVHTTtBQTZHakJVLFNBQU9WLCtEQTdHVTtBQThHakJrTixhQUFXbE4sK0RBQVNBO0FBOUdILEM7QUFKQWtLLGEsQ0FxSFppRCxZLEdBQWU7QUFDcEI1QyxpQkFBZSxLQURLLEVBQ0U7QUFDdEJPLFVBQVEsSUFGWTtBQUdwQkosWUFBVSxLQUhVO0FBSXBCVyx3QkFBc0IsSUFKRjtBQUtwQnpILGdCQUFjLElBTE07QUFNcEJpSCxVQUFRLElBTlk7QUFPcEJ2QyxRQUFNLElBUGM7QUFRcEI0RSxhQUFXLElBUlM7QUFTcEIvQixXQUFTLG1CQUFVLENBQUUsQ0FURDtBQVVwQlEsVUFBUSxrQkFBVSxDQUFFLENBVkE7QUFXcEJLLFVBQVEsa0JBQVUsQ0FBRSxDQVhBO0FBWXBCMUIsZUFBYSx1QkFBVSxDQUFFO0FBWkwsQztBQXJISEosNEU7Ozs7Ozs7OztBQzVFckI7QUFDZSxTQUFTZ0IsR0FBVCxHQUEyQjtBQUFBOztBQUN4QyxNQUFJa0MsSUFBSixFQUFpQyxxQkFBUWxDLEdBQVI7QUFDbEMsQzs7Ozs7O0FDSkQsSUFBSW1DLFlBQVlDLG1CQUFPQSxDQUFDLENBQVIsRUFBMkJDLE9BQTNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLE9BQU9DLE9BQVAsR0FBaUJKLFNBQWpCO0FBQ0FHLE9BQU9DLE9BQVAsQ0FBZUYsT0FBZixHQUF5QkYsU0FBekI7QUFDQUcsT0FBT0MsT0FBUCxDQUFldkQsYUFBZixHQUErQm9ELG1CQUFPQSxDQUFDLENBQVIsRUFBK0JDLE9BQTlELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7Ozs7Ozs7Ozs7OztBQXVCQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7SUFFcUJGLFM7OztBQWtJbkIscUJBQVlwTixLQUFaLHVCQUFtQztBQUFBOztBQUFBLHNIQUMzQkEsS0FEMkI7O0FBQUEsVUFzRG5DeU4sV0F0RG1DLEdBc0RFLFVBQUM1SSxDQUFELEVBQUkyRSxRQUFKLEVBQWlCO0FBQ3BEeUIseUVBQUdBLENBQUMsNEJBQUosRUFBa0N6QixRQUFsQzs7QUFFQTtBQUNBLFVBQU1rRSxjQUFjLE1BQUsxTixLQUFMLENBQVdrTCxPQUFYLENBQW1CckcsQ0FBbkIsRUFBc0IwRSx1RkFBbUJBLFFBQU9DLFFBQTFCLENBQXRCLENBQXBCO0FBQ0E7QUFDQSxVQUFJa0UsZ0JBQWdCLEtBQXBCLEVBQTJCLE9BQU8sS0FBUDs7QUFFM0IsWUFBSzVDLFFBQUwsQ0FBYyxFQUFDWixVQUFVLElBQVgsRUFBaUJ5RCxTQUFTLElBQTFCLEVBQWQ7QUFDRCxLQS9Ea0M7O0FBQUEsVUFpRW5DakMsTUFqRW1DLEdBaUVILFVBQUM3RyxDQUFELEVBQUkyRSxRQUFKLEVBQWlCO0FBQy9DLFVBQUksQ0FBQyxNQUFLUCxLQUFMLENBQVdpQixRQUFoQixFQUEwQixPQUFPLEtBQVA7QUFDMUJlLHlFQUFHQSxDQUFDLHVCQUFKLEVBQTZCekIsUUFBN0I7O0FBRUEsVUFBTW9FLFNBQVNyRSx1RkFBbUJBLFFBQU9DLFFBQTFCLENBQWY7O0FBRUEsVUFBTXFFLHdDQUFtQztBQUN2QzNKLFdBQUcwSixPQUFPMUosQ0FENkI7QUFFdkNHLFdBQUd1SixPQUFPdko7QUFGNkIsT0FBekM7O0FBS0E7QUFDQSxVQUFJLE1BQUtyRSxLQUFMLENBQVdnSCxNQUFmLEVBQXVCO0FBQ3JCO0FBRHFCLFlBRWQ5QyxFQUZjLEdBRU4ySixRQUZNLENBRWQzSixDQUZjO0FBQUEsWUFFWEcsRUFGVyxHQUVOd0osUUFGTSxDQUVYeEosQ0FGVzs7QUFJckI7QUFDQTtBQUNBOztBQUNBd0osaUJBQVMzSixDQUFULElBQWMsTUFBSytFLEtBQUwsQ0FBVzZFLE1BQXpCO0FBQ0FELGlCQUFTeEosQ0FBVCxJQUFjLE1BQUs0RSxLQUFMLENBQVc4RSxNQUF6Qjs7QUFFQTs7QUFWcUIsZ0NBV1VqSCxvRkFBZ0JBLFFBQU8rRyxTQUFTM0osQ0FBaEMsRUFBbUMySixTQUFTeEosQ0FBNUMsQ0FYVjtBQUFBO0FBQUEsWUFXZDJKLFNBWGM7QUFBQSxZQVdIQyxTQVhHOztBQVlyQkosaUJBQVMzSixDQUFULEdBQWE4SixTQUFiO0FBQ0FILGlCQUFTeEosQ0FBVCxHQUFhNEosU0FBYjs7QUFFQTtBQUNBSixpQkFBU0MsTUFBVCxHQUFrQixNQUFLN0UsS0FBTCxDQUFXNkUsTUFBWCxJQUFxQjVKLEtBQUkySixTQUFTM0osQ0FBbEMsQ0FBbEI7QUFDQTJKLGlCQUFTRSxNQUFULEdBQWtCLE1BQUs5RSxLQUFMLENBQVc4RSxNQUFYLElBQXFCMUosS0FBSXdKLFNBQVN4SixDQUFsQyxDQUFsQjs7QUFFQTtBQUNBdUosZUFBTzFKLENBQVAsR0FBVzJKLFNBQVMzSixDQUFwQjtBQUNBMEosZUFBT3ZKLENBQVAsR0FBV3dKLFNBQVN4SixDQUFwQjtBQUNBdUosZUFBT3hFLE1BQVAsR0FBZ0J5RSxTQUFTM0osQ0FBVCxHQUFhLE1BQUsrRSxLQUFMLENBQVcvRSxDQUF4QztBQUNBMEosZUFBT3ZFLE1BQVAsR0FBZ0J3RSxTQUFTeEosQ0FBVCxHQUFhLE1BQUs0RSxLQUFMLENBQVc1RSxDQUF4QztBQUNEOztBQUVEO0FBQ0EsVUFBTThHLGVBQWUsTUFBS25MLEtBQUwsQ0FBVzBMLE1BQVgsQ0FBa0I3RyxDQUFsQixFQUFxQitJLE1BQXJCLENBQXJCO0FBQ0EsVUFBSXpDLGlCQUFpQixLQUFyQixFQUE0QixPQUFPLEtBQVA7O0FBRTVCLFlBQUtMLFFBQUwsQ0FBYytDLFFBQWQ7QUFDRCxLQTVHa0M7O0FBQUEsVUE4R25DSyxVQTlHbUMsR0E4R0MsVUFBQ3JKLENBQUQsRUFBSTJFLFFBQUosRUFBaUI7QUFDbkQsVUFBSSxDQUFDLE1BQUtQLEtBQUwsQ0FBV2lCLFFBQWhCLEVBQTBCLE9BQU8sS0FBUDs7QUFFMUI7QUFDQSxVQUFNaUUsYUFBYSxNQUFLbk8sS0FBTCxDQUFXK0wsTUFBWCxDQUFrQmxILENBQWxCLEVBQXFCMEUsdUZBQW1CQSxRQUFPQyxRQUExQixDQUFyQixDQUFuQjtBQUNBLFVBQUkyRSxlQUFlLEtBQW5CLEVBQTBCLE9BQU8sS0FBUDs7QUFFMUJsRCx5RUFBR0EsQ0FBQywyQkFBSixFQUFpQ3pCLFFBQWpDOztBQUVBLFVBQU1xRSx3Q0FBbUM7QUFDdkMzRCxrQkFBVSxLQUQ2QjtBQUV2QzRELGdCQUFRLENBRitCO0FBR3ZDQyxnQkFBUTtBQUgrQixPQUF6Qzs7QUFNQTtBQUNBO0FBQ0EsVUFBTUssYUFBYUMsUUFBUSxNQUFLck8sS0FBTCxDQUFXK0ssUUFBbkIsQ0FBbkI7QUFDQSxVQUFJcUQsVUFBSixFQUFnQjtBQUFBLG1DQUNDLE1BQUtwTyxLQUFMLENBQVcrSyxRQURaO0FBQUEsWUFDUDdHLEdBRE8sd0JBQ1BBLENBRE87QUFBQSxZQUNKRyxHQURJLHdCQUNKQSxDQURJOztBQUVkd0osaUJBQVMzSixDQUFULEdBQWFBLEdBQWI7QUFDQTJKLGlCQUFTeEosQ0FBVCxHQUFhQSxHQUFiO0FBQ0Q7O0FBRUQsWUFBS3lHLFFBQUwsQ0FBYytDLFFBQWQ7QUFDRCxLQXZJa0M7O0FBR2pDLFVBQUs1RSxLQUFMLEdBQWE7QUFDWDtBQUNBaUIsZ0JBQVUsS0FGQzs7QUFJWDtBQUNBeUQsZUFBUyxLQUxFOztBQU9YO0FBQ0F6SixTQUFHbEUsTUFBTStLLFFBQU4sR0FBaUIvSyxNQUFNK0ssUUFBTixDQUFlN0csQ0FBaEMsR0FBb0NsRSxNQUFNc08sZUFBTixDQUFzQnBLLENBUmxEO0FBU1hHLFNBQUdyRSxNQUFNK0ssUUFBTixHQUFpQi9LLE1BQU0rSyxRQUFOLENBQWUxRyxDQUFoQyxHQUFvQ3JFLE1BQU1zTyxlQUFOLENBQXNCakssQ0FUbEQ7O0FBV1g7QUFDQXlKLGNBQVEsQ0FaRyxFQVlBQyxRQUFRLENBWlI7O0FBY1g7QUFDQVEsb0JBQWM7QUFmSCxLQUFiO0FBSGlDO0FBb0JsQzs7Ozt5Q0FFb0I7QUFDbkIsVUFBSSxLQUFLdk8sS0FBTCxDQUFXK0ssUUFBWCxJQUF1QixFQUFFLEtBQUsvSyxLQUFMLENBQVcwTCxNQUFYLElBQXFCLEtBQUsxTCxLQUFMLENBQVcrTCxNQUFsQyxDQUEzQixFQUFzRTtBQUNwRTtBQUNBeUMsZ0JBQVFDLElBQVIsQ0FBYSw4RkFDWCx1R0FEVyxHQUVYLDZCQUZGO0FBR0Q7QUFDRjs7O3dDQUVtQjtBQUNsQjtBQUNBLFVBQUcsT0FBT2xPLE9BQU9tTyxVQUFkLEtBQTZCLFdBQTdCLElBQTRDakYsaURBQVFBLENBQUN2QyxXQUFULENBQXFCLElBQXJCLGFBQXNDM0csT0FBT21PLFVBQTVGLEVBQXdHO0FBQ3RHLGFBQUs1RCxRQUFMLENBQWMsRUFBRXlELGNBQWMsSUFBaEIsRUFBZDtBQUNEO0FBQ0Y7Ozs4Q0FFeUJJLFMsZUFBbUI7QUFDM0M7QUFDQSxVQUFJQSxVQUFVNUQsUUFBVixLQUNDLENBQUMsS0FBSy9LLEtBQUwsQ0FBVytLLFFBQVosSUFDQzRELFVBQVU1RCxRQUFWLENBQW1CN0csQ0FBbkIsS0FBeUIsS0FBS2xFLEtBQUwsQ0FBVytLLFFBQVgsQ0FBb0I3RyxDQUQ5QyxJQUVDeUssVUFBVTVELFFBQVYsQ0FBbUIxRyxDQUFuQixLQUF5QixLQUFLckUsS0FBTCxDQUFXK0ssUUFBWCxDQUFvQjFHLENBSC9DLENBQUosRUFLSTtBQUNGLGFBQUt5RyxRQUFMLENBQWMsRUFBRTVHLEdBQUd5SyxVQUFVNUQsUUFBVixDQUFtQjdHLENBQXhCLEVBQTJCRyxHQUFHc0ssVUFBVTVELFFBQVYsQ0FBbUIxRyxDQUFqRCxFQUFkO0FBQ0Q7QUFDRjs7OzJDQUVzQjtBQUNyQixXQUFLeUcsUUFBTCxDQUFjLEVBQUNaLFVBQVUsS0FBWCxFQUFkLEVBRHFCLENBQ2E7QUFDbkM7OztxREFxRjJCO0FBQUE7O0FBQzFCLFVBQUl6SixRQUFRLEVBQVo7QUFBQSxVQUFnQm1PLGVBQWUsSUFBL0I7O0FBRUE7QUFDQSxVQUFNUixhQUFhQyxRQUFRLEtBQUtyTyxLQUFMLENBQVcrSyxRQUFuQixDQUFuQjtBQUNBLFVBQU1oRSxZQUFZLENBQUNxSCxVQUFELElBQWUsS0FBS25GLEtBQUwsQ0FBV2lCLFFBQTVDOztBQUVBLFVBQU1hLFdBQVcsS0FBSy9LLEtBQUwsQ0FBVytLLFFBQVgsSUFBdUIsS0FBSy9LLEtBQUwsQ0FBV3NPLGVBQW5EO0FBQ0EsVUFBTU8sZ0JBQWdCO0FBQ3BCO0FBQ0EzSyxXQUFHdUUsNEVBQVFBLENBQUMsSUFBVCxLQUFrQjFCLFNBQWxCLEdBQ0QsS0FBS2tDLEtBQUwsQ0FBVy9FLENBRFYsR0FFRDZHLFNBQVM3RyxDQUpTOztBQU1wQjtBQUNBRyxXQUFHc0UsNEVBQVFBLENBQUMsSUFBVCxLQUFrQjVCLFNBQWxCLEdBQ0QsS0FBS2tDLEtBQUwsQ0FBVzVFLENBRFYsR0FFRDBHLFNBQVMxRyxDQVRTO0FBVXBCSSxXQUFHLEtBQUt6RSxLQUFMLENBQVc4TyxNQUFYLEdBQWtCLEtBQUs5TyxLQUFMLENBQVc4TyxNQUE3QixHQUFvQztBQVZuQixPQUF0Qjs7QUFhQTtBQUNBLFVBQUksS0FBSzdGLEtBQUwsQ0FBV3NGLFlBQWYsRUFBNkI7QUFDM0JLLHVCQUFlakssaUZBQWtCQSxDQUFDa0ssYUFBbkIsQ0FBZjtBQUNELE9BRkQsTUFFTztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0FwTyxnQkFBUStELGlGQUFrQkEsQ0FBQ3FLLGFBQW5CLENBQVI7QUFDRDs7QUE5QnlCLG1CQW9DdEIsS0FBSzdPLEtBcENpQjtBQUFBLFVBaUN4QitPLGdCQWpDd0IsVUFpQ3hCQSxnQkFqQ3dCO0FBQUEsVUFrQ3hCQyx3QkFsQ3dCLFVBa0N4QkEsd0JBbEN3QjtBQUFBLFVBbUN4QkMsdUJBbkN3QixVQW1DeEJBLHVCQW5Dd0I7OztBQXNDMUIsVUFBTTFDLFdBQVdKLDZDQUFLQSxDQUFDRSxRQUFOLENBQWVDLElBQWYsQ0FBb0IsS0FBS3RNLEtBQUwsQ0FBV3VNLFFBQS9CLENBQWpCOztBQUVBO0FBQ0EsVUFBTWhHLFlBQVkySSxrREFBVUEsQ0FBRTNDLFNBQVN2TSxLQUFULENBQWV1RyxTQUFmLElBQTRCLEVBQXhDLEVBQTZDd0ksZ0JBQTdDLGtEQUNmQyx3QkFEZSxFQUNZLEtBQUsvRixLQUFMLENBQVdpQixRQUR2QixnQ0FFZitFLHVCQUZlLEVBRVcsS0FBS2hHLEtBQUwsQ0FBVzBFLE9BRnRCLGdCQUFsQjs7QUFLQTtBQUNBO0FBQ0EsYUFDRTtBQUFDLCtEQUFEO0FBQUEscUJBQW1CLEtBQUszTixLQUF4QixJQUErQixTQUFTLEtBQUt5TixXQUE3QyxFQUEwRCxRQUFRLEtBQUsvQixNQUF2RSxFQUErRSxRQUFRLEtBQUt3QyxVQUE1RjtBQUNHL0IscURBQUtBLENBQUNDLFlBQU4sQ0FBbUJHLFFBQW5CLEVBQTZCO0FBQzVCaEcscUJBQVdBLFNBRGlCO0FBRTVCOUYsOEJBQVc4TCxTQUFTdk0sS0FBVCxDQUFlUyxLQUExQixFQUFvQ0EsS0FBcEMsQ0FGNEI7QUFHNUJ3TSxxQkFBVzJCO0FBSGlCLFNBQTdCO0FBREgsT0FERjtBQVNEOzs7O0VBcFVvQ3pDLDZDQUFLQSxDQUFDSyxTOztBQUF4QlksUyxDQUVaWCxXLEdBQWMsVztBQUZGVyxTLENBSVpWLFMsZ0JBRUZ6Qyx1REFBYUEsQ0FBQ3lDLFM7O0FBRWpCOzs7Ozs7Ozs7Ozs7O0FBYUFoRSxRQUFNaUUsa0RBQVNBLENBQUN3QyxLQUFWLENBQWdCLENBQUMsTUFBRCxFQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLE1BQW5CLENBQWhCLEM7O0FBRU47Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBbkksVUFBUTJGLGtEQUFTQSxDQUFDeUMsU0FBVixDQUFvQixDQUMxQnpDLGtEQUFTQSxDQUFDMEMsS0FBVixDQUFnQjtBQUNkdEwsVUFBTTRJLGtEQUFTQSxDQUFDSSxNQURGO0FBRWRsRixXQUFPOEUsa0RBQVNBLENBQUNJLE1BRkg7QUFHZC9JLFNBQUsySSxrREFBU0EsQ0FBQ0ksTUFIRDtBQUlkaEYsWUFBUTRFLGtEQUFTQSxDQUFDSTtBQUpKLEdBQWhCLENBRDBCLEVBTzFCSixrREFBU0EsQ0FBQ0ssTUFQZ0IsRUFRMUJMLGtEQUFTQSxDQUFDd0MsS0FBVixDQUFnQixDQUFDLEtBQUQsQ0FBaEIsQ0FSMEIsQ0FBcEIsQzs7QUFXUkosb0JBQWtCcEMsa0RBQVNBLENBQUNLLE07QUFDNUJnQyw0QkFBMEJyQyxrREFBU0EsQ0FBQ0ssTTtBQUNwQ2lDLDJCQUF5QnRDLGtEQUFTQSxDQUFDSyxNOztBQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkFzQixtQkFBaUIzQixrREFBU0EsQ0FBQzBDLEtBQVYsQ0FBZ0I7QUFDL0JuTCxPQUFHeUksa0RBQVNBLENBQUNJLE1BRGtCO0FBRS9CMUksT0FBR3NJLGtEQUFTQSxDQUFDSTtBQUZrQixHQUFoQixDOztBQUtqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkFoQyxZQUFVNEIsa0RBQVNBLENBQUMwQyxLQUFWLENBQWdCO0FBQ3hCbkwsT0FBR3lJLGtEQUFTQSxDQUFDSSxNQURXO0FBRXhCMUksT0FBR3NJLGtEQUFTQSxDQUFDSTtBQUZXLEdBQWhCLEM7O0FBS1Y7OztBQUdBeEcsYUFBV3hHLCtEO0FBQ1hVLFNBQU9WLCtEO0FBQ1BrTixhQUFXbE4sK0RBQVNBOztBQXBISHFOLFMsQ0F1SFpGLFksZ0JBQ0ZqRCx1REFBYUEsQ0FBQ2lELFk7QUFDakJ4RSxRQUFNLE07QUFDTjFCLFVBQVEsSztBQUNSK0gsb0JBQWtCLGlCO0FBQ2xCQyw0QkFBMEIsMEI7QUFDMUJDLDJCQUF5Qix5QjtBQUN6QlgsbUJBQWlCLEVBQUNwSyxHQUFHLENBQUosRUFBT0csR0FBRyxDQUFWLEU7QUFDakIwRyxZQUFVOztBQS9IT3FDLHdFOzs7Ozs7O0FDckNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsMkJBQTJCLG1CQUFPLENBQUMsRUFBNEI7O0FBRS9EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7OztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7O0FBRUE7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7O0FBRUEsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLFVBQVUsSUFBNEU7QUFDeEY7QUFDQSxFQUFFLGlDQUFxQixFQUFFLG1DQUFFO0FBQzNCO0FBQ0EsR0FBRztBQUFBLG9HQUFDO0FBQ0osRUFBRTtBQUNGO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6Ii4vZGlzdC9yZWFjdC1kcmFnZ2FibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdC1kb21cIiksIHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJyZWFjdC1kb21cIiwgXCJyZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJSZWFjdERyYWdnYWJsZVwiXSA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0LWRvbVwiKSwgcmVxdWlyZShcInJlYWN0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdERyYWdnYWJsZVwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0RE9NXCJdLCByb290W1wiUmVhY3RcIl0pO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlYzE4MzZhNmI2YjMxMjYwNDhjYyIsIi8vIEBmbG93XG4vLyBAY3JlZGl0cyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9yb2dvemhuaWtvZmYvYTQzY2ZlZDI3YzQxZTRlNjhjZGNcbmV4cG9ydCBmdW5jdGlvbiBmaW5kSW5BcnJheShhcnJheTogQXJyYXk8YW55PiB8IFRvdWNoTGlzdCwgY2FsbGJhY2s6IEZ1bmN0aW9uKTogYW55IHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrLCBbYXJyYXlbaV0sIGksIGFycmF5XSkpIHJldHVybiBhcnJheVtpXTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBmdW5jID09PSAnZnVuY3Rpb24nIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChmdW5jKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtKG51bTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgbnVtID09PSAnbnVtYmVyJyAmJiAhaXNOYU4obnVtKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludChhOiBzdHJpbmcpOiBudW1iZXIge1xuICByZXR1cm4gcGFyc2VJbnQoYSwgMTApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZG9udFNldE1lKHByb3BzOiBPYmplY3QsIHByb3BOYW1lOiBzdHJpbmcsIGNvbXBvbmVudE5hbWU6IHN0cmluZykge1xuICBpZiAocHJvcHNbcHJvcE5hbWVdKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihgSW52YWxpZCBwcm9wICR7cHJvcE5hbWV9IHBhc3NlZCB0byAke2NvbXBvbmVudE5hbWV9IC0gZG8gbm90IHNldCB0aGlzLCBzZXQgaXQgb24gdGhlIGNoaWxkLmApO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdXRpbHMvc2hpbXMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyZWFjdC1kb21cIixcImNvbW1vbmpzMlwiOlwicmVhY3QtZG9tXCIsXCJhbWRcIjpcInJlYWN0LWRvbVwiLFwicm9vdFwiOlwiUmVhY3RET01cIn1cbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQGZsb3dcbmNvbnN0IHByZWZpeGVzID0gWydNb3onLCAnV2Via2l0JywgJ08nLCAnbXMnXTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcmVmaXgocHJvcDogc3RyaW5nPSd0cmFuc2Zvcm0nKTogc3RyaW5nIHtcbiAgLy8gQ2hlY2tpbmcgc3BlY2lmaWNhbGx5IGZvciAnd2luZG93LmRvY3VtZW50JyBpcyBmb3IgcHNldWRvLWJyb3dzZXIgc2VydmVyLXNpZGVcbiAgLy8gZW52aXJvbm1lbnRzIHRoYXQgZGVmaW5lICd3aW5kb3cnIGFzIHRoZSBnbG9iYWwgY29udGV4dC5cbiAgLy8gRS5nLiBSZWFjdC1yYWlscyAoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9yZWFjdGpzL3JlYWN0LXJhaWxzL3B1bGwvODQpXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygd2luZG93LmRvY3VtZW50ID09PSAndW5kZWZpbmVkJykgcmV0dXJuICcnO1xuXG4gIGNvbnN0IHN0eWxlID0gd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblxuICBpZiAocHJvcCBpbiBzdHlsZSkgcmV0dXJuICcnO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYnJvd3NlclByZWZpeFRvS2V5KHByb3AsIHByZWZpeGVzW2ldKSBpbiBzdHlsZSkgcmV0dXJuIHByZWZpeGVzW2ldO1xuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJvd3NlclByZWZpeFRvS2V5KHByb3A6IHN0cmluZywgcHJlZml4OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcHJlZml4ID8gYCR7cHJlZml4fSR7a2ViYWJUb1RpdGxlQ2FzZShwcm9wKX1gIDogcHJvcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJyb3dzZXJQcmVmaXhUb1N0eWxlKHByb3A6IHN0cmluZywgcHJlZml4OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcHJlZml4ID8gYC0ke3ByZWZpeC50b0xvd2VyQ2FzZSgpfS0ke3Byb3B9YCA6IHByb3A7XG59XG5cbmZ1bmN0aW9uIGtlYmFiVG9UaXRsZUNhc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICBsZXQgb3V0ID0gJyc7XG4gIGxldCBzaG91bGRDYXBpdGFsaXplID0gdHJ1ZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc2hvdWxkQ2FwaXRhbGl6ZSkge1xuICAgICAgb3V0ICs9IHN0cltpXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgc2hvdWxkQ2FwaXRhbGl6ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoc3RyW2ldID09PSAnLScpIHtcbiAgICAgIHNob3VsZENhcGl0YWxpemUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQgKz0gc3RyW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG4vLyBEZWZhdWx0IGV4cG9ydCBpcyB0aGUgcHJlZml4IGl0c2VsZiwgbGlrZSAnTW96JywgJ1dlYmtpdCcsIGV0Y1xuLy8gTm90ZSB0aGF0IHlvdSBtYXkgaGF2ZSB0byByZS10ZXN0IGZvciBjZXJ0YWluIHRoaW5nczsgZm9yIGluc3RhbmNlLCBDaHJvbWUgNTBcbi8vIGNhbiBoYW5kbGUgdW5wcmVmaXhlZCBgdHJhbnNmb3JtYCwgYnV0IG5vdCB1bnByZWZpeGVkIGB1c2VyLXNlbGVjdGBcbmV4cG9ydCBkZWZhdWx0IGdldFByZWZpeCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3V0aWxzL2dldFByZWZpeC5qcyIsIi8vIEBmbG93XG5pbXBvcnQge2ZpbmRJbkFycmF5LCBpc0Z1bmN0aW9uLCBpbnR9IGZyb20gJy4vc2hpbXMnO1xuaW1wb3J0IGJyb3dzZXJQcmVmaXgsIHticm93c2VyUHJlZml4VG9LZXl9IGZyb20gJy4vZ2V0UHJlZml4JztcblxuaW1wb3J0IHR5cGUge0NvbnRyb2xQb3NpdGlvbiwgTW91c2VUb3VjaEV2ZW50fSBmcm9tICcuL3R5cGVzJztcblxubGV0IG1hdGNoZXNTZWxlY3RvckZ1bmMgPSAnJztcbmV4cG9ydCBmdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3IoZWw6IE5vZGUsIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgaWYgKCFtYXRjaGVzU2VsZWN0b3JGdW5jKSB7XG4gICAgbWF0Y2hlc1NlbGVjdG9yRnVuYyA9IGZpbmRJbkFycmF5KFtcbiAgICAgICdtYXRjaGVzJyxcbiAgICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLFxuICAgICAgJ21vek1hdGNoZXNTZWxlY3RvcicsXG4gICAgICAnbXNNYXRjaGVzU2VsZWN0b3InLFxuICAgICAgJ29NYXRjaGVzU2VsZWN0b3InXG4gICAgXSwgZnVuY3Rpb24obWV0aG9kKXtcbiAgICAgIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcbiAgICAgIHJldHVybiBpc0Z1bmN0aW9uKGVsW21ldGhvZF0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gTWlnaHQgbm90IGJlIGZvdW5kIGVudGlyZWx5IChub3QgYW4gRWxlbWVudD8pIC0gaW4gdGhhdCBjYXNlLCBiYWlsXG4gIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcbiAgaWYgKCFpc0Z1bmN0aW9uKGVsW21hdGNoZXNTZWxlY3RvckZ1bmNdKSkgcmV0dXJuIGZhbHNlO1xuXG4gIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcbiAgcmV0dXJuIGVsW21hdGNoZXNTZWxlY3RvckZ1bmNdKHNlbGVjdG9yKTtcbn1cblxuLy8gV29ya3MgdXAgdGhlIHRyZWUgdG8gdGhlIGRyYWdnYWJsZSBpdHNlbGYgYXR0ZW1wdGluZyB0byBtYXRjaCBzZWxlY3Rvci5cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3JBbmRQYXJlbnRzVG8oZWw6IE5vZGUsIHNlbGVjdG9yOiBzdHJpbmcsIGJhc2VOb2RlOiBOb2RlKTogYm9vbGVhbiB7XG4gIGxldCBub2RlID0gZWw7XG4gIGRvIHtcbiAgICBpZiAobWF0Y2hlc1NlbGVjdG9yKG5vZGUsIHNlbGVjdG9yKSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKG5vZGUgPT09IGJhc2VOb2RlKSByZXR1cm4gZmFsc2U7XG4gICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgfSB3aGlsZSAobm9kZSk7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnQoZWw6ID9Ob2RlLCBldmVudDogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IHZvaWQge1xuICBpZiAoIWVsKSB7IHJldHVybjsgfVxuICBpZiAoZWwuYXR0YWNoRXZlbnQpIHtcbiAgICBlbC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKGVsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICAvLyAkRmxvd0lnbm9yZTogRG9lc24ndCB0aGluayBlbGVtZW50cyBhcmUgaW5kZXhhYmxlXG4gICAgZWxbJ29uJyArIGV2ZW50XSA9IGhhbmRsZXI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUV2ZW50KGVsOiA/Tm9kZSwgZXZlbnQ6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgaWYgKCFlbCkgeyByZXR1cm47IH1cbiAgaWYgKGVsLmRldGFjaEV2ZW50KSB7XG4gICAgZWwuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgfSBlbHNlIGlmIChlbC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gJEZsb3dJZ25vcmU6IERvZXNuJ3QgdGhpbmsgZWxlbWVudHMgYXJlIGluZGV4YWJsZVxuICAgIGVsWydvbicgKyBldmVudF0gPSBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvdXRlckhlaWdodChub2RlOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gIC8vIFRoaXMgaXMgZGVsaWJlcmF0ZWx5IGV4Y2x1ZGluZyBtYXJnaW4gZm9yIG91ciBjYWxjdWxhdGlvbnMsIHNpbmNlIHdlIGFyZSB1c2luZ1xuICAvLyBvZmZzZXRUb3Agd2hpY2ggaXMgaW5jbHVkaW5nIG1hcmdpbi4gU2VlIGdldEJvdW5kUG9zaXRpb25cbiAgbGV0IGhlaWdodCA9IG5vZGUuY2xpZW50SGVpZ2h0O1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGhlaWdodCArPSBpbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BXaWR0aCk7XG4gIGhlaWdodCArPSBpbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJCb3R0b21XaWR0aCk7XG4gIHJldHVybiBoZWlnaHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvdXRlcldpZHRoKG5vZGU6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgLy8gVGhpcyBpcyBkZWxpYmVyYXRlbHkgZXhjbHVkaW5nIG1hcmdpbiBmb3Igb3VyIGNhbGN1bGF0aW9ucywgc2luY2Ugd2UgYXJlIHVzaW5nXG4gIC8vIG9mZnNldExlZnQgd2hpY2ggaXMgaW5jbHVkaW5nIG1hcmdpbi4gU2VlIGdldEJvdW5kUG9zaXRpb25cbiAgbGV0IHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICB3aWR0aCArPSBpbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJMZWZ0V2lkdGgpO1xuICB3aWR0aCArPSBpbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJSaWdodFdpZHRoKTtcbiAgcmV0dXJuIHdpZHRoO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlubmVySGVpZ2h0KG5vZGU6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgbGV0IGhlaWdodCA9IG5vZGUuY2xpZW50SGVpZ2h0O1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGhlaWdodCAtPSBpbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nVG9wKTtcbiAgaGVpZ2h0IC09IGludChjb21wdXRlZFN0eWxlLnBhZGRpbmdCb3R0b20pO1xuICByZXR1cm4gaGVpZ2h0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5uZXJXaWR0aChub2RlOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gIGxldCB3aWR0aCA9IG5vZGUuY2xpZW50V2lkdGg7XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgd2lkdGggLT0gaW50KGNvbXB1dGVkU3R5bGUucGFkZGluZ0xlZnQpO1xuICB3aWR0aCAtPSBpbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nUmlnaHQpO1xuICByZXR1cm4gd2lkdGg7XG59XG5cbi8vIEdldCBmcm9tIG9mZnNldFBhcmVudFxuZXhwb3J0IGZ1bmN0aW9uIG9mZnNldFhZRnJvbVBhcmVudChldnQ6IHtjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlcn0sIG9mZnNldFBhcmVudDogSFRNTEVsZW1lbnQpOiBDb250cm9sUG9zaXRpb24ge1xuICBjb25zdCBpc0JvZHkgPSBvZmZzZXRQYXJlbnQgPT09IG9mZnNldFBhcmVudC5vd25lckRvY3VtZW50LmJvZHk7XG4gIGNvbnN0IG9mZnNldFBhcmVudFJlY3QgPSBpc0JvZHkgPyB7bGVmdDogMCwgdG9wOiAwfSA6IG9mZnNldFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBjb25zdCB4ID0gZXZ0LmNsaWVudFggKyBvZmZzZXRQYXJlbnQuc2Nyb2xsTGVmdCAtIG9mZnNldFBhcmVudFJlY3QubGVmdDtcbiAgY29uc3QgeSA9IGV2dC5jbGllbnRZICsgb2Zmc2V0UGFyZW50LnNjcm9sbFRvcCAtIG9mZnNldFBhcmVudFJlY3QudG9wO1xuXG4gIHJldHVybiB7eCwgeX07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDU1NUcmFuc2Zvcm0oe3gsIHksIHJ9OiB7eDogbnVtYmVyLCB5OiBudW1iZXIsIHI6IG51bWJlcn0pOiBPYmplY3Qge1xuICAvLyBSZXBsYWNlIHVuaXRsZXNzIGl0ZW1zIHdpdGggcHhcbiAgcmV0dXJuIHtbYnJvd3NlclByZWZpeFRvS2V5KCd0cmFuc2Zvcm0nLCBicm93c2VyUHJlZml4KV06IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpIHJvdGF0ZSgke3J9ZGVnKWB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU1ZHVHJhbnNmb3JtKHt4LCB5LCByfToge3g6IG51bWJlciwgeTogbnVtYmVyLCByOm51bWJlcn0pOiBzdHJpbmcge1xuICByZXR1cm4gYHRyYW5zbGF0ZSgke3h9LCAke3l9KSByb3RhdGUoJHtyfWRlZylgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG91Y2goZTogTW91c2VUb3VjaEV2ZW50LCBpZGVudGlmaWVyOiBudW1iZXIpOiA/e2NsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyfSB7XG4gIHJldHVybiAoZS50YXJnZXRUb3VjaGVzICYmIGZpbmRJbkFycmF5KGUudGFyZ2V0VG91Y2hlcywgdCA9PiBpZGVudGlmaWVyID09PSB0LmlkZW50aWZpZXIpKSB8fFxuICAgICAgICAgKGUuY2hhbmdlZFRvdWNoZXMgJiYgZmluZEluQXJyYXkoZS5jaGFuZ2VkVG91Y2hlcywgdCA9PiBpZGVudGlmaWVyID09PSB0LmlkZW50aWZpZXIpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdWNoSWRlbnRpZmllcihlOiBNb3VzZVRvdWNoRXZlbnQpOiA/bnVtYmVyIHtcbiAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0pIHJldHVybiBlLnRhcmdldFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcbiAgaWYgKGUuY2hhbmdlZFRvdWNoZXMgJiYgZS5jaGFuZ2VkVG91Y2hlc1swXSkgcmV0dXJuIGUuY2hhbmdlZFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcbn1cblxuLy8gVXNlci1zZWxlY3QgSGFja3M6XG4vL1xuLy8gVXNlZnVsIGZvciBwcmV2ZW50aW5nIGJsdWUgaGlnaGxpZ2h0cyBhbGwgb3ZlciBldmVyeXRoaW5nIHdoZW4gZHJhZ2dpbmcuXG5cbi8vIE5vdGUgd2UncmUgcGFzc2luZyBgZG9jdW1lbnRgIGIvYyB3ZSBjb3VsZCBiZSBpZnJhbWVkXG5leHBvcnQgZnVuY3Rpb24gYWRkVXNlclNlbGVjdFN0eWxlcyhkb2M6ID9Eb2N1bWVudCkge1xuICBpZiAoIWRvYykgcmV0dXJuO1xuICBsZXQgc3R5bGVFbCA9IGRvYy5nZXRFbGVtZW50QnlJZCgncmVhY3QtZHJhZ2dhYmxlLXN0eWxlLWVsJyk7XG4gIGlmICghc3R5bGVFbCkge1xuICAgIHN0eWxlRWwgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZUVsLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIHN0eWxlRWwuaWQgPSAncmVhY3QtZHJhZ2dhYmxlLXN0eWxlLWVsJztcbiAgICBzdHlsZUVsLmlubmVySFRNTCA9ICcucmVhY3QtZHJhZ2dhYmxlLXRyYW5zcGFyZW50LXNlbGVjdGlvbiAqOjotbW96LXNlbGVjdGlvbiB7YmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7fVxcbic7XG4gICAgc3R5bGVFbC5pbm5lckhUTUwgKz0gJy5yZWFjdC1kcmFnZ2FibGUtdHJhbnNwYXJlbnQtc2VsZWN0aW9uICo6OnNlbGVjdGlvbiB7YmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7fVxcbic7XG4gICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gIH1cbiAgaWYgKGRvYy5ib2R5KSBhZGRDbGFzc05hbWUoZG9jLmJvZHksICdyZWFjdC1kcmFnZ2FibGUtdHJhbnNwYXJlbnQtc2VsZWN0aW9uJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVVc2VyU2VsZWN0U3R5bGVzKGRvYzogP0RvY3VtZW50KSB7XG4gIHRyeSB7XG4gICAgaWYgKGRvYyAmJiBkb2MuYm9keSkgcmVtb3ZlQ2xhc3NOYW1lKGRvYy5ib2R5LCAncmVhY3QtZHJhZ2dhYmxlLXRyYW5zcGFyZW50LXNlbGVjdGlvbicpO1xuICAgIC8vICRGbG93SWdub3JlOiBJRVxuICAgIGlmIChkb2Muc2VsZWN0aW9uKSB7XG4gICAgICAvLyAkRmxvd0lnbm9yZTogSUVcbiAgICAgIGRvYy5zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpOyAgLy8gcmVtb3ZlIHNlbGVjdGlvbiBjYXVzZWQgYnkgc2Nyb2xsXG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gcHJvYmFibHkgSUVcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVIYWNrcyhjaGlsZFN0eWxlOiBPYmplY3QgPSB7fSk6IE9iamVjdCB7XG4gIC8vIFdvcmthcm91bmQgSUUgcG9pbnRlciBldmVudHM7IHNlZSAjNTFcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL216YWJyaXNraWUvcmVhY3QtZHJhZ2dhYmxlL2lzc3Vlcy81MSNpc3N1ZWNvbW1lbnQtMTAzNDg4Mjc4XG4gIHJldHVybiB7XG4gICAgdG91Y2hBY3Rpb246ICdub25lJyxcbiAgICAuLi5jaGlsZFN0eWxlXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGFzc05hbWUoZWw6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZykge1xuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIGlmICghZWwuY2xhc3NOYW1lLm1hdGNoKG5ldyBSZWdFeHAoYCg/Ol58XFxcXHMpJHtjbGFzc05hbWV9KD8hXFxcXFMpYCkpKSB7XG4gICAgICBlbC5jbGFzc05hbWUgKz0gYCAke2NsYXNzTmFtZX1gO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2xhc3NOYW1lKGVsOiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKGAoPzpefFxcXFxzKSR7Y2xhc3NOYW1lfSg/IVxcXFxTKWAsICdnJyksICcnKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3V0aWxzL2RvbUZucy5qcyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCIsXCJyb290XCI6XCJSZWFjdFwifVxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKFJlYWN0SXMuaXNFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEBmbG93XG5pbXBvcnQge2lzTnVtLCBpbnR9IGZyb20gJy4vc2hpbXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge2dldFRvdWNoLCBpbm5lcldpZHRoLCBpbm5lckhlaWdodCwgb2Zmc2V0WFlGcm9tUGFyZW50LCBvdXRlcldpZHRoLCBvdXRlckhlaWdodH0gZnJvbSAnLi9kb21GbnMnO1xuXG5pbXBvcnQgdHlwZSBEcmFnZ2FibGUgZnJvbSAnLi4vRHJhZ2dhYmxlJztcbmltcG9ydCB0eXBlIHtCb3VuZHMsIENvbnRyb2xQb3NpdGlvbiwgRHJhZ2dhYmxlRGF0YSwgTW91c2VUb3VjaEV2ZW50fSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB0eXBlIERyYWdnYWJsZUNvcmUgZnJvbSAnLi4vRHJhZ2dhYmxlQ29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCb3VuZFBvc2l0aW9uKGRyYWdnYWJsZTogRHJhZ2dhYmxlLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0ge1xuICAvLyBJZiBubyBib3VuZHMsIHNob3J0LWNpcmN1aXQgYW5kIG1vdmUgb25cbiAgaWYgKCFkcmFnZ2FibGUucHJvcHMuYm91bmRzKSByZXR1cm4gW3gsIHldO1xuXG4gIC8vIENsb25lIG5ldyBib3VuZHNcbiAgbGV0IHtib3VuZHN9ID0gZHJhZ2dhYmxlLnByb3BzO1xuICBib3VuZHMgPSB0eXBlb2YgYm91bmRzID09PSAnc3RyaW5nJyA/IGJvdW5kcyA6IGNsb25lQm91bmRzKGJvdW5kcyk7XG4gIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZShkcmFnZ2FibGUpO1xuXG4gIGlmICh0eXBlb2YgYm91bmRzID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IHtvd25lckRvY3VtZW50fSA9IG5vZGU7XG4gICAgY29uc3Qgb3duZXJXaW5kb3cgPSBvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICAgIGxldCBib3VuZE5vZGU7XG4gICAgaWYgKGJvdW5kcyA9PT0gJ3BhcmVudCcpIHtcbiAgICAgIGJvdW5kTm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm91bmROb2RlID0gb3duZXJEb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJvdW5kcyk7XG4gICAgfVxuICAgIGlmICghKGJvdW5kTm9kZSBpbnN0YW5jZW9mIG93bmVyV2luZG93LkhUTUxFbGVtZW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb3VuZHMgc2VsZWN0b3IgXCInICsgYm91bmRzICsgJ1wiIGNvdWxkIG5vdCBmaW5kIGFuIGVsZW1lbnQuJyk7XG4gICAgfVxuICAgIGNvbnN0IG5vZGVTdHlsZSA9IG93bmVyV2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgY29uc3QgYm91bmROb2RlU3R5bGUgPSBvd25lcldpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGJvdW5kTm9kZSk7XG4gICAgLy8gQ29tcHV0ZSBib3VuZHMuIFRoaXMgaXMgYSBwYWluIHdpdGggcGFkZGluZyBhbmQgb2Zmc2V0cyBidXQgdGhpcyBnZXRzIGl0IGV4YWN0bHkgcmlnaHQuXG4gICAgYm91bmRzID0ge1xuICAgICAgbGVmdDogLW5vZGUub2Zmc2V0TGVmdCArIGludChib3VuZE5vZGVTdHlsZS5wYWRkaW5nTGVmdCkgKyBpbnQobm9kZVN0eWxlLm1hcmdpbkxlZnQpLFxuICAgICAgdG9wOiAtbm9kZS5vZmZzZXRUb3AgKyBpbnQoYm91bmROb2RlU3R5bGUucGFkZGluZ1RvcCkgKyBpbnQobm9kZVN0eWxlLm1hcmdpblRvcCksXG4gICAgICByaWdodDogaW5uZXJXaWR0aChib3VuZE5vZGUpIC0gb3V0ZXJXaWR0aChub2RlKSAtIG5vZGUub2Zmc2V0TGVmdCArXG4gICAgICAgIGludChib3VuZE5vZGVTdHlsZS5wYWRkaW5nUmlnaHQpIC0gaW50KG5vZGVTdHlsZS5tYXJnaW5SaWdodCksXG4gICAgICBib3R0b206IGlubmVySGVpZ2h0KGJvdW5kTm9kZSkgLSBvdXRlckhlaWdodChub2RlKSAtIG5vZGUub2Zmc2V0VG9wICtcbiAgICAgICAgaW50KGJvdW5kTm9kZVN0eWxlLnBhZGRpbmdCb3R0b20pIC0gaW50KG5vZGVTdHlsZS5tYXJnaW5Cb3R0b20pXG4gICAgfTtcbiAgfVxuXG4gIC8vIEtlZXAgeCBhbmQgeSBiZWxvdyByaWdodCBhbmQgYm90dG9tIGxpbWl0cy4uLlxuICBpZiAoaXNOdW0oYm91bmRzLnJpZ2h0KSkgeCA9IE1hdGgubWluKHgsIGJvdW5kcy5yaWdodCk7XG4gIGlmIChpc051bShib3VuZHMuYm90dG9tKSkgeSA9IE1hdGgubWluKHksIGJvdW5kcy5ib3R0b20pO1xuXG4gIC8vIEJ1dCBhYm92ZSBsZWZ0IGFuZCB0b3AgbGltaXRzLlxuICBpZiAoaXNOdW0oYm91bmRzLmxlZnQpKSB4ID0gTWF0aC5tYXgoeCwgYm91bmRzLmxlZnQpO1xuICBpZiAoaXNOdW0oYm91bmRzLnRvcCkpIHkgPSBNYXRoLm1heCh5LCBib3VuZHMudG9wKTtcblxuICByZXR1cm4gW3gsIHldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc25hcFRvR3JpZChncmlkOiBbbnVtYmVyLCBudW1iZXJdLCBwZW5kaW5nWDogbnVtYmVyLCBwZW5kaW5nWTogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB7XG4gIGNvbnN0IHggPSBNYXRoLnJvdW5kKHBlbmRpbmdYIC8gZ3JpZFswXSkgKiBncmlkWzBdO1xuICBjb25zdCB5ID0gTWF0aC5yb3VuZChwZW5kaW5nWSAvIGdyaWRbMV0pICogZ3JpZFsxXTtcbiAgcmV0dXJuIFt4LCB5XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbkRyYWdYKGRyYWdnYWJsZTogRHJhZ2dhYmxlKTogYm9vbGVhbiB7XG4gIHJldHVybiBkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ2JvdGgnIHx8IGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAneCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5EcmFnWShkcmFnZ2FibGU6IERyYWdnYWJsZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICdib3RoJyB8fCBkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ3knO1xufVxuXG4vLyBHZXQge3gsIHl9IHBvc2l0aW9ucyBmcm9tIGV2ZW50LlxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRyb2xQb3NpdGlvbihlOiBNb3VzZVRvdWNoRXZlbnQsIHRvdWNoSWRlbnRpZmllcjogP251bWJlciwgZHJhZ2dhYmxlQ29yZTogRHJhZ2dhYmxlQ29yZSk6ID9Db250cm9sUG9zaXRpb24ge1xuICBjb25zdCB0b3VjaE9iaiA9IHR5cGVvZiB0b3VjaElkZW50aWZpZXIgPT09ICdudW1iZXInID8gZ2V0VG91Y2goZSwgdG91Y2hJZGVudGlmaWVyKSA6IG51bGw7XG4gIGlmICh0eXBlb2YgdG91Y2hJZGVudGlmaWVyID09PSAnbnVtYmVyJyAmJiAhdG91Y2hPYmopIHJldHVybiBudWxsOyAvLyBub3QgdGhlIHJpZ2h0IHRvdWNoXG4gIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZShkcmFnZ2FibGVDb3JlKTtcbiAgLy8gVXNlciBjYW4gcHJvdmlkZSBhbiBvZmZzZXRQYXJlbnQgaWYgZGVzaXJlZC5cbiAgY29uc3Qgb2Zmc2V0UGFyZW50ID0gZHJhZ2dhYmxlQ29yZS5wcm9wcy5vZmZzZXRQYXJlbnQgfHwgbm9kZS5vZmZzZXRQYXJlbnQgfHwgbm9kZS5vd25lckRvY3VtZW50LmJvZHk7XG4gIHJldHVybiBvZmZzZXRYWUZyb21QYXJlbnQodG91Y2hPYmogfHwgZSwgb2Zmc2V0UGFyZW50KTtcbn1cblxuLy8gQ3JlYXRlIGFuIGRhdGEgb2JqZWN0IGV4cG9zZWQgYnkgPERyYWdnYWJsZUNvcmU+J3MgZXZlbnRzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29yZURhdGEoZHJhZ2dhYmxlOiBEcmFnZ2FibGVDb3JlLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IERyYWdnYWJsZURhdGEge1xuICBjb25zdCBzdGF0ZSA9IGRyYWdnYWJsZS5zdGF0ZTtcbiAgY29uc3QgaXNTdGFydCA9ICFpc051bShzdGF0ZS5sYXN0WCk7XG4gIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZShkcmFnZ2FibGUpO1xuXG4gIGlmIChpc1N0YXJ0KSB7XG4gICAgLy8gSWYgdGhpcyBpcyBvdXIgZmlyc3QgbW92ZSwgdXNlIHRoZSB4IGFuZCB5IGFzIGxhc3QgY29vcmRzLlxuICAgIHJldHVybiB7XG4gICAgICBub2RlLFxuICAgICAgZGVsdGFYOiAwLCBkZWx0YVk6IDAsXG4gICAgICBsYXN0WDogeCwgbGFzdFk6IHksXG4gICAgICB4LCB5LFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gT3RoZXJ3aXNlIGNhbGN1bGF0ZSBwcm9wZXIgdmFsdWVzLlxuICAgIHJldHVybiB7XG4gICAgICBub2RlLFxuICAgICAgZGVsdGFYOiB4IC0gc3RhdGUubGFzdFgsIGRlbHRhWTogeSAtIHN0YXRlLmxhc3RZLFxuICAgICAgbGFzdFg6IHN0YXRlLmxhc3RYLCBsYXN0WTogc3RhdGUubGFzdFksXG4gICAgICB4LCB5LFxuICAgIH07XG4gIH1cbn1cblxuLy8gQ3JlYXRlIGFuIGRhdGEgZXhwb3NlZCBieSA8RHJhZ2dhYmxlPidzIGV2ZW50c1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURyYWdnYWJsZURhdGEoZHJhZ2dhYmxlOiBEcmFnZ2FibGUsIGNvcmVEYXRhOiBEcmFnZ2FibGVEYXRhKTogRHJhZ2dhYmxlRGF0YSB7XG4gIHJldHVybiB7XG4gICAgbm9kZTogY29yZURhdGEubm9kZSxcbiAgICB4OiBkcmFnZ2FibGUuc3RhdGUueCArIGNvcmVEYXRhLmRlbHRhWCxcbiAgICB5OiBkcmFnZ2FibGUuc3RhdGUueSArIGNvcmVEYXRhLmRlbHRhWSxcbiAgICBkZWx0YVg6IGNvcmVEYXRhLmRlbHRhWCxcbiAgICBkZWx0YVk6IGNvcmVEYXRhLmRlbHRhWSxcbiAgICBsYXN0WDogZHJhZ2dhYmxlLnN0YXRlLngsXG4gICAgbGFzdFk6IGRyYWdnYWJsZS5zdGF0ZS55XG4gIH07XG59XG5cbi8vIEEgbG90IGZhc3RlciB0aGFuIHN0cmluZ2lmeS9wYXJzZVxuZnVuY3Rpb24gY2xvbmVCb3VuZHMoYm91bmRzOiBCb3VuZHMpOiBCb3VuZHMge1xuICByZXR1cm4ge1xuICAgIGxlZnQ6IGJvdW5kcy5sZWZ0LFxuICAgIHRvcDogYm91bmRzLnRvcCxcbiAgICByaWdodDogYm91bmRzLnJpZ2h0LFxuICAgIGJvdHRvbTogYm91bmRzLmJvdHRvbVxuICB9O1xufVxuXG5mdW5jdGlvbiBmaW5kRE9NTm9kZShkcmFnZ2FibGU6IERyYWdnYWJsZSB8IERyYWdnYWJsZUNvcmUpOiBIVE1MRWxlbWVudCB7XG4gIGNvbnN0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShkcmFnZ2FibGUpO1xuICBpZiAoIW5vZGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJzxEcmFnZ2FibGVDb3JlPjogVW5tb3VudGVkIGR1cmluZyBldmVudCEnKTtcbiAgfVxuICAvLyAkRmxvd0lnbm9yZSB3ZSBjYW4ndCBhc3NlcnQgb24gSFRNTEVsZW1lbnQgZHVlIHRvIHRlc3RzLi4uIEZJWE1FXG4gIHJldHVybiBub2RlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3V0aWxzL3Bvc2l0aW9uRm5zLmpzIiwiLy8gQGZsb3dcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge21hdGNoZXNTZWxlY3RvckFuZFBhcmVudHNUbywgYWRkRXZlbnQsIHJlbW92ZUV2ZW50LCBhZGRVc2VyU2VsZWN0U3R5bGVzLCBnZXRUb3VjaElkZW50aWZpZXIsXG4gICAgICAgIHJlbW92ZVVzZXJTZWxlY3RTdHlsZXMsIHN0eWxlSGFja3N9IGZyb20gJy4vdXRpbHMvZG9tRm5zJztcbmltcG9ydCB7Y3JlYXRlQ29yZURhdGEsIGdldENvbnRyb2xQb3NpdGlvbiwgc25hcFRvR3JpZH0gZnJvbSAnLi91dGlscy9wb3NpdGlvbkZucyc7XG5pbXBvcnQge2RvbnRTZXRNZX0gZnJvbSAnLi91dGlscy9zaGltcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vdXRpbHMvbG9nJztcblxuaW1wb3J0IHR5cGUge0V2ZW50SGFuZGxlciwgTW91c2VUb3VjaEV2ZW50fSBmcm9tICcuL3V0aWxzL3R5cGVzJztcbmltcG9ydCB0eXBlIHtFbGVtZW50IGFzIFJlYWN0RWxlbWVudH0gZnJvbSAncmVhY3QnO1xuXG4vLyBTaW1wbGUgYWJzdHJhY3Rpb24gZm9yIGRyYWdnaW5nIGV2ZW50cyBuYW1lcy5cbmNvbnN0IGV2ZW50c0ZvciA9IHtcbiAgdG91Y2g6IHtcbiAgICBzdGFydDogJ3RvdWNoc3RhcnQnLFxuICAgIG1vdmU6ICd0b3VjaG1vdmUnLFxuICAgIHN0b3A6ICd0b3VjaGVuZCdcbiAgfSxcbiAgbW91c2U6IHtcbiAgICBzdGFydDogJ21vdXNlZG93bicsXG4gICAgbW92ZTogJ21vdXNlbW92ZScsXG4gICAgc3RvcDogJ21vdXNldXAnXG4gIH1cbn07XG5cbi8vIERlZmF1bHQgdG8gbW91c2UgZXZlbnRzLlxubGV0IGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci5tb3VzZTtcblxudHlwZSBEcmFnZ2FibGVDb3JlU3RhdGUgPSB7XG4gIGRyYWdnaW5nOiBib29sZWFuLFxuICBsYXN0WDogbnVtYmVyLFxuICBsYXN0WTogbnVtYmVyLFxuICB0b3VjaElkZW50aWZpZXI6ID9udW1iZXJcbn07XG5cbmV4cG9ydCB0eXBlIERyYWdnYWJsZUJvdW5kcyA9IHtcbiAgbGVmdDogbnVtYmVyLFxuICByaWdodDogbnVtYmVyLFxuICB0b3A6IG51bWJlcixcbiAgYm90dG9tOiBudW1iZXIsXG59O1xuXG5leHBvcnQgdHlwZSBEcmFnZ2FibGVEYXRhID0ge1xuICBub2RlOiBIVE1MRWxlbWVudCxcbiAgeDogbnVtYmVyLCB5OiBudW1iZXIsXG4gIGRlbHRhWDogbnVtYmVyLCBkZWx0YVk6IG51bWJlcixcbiAgbGFzdFg6IG51bWJlciwgbGFzdFk6IG51bWJlcixcbn07XG5cbmV4cG9ydCB0eXBlIERyYWdnYWJsZUV2ZW50SGFuZGxlciA9IChlOiBNb3VzZUV2ZW50LCBkYXRhOiBEcmFnZ2FibGVEYXRhKSA9PiB2b2lkO1xuXG5leHBvcnQgdHlwZSBDb250cm9sUG9zaXRpb24gPSB7eDogbnVtYmVyLCB5OiBudW1iZXJ9O1xuXG5leHBvcnQgdHlwZSBEcmFnZ2FibGVDb3JlUHJvcHMgPSB7XG4gIGFsbG93QW55Q2xpY2s6IGJvb2xlYW4sXG4gIGNhbmNlbDogc3RyaW5nLFxuICBjaGlsZHJlbjogUmVhY3RFbGVtZW50PGFueT4sXG4gIGRpc2FibGVkOiBib29sZWFuLFxuICBlbmFibGVVc2VyU2VsZWN0SGFjazogYm9vbGVhbixcbiAgb2Zmc2V0UGFyZW50OiBIVE1MRWxlbWVudCxcbiAgZ3JpZDogW251bWJlciwgbnVtYmVyXSxcbiAgaGFuZGxlOiBzdHJpbmcsXG4gIG9uU3RhcnQ6IERyYWdnYWJsZUV2ZW50SGFuZGxlcixcbiAgb25EcmFnOiBEcmFnZ2FibGVFdmVudEhhbmRsZXIsXG4gIG9uU3RvcDogRHJhZ2dhYmxlRXZlbnRIYW5kbGVyLFxuICBvbk1vdXNlRG93bjogKGU6IE1vdXNlRXZlbnQpID0+IHZvaWQsXG59O1xuXG4vL1xuLy8gRGVmaW5lIDxEcmFnZ2FibGVDb3JlPi5cbi8vXG4vLyA8RHJhZ2dhYmxlQ29yZT4gaXMgZm9yIGFkdmFuY2VkIHVzYWdlIG9mIDxEcmFnZ2FibGU+LiBJdCBtYWludGFpbnMgbWluaW1hbCBpbnRlcm5hbCBzdGF0ZSBzbyBpdCBjYW5cbi8vIHdvcmsgd2VsbCB3aXRoIGxpYnJhcmllcyB0aGF0IHJlcXVpcmUgbW9yZSBjb250cm9sIG92ZXIgdGhlIGVsZW1lbnQuXG4vL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnZ2FibGVDb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PERyYWdnYWJsZUNvcmVQcm9wcywgRHJhZ2dhYmxlQ29yZVN0YXRlPiB7XG5cbiAgc3RhdGljIGRpc3BsYXlOYW1lID0gJ0RyYWdnYWJsZUNvcmUnO1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLyoqXG4gICAgICogYGFsbG93QW55Q2xpY2tgIGFsbG93cyBkcmFnZ2luZyB1c2luZyBhbnkgbW91c2UgYnV0dG9uLlxuICAgICAqIEJ5IGRlZmF1bHQsIHdlIG9ubHkgYWNjZXB0IHRoZSBsZWZ0IGJ1dHRvbi5cbiAgICAgKlxuICAgICAqIERlZmF1bHRzIHRvIGBmYWxzZWAuXG4gICAgICovXG4gICAgYWxsb3dBbnlDbGljazogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvKipcbiAgICAgKiBgZGlzYWJsZWRgLCBpZiB0cnVlLCBzdG9wcyB0aGUgPERyYWdnYWJsZT4gZnJvbSBkcmFnZ2luZy4gQWxsIGhhbmRsZXJzLFxuICAgICAqIHdpdGggdGhlIGV4Y2VwdGlvbiBvZiBgb25Nb3VzZURvd25gLCB3aWxsIG5vdCBmaXJlLlxuICAgICAqL1xuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8qKlxuICAgICAqIEJ5IGRlZmF1bHQsIHdlIGFkZCAndXNlci1zZWxlY3Q6bm9uZScgYXR0cmlidXRlcyB0byB0aGUgZG9jdW1lbnQgYm9keVxuICAgICAqIHRvIHByZXZlbnQgdWdseSB0ZXh0IHNlbGVjdGlvbiBkdXJpbmcgZHJhZy4gSWYgdGhpcyBpcyBjYXVzaW5nIHByb2JsZW1zXG4gICAgICogZm9yIHlvdXIgYXBwLCBzZXQgdGhpcyB0byBgZmFsc2VgLlxuICAgICAqL1xuICAgIGVuYWJsZVVzZXJTZWxlY3RIYWNrOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8qKlxuICAgICAqIGBvZmZzZXRQYXJlbnRgLCBpZiBzZXQsIHVzZXMgdGhlIHBhc3NlZCBET00gbm9kZSB0byBjb21wdXRlIGRyYWcgb2Zmc2V0c1xuICAgICAqIGluc3RlYWQgb2YgdXNpbmcgdGhlIHBhcmVudCBub2RlLlxuICAgICAqL1xuICAgIG9mZnNldFBhcmVudDogZnVuY3Rpb24ocHJvcHM6IERyYWdnYWJsZUNvcmVQcm9wcywgcHJvcE5hbWU6ICRLZXlzPERyYWdnYWJsZUNvcmVQcm9wcz4pIHtcbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gJiYgcHJvcHNbcHJvcE5hbWVdLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRHJhZ2dhYmxlXFwncyBvZmZzZXRQYXJlbnQgbXVzdCBiZSBhIERPTSBOb2RlLicpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBgZ3JpZGAgc3BlY2lmaWVzIHRoZSB4IGFuZCB5IHRoYXQgZHJhZ2dpbmcgc2hvdWxkIHNuYXAgdG8uXG4gICAgICovXG4gICAgZ3JpZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXG5cbiAgICAvKipcbiAgICAgKiBgaGFuZGxlYCBzcGVjaWZpZXMgYSBzZWxlY3RvciB0byBiZSB1c2VkIGFzIHRoZSBoYW5kbGUgdGhhdCBpbml0aWF0ZXMgZHJhZy5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICByZXR1cm4gKFxuICAgICAqICAgICAgICAgICAgPERyYWdnYWJsZSBoYW5kbGU9XCIuaGFuZGxlXCI+XG4gICAgICogICAgICAgICAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhhbmRsZVwiPkNsaWNrIG1lIHRvIGRyYWc8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDxkaXY+VGhpcyBpcyBzb21lIG90aGVyIGNvbnRlbnQ8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICogICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBoYW5kbGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBgY2FuY2VsYCBzcGVjaWZpZXMgYSBzZWxlY3RvciB0byBiZSB1c2VkIHRvIHByZXZlbnQgZHJhZyBpbml0aWFsaXphdGlvbi5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgIHJldHVybihcbiAgICAgKiAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgY2FuY2VsPVwiLmNhbmNlbFwiPlxuICAgICAqICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhbmNlbFwiPllvdSBjYW4ndCBkcmFnIGZyb20gaGVyZTwvZGl2PlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgPGRpdj5EcmFnZ2luZyBoZXJlIHdvcmtzIGZpbmU8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgICApO1xuICAgICAqICAgICAgIH1cbiAgICAgKiAgIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGNhbmNlbDogUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIGRyYWdnaW5nIHN0YXJ0cy5cbiAgICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGJvb2xlYW4gZmFsc2UsIGRyYWdnaW5nIHdpbGwgYmUgY2FuY2VsZWQuXG4gICAgICovXG4gICAgb25TdGFydDogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hpbGUgZHJhZ2dpbmcuXG4gICAgICogSWYgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBib29sZWFuIGZhbHNlLCBkcmFnZ2luZyB3aWxsIGJlIGNhbmNlbGVkLlxuICAgICAqL1xuICAgIG9uRHJhZzogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBkcmFnZ2luZyBzdG9wcy5cbiAgICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGJvb2xlYW4gZmFsc2UsIHRoZSBkcmFnIHdpbGwgcmVtYWluIGFjdGl2ZS5cbiAgICAgKi9cbiAgICBvblN0b3A6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogQSB3b3JrYXJvdW5kIG9wdGlvbiB3aGljaCBjYW4gYmUgcGFzc2VkIGlmIG9uTW91c2VEb3duIG5lZWRzIHRvIGJlIGFjY2Vzc2VkLFxuICAgICAqIHNpbmNlIGl0J2xsIGFsd2F5cyBiZSBibG9ja2VkIChhcyB0aGVyZSBpcyBpbnRlcm5hbCB1c2Ugb2Ygb25Nb3VzZURvd24pXG4gICAgICovXG4gICAgb25Nb3VzZURvd246IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogVGhlc2UgcHJvcGVydGllcyBzaG91bGQgYmUgZGVmaW5lZCBvbiB0aGUgY2hpbGQsIG5vdCBoZXJlLlxuICAgICAqL1xuICAgIGNsYXNzTmFtZTogZG9udFNldE1lLFxuICAgIHN0eWxlOiBkb250U2V0TWUsXG4gICAgdHJhbnNmb3JtOiBkb250U2V0TWVcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGFsbG93QW55Q2xpY2s6IGZhbHNlLCAvLyBieSBkZWZhdWx0IG9ubHkgYWNjZXB0IGxlZnQgY2xpY2tcbiAgICBjYW5jZWw6IG51bGwsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIGVuYWJsZVVzZXJTZWxlY3RIYWNrOiB0cnVlLFxuICAgIG9mZnNldFBhcmVudDogbnVsbCxcbiAgICBoYW5kbGU6IG51bGwsXG4gICAgZ3JpZDogbnVsbCxcbiAgICB0cmFuc2Zvcm06IG51bGwsXG4gICAgb25TdGFydDogZnVuY3Rpb24oKXt9LFxuICAgIG9uRHJhZzogZnVuY3Rpb24oKXt9LFxuICAgIG9uU3RvcDogZnVuY3Rpb24oKXt9LFxuICAgIG9uTW91c2VEb3duOiBmdW5jdGlvbigpe31cbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgLy8gVXNlZCB3aGlsZSBkcmFnZ2luZyB0byBkZXRlcm1pbmUgZGVsdGFzLlxuICAgIGxhc3RYOiBOYU4sIGxhc3RZOiBOYU4sXG4gICAgdG91Y2hJZGVudGlmaWVyOiBudWxsXG4gIH07XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgLy8gUmVtb3ZlIGFueSBsZWZ0b3ZlciBldmVudCBoYW5kbGVycy4gUmVtb3ZlIGJvdGggdG91Y2ggYW5kIG1vdXNlIGhhbmRsZXJzIGluIGNhc2VcbiAgICAvLyBzb21lIGJyb3dzZXIgcXVpcmsgY2F1c2VkIGEgdG91Y2ggZXZlbnQgdG8gZmlyZSBkdXJpbmcgYSBtb3VzZSBtb3ZlLCBvciB2aWNlIHZlcnNhLlxuICAgIGNvbnN0IHRoaXNOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgaWYgKHRoaXNOb2RlKSB7XG4gICAgICBjb25zdCB7b3duZXJEb2N1bWVudH0gPSB0aGlzTm9kZTtcbiAgICAgIHJlbW92ZUV2ZW50KG93bmVyRG9jdW1lbnQsIGV2ZW50c0Zvci5tb3VzZS5tb3ZlLCB0aGlzLmhhbmRsZURyYWcpO1xuICAgICAgcmVtb3ZlRXZlbnQob3duZXJEb2N1bWVudCwgZXZlbnRzRm9yLnRvdWNoLm1vdmUsIHRoaXMuaGFuZGxlRHJhZyk7XG4gICAgICByZW1vdmVFdmVudChvd25lckRvY3VtZW50LCBldmVudHNGb3IubW91c2Uuc3RvcCwgdGhpcy5oYW5kbGVEcmFnU3RvcCk7XG4gICAgICByZW1vdmVFdmVudChvd25lckRvY3VtZW50LCBldmVudHNGb3IudG91Y2guc3RvcCwgdGhpcy5oYW5kbGVEcmFnU3RvcCk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVVc2VyU2VsZWN0SGFjaykgcmVtb3ZlVXNlclNlbGVjdFN0eWxlcyhvd25lckRvY3VtZW50KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVEcmFnU3RhcnQ6IEV2ZW50SGFuZGxlcjxNb3VzZVRvdWNoRXZlbnQ+ID0gKGUpID0+IHtcbiAgICAvLyBNYWtlIGl0IHBvc3NpYmxlIHRvIGF0dGFjaCBldmVudCBoYW5kbGVycyBvbiB0b3Agb2YgdGhpcyBvbmUuXG4gICAgdGhpcy5wcm9wcy5vbk1vdXNlRG93bihlKTtcblxuICAgIC8vIE9ubHkgYWNjZXB0IGxlZnQtY2xpY2tzLlxuICAgIGlmICghdGhpcy5wcm9wcy5hbGxvd0FueUNsaWNrICYmIHR5cGVvZiBlLmJ1dHRvbiA9PT0gJ251bWJlcicgJiYgZS5idXR0b24gIT09IDApIHJldHVybiBmYWxzZTtcblxuICAgIC8vIEdldCBub2Rlcy4gQmUgc3VyZSB0byBncmFiIHJlbGF0aXZlIGRvY3VtZW50IChjb3VsZCBiZSBpZnJhbWVkKVxuICAgIGNvbnN0IHRoaXNOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgaWYgKCF0aGlzTm9kZSB8fCAhdGhpc05vZGUub3duZXJEb2N1bWVudCB8fCAhdGhpc05vZGUub3duZXJEb2N1bWVudC5ib2R5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJzxEcmFnZ2FibGVDb3JlPiBub3QgbW91bnRlZCBvbiBEcmFnU3RhcnQhJyk7XG4gICAgfVxuICAgIGNvbnN0IHtvd25lckRvY3VtZW50fSA9IHRoaXNOb2RlO1xuXG4gICAgLy8gU2hvcnQgY2lyY3VpdCBpZiBoYW5kbGUgb3IgY2FuY2VsIHByb3Agd2FzIHByb3ZpZGVkIGFuZCBzZWxlY3RvciBkb2Vzbid0IG1hdGNoLlxuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8XG4gICAgICAoIShlLnRhcmdldCBpbnN0YW5jZW9mIG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuTm9kZSkpIHx8XG4gICAgICAodGhpcy5wcm9wcy5oYW5kbGUgJiYgIW1hdGNoZXNTZWxlY3RvckFuZFBhcmVudHNUbyhlLnRhcmdldCwgdGhpcy5wcm9wcy5oYW5kbGUsIHRoaXNOb2RlKSkgfHxcbiAgICAgICh0aGlzLnByb3BzLmNhbmNlbCAmJiBtYXRjaGVzU2VsZWN0b3JBbmRQYXJlbnRzVG8oZS50YXJnZXQsIHRoaXMucHJvcHMuY2FuY2VsLCB0aGlzTm9kZSkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU2V0IHRvdWNoIGlkZW50aWZpZXIgaW4gY29tcG9uZW50IHN0YXRlIGlmIHRoaXMgaXMgYSB0b3VjaCBldmVudC4gVGhpcyBhbGxvd3MgdXMgdG9cbiAgICAvLyBkaXN0aW5ndWlzaCBiZXR3ZWVuIGluZGl2aWR1YWwgdG91Y2hlcyBvbiBtdWx0aXRvdWNoIHNjcmVlbnMgYnkgaWRlbnRpZnlpbmcgd2hpY2hcbiAgICAvLyB0b3VjaHBvaW50IHdhcyBzZXQgdG8gdGhpcyBlbGVtZW50LlxuICAgIGNvbnN0IHRvdWNoSWRlbnRpZmllciA9IGdldFRvdWNoSWRlbnRpZmllcihlKTtcbiAgICB0aGlzLnNldFN0YXRlKHt0b3VjaElkZW50aWZpZXJ9KTtcblxuICAgIC8vIEdldCB0aGUgY3VycmVudCBkcmFnIHBvaW50IGZyb20gdGhlIGV2ZW50LiBUaGlzIGlzIHVzZWQgYXMgdGhlIG9mZnNldC5cbiAgICBjb25zdCBwb3NpdGlvbiA9IGdldENvbnRyb2xQb3NpdGlvbihlLCB0b3VjaElkZW50aWZpZXIsIHRoaXMpO1xuICAgIGlmIChwb3NpdGlvbiA9PSBudWxsKSByZXR1cm47IC8vIG5vdCBwb3NzaWJsZSBidXQgc2F0aXNmaWVzIGZsb3dcbiAgICBjb25zdCB7eCwgeX0gPSBwb3NpdGlvbjtcblxuICAgIC8vIENyZWF0ZSBhbiBldmVudCBvYmplY3Qgd2l0aCBhbGwgdGhlIGRhdGEgcGFyZW50cyBuZWVkIHRvIG1ha2UgYSBkZWNpc2lvbiBoZXJlLlxuICAgIGNvbnN0IGNvcmVFdmVudCA9IGNyZWF0ZUNvcmVEYXRhKHRoaXMsIHgsIHkpO1xuXG4gICAgbG9nKCdEcmFnZ2FibGVDb3JlOiBoYW5kbGVEcmFnU3RhcnQ6ICVqJywgY29yZUV2ZW50KTtcblxuICAgIC8vIENhbGwgZXZlbnQgaGFuZGxlci4gSWYgaXQgcmV0dXJucyBleHBsaWNpdCBmYWxzZSwgY2FuY2VsLlxuICAgIGxvZygnY2FsbGluZycsIHRoaXMucHJvcHMub25TdGFydCk7XG4gICAgY29uc3Qgc2hvdWxkVXBkYXRlID0gdGhpcy5wcm9wcy5vblN0YXJ0KGUsIGNvcmVFdmVudCk7XG4gICAgaWYgKHNob3VsZFVwZGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgIC8vIEFkZCBhIHN0eWxlIHRvIHRoZSBib2R5IHRvIGRpc2FibGUgdXNlci1zZWxlY3QuIFRoaXMgcHJldmVudHMgdGV4dCBmcm9tXG4gICAgLy8gYmVpbmcgc2VsZWN0ZWQgYWxsIG92ZXIgdGhlIHBhZ2UuXG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlVXNlclNlbGVjdEhhY2spIGFkZFVzZXJTZWxlY3RTdHlsZXMob3duZXJEb2N1bWVudCk7XG5cbiAgICAvLyBJbml0aWF0ZSBkcmFnZ2luZy4gU2V0IHRoZSBjdXJyZW50IHggYW5kIHkgYXMgb2Zmc2V0c1xuICAgIC8vIHNvIHdlIGtub3cgaG93IG11Y2ggd2UndmUgbW92ZWQgZHVyaW5nIHRoZSBkcmFnLiBUaGlzIGFsbG93cyB1c1xuICAgIC8vIHRvIGRyYWcgZWxlbWVudHMgYXJvdW5kIGV2ZW4gaWYgdGhleSBoYXZlIGJlZW4gbW92ZWQsIHdpdGhvdXQgaXNzdWUuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcmFnZ2luZzogdHJ1ZSxcblxuICAgICAgbGFzdFg6IHgsXG4gICAgICBsYXN0WTogeVxuICAgIH0pO1xuXG4gICAgLy8gQWRkIGV2ZW50cyB0byB0aGUgZG9jdW1lbnQgZGlyZWN0bHkgc28gd2UgY2F0Y2ggd2hlbiB0aGUgdXNlcidzIG1vdXNlL3RvdWNoIG1vdmVzIG91dHNpZGUgb2ZcbiAgICAvLyB0aGlzIGVsZW1lbnQuIFdlIHVzZSBkaWZmZXJlbnQgZXZlbnRzIGRlcGVuZGluZyBvbiB3aGV0aGVyIG9yIG5vdCB3ZSBoYXZlIGRldGVjdGVkIHRoYXQgdGhpc1xuICAgIC8vIGlzIGEgdG91Y2gtY2FwYWJsZSBkZXZpY2UuXG4gICAgYWRkRXZlbnQob3duZXJEb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLm1vdmUsIHRoaXMuaGFuZGxlRHJhZyk7XG4gICAgYWRkRXZlbnQob3duZXJEb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLnN0b3AsIHRoaXMuaGFuZGxlRHJhZ1N0b3ApO1xuICB9O1xuXG4gIGhhbmRsZURyYWc6IEV2ZW50SGFuZGxlcjxNb3VzZVRvdWNoRXZlbnQ+ID0gKGUpID0+IHtcblxuICAgIC8vIFByZXZlbnQgc2Nyb2xsaW5nIG9uIG1vYmlsZSBkZXZpY2VzLCBsaWtlIGlwYWQvaXBob25lLlxuICAgIGlmIChlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgZHJhZyBwb2ludCBmcm9tIHRoZSBldmVudC4gVGhpcyBpcyB1c2VkIGFzIHRoZSBvZmZzZXQuXG4gICAgY29uc3QgcG9zaXRpb24gPSBnZXRDb250cm9sUG9zaXRpb24oZSwgdGhpcy5zdGF0ZS50b3VjaElkZW50aWZpZXIsIHRoaXMpO1xuICAgIGlmIChwb3NpdGlvbiA9PSBudWxsKSByZXR1cm47XG4gICAgbGV0IHt4LCB5fSA9IHBvc2l0aW9uO1xuXG4gICAgLy8gU25hcCB0byBncmlkIGlmIHByb3AgaGFzIGJlZW4gcHJvdmlkZWRcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmdyaWQpKSB7XG4gICAgICBsZXQgZGVsdGFYID0geCAtIHRoaXMuc3RhdGUubGFzdFgsIGRlbHRhWSA9IHkgLSB0aGlzLnN0YXRlLmxhc3RZO1xuICAgICAgW2RlbHRhWCwgZGVsdGFZXSA9IHNuYXBUb0dyaWQodGhpcy5wcm9wcy5ncmlkLCBkZWx0YVgsIGRlbHRhWSk7XG4gICAgICBpZiAoIWRlbHRhWCAmJiAhZGVsdGFZKSByZXR1cm47IC8vIHNraXAgdXNlbGVzcyBkcmFnXG4gICAgICB4ID0gdGhpcy5zdGF0ZS5sYXN0WCArIGRlbHRhWCwgeSA9IHRoaXMuc3RhdGUubGFzdFkgKyBkZWx0YVk7XG4gICAgfVxuXG4gICAgY29uc3QgY29yZUV2ZW50ID0gY3JlYXRlQ29yZURhdGEodGhpcywgeCwgeSk7XG5cbiAgICBsb2coJ0RyYWdnYWJsZUNvcmU6IGhhbmRsZURyYWc6ICVqJywgY29yZUV2ZW50KTtcblxuICAgIC8vIENhbGwgZXZlbnQgaGFuZGxlci4gSWYgaXQgcmV0dXJucyBleHBsaWNpdCBmYWxzZSwgdHJpZ2dlciBlbmQuXG4gICAgY29uc3Qgc2hvdWxkVXBkYXRlID0gdGhpcy5wcm9wcy5vbkRyYWcoZSwgY29yZUV2ZW50KTtcbiAgICBpZiAoc2hvdWxkVXBkYXRlID09PSBmYWxzZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gJEZsb3dJZ25vcmVcbiAgICAgICAgdGhpcy5oYW5kbGVEcmFnU3RvcChuZXcgTW91c2VFdmVudCgnbW91c2V1cCcpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBPbGQgYnJvd3NlcnNcbiAgICAgICAgY29uc3QgZXZlbnQgPSAoKGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpOiBhbnkpOiBNb3VzZVRvdWNoRXZlbnQpO1xuICAgICAgICAvLyBJIHNlZSB3aHkgdGhpcyBpbnNhbml0eSB3YXMgZGVwcmVjYXRlZFxuICAgICAgICAvLyAkRmxvd0lnbm9yZVxuICAgICAgICBldmVudC5pbml0TW91c2VFdmVudCgnbW91c2V1cCcsIHRydWUsIHRydWUsIHdpbmRvdywgMCwgMCwgMCwgMCwgMCwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuICAgICAgICB0aGlzLmhhbmRsZURyYWdTdG9wKGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxhc3RYOiB4LFxuICAgICAgbGFzdFk6IHlcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVEcmFnU3RvcDogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5kcmFnZ2luZykgcmV0dXJuO1xuXG4gICAgY29uc3QgcG9zaXRpb24gPSBnZXRDb250cm9sUG9zaXRpb24oZSwgdGhpcy5zdGF0ZS50b3VjaElkZW50aWZpZXIsIHRoaXMpO1xuICAgIGlmIChwb3NpdGlvbiA9PSBudWxsKSByZXR1cm47XG4gICAgY29uc3Qge3gsIHl9ID0gcG9zaXRpb247XG4gICAgY29uc3QgY29yZUV2ZW50ID0gY3JlYXRlQ29yZURhdGEodGhpcywgeCwgeSk7XG5cbiAgICBjb25zdCB0aGlzTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIGlmICh0aGlzTm9kZSkge1xuICAgICAgLy8gUmVtb3ZlIHVzZXItc2VsZWN0IGhhY2tcbiAgICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZVVzZXJTZWxlY3RIYWNrKSByZW1vdmVVc2VyU2VsZWN0U3R5bGVzKHRoaXNOb2RlLm93bmVyRG9jdW1lbnQpO1xuICAgIH1cblxuICAgIGxvZygnRHJhZ2dhYmxlQ29yZTogaGFuZGxlRHJhZ1N0b3A6ICVqJywgY29yZUV2ZW50KTtcblxuICAgIC8vIFJlc2V0IHRoZSBlbC5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgIGxhc3RYOiBOYU4sXG4gICAgICBsYXN0WTogTmFOXG4gICAgfSk7XG5cbiAgICAvLyBDYWxsIGV2ZW50IGhhbmRsZXJcbiAgICB0aGlzLnByb3BzLm9uU3RvcChlLCBjb3JlRXZlbnQpO1xuXG4gICAgaWYgKHRoaXNOb2RlKSB7XG4gICAgICAvLyBSZW1vdmUgZXZlbnQgaGFuZGxlcnNcbiAgICAgIGxvZygnRHJhZ2dhYmxlQ29yZTogUmVtb3ZpbmcgaGFuZGxlcnMnKTtcbiAgICAgIHJlbW92ZUV2ZW50KHRoaXNOb2RlLm93bmVyRG9jdW1lbnQsIGRyYWdFdmVudEZvci5tb3ZlLCB0aGlzLmhhbmRsZURyYWcpO1xuICAgICAgcmVtb3ZlRXZlbnQodGhpc05vZGUub3duZXJEb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLnN0b3AsIHRoaXMuaGFuZGxlRHJhZ1N0b3ApO1xuICAgIH1cbiAgfTtcblxuICBvbk1vdXNlRG93bjogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci5tb3VzZTsgLy8gb24gdG91Y2hzY3JlZW4gbGFwdG9wcyB3ZSBjb3VsZCBzd2l0Y2ggYmFjayB0byBtb3VzZVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlRHJhZ1N0YXJ0KGUpO1xuICB9O1xuXG4gIG9uTW91c2VVcDogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci5tb3VzZTtcblxuICAgIHJldHVybiB0aGlzLmhhbmRsZURyYWdTdG9wKGUpO1xuICB9O1xuXG4gIC8vIFNhbWUgYXMgb25Nb3VzZURvd24gKHN0YXJ0IGRyYWcpLCBidXQgbm93IGNvbnNpZGVyIHRoaXMgYSB0b3VjaCBkZXZpY2UuXG4gIG9uVG91Y2hTdGFydDogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIC8vIFdlJ3JlIG9uIGEgdG91Y2ggZGV2aWNlIG5vdywgc28gY2hhbmdlIHRoZSBldmVudCBoYW5kbGVyc1xuICAgIGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci50b3VjaDtcblxuICAgIHJldHVybiB0aGlzLmhhbmRsZURyYWdTdGFydChlKTtcbiAgfTtcblxuICBvblRvdWNoRW5kOiBFdmVudEhhbmRsZXI8TW91c2VUb3VjaEV2ZW50PiA9IChlKSA9PiB7XG4gICAgLy8gV2UncmUgb24gYSB0b3VjaCBkZXZpY2Ugbm93LCBzbyBjaGFuZ2UgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLnRvdWNoO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlRHJhZ1N0b3AoZSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIFJldXNlIHRoZSBjaGlsZCBwcm92aWRlZFxuICAgIC8vIFRoaXMgbWFrZXMgaXQgZmxleGlibGUgdG8gdXNlIHdoYXRldmVyIGVsZW1lbnQgaXMgd2FudGVkIChkaXYsIHVsLCBldGMpXG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChSZWFjdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pLCB7XG4gICAgICBzdHlsZTogc3R5bGVIYWNrcyh0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLnN0eWxlKSxcblxuICAgICAgLy8gTm90ZTogbW91c2VNb3ZlIGhhbmRsZXIgaXMgYXR0YWNoZWQgdG8gZG9jdW1lbnQgc28gaXQgd2lsbCBzdGlsbCBmdW5jdGlvblxuICAgICAgLy8gd2hlbiB0aGUgdXNlciBkcmFncyBxdWlja2x5IGFuZCBsZWF2ZXMgdGhlIGJvdW5kcyBvZiB0aGUgZWxlbWVudC5cbiAgICAgIG9uTW91c2VEb3duOiB0aGlzLm9uTW91c2VEb3duLFxuICAgICAgb25Ub3VjaFN0YXJ0OiB0aGlzLm9uVG91Y2hTdGFydCxcbiAgICAgIG9uTW91c2VVcDogdGhpcy5vbk1vdXNlVXAsXG4gICAgICBvblRvdWNoRW5kOiB0aGlzLm9uVG91Y2hFbmRcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0RyYWdnYWJsZUNvcmUuanMiLCIvLyBAZmxvd1xuLyplc2xpbnQgbm8tY29uc29sZTowKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvZyguLi5hcmdzOiBhbnkpIHtcbiAgaWYgKHByb2Nlc3MuZW52LkRSQUdHQUJMRV9ERUJVRykgY29uc29sZS5sb2coLi4uYXJncyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdXRpbHMvbG9nLmpzIiwidmFyIERyYWdnYWJsZSA9IHJlcXVpcmUoJy4vbGliL0RyYWdnYWJsZScpLmRlZmF1bHQ7XG5cbi8vIFByZXZpb3VzIHZlcnNpb25zIG9mIHRoaXMgbGliIGV4cG9ydGVkIDxEcmFnZ2FibGU+IGFzIHRoZSByb290IGV4cG9ydC4gQXMgdG8gbm90IGJyZWFrXG4vLyB0aGVtLCBvciBUeXBlU2NyaXB0LCB3ZSBleHBvcnQgKmJvdGgqIGFzIHRoZSByb290IGFuZCBhcyAnZGVmYXVsdCcuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL216YWJyaXNraWUvcmVhY3QtZHJhZ2dhYmxlL3B1bGwvMjU0XG4vLyBhbmQgaHR0cHM6Ly9naXRodWIuY29tL216YWJyaXNraWUvcmVhY3QtZHJhZ2dhYmxlL2lzc3Vlcy8yNjZcbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlO1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IERyYWdnYWJsZTtcbm1vZHVsZS5leHBvcnRzLkRyYWdnYWJsZUNvcmUgPSByZXF1aXJlKCcuL2xpYi9EcmFnZ2FibGVDb3JlJykuZGVmYXVsdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LmpzIiwiLy8gQGZsb3dcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7Y3JlYXRlQ1NTVHJhbnNmb3JtLCBjcmVhdGVTVkdUcmFuc2Zvcm19IGZyb20gJy4vdXRpbHMvZG9tRm5zJztcbmltcG9ydCB7Y2FuRHJhZ1gsIGNhbkRyYWdZLCBjcmVhdGVEcmFnZ2FibGVEYXRhLCBnZXRCb3VuZFBvc2l0aW9ufSBmcm9tICcuL3V0aWxzL3Bvc2l0aW9uRm5zJztcbmltcG9ydCB7ZG9udFNldE1lfSBmcm9tICcuL3V0aWxzL3NoaW1zJztcbmltcG9ydCBEcmFnZ2FibGVDb3JlIGZyb20gJy4vRHJhZ2dhYmxlQ29yZSc7XG5pbXBvcnQgdHlwZSB7Q29udHJvbFBvc2l0aW9uLCBEcmFnZ2FibGVCb3VuZHMsIERyYWdnYWJsZUNvcmVQcm9wc30gZnJvbSAnLi9EcmFnZ2FibGVDb3JlJztcbmltcG9ydCBsb2cgZnJvbSAnLi91dGlscy9sb2cnO1xuaW1wb3J0IHR5cGUge0RyYWdnYWJsZUV2ZW50SGFuZGxlcn0gZnJvbSAnLi91dGlscy90eXBlcyc7XG5pbXBvcnQgdHlwZSB7RWxlbWVudCBhcyBSZWFjdEVsZW1lbnR9IGZyb20gJ3JlYWN0JztcblxudHlwZSBEcmFnZ2FibGVTdGF0ZSA9IHtcbiAgZHJhZ2dpbmc6IGJvb2xlYW4sXG4gIGRyYWdnZWQ6IGJvb2xlYW4sXG4gIHg6IG51bWJlciwgeTogbnVtYmVyLFxuICBzbGFja1g6IG51bWJlciwgc2xhY2tZOiBudW1iZXIsXG4gIGlzRWxlbWVudFNWRzogYm9vbGVhblxufTtcblxuZXhwb3J0IHR5cGUgRHJhZ2dhYmxlUHJvcHMgPSB7XG4gIC4uLiRFeGFjdDxEcmFnZ2FibGVDb3JlUHJvcHM+LFxuICBheGlzOiAnYm90aCcgfCAneCcgfCAneScgfCAnbm9uZScsXG4gIGJvdW5kczogRHJhZ2dhYmxlQm91bmRzIHwgc3RyaW5nIHwgZmFsc2UsXG4gIGRlZmF1bHRDbGFzc05hbWU6IHN0cmluZyxcbiAgZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nOiBzdHJpbmcsXG4gIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkOiBzdHJpbmcsXG4gIGRlZmF1bHRQb3NpdGlvbjogQ29udHJvbFBvc2l0aW9uLFxuICBwb3NpdGlvbjogQ29udHJvbFBvc2l0aW9uLFxufTtcblxuLy9cbi8vIERlZmluZSA8RHJhZ2dhYmxlPlxuLy9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ2dhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PERyYWdnYWJsZVByb3BzLCBEcmFnZ2FibGVTdGF0ZT4ge1xuXG4gIHN0YXRpYyBkaXNwbGF5TmFtZSA9ICdEcmFnZ2FibGUnO1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLy8gQWNjZXB0cyBhbGwgcHJvcHMgPERyYWdnYWJsZUNvcmU+IGFjY2VwdHMuXG4gICAgLi4uRHJhZ2dhYmxlQ29yZS5wcm9wVHlwZXMsXG5cbiAgICAvKipcbiAgICAgKiBgYXhpc2AgZGV0ZXJtaW5lcyB3aGljaCBheGlzIHRoZSBkcmFnZ2FibGUgY2FuIG1vdmUuXG4gICAgICpcbiAgICAgKiAgTm90ZSB0aGF0IGFsbCBjYWxsYmFja3Mgd2lsbCBzdGlsbCByZXR1cm4gZGF0YSBhcyBub3JtYWwuIFRoaXMgb25seVxuICAgICAqICBjb250cm9scyBmbHVzaGluZyB0byB0aGUgRE9NLlxuICAgICAqXG4gICAgICogJ2JvdGgnIGFsbG93cyBtb3ZlbWVudCBob3Jpem9udGFsbHkgYW5kIHZlcnRpY2FsbHkuXG4gICAgICogJ3gnIGxpbWl0cyBtb3ZlbWVudCB0byBob3Jpem9udGFsIGF4aXMuXG4gICAgICogJ3knIGxpbWl0cyBtb3ZlbWVudCB0byB2ZXJ0aWNhbCBheGlzLlxuICAgICAqICdub25lJyBsaW1pdHMgYWxsIG1vdmVtZW50LlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gJ2JvdGgnLlxuICAgICAqL1xuICAgIGF4aXM6IFByb3BUeXBlcy5vbmVPZihbJ2JvdGgnLCAneCcsICd5JywgJ25vbmUnXSksXG5cbiAgICAvKipcbiAgICAgKiBgYm91bmRzYCBkZXRlcm1pbmVzIHRoZSByYW5nZSBvZiBtb3ZlbWVudCBhdmFpbGFibGUgdG8gdGhlIGVsZW1lbnQuXG4gICAgICogQXZhaWxhYmxlIHZhbHVlcyBhcmU6XG4gICAgICpcbiAgICAgKiAncGFyZW50JyByZXN0cmljdHMgbW92ZW1lbnQgd2l0aGluIHRoZSBEcmFnZ2FibGUncyBwYXJlbnQgbm9kZS5cbiAgICAgKlxuICAgICAqIEFsdGVybmF0aXZlbHksIHBhc3MgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzLCBhbGwgb2Ygd2hpY2ggYXJlIG9wdGlvbmFsOlxuICAgICAqXG4gICAgICoge2xlZnQ6IExFRlRfQk9VTkQsIHJpZ2h0OiBSSUdIVF9CT1VORCwgYm90dG9tOiBCT1RUT01fQk9VTkQsIHRvcDogVE9QX0JPVU5EfVxuICAgICAqXG4gICAgICogQWxsIHZhbHVlcyBhcmUgaW4gcHguXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganN4XG4gICAgICogICBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAqICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgIDxEcmFnZ2FibGUgYm91bmRzPXt7cmlnaHQ6IDMwMCwgYm90dG9tOiAzMDB9fT5cbiAgICAgKiAgICAgICAgICAgICAgPGRpdj5Db250ZW50PC9kaXY+XG4gICAgICogICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBib3VuZHM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgbGVmdDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgcmlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIHRvcDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgYm90dG9tOiBQcm9wVHlwZXMubnVtYmVyXG4gICAgICB9KSxcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMub25lT2YoW2ZhbHNlXSlcbiAgICBdKSxcblxuICAgIGRlZmF1bHRDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgLyoqXG4gICAgICogYGRlZmF1bHRQb3NpdGlvbmAgc3BlY2lmaWVzIHRoZSB4IGFuZCB5IHRoYXQgdGhlIGRyYWdnZWQgaXRlbSBzaG91bGQgc3RhcnQgYXRcbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgICAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICogICAgICAgICAgICAgICAgICA8RHJhZ2dhYmxlIGRlZmF1bHRQb3NpdGlvbj17e3g6IDI1LCB5OiAyNX19PlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIDxkaXY+SSBzdGFydCB3aXRoIHRyYW5zZm9ybVg6IDI1cHggYW5kIHRyYW5zZm9ybVk6IDI1cHg7PC9kaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICAgICAgKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICogICAgICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBkZWZhdWx0UG9zaXRpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICB4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgeTogUHJvcFR5cGVzLm51bWJlclxuICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogYHBvc2l0aW9uYCwgaWYgcHJlc2VudCwgZGVmaW5lcyB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudC5cbiAgICAgKlxuICAgICAqICBUaGlzIGlzIHNpbWlsYXIgdG8gaG93IGZvcm0gZWxlbWVudHMgaW4gUmVhY3Qgd29yayAtIGlmIG5vIGBwb3NpdGlvbmAgaXMgc3VwcGxpZWQsIHRoZSBjb21wb25lbnRcbiAgICAgKiAgaXMgdW5jb250cm9sbGVkLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzeFxuICAgICAqICAgICAgbGV0IEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAgKiAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgcG9zaXRpb249e3t4OiAyNSwgeTogMjV9fT5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICA8ZGl2Pkkgc3RhcnQgd2l0aCB0cmFuc2Zvcm1YOiAyNXB4IGFuZCB0cmFuc2Zvcm1ZOiAyNXB4OzwvZGl2PlxuICAgICAqICAgICAgICAgICAgICAgICAgPC9EcmFnZ2FibGU+XG4gICAgICogICAgICAgICAgICAgICk7XG4gICAgICogICAgICAgICAgfVxuICAgICAqICAgICAgfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgcG9zaXRpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICB4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgeTogUHJvcFR5cGVzLm51bWJlclxuICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogVGhlc2UgcHJvcGVydGllcyBzaG91bGQgYmUgZGVmaW5lZCBvbiB0aGUgY2hpbGQsIG5vdCBoZXJlLlxuICAgICAqL1xuICAgIGNsYXNzTmFtZTogZG9udFNldE1lLFxuICAgIHN0eWxlOiBkb250U2V0TWUsXG4gICAgdHJhbnNmb3JtOiBkb250U2V0TWVcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLkRyYWdnYWJsZUNvcmUuZGVmYXVsdFByb3BzLFxuICAgIGF4aXM6ICdib3RoJyxcbiAgICBib3VuZHM6IGZhbHNlLFxuICAgIGRlZmF1bHRDbGFzc05hbWU6ICdyZWFjdC1kcmFnZ2FibGUnLFxuICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2luZzogJ3JlYWN0LWRyYWdnYWJsZS1kcmFnZ2luZycsXG4gICAgZGVmYXVsdENsYXNzTmFtZURyYWdnZWQ6ICdyZWFjdC1kcmFnZ2FibGUtZHJhZ2dlZCcsXG4gICAgZGVmYXVsdFBvc2l0aW9uOiB7eDogMCwgeTogMH0sXG4gICAgcG9zaXRpb246IG51bGxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogRHJhZ2dhYmxlUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLy8gV2hldGhlciBvciBub3Qgd2UgYXJlIGN1cnJlbnRseSBkcmFnZ2luZy5cbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcblxuICAgICAgLy8gV2hldGhlciBvciBub3Qgd2UgaGF2ZSBiZWVuIGRyYWdnZWQgYmVmb3JlLlxuICAgICAgZHJhZ2dlZDogZmFsc2UsXG5cbiAgICAgIC8vIEN1cnJlbnQgdHJhbnNmb3JtIHggYW5kIHkuXG4gICAgICB4OiBwcm9wcy5wb3NpdGlvbiA/IHByb3BzLnBvc2l0aW9uLnggOiBwcm9wcy5kZWZhdWx0UG9zaXRpb24ueCxcbiAgICAgIHk6IHByb3BzLnBvc2l0aW9uID8gcHJvcHMucG9zaXRpb24ueSA6IHByb3BzLmRlZmF1bHRQb3NpdGlvbi55LFxuXG4gICAgICAvLyBVc2VkIGZvciBjb21wZW5zYXRpbmcgZm9yIG91dC1vZi1ib3VuZHMgZHJhZ3NcbiAgICAgIHNsYWNrWDogMCwgc2xhY2tZOiAwLFxuXG4gICAgICAvLyBDYW4gb25seSBkZXRlcm1pbmUgaWYgU1ZHIGFmdGVyIG1vdW50aW5nXG4gICAgICBpc0VsZW1lbnRTVkc6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5wb3NpdGlvbiAmJiAhKHRoaXMucHJvcHMub25EcmFnIHx8IHRoaXMucHJvcHMub25TdG9wKSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBjb25zb2xlLndhcm4oJ0EgYHBvc2l0aW9uYCB3YXMgYXBwbGllZCB0byB0aGlzIDxEcmFnZ2FibGU+LCB3aXRob3V0IGRyYWcgaGFuZGxlcnMuIFRoaXMgd2lsbCBtYWtlIHRoaXMgJyArXG4gICAgICAgICdjb21wb25lbnQgZWZmZWN0aXZlbHkgdW5kcmFnZ2FibGUuIFBsZWFzZSBhdHRhY2ggYG9uRHJhZ2Agb3IgYG9uU3RvcGAgaGFuZGxlcnMgc28geW91IGNhbiBhZGp1c3QgdGhlICcgK1xuICAgICAgICAnYHBvc2l0aW9uYCBvZiB0aGlzIGVsZW1lbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBlbGVtZW50IHBhc3NlZCBpcyBhbiBpbnN0YW5jZW9mIFNWR0VsZW1lbnRcbiAgICBpZih0eXBlb2Ygd2luZG93LlNWR0VsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpIGluc3RhbmNlb2Ygd2luZG93LlNWR0VsZW1lbnQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0VsZW1lbnRTVkc6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IE9iamVjdCkge1xuICAgIC8vIFNldCB4L3kgaWYgcG9zaXRpb24gaGFzIGNoYW5nZWRcbiAgICBpZiAobmV4dFByb3BzLnBvc2l0aW9uICYmXG4gICAgICAgICghdGhpcy5wcm9wcy5wb3NpdGlvbiB8fFxuICAgICAgICAgIG5leHRQcm9wcy5wb3NpdGlvbi54ICE9PSB0aGlzLnByb3BzLnBvc2l0aW9uLnggfHxcbiAgICAgICAgICBuZXh0UHJvcHMucG9zaXRpb24ueSAhPT0gdGhpcy5wcm9wcy5wb3NpdGlvbi55XG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHg6IG5leHRQcm9wcy5wb3NpdGlvbi54LCB5OiBuZXh0UHJvcHMucG9zaXRpb24ueSB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnZ2luZzogZmFsc2V9KTsgLy8gcHJldmVudHMgaW52YXJpYW50IGlmIHVubW91bnRlZCB3aGlsZSBkcmFnZ2luZ1xuICB9XG5cbiAgb25EcmFnU3RhcnQ6IERyYWdnYWJsZUV2ZW50SGFuZGxlciA9IChlLCBjb3JlRGF0YSkgPT4ge1xuICAgIGxvZygnRHJhZ2dhYmxlOiBvbkRyYWdTdGFydDogJWonLCBjb3JlRGF0YSk7XG5cbiAgICAvLyBTaG9ydC1jaXJjdWl0IGlmIHVzZXIncyBjYWxsYmFjayBraWxsZWQgaXQuXG4gICAgY29uc3Qgc2hvdWxkU3RhcnQgPSB0aGlzLnByb3BzLm9uU3RhcnQoZSwgY3JlYXRlRHJhZ2dhYmxlRGF0YSh0aGlzLCBjb3JlRGF0YSkpO1xuICAgIC8vIEtpbGxzIHN0YXJ0IGV2ZW50IG9uIGNvcmUgYXMgd2VsbCwgc28gbW92ZSBoYW5kbGVycyBhcmUgbmV2ZXIgYm91bmQuXG4gICAgaWYgKHNob3VsZFN0YXJ0ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ2dpbmc6IHRydWUsIGRyYWdnZWQ6IHRydWV9KTtcbiAgfTtcblxuICBvbkRyYWc6IERyYWdnYWJsZUV2ZW50SGFuZGxlciA9IChlLCBjb3JlRGF0YSkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5kcmFnZ2luZykgcmV0dXJuIGZhbHNlO1xuICAgIGxvZygnRHJhZ2dhYmxlOiBvbkRyYWc6ICVqJywgY29yZURhdGEpO1xuXG4gICAgY29uc3QgdWlEYXRhID0gY3JlYXRlRHJhZ2dhYmxlRGF0YSh0aGlzLCBjb3JlRGF0YSk7XG5cbiAgICBjb25zdCBuZXdTdGF0ZTogJFNoYXBlPERyYWdnYWJsZVN0YXRlPiA9IHtcbiAgICAgIHg6IHVpRGF0YS54LFxuICAgICAgeTogdWlEYXRhLnlcbiAgICB9O1xuXG4gICAgLy8gS2VlcCB3aXRoaW4gYm91bmRzLlxuICAgIGlmICh0aGlzLnByb3BzLmJvdW5kcykge1xuICAgICAgLy8gU2F2ZSBvcmlnaW5hbCB4IGFuZCB5LlxuICAgICAgY29uc3Qge3gsIHl9ID0gbmV3U3RhdGU7XG5cbiAgICAgIC8vIEFkZCBzbGFjayB0byB0aGUgdmFsdWVzIHVzZWQgdG8gY2FsY3VsYXRlIGJvdW5kIHBvc2l0aW9uLiBUaGlzIHdpbGwgZW5zdXJlIHRoYXQgaWZcbiAgICAgIC8vIHdlIHN0YXJ0IHJlbW92aW5nIHNsYWNrLCB0aGUgZWxlbWVudCB3b24ndCByZWFjdCB0byBpdCByaWdodCBhd2F5IHVudGlsIGl0J3MgYmVlblxuICAgICAgLy8gY29tcGxldGVseSByZW1vdmVkLlxuICAgICAgbmV3U3RhdGUueCArPSB0aGlzLnN0YXRlLnNsYWNrWDtcbiAgICAgIG5ld1N0YXRlLnkgKz0gdGhpcy5zdGF0ZS5zbGFja1k7XG5cbiAgICAgIC8vIEdldCBib3VuZCBwb3NpdGlvbi4gVGhpcyB3aWxsIGNlaWwvZmxvb3IgdGhlIHggYW5kIHkgd2l0aGluIHRoZSBib3VuZGFyaWVzLlxuICAgICAgY29uc3QgW25ld1N0YXRlWCwgbmV3U3RhdGVZXSA9IGdldEJvdW5kUG9zaXRpb24odGhpcywgbmV3U3RhdGUueCwgbmV3U3RhdGUueSk7XG4gICAgICBuZXdTdGF0ZS54ID0gbmV3U3RhdGVYO1xuICAgICAgbmV3U3RhdGUueSA9IG5ld1N0YXRlWTtcblxuICAgICAgLy8gUmVjYWxjdWxhdGUgc2xhY2sgYnkgbm90aW5nIGhvdyBtdWNoIHdhcyBzaGF2ZWQgYnkgdGhlIGJvdW5kUG9zaXRpb24gaGFuZGxlci5cbiAgICAgIG5ld1N0YXRlLnNsYWNrWCA9IHRoaXMuc3RhdGUuc2xhY2tYICsgKHggLSBuZXdTdGF0ZS54KTtcbiAgICAgIG5ld1N0YXRlLnNsYWNrWSA9IHRoaXMuc3RhdGUuc2xhY2tZICsgKHkgLSBuZXdTdGF0ZS55KTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBldmVudCB3ZSBmaXJlIHRvIHJlZmxlY3Qgd2hhdCByZWFsbHkgaGFwcGVuZWQgYWZ0ZXIgYm91bmRzIHRvb2sgZWZmZWN0LlxuICAgICAgdWlEYXRhLnggPSBuZXdTdGF0ZS54O1xuICAgICAgdWlEYXRhLnkgPSBuZXdTdGF0ZS55O1xuICAgICAgdWlEYXRhLmRlbHRhWCA9IG5ld1N0YXRlLnggLSB0aGlzLnN0YXRlLng7XG4gICAgICB1aURhdGEuZGVsdGFZID0gbmV3U3RhdGUueSAtIHRoaXMuc3RhdGUueTtcbiAgICB9XG5cbiAgICAvLyBTaG9ydC1jaXJjdWl0IGlmIHVzZXIncyBjYWxsYmFjayBraWxsZWQgaXQuXG4gICAgY29uc3Qgc2hvdWxkVXBkYXRlID0gdGhpcy5wcm9wcy5vbkRyYWcoZSwgdWlEYXRhKTtcbiAgICBpZiAoc2hvdWxkVXBkYXRlID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH07XG5cbiAgb25EcmFnU3RvcDogRHJhZ2dhYmxlRXZlbnRIYW5kbGVyID0gKGUsIGNvcmVEYXRhKSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmRyYWdnaW5nKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBTaG9ydC1jaXJjdWl0IGlmIHVzZXIncyBjYWxsYmFjayBraWxsZWQgaXQuXG4gICAgY29uc3Qgc2hvdWxkU3RvcCA9IHRoaXMucHJvcHMub25TdG9wKGUsIGNyZWF0ZURyYWdnYWJsZURhdGEodGhpcywgY29yZURhdGEpKTtcbiAgICBpZiAoc2hvdWxkU3RvcCA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgIGxvZygnRHJhZ2dhYmxlOiBvbkRyYWdTdG9wOiAlaicsIGNvcmVEYXRhKTtcblxuICAgIGNvbnN0IG5ld1N0YXRlOiAkU2hhcGU8RHJhZ2dhYmxlU3RhdGU+ID0ge1xuICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgc2xhY2tYOiAwLFxuICAgICAgc2xhY2tZOiAwXG4gICAgfTtcblxuICAgIC8vIElmIHRoaXMgaXMgYSBjb250cm9sbGVkIGNvbXBvbmVudCwgdGhlIHJlc3VsdCBvZiB0aGlzIG9wZXJhdGlvbiB3aWxsIGJlIHRvXG4gICAgLy8gcmV2ZXJ0IGJhY2sgdG8gdGhlIG9sZCBwb3NpdGlvbi4gV2UgZXhwZWN0IGEgaGFuZGxlciBvbiBgb25EcmFnU3RvcGAsIGF0IHRoZSBsZWFzdC5cbiAgICBjb25zdCBjb250cm9sbGVkID0gQm9vbGVhbih0aGlzLnByb3BzLnBvc2l0aW9uKTtcbiAgICBpZiAoY29udHJvbGxlZCkge1xuICAgICAgY29uc3Qge3gsIHl9ID0gdGhpcy5wcm9wcy5wb3NpdGlvbjtcbiAgICAgIG5ld1N0YXRlLnggPSB4O1xuICAgICAgbmV3U3RhdGUueSA9IHk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH07XG5cbiAgcmVuZGVyKCk6IFJlYWN0RWxlbWVudDxhbnk+IHtcbiAgICBsZXQgc3R5bGUgPSB7fSwgc3ZnVHJhbnNmb3JtID0gbnVsbDtcblxuICAgIC8vIElmIHRoaXMgaXMgY29udHJvbGxlZCwgd2UgZG9uJ3Qgd2FudCB0byBtb3ZlIGl0IC0gdW5sZXNzIGl0J3MgZHJhZ2dpbmcuXG4gICAgY29uc3QgY29udHJvbGxlZCA9IEJvb2xlYW4odGhpcy5wcm9wcy5wb3NpdGlvbik7XG4gICAgY29uc3QgZHJhZ2dhYmxlID0gIWNvbnRyb2xsZWQgfHwgdGhpcy5zdGF0ZS5kcmFnZ2luZztcblxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5wcm9wcy5wb3NpdGlvbiB8fCB0aGlzLnByb3BzLmRlZmF1bHRQb3NpdGlvbjtcbiAgICBjb25zdCB0cmFuc2Zvcm1PcHRzID0ge1xuICAgICAgLy8gU2V0IGxlZnQgaWYgaG9yaXpvbnRhbCBkcmFnIGlzIGVuYWJsZWRcbiAgICAgIHg6IGNhbkRyYWdYKHRoaXMpICYmIGRyYWdnYWJsZSA/XG4gICAgICAgIHRoaXMuc3RhdGUueCA6XG4gICAgICAgIHBvc2l0aW9uLngsXG5cbiAgICAgIC8vIFNldCB0b3AgaWYgdmVydGljYWwgZHJhZyBpcyBlbmFibGVkXG4gICAgICB5OiBjYW5EcmFnWSh0aGlzKSAmJiBkcmFnZ2FibGUgP1xuICAgICAgICB0aGlzLnN0YXRlLnkgOlxuICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgcjogdGhpcy5wcm9wcy5yb3RhdGU/dGhpcy5wcm9wcy5yb3RhdGU6MFxuICAgIH07XG5cbiAgICAvLyBJZiB0aGlzIGVsZW1lbnQgd2FzIFNWRywgd2UgdXNlIHRoZSBgdHJhbnNmb3JtYCBhdHRyaWJ1dGUuXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNFbGVtZW50U1ZHKSB7XG4gICAgICBzdmdUcmFuc2Zvcm0gPSBjcmVhdGVTVkdUcmFuc2Zvcm0odHJhbnNmb3JtT3B0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFkZCBhIENTUyB0cmFuc2Zvcm0gdG8gbW92ZSB0aGUgZWxlbWVudCBhcm91bmQuIFRoaXMgYWxsb3dzIHVzIHRvIG1vdmUgdGhlIGVsZW1lbnQgYXJvdW5kXG4gICAgICAvLyB3aXRob3V0IHdvcnJ5aW5nIGFib3V0IHdoZXRoZXIgb3Igbm90IGl0IGlzIHJlbGF0aXZlbHkgb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkLlxuICAgICAgLy8gSWYgdGhlIGl0ZW0geW91IGFyZSBkcmFnZ2luZyBhbHJlYWR5IGhhcyBhIHRyYW5zZm9ybSBzZXQsIHdyYXAgaXQgaW4gYSA8c3Bhbj4gc28gPERyYWdnYWJsZT5cbiAgICAgIC8vIGhhcyBhIGNsZWFuIHNsYXRlLlxuICAgICAgc3R5bGUgPSBjcmVhdGVDU1NUcmFuc2Zvcm0odHJhbnNmb3JtT3B0cyk7XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgZGVmYXVsdENsYXNzTmFtZSxcbiAgICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2luZyxcbiAgICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFJlYWN0LkNoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbik7XG5cbiAgICAvLyBNYXJrIHdpdGggY2xhc3Mgd2hpbGUgZHJhZ2dpbmdcbiAgICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc05hbWVzKChjaGlsZHJlbi5wcm9wcy5jbGFzc05hbWUgfHwgJycpLCBkZWZhdWx0Q2xhc3NOYW1lLCB7XG4gICAgICBbZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nXTogdGhpcy5zdGF0ZS5kcmFnZ2luZyxcbiAgICAgIFtkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dlZF06IHRoaXMuc3RhdGUuZHJhZ2dlZFxuICAgIH0pO1xuXG4gICAgLy8gUmV1c2UgdGhlIGNoaWxkIHByb3ZpZGVkXG4gICAgLy8gVGhpcyBtYWtlcyBpdCBmbGV4aWJsZSB0byB1c2Ugd2hhdGV2ZXIgZWxlbWVudCBpcyB3YW50ZWQgKGRpdiwgdWwsIGV0YylcbiAgICByZXR1cm4gKFxuICAgICAgPERyYWdnYWJsZUNvcmUgey4uLnRoaXMucHJvcHN9IG9uU3RhcnQ9e3RoaXMub25EcmFnU3RhcnR9IG9uRHJhZz17dGhpcy5vbkRyYWd9IG9uU3RvcD17dGhpcy5vbkRyYWdTdG9wfT5cbiAgICAgICAge1JlYWN0LmNsb25lRWxlbWVudChjaGlsZHJlbiwge1xuICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICAgIHN0eWxlOiB7Li4uY2hpbGRyZW4ucHJvcHMuc3R5bGUsIC4uLnN0eWxlfSxcbiAgICAgICAgICB0cmFuc2Zvcm06IHN2Z1RyYW5zZm9ybVxuICAgICAgICB9KX1cbiAgICAgIDwvRHJhZ2dhYmxlQ29yZT5cbiAgICApO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvRHJhZ2dhYmxlLmpzIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG5cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fVxuZnVuY3Rpb24gZW1wdHlGdW5jdGlvbldpdGhSZXNldCgpIHt9XG5lbXB0eUZ1bmN0aW9uV2l0aFJlc2V0LnJlc2V0V2FybmluZ0NhY2hlID0gZW1wdHlGdW5jdGlvbjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gc2hpbShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIGlmIChzZWNyZXQgPT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAvLyBJdCBpcyBzdGlsbCBzYWZlIHdoZW4gY2FsbGVkIGZyb20gUmVhY3QuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAnVXNlIFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICApO1xuICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIHRocm93IGVycjtcbiAgfTtcbiAgc2hpbS5pc1JlcXVpcmVkID0gc2hpbTtcbiAgZnVuY3Rpb24gZ2V0U2hpbSgpIHtcbiAgICByZXR1cm4gc2hpbTtcbiAgfTtcbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBzaGltLFxuICAgIGJvb2w6IHNoaW0sXG4gICAgZnVuYzogc2hpbSxcbiAgICBudW1iZXI6IHNoaW0sXG4gICAgb2JqZWN0OiBzaGltLFxuICAgIHN0cmluZzogc2hpbSxcbiAgICBzeW1ib2w6IHNoaW0sXG5cbiAgICBhbnk6IHNoaW0sXG4gICAgYXJyYXlPZjogZ2V0U2hpbSxcbiAgICBlbGVtZW50OiBzaGltLFxuICAgIGVsZW1lbnRUeXBlOiBzaGltLFxuICAgIGluc3RhbmNlT2Y6IGdldFNoaW0sXG4gICAgbm9kZTogc2hpbSxcbiAgICBvYmplY3RPZjogZ2V0U2hpbSxcbiAgICBvbmVPZjogZ2V0U2hpbSxcbiAgICBvbmVPZlR5cGU6IGdldFNoaW0sXG4gICAgc2hhcGU6IGdldFNoaW0sXG4gICAgZXhhY3Q6IGdldFNoaW0sXG5cbiAgICBjaGVja1Byb3BUeXBlczogZW1wdHlGdW5jdGlvbldpdGhSZXNldCxcbiAgICByZXNldFdhcm5pbmdDYWNoZTogZW1wdHlGdW5jdGlvblxuICB9O1xuXG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNyBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSAmJiBhcmcubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBpbm5lciA9IGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKTtcblx0XHRcdFx0aWYgKGlubmVyKSB7XG5cdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGlubmVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0Y2xhc3NOYW1lcy5kZWZhdWx0ID0gY2xhc3NOYW1lcztcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==