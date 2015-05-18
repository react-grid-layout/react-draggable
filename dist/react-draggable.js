(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactDraggable"] = factory(require("React"));
	else
		root["ReactDraggable"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(2);
	var emptyFunction = function(){};
	var assign = __webpack_require__(3);
	var classNames = __webpack_require__(4);
	
	//
	// Helpers. See Element definition below this section.
	//
	
	function createUIEvent(draggable) {
	  // State changes are often (but not always!) async. We want the latest value.
	  var state = draggable._pendingState || draggable.state;
	  return {
	    node: draggable.getDOMNode(),
	    position: {
	      top: state.clientY,
	      left: state.clientX
	    }
	  };
	}
	
	function canDragY(draggable) {
	  return draggable.props.axis === 'both' ||
	      draggable.props.axis === 'y';
	}
	
	function canDragX(draggable) {
	  return draggable.props.axis === 'both' ||
	      draggable.props.axis === 'x';
	}
	
	function isFunction(func) {
	  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
	}
	
	// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
	function findInArray(array, callback) {
	  for (var i = 0, length = array.length; i < length; i++) {
	    if (callback.apply(callback, [array[i], i, array])) return array[i];
	  }
	}
	
	function matchesSelector(el, selector) {
	  var method = findInArray([
	    'matches',
	    'webkitMatchesSelector',
	    'mozMatchesSelector',
	    'msMatchesSelector',
	    'oMatchesSelector'
	  ], function(method){
	    return isFunction(el[method]);
	  });
	
	  return el[method].call(el, selector);
	}
	
	// @credits: http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886
	/* Conditional to fix node server side rendering of component */
	if (typeof window === 'undefined') {
	    // Do Node Stuff
	    var isTouchDevice = false;
	} else {
	    // Do Browser Stuff
	    var isTouchDevice = 'ontouchstart' in window || // works on most browsers
	                        'onmsgesturechange' in window; // works on ie10 on ms surface
	
	}
	
	// look ::handleDragStart
	//function isMultiTouch(e) {
	//  return e.touches && Array.isArray(e.touches) && e.touches.length > 1
	//}
	
	/**
	 * simple abstraction for dragging events names
	 * */
	var dragEventFor = (function () {
	  var eventsFor = {
	    touch: {
	      start: 'touchstart',
	      move: 'touchmove',
	      end: 'touchend'
	    },
	    mouse: {
	      start: 'mousedown',
	      move: 'mousemove',
	      end: 'mouseup'
	    }
	  };
	  return eventsFor[isTouchDevice ? 'touch' : 'mouse'];
	})();
	
	/**
	 * get {clientX, clientY} positions of control
	 * */
	function getControlPosition(e) {
	  var position = (e.touches && e.touches[0]) || e;
	  return {
	    clientX: position.clientX,
	    clientY: position.clientY
	  };
	}
	
	function addEvent(el, event, handler) {
	  if (!el) { return; }
	  if (el.attachEvent) {
	    el.attachEvent('on' + event, handler);
	  } else if (el.addEventListener) {
	    el.addEventListener(event, handler, true);
	  } else {
	    el['on' + event] = handler;
	  }
	}
	
	function removeEvent(el, event, handler) {
	  if (!el) { return; }
	  if (el.detachEvent) {
	    el.detachEvent('on' + event, handler);
	  } else if (el.removeEventListener) {
	    el.removeEventListener(event, handler, true);
	  } else {
	    el['on' + event] = null;
	  }
	}
	
	function outerHeight(node) {
	  // This is deliberately excluding margin for our calculations, since we are using
	  // offsetTop which is including margin. See getBoundPosition
	  var height = node.clientHeight;
	  var computedStyle = window.getComputedStyle(node);
	  height += int(computedStyle.borderTopWidth);
	  height += int(computedStyle.borderBottomWidth);
	  return height;
	}
	
	function outerWidth(node) {
	  // This is deliberately excluding margin for our calculations, since we are using
	  // offsetLeft which is including margin. See getBoundPosition
	  var width = node.clientWidth;
	  var computedStyle = window.getComputedStyle(node);
	  width += int(computedStyle.borderLeftWidth);
	  width += int(computedStyle.borderRightWidth);
	  return width;
	}
	function innerHeight(node) {
	  var height = node.clientHeight;
	  var computedStyle = window.getComputedStyle(node);
	  height -= int(computedStyle.paddingTop);
	  height -= int(computedStyle.paddingBottom);
	  return height;
	}
	
	function innerWidth(node) {
	  var width = node.clientWidth;
	  var computedStyle = window.getComputedStyle(node);
	  width -= int(computedStyle.paddingLeft);
	  width -= int(computedStyle.paddingRight);
	  return width;
	}
	
	function isNum(num) {
	  return typeof num === 'number' && !isNaN(num);
	}
	
	function int(a) {
	  return parseInt(a, 10);
	}
	
	function getBoundPosition(draggable, clientX, clientY) {
	  var bounds = JSON.parse(JSON.stringify(draggable.props.bounds));
	  var node = draggable.getDOMNode();
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
	
	function snapToGrid(grid, pendingX, pendingY) {
	  var x = Math.round(pendingX / grid[0]) * grid[0];
	  var y = Math.round(pendingY / grid[1]) * grid[1];
	  return [x, y];
	}
	
	// Useful for preventing blue highlights all over everything when dragging.
	var userSelectStyle = ';user-select: none;-webkit-user-select:none;-moz-user-select:none;' +
	  '-o-user-select:none;-ms-user-select:none;';
	
	function addUserSelectStyles(draggable) {
	  if (!draggable.props.enableUserSelectHack) return;
	  var style = document.body.getAttribute('style') || '';
	  document.body.setAttribute('style', style + userSelectStyle);
	}
	
	function removeUserSelectStyles(draggable) {
	  if (!draggable.props.enableUserSelectHack) return;
	  var style = document.body.getAttribute('style') || '';
	  document.body.setAttribute('style', style.replace(userSelectStyle, ''));
	}
	
	function createCSSTransform(style) {
	  // Replace unitless items with px
	  var x = style.x + 'px';
	  var y = style.y + 'px';
	  return {
	    transform: 'translate(' + x + ',' + y + ')',
	    WebkitTransform: 'translate(' + x + ',' + y + ')',
	    OTransform: 'translate(' + x + ',' + y + ')',
	    msTransform: 'translate(' + x + ',' + y + ')',
	    MozTransform: 'translate(' + x + ',' + y + ')'
	  };
	}
	
	
	//
	// End Helpers.
	//
	
	//
	// Define <Draggable>
	//
	
	module.exports = React.createClass({
	  displayName: 'Draggable',
	
	  propTypes: {
	    /**
	     * `axis` determines which axis the draggable can move.
	     *
	     * 'both' allows movement horizontally and vertically.
	     * 'x' limits movement to horizontal axis.
	     * 'y' limits movement to vertical axis.
	     *
	     * Defaults to 'both'.
	     */
	    axis: React.PropTypes.oneOf(['both', 'x', 'y']),
	
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
	     *   var App = React.createClass({
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
	    bounds: React.PropTypes.oneOfType([
	      React.PropTypes.shape({
	        left: React.PropTypes.Number,
	        right: React.PropTypes.Number,
	        top: React.PropTypes.Number,
	        bottom: React.PropTypes.Number
	      }),
	      React.PropTypes.oneOf(['parent', false])
	    ]),
	
	    /**
	     * By default, we add 'user-select:none' attributes to the document body
	     * to prevent ugly text selection during drag. If this is causing problems
	     * for your app, set this to `false`.
	     */
	    enableUserSelectHack: React.PropTypes.bool,
	
	    /**
	     * `handle` specifies a selector to be used as the handle that initiates drag.
	     *
	     * Example:
	     *
	     * ```jsx
	     *   var App = React.createClass({
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
	    handle: React.PropTypes.string,
	
	    /**
	     * `cancel` specifies a selector to be used to prevent drag initialization.
	     *
	     * Example:
	     *
	     * ```jsx
	     *   var App = React.createClass({
	     *       render: function () {
	     *           return(
	     *               <Draggable cancel=".cancel">
	     *                   <div>
	     *                     <div className="cancel">You can't drag from here</div>
	     *            <div>Dragging here works fine</div>
	     *                   </div>
	     *               </Draggable>
	     *           );
	     *       }
	     *   });
	     * ```
	     */
	    cancel: React.PropTypes.string,
	
	    /**
	     * `grid` specifies the x and y that dragging should snap to.
	     *
	     * Example:
	     *
	     * ```jsx
	     *   var App = React.createClass({
	     *       render: function () {
	     *           return (
	     *               <Draggable grid={[25, 25]}>
	     *                   <div>I snap to a 25 x 25 grid</div>
	     *               </Draggable>
	     *           );
	     *       }
	     *   });
	     * ```
	     */
	    grid: React.PropTypes.arrayOf(React.PropTypes.number),
	
	    /**
	     * `start` specifies the x and y that the dragged item should start at
	     *
	     * Example:
	     *
	     * ```jsx
	     *      var App = React.createClass({
	     *          render: function () {
	     *              return (
	     *                  <Draggable start={{x: 25, y: 25}}>
	     *                      <div>I start with transformX: 25px and transformY: 25px;</div>
	     *                  </Draggable>
	     *              );
	     *          }
	     *      });
	     * ```
	     */
	    start: React.PropTypes.shape({
	      x: React.PropTypes.number,
	      y: React.PropTypes.number
	    }),
	
	    /**
	     * `moveOnStartChange`, if true (default false) will move the element if the `start`
	     * property changes.
	     */
	    moveOnStartChange: React.PropTypes.bool,
	
	
	    /**
	     * `zIndex` specifies the zIndex to use while dragging.
	     *
	     * Example:
	     *
	     * ```jsx
	     *   var App = React.createClass({
	     *       render: function () {
	     *           return (
	     *               <Draggable zIndex={100}>
	     *                   <div>I have a zIndex</div>
	     *               </Draggable>
	     *           );
	     *       }
	     *   });
	     * ```
	     */
	    zIndex: React.PropTypes.number,
	
	    /**
	     * Called when dragging starts.
	     * If this function returns the boolean false, dragging will be canceled.
	     *
	     * Example:
	     *
	     * ```js
	     *  function (event, ui) {}
	     * ```
	     *
	     * `event` is the Event that was triggered.
	     * `ui` is an object:
	     *
	     * ```js
	     *  {
	     *    position: {top: 0, left: 0}
	     *  }
	     * ```
	     */
	    onStart: React.PropTypes.func,
	
	    /**
	     * Called while dragging.
	     * If this function returns the boolean false, dragging will be canceled.
	     *
	     * Example:
	     *
	     * ```js
	     *  function (event, ui) {}
	     * ```
	     *
	     * `event` is the Event that was triggered.
	     * `ui` is an object:
	     *
	     * ```js
	     *  {
	     *    position: {top: 0, left: 0}
	     *  }
	     * ```
	     */
	    onDrag: React.PropTypes.func,
	
	    /**
	     * Called when dragging stops.
	     *
	     * Example:
	     *
	     * ```js
	     *  function (event, ui) {}
	     * ```
	     *
	     * `event` is the Event that was triggered.
	     * `ui` is an object:
	     *
	     * ```js
	     *  {
	     *    position: {top: 0, left: 0}
	     *  }
	     * ```
	     */
	    onStop: React.PropTypes.func,
	
	    /**
	     * A workaround option which can be passed if onMouseDown needs to be accessed,
	     * since it'll always be blocked (due to that there's internal use of onMouseDown)
	     */
	    onMouseDown: React.PropTypes.func,
	  },
	
	  componentWillReceiveProps: function(newProps) {
	    // React to changes in the 'start' param.
	    if (newProps.moveOnStartChange && newProps.start) {
	      this.setState(this.getInitialState(newProps));
	    }
	  },
	
	  componentWillUnmount: function() {
	    // Remove any leftover event handlers
	    removeEvent(window, dragEventFor['move'], this.handleDrag);
	    removeEvent(window, dragEventFor['end'], this.handleDragEnd);
	    removeUserSelectStyles(this);
	  },
	
	  getDefaultProps: function () {
	    return {
	      axis: 'both',
	      bounds: false,
	      handle: null,
	      cancel: null,
	      grid: null,
	      moveOnStartChange: false,
	      start: {x: 0, y: 0},
	      zIndex: NaN,
	      enableUserSelectHack: true,
	      onStart: emptyFunction,
	      onDrag: emptyFunction,
	      onStop: emptyFunction,
	      onMouseDown: emptyFunction
	    };
	  },
	
	  getInitialState: function (props) {
	    // Handle call from CWRP
	    props = props || this.props;
	    return {
	      // Whether or not we are currently dragging.
	      dragging: false,
	
	      // Offset between start top/left and mouse top/left while dragging.
	      offsetX: 0, offsetY: 0,
	
	      // Current transform x and y.
	      clientX: props.start.x, clientY: props.start.y
	    };
	  },
	
	  handleDragStart: function (e) {
	    // todo: write right implementation to prevent multitouch drag
	    // prevent multi-touch events
	    // if (isMultiTouch(e)) {
	    //     this.handleDragEnd.apply(e, arguments);
	    //     return
	    // }
	
	    // Make it possible to attach event handlers on top of this one
	    this.props.onMouseDown(e);
	
	    // Short circuit if handle or cancel prop was provided and selector doesn't match
	    if ((this.props.handle && !matchesSelector(e.target, this.props.handle)) ||
	      (this.props.cancel && matchesSelector(e.target, this.props.cancel))) {
	      return;
	    }
	
	    // Call event handler. If it returns explicit false, cancel.
	    var shouldStart = this.props.onStart(e, createUIEvent(this));
	    if (shouldStart === false) return;
	
	    var dragPoint = getControlPosition(e);
	
	    // Add a style to the body to disable user-select. This prevents text from
	    // being selected all over the page.
	    addUserSelectStyles(this);
	
	    // Initiate dragging. Set the current x and y as offsets
	    // so we know how much we've moved during the drag. This allows us
	    // to drag elements around even if they have been moved, without issue.
	    this.setState({
	      dragging: true,
	      offsetX: dragPoint.clientX - this.state.clientX,
	      offsetY: dragPoint.clientY - this.state.clientY
	    });
	
	
	    // Add event handlers
	    addEvent(window, dragEventFor['move'], this.handleDrag);
	    addEvent(window, dragEventFor['end'], this.handleDragEnd);
	  },
	
	  handleDragEnd: function (e) {
	    // Short circuit if not currently dragging
	    if (!this.state.dragging) {
	      return;
	    }
	
	    removeUserSelectStyles(this);
	
	    // Turn off dragging
	    this.setState({
	      dragging: false
	    });
	
	    // Call event handler
	    this.props.onStop(e, createUIEvent(this));
	
	    // Remove event handlers
	    removeEvent(window, dragEventFor['move'], this.handleDrag);
	    removeEvent(window, dragEventFor['end'], this.handleDragEnd);
	  },
	
	  handleDrag: function (e) {
	    var dragPoint = getControlPosition(e);
	
	    // Calculate X and Y
	    var clientX = dragPoint.clientX - this.state.offsetX;
	    var clientY = dragPoint.clientY - this.state.offsetY;
	
	    // Snap to grid if prop has been provided
	    if (Array.isArray(this.props.grid)) {
	      var coords = snapToGrid(this.props.grid, clientX, clientY);
	      clientX = coords[0], clientY = coords[1];
	    }
	
	    if (this.props.bounds) {
	      var pos = getBoundPosition(this, clientX, clientY);
	      clientX = pos[0], clientY = pos[1];
	    }
	
	    // Call event handler. If it returns explicit false, cancel.
	    var shouldUpdate = this.props.onDrag(e, createUIEvent(this));
	    if (shouldUpdate === false) return this.handleDragEnd();
	
	    // Update transform
	    this.setState({
	      clientX: clientX,
	      clientY: clientY
	    });
	  },
	
	  render: function () {
	    // Create style object. We extend from existing styles so we don't
	    // remove anything already set (like background, color, etc).
	    var childStyle = this.props.children.props.style || {};
	
	    // Add a CSS transform to move the element around. This allows us to move the element around
	    // without worrying about whether or not it is relatively or absolutely positioned.
	    // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
	    // has a clean slate.
	    var transform = createCSSTransform({
	      // Set left if horizontal drag is enabled
	      x: canDragX(this) ?
	        this.state.clientX :
	        0,
	
	      // Set top if vertical drag is enabled
	      y: canDragY(this) ?
	        this.state.clientY :
	        0
	    });
	    var style = assign({}, childStyle, transform);
	
	    // Set zIndex if currently dragging and prop has been provided
	    if (this.state.dragging && !isNaN(this.props.zIndex)) {
	      style.zIndex = this.props.zIndex;
	    }
	
	    var className = classNames((this.props.children.props.className || ''), 'react-draggable', {
	      'react-draggable-dragging': this.state.dragging,
	      'react-draggable-dragged': this.state.dragged
	    });
	
	    // Reuse the child provided
	    // This makes it flexible to use whatever element is wanted (div, ul, etc)
	    return React.cloneElement(React.Children.only(this.props.children), {
	      style: style,
	      className: className,
	
	      onMouseDown: this.handleDragStart,
	      onTouchStart: function(ev){
	        ev.preventDefault(); // prevent for scroll
	        return this.handleDragStart.apply(this, arguments);
	      }.bind(this),
	
	      onMouseUp: this.handleDragEnd,
	      onTouchEnd: this.handleDragEnd
	    });
	  }
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);
	
		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));
	
			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}
	
		return to;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	
	function classNames() {
		var classes = '';
		var arg;
	
		for (var i = 0; i < arguments.length; i++) {
			arg = arguments[i];
			if (!arg) {
				continue;
			}
	
			if ('string' === typeof arg || 'number' === typeof arg) {
				classes += ' ' + arg;
			} else if (Object.prototype.toString.call(arg) === '[object Array]') {
				classes += ' ' + classNames.apply(null, arg);
			} else if ('object' === typeof arg) {
				for (var key in arg) {
					if (!arg.hasOwnProperty(key) || !arg[key]) {
						continue;
					}
					classes += ' ' + key;
				}
			}
		}
		return classes.substr(1);
	}
	
	// safely export classNames for node / browserify
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	}
	
	// safely export classNames for RequireJS
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIi4uL3dlYnBhY2svYm9vdHN0cmFwIDhkZDM1MDdkMGYwNTlkNjUwMTJiIiwiLi4vLi9pbmRleC5qcyIsIi4uLy4vbGliL2RyYWdnYWJsZS5qcyIsIi4uL2V4dGVybmFsIFwiUmVhY3RcIiIsIi4uLy4vfi9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwiLi4vLi9+L2NsYXNzbmFtZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLE9BQU0sQ0FBQyxPQUFPLEdBQUcsbUJBQU8sQ0FBQyxDQUFpQixDQUFDLENBQUM7Ozs7Ozs7QUNBNUMsYUFBWSxDQUFDOztBQUViLEtBQUksS0FBSyxHQUFHLG1CQUFPLENBQUMsQ0FBTyxDQUFDLENBQUM7QUFDN0IsS0FBSSxhQUFhLEdBQUcsVUFBVSxFQUFFLENBQUM7QUFDakMsS0FBSSxNQUFNLEdBQUcsbUJBQU8sQ0FBQyxDQUFlLENBQUMsQ0FBQztBQUN0QyxLQUFJLFVBQVUsR0FBRyxtQkFBTyxDQUFDLENBQVksQ0FBQyxDQUFDOztBQUV2QyxHQUFFO0FBQ0YsdURBQXNEO0FBQ3RELEdBQUU7O0FBRUYsVUFBUyxhQUFhLENBQUMsU0FBUyxFQUFFOztHQUVoQyxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsYUFBYSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUM7R0FDdkQsT0FBTztLQUNMLElBQUksRUFBRSxTQUFTLENBQUMsVUFB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SyxDQUFDLFNBQVMsQ0FBQyxNQUFNO1NBQzVCLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU07U0FDN0IsR0FBRyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtTQUMzQixNQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO1FBQy9CLENBQUM7T0FDRixLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QyxNQUFLLENBQUM7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUksb0JBQW9CLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSSxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSSxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSSxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7S0FFSSxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENB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eUM7QUFDekMsS0FBSSxJQUEyQyxFQUFFO0VBQ2hELGlDQUFxQixFQUFFLGtDQUFFLFdBQVc7R0FDbkMsT0FBTyxVQUFVLENBQUM7R0FDbEIsK0lBQUMsQ0FBQztFQUNIIiwiZmlsZSI6Ii4vZGlzdC9yZWFjdC1kcmFnZ2FibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJSZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJSZWFjdERyYWdnYWJsZVwiXSA9IGZhY3RvcnkocmVxdWlyZShcIlJlYWN0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdERyYWdnYWJsZVwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA4ZGQzNTA3ZDBmMDU5ZDY1MDEyYlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvZHJhZ2dhYmxlJyk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbigpe307XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xudmFyIGNsYXNzTmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbi8vXG4vLyBIZWxwZXJzLiBTZWUgRWxlbWVudCBkZWZpbml0aW9uIGJlbG93IHRoaXMgc2VjdGlvbi5cbi8vXG5cbmZ1bmN0aW9uIGNyZWF0ZVVJRXZlbnQoZHJhZ2dhYmxlKSB7XG4gIC8vIFN0YXRlIGNoYW5nZXMgYXJlIG9mdGVuIChidXQgbm90IGFsd2F5cyEpIGFzeW5jLiBXZSB3YW50IHRoZSBsYXRlc3QgdmFsdWUuXG4gIHZhciBzdGF0ZSA9IGRyYWdnYWJsZS5fcGVuZGluZ1N0YXRlIHx8IGRyYWdnYWJsZS5zdGF0ZTtcbiAgcmV0dXJuIHtcbiAgICBub2RlOiBkcmFnZ2FibGUuZ2V0RE9NTm9kZSgpLFxuICAgIHBvc2l0aW9uOiB7XG4gICAgICB0b3A6IHN0YXRlLmNsaWVudFksXG4gICAgICBsZWZ0OiBzdGF0ZS5jbGllbnRYXG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjYW5EcmFnWShkcmFnZ2FibGUpIHtcbiAgcmV0dXJuIGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAnYm90aCcgfHxcbiAgICAgIGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAneSc7XG59XG5cbmZ1bmN0aW9uIGNhbkRyYWdYKGRyYWdnYWJsZSkge1xuICByZXR1cm4gZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICdib3RoJyB8fFxuICAgICAgZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICd4Jztcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jKSB7XG4gIHJldHVybiB0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZnVuYykgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8vIEBjcmVkaXRzIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3JvZ296aG5pa29mZi9hNDNjZmVkMjdjNDFlNGU2OGNkY1xuZnVuY3Rpb24gZmluZEluQXJyYXkoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChjYWxsYmFjay5hcHBseShjYWxsYmFjaywgW2FycmF5W2ldLCBpLCBhcnJheV0pKSByZXR1cm4gYXJyYXlbaV07XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yKGVsLCBzZWxlY3Rvcikge1xuICB2YXIgbWV0aG9kID0gZmluZEluQXJyYXkoW1xuICAgICdtYXRjaGVzJyxcbiAgICAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJyxcbiAgICAnbW96TWF0Y2hlc1NlbGVjdG9yJyxcbiAgICAnbXNNYXRjaGVzU2VsZWN0b3InLFxuICAgICdvTWF0Y2hlc1NlbGVjdG9yJ1xuICBdLCBmdW5jdGlvbihtZXRob2Qpe1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKGVsW21ldGhvZF0pO1xuICB9KTtcblxuICByZXR1cm4gZWxbbWV0aG9kXS5jYWxsKGVsLCBzZWxlY3Rvcik7XG59XG5cbi8vIEBjcmVkaXRzOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ4MTcwMjkvd2hhdHMtdGhlLWJlc3Qtd2F5LXRvLWRldGVjdC1hLXRvdWNoLXNjcmVlbi1kZXZpY2UtdXNpbmctamF2YXNjcmlwdC80ODE5ODg2IzQ4MTk4ODZcbi8qIENvbmRpdGlvbmFsIHRvIGZpeCBub2RlIHNlcnZlciBzaWRlIHJlbmRlcmluZyBvZiBjb21wb25lbnQgKi9cbmlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIC8vIERvIE5vZGUgU3R1ZmZcbiAgICB2YXIgaXNUb3VjaERldmljZSA9IGZhbHNlO1xufSBlbHNlIHtcbiAgICAvLyBEbyBCcm93c2VyIFN0dWZmXG4gICAgdmFyIGlzVG91Y2hEZXZpY2UgPSAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgLy8gd29ya3Mgb24gbW9zdCBicm93c2Vyc1xuICAgICAgICAgICAgICAgICAgICAgICAgJ29ubXNnZXN0dXJlY2hhbmdlJyBpbiB3aW5kb3c7IC8vIHdvcmtzIG9uIGllMTAgb24gbXMgc3VyZmFjZVxuXG59XG5cbi8vIGxvb2sgOjpoYW5kbGVEcmFnU3RhcnRcbi8vZnVuY3Rpb24gaXNNdWx0aVRvdWNoKGUpIHtcbi8vICByZXR1cm4gZS50b3VjaGVzICYmIEFycmF5LmlzQXJyYXkoZS50b3VjaGVzKSAmJiBlLnRvdWNoZXMubGVuZ3RoID4gMVxuLy99XG5cbi8qKlxuICogc2ltcGxlIGFic3RyYWN0aW9uIGZvciBkcmFnZ2luZyBldmVudHMgbmFtZXNcbiAqICovXG52YXIgZHJhZ0V2ZW50Rm9yID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGV2ZW50c0ZvciA9IHtcbiAgICB0b3VjaDoge1xuICAgICAgc3RhcnQ6ICd0b3VjaHN0YXJ0JyxcbiAgICAgIG1vdmU6ICd0b3VjaG1vdmUnLFxuICAgICAgZW5kOiAndG91Y2hlbmQnXG4gICAgfSxcbiAgICBtb3VzZToge1xuICAgICAgc3RhcnQ6ICdtb3VzZWRvd24nLFxuICAgICAgbW92ZTogJ21vdXNlbW92ZScsXG4gICAgICBlbmQ6ICdtb3VzZXVwJ1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGV2ZW50c0Zvcltpc1RvdWNoRGV2aWNlID8gJ3RvdWNoJyA6ICdtb3VzZSddO1xufSkoKTtcblxuLyoqXG4gKiBnZXQge2NsaWVudFgsIGNsaWVudFl9IHBvc2l0aW9ucyBvZiBjb250cm9sXG4gKiAqL1xuZnVuY3Rpb24gZ2V0Q29udHJvbFBvc2l0aW9uKGUpIHtcbiAgdmFyIHBvc2l0aW9uID0gKGUudG91Y2hlcyAmJiBlLnRvdWNoZXNbMF0pIHx8IGU7XG4gIHJldHVybiB7XG4gICAgY2xpZW50WDogcG9zaXRpb24uY2xpZW50WCxcbiAgICBjbGllbnRZOiBwb3NpdGlvbi5jbGllbnRZXG4gIH07XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50KGVsLCBldmVudCwgaGFuZGxlcikge1xuICBpZiAoIWVsKSB7IHJldHVybjsgfVxuICBpZiAoZWwuYXR0YWNoRXZlbnQpIHtcbiAgICBlbC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKGVsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBlbFsnb24nICsgZXZlbnRdID0gaGFuZGxlcjtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudChlbCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgaWYgKCFlbCkgeyByZXR1cm47IH1cbiAgaWYgKGVsLmRldGFjaEV2ZW50KSB7XG4gICAgZWwuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgfSBlbHNlIGlmIChlbC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgZWxbJ29uJyArIGV2ZW50XSA9IG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gb3V0ZXJIZWlnaHQobm9kZSkge1xuICAvLyBUaGlzIGlzIGRlbGliZXJhdGVseSBleGNsdWRpbmcgbWFyZ2luIGZvciBvdXIgY2FsY3VsYXRpb25zLCBzaW5jZSB3ZSBhcmUgdXNpbmdcbiAgLy8gb2Zmc2V0VG9wIHdoaWNoIGlzIGluY2x1ZGluZyBtYXJnaW4uIFNlZSBnZXRCb3VuZFBvc2l0aW9uXG4gIHZhciBoZWlnaHQgPSBub2RlLmNsaWVudEhlaWdodDtcbiAgdmFyIGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgaGVpZ2h0ICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlclRvcFdpZHRoKTtcbiAgaGVpZ2h0ICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlckJvdHRvbVdpZHRoKTtcbiAgcmV0dXJuIGhlaWdodDtcbn1cblxuZnVuY3Rpb24gb3V0ZXJXaWR0aChub2RlKSB7XG4gIC8vIFRoaXMgaXMgZGVsaWJlcmF0ZWx5IGV4Y2x1ZGluZyBtYXJnaW4gZm9yIG91ciBjYWxjdWxhdGlvbnMsIHNpbmNlIHdlIGFyZSB1c2luZ1xuICAvLyBvZmZzZXRMZWZ0IHdoaWNoIGlzIGluY2x1ZGluZyBtYXJnaW4uIFNlZSBnZXRCb3VuZFBvc2l0aW9uXG4gIHZhciB3aWR0aCA9IG5vZGUuY2xpZW50V2lkdGg7XG4gIHZhciBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIHdpZHRoICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlckxlZnRXaWR0aCk7XG4gIHdpZHRoICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlclJpZ2h0V2lkdGgpO1xuICByZXR1cm4gd2lkdGg7XG59XG5mdW5jdGlvbiBpbm5lckhlaWdodChub2RlKSB7XG4gIHZhciBoZWlnaHQgPSBub2RlLmNsaWVudEhlaWdodDtcbiAgdmFyIGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgaGVpZ2h0IC09IGludChjb21wdXRlZFN0eWxlLnBhZGRpbmdUb3ApO1xuICBoZWlnaHQgLT0gaW50KGNvbXB1dGVkU3R5bGUucGFkZGluZ0JvdHRvbSk7XG4gIHJldHVybiBoZWlnaHQ7XG59XG5cbmZ1bmN0aW9uIGlubmVyV2lkdGgobm9kZSkge1xuICB2YXIgd2lkdGggPSBub2RlLmNsaWVudFdpZHRoO1xuICB2YXIgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICB3aWR0aCAtPSBpbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nTGVmdCk7XG4gIHdpZHRoIC09IGludChjb21wdXRlZFN0eWxlLnBhZGRpbmdSaWdodCk7XG4gIHJldHVybiB3aWR0aDtcbn1cblxuZnVuY3Rpb24gaXNOdW0obnVtKSB7XG4gIHJldHVybiB0eXBlb2YgbnVtID09PSAnbnVtYmVyJyAmJiAhaXNOYU4obnVtKTtcbn1cblxuZnVuY3Rpb24gaW50KGEpIHtcbiAgcmV0dXJuIHBhcnNlSW50KGEsIDEwKTtcbn1cblxuZnVuY3Rpb24gZ2V0Qm91bmRQb3NpdGlvbihkcmFnZ2FibGUsIGNsaWVudFgsIGNsaWVudFkpIHtcbiAgdmFyIGJvdW5kcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZHJhZ2dhYmxlLnByb3BzLmJvdW5kcykpO1xuICB2YXIgbm9kZSA9IGRyYWdnYWJsZS5nZXRET01Ob2RlKCk7XG4gIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG5cbiAgaWYgKGJvdW5kcyA9PT0gJ3BhcmVudCcpIHtcbiAgICB2YXIgbm9kZVN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgdmFyIHBhcmVudFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocGFyZW50KTtcbiAgICAvLyBDb21wdXRlIGJvdW5kcy4gVGhpcyBpcyBhIHBhaW4gd2l0aCBwYWRkaW5nIGFuZCBvZmZzZXRzIGJ1dCB0aGlzIGdldHMgaXQgZXhhY3RseSByaWdodC5cbiAgICBib3VuZHMgPSB7XG4gICAgICBsZWZ0OiAtbm9kZS5vZmZzZXRMZWZ0ICsgaW50KHBhcmVudFN0eWxlLnBhZGRpbmdMZWZ0KSArXG4gICAgICAgICAgICBpbnQobm9kZVN0eWxlLmJvcmRlckxlZnRXaWR0aCkgKyBpbnQobm9kZVN0eWxlLm1hcmdpbkxlZnQpLFxuICAgICAgdG9wOiAtbm9kZS5vZmZzZXRUb3AgKyBpbnQocGFyZW50U3R5bGUucGFkZGluZ1RvcCkgK1xuICAgICAgICAgICAgaW50KG5vZGVTdHlsZS5ib3JkZXJUb3BXaWR0aCkgKyBpbnQobm9kZVN0eWxlLm1hcmdpblRvcCksXG4gICAgICByaWdodDogaW5uZXJXaWR0aChwYXJlbnQpIC0gb3V0ZXJXaWR0aChub2RlKSAtIG5vZGUub2Zmc2V0TGVmdCxcbiAgICAgIGJvdHRvbTogaW5uZXJIZWlnaHQocGFyZW50KSAtIG91dGVySGVpZ2h0KG5vZGUpIC0gbm9kZS5vZmZzZXRUb3BcbiAgICB9O1xuICB9XG5cbiAgLy8gS2VlcCB4IGFuZCB5IGJlbG93IHJpZ2h0IGFuZCBib3R0b20gbGltaXRzLi4uXG4gIGlmIChpc051bShib3VuZHMucmlnaHQpKSBjbGllbnRYID0gTWF0aC5taW4oY2xpZW50WCwgYm91bmRzLnJpZ2h0KTtcbiAgaWYgKGlzTnVtKGJvdW5kcy5ib3R0b20pKSBjbGllbnRZID0gTWF0aC5taW4oY2xpZW50WSwgYm91bmRzLmJvdHRvbSk7XG5cbiAgLy8gQnV0IGFib3ZlIGxlZnQgYW5kIHRvcCBsaW1pdHMuXG4gIGlmIChpc051bShib3VuZHMubGVmdCkpIGNsaWVudFggPSBNYXRoLm1heChjbGllbnRYLCBib3VuZHMubGVmdCk7XG4gIGlmIChpc051bShib3VuZHMudG9wKSkgY2xpZW50WSA9IE1hdGgubWF4KGNsaWVudFksIGJvdW5kcy50b3ApO1xuXG4gIHJldHVybiBbY2xpZW50WCwgY2xpZW50WV07XG59XG5cbmZ1bmN0aW9uIHNuYXBUb0dyaWQoZ3JpZCwgcGVuZGluZ1gsIHBlbmRpbmdZKSB7XG4gIHZhciB4ID0gTWF0aC5yb3VuZChwZW5kaW5nWCAvIGdyaWRbMF0pICogZ3JpZFswXTtcbiAgdmFyIHkgPSBNYXRoLnJvdW5kKHBlbmRpbmdZIC8gZ3JpZFsxXSkgKiBncmlkWzFdO1xuICByZXR1cm4gW3gsIHldO1xufVxuXG4vLyBVc2VmdWwgZm9yIHByZXZlbnRpbmcgYmx1ZSBoaWdobGlnaHRzIGFsbCBvdmVyIGV2ZXJ5dGhpbmcgd2hlbiBkcmFnZ2luZy5cbnZhciB1c2VyU2VsZWN0U3R5bGUgPSAnO3VzZXItc2VsZWN0OiBub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7JyArXG4gICctby11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lOyc7XG5cbmZ1bmN0aW9uIGFkZFVzZXJTZWxlY3RTdHlsZXMoZHJhZ2dhYmxlKSB7XG4gIGlmICghZHJhZ2dhYmxlLnByb3BzLmVuYWJsZVVzZXJTZWxlY3RIYWNrKSByZXR1cm47XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmJvZHkuZ2V0QXR0cmlidXRlKCdzdHlsZScpIHx8ICcnO1xuICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSArIHVzZXJTZWxlY3RTdHlsZSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVVzZXJTZWxlY3RTdHlsZXMoZHJhZ2dhYmxlKSB7XG4gIGlmICghZHJhZ2dhYmxlLnByb3BzLmVuYWJsZVVzZXJTZWxlY3RIYWNrKSByZXR1cm47XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmJvZHkuZ2V0QXR0cmlidXRlKCdzdHlsZScpIHx8ICcnO1xuICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZS5yZXBsYWNlKHVzZXJTZWxlY3RTdHlsZSwgJycpKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ1NTVHJhbnNmb3JtKHN0eWxlKSB7XG4gIC8vIFJlcGxhY2UgdW5pdGxlc3MgaXRlbXMgd2l0aCBweFxuICB2YXIgeCA9IHN0eWxlLnggKyAncHgnO1xuICB2YXIgeSA9IHN0eWxlLnkgKyAncHgnO1xuICByZXR1cm4ge1xuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgnICsgeCArICcsJyArIHkgKyAnKScsXG4gICAgV2Via2l0VHJhbnNmb3JtOiAndHJhbnNsYXRlKCcgKyB4ICsgJywnICsgeSArICcpJyxcbiAgICBPVHJhbnNmb3JtOiAndHJhbnNsYXRlKCcgKyB4ICsgJywnICsgeSArICcpJyxcbiAgICBtc1RyYW5zZm9ybTogJ3RyYW5zbGF0ZSgnICsgeCArICcsJyArIHkgKyAnKScsXG4gICAgTW96VHJhbnNmb3JtOiAndHJhbnNsYXRlKCcgKyB4ICsgJywnICsgeSArICcpJ1xuICB9O1xufVxuXG5cbi8vXG4vLyBFbmQgSGVscGVycy5cbi8vXG5cbi8vXG4vLyBEZWZpbmUgPERyYWdnYWJsZT5cbi8vXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ0RyYWdnYWJsZScsXG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgLyoqXG4gICAgICogYGF4aXNgIGRldGVybWluZXMgd2hpY2ggYXhpcyB0aGUgZHJhZ2dhYmxlIGNhbiBtb3ZlLlxuICAgICAqXG4gICAgICogJ2JvdGgnIGFsbG93cyBtb3ZlbWVudCBob3Jpem9udGFsbHkgYW5kIHZlcnRpY2FsbHkuXG4gICAgICogJ3gnIGxpbWl0cyBtb3ZlbWVudCB0byBob3Jpem9udGFsIGF4aXMuXG4gICAgICogJ3knIGxpbWl0cyBtb3ZlbWVudCB0byB2ZXJ0aWNhbCBheGlzLlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gJ2JvdGgnLlxuICAgICAqL1xuICAgIGF4aXM6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ2JvdGgnLCAneCcsICd5J10pLFxuXG4gICAgLyoqXG4gICAgICogYGJvdW5kc2AgZGV0ZXJtaW5lcyB0aGUgcmFuZ2Ugb2YgbW92ZW1lbnQgYXZhaWxhYmxlIHRvIHRoZSBlbGVtZW50LlxuICAgICAqIEF2YWlsYWJsZSB2YWx1ZXMgYXJlOlxuICAgICAqXG4gICAgICogJ3BhcmVudCcgcmVzdHJpY3RzIG1vdmVtZW50IHdpdGhpbiB0aGUgRHJhZ2dhYmxlJ3MgcGFyZW50IG5vZGUuXG4gICAgICpcbiAgICAgKiBBbHRlcm5hdGl2ZWx5LCBwYXNzIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllcywgYWxsIG9mIHdoaWNoIGFyZSBvcHRpb25hbDpcbiAgICAgKlxuICAgICAqIHtsZWZ0OiBMRUZUX0JPVU5ELCByaWdodDogUklHSFRfQk9VTkQsIGJvdHRvbTogQk9UVE9NX0JPVU5ELCB0b3A6IFRPUF9CT1VORH1cbiAgICAgKlxuICAgICAqIEFsbCB2YWx1ZXMgYXJlIGluIHB4LlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzeFxuICAgICAqICAgdmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAgKiAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgIHJldHVybiAoXG4gICAgICogICAgICAgICAgICA8RHJhZ2dhYmxlIGJvdW5kcz17e3JpZ2h0OiAzMDAsIGJvdHRvbTogMzAwfX0+XG4gICAgICogICAgICAgICAgICAgIDxkaXY+Q29udGVudDwvZGl2PlxuICAgICAqICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICk7XG4gICAgICogICAgICAgfVxuICAgICAqICAgfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgYm91bmRzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGxlZnQ6IFJlYWN0LlByb3BUeXBlcy5OdW1iZXIsXG4gICAgICAgIHJpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMuTnVtYmVyLFxuICAgICAgICB0b3A6IFJlYWN0LlByb3BUeXBlcy5OdW1iZXIsXG4gICAgICAgIGJvdHRvbTogUmVhY3QuUHJvcFR5cGVzLk51bWJlclxuICAgICAgfSksXG4gICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydwYXJlbnQnLCBmYWxzZV0pXG4gICAgXSksXG5cbiAgICAvKipcbiAgICAgKiBCeSBkZWZhdWx0LCB3ZSBhZGQgJ3VzZXItc2VsZWN0Om5vbmUnIGF0dHJpYnV0ZXMgdG8gdGhlIGRvY3VtZW50IGJvZHlcbiAgICAgKiB0byBwcmV2ZW50IHVnbHkgdGV4dCBzZWxlY3Rpb24gZHVyaW5nIGRyYWcuIElmIHRoaXMgaXMgY2F1c2luZyBwcm9ibGVtc1xuICAgICAqIGZvciB5b3VyIGFwcCwgc2V0IHRoaXMgdG8gYGZhbHNlYC5cbiAgICAgKi9cbiAgICBlbmFibGVVc2VyU2VsZWN0SGFjazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvKipcbiAgICAgKiBgaGFuZGxlYCBzcGVjaWZpZXMgYSBzZWxlY3RvciB0byBiZSB1c2VkIGFzIHRoZSBoYW5kbGUgdGhhdCBpbml0aWF0ZXMgZHJhZy5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIHZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICByZXR1cm4gKFxuICAgICAqICAgICAgICAgICAgPERyYWdnYWJsZSBoYW5kbGU9XCIuaGFuZGxlXCI+XG4gICAgICogICAgICAgICAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhhbmRsZVwiPkNsaWNrIG1lIHRvIGRyYWc8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDxkaXY+VGhpcyBpcyBzb21lIG90aGVyIGNvbnRlbnQ8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICogICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBoYW5kbGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBgY2FuY2VsYCBzcGVjaWZpZXMgYSBzZWxlY3RvciB0byBiZSB1c2VkIHRvIHByZXZlbnQgZHJhZyBpbml0aWFsaXphdGlvbi5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIHZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgIHJldHVybihcbiAgICAgKiAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgY2FuY2VsPVwiLmNhbmNlbFwiPlxuICAgICAqICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhbmNlbFwiPllvdSBjYW4ndCBkcmFnIGZyb20gaGVyZTwvZGl2PlxuICAgICAqICAgICAgICAgICAgPGRpdj5EcmFnZ2luZyBoZXJlIHdvcmtzIGZpbmU8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgICApO1xuICAgICAqICAgICAgIH1cbiAgICAgKiAgIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGNhbmNlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIGBncmlkYCBzcGVjaWZpZXMgdGhlIHggYW5kIHkgdGhhdCBkcmFnZ2luZyBzaG91bGQgc25hcCB0by5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIHZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgIHJldHVybiAoXG4gICAgICogICAgICAgICAgICAgICA8RHJhZ2dhYmxlIGdyaWQ9e1syNSwgMjVdfT5cbiAgICAgKiAgICAgICAgICAgICAgICAgICA8ZGl2Pkkgc25hcCB0byBhIDI1IHggMjUgZ3JpZDwvZGl2PlxuICAgICAqICAgICAgICAgICAgICAgPC9EcmFnZ2FibGU+XG4gICAgICogICAgICAgICAgICk7XG4gICAgICogICAgICAgfVxuICAgICAqICAgfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgZ3JpZDogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG5cbiAgICAvKipcbiAgICAgKiBgc3RhcnRgIHNwZWNpZmllcyB0aGUgeCBhbmQgeSB0aGF0IHRoZSBkcmFnZ2VkIGl0ZW0gc2hvdWxkIHN0YXJ0IGF0XG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganN4XG4gICAgICogICAgICB2YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAqICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAqICAgICAgICAgICAgICAgICAgPERyYWdnYWJsZSBzdGFydD17e3g6IDI1LCB5OiAyNX19PlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIDxkaXY+SSBzdGFydCB3aXRoIHRyYW5zZm9ybVg6IDI1cHggYW5kIHRyYW5zZm9ybVk6IDI1cHg7PC9kaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICAgICAgKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICogICAgICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBzdGFydDogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICB5OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG4gICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBgbW92ZU9uU3RhcnRDaGFuZ2VgLCBpZiB0cnVlIChkZWZhdWx0IGZhbHNlKSB3aWxsIG1vdmUgdGhlIGVsZW1lbnQgaWYgdGhlIGBzdGFydGBcbiAgICAgKiBwcm9wZXJ0eSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIG1vdmVPblN0YXJ0Q2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblxuXG4gICAgLyoqXG4gICAgICogYHpJbmRleGAgc3BlY2lmaWVzIHRoZSB6SW5kZXggdG8gdXNlIHdoaWxlIGRyYWdnaW5nLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzeFxuICAgICAqICAgdmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAgKiAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgekluZGV4PXsxMDB9PlxuICAgICAqICAgICAgICAgICAgICAgICAgIDxkaXY+SSBoYXZlIGEgekluZGV4PC9kaXY+XG4gICAgICogICAgICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICB6SW5kZXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBkcmFnZ2luZyBzdGFydHMuXG4gICAgICogSWYgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBib29sZWFuIGZhbHNlLCBkcmFnZ2luZyB3aWxsIGJlIGNhbmNlbGVkLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogIGZ1bmN0aW9uIChldmVudCwgdWkpIHt9XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBgZXZlbnRgIGlzIHRoZSBFdmVudCB0aGF0IHdhcyB0cmlnZ2VyZWQuXG4gICAgICogYHVpYCBpcyBhbiBvYmplY3Q6XG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqICB7XG4gICAgICogICAgcG9zaXRpb246IHt0b3A6IDAsIGxlZnQ6IDB9XG4gICAgICogIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBvblN0YXJ0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGlsZSBkcmFnZ2luZy5cbiAgICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGJvb2xlYW4gZmFsc2UsIGRyYWdnaW5nIHdpbGwgYmUgY2FuY2VsZWQuXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganNcbiAgICAgKiAgZnVuY3Rpb24gKGV2ZW50LCB1aSkge31cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIGBldmVudGAgaXMgdGhlIEV2ZW50IHRoYXQgd2FzIHRyaWdnZXJlZC5cbiAgICAgKiBgdWlgIGlzIGFuIG9iamVjdDpcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogIHtcbiAgICAgKiAgICBwb3NpdGlvbjoge3RvcDogMCwgbGVmdDogMH1cbiAgICAgKiAgfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIG9uRHJhZzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBkcmFnZ2luZyBzdG9wcy5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqICBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7fVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogYGV2ZW50YCBpcyB0aGUgRXZlbnQgdGhhdCB3YXMgdHJpZ2dlcmVkLlxuICAgICAqIGB1aWAgaXMgYW4gb2JqZWN0OlxuICAgICAqXG4gICAgICogYGBganNcbiAgICAgKiAge1xuICAgICAqICAgIHBvc2l0aW9uOiB7dG9wOiAwLCBsZWZ0OiAwfVxuICAgICAqICB9XG4gICAgICogYGBgXG4gICAgICovXG4gICAgb25TdG9wOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAgIC8qKlxuICAgICAqIEEgd29ya2Fyb3VuZCBvcHRpb24gd2hpY2ggY2FuIGJlIHBhc3NlZCBpZiBvbk1vdXNlRG93biBuZWVkcyB0byBiZSBhY2Nlc3NlZCxcbiAgICAgKiBzaW5jZSBpdCdsbCBhbHdheXMgYmUgYmxvY2tlZCAoZHVlIHRvIHRoYXQgdGhlcmUncyBpbnRlcm5hbCB1c2Ugb2Ygb25Nb3VzZURvd24pXG4gICAgICovXG4gICAgb25Nb3VzZURvd246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5ld1Byb3BzKSB7XG4gICAgLy8gUmVhY3QgdG8gY2hhbmdlcyBpbiB0aGUgJ3N0YXJ0JyBwYXJhbS5cbiAgICBpZiAobmV3UHJvcHMubW92ZU9uU3RhcnRDaGFuZ2UgJiYgbmV3UHJvcHMuc3RhcnQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5nZXRJbml0aWFsU3RhdGUobmV3UHJvcHMpKTtcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFJlbW92ZSBhbnkgbGVmdG92ZXIgZXZlbnQgaGFuZGxlcnNcbiAgICByZW1vdmVFdmVudCh3aW5kb3csIGRyYWdFdmVudEZvclsnbW92ZSddLCB0aGlzLmhhbmRsZURyYWcpO1xuICAgIHJlbW92ZUV2ZW50KHdpbmRvdywgZHJhZ0V2ZW50Rm9yWydlbmQnXSwgdGhpcy5oYW5kbGVEcmFnRW5kKTtcbiAgICByZW1vdmVVc2VyU2VsZWN0U3R5bGVzKHRoaXMpO1xuICB9LFxuXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBheGlzOiAnYm90aCcsXG4gICAgICBib3VuZHM6IGZhbHNlLFxuICAgICAgaGFuZGxlOiBudWxsLFxuICAgICAgY2FuY2VsOiBudWxsLFxuICAgICAgZ3JpZDogbnVsbCxcbiAgICAgIG1vdmVPblN0YXJ0Q2hhbmdlOiBmYWxzZSxcbiAgICAgIHN0YXJ0OiB7eDogMCwgeTogMH0sXG4gICAgICB6SW5kZXg6IE5hTixcbiAgICAgIGVuYWJsZVVzZXJTZWxlY3RIYWNrOiB0cnVlLFxuICAgICAgb25TdGFydDogZW1wdHlGdW5jdGlvbixcbiAgICAgIG9uRHJhZzogZW1wdHlGdW5jdGlvbixcbiAgICAgIG9uU3RvcDogZW1wdHlGdW5jdGlvbixcbiAgICAgIG9uTW91c2VEb3duOiBlbXB0eUZ1bmN0aW9uXG4gICAgfTtcbiAgfSxcblxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIChwcm9wcykge1xuICAgIC8vIEhhbmRsZSBjYWxsIGZyb20gQ1dSUFxuICAgIHByb3BzID0gcHJvcHMgfHwgdGhpcy5wcm9wcztcbiAgICByZXR1cm4ge1xuICAgICAgLy8gV2hldGhlciBvciBub3Qgd2UgYXJlIGN1cnJlbnRseSBkcmFnZ2luZy5cbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcblxuICAgICAgLy8gT2Zmc2V0IGJldHdlZW4gc3RhcnQgdG9wL2xlZnQgYW5kIG1vdXNlIHRvcC9sZWZ0IHdoaWxlIGRyYWdnaW5nLlxuICAgICAgb2Zmc2V0WDogMCwgb2Zmc2V0WTogMCxcblxuICAgICAgLy8gQ3VycmVudCB0cmFuc2Zvcm0geCBhbmQgeS5cbiAgICAgIGNsaWVudFg6IHByb3BzLnN0YXJ0LngsIGNsaWVudFk6IHByb3BzLnN0YXJ0LnlcbiAgICB9O1xuICB9LFxuXG4gIGhhbmRsZURyYWdTdGFydDogZnVuY3Rpb24gKGUpIHtcbiAgICAvLyB0b2RvOiB3cml0ZSByaWdodCBpbXBsZW1lbnRhdGlvbiB0byBwcmV2ZW50IG11bHRpdG91Y2ggZHJhZ1xuICAgIC8vIHByZXZlbnQgbXVsdGktdG91Y2ggZXZlbnRzXG4gICAgLy8gaWYgKGlzTXVsdGlUb3VjaChlKSkge1xuICAgIC8vICAgICB0aGlzLmhhbmRsZURyYWdFbmQuYXBwbHkoZSwgYXJndW1lbnRzKTtcbiAgICAvLyAgICAgcmV0dXJuXG4gICAgLy8gfVxuXG4gICAgLy8gTWFrZSBpdCBwb3NzaWJsZSB0byBhdHRhY2ggZXZlbnQgaGFuZGxlcnMgb24gdG9wIG9mIHRoaXMgb25lXG4gICAgdGhpcy5wcm9wcy5vbk1vdXNlRG93bihlKTtcblxuICAgIC8vIFNob3J0IGNpcmN1aXQgaWYgaGFuZGxlIG9yIGNhbmNlbCBwcm9wIHdhcyBwcm92aWRlZCBhbmQgc2VsZWN0b3IgZG9lc24ndCBtYXRjaFxuICAgIGlmICgodGhpcy5wcm9wcy5oYW5kbGUgJiYgIW1hdGNoZXNTZWxlY3RvcihlLnRhcmdldCwgdGhpcy5wcm9wcy5oYW5kbGUpKSB8fFxuICAgICAgKHRoaXMucHJvcHMuY2FuY2VsICYmIG1hdGNoZXNTZWxlY3RvcihlLnRhcmdldCwgdGhpcy5wcm9wcy5jYW5jZWwpKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENhbGwgZXZlbnQgaGFuZGxlci4gSWYgaXQgcmV0dXJucyBleHBsaWNpdCBmYWxzZSwgY2FuY2VsLlxuICAgIHZhciBzaG91bGRTdGFydCA9IHRoaXMucHJvcHMub25TdGFydChlLCBjcmVhdGVVSUV2ZW50KHRoaXMpKTtcbiAgICBpZiAoc2hvdWxkU3RhcnQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICB2YXIgZHJhZ1BvaW50ID0gZ2V0Q29udHJvbFBvc2l0aW9uKGUpO1xuXG4gICAgLy8gQWRkIGEgc3R5bGUgdG8gdGhlIGJvZHkgdG8gZGlzYWJsZSB1c2VyLXNlbGVjdC4gVGhpcyBwcmV2ZW50cyB0ZXh0IGZyb21cbiAgICAvLyBiZWluZyBzZWxlY3RlZCBhbGwgb3ZlciB0aGUgcGFnZS5cbiAgICBhZGRVc2VyU2VsZWN0U3R5bGVzKHRoaXMpO1xuXG4gICAgLy8gSW5pdGlhdGUgZHJhZ2dpbmcuIFNldCB0aGUgY3VycmVudCB4IGFuZCB5IGFzIG9mZnNldHNcbiAgICAvLyBzbyB3ZSBrbm93IGhvdyBtdWNoIHdlJ3ZlIG1vdmVkIGR1cmluZyB0aGUgZHJhZy4gVGhpcyBhbGxvd3MgdXNcbiAgICAvLyB0byBkcmFnIGVsZW1lbnRzIGFyb3VuZCBldmVuIGlmIHRoZXkgaGF2ZSBiZWVuIG1vdmVkLCB3aXRob3V0IGlzc3VlLlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJhZ2dpbmc6IHRydWUsXG4gICAgICBvZmZzZXRYOiBkcmFnUG9pbnQuY2xpZW50WCAtIHRoaXMuc3RhdGUuY2xpZW50WCxcbiAgICAgIG9mZnNldFk6IGRyYWdQb2ludC5jbGllbnRZIC0gdGhpcy5zdGF0ZS5jbGllbnRZXG4gICAgfSk7XG5cblxuICAgIC8vIEFkZCBldmVudCBoYW5kbGVyc1xuICAgIGFkZEV2ZW50KHdpbmRvdywgZHJhZ0V2ZW50Rm9yWydtb3ZlJ10sIHRoaXMuaGFuZGxlRHJhZyk7XG4gICAgYWRkRXZlbnQod2luZG93LCBkcmFnRXZlbnRGb3JbJ2VuZCddLCB0aGlzLmhhbmRsZURyYWdFbmQpO1xuICB9LFxuXG4gIGhhbmRsZURyYWdFbmQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgLy8gU2hvcnQgY2lyY3VpdCBpZiBub3QgY3VycmVudGx5IGRyYWdnaW5nXG4gICAgaWYgKCF0aGlzLnN0YXRlLmRyYWdnaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVtb3ZlVXNlclNlbGVjdFN0eWxlcyh0aGlzKTtcblxuICAgIC8vIFR1cm4gb2ZmIGRyYWdnaW5nXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcmFnZ2luZzogZmFsc2VcbiAgICB9KTtcblxuICAgIC8vIENhbGwgZXZlbnQgaGFuZGxlclxuICAgIHRoaXMucHJvcHMub25TdG9wKGUsIGNyZWF0ZVVJRXZlbnQodGhpcykpO1xuXG4gICAgLy8gUmVtb3ZlIGV2ZW50IGhhbmRsZXJzXG4gICAgcmVtb3ZlRXZlbnQod2luZG93LCBkcmFnRXZlbnRGb3JbJ21vdmUnXSwgdGhpcy5oYW5kbGVEcmFnKTtcbiAgICByZW1vdmVFdmVudCh3aW5kb3csIGRyYWdFdmVudEZvclsnZW5kJ10sIHRoaXMuaGFuZGxlRHJhZ0VuZCk7XG4gIH0sXG5cbiAgaGFuZGxlRHJhZzogZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgZHJhZ1BvaW50ID0gZ2V0Q29udHJvbFBvc2l0aW9uKGUpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIFggYW5kIFlcbiAgICB2YXIgY2xpZW50WCA9IGRyYWdQb2ludC5jbGllbnRYIC0gdGhpcy5zdGF0ZS5vZmZzZXRYO1xuICAgIHZhciBjbGllbnRZID0gZHJhZ1BvaW50LmNsaWVudFkgLSB0aGlzLnN0YXRlLm9mZnNldFk7XG5cbiAgICAvLyBTbmFwIHRvIGdyaWQgaWYgcHJvcCBoYXMgYmVlbiBwcm92aWRlZFxuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuZ3JpZCkpIHtcbiAgICAgIHZhciBjb29yZHMgPSBzbmFwVG9HcmlkKHRoaXMucHJvcHMuZ3JpZCwgY2xpZW50WCwgY2xpZW50WSk7XG4gICAgICBjbGllbnRYID0gY29vcmRzWzBdLCBjbGllbnRZID0gY29vcmRzWzFdO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmJvdW5kcykge1xuICAgICAgdmFyIHBvcyA9IGdldEJvdW5kUG9zaXRpb24odGhpcywgY2xpZW50WCwgY2xpZW50WSk7XG4gICAgICBjbGllbnRYID0gcG9zWzBdLCBjbGllbnRZID0gcG9zWzFdO1xuICAgIH1cblxuICAgIC8vIENhbGwgZXZlbnQgaGFuZGxlci4gSWYgaXQgcmV0dXJucyBleHBsaWNpdCBmYWxzZSwgY2FuY2VsLlxuICAgIHZhciBzaG91bGRVcGRhdGUgPSB0aGlzLnByb3BzLm9uRHJhZyhlLCBjcmVhdGVVSUV2ZW50KHRoaXMpKTtcbiAgICBpZiAoc2hvdWxkVXBkYXRlID09PSBmYWxzZSkgcmV0dXJuIHRoaXMuaGFuZGxlRHJhZ0VuZCgpO1xuXG4gICAgLy8gVXBkYXRlIHRyYW5zZm9ybVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2xpZW50WDogY2xpZW50WCxcbiAgICAgIGNsaWVudFk6IGNsaWVudFlcbiAgICB9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBDcmVhdGUgc3R5bGUgb2JqZWN0LiBXZSBleHRlbmQgZnJvbSBleGlzdGluZyBzdHlsZXMgc28gd2UgZG9uJ3RcbiAgICAvLyByZW1vdmUgYW55dGhpbmcgYWxyZWFkeSBzZXQgKGxpa2UgYmFja2dyb3VuZCwgY29sb3IsIGV0YykuXG4gICAgdmFyIGNoaWxkU3R5bGUgPSB0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLnN0eWxlIHx8IHt9O1xuXG4gICAgLy8gQWRkIGEgQ1NTIHRyYW5zZm9ybSB0byBtb3ZlIHRoZSBlbGVtZW50IGFyb3VuZC4gVGhpcyBhbGxvd3MgdXMgdG8gbW92ZSB0aGUgZWxlbWVudCBhcm91bmRcbiAgICAvLyB3aXRob3V0IHdvcnJ5aW5nIGFib3V0IHdoZXRoZXIgb3Igbm90IGl0IGlzIHJlbGF0aXZlbHkgb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkLlxuICAgIC8vIElmIHRoZSBpdGVtIHlvdSBhcmUgZHJhZ2dpbmcgYWxyZWFkeSBoYXMgYSB0cmFuc2Zvcm0gc2V0LCB3cmFwIGl0IGluIGEgPHNwYW4+IHNvIDxEcmFnZ2FibGU+XG4gICAgLy8gaGFzIGEgY2xlYW4gc2xhdGUuXG4gICAgdmFyIHRyYW5zZm9ybSA9IGNyZWF0ZUNTU1RyYW5zZm9ybSh7XG4gICAgICAvLyBTZXQgbGVmdCBpZiBob3Jpem9udGFsIGRyYWcgaXMgZW5hYmxlZFxuICAgICAgeDogY2FuRHJhZ1godGhpcykgP1xuICAgICAgICB0aGlzLnN0YXRlLmNsaWVudFggOlxuICAgICAgICAwLFxuXG4gICAgICAvLyBTZXQgdG9wIGlmIHZlcnRpY2FsIGRyYWcgaXMgZW5hYmxlZFxuICAgICAgeTogY2FuRHJhZ1kodGhpcykgP1xuICAgICAgICB0aGlzLnN0YXRlLmNsaWVudFkgOlxuICAgICAgICAwXG4gICAgfSk7XG4gICAgdmFyIHN0eWxlID0gYXNzaWduKHt9LCBjaGlsZFN0eWxlLCB0cmFuc2Zvcm0pO1xuXG4gICAgLy8gU2V0IHpJbmRleCBpZiBjdXJyZW50bHkgZHJhZ2dpbmcgYW5kIHByb3AgaGFzIGJlZW4gcHJvdmlkZWRcbiAgICBpZiAodGhpcy5zdGF0ZS5kcmFnZ2luZyAmJiAhaXNOYU4odGhpcy5wcm9wcy56SW5kZXgpKSB7XG4gICAgICBzdHlsZS56SW5kZXggPSB0aGlzLnByb3BzLnpJbmRleDtcbiAgICB9XG5cbiAgICB2YXIgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygodGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5jbGFzc05hbWUgfHwgJycpLCAncmVhY3QtZHJhZ2dhYmxlJywge1xuICAgICAgJ3JlYWN0LWRyYWdnYWJsZS1kcmFnZ2luZyc6IHRoaXMuc3RhdGUuZHJhZ2dpbmcsXG4gICAgICAncmVhY3QtZHJhZ2dhYmxlLWRyYWdnZWQnOiB0aGlzLnN0YXRlLmRyYWdnZWRcbiAgICB9KTtcblxuICAgIC8vIFJldXNlIHRoZSBjaGlsZCBwcm92aWRlZFxuICAgIC8vIFRoaXMgbWFrZXMgaXQgZmxleGlibGUgdG8gdXNlIHdoYXRldmVyIGVsZW1lbnQgaXMgd2FudGVkIChkaXYsIHVsLCBldGMpXG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChSZWFjdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pLCB7XG4gICAgICBzdHlsZTogc3R5bGUsXG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcblxuICAgICAgb25Nb3VzZURvd246IHRoaXMuaGFuZGxlRHJhZ1N0YXJ0LFxuICAgICAgb25Ub3VjaFN0YXJ0OiBmdW5jdGlvbihldil7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgZm9yIHNjcm9sbFxuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVEcmFnU3RhcnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH0uYmluZCh0aGlzKSxcblxuICAgICAgb25Nb3VzZVVwOiB0aGlzLmhhbmRsZURyYWdFbmQsXG4gICAgICBvblRvdWNoRW5kOiB0aGlzLmhhbmRsZURyYWdFbmRcbiAgICB9KTtcbiAgfVxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9kcmFnZ2FibGUuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJSZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBUb09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIGtleXM7XG5cdHZhciB0byA9IFRvT2JqZWN0KHRhcmdldCk7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gYXJndW1lbnRzW3NdO1xuXHRcdGtleXMgPSBPYmplY3Qua2V5cyhPYmplY3QoZnJvbSkpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0b1trZXlzW2ldXSA9IGZyb21ba2V5c1tpXV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9vYmplY3QtYXNzaWduL2luZGV4LmpzXG4gKiovIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNSBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuXG5mdW5jdGlvbiBjbGFzc05hbWVzKCkge1xuXHR2YXIgY2xhc3NlcyA9ICcnO1xuXHR2YXIgYXJnO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0YXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdGlmICghYXJnKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBhcmcgfHwgJ251bWJlcicgPT09IHR5cGVvZiBhcmcpIHtcblx0XHRcdGNsYXNzZXMgKz0gJyAnICsgYXJnO1xuXHRcdH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcblx0XHRcdGNsYXNzZXMgKz0gJyAnICsgY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdH0gZWxzZSBpZiAoJ29iamVjdCcgPT09IHR5cGVvZiBhcmcpIHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0aWYgKCFhcmcuaGFzT3duUHJvcGVydHkoa2V5KSB8fCAhYXJnW2tleV0pIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjbGFzc2VzICs9ICcgJyArIGtleTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGNsYXNzZXMuc3Vic3RyKDEpO1xufVxuXG4vLyBzYWZlbHkgZXhwb3J0IGNsYXNzTmFtZXMgZm9yIG5vZGUgLyBicm93c2VyaWZ5XG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xufVxuXG4vLyBzYWZlbHkgZXhwb3J0IGNsYXNzTmFtZXMgZm9yIFJlcXVpcmVKU1xuaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHR9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jbGFzc25hbWVzL2luZGV4LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==