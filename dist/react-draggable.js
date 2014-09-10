(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Draggable"] = factory(require("React"));
	else
		root["Draggable"] = factory(root["React"]);
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
	
	/** @jsx React.DOM */
	var React = __webpack_require__(2);
	var emptyFunction = __webpack_require__(3);
	
	function createUIEvent(draggable) {
		return {
			position: {
				top: draggable.state.clientY,
				left: draggable.state.clientX
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
	
	function isFunction(fn) {
		return typeof fn === 'function';
	}
	
	function matchesSelector(el, selector) {
		if (isFunction(el.matches)) {
			return el.matches(selector);
		} else if (isFunction(el.webkitMatchesSelector)) {
			return el.webkitMatchesSelector(selector);
		} else if (isFunction(el.mozMatchesSelector)) {
			return el.mozMatchesSelector(selector);
		} else if (isFunction(el.msMatchesSelector)) {
			return el.msMatchesSelector(selector);
		} else if (isFunction(el.oMatchesSelector)) {
			return el.oMatchesSelector(selector);
		} else if (isFunction(el.webkitMatchesSelector)) {
			return el.webkitMatchesSelector(selector);
		}
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
			 * `handle` specifies a selector to be used as the handle that initiates drag.
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	    	return (
			 * 	    	 	<Draggable handle=".handle">
			 * 	    	 	  <div>
			 * 	    	 	      <div className="handle">Click me to drag</div>
			 * 	    	 	      <div>This is some other content</div>
			 * 	    	 	  </div>
			 * 	    		</Draggable>
			 * 	    	);
			 * 	    }
			 * 	});
			 * ```
			 */
			handle: React.PropTypes.string,
	
			/**
			 * `cancel` specifies a selector to be used to prevent drag initialization.
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	        return(
			 * 	            <Draggable cancel=".cancel">
			 * 	                <div>
			 * 	                	<div className="cancel">You can't drag from here</div>
			 *						<div>Dragging here works fine</div>
			 * 	                </div>
			 * 	            </Draggable>
			 * 	        );
			 * 	    }
			 * 	});
			 * ```
			 */
			cancel: React.PropTypes.string,
	
			/**
			 * `grid` specifies the x and y that dragging should snap to.
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	        return (
			 * 	            <Draggable grid={[25, 25]}>
			 * 	                <div>I snap to a 25 x 25 grid</div>
			 * 	            </Draggable>
			 * 	        );
			 * 	    }
			 * 	});
			 * ```
			 */
			grid: React.PropTypes.arrayOf(React.PropTypes.number),
	
			/**
			 * `start` specifies the x and y that the dragged item should start at
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	        return (
			 * 	            <Draggable start={{x: 25, y: 25}}>
			 * 	                <div>I start with left: 25px; top: 25px;</div>
			 * 	            </Draggable>
			 * 	        );
			 * 	    }
			 * 	});
			 * ```
			 */
			start: React.PropTypes.object,
	
			/**
			 * `zIndex` specifies the zIndex to use while dragging.
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	        return (
			 * 	            <Draggable zIndex={100}>
			 * 	                <div>I have a zIndex</div>
			 * 	            </Draggable>
			 * 	        );
			 * 	    }
			 * 	});
			 * ```
			 */
			zIndex: React.PropTypes.number,
	
			/**
			 * Called when dragging starts.
			 *
			 * Example:
			 *
			 * ```js
			 *	function (event, ui) {}
			 * ```
			 *
			 * `event` is the Event that was triggered.
			 * `ui` is an object:
			 *
			 * ```js
			 *	{
			 *		position: {top: 0, left: 0}
			 *	}
			 * ```
			 */
			onStart: React.PropTypes.func,
	
			/**
			 * Called while dragging.
			 *
			 * Example:
			 *
			 * ```js
			 *	function (event, ui) {}
			 * ```
			 *
			 * `event` is the Event that was triggered.
			 * `ui` is an object:
			 *
			 * ```js
			 *	{
			 *		position: {top: 0, left: 0}
			 *	}
			 * ```
			 */
			onDrag: React.PropTypes.func,
	
			/**
			 * Called when dragging stops.
			 *
			 * Example:
			 *
			 * ```js
			 *	function (event, ui) {}
			 * ```
			 *
			 * `event` is the Event that was triggered.
			 * `ui` is an object:
			 *
			 * ```js
			 *	{
			 *		position: {top: 0, left: 0}
			 *	}
			 * ```
			 */
			onStop: React.PropTypes.func,
	
			/**
			 * A workaround option which can be passed if onMouseDown needs to be accessed, since it'll always be blocked (due to that there's internal use of onMouseDown)
			 *
			 */
			onMouseDown: React.PropTypes.func
		},
	
		componentWillUnmount: function() {
			// Remove any leftover event handlers
			removeEvent(window, 'mousemove', this.handleMouseMove);
			removeEvent(window, 'mouseup', this.handleMouseUp);
		},
	
		getDefaultProps: function () {
			return {
				axis: 'both',
				handle: null,
				cancel: null,
				grid: null,
				start: {
					x: 0,
					y: 0
				},
				zIndex: NaN,
				onStart: emptyFunction,
				onDrag: emptyFunction,
				onStop: emptyFunction,
				onMouseDown: emptyFunction
			};
		},
	
		getInitialState: function () {
			return {
				// Whether or not currently dragging
				dragging: false,
	
				// Start top/left of this.getDOMNode()
				startX: 0, startY: 0,
	
				// Offset between start top/left and mouse top/left
				offsetX: 0, offsetY: 0,
	
				// Current top/left of this.getDOMNode()
				clientX: this.props.start.x, clientY: this.props.start.y
			};
		},
	
		handleMouseDown: function (e) {
			// Make it possible to attach event handlers on top of this one
			this.props.onMouseDown(e);
	
			var node = this.getDOMNode();
	
			// Short circuit if handle or cancel prop was provided and selector doesn't match
			if ((this.props.handle && !matchesSelector(e.target, this.props.handle)) ||
				(this.props.cancel && matchesSelector(e.target, this.props.cancel))) {
				return;
			}
	
			// Initiate dragging
			this.setState({
				dragging: true,
				offsetX: e.clientX,
				offsetY: e.clientY,
				startX: parseInt(node.style.left, 10) || 0,
				startY: parseInt(node.style.top, 10) || 0
			});
	
			// Call event handler
			this.props.onStart(e, createUIEvent(this));
	
			// Add event handlers
			addEvent(window, 'mousemove', this.handleMouseMove);
			addEvent(window, 'mouseup', this.handleMouseUp);
		},
	
		handleMouseUp: function (e) {
			// Short circuit if not currently dragging
			if (!this.state.dragging) {
				return;
			}
	
			// Turn off dragging
			this.setState({
				dragging: false
			});
	
			// Call event handler
			this.props.onStop(e, createUIEvent(this));
	
			// Remove event handlers
			removeEvent(window, 'mousemove', this.handleMouseMove);
			removeEvent(window, 'mouseup', this.handleMouseUp);
		},
	
		handleMouseMove: function (e) {
			// Calculate top and left
			var clientX = (this.state.startX + (e.clientX - this.state.offsetX));
			var clientY = (this.state.startY + (e.clientY - this.state.offsetY));
	
			// Snap to grid if prop has been provided
			if (Array.isArray(this.props.grid)) {
				clientX = Math.abs(clientX - this.state.clientX) >= this.props.grid[0]
						? clientX
						: this.state.clientX;
	
				clientY = Math.abs(clientY - this.state.clientY) >= this.props.grid[1]
						? clientY
						: this.state.clientY;
			}
	
			// Update top and left
			this.setState({
				clientX: clientX,
				clientY: clientY
			});
	
			// Call event handler
			this.props.onDrag(e, createUIEvent(this));
		},
	
		render: function () {
			var style = {
				// Set top if vertical drag is enabled
				top: canDragY(this)
					? this.state.clientY
					: this.state.startY,
	
				// Set left if horizontal drag is enabled
				left: canDragX(this)
					? this.state.clientX
					: this.state.startX
			};
	
			// Set zIndex if currently dragging and prop has been provided
			if (this.state.dragging && !isNaN(this.props.zIndex)) {
				style.zIndex = this.props.zIndex;
			}
	
			// Reuse the child provided
			// This makes it flexible to use whatever element is wanted (div, ul, etc)
			return React.addons.cloneWithProps(React.Children.only(this.props.children), {
				style: style,
				className: 'react-draggable',
				onMouseUp: this.handleMouseUp,
				onMouseDown: this.handleMouseDown
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

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule emptyFunction
	 */
	
	var copyProperties = __webpack_require__(4);
	
	function makeEmptyFunction(arg) {
	  return function() {
	    return arg;
	  };
	}
	
	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}
	
	copyProperties(emptyFunction, {
	  thatReturns: makeEmptyFunction,
	  thatReturnsFalse: makeEmptyFunction(false),
	  thatReturnsTrue: makeEmptyFunction(true),
	  thatReturnsNull: makeEmptyFunction(null),
	  thatReturnsThis: function() { return this; },
	  thatReturnsArgument: function(arg) { return arg; }
	});
	
	module.exports = emptyFunction;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule copyProperties
	 */
	
	/**
	 * Copy properties from one or more objects (up to 5) into the first object.
	 * This is a shallow copy. It mutates the first object and also returns it.
	 *
	 * NOTE: `arguments` has a very significant performance penalty, which is why
	 * we don't support unlimited arguments.
	 */
	function copyProperties(obj, a, b, c, d, e, f) {
	  obj = obj || {};
	
	  if ("production" !== process.env.NODE_ENV) {
	    if (f) {
	      throw new Error('Too many arguments passed to copyProperties');
	    }
	  }
	
	  var args = [a, b, c, d, e];
	  var ii = 0, v;
	  while (args[ii]) {
	    v = args[ii++];
	    for (var k in v) {
	      obj[k] = v[k];
	    }
	
	    // IE ignores toString in object iteration.. See:
	    // webreflection.blogspot.com/2007/07/quick-fix-internet-explorer-and.html
	    if (v.hasOwnProperty && v.hasOwnProperty('toString') &&
	        (typeof v.toString != 'undefined') && (obj.toString !== v.toString)) {
	      obj.toString = v.toString;
	    }
	  }
	
	  return obj;
	}
	
	module.exports = copyProperties;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;
	
	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }
	
	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();
	
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	}
	
	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ }
/******/ ])
})

//# sourceMappingURL=react-draggable.map