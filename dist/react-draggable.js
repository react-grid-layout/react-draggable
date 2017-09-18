(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react-dom"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react-dom", "react"], factory);
	else if(typeof exports === 'object')
		exports["ReactDraggable"] = factory(require("react-dom"), require("react"));
	else
		root["ReactDraggable"] = factory(root["ReactDOM"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_6__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findInArray = findInArray;
exports.isFunction = isFunction;
exports.isNum = isNum;
exports.int = int;
exports.dontSetMe = dontSetMe;

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.matchesSelector = matchesSelector;
exports.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.outerHeight = outerHeight;
exports.outerWidth = outerWidth;
exports.innerHeight = innerHeight;
exports.innerWidth = innerWidth;
exports.offsetXYFromParent = offsetXYFromParent;
exports.createCSSTransform = createCSSTransform;
exports.createSVGTransform = createSVGTransform;
exports.getTouch = getTouch;
exports.getTouchIdentifier = getTouchIdentifier;
exports.addUserSelectStyles = addUserSelectStyles;
exports.removeUserSelectStyles = removeUserSelectStyles;
exports.styleHacks = styleHacks;
exports.addClassName = addClassName;
exports.removeClassName = removeClassName;

var _shims = __webpack_require__(0);

var _getPrefix = __webpack_require__(18);

var _getPrefix2 = _interopRequireDefault(_getPrefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*:: import type {ControlPosition, MouseTouchEvent} from './types';*/


var matchesSelectorFunc = '';
function matchesSelector(el /*: Node*/, selector /*: string*/) /*: boolean*/ {
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = (0, _shims.findInArray)(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
      // $FlowIgnore: Doesn't think elements are indexable
      return (0, _shims.isFunction)(el[method]);
    });
  }

  // $FlowIgnore: Doesn't think elements are indexable
  return el[matchesSelectorFunc].call(el, selector);
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

function outerHeight(node /*: HTMLElement*/) /*: number*/ {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetTop which is including margin. See getBoundPosition
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height += (0, _shims.int)(computedStyle.borderTopWidth);
  height += (0, _shims.int)(computedStyle.borderBottomWidth);
  return height;
}

function outerWidth(node /*: HTMLElement*/) /*: number*/ {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetLeft which is including margin. See getBoundPosition
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width += (0, _shims.int)(computedStyle.borderLeftWidth);
  width += (0, _shims.int)(computedStyle.borderRightWidth);
  return width;
}
function innerHeight(node /*: HTMLElement*/) /*: number*/ {
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height -= (0, _shims.int)(computedStyle.paddingTop);
  height -= (0, _shims.int)(computedStyle.paddingBottom);
  return height;
}

function innerWidth(node /*: HTMLElement*/) /*: number*/ {
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width -= (0, _shims.int)(computedStyle.paddingLeft);
  width -= (0, _shims.int)(computedStyle.paddingRight);
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
      y = _ref.y;

  // Replace unitless items with px
  return _defineProperty({}, (0, _getPrefix.browserPrefixToKey)('transform', _getPrefix2.default), 'translate(' + x + 'px,' + y + 'px)');
}

function createSVGTransform(_ref3) /*: string*/ {
  var x = _ref3.x,
      y = _ref3.y;

  return 'translate(' + x + ',' + y + ')';
}

function getTouch(e /*: MouseTouchEvent*/, identifier /*: number*/) /*: ?{clientX: number, clientY: number}*/ {
  return e.targetTouches && (0, _shims.findInArray)(e.targetTouches, function (t) {
    return identifier === t.identifier;
  }) || e.changedTouches && (0, _shims.findInArray)(e.changedTouches, function (t) {
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
function addUserSelectStyles(doc /*: Document*/) {
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

function removeUserSelectStyles(doc /*: Document*/) {
  if (doc.body) removeClassName(doc.body, 'react-draggable-transparent-selection');
  window.getSelection().removeAllRanges(); // remove selection caused by scroll
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
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(14)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(16)();
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(1);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBoundPosition = getBoundPosition;
exports.snapToGrid = snapToGrid;
exports.canDragX = canDragX;
exports.canDragY = canDragY;
exports.getControlPosition = getControlPosition;
exports.createCoreData = createCoreData;
exports.createDraggableData = createDraggableData;

var _shims = __webpack_require__(0);

var _reactDom = __webpack_require__(4);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domFns = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    if (!(boundNode instanceof HTMLElement)) {
      throw new Error('Bounds selector "' + bounds + '" could not find an element.');
    }
    var nodeStyle = ownerWindow.getComputedStyle(node);
    var boundNodeStyle = ownerWindow.getComputedStyle(boundNode);
    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
    bounds = {
      left: -node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingLeft) + (0, _shims.int)(nodeStyle.marginLeft),
      top: -node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingTop) + (0, _shims.int)(nodeStyle.marginTop),
      right: (0, _domFns.innerWidth)(boundNode) - (0, _domFns.outerWidth)(node) - node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingRight) - (0, _shims.int)(nodeStyle.marginRight),
      bottom: (0, _domFns.innerHeight)(boundNode) - (0, _domFns.outerHeight)(node) - node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingBottom) - (0, _shims.int)(nodeStyle.marginBottom)
    };
  }

  // Keep x and y below right and bottom limits...
  if ((0, _shims.isNum)(bounds.right)) x = Math.min(x, bounds.right);
  if ((0, _shims.isNum)(bounds.bottom)) y = Math.min(y, bounds.bottom);

  // But above left and top limits.
  if ((0, _shims.isNum)(bounds.left)) x = Math.max(x, bounds.left);
  if ((0, _shims.isNum)(bounds.top)) y = Math.max(y, bounds.top);

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
  var touchObj = typeof touchIdentifier === 'number' ? (0, _domFns.getTouch)(e, touchIdentifier) : null;
  if (typeof touchIdentifier === 'number' && !touchObj) return null; // not the right touch
  var node = findDOMNode(draggableCore);
  // User can provide an offsetParent if desired.
  var offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
  return (0, _domFns.offsetXYFromParent)(touchObj || e, offsetParent);
}

// Create an data object exposed by <DraggableCore>'s events
function createCoreData(draggable /*: DraggableCore*/, x /*: number*/, y /*: number*/) /*: DraggableData*/ {
  var state = draggable.state;
  var isStart = !(0, _shims.isNum)(state.lastX);
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
  var node = _reactDom2.default.findDOMNode(draggable);
  if (!node) {
    throw new Error('<DraggableCore>: Unmounted during event!');
  }
  // $FlowIgnore we can't assert on HTMLElement due to tests... FIXME
  return node;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(4);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domFns = __webpack_require__(5);

var _positionFns = __webpack_require__(9);

var _shims = __webpack_require__(0);

var _log = __webpack_require__(11);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var thisNode = _reactDom2.default.findDOMNode(_this);
      if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
        throw new Error('<DraggableCore> not mounted on DragStart!');
      }
      var ownerDocument = thisNode.ownerDocument;

      // Short circuit if handle or cancel prop was provided and selector doesn't match.

      if (_this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || _this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.handle, thisNode) || _this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.cancel, thisNode)) {
        return;
      }

      // Set touch identifier in component state if this is a touch event. This allows us to
      // distinguish between individual touches on multitouch screens by identifying which
      // touchpoint was set to this element.
      var touchIdentifier = (0, _domFns.getTouchIdentifier)(e);
      _this.setState({ touchIdentifier: touchIdentifier });

      // Get the current drag point from the event. This is used as the offset.
      var position = (0, _positionFns.getControlPosition)(e, touchIdentifier, _this);
      if (position == null) return; // not possible but satisfies flow
      var x = position.x,
          y = position.y;

      // Create an event object with all the data parents need to make a decision here.

      var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);

      (0, _log2.default)('DraggableCore: handleDragStart: %j', coreEvent);

      // Call event handler. If it returns explicit false, cancel.
      (0, _log2.default)('calling', _this.props.onStart);
      var shouldUpdate = _this.props.onStart(e, coreEvent);
      if (shouldUpdate === false) return;

      // Add a style to the body to disable user-select. This prevents text from
      // being selected all over the page.
      if (_this.props.enableUserSelectHack) (0, _domFns.addUserSelectStyles)(ownerDocument);

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
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.move, _this.handleDrag);
      // cross-origin
      try {
        // to fix when using iframe on IE11/edge, it gets sticky click
        (0, _domFns.addEvent)(ownerDocument.defaultView.top, dragEventFor.stop, _this.handleDragStop);
      } catch (e) {
        (0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, _this.handleDragStop);
      }
    }, _this.handleDrag = function (e) {

      // Prevent scrolling on mobile devices, like ipad/iphone.
      if (e.type === 'touchmove') e.preventDefault();

      // Get the current drag point from the event. This is used as the offset.
      var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _this);
      if (position == null) return;
      var x = position.x,
          y = position.y;

      // Snap to grid if prop has been provided

      if (Array.isArray(_this.props.grid)) {
        var _deltaX = x - _this.state.lastX,
            _deltaY = y - _this.state.lastY;

        var _snapToGrid = (0, _positionFns.snapToGrid)(_this.props.grid, _deltaX, _deltaY);

        var _snapToGrid2 = _slicedToArray(_snapToGrid, 2);

        _deltaX = _snapToGrid2[0];
        _deltaY = _snapToGrid2[1];

        if (!_deltaX && !_deltaY) return; // skip useless drag
        x = _this.state.lastX + _deltaX, y = _this.state.lastY + _deltaY;
      }

      var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);

      (0, _log2.default)('DraggableCore: handleDrag: %j', coreEvent);

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

      var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _this);
      if (position == null) return;
      var x = position.x,
          y = position.y;

      var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);

      var thisNode = _reactDom2.default.findDOMNode(_this);
      if (thisNode) {
        // Remove user-select hack
        if (_this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(thisNode.ownerDocument);
      }

      (0, _log2.default)('DraggableCore: handleDragStop: %j', coreEvent);

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
        (0, _log2.default)('DraggableCore: Removing handlers');
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.move, _this.handleDrag);
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.stop, _this.handleDragStop);
        (0, _domFns.removeEvent)(thisNode.ownerDocument.defaultView.top, dragEventFor.stop, _this.handleDragStop);
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
      var thisNode = _reactDom2.default.findDOMNode(this);
      if (thisNode) {
        var ownerDocument = thisNode.ownerDocument;

        (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
        if (this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(ownerDocument);
      }
    }

    // Same as onMouseDown (start drag), but now consider this a touch device.

  }, {
    key: 'render',
    value: function render() {
      // Reuse the child provided
      // This makes it flexible to use whatever element is wanted (div, ul, etc)
      return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), {
        style: (0, _domFns.styleHacks)(this.props.children.props.style),

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
}(_react2.default.Component);

DraggableCore.displayName = 'DraggableCore';
DraggableCore.propTypes = {
  /**
   * `allowAnyClick` allows dragging using any mouse button.
   * By default, we only accept the left button.
   *
   * Defaults to `false`.
   */
  allowAnyClick: _propTypes2.default.bool,

  /**
   * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
   * with the exception of `onMouseDown`, will not fire.
   */
  disabled: _propTypes2.default.bool,

  /**
   * By default, we add 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag. If this is causing problems
   * for your app, set this to `false`.
   */
  enableUserSelectHack: _propTypes2.default.bool,

  /**
   * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
   * instead of using the parent node.
   */
  offsetParent: function offsetParent(props, propName) {
    if (process.browser && props[propName] && props[propName].nodeType !== 1) {
      throw new Error('Draggable\'s offsetParent must be a DOM Node.');
    }
  },

  /**
   * `grid` specifies the x and y that dragging should snap to.
   */
  grid: _propTypes2.default.arrayOf(_propTypes2.default.number),

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
  handle: _propTypes2.default.string,

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
  cancel: _propTypes2.default.string,

  /**
   * Called when dragging starts.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onStart: _propTypes2.default.func,

  /**
   * Called while dragging.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onDrag: _propTypes2.default.func,

  /**
   * Called when dragging stops.
   * If this function returns the boolean false, the drag will remain active.
   */
  onStop: _propTypes2.default.func,

  /**
   * A workaround option which can be passed if onMouseDown needs to be accessed,
   * since it'll always be blocked (as there is internal use of onMouseDown)
   */
  onMouseDown: _propTypes2.default.func,

  /**
   * These properties should be defined on the child, not here.
   */
  className: _shims.dontSetMe,
  style: _shims.dontSetMe,
  transform: _shims.dontSetMe
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
exports.default = DraggableCore;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = log;

/*eslint no-console:0*/
function log() {
  var _console;

  if (true) (_console = console).log.apply(_console, arguments);
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Draggable = __webpack_require__(13).default;

// Previous versions of this lib exported <Draggable> as the root export. As to not break
// them, or TypeScript, we export *both* as the root and as 'default'.
// See https://github.com/mzabriskie/react-draggable/pull/254
// and https://github.com/mzabriskie/react-draggable/issues/266
module.exports = Draggable;
module.exports.default = Draggable;
module.exports.DraggableCore = __webpack_require__(10).default;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(4);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = __webpack_require__(17);

var _classnames2 = _interopRequireDefault(_classnames);

var _domFns = __webpack_require__(5);

var _positionFns = __webpack_require__(9);

var _shims = __webpack_require__(0);

var _DraggableCore = __webpack_require__(10);

var _DraggableCore2 = _interopRequireDefault(_DraggableCore);

var _log = __webpack_require__(11);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      (0, _log2.default)('Draggable: onDragStart: %j', coreData);

      // Short-circuit if user's callback killed it.
      var shouldStart = _this.props.onStart(e, (0, _positionFns.createDraggableData)(_this, coreData));
      // Kills start event on core as well, so move handlers are never bound.
      if (shouldStart === false) return false;

      _this.setState({ dragging: true, dragged: true });
    };

    _this.onDrag = function (e, coreData) {
      if (!_this.state.dragging) return false;
      (0, _log2.default)('Draggable: onDrag: %j', coreData);

      var uiData = (0, _positionFns.createDraggableData)(_this, coreData);

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
        // $FlowBug

        // Recalculate slack by noting how much was shaved by the boundPosition handler.
        var _getBoundPosition = (0, _positionFns.getBoundPosition)(_this, newState.x, newState.y);

        var _getBoundPosition2 = _slicedToArray(_getBoundPosition, 2);

        newState.x = _getBoundPosition2[0];
        newState.y = _getBoundPosition2[1];
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
      var shouldStop = _this.props.onStop(e, (0, _positionFns.createDraggableData)(_this, coreData));
      if (shouldStop === false) return false;

      (0, _log2.default)('Draggable: onDragStop: %j', coreData);

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
      if (typeof window.SVGElement !== 'undefined' && _reactDom2.default.findDOMNode(this) instanceof window.SVGElement) {
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
        x: (0, _positionFns.canDragX)(this) && draggable ? this.state.x : position.x,

        // Set top if vertical drag is enabled
        y: (0, _positionFns.canDragY)(this) && draggable ? this.state.y : position.y
      };

      // If this element was SVG, we use the `transform` attribute.
      if (this.state.isElementSVG) {
        svgTransform = (0, _domFns.createSVGTransform)(transformOpts);
      } else {
        // Add a CSS transform to move the element around. This allows us to move the element around
        // without worrying about whether or not it is relatively or absolutely positioned.
        // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
        // has a clean slate.
        style = (0, _domFns.createCSSTransform)(transformOpts);
      }

      var _props = this.props,
          defaultClassName = _props.defaultClassName,
          defaultClassNameDragging = _props.defaultClassNameDragging,
          defaultClassNameDragged = _props.defaultClassNameDragged;

      // Mark with class while dragging

      var className = (0, _classnames2.default)(this.props.children.props.className || '', defaultClassName, (_classNames = {}, _defineProperty(_classNames, defaultClassNameDragging, this.state.dragging), _defineProperty(_classNames, defaultClassNameDragged, this.state.dragged), _classNames));

      // Reuse the child provided
      // This makes it flexible to use whatever element is wanted (div, ul, etc)
      return _react2.default.createElement(
        _DraggableCore2.default,
        _extends({}, this.props, { onStart: this.onDragStart, onDrag: this.onDrag, onStop: this.onDragStop }),
        _react2.default.cloneElement(_react2.default.Children.only(this.props.children), {
          className: className,
          style: _extends({}, this.props.children.props.style, style),
          transform: svgTransform
        })
      );
    }
  }]);

  return Draggable;
}(_react2.default.Component);

Draggable.displayName = 'Draggable';
Draggable.propTypes = _extends({}, _DraggableCore2.default.propTypes, {

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
  axis: _propTypes2.default.oneOf(['both', 'x', 'y', 'none']),

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
  bounds: _propTypes2.default.oneOfType([_propTypes2.default.shape({
    left: _propTypes2.default.number,
    right: _propTypes2.default.number,
    top: _propTypes2.default.number,
    bottom: _propTypes2.default.number
  }), _propTypes2.default.string, _propTypes2.default.oneOf([false])]),

  defaultClassName: _propTypes2.default.string,
  defaultClassNameDragging: _propTypes2.default.string,
  defaultClassNameDragged: _propTypes2.default.string,

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
  defaultPosition: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
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
  position: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  }),

  /**
   * These properties should be defined on the child, not here.
   */
  className: _shims.dontSetMe,
  style: _shims.dontSetMe,
  transform: _shims.dontSetMe
});
Draggable.defaultProps = _extends({}, _DraggableCore2.default.defaultProps, {
  axis: 'both',
  bounds: false,
  defaultClassName: 'react-draggable',
  defaultClassNameDragging: 'react-draggable-dragging',
  defaultClassNameDragged: 'react-draggable-dragged',
  defaultPosition: { x: 0, y: 0 },
  position: null
});
exports.default = Draggable;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(2);
var warning = __webpack_require__(8);

var ReactPropTypesSecret = __webpack_require__(3);
var checkPropTypes = __webpack_require__(15);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production') {
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(8);
  var ReactPropTypesSecret = __webpack_require__(3);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(2);
var ReactPropTypesSecret = __webpack_require__(3);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
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
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
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
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
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
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrefix = getPrefix;
exports.browserPrefixToKey = browserPrefixToKey;
exports.browserPrefixToStyle = browserPrefixToStyle;
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
exports.default = getPrefix();

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIi4uL3dlYnBhY2svYm9vdHN0cmFwIGNmNzg2ZTRmN2RmY2UxZTk4ZWZkIiwiLi4vLi9saWIvdXRpbHMvc2hpbXMuanMiLCIuLi8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCIuLi9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmVhY3QtZG9tXCIsXCJjb21tb25qczJcIjpcInJlYWN0LWRvbVwiLFwiYW1kXCI6XCJyZWFjdC1kb21cIixcInJvb3RcIjpcIlJlYWN0RE9NXCJ9IiwiLi4vLi9saWIvdXRpbHMvZG9tRm5zLmpzIiwiLi4vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCIsXCJyb290XCI6XCJSZWFjdFwifSIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanMiLCIuLi8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzIiwiLi4vLi9saWIvdXRpbHMvcG9zaXRpb25GbnMuanMiLCIuLi8uL2xpYi9EcmFnZ2FibGVDb3JlLmpzIiwiLi4vLi9saWIvdXRpbHMvbG9nLmpzIiwiLi4vLi9pbmRleC5qcyIsIi4uLy4vbGliL0RyYWdnYWJsZS5qcyIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCIuLi8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanMiLCIuLi8uL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiLi4vLi9saWIvdXRpbHMvZ2V0UHJlZml4LmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbImZpbmRJbkFycmF5IiwiaXNGdW5jdGlvbiIsImlzTnVtIiwiaW50IiwiZG9udFNldE1lIiwiYXJyYXkiLCJjYWxsYmFjayIsImkiLCJsZW5ndGgiLCJhcHBseSIsImZ1bmMiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJudW0iLCJpc05hTiIsImEiLCJwYXJzZUludCIsInByb3BzIiwicHJvcE5hbWUiLCJjb21wb25lbnROYW1lIiwiRXJyb3IiLCJtYXRjaGVzU2VsZWN0b3IiLCJtYXRjaGVzU2VsZWN0b3JBbmRQYXJlbnRzVG8iLCJhZGRFdmVudCIsInJlbW92ZUV2ZW50Iiwib3V0ZXJIZWlnaHQiLCJvdXRlcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJpbm5lcldpZHRoIiwib2Zmc2V0WFlGcm9tUGFyZW50IiwiY3JlYXRlQ1NTVHJhbnNmb3JtIiwiY3JlYXRlU1ZHVHJhbnNmb3JtIiwiZ2V0VG91Y2giLCJnZXRUb3VjaElkZW50aWZpZXIiLCJhZGRVc2VyU2VsZWN0U3R5bGVzIiwicmVtb3ZlVXNlclNlbGVjdFN0eWxlcyIsInN0eWxlSGFja3MiLCJhZGRDbGFzc05hbWUiLCJyZW1vdmVDbGFzc05hbWUiLCJtYXRjaGVzU2VsZWN0b3JGdW5jIiwiZWwiLCJzZWxlY3RvciIsIm1ldGhvZCIsImJhc2VOb2RlIiwibm9kZSIsInBhcmVudE5vZGUiLCJldmVudCIsImhhbmRsZXIiLCJhdHRhY2hFdmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZXRhY2hFdmVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJjb21wdXRlZFN0eWxlIiwib3duZXJEb2N1bWVudCIsImRlZmF1bHRWaWV3IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImJvcmRlclRvcFdpZHRoIiwiYm9yZGVyQm90dG9tV2lkdGgiLCJ3aWR0aCIsImNsaWVudFdpZHRoIiwiYm9yZGVyTGVmdFdpZHRoIiwiYm9yZGVyUmlnaHRXaWR0aCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJldnQiLCJvZmZzZXRQYXJlbnQiLCJpc0JvZHkiLCJib2R5Iiwib2Zmc2V0UGFyZW50UmVjdCIsImxlZnQiLCJ0b3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ4IiwiY2xpZW50WCIsInNjcm9sbExlZnQiLCJ5IiwiY2xpZW50WSIsInNjcm9sbFRvcCIsImUiLCJpZGVudGlmaWVyIiwidGFyZ2V0VG91Y2hlcyIsInQiLCJjaGFuZ2VkVG91Y2hlcyIsImRvYyIsInN0eWxlRWwiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiaWQiLCJpbm5lckhUTUwiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFwcGVuZENoaWxkIiwid2luZG93IiwiZ2V0U2VsZWN0aW9uIiwicmVtb3ZlQWxsUmFuZ2VzIiwiY2hpbGRTdHlsZSIsInRvdWNoQWN0aW9uIiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwiYWRkIiwibWF0Y2giLCJSZWdFeHAiLCJyZW1vdmUiLCJyZXBsYWNlIiwiZ2V0Qm91bmRQb3NpdGlvbiIsInNuYXBUb0dyaWQiLCJjYW5EcmFnWCIsImNhbkRyYWdZIiwiZ2V0Q29udHJvbFBvc2l0aW9uIiwiY3JlYXRlQ29yZURhdGEiLCJjcmVhdGVEcmFnZ2FibGVEYXRhIiwiZHJhZ2dhYmxlIiwiYm91bmRzIiwiY2xvbmVCb3VuZHMiLCJmaW5kRE9NTm9kZSIsIm93bmVyV2luZG93IiwiYm91bmROb2RlIiwicXVlcnlTZWxlY3RvciIsIkhUTUxFbGVtZW50Iiwibm9kZVN0eWxlIiwiYm91bmROb2RlU3R5bGUiLCJvZmZzZXRMZWZ0IiwibWFyZ2luTGVmdCIsIm9mZnNldFRvcCIsIm1hcmdpblRvcCIsInJpZ2h0IiwibWFyZ2luUmlnaHQiLCJib3R0b20iLCJtYXJnaW5Cb3R0b20iLCJNYXRoIiwibWluIiwibWF4IiwiZ3JpZCIsInBlbmRpbmdYIiwicGVuZGluZ1kiLCJyb3VuZCIsImF4aXMiLCJ0b3VjaElkZW50aWZpZXIiLCJkcmFnZ2FibGVDb3JlIiwidG91Y2hPYmoiLCJzdGF0ZSIsImlzU3RhcnQiLCJsYXN0WCIsImRlbHRhWCIsImRlbHRhWSIsImxhc3RZIiwiY29yZURhdGEiLCJldmVudHNGb3IiLCJ0b3VjaCIsInN0YXJ0IiwibW92ZSIsInN0b3AiLCJtb3VzZSIsImRyYWdFdmVudEZvciIsIkRyYWdnYWJsZUNvcmUiLCJkcmFnZ2luZyIsIk5hTiIsImhhbmRsZURyYWdTdGFydCIsIm9uTW91c2VEb3duIiwiYWxsb3dBbnlDbGljayIsImJ1dHRvbiIsInRoaXNOb2RlIiwiZGlzYWJsZWQiLCJ0YXJnZXQiLCJOb2RlIiwiaGFuZGxlIiwiY2FuY2VsIiwic2V0U3RhdGUiLCJwb3NpdGlvbiIsImNvcmVFdmVudCIsIm9uU3RhcnQiLCJzaG91bGRVcGRhdGUiLCJlbmFibGVVc2VyU2VsZWN0SGFjayIsImhhbmRsZURyYWciLCJoYW5kbGVEcmFnU3RvcCIsInByZXZlbnREZWZhdWx0IiwiQXJyYXkiLCJpc0FycmF5Iiwib25EcmFnIiwiTW91c2VFdmVudCIsImVyciIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0TW91c2VFdmVudCIsIm9uU3RvcCIsIm9uTW91c2VVcCIsIm9uVG91Y2hTdGFydCIsIm9uVG91Y2hFbmQiLCJjbG9uZUVsZW1lbnQiLCJDaGlsZHJlbiIsIm9ubHkiLCJjaGlsZHJlbiIsInN0eWxlIiwiQ29tcG9uZW50IiwiZGlzcGxheU5hbWUiLCJwcm9wVHlwZXMiLCJib29sIiwicHJvY2VzcyIsImJyb3dzZXIiLCJub2RlVHlwZSIsImFycmF5T2YiLCJudW1iZXIiLCJzdHJpbmciLCJ0cmFuc2Zvcm0iLCJkZWZhdWx0UHJvcHMiLCJsb2ciLCJEcmFnZ2FibGUiLCJyZXF1aXJlIiwiZGVmYXVsdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJvbkRyYWdTdGFydCIsInNob3VsZFN0YXJ0IiwiZHJhZ2dlZCIsInVpRGF0YSIsIm5ld1N0YXRlIiwic2xhY2tYIiwic2xhY2tZIiwib25EcmFnU3RvcCIsInNob3VsZFN0b3AiLCJjb250cm9sbGVkIiwiQm9vbGVhbiIsImRlZmF1bHRQb3NpdGlvbiIsImlzRWxlbWVudFNWRyIsImNvbnNvbGUiLCJ3YXJuIiwiU1ZHRWxlbWVudCIsIm5leHRQcm9wcyIsInN2Z1RyYW5zZm9ybSIsInRyYW5zZm9ybU9wdHMiLCJkZWZhdWx0Q2xhc3NOYW1lIiwiZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nIiwiZGVmYXVsdENsYXNzTmFtZURyYWdnZWQiLCJvbmVPZiIsIm9uZU9mVHlwZSIsInNoYXBlIiwiZ2V0UHJlZml4IiwiYnJvd3NlclByZWZpeFRvS2V5IiwiYnJvd3NlclByZWZpeFRvU3R5bGUiLCJwcmVmaXhlcyIsInByb3AiLCJkb2N1bWVudEVsZW1lbnQiLCJwcmVmaXgiLCJrZWJhYlRvVGl0bGVDYXNlIiwidG9Mb3dlckNhc2UiLCJzdHIiLCJvdXQiLCJzaG91bGRDYXBpdGFsaXplIiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVy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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViw2QkFBNkI7QUFDN0IsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw0QkFBNEI7QUFDNUIsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZ0NBQWdDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQy9mQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnR0FBZ0c7QUFDaEc7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGdHQUFnRztBQUNoRztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCOztBQUVoQjtBQUNBOztBQUVBLGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQUE7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7UUM3Q2U4QixTLEdBQUFBLFM7UUFpQkFDLGtCLEdBQUFBLGtCO1FBSUFDLG9CLEdBQUFBLG9CO0FBdEJoQixJQUFNQyxXQUFXLENBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0IsR0FBbEIsRUFBdUIsSUFBdkIsQ0FBakI7QUFDTyxTQUFTSCxTQUFULGdCQUFxRDtBQUFBLE1BQWxDSSxJQUFrQyxvRkFBckIsV0FBcUI7O0FBQzFEO0FBQ0E7QUFDQTtBQUNBLE1BQUksT0FBT3BKLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUMsT0FBT0EsT0FBT3lGLFFBQWQsS0FBMkIsV0FBaEUsRUFBNkUsT0FBTyxFQUFQOztBQUU3RSxNQUFNVyxRQUFRcEcsT0FBT3lGLFFBQVAsQ0FBZ0I0RCxlQUFoQixDQUFnQ2pELEtBQTlDOztBQUVBLE1BQUlnRCxRQUFRaEQsS0FBWixFQUFtQixPQUFPLEVBQVA7O0FBRW5CLE9BQUssSUFBSS9MLElBQUksQ0FBYixFQUFnQkEsSUFBSThPLFNBQVM3TyxNQUE3QixFQUFxQ0QsR0FBckMsRUFBMEM7QUFDeEMsUUFBSTRPLG1CQUFtQkcsSUFBbkIsRUFBeUJELFNBQVM5TyxDQUFULENBQXpCLEtBQXlDK0wsS0FBN0MsRUFBb0QsT0FBTytDLFNBQVM5TyxDQUFULENBQVA7QUFDckQ7O0FBRUQsU0FBTyxFQUFQO0FBQ0Q7O0FBRU0sU0FBUzRPLGtCQUFULENBQTRCRyxJQUE1QixlQUEwQ0UsTUFBMUMsNEJBQWtFO0FBQ3ZFLFNBQU9BLGNBQVlBLE1BQVosR0FBcUJDLGlCQUFpQkgsSUFBakIsQ0FBckIsR0FBZ0RBLElBQXZEO0FBQ0Q7O0FBRU0sU0FBU0Ysb0JBQVQsQ0FBOEJFLElBQTlCLGVBQTRDRSxNQUE1Qyw0QkFBb0U7QUFDekUsU0FBT0EsZUFBYUEsT0FBT0UsV0FBUCxFQUFiLFNBQXFDSixJQUFyQyxHQUE4Q0EsSUFBckQ7QUFDRDs7QUFFRCxTQUFTRyxnQkFBVCxDQUEwQkUsR0FBMUIsNEJBQStDO0FBQzdDLE1BQUlDLE1BQU0sRUFBVjtBQUNBLE1BQUlDLG1CQUFtQixJQUF2QjtBQUNBLE9BQUssSUFBSXRQLElBQUksQ0FBYixFQUFnQkEsSUFBSW9QLElBQUluUCxNQUF4QixFQUFnQ0QsR0FBaEMsRUFBcUM7QUFDbkMsUUFBSXNQLGdCQUFKLEVBQXNCO0FBQ3BCRCxhQUFPRCxJQUFJcFAsQ0FBSixFQUFPdVAsV0FBUCxFQUFQO0FBQ0FELHlCQUFtQixLQUFuQjtBQUNELEtBSEQsTUFHTyxJQUFJRixJQUFJcFAsQ0FBSixNQUFXLEdBQWYsRUFBb0I7QUFDekJzUCx5QkFBbUIsSUFBbkI7QUFDRCxLQUZNLE1BRUE7QUFDTEQsYUFBT0QsSUFBSXBQLENBQUosQ0FBUDtBQUNEO0FBQ0Y7QUFDRCxTQUFPcVAsR0FBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQTtrQkFDZVYsVzs7Ozs7O0FDOUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVUiLCJmaWxlIjoiLi9kaXN0L3JlYWN0LWRyYWdnYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0LWRvbVwiKSwgcmVxdWlyZShcInJlYWN0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInJlYWN0LWRvbVwiLCBcInJlYWN0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlJlYWN0RHJhZ2dhYmxlXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3QtZG9tXCIpLCByZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlJlYWN0RHJhZ2dhYmxlXCJdID0gZmFjdG9yeShyb290W1wiUmVhY3RET01cIl0sIHJvb3RbXCJSZWFjdFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNmNzg2ZTRmN2RmY2UxZTk4ZWZkIiwiLy8gQGZsb3dcbi8vIEBjcmVkaXRzIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3JvZ296aG5pa29mZi9hNDNjZmVkMjdjNDFlNGU2OGNkY1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRJbkFycmF5KGFycmF5OiBBcnJheTxhbnk+IHwgVG91Y2hMaXN0LCBjYWxsYmFjazogRnVuY3Rpb24pOiBhbnkge1xuICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoY2FsbGJhY2suYXBwbHkoY2FsbGJhY2ssIFthcnJheVtpXSwgaSwgYXJyYXldKSkgcmV0dXJuIGFycmF5W2ldO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmM6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIGZ1bmMgPT09ICdmdW5jdGlvbicgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZ1bmMpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW0obnVtOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBudW0gPT09ICdudW1iZXInICYmICFpc05hTihudW0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW50KGE6IHN0cmluZyk6IG51bWJlciB7XG4gIHJldHVybiBwYXJzZUludChhLCAxMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb250U2V0TWUocHJvcHM6IE9iamVjdCwgcHJvcE5hbWU6IHN0cmluZywgY29tcG9uZW50TmFtZTogc3RyaW5nKSB7XG4gIGlmIChwcm9wc1twcm9wTmFtZV0pIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKGBJbnZhbGlkIHByb3AgJHtwcm9wTmFtZX0gcGFzc2VkIHRvICR7Y29tcG9uZW50TmFtZX0gLSBkbyBub3Qgc2V0IHRoaXMsIHNldCBpdCBvbiB0aGUgY2hpbGQuYCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi91dGlscy9zaGltcy5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbnZhciBlbXB0eUZ1bmN0aW9uID0gZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9O1xuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpO1xuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzRfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmVhY3QtZG9tXCIsXCJjb21tb25qczJcIjpcInJlYWN0LWRvbVwiLFwiYW1kXCI6XCJyZWFjdC1kb21cIixcInJvb3RcIjpcIlJlYWN0RE9NXCJ9XG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEBmbG93XG5pbXBvcnQge2ZpbmRJbkFycmF5LCBpc0Z1bmN0aW9uLCBpbnR9IGZyb20gJy4vc2hpbXMnO1xuaW1wb3J0IGJyb3dzZXJQcmVmaXgsIHticm93c2VyUHJlZml4VG9LZXl9IGZyb20gJy4vZ2V0UHJlZml4JztcblxuaW1wb3J0IHR5cGUge0NvbnRyb2xQb3NpdGlvbiwgTW91c2VUb3VjaEV2ZW50fSBmcm9tICcuL3R5cGVzJztcblxubGV0IG1hdGNoZXNTZWxlY3RvckZ1bmMgPSAnJztcbmV4cG9ydCBmdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3IoZWw6IE5vZGUsIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgaWYgKCFtYXRjaGVzU2VsZWN0b3JGdW5jKSB7XG4gICAgbWF0Y2hlc1NlbGVjdG9yRnVuYyA9IGZpbmRJbkFycmF5KFtcbiAgICAgICdtYXRjaGVzJyxcbiAgICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLFxuICAgICAgJ21vek1hdGNoZXNTZWxlY3RvcicsXG4gICAgICAnbXNNYXRjaGVzU2VsZWN0b3InLFxuICAgICAgJ29NYXRjaGVzU2VsZWN0b3InXG4gICAgXSwgZnVuY3Rpb24obWV0aG9kKXtcbiAgICAgIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcbiAgICAgIHJldHVybiBpc0Z1bmN0aW9uKGVsW21ldGhvZF0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gJEZsb3dJZ25vcmU6IERvZXNuJ3QgdGhpbmsgZWxlbWVudHMgYXJlIGluZGV4YWJsZVxuICByZXR1cm4gZWxbbWF0Y2hlc1NlbGVjdG9yRnVuY10uY2FsbChlbCwgc2VsZWN0b3IpO1xufVxuXG4vLyBXb3JrcyB1cCB0aGUgdHJlZSB0byB0aGUgZHJhZ2dhYmxlIGl0c2VsZiBhdHRlbXB0aW5nIHRvIG1hdGNoIHNlbGVjdG9yLlxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvckFuZFBhcmVudHNUbyhlbDogTm9kZSwgc2VsZWN0b3I6IHN0cmluZywgYmFzZU5vZGU6IE5vZGUpOiBib29sZWFuIHtcbiAgbGV0IG5vZGUgPSBlbDtcbiAgZG8ge1xuICAgIGlmIChtYXRjaGVzU2VsZWN0b3Iobm9kZSwgc2VsZWN0b3IpKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAobm9kZSA9PT0gYmFzZU5vZGUpIHJldHVybiBmYWxzZTtcbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9IHdoaWxlIChub2RlKTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRFdmVudChlbDogP05vZGUsIGV2ZW50OiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogdm9pZCB7XG4gIGlmICghZWwpIHsgcmV0dXJuOyB9XG4gIGlmIChlbC5hdHRhY2hFdmVudCkge1xuICAgIGVsLmF0dGFjaEV2ZW50KCdvbicgKyBldmVudCwgaGFuZGxlcik7XG4gIH0gZWxzZSBpZiAoZWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcbiAgICBlbFsnb24nICsgZXZlbnRdID0gaGFuZGxlcjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZWw6ID9Ob2RlLCBldmVudDogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IHZvaWQge1xuICBpZiAoIWVsKSB7IHJldHVybjsgfVxuICBpZiAoZWwuZGV0YWNoRXZlbnQpIHtcbiAgICBlbC5kZXRhY2hFdmVudCgnb24nICsgZXZlbnQsIGhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICAvLyAkRmxvd0lnbm9yZTogRG9lc24ndCB0aGluayBlbGVtZW50cyBhcmUgaW5kZXhhYmxlXG4gICAgZWxbJ29uJyArIGV2ZW50XSA9IG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG91dGVySGVpZ2h0KG5vZGU6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgLy8gVGhpcyBpcyBkZWxpYmVyYXRlbHkgZXhjbHVkaW5nIG1hcmdpbiBmb3Igb3VyIGNhbGN1bGF0aW9ucywgc2luY2Ugd2UgYXJlIHVzaW5nXG4gIC8vIG9mZnNldFRvcCB3aGljaCBpcyBpbmNsdWRpbmcgbWFyZ2luLiBTZWUgZ2V0Qm91bmRQb3NpdGlvblxuICBsZXQgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgaGVpZ2h0ICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlclRvcFdpZHRoKTtcbiAgaGVpZ2h0ICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlckJvdHRvbVdpZHRoKTtcbiAgcmV0dXJuIGhlaWdodDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG91dGVyV2lkdGgobm9kZTogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAvLyBUaGlzIGlzIGRlbGliZXJhdGVseSBleGNsdWRpbmcgbWFyZ2luIGZvciBvdXIgY2FsY3VsYXRpb25zLCBzaW5jZSB3ZSBhcmUgdXNpbmdcbiAgLy8gb2Zmc2V0TGVmdCB3aGljaCBpcyBpbmNsdWRpbmcgbWFyZ2luLiBTZWUgZ2V0Qm91bmRQb3NpdGlvblxuICBsZXQgd2lkdGggPSBub2RlLmNsaWVudFdpZHRoO1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIHdpZHRoICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlckxlZnRXaWR0aCk7XG4gIHdpZHRoICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlclJpZ2h0V2lkdGgpO1xuICByZXR1cm4gd2lkdGg7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5uZXJIZWlnaHQobm9kZTogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICBsZXQgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgaGVpZ2h0IC09IGludChjb21wdXRlZFN0eWxlLnBhZGRpbmdUb3ApO1xuICBoZWlnaHQgLT0gaW50KGNvbXB1dGVkU3R5bGUucGFkZGluZ0JvdHRvbSk7XG4gIHJldHVybiBoZWlnaHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbm5lcldpZHRoKG5vZGU6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgbGV0IHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICB3aWR0aCAtPSBpbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nTGVmdCk7XG4gIHdpZHRoIC09IGludChjb21wdXRlZFN0eWxlLnBhZGRpbmdSaWdodCk7XG4gIHJldHVybiB3aWR0aDtcbn1cblxuLy8gR2V0IGZyb20gb2Zmc2V0UGFyZW50XG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0WFlGcm9tUGFyZW50KGV2dDoge2NsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyfSwgb2Zmc2V0UGFyZW50OiBIVE1MRWxlbWVudCk6IENvbnRyb2xQb3NpdGlvbiB7XG4gIGNvbnN0IGlzQm9keSA9IG9mZnNldFBhcmVudCA9PT0gb2Zmc2V0UGFyZW50Lm93bmVyRG9jdW1lbnQuYm9keTtcbiAgY29uc3Qgb2Zmc2V0UGFyZW50UmVjdCA9IGlzQm9keSA/IHtsZWZ0OiAwLCB0b3A6IDB9IDogb2Zmc2V0UGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIGNvbnN0IHggPSBldnQuY2xpZW50WCArIG9mZnNldFBhcmVudC5zY3JvbGxMZWZ0IC0gb2Zmc2V0UGFyZW50UmVjdC5sZWZ0O1xuICBjb25zdCB5ID0gZXZ0LmNsaWVudFkgKyBvZmZzZXRQYXJlbnQuc2Nyb2xsVG9wIC0gb2Zmc2V0UGFyZW50UmVjdC50b3A7XG5cbiAgcmV0dXJuIHt4LCB5fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNTU1RyYW5zZm9ybSh7eCwgeX06IHt4OiBudW1iZXIsIHk6IG51bWJlcn0pOiBPYmplY3Qge1xuICAvLyBSZXBsYWNlIHVuaXRsZXNzIGl0ZW1zIHdpdGggcHhcbiAgcmV0dXJuIHtbYnJvd3NlclByZWZpeFRvS2V5KCd0cmFuc2Zvcm0nLCBicm93c2VyUHJlZml4KV06ICd0cmFuc2xhdGUoJyArIHggKyAncHgsJyArIHkgKyAncHgpJ307XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTVkdUcmFuc2Zvcm0oe3gsIHl9OiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9KTogc3RyaW5nIHtcbiAgcmV0dXJuICd0cmFuc2xhdGUoJyArIHggKyAnLCcgKyB5ICsgJyknO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG91Y2goZTogTW91c2VUb3VjaEV2ZW50LCBpZGVudGlmaWVyOiBudW1iZXIpOiA/e2NsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyfSB7XG4gIHJldHVybiAoZS50YXJnZXRUb3VjaGVzICYmIGZpbmRJbkFycmF5KGUudGFyZ2V0VG91Y2hlcywgdCA9PiBpZGVudGlmaWVyID09PSB0LmlkZW50aWZpZXIpKSB8fFxuICAgICAgICAgKGUuY2hhbmdlZFRvdWNoZXMgJiYgZmluZEluQXJyYXkoZS5jaGFuZ2VkVG91Y2hlcywgdCA9PiBpZGVudGlmaWVyID09PSB0LmlkZW50aWZpZXIpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdWNoSWRlbnRpZmllcihlOiBNb3VzZVRvdWNoRXZlbnQpOiA/bnVtYmVyIHtcbiAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0pIHJldHVybiBlLnRhcmdldFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcbiAgaWYgKGUuY2hhbmdlZFRvdWNoZXMgJiYgZS5jaGFuZ2VkVG91Y2hlc1swXSkgcmV0dXJuIGUuY2hhbmdlZFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcbn1cblxuLy8gVXNlci1zZWxlY3QgSGFja3M6XG4vL1xuLy8gVXNlZnVsIGZvciBwcmV2ZW50aW5nIGJsdWUgaGlnaGxpZ2h0cyBhbGwgb3ZlciBldmVyeXRoaW5nIHdoZW4gZHJhZ2dpbmcuXG5cbi8vIE5vdGUgd2UncmUgcGFzc2luZyBgZG9jdW1lbnRgIGIvYyB3ZSBjb3VsZCBiZSBpZnJhbWVkXG5leHBvcnQgZnVuY3Rpb24gYWRkVXNlclNlbGVjdFN0eWxlcyhkb2M6IERvY3VtZW50KSB7XG4gIGxldCBzdHlsZUVsID0gZG9jLmdldEVsZW1lbnRCeUlkKCdyZWFjdC1kcmFnZ2FibGUtc3R5bGUtZWwnKTtcbiAgaWYgKCFzdHlsZUVsKSB7XG4gICAgc3R5bGVFbCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlRWwudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgc3R5bGVFbC5pZCA9ICdyZWFjdC1kcmFnZ2FibGUtc3R5bGUtZWwnO1xuICAgIHN0eWxlRWwuaW5uZXJIVE1MID0gJy5yZWFjdC1kcmFnZ2FibGUtdHJhbnNwYXJlbnQtc2VsZWN0aW9uICo6Oi1tb3otc2VsZWN0aW9uIHtiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDt9XFxuJztcbiAgICBzdHlsZUVsLmlubmVySFRNTCArPSAnLnJlYWN0LWRyYWdnYWJsZS10cmFuc3BhcmVudC1zZWxlY3Rpb24gKjo6c2VsZWN0aW9uIHtiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDt9XFxuJztcbiAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZUVsKTtcbiAgfVxuICBpZiAoZG9jLmJvZHkpIGFkZENsYXNzTmFtZShkb2MuYm9keSwgJ3JlYWN0LWRyYWdnYWJsZS10cmFuc3BhcmVudC1zZWxlY3Rpb24nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVVzZXJTZWxlY3RTdHlsZXMoZG9jOiBEb2N1bWVudCkge1xuICBpZiAoZG9jLmJvZHkpIHJlbW92ZUNsYXNzTmFtZShkb2MuYm9keSwgJ3JlYWN0LWRyYWdnYWJsZS10cmFuc3BhcmVudC1zZWxlY3Rpb24nKTtcbiAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpOyAgLy8gcmVtb3ZlIHNlbGVjdGlvbiBjYXVzZWQgYnkgc2Nyb2xsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZUhhY2tzKGNoaWxkU3R5bGU6IE9iamVjdCA9IHt9KTogT2JqZWN0IHtcbiAgLy8gV29ya2Fyb3VuZCBJRSBwb2ludGVyIGV2ZW50czsgc2VlICM1MVxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9yZWFjdC1kcmFnZ2FibGUvaXNzdWVzLzUxI2lzc3VlY29tbWVudC0xMDM0ODgyNzhcbiAgcmV0dXJuIHtcbiAgICB0b3VjaEFjdGlvbjogJ25vbmUnLFxuICAgIC4uLmNoaWxkU3R5bGVcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZENsYXNzTmFtZShlbDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFlbC5jbGFzc05hbWUubWF0Y2gobmV3IFJlZ0V4cChgKD86XnxcXFxccykke2NsYXNzTmFtZX0oPyFcXFxcUylgKSkpIHtcbiAgICAgIGVsLmNsYXNzTmFtZSArPSBgICR7Y2xhc3NOYW1lfWA7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDbGFzc05hbWUoZWw6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZykge1xuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoYCg/Ol58XFxcXHMpJHtjbGFzc05hbWV9KD8hXFxcXFMpYCwgJ2cnKSwgJycpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdXRpbHMvZG9tRm5zLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImFtZFwiOlwicmVhY3RcIixcInJvb3RcIjpcIlJlYWN0XCJ9XG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIFN5bWJvbC5mb3IgJiZcbiAgICBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG4gICAgMHhlYWM3O1xuXG4gIHZhciBpc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0ICE9PSBudWxsICYmXG4gICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9lbXB0eUZ1bmN0aW9uJyk7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQuaW5kZXhPZignRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJykgPT09IDApIHtcbiAgICAgIHJldHVybjsgLy8gSWdub3JlIENvbXBvc2l0ZUNvbXBvbmVudCBwcm9wdHlwZSBjaGVjay5cbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ZianMvbGliL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQGZsb3dcbmltcG9ydCB7aXNOdW0sIGludH0gZnJvbSAnLi9zaGltcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7Z2V0VG91Y2gsIGlubmVyV2lkdGgsIGlubmVySGVpZ2h0LCBvZmZzZXRYWUZyb21QYXJlbnQsIG91dGVyV2lkdGgsIG91dGVySGVpZ2h0fSBmcm9tICcuL2RvbUZucyc7XG5cbmltcG9ydCB0eXBlIERyYWdnYWJsZSBmcm9tICcuLi9EcmFnZ2FibGUnO1xuaW1wb3J0IHR5cGUge0JvdW5kcywgQ29udHJvbFBvc2l0aW9uLCBEcmFnZ2FibGVEYXRhLCBNb3VzZVRvdWNoRXZlbnR9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHR5cGUgRHJhZ2dhYmxlQ29yZSBmcm9tICcuLi9EcmFnZ2FibGVDb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJvdW5kUG9zaXRpb24oZHJhZ2dhYmxlOiBEcmFnZ2FibGUsIHg6IG51bWJlciwgeTogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB7XG4gIC8vIElmIG5vIGJvdW5kcywgc2hvcnQtY2lyY3VpdCBhbmQgbW92ZSBvblxuICBpZiAoIWRyYWdnYWJsZS5wcm9wcy5ib3VuZHMpIHJldHVybiBbeCwgeV07XG5cbiAgLy8gQ2xvbmUgbmV3IGJvdW5kc1xuICBsZXQge2JvdW5kc30gPSBkcmFnZ2FibGUucHJvcHM7XG4gIGJvdW5kcyA9IHR5cGVvZiBib3VuZHMgPT09ICdzdHJpbmcnID8gYm91bmRzIDogY2xvbmVCb3VuZHMoYm91bmRzKTtcbiAgY29uc3Qgbm9kZSA9IGZpbmRET01Ob2RlKGRyYWdnYWJsZSk7XG5cbiAgaWYgKHR5cGVvZiBib3VuZHMgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3Qge293bmVyRG9jdW1lbnR9ID0gbm9kZTtcbiAgICBjb25zdCBvd25lcldpbmRvdyA9IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gICAgbGV0IGJvdW5kTm9kZTtcbiAgICBpZiAoYm91bmRzID09PSAncGFyZW50Jykge1xuICAgICAgYm91bmROb2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBib3VuZE5vZGUgPSBvd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYm91bmRzKTtcbiAgICB9XG4gICAgaWYgKCEoYm91bmROb2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvdW5kcyBzZWxlY3RvciBcIicgKyBib3VuZHMgKyAnXCIgY291bGQgbm90IGZpbmQgYW4gZWxlbWVudC4nKTtcbiAgICB9XG4gICAgY29uc3Qgbm9kZVN0eWxlID0gb3duZXJXaW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBjb25zdCBib3VuZE5vZGVTdHlsZSA9IG93bmVyV2luZG93LmdldENvbXB1dGVkU3R5bGUoYm91bmROb2RlKTtcbiAgICAvLyBDb21wdXRlIGJvdW5kcy4gVGhpcyBpcyBhIHBhaW4gd2l0aCBwYWRkaW5nIGFuZCBvZmZzZXRzIGJ1dCB0aGlzIGdldHMgaXQgZXhhY3RseSByaWdodC5cbiAgICBib3VuZHMgPSB7XG4gICAgICBsZWZ0OiAtbm9kZS5vZmZzZXRMZWZ0ICsgaW50KGJvdW5kTm9kZVN0eWxlLnBhZGRpbmdMZWZ0KSArIGludChub2RlU3R5bGUubWFyZ2luTGVmdCksXG4gICAgICB0b3A6IC1ub2RlLm9mZnNldFRvcCArIGludChib3VuZE5vZGVTdHlsZS5wYWRkaW5nVG9wKSArIGludChub2RlU3R5bGUubWFyZ2luVG9wKSxcbiAgICAgIHJpZ2h0OiBpbm5lcldpZHRoKGJvdW5kTm9kZSkgLSBvdXRlcldpZHRoKG5vZGUpIC0gbm9kZS5vZmZzZXRMZWZ0ICtcbiAgICAgICAgaW50KGJvdW5kTm9kZVN0eWxlLnBhZGRpbmdSaWdodCkgLSBpbnQobm9kZVN0eWxlLm1hcmdpblJpZ2h0KSxcbiAgICAgIGJvdHRvbTogaW5uZXJIZWlnaHQoYm91bmROb2RlKSAtIG91dGVySGVpZ2h0KG5vZGUpIC0gbm9kZS5vZmZzZXRUb3AgK1xuICAgICAgICBpbnQoYm91bmROb2RlU3R5bGUucGFkZGluZ0JvdHRvbSkgLSBpbnQobm9kZVN0eWxlLm1hcmdpbkJvdHRvbSlcbiAgICB9O1xuICB9XG5cbiAgLy8gS2VlcCB4IGFuZCB5IGJlbG93IHJpZ2h0IGFuZCBib3R0b20gbGltaXRzLi4uXG4gIGlmIChpc051bShib3VuZHMucmlnaHQpKSB4ID0gTWF0aC5taW4oeCwgYm91bmRzLnJpZ2h0KTtcbiAgaWYgKGlzTnVtKGJvdW5kcy5ib3R0b20pKSB5ID0gTWF0aC5taW4oeSwgYm91bmRzLmJvdHRvbSk7XG5cbiAgLy8gQnV0IGFib3ZlIGxlZnQgYW5kIHRvcCBsaW1pdHMuXG4gIGlmIChpc051bShib3VuZHMubGVmdCkpIHggPSBNYXRoLm1heCh4LCBib3VuZHMubGVmdCk7XG4gIGlmIChpc051bShib3VuZHMudG9wKSkgeSA9IE1hdGgubWF4KHksIGJvdW5kcy50b3ApO1xuXG4gIHJldHVybiBbeCwgeV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbmFwVG9HcmlkKGdyaWQ6IFtudW1iZXIsIG51bWJlcl0sIHBlbmRpbmdYOiBudW1iZXIsIHBlbmRpbmdZOiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgY29uc3QgeCA9IE1hdGgucm91bmQocGVuZGluZ1ggLyBncmlkWzBdKSAqIGdyaWRbMF07XG4gIGNvbnN0IHkgPSBNYXRoLnJvdW5kKHBlbmRpbmdZIC8gZ3JpZFsxXSkgKiBncmlkWzFdO1xuICByZXR1cm4gW3gsIHldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FuRHJhZ1goZHJhZ2dhYmxlOiBEcmFnZ2FibGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAnYm90aCcgfHwgZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICd4Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbkRyYWdZKGRyYWdnYWJsZTogRHJhZ2dhYmxlKTogYm9vbGVhbiB7XG4gIHJldHVybiBkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ2JvdGgnIHx8IGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAneSc7XG59XG5cbi8vIEdldCB7eCwgeX0gcG9zaXRpb25zIGZyb20gZXZlbnQuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udHJvbFBvc2l0aW9uKGU6IE1vdXNlVG91Y2hFdmVudCwgdG91Y2hJZGVudGlmaWVyOiA/bnVtYmVyLCBkcmFnZ2FibGVDb3JlOiBEcmFnZ2FibGVDb3JlKTogP0NvbnRyb2xQb3NpdGlvbiB7XG4gIGNvbnN0IHRvdWNoT2JqID0gdHlwZW9mIHRvdWNoSWRlbnRpZmllciA9PT0gJ251bWJlcicgPyBnZXRUb3VjaChlLCB0b3VjaElkZW50aWZpZXIpIDogbnVsbDtcbiAgaWYgKHR5cGVvZiB0b3VjaElkZW50aWZpZXIgPT09ICdudW1iZXInICYmICF0b3VjaE9iaikgcmV0dXJuIG51bGw7IC8vIG5vdCB0aGUgcmlnaHQgdG91Y2hcbiAgY29uc3Qgbm9kZSA9IGZpbmRET01Ob2RlKGRyYWdnYWJsZUNvcmUpO1xuICAvLyBVc2VyIGNhbiBwcm92aWRlIGFuIG9mZnNldFBhcmVudCBpZiBkZXNpcmVkLlxuICBjb25zdCBvZmZzZXRQYXJlbnQgPSBkcmFnZ2FibGVDb3JlLnByb3BzLm9mZnNldFBhcmVudCB8fCBub2RlLm9mZnNldFBhcmVudCB8fCBub2RlLm93bmVyRG9jdW1lbnQuYm9keTtcbiAgcmV0dXJuIG9mZnNldFhZRnJvbVBhcmVudCh0b3VjaE9iaiB8fCBlLCBvZmZzZXRQYXJlbnQpO1xufVxuXG4vLyBDcmVhdGUgYW4gZGF0YSBvYmplY3QgZXhwb3NlZCBieSA8RHJhZ2dhYmxlQ29yZT4ncyBldmVudHNcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb3JlRGF0YShkcmFnZ2FibGU6IERyYWdnYWJsZUNvcmUsIHg6IG51bWJlciwgeTogbnVtYmVyKTogRHJhZ2dhYmxlRGF0YSB7XG4gIGNvbnN0IHN0YXRlID0gZHJhZ2dhYmxlLnN0YXRlO1xuICBjb25zdCBpc1N0YXJ0ID0gIWlzTnVtKHN0YXRlLmxhc3RYKTtcbiAgY29uc3Qgbm9kZSA9IGZpbmRET01Ob2RlKGRyYWdnYWJsZSk7XG5cbiAgaWYgKGlzU3RhcnQpIHtcbiAgICAvLyBJZiB0aGlzIGlzIG91ciBmaXJzdCBtb3ZlLCB1c2UgdGhlIHggYW5kIHkgYXMgbGFzdCBjb29yZHMuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5vZGUsXG4gICAgICBkZWx0YVg6IDAsIGRlbHRhWTogMCxcbiAgICAgIGxhc3RYOiB4LCBsYXN0WTogeSxcbiAgICAgIHgsIHksXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBPdGhlcndpc2UgY2FsY3VsYXRlIHByb3BlciB2YWx1ZXMuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5vZGUsXG4gICAgICBkZWx0YVg6IHggLSBzdGF0ZS5sYXN0WCwgZGVsdGFZOiB5IC0gc3RhdGUubGFzdFksXG4gICAgICBsYXN0WDogc3RhdGUubGFzdFgsIGxhc3RZOiBzdGF0ZS5sYXN0WSxcbiAgICAgIHgsIHksXG4gICAgfTtcbiAgfVxufVxuXG4vLyBDcmVhdGUgYW4gZGF0YSBleHBvc2VkIGJ5IDxEcmFnZ2FibGU+J3MgZXZlbnRzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRHJhZ2dhYmxlRGF0YShkcmFnZ2FibGU6IERyYWdnYWJsZSwgY29yZURhdGE6IERyYWdnYWJsZURhdGEpOiBEcmFnZ2FibGVEYXRhIHtcbiAgcmV0dXJuIHtcbiAgICBub2RlOiBjb3JlRGF0YS5ub2RlLFxuICAgIHg6IGRyYWdnYWJsZS5zdGF0ZS54ICsgY29yZURhdGEuZGVsdGFYLFxuICAgIHk6IGRyYWdnYWJsZS5zdGF0ZS55ICsgY29yZURhdGEuZGVsdGFZLFxuICAgIGRlbHRhWDogY29yZURhdGEuZGVsdGFYLFxuICAgIGRlbHRhWTogY29yZURhdGEuZGVsdGFZLFxuICAgIGxhc3RYOiBkcmFnZ2FibGUuc3RhdGUueCxcbiAgICBsYXN0WTogZHJhZ2dhYmxlLnN0YXRlLnlcbiAgfTtcbn1cblxuLy8gQSBsb3QgZmFzdGVyIHRoYW4gc3RyaW5naWZ5L3BhcnNlXG5mdW5jdGlvbiBjbG9uZUJvdW5kcyhib3VuZHM6IEJvdW5kcyk6IEJvdW5kcyB7XG4gIHJldHVybiB7XG4gICAgbGVmdDogYm91bmRzLmxlZnQsXG4gICAgdG9wOiBib3VuZHMudG9wLFxuICAgIHJpZ2h0OiBib3VuZHMucmlnaHQsXG4gICAgYm90dG9tOiBib3VuZHMuYm90dG9tXG4gIH07XG59XG5cbmZ1bmN0aW9uIGZpbmRET01Ob2RlKGRyYWdnYWJsZTogRHJhZ2dhYmxlIHwgRHJhZ2dhYmxlQ29yZSk6IEhUTUxFbGVtZW50IHtcbiAgY29uc3Qgbm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGRyYWdnYWJsZSk7XG4gIGlmICghbm9kZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignPERyYWdnYWJsZUNvcmU+OiBVbm1vdW50ZWQgZHVyaW5nIGV2ZW50IScpO1xuICB9XG4gIC8vICRGbG93SWdub3JlIHdlIGNhbid0IGFzc2VydCBvbiBIVE1MRWxlbWVudCBkdWUgdG8gdGVzdHMuLi4gRklYTUVcbiAgcmV0dXJuIG5vZGU7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdXRpbHMvcG9zaXRpb25GbnMuanMiLCIvLyBAZmxvd1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7bWF0Y2hlc1NlbGVjdG9yQW5kUGFyZW50c1RvLCBhZGRFdmVudCwgcmVtb3ZlRXZlbnQsIGFkZFVzZXJTZWxlY3RTdHlsZXMsIGdldFRvdWNoSWRlbnRpZmllcixcbiAgICAgICAgcmVtb3ZlVXNlclNlbGVjdFN0eWxlcywgc3R5bGVIYWNrc30gZnJvbSAnLi91dGlscy9kb21GbnMnO1xuaW1wb3J0IHtjcmVhdGVDb3JlRGF0YSwgZ2V0Q29udHJvbFBvc2l0aW9uLCBzbmFwVG9HcmlkfSBmcm9tICcuL3V0aWxzL3Bvc2l0aW9uRm5zJztcbmltcG9ydCB7ZG9udFNldE1lfSBmcm9tICcuL3V0aWxzL3NoaW1zJztcbmltcG9ydCBsb2cgZnJvbSAnLi91dGlscy9sb2cnO1xuXG5pbXBvcnQgdHlwZSB7RXZlbnRIYW5kbGVyLCBNb3VzZVRvdWNoRXZlbnR9IGZyb20gJy4vdXRpbHMvdHlwZXMnO1xuaW1wb3J0IHR5cGUge0VsZW1lbnQgYXMgUmVhY3RFbGVtZW50fSBmcm9tICdyZWFjdCc7XG5cbi8vIFNpbXBsZSBhYnN0cmFjdGlvbiBmb3IgZHJhZ2dpbmcgZXZlbnRzIG5hbWVzLlxuY29uc3QgZXZlbnRzRm9yID0ge1xuICB0b3VjaDoge1xuICAgIHN0YXJ0OiAndG91Y2hzdGFydCcsXG4gICAgbW92ZTogJ3RvdWNobW92ZScsXG4gICAgc3RvcDogJ3RvdWNoZW5kJ1xuICB9LFxuICBtb3VzZToge1xuICAgIHN0YXJ0OiAnbW91c2Vkb3duJyxcbiAgICBtb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICBzdG9wOiAnbW91c2V1cCdcbiAgfVxufTtcblxuLy8gRGVmYXVsdCB0byBtb3VzZSBldmVudHMuXG5sZXQgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLm1vdXNlO1xuXG50eXBlIERyYWdnYWJsZUNvcmVTdGF0ZSA9IHtcbiAgZHJhZ2dpbmc6IGJvb2xlYW4sXG4gIGxhc3RYOiBudW1iZXIsXG4gIGxhc3RZOiBudW1iZXIsXG4gIHRvdWNoSWRlbnRpZmllcjogP251bWJlclxufTtcblxuZXhwb3J0IHR5cGUgRHJhZ2dhYmxlQm91bmRzID0ge1xuICBsZWZ0OiBudW1iZXIsXG4gIHJpZ2h0OiBudW1iZXIsXG4gIHRvcDogbnVtYmVyLFxuICBib3R0b206IG51bWJlcixcbn07XG5cbmV4cG9ydCB0eXBlIERyYWdnYWJsZURhdGEgPSB7XG4gIG5vZGU6IEhUTUxFbGVtZW50LFxuICB4OiBudW1iZXIsIHk6IG51bWJlcixcbiAgZGVsdGFYOiBudW1iZXIsIGRlbHRhWTogbnVtYmVyLFxuICBsYXN0WDogbnVtYmVyLCBsYXN0WTogbnVtYmVyLFxufTtcblxuZXhwb3J0IHR5cGUgRHJhZ2dhYmxlRXZlbnRIYW5kbGVyID0gKGU6IE1vdXNlRXZlbnQsIGRhdGE6IERyYWdnYWJsZURhdGEpID0+IHZvaWQ7XG5cbmV4cG9ydCB0eXBlIENvbnRyb2xQb3NpdGlvbiA9IHt4OiBudW1iZXIsIHk6IG51bWJlcn07XG5cbmV4cG9ydCB0eXBlIERyYWdnYWJsZUNvcmVQcm9wcyA9IHtcbiAgYWxsb3dBbnlDbGljazogYm9vbGVhbixcbiAgY2FuY2VsOiBzdHJpbmcsXG4gIGNoaWxkcmVuOiBSZWFjdEVsZW1lbnQ8YW55PixcbiAgZGlzYWJsZWQ6IGJvb2xlYW4sXG4gIGVuYWJsZVVzZXJTZWxlY3RIYWNrOiBib29sZWFuLFxuICBvZmZzZXRQYXJlbnQ6IEhUTUxFbGVtZW50LFxuICBncmlkOiBbbnVtYmVyLCBudW1iZXJdLFxuICBoYW5kbGU6IHN0cmluZyxcbiAgb25TdGFydDogRHJhZ2dhYmxlRXZlbnRIYW5kbGVyLFxuICBvbkRyYWc6IERyYWdnYWJsZUV2ZW50SGFuZGxlcixcbiAgb25TdG9wOiBEcmFnZ2FibGVFdmVudEhhbmRsZXIsXG4gIG9uTW91c2VEb3duOiAoZTogTW91c2VFdmVudCkgPT4gdm9pZCxcbn07XG5cbi8vXG4vLyBEZWZpbmUgPERyYWdnYWJsZUNvcmU+LlxuLy9cbi8vIDxEcmFnZ2FibGVDb3JlPiBpcyBmb3IgYWR2YW5jZWQgdXNhZ2Ugb2YgPERyYWdnYWJsZT4uIEl0IG1haW50YWlucyBtaW5pbWFsIGludGVybmFsIHN0YXRlIHNvIGl0IGNhblxuLy8gd29yayB3ZWxsIHdpdGggbGlicmFyaWVzIHRoYXQgcmVxdWlyZSBtb3JlIGNvbnRyb2wgb3ZlciB0aGUgZWxlbWVudC5cbi8vXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdnYWJsZUNvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8RHJhZ2dhYmxlQ29yZVByb3BzLCBEcmFnZ2FibGVDb3JlU3RhdGU+IHtcblxuICBzdGF0aWMgZGlzcGxheU5hbWUgPSAnRHJhZ2dhYmxlQ29yZSc7XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAvKipcbiAgICAgKiBgYWxsb3dBbnlDbGlja2AgYWxsb3dzIGRyYWdnaW5nIHVzaW5nIGFueSBtb3VzZSBidXR0b24uXG4gICAgICogQnkgZGVmYXVsdCwgd2Ugb25seSBhY2NlcHQgdGhlIGxlZnQgYnV0dG9uLlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gYGZhbHNlYC5cbiAgICAgKi9cbiAgICBhbGxvd0FueUNsaWNrOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8qKlxuICAgICAqIGBkaXNhYmxlZGAsIGlmIHRydWUsIHN0b3BzIHRoZSA8RHJhZ2dhYmxlPiBmcm9tIGRyYWdnaW5nLiBBbGwgaGFuZGxlcnMsXG4gICAgICogd2l0aCB0aGUgZXhjZXB0aW9uIG9mIGBvbk1vdXNlRG93bmAsIHdpbGwgbm90IGZpcmUuXG4gICAgICovXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLyoqXG4gICAgICogQnkgZGVmYXVsdCwgd2UgYWRkICd1c2VyLXNlbGVjdDpub25lJyBhdHRyaWJ1dGVzIHRvIHRoZSBkb2N1bWVudCBib2R5XG4gICAgICogdG8gcHJldmVudCB1Z2x5IHRleHQgc2VsZWN0aW9uIGR1cmluZyBkcmFnLiBJZiB0aGlzIGlzIGNhdXNpbmcgcHJvYmxlbXNcbiAgICAgKiBmb3IgeW91ciBhcHAsIHNldCB0aGlzIHRvIGBmYWxzZWAuXG4gICAgICovXG4gICAgZW5hYmxlVXNlclNlbGVjdEhhY2s6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLyoqXG4gICAgICogYG9mZnNldFBhcmVudGAsIGlmIHNldCwgdXNlcyB0aGUgcGFzc2VkIERPTSBub2RlIHRvIGNvbXB1dGUgZHJhZyBvZmZzZXRzXG4gICAgICogaW5zdGVhZCBvZiB1c2luZyB0aGUgcGFyZW50IG5vZGUuXG4gICAgICovXG4gICAgb2Zmc2V0UGFyZW50OiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUpIHtcbiAgICAgIGlmIChwcm9jZXNzLmJyb3dzZXIgJiYgcHJvcHNbcHJvcE5hbWVdICYmIHByb3BzW3Byb3BOYW1lXS5ub2RlVHlwZSAhPT0gMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RyYWdnYWJsZVxcJ3Mgb2Zmc2V0UGFyZW50IG11c3QgYmUgYSBET00gTm9kZS4nKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYGdyaWRgIHNwZWNpZmllcyB0aGUgeCBhbmQgeSB0aGF0IGRyYWdnaW5nIHNob3VsZCBzbmFwIHRvLlxuICAgICAqL1xuICAgIGdyaWQ6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLFxuXG4gICAgLyoqXG4gICAgICogYGhhbmRsZWAgc3BlY2lmaWVzIGEgc2VsZWN0b3IgdG8gYmUgdXNlZCBhcyB0aGUgaGFuZGxlIHRoYXQgaW5pdGlhdGVzIGRyYWcuXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganN4XG4gICAgICogICBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAqICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgIDxEcmFnZ2FibGUgaGFuZGxlPVwiLmhhbmRsZVwiPlxuICAgICAqICAgICAgICAgICAgICA8ZGl2PlxuICAgICAqICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoYW5kbGVcIj5DbGljayBtZSB0byBkcmFnPC9kaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8ZGl2PlRoaXMgaXMgc29tZSBvdGhlciBjb250ZW50PC9kaXY+XG4gICAgICogICAgICAgICAgICAgIDwvZGl2PlxuICAgICAqICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICk7XG4gICAgICogICAgICAgfVxuICAgICAqICAgfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgaGFuZGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgLyoqXG4gICAgICogYGNhbmNlbGAgc3BlY2lmaWVzIGEgc2VsZWN0b3IgdG8gYmUgdXNlZCB0byBwcmV2ZW50IGRyYWcgaW5pdGlhbGl6YXRpb24uXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganN4XG4gICAgICogICBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAqICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgICByZXR1cm4oXG4gICAgICogICAgICAgICAgICAgICA8RHJhZ2dhYmxlIGNhbmNlbD1cIi5jYW5jZWxcIj5cbiAgICAgKiAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYW5jZWxcIj5Zb3UgY2FuJ3QgZHJhZyBmcm9tIGhlcmU8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgIDxkaXY+RHJhZ2dpbmcgaGVyZSB3b3JrcyBmaW5lPC9kaXY+XG4gICAgICogICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICogICAgICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBjYW5jZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBkcmFnZ2luZyBzdGFydHMuXG4gICAgICogSWYgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBib29sZWFuIGZhbHNlLCBkcmFnZ2luZyB3aWxsIGJlIGNhbmNlbGVkLlxuICAgICAqL1xuICAgIG9uU3RhcnQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoaWxlIGRyYWdnaW5nLlxuICAgICAqIElmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgYm9vbGVhbiBmYWxzZSwgZHJhZ2dpbmcgd2lsbCBiZSBjYW5jZWxlZC5cbiAgICAgKi9cbiAgICBvbkRyYWc6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gZHJhZ2dpbmcgc3RvcHMuXG4gICAgICogSWYgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBib29sZWFuIGZhbHNlLCB0aGUgZHJhZyB3aWxsIHJlbWFpbiBhY3RpdmUuXG4gICAgICovXG4gICAgb25TdG9wOiBQcm9wVHlwZXMuZnVuYyxcblxuICAgIC8qKlxuICAgICAqIEEgd29ya2Fyb3VuZCBvcHRpb24gd2hpY2ggY2FuIGJlIHBhc3NlZCBpZiBvbk1vdXNlRG93biBuZWVkcyB0byBiZSBhY2Nlc3NlZCxcbiAgICAgKiBzaW5jZSBpdCdsbCBhbHdheXMgYmUgYmxvY2tlZCAoYXMgdGhlcmUgaXMgaW50ZXJuYWwgdXNlIG9mIG9uTW91c2VEb3duKVxuICAgICAqL1xuICAgIG9uTW91c2VEb3duOiBQcm9wVHlwZXMuZnVuYyxcblxuICAgIC8qKlxuICAgICAqIFRoZXNlIHByb3BlcnRpZXMgc2hvdWxkIGJlIGRlZmluZWQgb24gdGhlIGNoaWxkLCBub3QgaGVyZS5cbiAgICAgKi9cbiAgICBjbGFzc05hbWU6IGRvbnRTZXRNZSxcbiAgICBzdHlsZTogZG9udFNldE1lLFxuICAgIHRyYW5zZm9ybTogZG9udFNldE1lXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBhbGxvd0FueUNsaWNrOiBmYWxzZSwgLy8gYnkgZGVmYXVsdCBvbmx5IGFjY2VwdCBsZWZ0IGNsaWNrXG4gICAgY2FuY2VsOiBudWxsLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBlbmFibGVVc2VyU2VsZWN0SGFjazogdHJ1ZSxcbiAgICBvZmZzZXRQYXJlbnQ6IG51bGwsXG4gICAgaGFuZGxlOiBudWxsLFxuICAgIGdyaWQ6IG51bGwsXG4gICAgdHJhbnNmb3JtOiBudWxsLFxuICAgIG9uU3RhcnQ6IGZ1bmN0aW9uKCl7fSxcbiAgICBvbkRyYWc6IGZ1bmN0aW9uKCl7fSxcbiAgICBvblN0b3A6IGZ1bmN0aW9uKCl7fSxcbiAgICBvbk1vdXNlRG93bjogZnVuY3Rpb24oKXt9XG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgIC8vIFVzZWQgd2hpbGUgZHJhZ2dpbmcgdG8gZGV0ZXJtaW5lIGRlbHRhcy5cbiAgICBsYXN0WDogTmFOLCBsYXN0WTogTmFOLFxuICAgIHRvdWNoSWRlbnRpZmllcjogbnVsbFxuICB9O1xuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIC8vIFJlbW92ZSBhbnkgbGVmdG92ZXIgZXZlbnQgaGFuZGxlcnMuIFJlbW92ZSBib3RoIHRvdWNoIGFuZCBtb3VzZSBoYW5kbGVycyBpbiBjYXNlXG4gICAgLy8gc29tZSBicm93c2VyIHF1aXJrIGNhdXNlZCBhIHRvdWNoIGV2ZW50IHRvIGZpcmUgZHVyaW5nIGEgbW91c2UgbW92ZSwgb3IgdmljZSB2ZXJzYS5cbiAgICBjb25zdCB0aGlzTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIGlmICh0aGlzTm9kZSkge1xuICAgICAgY29uc3Qge293bmVyRG9jdW1lbnR9ID0gdGhpc05vZGU7XG4gICAgICByZW1vdmVFdmVudChvd25lckRvY3VtZW50LCBldmVudHNGb3IubW91c2UubW92ZSwgdGhpcy5oYW5kbGVEcmFnKTtcbiAgICAgIHJlbW92ZUV2ZW50KG93bmVyRG9jdW1lbnQsIGV2ZW50c0Zvci50b3VjaC5tb3ZlLCB0aGlzLmhhbmRsZURyYWcpO1xuICAgICAgcmVtb3ZlRXZlbnQob3duZXJEb2N1bWVudCwgZXZlbnRzRm9yLm1vdXNlLnN0b3AsIHRoaXMuaGFuZGxlRHJhZ1N0b3ApO1xuICAgICAgcmVtb3ZlRXZlbnQob3duZXJEb2N1bWVudCwgZXZlbnRzRm9yLnRvdWNoLnN0b3AsIHRoaXMuaGFuZGxlRHJhZ1N0b3ApO1xuICAgICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlVXNlclNlbGVjdEhhY2spIHJlbW92ZVVzZXJTZWxlY3RTdHlsZXMob3duZXJEb2N1bWVudCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRHJhZ1N0YXJ0OiBFdmVudEhhbmRsZXI8TW91c2VUb3VjaEV2ZW50PiA9IChlKSA9PiB7XG4gICAgLy8gTWFrZSBpdCBwb3NzaWJsZSB0byBhdHRhY2ggZXZlbnQgaGFuZGxlcnMgb24gdG9wIG9mIHRoaXMgb25lLlxuICAgIHRoaXMucHJvcHMub25Nb3VzZURvd24oZSk7XG5cbiAgICAvLyBPbmx5IGFjY2VwdCBsZWZ0LWNsaWNrcy5cbiAgICBpZiAoIXRoaXMucHJvcHMuYWxsb3dBbnlDbGljayAmJiB0eXBlb2YgZS5idXR0b24gPT09ICdudW1iZXInICYmIGUuYnV0dG9uICE9PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBHZXQgbm9kZXMuIEJlIHN1cmUgdG8gZ3JhYiByZWxhdGl2ZSBkb2N1bWVudCAoY291bGQgYmUgaWZyYW1lZClcbiAgICBjb25zdCB0aGlzTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIGlmICghdGhpc05vZGUgfHwgIXRoaXNOb2RlLm93bmVyRG9jdW1lbnQgfHwgIXRoaXNOb2RlLm93bmVyRG9jdW1lbnQuYm9keSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCc8RHJhZ2dhYmxlQ29yZT4gbm90IG1vdW50ZWQgb24gRHJhZ1N0YXJ0IScpO1xuICAgIH1cbiAgICBjb25zdCB7b3duZXJEb2N1bWVudH0gPSB0aGlzTm9kZTtcblxuICAgIC8vIFNob3J0IGNpcmN1aXQgaWYgaGFuZGxlIG9yIGNhbmNlbCBwcm9wIHdhcyBwcm92aWRlZCBhbmQgc2VsZWN0b3IgZG9lc24ndCBtYXRjaC5cbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fFxuICAgICAgKCEoZS50YXJnZXQgaW5zdGFuY2VvZiBvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3Lk5vZGUpKSB8fFxuICAgICAgKHRoaXMucHJvcHMuaGFuZGxlICYmICFtYXRjaGVzU2VsZWN0b3JBbmRQYXJlbnRzVG8oZS50YXJnZXQsIHRoaXMucHJvcHMuaGFuZGxlLCB0aGlzTm9kZSkpIHx8XG4gICAgICAodGhpcy5wcm9wcy5jYW5jZWwgJiYgbWF0Y2hlc1NlbGVjdG9yQW5kUGFyZW50c1RvKGUudGFyZ2V0LCB0aGlzLnByb3BzLmNhbmNlbCwgdGhpc05vZGUpKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNldCB0b3VjaCBpZGVudGlmaWVyIGluIGNvbXBvbmVudCBzdGF0ZSBpZiB0aGlzIGlzIGEgdG91Y2ggZXZlbnQuIFRoaXMgYWxsb3dzIHVzIHRvXG4gICAgLy8gZGlzdGluZ3Vpc2ggYmV0d2VlbiBpbmRpdmlkdWFsIHRvdWNoZXMgb24gbXVsdGl0b3VjaCBzY3JlZW5zIGJ5IGlkZW50aWZ5aW5nIHdoaWNoXG4gICAgLy8gdG91Y2hwb2ludCB3YXMgc2V0IHRvIHRoaXMgZWxlbWVudC5cbiAgICBjb25zdCB0b3VjaElkZW50aWZpZXIgPSBnZXRUb3VjaElkZW50aWZpZXIoZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dG91Y2hJZGVudGlmaWVyfSk7XG5cbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgZHJhZyBwb2ludCBmcm9tIHRoZSBldmVudC4gVGhpcyBpcyB1c2VkIGFzIHRoZSBvZmZzZXQuXG4gICAgY29uc3QgcG9zaXRpb24gPSBnZXRDb250cm9sUG9zaXRpb24oZSwgdG91Y2hJZGVudGlmaWVyLCB0aGlzKTtcbiAgICBpZiAocG9zaXRpb24gPT0gbnVsbCkgcmV0dXJuOyAvLyBub3QgcG9zc2libGUgYnV0IHNhdGlzZmllcyBmbG93XG4gICAgY29uc3Qge3gsIHl9ID0gcG9zaXRpb247XG5cbiAgICAvLyBDcmVhdGUgYW4gZXZlbnQgb2JqZWN0IHdpdGggYWxsIHRoZSBkYXRhIHBhcmVudHMgbmVlZCB0byBtYWtlIGEgZGVjaXNpb24gaGVyZS5cbiAgICBjb25zdCBjb3JlRXZlbnQgPSBjcmVhdGVDb3JlRGF0YSh0aGlzLCB4LCB5KTtcblxuICAgIGxvZygnRHJhZ2dhYmxlQ29yZTogaGFuZGxlRHJhZ1N0YXJ0OiAlaicsIGNvcmVFdmVudCk7XG5cbiAgICAvLyBDYWxsIGV2ZW50IGhhbmRsZXIuIElmIGl0IHJldHVybnMgZXhwbGljaXQgZmFsc2UsIGNhbmNlbC5cbiAgICBsb2coJ2NhbGxpbmcnLCB0aGlzLnByb3BzLm9uU3RhcnQpO1xuICAgIGNvbnN0IHNob3VsZFVwZGF0ZSA9IHRoaXMucHJvcHMub25TdGFydChlLCBjb3JlRXZlbnQpO1xuICAgIGlmIChzaG91bGRVcGRhdGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAvLyBBZGQgYSBzdHlsZSB0byB0aGUgYm9keSB0byBkaXNhYmxlIHVzZXItc2VsZWN0LiBUaGlzIHByZXZlbnRzIHRleHQgZnJvbVxuICAgIC8vIGJlaW5nIHNlbGVjdGVkIGFsbCBvdmVyIHRoZSBwYWdlLlxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZVVzZXJTZWxlY3RIYWNrKSBhZGRVc2VyU2VsZWN0U3R5bGVzKG93bmVyRG9jdW1lbnQpO1xuXG4gICAgLy8gSW5pdGlhdGUgZHJhZ2dpbmcuIFNldCB0aGUgY3VycmVudCB4IGFuZCB5IGFzIG9mZnNldHNcbiAgICAvLyBzbyB3ZSBrbm93IGhvdyBtdWNoIHdlJ3ZlIG1vdmVkIGR1cmluZyB0aGUgZHJhZy4gVGhpcyBhbGxvd3MgdXNcbiAgICAvLyB0byBkcmFnIGVsZW1lbnRzIGFyb3VuZCBldmVuIGlmIHRoZXkgaGF2ZSBiZWVuIG1vdmVkLCB3aXRob3V0IGlzc3VlLlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJhZ2dpbmc6IHRydWUsXG5cbiAgICAgIGxhc3RYOiB4LFxuICAgICAgbGFzdFk6IHlcbiAgICB9KTtcblxuICAgIC8vIEFkZCBldmVudHMgdG8gdGhlIGRvY3VtZW50IGRpcmVjdGx5IHNvIHdlIGNhdGNoIHdoZW4gdGhlIHVzZXIncyBtb3VzZS90b3VjaCBtb3ZlcyBvdXRzaWRlIG9mXG4gICAgLy8gdGhpcyBlbGVtZW50LiBXZSB1c2UgZGlmZmVyZW50IGV2ZW50cyBkZXBlbmRpbmcgb24gd2hldGhlciBvciBub3Qgd2UgaGF2ZSBkZXRlY3RlZCB0aGF0IHRoaXNcbiAgICAvLyBpcyBhIHRvdWNoLWNhcGFibGUgZGV2aWNlLlxuICAgIGFkZEV2ZW50KG93bmVyRG9jdW1lbnQsIGRyYWdFdmVudEZvci5tb3ZlLCB0aGlzLmhhbmRsZURyYWcpO1xuICAgIC8vIGNyb3NzLW9yaWdpblxuICAgIHRyeSB7XG4gICAgICAvLyB0byBmaXggd2hlbiB1c2luZyBpZnJhbWUgb24gSUUxMS9lZGdlLCBpdCBnZXRzIHN0aWNreSBjbGlja1xuICAgICAgYWRkRXZlbnQob3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy50b3AsIGRyYWdFdmVudEZvci5zdG9wLCB0aGlzLmhhbmRsZURyYWdTdG9wKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGFkZEV2ZW50KG93bmVyRG9jdW1lbnQsIGRyYWdFdmVudEZvci5zdG9wLCB0aGlzLmhhbmRsZURyYWdTdG9wKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRHJhZzogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuXG4gICAgLy8gUHJldmVudCBzY3JvbGxpbmcgb24gbW9iaWxlIGRldmljZXMsIGxpa2UgaXBhZC9pcGhvbmUuXG4gICAgaWYgKGUudHlwZSA9PT0gJ3RvdWNobW92ZScpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIEdldCB0aGUgY3VycmVudCBkcmFnIHBvaW50IGZyb20gdGhlIGV2ZW50LiBUaGlzIGlzIHVzZWQgYXMgdGhlIG9mZnNldC5cbiAgICBjb25zdCBwb3NpdGlvbiA9IGdldENvbnRyb2xQb3NpdGlvbihlLCB0aGlzLnN0YXRlLnRvdWNoSWRlbnRpZmllciwgdGhpcyk7XG4gICAgaWYgKHBvc2l0aW9uID09IG51bGwpIHJldHVybjtcbiAgICBsZXQge3gsIHl9ID0gcG9zaXRpb247XG5cbiAgICAvLyBTbmFwIHRvIGdyaWQgaWYgcHJvcCBoYXMgYmVlbiBwcm92aWRlZFxuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuZ3JpZCkpIHtcbiAgICAgIGxldCBkZWx0YVggPSB4IC0gdGhpcy5zdGF0ZS5sYXN0WCwgZGVsdGFZID0geSAtIHRoaXMuc3RhdGUubGFzdFk7XG4gICAgICBbZGVsdGFYLCBkZWx0YVldID0gc25hcFRvR3JpZCh0aGlzLnByb3BzLmdyaWQsIGRlbHRhWCwgZGVsdGFZKTtcbiAgICAgIGlmICghZGVsdGFYICYmICFkZWx0YVkpIHJldHVybjsgLy8gc2tpcCB1c2VsZXNzIGRyYWdcbiAgICAgIHggPSB0aGlzLnN0YXRlLmxhc3RYICsgZGVsdGFYLCB5ID0gdGhpcy5zdGF0ZS5sYXN0WSArIGRlbHRhWTtcbiAgICB9XG5cbiAgICBjb25zdCBjb3JlRXZlbnQgPSBjcmVhdGVDb3JlRGF0YSh0aGlzLCB4LCB5KTtcblxuICAgIGxvZygnRHJhZ2dhYmxlQ29yZTogaGFuZGxlRHJhZzogJWonLCBjb3JlRXZlbnQpO1xuXG4gICAgLy8gQ2FsbCBldmVudCBoYW5kbGVyLiBJZiBpdCByZXR1cm5zIGV4cGxpY2l0IGZhbHNlLCB0cmlnZ2VyIGVuZC5cbiAgICBjb25zdCBzaG91bGRVcGRhdGUgPSB0aGlzLnByb3BzLm9uRHJhZyhlLCBjb3JlRXZlbnQpO1xuICAgIGlmIChzaG91bGRVcGRhdGUgPT09IGZhbHNlKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyAkRmxvd0lnbm9yZVxuICAgICAgICB0aGlzLmhhbmRsZURyYWdTdG9wKG5ldyBNb3VzZUV2ZW50KCdtb3VzZXVwJykpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIE9sZCBicm93c2Vyc1xuICAgICAgICBjb25zdCBldmVudCA9ICgoZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyk6IGFueSk6IE1vdXNlVG91Y2hFdmVudCk7XG4gICAgICAgIC8vIEkgc2VlIHdoeSB0aGlzIGluc2FuaXR5IHdhcyBkZXByZWNhdGVkXG4gICAgICAgIC8vICRGbG93SWdub3JlXG4gICAgICAgIGV2ZW50LmluaXRNb3VzZUV2ZW50KCdtb3VzZXVwJywgdHJ1ZSwgdHJ1ZSwgd2luZG93LCAwLCAwLCAwLCAwLCAwLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbCk7XG4gICAgICAgIHRoaXMuaGFuZGxlRHJhZ1N0b3AoZXZlbnQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbGFzdFg6IHgsXG4gICAgICBsYXN0WTogeVxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZURyYWdTdG9wOiBFdmVudEhhbmRsZXI8TW91c2VUb3VjaEV2ZW50PiA9IChlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmRyYWdnaW5nKSByZXR1cm47XG5cbiAgICBjb25zdCBwb3NpdGlvbiA9IGdldENvbnRyb2xQb3NpdGlvbihlLCB0aGlzLnN0YXRlLnRvdWNoSWRlbnRpZmllciwgdGhpcyk7XG4gICAgaWYgKHBvc2l0aW9uID09IG51bGwpIHJldHVybjtcbiAgICBjb25zdCB7eCwgeX0gPSBwb3NpdGlvbjtcbiAgICBjb25zdCBjb3JlRXZlbnQgPSBjcmVhdGVDb3JlRGF0YSh0aGlzLCB4LCB5KTtcblxuICAgIGNvbnN0IHRoaXNOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgaWYgKHRoaXNOb2RlKSB7XG4gICAgICAvLyBSZW1vdmUgdXNlci1zZWxlY3QgaGFja1xuICAgICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlVXNlclNlbGVjdEhhY2spIHJlbW92ZVVzZXJTZWxlY3RTdHlsZXModGhpc05vZGUub3duZXJEb2N1bWVudCk7XG4gICAgfVxuXG4gICAgbG9nKCdEcmFnZ2FibGVDb3JlOiBoYW5kbGVEcmFnU3RvcDogJWonLCBjb3JlRXZlbnQpO1xuXG4gICAgLy8gUmVzZXQgdGhlIGVsLlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgbGFzdFg6IE5hTixcbiAgICAgIGxhc3RZOiBOYU5cbiAgICB9KTtcblxuICAgIC8vIENhbGwgZXZlbnQgaGFuZGxlclxuICAgIHRoaXMucHJvcHMub25TdG9wKGUsIGNvcmVFdmVudCk7XG5cbiAgICBpZiAodGhpc05vZGUpIHtcbiAgICAgIC8vIFJlbW92ZSBldmVudCBoYW5kbGVyc1xuICAgICAgbG9nKCdEcmFnZ2FibGVDb3JlOiBSZW1vdmluZyBoYW5kbGVycycpO1xuICAgICAgcmVtb3ZlRXZlbnQodGhpc05vZGUub3duZXJEb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLm1vdmUsIHRoaXMuaGFuZGxlRHJhZyk7XG4gICAgICByZW1vdmVFdmVudCh0aGlzTm9kZS5vd25lckRvY3VtZW50LCBkcmFnRXZlbnRGb3Iuc3RvcCwgdGhpcy5oYW5kbGVEcmFnU3RvcCk7XG4gICAgICByZW1vdmVFdmVudCh0aGlzTm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LnRvcCwgZHJhZ0V2ZW50Rm9yLnN0b3AsIHRoaXMuaGFuZGxlRHJhZ1N0b3ApO1xuICAgIH1cbiAgfTtcblxuICBvbk1vdXNlRG93bjogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci5tb3VzZTsgLy8gb24gdG91Y2hzY3JlZW4gbGFwdG9wcyB3ZSBjb3VsZCBzd2l0Y2ggYmFjayB0byBtb3VzZVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlRHJhZ1N0YXJ0KGUpO1xuICB9O1xuXG4gIG9uTW91c2VVcDogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci5tb3VzZTtcblxuICAgIHJldHVybiB0aGlzLmhhbmRsZURyYWdTdG9wKGUpO1xuICB9O1xuXG4gIC8vIFNhbWUgYXMgb25Nb3VzZURvd24gKHN0YXJ0IGRyYWcpLCBidXQgbm93IGNvbnNpZGVyIHRoaXMgYSB0b3VjaCBkZXZpY2UuXG4gIG9uVG91Y2hTdGFydDogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIC8vIFdlJ3JlIG9uIGEgdG91Y2ggZGV2aWNlIG5vdywgc28gY2hhbmdlIHRoZSBldmVudCBoYW5kbGVyc1xuICAgIGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci50b3VjaDtcblxuICAgIHJldHVybiB0aGlzLmhhbmRsZURyYWdTdGFydChlKTtcbiAgfTtcblxuICBvblRvdWNoRW5kOiBFdmVudEhhbmRsZXI8TW91c2VUb3VjaEV2ZW50PiA9IChlKSA9PiB7XG4gICAgLy8gV2UncmUgb24gYSB0b3VjaCBkZXZpY2Ugbm93LCBzbyBjaGFuZ2UgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLnRvdWNoO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlRHJhZ1N0b3AoZSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIFJldXNlIHRoZSBjaGlsZCBwcm92aWRlZFxuICAgIC8vIFRoaXMgbWFrZXMgaXQgZmxleGlibGUgdG8gdXNlIHdoYXRldmVyIGVsZW1lbnQgaXMgd2FudGVkIChkaXYsIHVsLCBldGMpXG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChSZWFjdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pLCB7XG4gICAgICBzdHlsZTogc3R5bGVIYWNrcyh0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLnN0eWxlKSxcblxuICAgICAgLy8gTm90ZTogbW91c2VNb3ZlIGhhbmRsZXIgaXMgYXR0YWNoZWQgdG8gZG9jdW1lbnQgc28gaXQgd2lsbCBzdGlsbCBmdW5jdGlvblxuICAgICAgLy8gd2hlbiB0aGUgdXNlciBkcmFncyBxdWlja2x5IGFuZCBsZWF2ZXMgdGhlIGJvdW5kcyBvZiB0aGUgZWxlbWVudC5cbiAgICAgIG9uTW91c2VEb3duOiB0aGlzLm9uTW91c2VEb3duLFxuICAgICAgb25Ub3VjaFN0YXJ0OiB0aGlzLm9uVG91Y2hTdGFydCxcbiAgICAgIG9uTW91c2VVcDogdGhpcy5vbk1vdXNlVXAsXG4gICAgICBvblRvdWNoRW5kOiB0aGlzLm9uVG91Y2hFbmRcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0RyYWdnYWJsZUNvcmUuanMiLCIvLyBAZmxvd1xuLyplc2xpbnQgbm8tY29uc29sZTowKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvZyguLi5hcmdzOiBhbnkpIHtcbiAgaWYgKHByb2Nlc3MuZW52LkRSQUdHQUJMRV9ERUJVRykgY29uc29sZS5sb2coLi4uYXJncyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdXRpbHMvbG9nLmpzIiwidmFyIERyYWdnYWJsZSA9IHJlcXVpcmUoJy4vbGliL0RyYWdnYWJsZScpLmRlZmF1bHQ7XG5cbi8vIFByZXZpb3VzIHZlcnNpb25zIG9mIHRoaXMgbGliIGV4cG9ydGVkIDxEcmFnZ2FibGU+IGFzIHRoZSByb290IGV4cG9ydC4gQXMgdG8gbm90IGJyZWFrXG4vLyB0aGVtLCBvciBUeXBlU2NyaXB0LCB3ZSBleHBvcnQgKmJvdGgqIGFzIHRoZSByb290IGFuZCBhcyAnZGVmYXVsdCcuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL216YWJyaXNraWUvcmVhY3QtZHJhZ2dhYmxlL3B1bGwvMjU0XG4vLyBhbmQgaHR0cHM6Ly9naXRodWIuY29tL216YWJyaXNraWUvcmVhY3QtZHJhZ2dhYmxlL2lzc3Vlcy8yNjZcbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlO1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IERyYWdnYWJsZTtcbm1vZHVsZS5leHBvcnRzLkRyYWdnYWJsZUNvcmUgPSByZXF1aXJlKCcuL2xpYi9EcmFnZ2FibGVDb3JlJykuZGVmYXVsdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LmpzIiwiLy8gQGZsb3dcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7Y3JlYXRlQ1NTVHJhbnNmb3JtLCBjcmVhdGVTVkdUcmFuc2Zvcm19IGZyb20gJy4vdXRpbHMvZG9tRm5zJztcbmltcG9ydCB7Y2FuRHJhZ1gsIGNhbkRyYWdZLCBjcmVhdGVEcmFnZ2FibGVEYXRhLCBnZXRCb3VuZFBvc2l0aW9ufSBmcm9tICcuL3V0aWxzL3Bvc2l0aW9uRm5zJztcbmltcG9ydCB7ZG9udFNldE1lfSBmcm9tICcuL3V0aWxzL3NoaW1zJztcbmltcG9ydCBEcmFnZ2FibGVDb3JlIGZyb20gJy4vRHJhZ2dhYmxlQ29yZSc7XG5pbXBvcnQgdHlwZSB7Q29udHJvbFBvc2l0aW9uLCBEcmFnZ2FibGVCb3VuZHMsIERyYWdnYWJsZUNvcmVQcm9wc30gZnJvbSAnLi9EcmFnZ2FibGVDb3JlJztcbmltcG9ydCBsb2cgZnJvbSAnLi91dGlscy9sb2cnO1xuaW1wb3J0IHR5cGUge0RyYWdnYWJsZUV2ZW50SGFuZGxlcn0gZnJvbSAnLi91dGlscy90eXBlcyc7XG5pbXBvcnQgdHlwZSB7RWxlbWVudCBhcyBSZWFjdEVsZW1lbnR9IGZyb20gJ3JlYWN0JztcblxudHlwZSBEcmFnZ2FibGVTdGF0ZSA9IHtcbiAgZHJhZ2dpbmc6IGJvb2xlYW4sXG4gIGRyYWdnZWQ6IGJvb2xlYW4sXG4gIHg6IG51bWJlciwgeTogbnVtYmVyLFxuICBzbGFja1g6IG51bWJlciwgc2xhY2tZOiBudW1iZXIsXG4gIGlzRWxlbWVudFNWRzogYm9vbGVhblxufTtcblxuZXhwb3J0IHR5cGUgRHJhZ2dhYmxlUHJvcHMgPSB7XG4gIC4uLiRFeGFjdDxEcmFnZ2FibGVDb3JlUHJvcHM+LFxuICBheGlzOiAnYm90aCcgfCAneCcgfCAneScgfCAnbm9uZScsXG4gIGJvdW5kczogRHJhZ2dhYmxlQm91bmRzIHwgc3RyaW5nIHwgZmFsc2UsXG4gIGRlZmF1bHRDbGFzc05hbWU6IHN0cmluZyxcbiAgZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nOiBzdHJpbmcsXG4gIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkOiBzdHJpbmcsXG4gIGRlZmF1bHRQb3NpdGlvbjogQ29udHJvbFBvc2l0aW9uLFxuICBwb3NpdGlvbjogQ29udHJvbFBvc2l0aW9uLFxufTtcblxuLy9cbi8vIERlZmluZSA8RHJhZ2dhYmxlPlxuLy9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ2dhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PERyYWdnYWJsZVByb3BzLCBEcmFnZ2FibGVTdGF0ZT4ge1xuXG4gIHN0YXRpYyBkaXNwbGF5TmFtZSA9ICdEcmFnZ2FibGUnO1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLy8gQWNjZXB0cyBhbGwgcHJvcHMgPERyYWdnYWJsZUNvcmU+IGFjY2VwdHMuXG4gICAgLi4uRHJhZ2dhYmxlQ29yZS5wcm9wVHlwZXMsXG5cbiAgICAvKipcbiAgICAgKiBgYXhpc2AgZGV0ZXJtaW5lcyB3aGljaCBheGlzIHRoZSBkcmFnZ2FibGUgY2FuIG1vdmUuXG4gICAgICpcbiAgICAgKiAgTm90ZSB0aGF0IGFsbCBjYWxsYmFja3Mgd2lsbCBzdGlsbCByZXR1cm4gZGF0YSBhcyBub3JtYWwuIFRoaXMgb25seVxuICAgICAqICBjb250cm9scyBmbHVzaGluZyB0byB0aGUgRE9NLlxuICAgICAqXG4gICAgICogJ2JvdGgnIGFsbG93cyBtb3ZlbWVudCBob3Jpem9udGFsbHkgYW5kIHZlcnRpY2FsbHkuXG4gICAgICogJ3gnIGxpbWl0cyBtb3ZlbWVudCB0byBob3Jpem9udGFsIGF4aXMuXG4gICAgICogJ3knIGxpbWl0cyBtb3ZlbWVudCB0byB2ZXJ0aWNhbCBheGlzLlxuICAgICAqICdub25lJyBsaW1pdHMgYWxsIG1vdmVtZW50LlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gJ2JvdGgnLlxuICAgICAqL1xuICAgIGF4aXM6IFByb3BUeXBlcy5vbmVPZihbJ2JvdGgnLCAneCcsICd5JywgJ25vbmUnXSksXG5cbiAgICAvKipcbiAgICAgKiBgYm91bmRzYCBkZXRlcm1pbmVzIHRoZSByYW5nZSBvZiBtb3ZlbWVudCBhdmFpbGFibGUgdG8gdGhlIGVsZW1lbnQuXG4gICAgICogQXZhaWxhYmxlIHZhbHVlcyBhcmU6XG4gICAgICpcbiAgICAgKiAncGFyZW50JyByZXN0cmljdHMgbW92ZW1lbnQgd2l0aGluIHRoZSBEcmFnZ2FibGUncyBwYXJlbnQgbm9kZS5cbiAgICAgKlxuICAgICAqIEFsdGVybmF0aXZlbHksIHBhc3MgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzLCBhbGwgb2Ygd2hpY2ggYXJlIG9wdGlvbmFsOlxuICAgICAqXG4gICAgICoge2xlZnQ6IExFRlRfQk9VTkQsIHJpZ2h0OiBSSUdIVF9CT1VORCwgYm90dG9tOiBCT1RUT01fQk9VTkQsIHRvcDogVE9QX0JPVU5EfVxuICAgICAqXG4gICAgICogQWxsIHZhbHVlcyBhcmUgaW4gcHguXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganN4XG4gICAgICogICBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAqICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgIDxEcmFnZ2FibGUgYm91bmRzPXt7cmlnaHQ6IDMwMCwgYm90dG9tOiAzMDB9fT5cbiAgICAgKiAgICAgICAgICAgICAgPGRpdj5Db250ZW50PC9kaXY+XG4gICAgICogICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBib3VuZHM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgbGVmdDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgcmlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIHRvcDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgYm90dG9tOiBQcm9wVHlwZXMubnVtYmVyXG4gICAgICB9KSxcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMub25lT2YoW2ZhbHNlXSlcbiAgICBdKSxcblxuICAgIGRlZmF1bHRDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgLyoqXG4gICAgICogYGRlZmF1bHRQb3NpdGlvbmAgc3BlY2lmaWVzIHRoZSB4IGFuZCB5IHRoYXQgdGhlIGRyYWdnZWQgaXRlbSBzaG91bGQgc3RhcnQgYXRcbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgICAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICogICAgICAgICAgICAgICAgICA8RHJhZ2dhYmxlIGRlZmF1bHRQb3NpdGlvbj17e3g6IDI1LCB5OiAyNX19PlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIDxkaXY+SSBzdGFydCB3aXRoIHRyYW5zZm9ybVg6IDI1cHggYW5kIHRyYW5zZm9ybVk6IDI1cHg7PC9kaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICAgICAgKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICogICAgICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBkZWZhdWx0UG9zaXRpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICB4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgeTogUHJvcFR5cGVzLm51bWJlclxuICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogYHBvc2l0aW9uYCwgaWYgcHJlc2VudCwgZGVmaW5lcyB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudC5cbiAgICAgKlxuICAgICAqICBUaGlzIGlzIHNpbWlsYXIgdG8gaG93IGZvcm0gZWxlbWVudHMgaW4gUmVhY3Qgd29yayAtIGlmIG5vIGBwb3NpdGlvbmAgaXMgc3VwcGxpZWQsIHRoZSBjb21wb25lbnRcbiAgICAgKiAgaXMgdW5jb250cm9sbGVkLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzeFxuICAgICAqICAgICAgbGV0IEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAgKiAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgcG9zaXRpb249e3t4OiAyNSwgeTogMjV9fT5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICA8ZGl2Pkkgc3RhcnQgd2l0aCB0cmFuc2Zvcm1YOiAyNXB4IGFuZCB0cmFuc2Zvcm1ZOiAyNXB4OzwvZGl2PlxuICAgICAqICAgICAgICAgICAgICAgICAgPC9EcmFnZ2FibGU+XG4gICAgICogICAgICAgICAgICAgICk7XG4gICAgICogICAgICAgICAgfVxuICAgICAqICAgICAgfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgcG9zaXRpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICB4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgeTogUHJvcFR5cGVzLm51bWJlclxuICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogVGhlc2UgcHJvcGVydGllcyBzaG91bGQgYmUgZGVmaW5lZCBvbiB0aGUgY2hpbGQsIG5vdCBoZXJlLlxuICAgICAqL1xuICAgIGNsYXNzTmFtZTogZG9udFNldE1lLFxuICAgIHN0eWxlOiBkb250U2V0TWUsXG4gICAgdHJhbnNmb3JtOiBkb250U2V0TWVcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLkRyYWdnYWJsZUNvcmUuZGVmYXVsdFByb3BzLFxuICAgIGF4aXM6ICdib3RoJyxcbiAgICBib3VuZHM6IGZhbHNlLFxuICAgIGRlZmF1bHRDbGFzc05hbWU6ICdyZWFjdC1kcmFnZ2FibGUnLFxuICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2luZzogJ3JlYWN0LWRyYWdnYWJsZS1kcmFnZ2luZycsXG4gICAgZGVmYXVsdENsYXNzTmFtZURyYWdnZWQ6ICdyZWFjdC1kcmFnZ2FibGUtZHJhZ2dlZCcsXG4gICAgZGVmYXVsdFBvc2l0aW9uOiB7eDogMCwgeTogMH0sXG4gICAgcG9zaXRpb246IG51bGxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogRHJhZ2dhYmxlUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLy8gV2hldGhlciBvciBub3Qgd2UgYXJlIGN1cnJlbnRseSBkcmFnZ2luZy5cbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcblxuICAgICAgLy8gV2hldGhlciBvciBub3Qgd2UgaGF2ZSBiZWVuIGRyYWdnZWQgYmVmb3JlLlxuICAgICAgZHJhZ2dlZDogZmFsc2UsXG5cbiAgICAgIC8vIEN1cnJlbnQgdHJhbnNmb3JtIHggYW5kIHkuXG4gICAgICB4OiBwcm9wcy5wb3NpdGlvbiA/IHByb3BzLnBvc2l0aW9uLnggOiBwcm9wcy5kZWZhdWx0UG9zaXRpb24ueCxcbiAgICAgIHk6IHByb3BzLnBvc2l0aW9uID8gcHJvcHMucG9zaXRpb24ueSA6IHByb3BzLmRlZmF1bHRQb3NpdGlvbi55LFxuXG4gICAgICAvLyBVc2VkIGZvciBjb21wZW5zYXRpbmcgZm9yIG91dC1vZi1ib3VuZHMgZHJhZ3NcbiAgICAgIHNsYWNrWDogMCwgc2xhY2tZOiAwLFxuXG4gICAgICAvLyBDYW4gb25seSBkZXRlcm1pbmUgaWYgU1ZHIGFmdGVyIG1vdW50aW5nXG4gICAgICBpc0VsZW1lbnRTVkc6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5wb3NpdGlvbiAmJiAhKHRoaXMucHJvcHMub25EcmFnIHx8IHRoaXMucHJvcHMub25TdG9wKSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBjb25zb2xlLndhcm4oJ0EgYHBvc2l0aW9uYCB3YXMgYXBwbGllZCB0byB0aGlzIDxEcmFnZ2FibGU+LCB3aXRob3V0IGRyYWcgaGFuZGxlcnMuIFRoaXMgd2lsbCBtYWtlIHRoaXMgJyArXG4gICAgICAgICdjb21wb25lbnQgZWZmZWN0aXZlbHkgdW5kcmFnZ2FibGUuIFBsZWFzZSBhdHRhY2ggYG9uRHJhZ2Agb3IgYG9uU3RvcGAgaGFuZGxlcnMgc28geW91IGNhbiBhZGp1c3QgdGhlICcgK1xuICAgICAgICAnYHBvc2l0aW9uYCBvZiB0aGlzIGVsZW1lbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBlbGVtZW50IHBhc3NlZCBpcyBhbiBpbnN0YW5jZW9mIFNWR0VsZW1lbnRcbiAgICBpZih0eXBlb2Ygd2luZG93LlNWR0VsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpIGluc3RhbmNlb2Ygd2luZG93LlNWR0VsZW1lbnQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0VsZW1lbnRTVkc6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IE9iamVjdCkge1xuICAgIC8vIFNldCB4L3kgaWYgcG9zaXRpb24gaGFzIGNoYW5nZWRcbiAgICBpZiAobmV4dFByb3BzLnBvc2l0aW9uICYmXG4gICAgICAgICghdGhpcy5wcm9wcy5wb3NpdGlvbiB8fFxuICAgICAgICAgIG5leHRQcm9wcy5wb3NpdGlvbi54ICE9PSB0aGlzLnByb3BzLnBvc2l0aW9uLnggfHxcbiAgICAgICAgICBuZXh0UHJvcHMucG9zaXRpb24ueSAhPT0gdGhpcy5wcm9wcy5wb3NpdGlvbi55XG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHg6IG5leHRQcm9wcy5wb3NpdGlvbi54LCB5OiBuZXh0UHJvcHMucG9zaXRpb24ueSB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnZ2luZzogZmFsc2V9KTsgLy8gcHJldmVudHMgaW52YXJpYW50IGlmIHVubW91bnRlZCB3aGlsZSBkcmFnZ2luZ1xuICB9XG5cbiAgb25EcmFnU3RhcnQ6IERyYWdnYWJsZUV2ZW50SGFuZGxlciA9IChlLCBjb3JlRGF0YSkgPT4ge1xuICAgIGxvZygnRHJhZ2dhYmxlOiBvbkRyYWdTdGFydDogJWonLCBjb3JlRGF0YSk7XG5cbiAgICAvLyBTaG9ydC1jaXJjdWl0IGlmIHVzZXIncyBjYWxsYmFjayBraWxsZWQgaXQuXG4gICAgY29uc3Qgc2hvdWxkU3RhcnQgPSB0aGlzLnByb3BzLm9uU3RhcnQoZSwgY3JlYXRlRHJhZ2dhYmxlRGF0YSh0aGlzLCBjb3JlRGF0YSkpO1xuICAgIC8vIEtpbGxzIHN0YXJ0IGV2ZW50IG9uIGNvcmUgYXMgd2VsbCwgc28gbW92ZSBoYW5kbGVycyBhcmUgbmV2ZXIgYm91bmQuXG4gICAgaWYgKHNob3VsZFN0YXJ0ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ2dpbmc6IHRydWUsIGRyYWdnZWQ6IHRydWV9KTtcbiAgfTtcblxuICBvbkRyYWc6IERyYWdnYWJsZUV2ZW50SGFuZGxlciA9IChlLCBjb3JlRGF0YSkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5kcmFnZ2luZykgcmV0dXJuIGZhbHNlO1xuICAgIGxvZygnRHJhZ2dhYmxlOiBvbkRyYWc6ICVqJywgY29yZURhdGEpO1xuXG4gICAgY29uc3QgdWlEYXRhID0gY3JlYXRlRHJhZ2dhYmxlRGF0YSh0aGlzLCBjb3JlRGF0YSk7XG5cbiAgICBjb25zdCBuZXdTdGF0ZTogJFNoYXBlPERyYWdnYWJsZVN0YXRlPiA9IHtcbiAgICAgIHg6IHVpRGF0YS54LFxuICAgICAgeTogdWlEYXRhLnlcbiAgICB9O1xuXG4gICAgLy8gS2VlcCB3aXRoaW4gYm91bmRzLlxuICAgIGlmICh0aGlzLnByb3BzLmJvdW5kcykge1xuICAgICAgLy8gU2F2ZSBvcmlnaW5hbCB4IGFuZCB5LlxuICAgICAgY29uc3Qge3gsIHl9ID0gbmV3U3RhdGU7XG5cbiAgICAgIC8vIEFkZCBzbGFjayB0byB0aGUgdmFsdWVzIHVzZWQgdG8gY2FsY3VsYXRlIGJvdW5kIHBvc2l0aW9uLiBUaGlzIHdpbGwgZW5zdXJlIHRoYXQgaWZcbiAgICAgIC8vIHdlIHN0YXJ0IHJlbW92aW5nIHNsYWNrLCB0aGUgZWxlbWVudCB3b24ndCByZWFjdCB0byBpdCByaWdodCBhd2F5IHVudGlsIGl0J3MgYmVlblxuICAgICAgLy8gY29tcGxldGVseSByZW1vdmVkLlxuICAgICAgbmV3U3RhdGUueCArPSB0aGlzLnN0YXRlLnNsYWNrWDtcbiAgICAgIG5ld1N0YXRlLnkgKz0gdGhpcy5zdGF0ZS5zbGFja1k7XG5cbiAgICAgIC8vIEdldCBib3VuZCBwb3NpdGlvbi4gVGhpcyB3aWxsIGNlaWwvZmxvb3IgdGhlIHggYW5kIHkgd2l0aGluIHRoZSBib3VuZGFyaWVzLlxuICAgICAgLy8gJEZsb3dCdWdcbiAgICAgIFtuZXdTdGF0ZS54LCBuZXdTdGF0ZS55XSA9IGdldEJvdW5kUG9zaXRpb24odGhpcywgbmV3U3RhdGUueCwgbmV3U3RhdGUueSk7XG5cbiAgICAgIC8vIFJlY2FsY3VsYXRlIHNsYWNrIGJ5IG5vdGluZyBob3cgbXVjaCB3YXMgc2hhdmVkIGJ5IHRoZSBib3VuZFBvc2l0aW9uIGhhbmRsZXIuXG4gICAgICBuZXdTdGF0ZS5zbGFja1ggPSB0aGlzLnN0YXRlLnNsYWNrWCArICh4IC0gbmV3U3RhdGUueCk7XG4gICAgICBuZXdTdGF0ZS5zbGFja1kgPSB0aGlzLnN0YXRlLnNsYWNrWSArICh5IC0gbmV3U3RhdGUueSk7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgZXZlbnQgd2UgZmlyZSB0byByZWZsZWN0IHdoYXQgcmVhbGx5IGhhcHBlbmVkIGFmdGVyIGJvdW5kcyB0b29rIGVmZmVjdC5cbiAgICAgIHVpRGF0YS54ID0gbmV3U3RhdGUueDtcbiAgICAgIHVpRGF0YS55ID0gbmV3U3RhdGUueTtcbiAgICAgIHVpRGF0YS5kZWx0YVggPSBuZXdTdGF0ZS54IC0gdGhpcy5zdGF0ZS54O1xuICAgICAgdWlEYXRhLmRlbHRhWSA9IG5ld1N0YXRlLnkgLSB0aGlzLnN0YXRlLnk7XG4gICAgfVxuXG4gICAgLy8gU2hvcnQtY2lyY3VpdCBpZiB1c2VyJ3MgY2FsbGJhY2sga2lsbGVkIGl0LlxuICAgIGNvbnN0IHNob3VsZFVwZGF0ZSA9IHRoaXMucHJvcHMub25EcmFnKGUsIHVpRGF0YSk7XG4gICAgaWYgKHNob3VsZFVwZGF0ZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9O1xuXG4gIG9uRHJhZ1N0b3A6IERyYWdnYWJsZUV2ZW50SGFuZGxlciA9IChlLCBjb3JlRGF0YSkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5kcmFnZ2luZykgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gU2hvcnQtY2lyY3VpdCBpZiB1c2VyJ3MgY2FsbGJhY2sga2lsbGVkIGl0LlxuICAgIGNvbnN0IHNob3VsZFN0b3AgPSB0aGlzLnByb3BzLm9uU3RvcChlLCBjcmVhdGVEcmFnZ2FibGVEYXRhKHRoaXMsIGNvcmVEYXRhKSk7XG4gICAgaWYgKHNob3VsZFN0b3AgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICBsb2coJ0RyYWdnYWJsZTogb25EcmFnU3RvcDogJWonLCBjb3JlRGF0YSk7XG5cbiAgICBjb25zdCBuZXdTdGF0ZTogJFNoYXBlPERyYWdnYWJsZVN0YXRlPiA9IHtcbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgIHNsYWNrWDogMCxcbiAgICAgIHNsYWNrWTogMFxuICAgIH07XG5cbiAgICAvLyBJZiB0aGlzIGlzIGEgY29udHJvbGxlZCBjb21wb25lbnQsIHRoZSByZXN1bHQgb2YgdGhpcyBvcGVyYXRpb24gd2lsbCBiZSB0b1xuICAgIC8vIHJldmVydCBiYWNrIHRvIHRoZSBvbGQgcG9zaXRpb24uIFdlIGV4cGVjdCBhIGhhbmRsZXIgb24gYG9uRHJhZ1N0b3BgLCBhdCB0aGUgbGVhc3QuXG4gICAgY29uc3QgY29udHJvbGxlZCA9IEJvb2xlYW4odGhpcy5wcm9wcy5wb3NpdGlvbik7XG4gICAgaWYgKGNvbnRyb2xsZWQpIHtcbiAgICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMucHJvcHMucG9zaXRpb247XG4gICAgICBuZXdTdGF0ZS54ID0geDtcbiAgICAgIG5ld1N0YXRlLnkgPSB5O1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9O1xuXG4gIHJlbmRlcigpOiBSZWFjdEVsZW1lbnQ8YW55PiB7XG4gICAgbGV0IHN0eWxlID0ge30sIHN2Z1RyYW5zZm9ybSA9IG51bGw7XG5cbiAgICAvLyBJZiB0aGlzIGlzIGNvbnRyb2xsZWQsIHdlIGRvbid0IHdhbnQgdG8gbW92ZSBpdCAtIHVubGVzcyBpdCdzIGRyYWdnaW5nLlxuICAgIGNvbnN0IGNvbnRyb2xsZWQgPSBCb29sZWFuKHRoaXMucHJvcHMucG9zaXRpb24pO1xuICAgIGNvbnN0IGRyYWdnYWJsZSA9ICFjb250cm9sbGVkIHx8IHRoaXMuc3RhdGUuZHJhZ2dpbmc7XG5cbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucHJvcHMucG9zaXRpb24gfHwgdGhpcy5wcm9wcy5kZWZhdWx0UG9zaXRpb247XG4gICAgY29uc3QgdHJhbnNmb3JtT3B0cyA9IHtcbiAgICAgIC8vIFNldCBsZWZ0IGlmIGhvcml6b250YWwgZHJhZyBpcyBlbmFibGVkXG4gICAgICB4OiBjYW5EcmFnWCh0aGlzKSAmJiBkcmFnZ2FibGUgP1xuICAgICAgICB0aGlzLnN0YXRlLnggOlxuICAgICAgICBwb3NpdGlvbi54LFxuXG4gICAgICAvLyBTZXQgdG9wIGlmIHZlcnRpY2FsIGRyYWcgaXMgZW5hYmxlZFxuICAgICAgeTogY2FuRHJhZ1kodGhpcykgJiYgZHJhZ2dhYmxlID9cbiAgICAgICAgdGhpcy5zdGF0ZS55IDpcbiAgICAgICAgcG9zaXRpb24ueVxuICAgIH07XG5cbiAgICAvLyBJZiB0aGlzIGVsZW1lbnQgd2FzIFNWRywgd2UgdXNlIHRoZSBgdHJhbnNmb3JtYCBhdHRyaWJ1dGUuXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNFbGVtZW50U1ZHKSB7XG4gICAgICBzdmdUcmFuc2Zvcm0gPSBjcmVhdGVTVkdUcmFuc2Zvcm0odHJhbnNmb3JtT3B0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFkZCBhIENTUyB0cmFuc2Zvcm0gdG8gbW92ZSB0aGUgZWxlbWVudCBhcm91bmQuIFRoaXMgYWxsb3dzIHVzIHRvIG1vdmUgdGhlIGVsZW1lbnQgYXJvdW5kXG4gICAgICAvLyB3aXRob3V0IHdvcnJ5aW5nIGFib3V0IHdoZXRoZXIgb3Igbm90IGl0IGlzIHJlbGF0aXZlbHkgb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkLlxuICAgICAgLy8gSWYgdGhlIGl0ZW0geW91IGFyZSBkcmFnZ2luZyBhbHJlYWR5IGhhcyBhIHRyYW5zZm9ybSBzZXQsIHdyYXAgaXQgaW4gYSA8c3Bhbj4gc28gPERyYWdnYWJsZT5cbiAgICAgIC8vIGhhcyBhIGNsZWFuIHNsYXRlLlxuICAgICAgc3R5bGUgPSBjcmVhdGVDU1NUcmFuc2Zvcm0odHJhbnNmb3JtT3B0cyk7XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgZGVmYXVsdENsYXNzTmFtZSxcbiAgICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2luZyxcbiAgICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBNYXJrIHdpdGggY2xhc3Mgd2hpbGUgZHJhZ2dpbmdcbiAgICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc05hbWVzKCh0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmNsYXNzTmFtZSB8fCAnJyksIGRlZmF1bHRDbGFzc05hbWUsIHtcbiAgICAgIFtkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dpbmddOiB0aGlzLnN0YXRlLmRyYWdnaW5nLFxuICAgICAgW2RlZmF1bHRDbGFzc05hbWVEcmFnZ2VkXTogdGhpcy5zdGF0ZS5kcmFnZ2VkXG4gICAgfSk7XG5cbiAgICAvLyBSZXVzZSB0aGUgY2hpbGQgcHJvdmlkZWRcbiAgICAvLyBUaGlzIG1ha2VzIGl0IGZsZXhpYmxlIHRvIHVzZSB3aGF0ZXZlciBlbGVtZW50IGlzIHdhbnRlZCAoZGl2LCB1bCwgZXRjKVxuICAgIHJldHVybiAoXG4gICAgICA8RHJhZ2dhYmxlQ29yZSB7Li4udGhpcy5wcm9wc30gb25TdGFydD17dGhpcy5vbkRyYWdTdGFydH0gb25EcmFnPXt0aGlzLm9uRHJhZ30gb25TdG9wPXt0aGlzLm9uRHJhZ1N0b3B9PlxuICAgICAgICB7UmVhY3QuY2xvbmVFbGVtZW50KFJlYWN0LkNoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbiksIHtcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgICBzdHlsZTogey4uLnRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuc3R5bGUsIC4uLnN0eWxlfSxcbiAgICAgICAgICB0cmFuc2Zvcm06IHN2Z1RyYW5zZm9ybVxuICAgICAgICB9KX1cbiAgICAgIDwvRHJhZ2dhYmxlQ29yZT5cbiAgICApO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvRHJhZ2dhYmxlLmpzIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAlc2AgcHJvcCBvbiBgJXNgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJyxcbiAgICAgICAgICAgICAgcHJvcEZ1bGxOYW1lLFxuICAgICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAlcyBhdCBpbmRleCAlcy4nLFxuICAgICAgICAgIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSxcbiAgICAgICAgICBpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbiAgdmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAodHlwZVNwZWNzLmhhc093blByb3BlcnR5KHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaW52YXJpYW50KHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICdSZWFjdC5Qcm9wVHlwZXMuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lKTtcbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgd2FybmluZyghZXJyb3IgfHwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciwgJyVzOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJXMgYCVzYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgKyAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJXMuICcgKyAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgKyAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIGVycm9yKTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc3RhY2sgPSBnZXRTdGFjayA/IGdldFN0YWNrKCkgOiAnJztcblxuICAgICAgICAgIHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgJXMgdHlwZTogJXMlcycsIGxvY2F0aW9uLCBlcnJvci5tZXNzYWdlLCBzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1Byb3BUeXBlcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBzaGltKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgaWYgKHNlY3JldCA9PT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgIC8vIEl0IGlzIHN0aWxsIHNhZmUgd2hlbiBjYWxsZWQgZnJvbSBSZWFjdC5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW52YXJpYW50KFxuICAgICAgZmFsc2UsXG4gICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAnVXNlIFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICApO1xuICB9O1xuICBzaGltLmlzUmVxdWlyZWQgPSBzaGltO1xuICBmdW5jdGlvbiBnZXRTaGltKCkge1xuICAgIHJldHVybiBzaGltO1xuICB9O1xuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IHNoaW0sXG4gICAgYm9vbDogc2hpbSxcbiAgICBmdW5jOiBzaGltLFxuICAgIG51bWJlcjogc2hpbSxcbiAgICBvYmplY3Q6IHNoaW0sXG4gICAgc3RyaW5nOiBzaGltLFxuICAgIHN5bWJvbDogc2hpbSxcblxuICAgIGFueTogc2hpbSxcbiAgICBhcnJheU9mOiBnZXRTaGltLFxuICAgIGVsZW1lbnQ6IHNoaW0sXG4gICAgaW5zdGFuY2VPZjogZ2V0U2hpbSxcbiAgICBub2RlOiBzaGltLFxuICAgIG9iamVjdE9mOiBnZXRTaGltLFxuICAgIG9uZU9mOiBnZXRTaGltLFxuICAgIG9uZU9mVHlwZTogZ2V0U2hpbSxcbiAgICBzaGFwZTogZ2V0U2hpbVxuICB9O1xuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gZW1wdHlGdW5jdGlvbjtcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEBmbG93XG5jb25zdCBwcmVmaXhlcyA9IFsnTW96JywgJ1dlYmtpdCcsICdPJywgJ21zJ107XG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJlZml4KHByb3A6IHN0cmluZz0ndHJhbnNmb3JtJyk6IHN0cmluZyB7XG4gIC8vIENoZWNraW5nIHNwZWNpZmljYWxseSBmb3IgJ3dpbmRvdy5kb2N1bWVudCcgaXMgZm9yIHBzZXVkby1icm93c2VyIHNlcnZlci1zaWRlXG4gIC8vIGVudmlyb25tZW50cyB0aGF0IGRlZmluZSAnd2luZG93JyBhcyB0aGUgZ2xvYmFsIGNvbnRleHQuXG4gIC8vIEUuZy4gUmVhY3QtcmFpbHMgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVhY3Rqcy9yZWFjdC1yYWlscy9wdWxsLzg0KVxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiAnJztcblxuICBjb25zdCBzdHlsZSA9IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cbiAgaWYgKHByb3AgaW4gc3R5bGUpIHJldHVybiAnJztcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGJyb3dzZXJQcmVmaXhUb0tleShwcm9wLCBwcmVmaXhlc1tpXSkgaW4gc3R5bGUpIHJldHVybiBwcmVmaXhlc1tpXTtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJyb3dzZXJQcmVmaXhUb0tleShwcm9wOiBzdHJpbmcsIHByZWZpeDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHByZWZpeCA/IGAke3ByZWZpeH0ke2tlYmFiVG9UaXRsZUNhc2UocHJvcCl9YCA6IHByb3A7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicm93c2VyUHJlZml4VG9TdHlsZShwcm9wOiBzdHJpbmcsIHByZWZpeDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHByZWZpeCA/IGAtJHtwcmVmaXgudG9Mb3dlckNhc2UoKX0tJHtwcm9wfWAgOiBwcm9wO1xufVxuXG5mdW5jdGlvbiBrZWJhYlRvVGl0bGVDYXNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgbGV0IG91dCA9ICcnO1xuICBsZXQgc2hvdWxkQ2FwaXRhbGl6ZSA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHNob3VsZENhcGl0YWxpemUpIHtcbiAgICAgIG91dCArPSBzdHJbaV0udG9VcHBlckNhc2UoKTtcbiAgICAgIHNob3VsZENhcGl0YWxpemUgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHN0cltpXSA9PT0gJy0nKSB7XG4gICAgICBzaG91bGRDYXBpdGFsaXplID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0ICs9IHN0cltpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG91dDtcbn1cblxuLy8gRGVmYXVsdCBleHBvcnQgaXMgdGhlIHByZWZpeCBpdHNlbGYsIGxpa2UgJ01veicsICdXZWJraXQnLCBldGNcbi8vIE5vdGUgdGhhdCB5b3UgbWF5IGhhdmUgdG8gcmUtdGVzdCBmb3IgY2VydGFpbiB0aGluZ3M7IGZvciBpbnN0YW5jZSwgQ2hyb21lIDUwXG4vLyBjYW4gaGFuZGxlIHVucHJlZml4ZWQgYHRyYW5zZm9ybWAsIGJ1dCBub3QgdW5wcmVmaXhlZCBgdXNlci1zZWxlY3RgXG5leHBvcnQgZGVmYXVsdCBnZXRQcmVmaXgoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi91dGlscy9nZXRQcmVmaXguanMiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9