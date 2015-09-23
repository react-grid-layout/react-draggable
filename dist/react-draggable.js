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
	var browserPrefix = __webpack_require__(5)();
	
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
	
	function canDragX(draggable) {
	  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
	}
	
	function canDragY(draggable) {
	  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
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
	
	var matchesSelectorFunc = '';
	function matchesSelector(el, selector) {
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
	
	/**
	 * simple abstraction for dragging events names
	 * */
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
	
	// Default to mouse events
	var dragEventFor = eventsFor.mouse;
	
	/**
	 * get {clientX, clientY} positions of control
	 * */
	function getControlPosition(e) {
	  var position = (e.targetTouches && e.targetTouches[0]) || e;
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
	var userSelectStyle = ';user-select: none;';
	if (browserPrefix) {
	  userSelectStyle += '-' + browserPrefix.toLowerCase() + '-user-select: none;';
	}
	
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
	  var out = {transform: 'translate(' + x + ',' + y + ')'};
	  // Add single prefixed property as well
	  if (browserPrefix) {
	    out[browserPrefix + 'Transform'] = out.transform;
	  }
	  return out;
	}
	
	function createSVGTransform(args) {
	  return 'translate(' + args.x + ',' + args.y + ')';
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
	
	    /**
	     * Would ideally like to test if child element is an instanceof SVG but there is currently
	     * no reliable way to do this, esp. if SVG is not properly namespaced.
	     */
	    isSVG: React.PropTypes.bool
	  },
	
	  componentWillReceiveProps: function(newProps) {
	    // React to changes in the 'start' param.
	    if (newProps.moveOnStartChange && newProps.start) {
	      this.setState(this.getInitialState(newProps));
	    }
	  },
	
	  componentWillUnmount: function() {
	    // Remove any leftover event handlers
	    removeEvent(document, dragEventFor.move, this.handleDrag);
	    removeEvent(document, dragEventFor.end, this.handleDragEnd);
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
	      onMouseDown: emptyFunction,
	      isSVG: false
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
	    // Set touch identifier in component state if this is a touch event
	    if(e.targetTouches){
	      this.setState({touchIdentifier: e.targetTouches[0].identifier});
	    }
	    
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
	      offsetY: dragPoint.clientY - this.state.clientY,
	      scrollX: document.body.scrollLeft,
	      scrollY: document.body.scrollTop
	    });
	
	
	    // Add event handlers
	    addEvent(document, 'scroll', this.handleScroll);
	    addEvent(document, dragEventFor.move, this.handleDrag);
	    addEvent(document, dragEventFor.end, this.handleDragEnd);
	  },
	
	  handleDragEnd: function (e) {
	    // Short circuit if not currently dragging
	    if (!this.state.dragging) {
	      return;
	    }
	
	    // Short circuit if this is not the correct touch event
	    if(e.changedTouches && (e.changedTouches[0].identifier != this.state.touchIdentifier)){
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
	    removeEvent(document, 'scroll', this.handleScroll);
	    removeEvent(document, dragEventFor.move, this.handleDrag);
	    removeEvent(document, dragEventFor.end, this.handleDragEnd);
	  },
	
	  handleDrag: function (e) {
	    // Return if this is a touch event, but not the correct one for this element
	    if(e.targetTouches && (e.targetTouches[0].identifier != this.state.touchIdentifier)){
	      return;
	    }
	    var dragPoint = getControlPosition(e);
	
	    // Calculate X and Y
	    var clientX = dragPoint.clientX - this.state.offsetX;
	    var clientY = dragPoint.clientY - this.state.offsetY;
	
	    // Snap to grid if prop has been provided
	    if (Array.isArray(this.props.grid)) {
	      var coords = snapToGrid(this.props.grid, clientX, clientY);
	      clientX = coords[0];
	      clientY = coords[1];
	    }
	
	    if (this.props.bounds) {
	      var pos = getBoundPosition(this, clientX, clientY);
	      clientX = pos[0];
	      clientY = pos[1];
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
	
	  handleScroll: function(e) {
	    var s = this.state, x = document.body.scrollLeft, y = document.body.scrollTop;
	    var offsetX = x - s.scrollX, offsetY = y - s.scrollY;
	    this.setState({
	      scrollX: x,
	      scrollY: y,
	      clientX: s.clientX + offsetX,
	      clientY: s.clientY + offsetY,
	      offsetX: s.offsetX - offsetX,
	      offsetY: s.offsetY - offsetY
	    });
	  },
	
	  onMouseDown: function(ev) {
	    // Prevent 'ghost click' which happens 300ms after touchstart if the event isn't cancelled.
	    // We don't cancel the event on touchstart because of #37; we might want to make a scrollable item draggable.
	    // More on ghost clicks: http://ariatemplates.com/blog/2014/05/ghost-clicks-in-mobile-browsers/
	    if (dragEventFor === eventsFor.touch) {
	      return ev.preventDefault();
	    }
	
	    return this.handleDragStart.apply(this, arguments);
	  },
	
	  onTouchStart: function(ev) {
	    // We're on a touch device now, so change the event handlers
	    dragEventFor = eventsFor.touch;
	
	    return this.handleDragStart.apply(this, arguments);
	  },
	
	  // Intended for use by a parent component. Resets internal state on this component. Useful for
	  // <Resizable> and other components in case this element is manually resized and start/moveOnStartChange
	  // don't work for you.
	  resetState: function() {
	    this.setState({
	      offsetX: 0, offsetY: 0, clientX: 0, clientY: 0
	    });
	  },
	
	  // Determines if the node is of type SVGElement on mount
	  componentDidMount: function() {
	    //this.isElementSVG = isThisSVG(this.props.children);
	  },
	
	  render: function () {
	    // Create style object. We extend from existing styles so we don't
	    // remove anything already set (like background, color, etc).
	    var childStyle = this.props.children.props.style || {};
	
	    // Add a CSS transform to move the element around. This allows us to move the element around
	    // without worrying about whether or not it is relatively or absolutely positioned.
	    // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
	    // has a clean slate.
	    var transform = this.props.isSVG ? null :
	        createCSSTransform({
	          // Set left if horizontal drag is enabled
	          x: canDragX(this) ?
	            this.state.clientX :
	            this.props.start.x,
	
	          // Set top if vertical drag is enabled
	          y: canDragY(this) ?
	            this.state.clientY :
	            this.props.start.y
	        });
	
	    
	    var svgTransform = !this.props.isSVG ? null :
	        createSVGTransform({
	          // Set left if horizontal drag is enabled
	          x: canDragX(this) ?
	            this.state.clientX :
	            this.props.start.x,
	
	          // Set top if vertical drag is enabled
	          y: canDragY(this) ?
	            this.state.clientY :
	            this.props.start.y
	        });
	
	
	    // Workaround IE pointer events; see #51
	    // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
	    var touchHacks = {
	      touchAction: 'none'
	    };
	
	    var style = assign({}, childStyle, transform, touchHacks);
	
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
	      transform: svgTransform,
	      className: className,
	
	      onMouseDown: this.onMouseDown,
	      onTouchStart: this.onTouchStart,
	      onMouseUp: this.handleDragEnd,
	      onTouchEnd: this.handleDragEnd
	    });
	  }
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	
	(function () {
		'use strict';
	
		function classNames () {
	
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if ('string' === argType || 'number' === argType) {
					classes += ' ' + arg;
	
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
	
				} else if ('object' === argType) {
					for (var key in arg) {
						if (arg.hasOwnProperty(key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true){
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	
	}());


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function() {
	  if (typeof window === 'undefined') return '';
	  // Thanks David Walsh
	  var styles = window.getComputedStyle(document.documentElement, ''),
	  pre = (Array.prototype.slice
	        .call(styles)
	        .join('')
	        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
	      )[1];
	  // 'ms' is not titlecased
	  if (pre === 'ms') return pre;
	  return pre.slice(0, 1).toUpperCase() + pre.slice(1);
	};


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIi4uL3dlYnBhY2svYm9vdHN0cmFwIGZjYzU1MGE2ZDk1ZmE4ODc0NmZmIiwiLi4vLi9pbmRleC5qcyIsIi4uLy4vbGliL2RyYWdnYWJsZS5qcyIsIi4uL2V4dGVybmFsIFwiUmVhY3RcIiIsIi4uLy4vfi9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwiLi4vLi9+L2NsYXNzbmFtZXMvaW5kZXguanMiLCIuLi8uL2xpYi9nZXRQcmVmaXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLE9BQU0sQ0FBQyxPQUFPLEdBQUcsbUJBQU8sQ0FBQyxDQUFpQixDQUFDLENBQUM7Ozs7Ozs7QUNBNUMsYUFBWSxDQUFDOztBQUViLEtBQUksS0FBSyxHQUFHLG1CQUFPLENBQUMsQ0FBTyxDQUFDLENBQUM7QUFDN0IsS0FBSSxhQUFhLEdBQUcsVUFBVSxFQUFFLENBQUM7QUFDakMsS0FBSSxNQUFNLEdBQUcsbUJBQU8sQ0FBQyxDQUFlLENBQUMsQ0FBQztBQUN0QyxLQUFJLFVBQVUsR0FBRyxtQkFBTyxDQUFDLENBQVksQ0FBQyxDQUFDO0FBQ3ZDLEtBQUksYUFBYSxHQUFHLG1CQUFPLENBQUMsQ0FBYSxDQUFDLEVBQUUsQ0FBQzs7QUFFN0MsR0FBRTtBQUNGLHVEQUFzRDtBQUN0RCxHQUFFOztBQUVGLFVBQVMsYUFBYSxDQUFDLFNBQVMsRUFBRTs7R0FFaEMsSUFBSSxLQUFLLEdBQUcsU0FB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LENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVU7T0FDOUQsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVM7TUFDakUsQ0FBQztBQUNOLElBQUc7QUFDSDs7R0FFRSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyRSxHQUFFLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZFOztHQUVFLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25FLEdBQUUsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7O0dBRS9ELE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDNUIsRUFBQzs7QUFFRCxVQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtHQUM1QyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDakQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxD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QUcsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU07U0FDM0IsTUFBTSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtRQUMvQixDQUFDO09BQ0YsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUMsTUFBSyxDQUFDO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFJLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUksTUFBTSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUksTUFBTSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUksSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0tBRUksS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO09BQzNCLENBQUMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU07T0FDekIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxT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QVcsRUFBRSxPQUFPLEVBQUUsQ0FBQzs7R0FFN0MsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDO0dBQ2xFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSztVQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDO1VBQ1osSUFBSSxDQUFDLEVBQUUsQ0FBQztVQUNSLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxLQUFLLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3pFLFNBQVEsQ0FBQyxDQUFDLENBQUM7O0dBRVQsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFLE9BQU8sR0FBRyxDQUFDO0dBQzdCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNyRCxDQUFDIiwiZmlsZSI6Ii4vZGlzdC9yZWFjdC1kcmFnZ2FibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJSZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJSZWFjdERyYWdnYWJsZVwiXSA9IGZhY3RvcnkocmVxdWlyZShcIlJlYWN0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdERyYWdnYWJsZVwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmY2M1NTBhNmQ5NWZhODg3NDZmZlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvZHJhZ2dhYmxlJyk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbigpe307XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xudmFyIGNsYXNzTmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG52YXIgYnJvd3NlclByZWZpeCA9IHJlcXVpcmUoJy4vZ2V0UHJlZml4JykoKTtcblxuLy9cbi8vIEhlbHBlcnMuIFNlZSBFbGVtZW50IGRlZmluaXRpb24gYmVsb3cgdGhpcyBzZWN0aW9uLlxuLy9cblxuZnVuY3Rpb24gY3JlYXRlVUlFdmVudChkcmFnZ2FibGUpIHtcbiAgLy8gU3RhdGUgY2hhbmdlcyBhcmUgb2Z0ZW4gKGJ1dCBub3QgYWx3YXlzISkgYXN5bmMuIFdlIHdhbnQgdGhlIGxhdGVzdCB2YWx1ZS5cbiAgdmFyIHN0YXRlID0gZHJhZ2dhYmxlLl9wZW5kaW5nU3RhdGUgfHwgZHJhZ2dhYmxlLnN0YXRlO1xuICByZXR1cm4ge1xuICAgIG5vZGU6IGRyYWdnYWJsZS5nZXRET01Ob2RlKCksXG4gICAgcG9zaXRpb246IHtcbiAgICAgIHRvcDogc3RhdGUuY2xpZW50WSxcbiAgICAgIGxlZnQ6IHN0YXRlLmNsaWVudFhcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNhbkRyYWdYKGRyYWdnYWJsZSkge1xuICByZXR1cm4gZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICdib3RoJyB8fCBkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ3gnO1xufVxuXG5mdW5jdGlvbiBjYW5EcmFnWShkcmFnZ2FibGUpIHtcbiAgcmV0dXJuIGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAnYm90aCcgfHwgZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICd5Jztcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jKSB7XG4gIHJldHVybiB0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZnVuYykgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8vIEBjcmVkaXRzIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3JvZ296aG5pa29mZi9hNDNjZmVkMjdjNDFlNGU2OGNkY1xuZnVuY3Rpb24gZmluZEluQXJyYXkoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChjYWxsYmFjay5hcHBseShjYWxsYmFjaywgW2FycmF5W2ldLCBpLCBhcnJheV0pKSByZXR1cm4gYXJyYXlbaV07XG4gIH1cbn1cblxudmFyIG1hdGNoZXNTZWxlY3RvckZ1bmMgPSAnJztcbmZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvcihlbCwgc2VsZWN0b3IpIHtcbiAgaWYgKCFtYXRjaGVzU2VsZWN0b3JGdW5jKSB7XG4gICAgbWF0Y2hlc1NlbGVjdG9yRnVuYyA9IGZpbmRJbkFycmF5KFtcbiAgICAgICdtYXRjaGVzJyxcbiAgICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLFxuICAgICAgJ21vek1hdGNoZXNTZWxlY3RvcicsXG4gICAgICAnbXNNYXRjaGVzU2VsZWN0b3InLFxuICAgICAgJ29NYXRjaGVzU2VsZWN0b3InXG4gICAgXSwgZnVuY3Rpb24obWV0aG9kKXtcbiAgICAgIHJldHVybiBpc0Z1bmN0aW9uKGVsW21ldGhvZF0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGVsW21hdGNoZXNTZWxlY3RvckZ1bmNdLmNhbGwoZWwsIHNlbGVjdG9yKTtcbn1cblxuLyoqXG4gKiBzaW1wbGUgYWJzdHJhY3Rpb24gZm9yIGRyYWdnaW5nIGV2ZW50cyBuYW1lc1xuICogKi9cbnZhciBldmVudHNGb3IgPSB7XG4gIHRvdWNoOiB7XG4gICAgc3RhcnQ6ICd0b3VjaHN0YXJ0JyxcbiAgICBtb3ZlOiAndG91Y2htb3ZlJyxcbiAgICBlbmQ6ICd0b3VjaGVuZCdcbiAgfSxcbiAgbW91c2U6IHtcbiAgICBzdGFydDogJ21vdXNlZG93bicsXG4gICAgbW92ZTogJ21vdXNlbW92ZScsXG4gICAgZW5kOiAnbW91c2V1cCdcbiAgfVxufTtcblxuLy8gRGVmYXVsdCB0byBtb3VzZSBldmVudHNcbnZhciBkcmFnRXZlbnRGb3IgPSBldmVudHNGb3IubW91c2U7XG5cbi8qKlxuICogZ2V0IHtjbGllbnRYLCBjbGllbnRZfSBwb3NpdGlvbnMgb2YgY29udHJvbFxuICogKi9cbmZ1bmN0aW9uIGdldENvbnRyb2xQb3NpdGlvbihlKSB7XG4gIHZhciBwb3NpdGlvbiA9IChlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzWzBdKSB8fCBlO1xuICByZXR1cm4ge1xuICAgIGNsaWVudFg6IHBvc2l0aW9uLmNsaWVudFgsXG4gICAgY2xpZW50WTogcG9zaXRpb24uY2xpZW50WVxuICB9O1xufVxuXG5mdW5jdGlvbiBhZGRFdmVudChlbCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgaWYgKCFlbCkgeyByZXR1cm47IH1cbiAgaWYgKGVsLmF0dGFjaEV2ZW50KSB7XG4gICAgZWwuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgfSBlbHNlIGlmIChlbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgZWxbJ29uJyArIGV2ZW50XSA9IGhhbmRsZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZWwsIGV2ZW50LCBoYW5kbGVyKSB7XG4gIGlmICghZWwpIHsgcmV0dXJuOyB9XG4gIGlmIChlbC5kZXRhY2hFdmVudCkge1xuICAgIGVsLmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgaGFuZGxlcik7XG4gIH0gZWxzZSBpZiAoZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIGVsWydvbicgKyBldmVudF0gPSBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIG91dGVySGVpZ2h0KG5vZGUpIHtcbiAgLy8gVGhpcyBpcyBkZWxpYmVyYXRlbHkgZXhjbHVkaW5nIG1hcmdpbiBmb3Igb3VyIGNhbGN1bGF0aW9ucywgc2luY2Ugd2UgYXJlIHVzaW5nXG4gIC8vIG9mZnNldFRvcCB3aGljaCBpcyBpbmNsdWRpbmcgbWFyZ2luLiBTZWUgZ2V0Qm91bmRQb3NpdGlvblxuICB2YXIgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gIHZhciBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGhlaWdodCArPSBpbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BXaWR0aCk7XG4gIGhlaWdodCArPSBpbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJCb3R0b21XaWR0aCk7XG4gIHJldHVybiBoZWlnaHQ7XG59XG5cbmZ1bmN0aW9uIG91dGVyV2lkdGgobm9kZSkge1xuICAvLyBUaGlzIGlzIGRlbGliZXJhdGVseSBleGNsdWRpbmcgbWFyZ2luIGZvciBvdXIgY2FsY3VsYXRpb25zLCBzaW5jZSB3ZSBhcmUgdXNpbmdcbiAgLy8gb2Zmc2V0TGVmdCB3aGljaCBpcyBpbmNsdWRpbmcgbWFyZ2luLiBTZWUgZ2V0Qm91bmRQb3NpdGlvblxuICB2YXIgd2lkdGggPSBub2RlLmNsaWVudFdpZHRoO1xuICB2YXIgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICB3aWR0aCArPSBpbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJMZWZ0V2lkdGgpO1xuICB3aWR0aCArPSBpbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJSaWdodFdpZHRoKTtcbiAgcmV0dXJuIHdpZHRoO1xufVxuZnVuY3Rpb24gaW5uZXJIZWlnaHQobm9kZSkge1xuICB2YXIgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gIHZhciBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGhlaWdodCAtPSBpbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nVG9wKTtcbiAgaGVpZ2h0IC09IGludChjb21wdXRlZFN0eWxlLnBhZGRpbmdCb3R0b20pO1xuICByZXR1cm4gaGVpZ2h0O1xufVxuXG5mdW5jdGlvbiBpbm5lcldpZHRoKG5vZGUpIHtcbiAgdmFyIHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgdmFyIGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgd2lkdGggLT0gaW50KGNvbXB1dGVkU3R5bGUucGFkZGluZ0xlZnQpO1xuICB3aWR0aCAtPSBpbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nUmlnaHQpO1xuICByZXR1cm4gd2lkdGg7XG59XG5cbmZ1bmN0aW9uIGlzTnVtKG51bSkge1xuICByZXR1cm4gdHlwZW9mIG51bSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKG51bSk7XG59XG5cbmZ1bmN0aW9uIGludChhKSB7XG4gIHJldHVybiBwYXJzZUludChhLCAxMCk7XG59XG5cbmZ1bmN0aW9uIGdldEJvdW5kUG9zaXRpb24oZHJhZ2dhYmxlLCBjbGllbnRYLCBjbGllbnRZKSB7XG4gIHZhciBib3VuZHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRyYWdnYWJsZS5wcm9wcy5ib3VuZHMpKTtcbiAgdmFyIG5vZGUgPSBkcmFnZ2FibGUuZ2V0RE9NTm9kZSgpO1xuICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuXG4gIGlmIChib3VuZHMgPT09ICdwYXJlbnQnKSB7XG4gICAgdmFyIG5vZGVTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIHZhciBwYXJlbnRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHBhcmVudCk7XG4gICAgLy8gQ29tcHV0ZSBib3VuZHMuIFRoaXMgaXMgYSBwYWluIHdpdGggcGFkZGluZyBhbmQgb2Zmc2V0cyBidXQgdGhpcyBnZXRzIGl0IGV4YWN0bHkgcmlnaHQuXG4gICAgYm91bmRzID0ge1xuICAgICAgbGVmdDogLW5vZGUub2Zmc2V0TGVmdCArIGludChwYXJlbnRTdHlsZS5wYWRkaW5nTGVmdCkgK1xuICAgICAgICAgICAgaW50KG5vZGVTdHlsZS5ib3JkZXJMZWZ0V2lkdGgpICsgaW50KG5vZGVTdHlsZS5tYXJnaW5MZWZ0KSxcbiAgICAgIHRvcDogLW5vZGUub2Zmc2V0VG9wICsgaW50KHBhcmVudFN0eWxlLnBhZGRpbmdUb3ApICtcbiAgICAgICAgICAgIGludChub2RlU3R5bGUuYm9yZGVyVG9wV2lkdGgpICsgaW50KG5vZGVTdHlsZS5tYXJnaW5Ub3ApLFxuICAgICAgcmlnaHQ6IGlubmVyV2lkdGgocGFyZW50KSAtIG91dGVyV2lkdGgobm9kZSkgLSBub2RlLm9mZnNldExlZnQsXG4gICAgICBib3R0b206IGlubmVySGVpZ2h0KHBhcmVudCkgLSBvdXRlckhlaWdodChub2RlKSAtIG5vZGUub2Zmc2V0VG9wXG4gICAgfTtcbiAgfVxuXG4gIC8vIEtlZXAgeCBhbmQgeSBiZWxvdyByaWdodCBhbmQgYm90dG9tIGxpbWl0cy4uLlxuICBpZiAoaXNOdW0oYm91bmRzLnJpZ2h0KSkgY2xpZW50WCA9IE1hdGgubWluKGNsaWVudFgsIGJvdW5kcy5yaWdodCk7XG4gIGlmIChpc051bShib3VuZHMuYm90dG9tKSkgY2xpZW50WSA9IE1hdGgubWluKGNsaWVudFksIGJvdW5kcy5ib3R0b20pO1xuXG4gIC8vIEJ1dCBhYm92ZSBsZWZ0IGFuZCB0b3AgbGltaXRzLlxuICBpZiAoaXNOdW0oYm91bmRzLmxlZnQpKSBjbGllbnRYID0gTWF0aC5tYXgoY2xpZW50WCwgYm91bmRzLmxlZnQpO1xuICBpZiAoaXNOdW0oYm91bmRzLnRvcCkpIGNsaWVudFkgPSBNYXRoLm1heChjbGllbnRZLCBib3VuZHMudG9wKTtcblxuICByZXR1cm4gW2NsaWVudFgsIGNsaWVudFldO1xufVxuXG5mdW5jdGlvbiBzbmFwVG9HcmlkKGdyaWQsIHBlbmRpbmdYLCBwZW5kaW5nWSkge1xuICB2YXIgeCA9IE1hdGgucm91bmQocGVuZGluZ1ggLyBncmlkWzBdKSAqIGdyaWRbMF07XG4gIHZhciB5ID0gTWF0aC5yb3VuZChwZW5kaW5nWSAvIGdyaWRbMV0pICogZ3JpZFsxXTtcbiAgcmV0dXJuIFt4LCB5XTtcbn1cblxuLy8gVXNlZnVsIGZvciBwcmV2ZW50aW5nIGJsdWUgaGlnaGxpZ2h0cyBhbGwgb3ZlciBldmVyeXRoaW5nIHdoZW4gZHJhZ2dpbmcuXG52YXIgdXNlclNlbGVjdFN0eWxlID0gJzt1c2VyLXNlbGVjdDogbm9uZTsnO1xuaWYgKGJyb3dzZXJQcmVmaXgpIHtcbiAgdXNlclNlbGVjdFN0eWxlICs9ICctJyArIGJyb3dzZXJQcmVmaXgudG9Mb3dlckNhc2UoKSArICctdXNlci1zZWxlY3Q6IG5vbmU7Jztcbn1cblxuZnVuY3Rpb24gYWRkVXNlclNlbGVjdFN0eWxlcyhkcmFnZ2FibGUpIHtcbiAgaWYgKCFkcmFnZ2FibGUucHJvcHMuZW5hYmxlVXNlclNlbGVjdEhhY2spIHJldHVybjtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuYm9keS5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgfHwgJyc7XG4gIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlICsgdXNlclNlbGVjdFN0eWxlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlVXNlclNlbGVjdFN0eWxlcyhkcmFnZ2FibGUpIHtcbiAgaWYgKCFkcmFnZ2FibGUucHJvcHMuZW5hYmxlVXNlclNlbGVjdEhhY2spIHJldHVybjtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuYm9keS5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgfHwgJyc7XG4gIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlLnJlcGxhY2UodXNlclNlbGVjdFN0eWxlLCAnJykpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDU1NUcmFuc2Zvcm0oc3R5bGUpIHtcbiAgLy8gUmVwbGFjZSB1bml0bGVzcyBpdGVtcyB3aXRoIHB4XG4gIHZhciB4ID0gc3R5bGUueCArICdweCc7XG4gIHZhciB5ID0gc3R5bGUueSArICdweCc7XG4gIHZhciBvdXQgPSB7dHJhbnNmb3JtOiAndHJhbnNsYXRlKCcgKyB4ICsgJywnICsgeSArICcpJ307XG4gIC8vIEFkZCBzaW5nbGUgcHJlZml4ZWQgcHJvcGVydHkgYXMgd2VsbFxuICBpZiAoYnJvd3NlclByZWZpeCkge1xuICAgIG91dFticm93c2VyUHJlZml4ICsgJ1RyYW5zZm9ybSddID0gb3V0LnRyYW5zZm9ybTtcbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTVkdUcmFuc2Zvcm0oYXJncykge1xuICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgYXJncy54ICsgJywnICsgYXJncy55ICsgJyknO1xufVxuXG5cbi8vXG4vLyBFbmQgSGVscGVycy5cbi8vXG5cbi8vXG4vLyBEZWZpbmUgPERyYWdnYWJsZT5cbi8vXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ0RyYWdnYWJsZScsXG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgLyoqXG4gICAgICogYGF4aXNgIGRldGVybWluZXMgd2hpY2ggYXhpcyB0aGUgZHJhZ2dhYmxlIGNhbiBtb3ZlLlxuICAgICAqXG4gICAgICogJ2JvdGgnIGFsbG93cyBtb3ZlbWVudCBob3Jpem9udGFsbHkgYW5kIHZlcnRpY2FsbHkuXG4gICAgICogJ3gnIGxpbWl0cyBtb3ZlbWVudCB0byBob3Jpem9udGFsIGF4aXMuXG4gICAgICogJ3knIGxpbWl0cyBtb3ZlbWVudCB0byB2ZXJ0aWNhbCBheGlzLlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gJ2JvdGgnLlxuICAgICAqL1xuICAgIGF4aXM6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ2JvdGgnLCAneCcsICd5J10pLFxuXG4gICAgLyoqXG4gICAgICogYGJvdW5kc2AgZGV0ZXJtaW5lcyB0aGUgcmFuZ2Ugb2YgbW92ZW1lbnQgYXZhaWxhYmxlIHRvIHRoZSBlbGVtZW50LlxuICAgICAqIEF2YWlsYWJsZSB2YWx1ZXMgYXJlOlxuICAgICAqXG4gICAgICogJ3BhcmVudCcgcmVzdHJpY3RzIG1vdmVtZW50IHdpdGhpbiB0aGUgRHJhZ2dhYmxlJ3MgcGFyZW50IG5vZGUuXG4gICAgICpcbiAgICAgKiBBbHRlcm5hdGl2ZWx5LCBwYXNzIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllcywgYWxsIG9mIHdoaWNoIGFyZSBvcHRpb25hbDpcbiAgICAgKlxuICAgICAqIHtsZWZ0OiBMRUZUX0JPVU5ELCByaWdodDogUklHSFRfQk9VTkQsIGJvdHRvbTogQk9UVE9NX0JPVU5ELCB0b3A6IFRPUF9CT1VORH1cbiAgICAgKlxuICAgICAqIEFsbCB2YWx1ZXMgYXJlIGluIHB4LlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzeFxuICAgICAqICAgdmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAgKiAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgIHJldHVybiAoXG4gICAgICogICAgICAgICAgICA8RHJhZ2dhYmxlIGJvdW5kcz17e3JpZ2h0OiAzMDAsIGJvdHRvbTogMzAwfX0+XG4gICAgICogICAgICAgICAgICAgIDxkaXY+Q29udGVudDwvZGl2PlxuICAgICAqICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICk7XG4gICAgICogICAgICAgfVxuICAgICAqICAgfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgYm91bmRzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGxlZnQ6IFJlYWN0LlByb3BUeXBlcy5OdW1iZXIsXG4gICAgICAgIHJpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMuTnVtYmVyLFxuICAgICAgICB0b3A6IFJlYWN0LlByb3BUeXBlcy5OdW1iZXIsXG4gICAgICAgIGJvdHRvbTogUmVhY3QuUHJvcFR5cGVzLk51bWJlclxuICAgICAgfSksXG4gICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydwYXJlbnQnLCBmYWxzZV0pXG4gICAgXSksXG5cbiAgICAvKipcbiAgICAgKiBCeSBkZWZhdWx0LCB3ZSBhZGQgJ3VzZXItc2VsZWN0Om5vbmUnIGF0dHJpYnV0ZXMgdG8gdGhlIGRvY3VtZW50IGJvZHlcbiAgICAgKiB0byBwcmV2ZW50IHVnbHkgdGV4dCBzZWxlY3Rpb24gZHVyaW5nIGRyYWcuIElmIHRoaXMgaXMgY2F1c2luZyBwcm9ibGVtc1xuICAgICAqIGZvciB5b3VyIGFwcCwgc2V0IHRoaXMgdG8gYGZhbHNlYC5cbiAgICAgKi9cbiAgICBlbmFibGVVc2VyU2VsZWN0SGFjazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvKipcbiAgICAgKiBgaGFuZGxlYCBzcGVjaWZpZXMgYSBzZWxlY3RvciB0byBiZSB1c2VkIGFzIHRoZSBoYW5kbGUgdGhhdCBpbml0aWF0ZXMgZHJhZy5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIHZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICByZXR1cm4gKFxuICAgICAqICAgICAgICAgICAgPERyYWdnYWJsZSBoYW5kbGU9XCIuaGFuZGxlXCI+XG4gICAgICogICAgICAgICAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhhbmRsZVwiPkNsaWNrIG1lIHRvIGRyYWc8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDxkaXY+VGhpcyBpcyBzb21lIG90aGVyIGNvbnRlbnQ8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICogICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBoYW5kbGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBgY2FuY2VsYCBzcGVjaWZpZXMgYSBzZWxlY3RvciB0byBiZSB1c2VkIHRvIHByZXZlbnQgZHJhZyBpbml0aWFsaXphdGlvbi5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIHZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgIHJldHVybihcbiAgICAgKiAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgY2FuY2VsPVwiLmNhbmNlbFwiPlxuICAgICAqICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhbmNlbFwiPllvdSBjYW4ndCBkcmFnIGZyb20gaGVyZTwvZGl2PlxuICAgICAqICAgICAgICAgICAgPGRpdj5EcmFnZ2luZyBoZXJlIHdvcmtzIGZpbmU8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgICApO1xuICAgICAqICAgICAgIH1cbiAgICAgKiAgIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGNhbmNlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIGBncmlkYCBzcGVjaWZpZXMgdGhlIHggYW5kIHkgdGhhdCBkcmFnZ2luZyBzaG91bGQgc25hcCB0by5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIHZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgIHJldHVybiAoXG4gICAgICogICAgICAgICAgICAgICA8RHJhZ2dhYmxlIGdyaWQ9e1syNSwgMjVdfT5cbiAgICAgKiAgICAgICAgICAgICAgICAgICA8ZGl2Pkkgc25hcCB0byBhIDI1IHggMjUgZ3JpZDwvZGl2PlxuICAgICAqICAgICAgICAgICAgICAgPC9EcmFnZ2FibGU+XG4gICAgICogICAgICAgICAgICk7XG4gICAgICogICAgICAgfVxuICAgICAqICAgfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgZ3JpZDogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG5cbiAgICAvKipcbiAgICAgKiBgc3RhcnRgIHNwZWNpZmllcyB0aGUgeCBhbmQgeSB0aGF0IHRoZSBkcmFnZ2VkIGl0ZW0gc2hvdWxkIHN0YXJ0IGF0XG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganN4XG4gICAgICogICAgICB2YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAqICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAqICAgICAgICAgICAgICAgICAgPERyYWdnYWJsZSBzdGFydD17e3g6IDI1LCB5OiAyNX19PlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIDxkaXY+SSBzdGFydCB3aXRoIHRyYW5zZm9ybVg6IDI1cHggYW5kIHRyYW5zZm9ybVk6IDI1cHg7PC9kaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICAgICAgKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICogICAgICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBzdGFydDogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICB5OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG4gICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBgbW92ZU9uU3RhcnRDaGFuZ2VgLCBpZiB0cnVlIChkZWZhdWx0IGZhbHNlKSB3aWxsIG1vdmUgdGhlIGVsZW1lbnQgaWYgdGhlIGBzdGFydGBcbiAgICAgKiBwcm9wZXJ0eSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIG1vdmVPblN0YXJ0Q2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblxuXG4gICAgLyoqXG4gICAgICogYHpJbmRleGAgc3BlY2lmaWVzIHRoZSB6SW5kZXggdG8gdXNlIHdoaWxlIGRyYWdnaW5nLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzeFxuICAgICAqICAgdmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAgKiAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgekluZGV4PXsxMDB9PlxuICAgICAqICAgICAgICAgICAgICAgICAgIDxkaXY+SSBoYXZlIGEgekluZGV4PC9kaXY+XG4gICAgICogICAgICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICB6SW5kZXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBkcmFnZ2luZyBzdGFydHMuXG4gICAgICogSWYgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBib29sZWFuIGZhbHNlLCBkcmFnZ2luZyB3aWxsIGJlIGNhbmNlbGVkLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogIGZ1bmN0aW9uIChldmVudCwgdWkpIHt9XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBgZXZlbnRgIGlzIHRoZSBFdmVudCB0aGF0IHdhcyB0cmlnZ2VyZWQuXG4gICAgICogYHVpYCBpcyBhbiBvYmplY3Q6XG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqICB7XG4gICAgICogICAgcG9zaXRpb246IHt0b3A6IDAsIGxlZnQ6IDB9XG4gICAgICogIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBvblN0YXJ0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGlsZSBkcmFnZ2luZy5cbiAgICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGJvb2xlYW4gZmFsc2UsIGRyYWdnaW5nIHdpbGwgYmUgY2FuY2VsZWQuXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganNcbiAgICAgKiAgZnVuY3Rpb24gKGV2ZW50LCB1aSkge31cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIGBldmVudGAgaXMgdGhlIEV2ZW50IHRoYXQgd2FzIHRyaWdnZXJlZC5cbiAgICAgKiBgdWlgIGlzIGFuIG9iamVjdDpcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogIHtcbiAgICAgKiAgICBwb3NpdGlvbjoge3RvcDogMCwgbGVmdDogMH1cbiAgICAgKiAgfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIG9uRHJhZzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBkcmFnZ2luZyBzdG9wcy5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqICBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7fVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogYGV2ZW50YCBpcyB0aGUgRXZlbnQgdGhhdCB3YXMgdHJpZ2dlcmVkLlxuICAgICAqIGB1aWAgaXMgYW4gb2JqZWN0OlxuICAgICAqXG4gICAgICogYGBganNcbiAgICAgKiAge1xuICAgICAqICAgIHBvc2l0aW9uOiB7dG9wOiAwLCBsZWZ0OiAwfVxuICAgICAqICB9XG4gICAgICogYGBgXG4gICAgICovXG4gICAgb25TdG9wOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAgIC8qKlxuICAgICAqIEEgd29ya2Fyb3VuZCBvcHRpb24gd2hpY2ggY2FuIGJlIHBhc3NlZCBpZiBvbk1vdXNlRG93biBuZWVkcyB0byBiZSBhY2Nlc3NlZCxcbiAgICAgKiBzaW5jZSBpdCdsbCBhbHdheXMgYmUgYmxvY2tlZCAoZHVlIHRvIHRoYXQgdGhlcmUncyBpbnRlcm5hbCB1c2Ugb2Ygb25Nb3VzZURvd24pXG4gICAgICovXG4gICAgb25Nb3VzZURvd246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogV291bGQgaWRlYWxseSBsaWtlIHRvIHRlc3QgaWYgY2hpbGQgZWxlbWVudCBpcyBhbiBpbnN0YW5jZW9mIFNWRyBidXQgdGhlcmUgaXMgY3VycmVudGx5XG4gICAgICogbm8gcmVsaWFibGUgd2F5IHRvIGRvIHRoaXMsIGVzcC4gaWYgU1ZHIGlzIG5vdCBwcm9wZXJseSBuYW1lc3BhY2VkLlxuICAgICAqL1xuICAgIGlzU1ZHOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5ld1Byb3BzKSB7XG4gICAgLy8gUmVhY3QgdG8gY2hhbmdlcyBpbiB0aGUgJ3N0YXJ0JyBwYXJhbS5cbiAgICBpZiAobmV3UHJvcHMubW92ZU9uU3RhcnRDaGFuZ2UgJiYgbmV3UHJvcHMuc3RhcnQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5nZXRJbml0aWFsU3RhdGUobmV3UHJvcHMpKTtcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFJlbW92ZSBhbnkgbGVmdG92ZXIgZXZlbnQgaGFuZGxlcnNcbiAgICByZW1vdmVFdmVudChkb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLm1vdmUsIHRoaXMuaGFuZGxlRHJhZyk7XG4gICAgcmVtb3ZlRXZlbnQoZG9jdW1lbnQsIGRyYWdFdmVudEZvci5lbmQsIHRoaXMuaGFuZGxlRHJhZ0VuZCk7XG4gICAgcmVtb3ZlVXNlclNlbGVjdFN0eWxlcyh0aGlzKTtcbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXhpczogJ2JvdGgnLFxuICAgICAgYm91bmRzOiBmYWxzZSxcbiAgICAgIGhhbmRsZTogbnVsbCxcbiAgICAgIGNhbmNlbDogbnVsbCxcbiAgICAgIGdyaWQ6IG51bGwsXG4gICAgICBtb3ZlT25TdGFydENoYW5nZTogZmFsc2UsXG4gICAgICBzdGFydDoge3g6IDAsIHk6IDB9LFxuICAgICAgekluZGV4OiBOYU4sXG4gICAgICBlbmFibGVVc2VyU2VsZWN0SGFjazogdHJ1ZSxcbiAgICAgIG9uU3RhcnQ6IGVtcHR5RnVuY3Rpb24sXG4gICAgICBvbkRyYWc6IGVtcHR5RnVuY3Rpb24sXG4gICAgICBvblN0b3A6IGVtcHR5RnVuY3Rpb24sXG4gICAgICBvbk1vdXNlRG93bjogZW1wdHlGdW5jdGlvbixcbiAgICAgIGlzU1ZHOiBmYWxzZVxuICAgIH07XG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAvLyBIYW5kbGUgY2FsbCBmcm9tIENXUlBcbiAgICBwcm9wcyA9IHByb3BzIHx8IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFdoZXRoZXIgb3Igbm90IHdlIGFyZSBjdXJyZW50bHkgZHJhZ2dpbmcuXG4gICAgICBkcmFnZ2luZzogZmFsc2UsXG5cbiAgICAgIC8vIE9mZnNldCBiZXR3ZWVuIHN0YXJ0IHRvcC9sZWZ0IGFuZCBtb3VzZSB0b3AvbGVmdCB3aGlsZSBkcmFnZ2luZy5cbiAgICAgIG9mZnNldFg6IDAsIG9mZnNldFk6IDAsXG5cbiAgICAgIC8vIEN1cnJlbnQgdHJhbnNmb3JtIHggYW5kIHkuXG4gICAgICBjbGllbnRYOiBwcm9wcy5zdGFydC54LCBjbGllbnRZOiBwcm9wcy5zdGFydC55XG4gICAgfTtcbiAgfSxcblxuICBoYW5kbGVEcmFnU3RhcnQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgLy8gU2V0IHRvdWNoIGlkZW50aWZpZXIgaW4gY29tcG9uZW50IHN0YXRlIGlmIHRoaXMgaXMgYSB0b3VjaCBldmVudFxuICAgIGlmKGUudGFyZ2V0VG91Y2hlcyl7XG4gICAgICB0aGlzLnNldFN0YXRlKHt0b3VjaElkZW50aWZpZXI6IGUudGFyZ2V0VG91Y2hlc1swXS5pZGVudGlmaWVyfSk7XG4gICAgfVxuICAgIFxuICAgIC8vIE1ha2UgaXQgcG9zc2libGUgdG8gYXR0YWNoIGV2ZW50IGhhbmRsZXJzIG9uIHRvcCBvZiB0aGlzIG9uZVxuICAgIHRoaXMucHJvcHMub25Nb3VzZURvd24oZSk7XG5cbiAgICAvLyBTaG9ydCBjaXJjdWl0IGlmIGhhbmRsZSBvciBjYW5jZWwgcHJvcCB3YXMgcHJvdmlkZWQgYW5kIHNlbGVjdG9yIGRvZXNuJ3QgbWF0Y2hcbiAgICBpZiAoKHRoaXMucHJvcHMuaGFuZGxlICYmICFtYXRjaGVzU2VsZWN0b3IoZS50YXJnZXQsIHRoaXMucHJvcHMuaGFuZGxlKSkgfHxcbiAgICAgICh0aGlzLnByb3BzLmNhbmNlbCAmJiBtYXRjaGVzU2VsZWN0b3IoZS50YXJnZXQsIHRoaXMucHJvcHMuY2FuY2VsKSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDYWxsIGV2ZW50IGhhbmRsZXIuIElmIGl0IHJldHVybnMgZXhwbGljaXQgZmFsc2UsIGNhbmNlbC5cbiAgICB2YXIgc2hvdWxkU3RhcnQgPSB0aGlzLnByb3BzLm9uU3RhcnQoZSwgY3JlYXRlVUlFdmVudCh0aGlzKSk7XG4gICAgaWYgKHNob3VsZFN0YXJ0ID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgdmFyIGRyYWdQb2ludCA9IGdldENvbnRyb2xQb3NpdGlvbihlKTtcblxuICAgIC8vIEFkZCBhIHN0eWxlIHRvIHRoZSBib2R5IHRvIGRpc2FibGUgdXNlci1zZWxlY3QuIFRoaXMgcHJldmVudHMgdGV4dCBmcm9tXG4gICAgLy8gYmVpbmcgc2VsZWN0ZWQgYWxsIG92ZXIgdGhlIHBhZ2UuXG4gICAgYWRkVXNlclNlbGVjdFN0eWxlcyh0aGlzKTtcblxuICAgIC8vIEluaXRpYXRlIGRyYWdnaW5nLiBTZXQgdGhlIGN1cnJlbnQgeCBhbmQgeSBhcyBvZmZzZXRzXG4gICAgLy8gc28gd2Uga25vdyBob3cgbXVjaCB3ZSd2ZSBtb3ZlZCBkdXJpbmcgdGhlIGRyYWcuIFRoaXMgYWxsb3dzIHVzXG4gICAgLy8gdG8gZHJhZyBlbGVtZW50cyBhcm91bmQgZXZlbiBpZiB0aGV5IGhhdmUgYmVlbiBtb3ZlZCwgd2l0aG91dCBpc3N1ZS5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdnaW5nOiB0cnVlLFxuICAgICAgb2Zmc2V0WDogZHJhZ1BvaW50LmNsaWVudFggLSB0aGlzLnN0YXRlLmNsaWVudFgsXG4gICAgICBvZmZzZXRZOiBkcmFnUG9pbnQuY2xpZW50WSAtIHRoaXMuc3RhdGUuY2xpZW50WSxcbiAgICAgIHNjcm9sbFg6IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCxcbiAgICAgIHNjcm9sbFk6IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wXG4gICAgfSk7XG5cblxuICAgIC8vIEFkZCBldmVudCBoYW5kbGVyc1xuICAgIGFkZEV2ZW50KGRvY3VtZW50LCAnc2Nyb2xsJywgdGhpcy5oYW5kbGVTY3JvbGwpO1xuICAgIGFkZEV2ZW50KGRvY3VtZW50LCBkcmFnRXZlbnRGb3IubW92ZSwgdGhpcy5oYW5kbGVEcmFnKTtcbiAgICBhZGRFdmVudChkb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLmVuZCwgdGhpcy5oYW5kbGVEcmFnRW5kKTtcbiAgfSxcblxuICBoYW5kbGVEcmFnRW5kOiBmdW5jdGlvbiAoZSkge1xuICAgIC8vIFNob3J0IGNpcmN1aXQgaWYgbm90IGN1cnJlbnRseSBkcmFnZ2luZ1xuICAgIGlmICghdGhpcy5zdGF0ZS5kcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNob3J0IGNpcmN1aXQgaWYgdGhpcyBpcyBub3QgdGhlIGNvcnJlY3QgdG91Y2ggZXZlbnRcbiAgICBpZihlLmNoYW5nZWRUb3VjaGVzICYmIChlLmNoYW5nZWRUb3VjaGVzWzBdLmlkZW50aWZpZXIgIT0gdGhpcy5zdGF0ZS50b3VjaElkZW50aWZpZXIpKXtcbiAgICAgcmV0dXJuO1xuICAgIH0gXG5cbiAgICByZW1vdmVVc2VyU2VsZWN0U3R5bGVzKHRoaXMpO1xuXG4gICAgLy8gVHVybiBvZmYgZHJhZ2dpbmdcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdnaW5nOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgLy8gQ2FsbCBldmVudCBoYW5kbGVyXG4gICAgdGhpcy5wcm9wcy5vblN0b3AoZSwgY3JlYXRlVUlFdmVudCh0aGlzKSk7XG5cbiAgICAvLyBSZW1vdmUgZXZlbnQgaGFuZGxlcnNcbiAgICByZW1vdmVFdmVudChkb2N1bWVudCwgJ3Njcm9sbCcsIHRoaXMuaGFuZGxlU2Nyb2xsKTtcbiAgICByZW1vdmVFdmVudChkb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLm1vdmUsIHRoaXMuaGFuZGxlRHJhZyk7XG4gICAgcmVtb3ZlRXZlbnQoZG9jdW1lbnQsIGRyYWdFdmVudEZvci5lbmQsIHRoaXMuaGFuZGxlRHJhZ0VuZCk7XG4gIH0sXG5cbiAgaGFuZGxlRHJhZzogZnVuY3Rpb24gKGUpIHtcbiAgICAvLyBSZXR1cm4gaWYgdGhpcyBpcyBhIHRvdWNoIGV2ZW50LCBidXQgbm90IHRoZSBjb3JyZWN0IG9uZSBmb3IgdGhpcyBlbGVtZW50XG4gICAgaWYoZS50YXJnZXRUb3VjaGVzICYmIChlLnRhcmdldFRvdWNoZXNbMF0uaWRlbnRpZmllciAhPSB0aGlzLnN0YXRlLnRvdWNoSWRlbnRpZmllcikpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZHJhZ1BvaW50ID0gZ2V0Q29udHJvbFBvc2l0aW9uKGUpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIFggYW5kIFlcbiAgICB2YXIgY2xpZW50WCA9IGRyYWdQb2ludC5jbGllbnRYIC0gdGhpcy5zdGF0ZS5vZmZzZXRYO1xuICAgIHZhciBjbGllbnRZID0gZHJhZ1BvaW50LmNsaWVudFkgLSB0aGlzLnN0YXRlLm9mZnNldFk7XG5cbiAgICAvLyBTbmFwIHRvIGdyaWQgaWYgcHJvcCBoYXMgYmVlbiBwcm92aWRlZFxuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuZ3JpZCkpIHtcbiAgICAgIHZhciBjb29yZHMgPSBzbmFwVG9HcmlkKHRoaXMucHJvcHMuZ3JpZCwgY2xpZW50WCwgY2xpZW50WSk7XG4gICAgICBjbGllbnRYID0gY29vcmRzWzBdO1xuICAgICAgY2xpZW50WSA9IGNvb3Jkc1sxXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5ib3VuZHMpIHtcbiAgICAgIHZhciBwb3MgPSBnZXRCb3VuZFBvc2l0aW9uKHRoaXMsIGNsaWVudFgsIGNsaWVudFkpO1xuICAgICAgY2xpZW50WCA9IHBvc1swXTtcbiAgICAgIGNsaWVudFkgPSBwb3NbMV07XG4gICAgfVxuXG4gICAgLy8gQ2FsbCBldmVudCBoYW5kbGVyLiBJZiBpdCByZXR1cm5zIGV4cGxpY2l0IGZhbHNlLCBjYW5jZWwuXG4gICAgdmFyIHNob3VsZFVwZGF0ZSA9IHRoaXMucHJvcHMub25EcmFnKGUsIGNyZWF0ZVVJRXZlbnQodGhpcykpO1xuICAgIGlmIChzaG91bGRVcGRhdGUgPT09IGZhbHNlKSByZXR1cm4gdGhpcy5oYW5kbGVEcmFnRW5kKCk7XG5cbiAgICAvLyBVcGRhdGUgdHJhbnNmb3JtXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjbGllbnRYOiBjbGllbnRYLFxuICAgICAgY2xpZW50WTogY2xpZW50WVxuICAgIH0pO1xuICB9LFxuXG4gIGhhbmRsZVNjcm9sbDogZnVuY3Rpb24oZSkge1xuICAgIHZhciBzID0gdGhpcy5zdGF0ZSwgeCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCwgeSA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgIHZhciBvZmZzZXRYID0geCAtIHMuc2Nyb2xsWCwgb2Zmc2V0WSA9IHkgLSBzLnNjcm9sbFk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzY3JvbGxYOiB4LFxuICAgICAgc2Nyb2xsWTogeSxcbiAgICAgIGNsaWVudFg6IHMuY2xpZW50WCArIG9mZnNldFgsXG4gICAgICBjbGllbnRZOiBzLmNsaWVudFkgKyBvZmZzZXRZLFxuICAgICAgb2Zmc2V0WDogcy5vZmZzZXRYIC0gb2Zmc2V0WCxcbiAgICAgIG9mZnNldFk6IHMub2Zmc2V0WSAtIG9mZnNldFlcbiAgICB9KTtcbiAgfSxcblxuICBvbk1vdXNlRG93bjogZnVuY3Rpb24oZXYpIHtcbiAgICAvLyBQcmV2ZW50ICdnaG9zdCBjbGljaycgd2hpY2ggaGFwcGVucyAzMDBtcyBhZnRlciB0b3VjaHN0YXJ0IGlmIHRoZSBldmVudCBpc24ndCBjYW5jZWxsZWQuXG4gICAgLy8gV2UgZG9uJ3QgY2FuY2VsIHRoZSBldmVudCBvbiB0b3VjaHN0YXJ0IGJlY2F1c2Ugb2YgIzM3OyB3ZSBtaWdodCB3YW50IHRvIG1ha2UgYSBzY3JvbGxhYmxlIGl0ZW0gZHJhZ2dhYmxlLlxuICAgIC8vIE1vcmUgb24gZ2hvc3QgY2xpY2tzOiBodHRwOi8vYXJpYXRlbXBsYXRlcy5jb20vYmxvZy8yMDE0LzA1L2dob3N0LWNsaWNrcy1pbi1tb2JpbGUtYnJvd3NlcnMvXG4gICAgaWYgKGRyYWdFdmVudEZvciA9PT0gZXZlbnRzRm9yLnRvdWNoKSB7XG4gICAgICByZXR1cm4gZXYucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVEcmFnU3RhcnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfSxcblxuICBvblRvdWNoU3RhcnQ6IGZ1bmN0aW9uKGV2KSB7XG4gICAgLy8gV2UncmUgb24gYSB0b3VjaCBkZXZpY2Ugbm93LCBzbyBjaGFuZ2UgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLnRvdWNoO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlRHJhZ1N0YXJ0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH0sXG5cbiAgLy8gSW50ZW5kZWQgZm9yIHVzZSBieSBhIHBhcmVudCBjb21wb25lbnQuIFJlc2V0cyBpbnRlcm5hbCBzdGF0ZSBvbiB0aGlzIGNvbXBvbmVudC4gVXNlZnVsIGZvclxuICAvLyA8UmVzaXphYmxlPiBhbmQgb3RoZXIgY29tcG9uZW50cyBpbiBjYXNlIHRoaXMgZWxlbWVudCBpcyBtYW51YWxseSByZXNpemVkIGFuZCBzdGFydC9tb3ZlT25TdGFydENoYW5nZVxuICAvLyBkb24ndCB3b3JrIGZvciB5b3UuXG4gIHJlc2V0U3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgb2Zmc2V0WDogMCwgb2Zmc2V0WTogMCwgY2xpZW50WDogMCwgY2xpZW50WTogMFxuICAgIH0pO1xuICB9LFxuXG4gIC8vIERldGVybWluZXMgaWYgdGhlIG5vZGUgaXMgb2YgdHlwZSBTVkdFbGVtZW50IG9uIG1vdW50XG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAvL3RoaXMuaXNFbGVtZW50U1ZHID0gaXNUaGlzU1ZHKHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIC8vIENyZWF0ZSBzdHlsZSBvYmplY3QuIFdlIGV4dGVuZCBmcm9tIGV4aXN0aW5nIHN0eWxlcyBzbyB3ZSBkb24ndFxuICAgIC8vIHJlbW92ZSBhbnl0aGluZyBhbHJlYWR5IHNldCAobGlrZSBiYWNrZ3JvdW5kLCBjb2xvciwgZXRjKS5cbiAgICB2YXIgY2hpbGRTdHlsZSA9IHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuc3R5bGUgfHwge307XG5cbiAgICAvLyBBZGQgYSBDU1MgdHJhbnNmb3JtIHRvIG1vdmUgdGhlIGVsZW1lbnQgYXJvdW5kLiBUaGlzIGFsbG93cyB1cyB0byBtb3ZlIHRoZSBlbGVtZW50IGFyb3VuZFxuICAgIC8vIHdpdGhvdXQgd29ycnlpbmcgYWJvdXQgd2hldGhlciBvciBub3QgaXQgaXMgcmVsYXRpdmVseSBvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQuXG4gICAgLy8gSWYgdGhlIGl0ZW0geW91IGFyZSBkcmFnZ2luZyBhbHJlYWR5IGhhcyBhIHRyYW5zZm9ybSBzZXQsIHdyYXAgaXQgaW4gYSA8c3Bhbj4gc28gPERyYWdnYWJsZT5cbiAgICAvLyBoYXMgYSBjbGVhbiBzbGF0ZS5cbiAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy5wcm9wcy5pc1NWRyA/IG51bGwgOlxuICAgICAgICBjcmVhdGVDU1NUcmFuc2Zvcm0oe1xuICAgICAgICAgIC8vIFNldCBsZWZ0IGlmIGhvcml6b250YWwgZHJhZyBpcyBlbmFibGVkXG4gICAgICAgICAgeDogY2FuRHJhZ1godGhpcykgP1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGllbnRYIDpcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnQueCxcblxuICAgICAgICAgIC8vIFNldCB0b3AgaWYgdmVydGljYWwgZHJhZyBpcyBlbmFibGVkXG4gICAgICAgICAgeTogY2FuRHJhZ1kodGhpcykgP1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGllbnRZIDpcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnQueVxuICAgICAgICB9KTtcblxuICAgIFxuICAgIHZhciBzdmdUcmFuc2Zvcm0gPSAhdGhpcy5wcm9wcy5pc1NWRyA/IG51bGwgOlxuICAgICAgICBjcmVhdGVTVkdUcmFuc2Zvcm0oe1xuICAgICAgICAgIC8vIFNldCBsZWZ0IGlmIGhvcml6b250YWwgZHJhZyBpcyBlbmFibGVkXG4gICAgICAgICAgeDogY2FuRHJhZ1godGhpcykgP1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGllbnRYIDpcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnQueCxcblxuICAgICAgICAgIC8vIFNldCB0b3AgaWYgdmVydGljYWwgZHJhZyBpcyBlbmFibGVkXG4gICAgICAgICAgeTogY2FuRHJhZ1kodGhpcykgP1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGllbnRZIDpcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnQueVxuICAgICAgICB9KTtcblxuXG4gICAgLy8gV29ya2Fyb3VuZCBJRSBwb2ludGVyIGV2ZW50czsgc2VlICM1MVxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9temFicmlza2llL3JlYWN0LWRyYWdnYWJsZS9pc3N1ZXMvNTEjaXNzdWVjb21tZW50LTEwMzQ4ODI3OFxuICAgIHZhciB0b3VjaEhhY2tzID0ge1xuICAgICAgdG91Y2hBY3Rpb246ICdub25lJ1xuICAgIH07XG5cbiAgICB2YXIgc3R5bGUgPSBhc3NpZ24oe30sIGNoaWxkU3R5bGUsIHRyYW5zZm9ybSwgdG91Y2hIYWNrcyk7XG5cbiAgICAvLyBTZXQgekluZGV4IGlmIGN1cnJlbnRseSBkcmFnZ2luZyBhbmQgcHJvcCBoYXMgYmVlbiBwcm92aWRlZFxuICAgIGlmICh0aGlzLnN0YXRlLmRyYWdnaW5nICYmICFpc05hTih0aGlzLnByb3BzLnpJbmRleCkpIHtcbiAgICAgIHN0eWxlLnpJbmRleCA9IHRoaXMucHJvcHMuekluZGV4O1xuICAgIH1cblxuICAgIHZhciBjbGFzc05hbWUgPSBjbGFzc05hbWVzKCh0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmNsYXNzTmFtZSB8fCAnJyksICdyZWFjdC1kcmFnZ2FibGUnLCB7XG4gICAgICAncmVhY3QtZHJhZ2dhYmxlLWRyYWdnaW5nJzogdGhpcy5zdGF0ZS5kcmFnZ2luZyxcbiAgICAgICdyZWFjdC1kcmFnZ2FibGUtZHJhZ2dlZCc6IHRoaXMuc3RhdGUuZHJhZ2dlZFxuICAgIH0pO1xuXG4gICAgLy8gUmV1c2UgdGhlIGNoaWxkIHByb3ZpZGVkXG4gICAgLy8gVGhpcyBtYWtlcyBpdCBmbGV4aWJsZSB0byB1c2Ugd2hhdGV2ZXIgZWxlbWVudCBpcyB3YW50ZWQgKGRpdiwgdWwsIGV0YylcbiAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KFJlYWN0LkNoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbiksIHtcbiAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICAgIHRyYW5zZm9ybTogc3ZnVHJhbnNmb3JtLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG5cbiAgICAgIG9uTW91c2VEb3duOiB0aGlzLm9uTW91c2VEb3duLFxuICAgICAgb25Ub3VjaFN0YXJ0OiB0aGlzLm9uVG91Y2hTdGFydCxcbiAgICAgIG9uTW91c2VVcDogdGhpcy5oYW5kbGVEcmFnRW5kLFxuICAgICAgb25Ub3VjaEVuZDogdGhpcy5oYW5kbGVEcmFnRW5kXG4gICAgfSk7XG4gIH1cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvZHJhZ2dhYmxlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiUmVhY3RcIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4ndXNlIHN0cmljdCc7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vb2JqZWN0LWFzc2lnbi9pbmRleC5qc1xuICoqLyIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTUgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXG5cdFx0dmFyIGNsYXNzZXMgPSAnJztcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmICgnc3RyaW5nJyA9PT0gYXJnVHlwZSB8fCAnbnVtYmVyJyA9PT0gYXJnVHlwZSkge1xuXHRcdFx0XHRjbGFzc2VzICs9ICcgJyArIGFyZztcblxuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3NlcyArPSAnICcgKyBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cblx0XHRcdH0gZWxzZSBpZiAoJ29iamVjdCcgPT09IGFyZ1R5cGUpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChhcmcuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3NlcyArPSAnICcgKyBrZXk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuc3Vic3RyKDEpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpe1xuXHRcdC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cblx0XHRkZWZpbmUoZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG5cbn0oKSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY2xhc3NuYW1lcy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuICcnO1xuICAvLyBUaGFua3MgRGF2aWQgV2Fsc2hcbiAgdmFyIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJycpLFxuICBwcmUgPSAoQXJyYXkucHJvdG90eXBlLnNsaWNlXG4gICAgICAgIC5jYWxsKHN0eWxlcylcbiAgICAgICAgLmpvaW4oJycpXG4gICAgICAgIC5tYXRjaCgvLShtb3p8d2Via2l0fG1zKS0vKSB8fCAoc3R5bGVzLk9MaW5rID09PSAnJyAmJiBbJycsICdvJ10pXG4gICAgICApWzFdO1xuICAvLyAnbXMnIGlzIG5vdCB0aXRsZWNhc2VkXG4gIGlmIChwcmUgPT09ICdtcycpIHJldHVybiBwcmU7XG4gIHJldHVybiBwcmUuc2xpY2UoMCwgMSkudG9VcHBlckNhc2UoKSArIHByZS5zbGljZSgxKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9nZXRQcmVmaXguanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9