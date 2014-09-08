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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kaXN0L3JlYWN0LWRyYWdnYWJsZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDZjOWI5NWVhMDhjZjg4OWI1MjViIiwid2VicGFjazovLy8uL2xpYi9tYWluLmpzIiwid2VicGFjazovLy8uL2xpYi9kcmFnZ2FibGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9lbXB0eUZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2NvcHlQcm9wZXJ0aWVzLmpzIiwid2VicGFjazovLy8od2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L3Byb2Nlc3MvYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7OztDQ3RDQTs7Ozs7Q0NBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DLFNBQVM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxjQUFjO0FBQ25ELG9EQUFtRCxXQUFXO0FBQzlEO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLElBQUk7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxFQUFDOzs7OztDQ3ZZRCxnRDs7OztDQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLGFBQWEsRUFBRTtBQUM5Qyx1Q0FBc0MsWUFBWTtBQUNsRCxFQUFDOztBQUVEOzs7OztDQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7OztDQ3JEQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBNkI7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJSZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEcmFnZ2FibGVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRHJhZ2dhYmxlXCJdID0gZmFjdG9yeShyb290W1wiUmVhY3RcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2YzliOTVlYTA4Y2Y4ODliNTI1YlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kcmFnZ2FibGUnKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9saWIvbWFpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdC9hZGRvbnMnKTtcbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgncmVhY3QvbGliL2VtcHR5RnVuY3Rpb24nKTtcblxuZnVuY3Rpb24gY3JlYXRlVUlFdmVudChkcmFnZ2FibGUpIHtcblx0cmV0dXJuIHtcblx0XHRwb3NpdGlvbjoge1xuXHRcdFx0dG9wOiBkcmFnZ2FibGUuc3RhdGUuY2xpZW50WSxcblx0XHRcdGxlZnQ6IGRyYWdnYWJsZS5zdGF0ZS5jbGllbnRYXG5cdFx0fVxuXHR9O1xufVxuXG5mdW5jdGlvbiBjYW5EcmFnWShkcmFnZ2FibGUpIHtcblx0cmV0dXJuIGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAnYm90aCcgfHxcblx0XHRcdGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAneSc7XG59XG5cbmZ1bmN0aW9uIGNhbkRyYWdYKGRyYWdnYWJsZSkge1xuXHRyZXR1cm4gZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICdib3RoJyB8fFxuXHRcdFx0ZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICd4Jztcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbihmbikge1xuXHRyZXR1cm4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3IoZWwsIHNlbGVjdG9yKSB7XG5cdGlmIChpc0Z1bmN0aW9uKGVsLm1hdGNoZXMpKSB7XG5cdFx0cmV0dXJuIGVsLm1hdGNoZXMoc2VsZWN0b3IpO1xuXHR9IGVsc2UgaWYgKGlzRnVuY3Rpb24oZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yKSkge1xuXHRcdHJldHVybiBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuXHR9IGVsc2UgaWYgKGlzRnVuY3Rpb24oZWwubW96TWF0Y2hlc1NlbGVjdG9yKSkge1xuXHRcdHJldHVybiBlbC5tb3pNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuXHR9IGVsc2UgaWYgKGlzRnVuY3Rpb24oZWwubXNNYXRjaGVzU2VsZWN0b3IpKSB7XG5cdFx0cmV0dXJuIGVsLm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcblx0fSBlbHNlIGlmIChpc0Z1bmN0aW9uKGVsLm9NYXRjaGVzU2VsZWN0b3IpKSB7XG5cdFx0cmV0dXJuIGVsLm9NYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuXHR9IGVsc2UgaWYgKGlzRnVuY3Rpb24oZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yKSkge1xuXHRcdHJldHVybiBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50KGVsLCBldmVudCwgaGFuZGxlcikge1xuXHRpZiAoIWVsKSB7IHJldHVybjsgfVxuXHRpZiAoZWwuYXR0YWNoRXZlbnQpIHtcblx0XHRlbC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGhhbmRsZXIpO1xuXHR9IGVsc2UgaWYgKGVsLmFkZEV2ZW50TGlzdGVuZXIpIHtcblx0XHRlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCB0cnVlKTtcblx0fSBlbHNlIHtcblx0XHRlbFsnb24nICsgZXZlbnRdID0gaGFuZGxlcjtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudChlbCwgZXZlbnQsIGhhbmRsZXIpIHtcblx0aWYgKCFlbCkgeyByZXR1cm47IH1cblx0aWYgKGVsLmRldGFjaEV2ZW50KSB7XG5cdFx0ZWwuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcblx0fSBlbHNlIGlmIChlbC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG5cdFx0ZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgdHJ1ZSk7XG5cdH0gZWxzZSB7XG5cdFx0ZWxbJ29uJyArIGV2ZW50XSA9IG51bGw7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnRHJhZ2dhYmxlJyxcblxuXHRwcm9wVHlwZXM6IHtcblx0XHQvKipcblx0XHQgKiBgYXhpc2AgZGV0ZXJtaW5lcyB3aGljaCBheGlzIHRoZSBkcmFnZ2FibGUgY2FuIG1vdmUuXG5cdFx0ICpcblx0XHQgKiAnYm90aCcgYWxsb3dzIG1vdmVtZW50IGhvcml6b250YWxseSBhbmQgdmVydGljYWxseS5cblx0XHQgKiAneCcgbGltaXRzIG1vdmVtZW50IHRvIGhvcml6b250YWwgYXhpcy5cblx0XHQgKiAneScgbGltaXRzIG1vdmVtZW50IHRvIHZlcnRpY2FsIGF4aXMuXG5cdFx0ICpcblx0XHQgKiBEZWZhdWx0cyB0byAnYm90aCcuXG5cdFx0ICovXG5cdFx0YXhpczogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnYm90aCcsICd4JywgJ3knXSksXG5cblx0XHQvKipcblx0XHQgKiBgaGFuZGxlYCBzcGVjaWZpZXMgYSBzZWxlY3RvciB0byBiZSB1c2VkIGFzIHRoZSBoYW5kbGUgdGhhdCBpbml0aWF0ZXMgZHJhZy5cblx0XHQgKlxuXHRcdCAqIEV4YW1wbGU6XG5cdFx0ICpcblx0XHQgKiBgYGBqc3hcblx0XHQgKiBcdHZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0ICogXHQgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0ICogXHQgICAgXHRyZXR1cm4gKFxuXHRcdCAqIFx0ICAgIFx0IFx0PERyYWdnYWJsZSBoYW5kbGU9XCIuaGFuZGxlXCI+XG5cdFx0ICogXHQgICAgXHQgXHQgIDxkaXY+XG5cdFx0ICogXHQgICAgXHQgXHQgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhhbmRsZVwiPkNsaWNrIG1lIHRvIGRyYWc8L2Rpdj5cblx0XHQgKiBcdCAgICBcdCBcdCAgICAgIDxkaXY+VGhpcyBpcyBzb21lIG90aGVyIGNvbnRlbnQ8L2Rpdj5cblx0XHQgKiBcdCAgICBcdCBcdCAgPC9kaXY+XG5cdFx0ICogXHQgICAgXHRcdDwvRHJhZ2dhYmxlPlxuXHRcdCAqIFx0ICAgIFx0KTtcblx0XHQgKiBcdCAgICB9XG5cdFx0ICogXHR9KTtcblx0XHQgKiBgYGBcblx0XHQgKi9cblx0XHRoYW5kbGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cblx0XHQvKipcblx0XHQgKiBgY2FuY2VsYCBzcGVjaWZpZXMgYSBzZWxlY3RvciB0byBiZSB1c2VkIHRvIHByZXZlbnQgZHJhZyBpbml0aWFsaXphdGlvbi5cblx0XHQgKlxuXHRcdCAqIEV4YW1wbGU6XG5cdFx0ICpcblx0XHQgKiBgYGBqc3hcblx0XHQgKiBcdHZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0ICogXHQgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0ICogXHQgICAgICAgIHJldHVybihcblx0XHQgKiBcdCAgICAgICAgICAgIDxEcmFnZ2FibGUgY2FuY2VsPVwiLmNhbmNlbFwiPlxuXHRcdCAqIFx0ICAgICAgICAgICAgICAgIDxkaXY+XG5cdFx0ICogXHQgICAgICAgICAgICAgICAgXHQ8ZGl2IGNsYXNzTmFtZT1cImNhbmNlbFwiPllvdSBjYW4ndCBkcmFnIGZyb20gaGVyZTwvZGl2PlxuXHRcdCAqXHRcdFx0XHRcdFx0PGRpdj5EcmFnZ2luZyBoZXJlIHdvcmtzIGZpbmU8L2Rpdj5cblx0XHQgKiBcdCAgICAgICAgICAgICAgICA8L2Rpdj5cblx0XHQgKiBcdCAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuXHRcdCAqIFx0ICAgICAgICApO1xuXHRcdCAqIFx0ICAgIH1cblx0XHQgKiBcdH0pO1xuXHRcdCAqIGBgYFxuXHRcdCAqL1xuXHRcdGNhbmNlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuXHRcdC8qKlxuXHRcdCAqIGBncmlkYCBzcGVjaWZpZXMgdGhlIHggYW5kIHkgdGhhdCBkcmFnZ2luZyBzaG91bGQgc25hcCB0by5cblx0XHQgKlxuXHRcdCAqIEV4YW1wbGU6XG5cdFx0ICpcblx0XHQgKiBgYGBqc3hcblx0XHQgKiBcdHZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0ICogXHQgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0ICogXHQgICAgICAgIHJldHVybiAoXG5cdFx0ICogXHQgICAgICAgICAgICA8RHJhZ2dhYmxlIGdyaWQ9e1syNSwgMjVdfT5cblx0XHQgKiBcdCAgICAgICAgICAgICAgICA8ZGl2Pkkgc25hcCB0byBhIDI1IHggMjUgZ3JpZDwvZGl2PlxuXHRcdCAqIFx0ICAgICAgICAgICAgPC9EcmFnZ2FibGU+XG5cdFx0ICogXHQgICAgICAgICk7XG5cdFx0ICogXHQgICAgfVxuXHRcdCAqIFx0fSk7XG5cdFx0ICogYGBgXG5cdFx0ICovXG5cdFx0Z3JpZDogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG5cblx0XHQvKipcblx0XHQgKiBgc3RhcnRgIHNwZWNpZmllcyB0aGUgeCBhbmQgeSB0aGF0IHRoZSBkcmFnZ2VkIGl0ZW0gc2hvdWxkIHN0YXJ0IGF0XG5cdFx0ICpcblx0XHQgKiBFeGFtcGxlOlxuXHRcdCAqXG5cdFx0ICogYGBganN4XG5cdFx0ICogXHR2YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdCAqIFx0ICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXHRcdCAqIFx0ICAgICAgICByZXR1cm4gKFxuXHRcdCAqIFx0ICAgICAgICAgICAgPERyYWdnYWJsZSBzdGFydD17e3g6IDI1LCB5OiAyNX19PlxuXHRcdCAqIFx0ICAgICAgICAgICAgICAgIDxkaXY+SSBzdGFydCB3aXRoIGxlZnQ6IDI1cHg7IHRvcDogMjVweDs8L2Rpdj5cblx0XHQgKiBcdCAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuXHRcdCAqIFx0ICAgICAgICApO1xuXHRcdCAqIFx0ICAgIH1cblx0XHQgKiBcdH0pO1xuXHRcdCAqIGBgYFxuXHRcdCAqL1xuXHRcdHN0YXJ0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXG5cdFx0LyoqXG5cdFx0ICogYHpJbmRleGAgc3BlY2lmaWVzIHRoZSB6SW5kZXggdG8gdXNlIHdoaWxlIGRyYWdnaW5nLlxuXHRcdCAqXG5cdFx0ICogRXhhbXBsZTpcblx0XHQgKlxuXHRcdCAqIGBgYGpzeFxuXHRcdCAqIFx0dmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHQgKiBcdCAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblx0XHQgKiBcdCAgICAgICAgcmV0dXJuIChcblx0XHQgKiBcdCAgICAgICAgICAgIDxEcmFnZ2FibGUgekluZGV4PXsxMDB9PlxuXHRcdCAqIFx0ICAgICAgICAgICAgICAgIDxkaXY+SSBoYXZlIGEgekluZGV4PC9kaXY+XG5cdFx0ICogXHQgICAgICAgICAgICA8L0RyYWdnYWJsZT5cblx0XHQgKiBcdCAgICAgICAgKTtcblx0XHQgKiBcdCAgICB9XG5cdFx0ICogXHR9KTtcblx0XHQgKiBgYGBcblx0XHQgKi9cblx0XHR6SW5kZXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cblx0XHQvKipcblx0XHQgKiBDYWxsZWQgd2hlbiBkcmFnZ2luZyBzdGFydHMuXG5cdFx0ICpcblx0XHQgKiBFeGFtcGxlOlxuXHRcdCAqXG5cdFx0ICogYGBganNcblx0XHQgKlx0ZnVuY3Rpb24gKGV2ZW50LCB1aSkge31cblx0XHQgKiBgYGBcblx0XHQgKlxuXHRcdCAqIGBldmVudGAgaXMgdGhlIEV2ZW50IHRoYXQgd2FzIHRyaWdnZXJlZC5cblx0XHQgKiBgdWlgIGlzIGFuIG9iamVjdDpcblx0XHQgKlxuXHRcdCAqIGBgYGpzXG5cdFx0ICpcdHtcblx0XHQgKlx0XHRwb3NpdGlvbjoge3RvcDogMCwgbGVmdDogMH1cblx0XHQgKlx0fVxuXHRcdCAqIGBgYFxuXHRcdCAqL1xuXHRcdG9uU3RhcnQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG5cdFx0LyoqXG5cdFx0ICogQ2FsbGVkIHdoaWxlIGRyYWdnaW5nLlxuXHRcdCAqXG5cdFx0ICogRXhhbXBsZTpcblx0XHQgKlxuXHRcdCAqIGBgYGpzXG5cdFx0ICpcdGZ1bmN0aW9uIChldmVudCwgdWkpIHt9XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiBgZXZlbnRgIGlzIHRoZSBFdmVudCB0aGF0IHdhcyB0cmlnZ2VyZWQuXG5cdFx0ICogYHVpYCBpcyBhbiBvYmplY3Q6XG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqXHR7XG5cdFx0ICpcdFx0cG9zaXRpb246IHt0b3A6IDAsIGxlZnQ6IDB9XG5cdFx0ICpcdH1cblx0XHQgKiBgYGBcblx0XHQgKi9cblx0XHRvbkRyYWc6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG5cdFx0LyoqXG5cdFx0ICogQ2FsbGVkIHdoZW4gZHJhZ2dpbmcgc3RvcHMuXG5cdFx0ICpcblx0XHQgKiBFeGFtcGxlOlxuXHRcdCAqXG5cdFx0ICogYGBganNcblx0XHQgKlx0ZnVuY3Rpb24gKGV2ZW50LCB1aSkge31cblx0XHQgKiBgYGBcblx0XHQgKlxuXHRcdCAqIGBldmVudGAgaXMgdGhlIEV2ZW50IHRoYXQgd2FzIHRyaWdnZXJlZC5cblx0XHQgKiBgdWlgIGlzIGFuIG9iamVjdDpcblx0XHQgKlxuXHRcdCAqIGBgYGpzXG5cdFx0ICpcdHtcblx0XHQgKlx0XHRwb3NpdGlvbjoge3RvcDogMCwgbGVmdDogMH1cblx0XHQgKlx0fVxuXHRcdCAqIGBgYFxuXHRcdCAqL1xuXHRcdG9uU3RvcDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cblx0XHQvKipcblx0XHQgKiBBIHdvcmthcm91bmQgb3B0aW9uIHdoaWNoIGNhbiBiZSBwYXNzZWQgaWYgb25Nb3VzZURvd24gbmVlZHMgdG8gYmUgYWNjZXNzZWQsIHNpbmNlIGl0J2xsIGFsd2F5cyBiZSBibG9ja2VkIChkdWUgdG8gdGhhdCB0aGVyZSdzIGludGVybmFsIHVzZSBvZiBvbk1vdXNlRG93bilcblx0XHQgKlxuXHRcdCAqL1xuXHRcdG9uTW91c2VEb3duOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHR9LFxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpIHtcblx0XHQvLyBSZW1vdmUgYW55IGxlZnRvdmVyIGV2ZW50IGhhbmRsZXJzXG5cdFx0cmVtb3ZlRXZlbnQod2luZG93LCAnbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuXHRcdHJlbW92ZUV2ZW50KHdpbmRvdywgJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuXHR9LFxuXG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRheGlzOiAnYm90aCcsXG5cdFx0XHRoYW5kbGU6IG51bGwsXG5cdFx0XHRjYW5jZWw6IG51bGwsXG5cdFx0XHRncmlkOiBudWxsLFxuXHRcdFx0c3RhcnQ6IHtcblx0XHRcdFx0eDogMCxcblx0XHRcdFx0eTogMFxuXHRcdFx0fSxcblx0XHRcdHpJbmRleDogTmFOLFxuXHRcdFx0b25TdGFydDogZW1wdHlGdW5jdGlvbixcblx0XHRcdG9uRHJhZzogZW1wdHlGdW5jdGlvbixcblx0XHRcdG9uU3RvcDogZW1wdHlGdW5jdGlvbixcblx0XHRcdG9uTW91c2VEb3duOiBlbXB0eUZ1bmN0aW9uXG5cdFx0fTtcblx0fSxcblxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Ly8gV2hldGhlciBvciBub3QgY3VycmVudGx5IGRyYWdnaW5nXG5cdFx0XHRkcmFnZ2luZzogZmFsc2UsXG5cblx0XHRcdC8vIFN0YXJ0IHRvcC9sZWZ0IG9mIHRoaXMuZ2V0RE9NTm9kZSgpXG5cdFx0XHRzdGFydFg6IDAsIHN0YXJ0WTogMCxcblxuXHRcdFx0Ly8gT2Zmc2V0IGJldHdlZW4gc3RhcnQgdG9wL2xlZnQgYW5kIG1vdXNlIHRvcC9sZWZ0XG5cdFx0XHRvZmZzZXRYOiAwLCBvZmZzZXRZOiAwLFxuXG5cdFx0XHQvLyBDdXJyZW50IHRvcC9sZWZ0IG9mIHRoaXMuZ2V0RE9NTm9kZSgpXG5cdFx0XHRjbGllbnRYOiB0aGlzLnByb3BzLnN0YXJ0LngsIGNsaWVudFk6IHRoaXMucHJvcHMuc3RhcnQueVxuXHRcdH07XG5cdH0sXG5cblx0aGFuZGxlTW91c2VEb3duOiBmdW5jdGlvbiAoZSkge1xuXHRcdC8vIE1ha2UgaXQgcG9zc2libGUgdG8gYXR0YWNoIGV2ZW50IGhhbmRsZXJzIG9uIHRvcCBvZiB0aGlzIG9uZVxuXHRcdHRoaXMucHJvcHMub25Nb3VzZURvd24oZSk7XG5cblx0XHR2YXIgbm9kZSA9IHRoaXMuZ2V0RE9NTm9kZSgpO1xuXG5cdFx0Ly8gU2hvcnQgY2lyY3VpdCBpZiBoYW5kbGUgb3IgY2FuY2VsIHByb3Agd2FzIHByb3ZpZGVkIGFuZCBzZWxlY3RvciBkb2Vzbid0IG1hdGNoXG5cdFx0aWYgKCh0aGlzLnByb3BzLmhhbmRsZSAmJiAhbWF0Y2hlc1NlbGVjdG9yKGUudGFyZ2V0LCB0aGlzLnByb3BzLmhhbmRsZSkpIHx8XG5cdFx0XHQodGhpcy5wcm9wcy5jYW5jZWwgJiYgbWF0Y2hlc1NlbGVjdG9yKGUudGFyZ2V0LCB0aGlzLnByb3BzLmNhbmNlbCkpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gSW5pdGlhdGUgZHJhZ2dpbmdcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGRyYWdnaW5nOiB0cnVlLFxuXHRcdFx0b2Zmc2V0WDogZS5jbGllbnRYLFxuXHRcdFx0b2Zmc2V0WTogZS5jbGllbnRZLFxuXHRcdFx0c3RhcnRYOiBwYXJzZUludChub2RlLnN0eWxlLmxlZnQsIDEwKSB8fCAwLFxuXHRcdFx0c3RhcnRZOiBwYXJzZUludChub2RlLnN0eWxlLnRvcCwgMTApIHx8IDBcblx0XHR9KTtcblxuXHRcdC8vIENhbGwgZXZlbnQgaGFuZGxlclxuXHRcdHRoaXMucHJvcHMub25TdGFydChlLCBjcmVhdGVVSUV2ZW50KHRoaXMpKTtcblxuXHRcdC8vIEFkZCBldmVudCBoYW5kbGVyc1xuXHRcdGFkZEV2ZW50KHdpbmRvdywgJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlKTtcblx0XHRhZGRFdmVudCh3aW5kb3csICdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcblx0fSxcblxuXHRoYW5kbGVNb3VzZVVwOiBmdW5jdGlvbiAoZSkge1xuXHRcdC8vIFNob3J0IGNpcmN1aXQgaWYgbm90IGN1cnJlbnRseSBkcmFnZ2luZ1xuXHRcdGlmICghdGhpcy5zdGF0ZS5kcmFnZ2luZykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFR1cm4gb2ZmIGRyYWdnaW5nXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRkcmFnZ2luZzogZmFsc2Vcblx0XHR9KTtcblxuXHRcdC8vIENhbGwgZXZlbnQgaGFuZGxlclxuXHRcdHRoaXMucHJvcHMub25TdG9wKGUsIGNyZWF0ZVVJRXZlbnQodGhpcykpO1xuXG5cdFx0Ly8gUmVtb3ZlIGV2ZW50IGhhbmRsZXJzXG5cdFx0cmVtb3ZlRXZlbnQod2luZG93LCAnbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuXHRcdHJlbW92ZUV2ZW50KHdpbmRvdywgJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuXHR9LFxuXG5cdGhhbmRsZU1vdXNlTW92ZTogZnVuY3Rpb24gKGUpIHtcblx0XHQvLyBDYWxjdWxhdGUgdG9wIGFuZCBsZWZ0XG5cdFx0dmFyIGNsaWVudFggPSAodGhpcy5zdGF0ZS5zdGFydFggKyAoZS5jbGllbnRYIC0gdGhpcy5zdGF0ZS5vZmZzZXRYKSk7XG5cdFx0dmFyIGNsaWVudFkgPSAodGhpcy5zdGF0ZS5zdGFydFkgKyAoZS5jbGllbnRZIC0gdGhpcy5zdGF0ZS5vZmZzZXRZKSk7XG5cblx0XHQvLyBTbmFwIHRvIGdyaWQgaWYgcHJvcCBoYXMgYmVlbiBwcm92aWRlZFxuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuZ3JpZCkpIHtcblx0XHRcdGNsaWVudFggPSBNYXRoLmFicyhjbGllbnRYIC0gdGhpcy5zdGF0ZS5jbGllbnRYKSA+PSB0aGlzLnByb3BzLmdyaWRbMF1cblx0XHRcdFx0XHQ/IGNsaWVudFhcblx0XHRcdFx0XHQ6IHRoaXMuc3RhdGUuY2xpZW50WDtcblxuXHRcdFx0Y2xpZW50WSA9IE1hdGguYWJzKGNsaWVudFkgLSB0aGlzLnN0YXRlLmNsaWVudFkpID49IHRoaXMucHJvcHMuZ3JpZFsxXVxuXHRcdFx0XHRcdD8gY2xpZW50WVxuXHRcdFx0XHRcdDogdGhpcy5zdGF0ZS5jbGllbnRZO1xuXHRcdH1cblxuXHRcdC8vIFVwZGF0ZSB0b3AgYW5kIGxlZnRcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGNsaWVudFg6IGNsaWVudFgsXG5cdFx0XHRjbGllbnRZOiBjbGllbnRZXG5cdFx0fSk7XG5cblx0XHQvLyBDYWxsIGV2ZW50IGhhbmRsZXJcblx0XHR0aGlzLnByb3BzLm9uRHJhZyhlLCBjcmVhdGVVSUV2ZW50KHRoaXMpKTtcblx0fSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgc3R5bGUgPSB7XG5cdFx0XHQvLyBTZXQgdG9wIGlmIHZlcnRpY2FsIGRyYWcgaXMgZW5hYmxlZFxuXHRcdFx0dG9wOiBjYW5EcmFnWSh0aGlzKVxuXHRcdFx0XHQ/IHRoaXMuc3RhdGUuY2xpZW50WVxuXHRcdFx0XHQ6IHRoaXMuc3RhdGUuc3RhcnRZLFxuXG5cdFx0XHQvLyBTZXQgbGVmdCBpZiBob3Jpem9udGFsIGRyYWcgaXMgZW5hYmxlZFxuXHRcdFx0bGVmdDogY2FuRHJhZ1godGhpcylcblx0XHRcdFx0PyB0aGlzLnN0YXRlLmNsaWVudFhcblx0XHRcdFx0OiB0aGlzLnN0YXRlLnN0YXJ0WFxuXHRcdH07XG5cblx0XHQvLyBTZXQgekluZGV4IGlmIGN1cnJlbnRseSBkcmFnZ2luZyBhbmQgcHJvcCBoYXMgYmVlbiBwcm92aWRlZFxuXHRcdGlmICh0aGlzLnN0YXRlLmRyYWdnaW5nICYmICFpc05hTih0aGlzLnByb3BzLnpJbmRleCkpIHtcblx0XHRcdHN0eWxlLnpJbmRleCA9IHRoaXMucHJvcHMuekluZGV4O1xuXHRcdH1cblxuXHRcdC8vIFJldXNlIHRoZSBjaGlsZCBwcm92aWRlZFxuXHRcdC8vIFRoaXMgbWFrZXMgaXQgZmxleGlibGUgdG8gdXNlIHdoYXRldmVyIGVsZW1lbnQgaXMgd2FudGVkIChkaXYsIHVsLCBldGMpXG5cdFx0cmV0dXJuIFJlYWN0LmFkZG9ucy5jbG9uZVdpdGhQcm9wcyhSZWFjdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pLCB7XG5cdFx0XHRzdHlsZTogc3R5bGUsXG5cdFx0XHRjbGFzc05hbWU6ICdyZWFjdC1kcmFnZ2FibGUnLFxuXHRcdFx0b25Nb3VzZVVwOiB0aGlzLmhhbmRsZU1vdXNlVXAsXG5cdFx0XHRvbk1vdXNlRG93bjogdGhpcy5oYW5kbGVNb3VzZURvd25cblx0XHR9KTtcblx0fVxufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliL2RyYWdnYWJsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIlJlYWN0XCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgZW1wdHlGdW5jdGlvblxuICovXG5cbnZhciBjb3B5UHJvcGVydGllcyA9IHJlcXVpcmUoXCIuL2NvcHlQcm9wZXJ0aWVzXCIpO1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBhcmc7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuZCBkaXNjYXJkcyBpbnB1dHM7IGl0IGhhcyBubyBzaWRlIGVmZmVjdHMuIFRoaXMgaXNcbiAqIHByaW1hcmlseSB1c2VmdWwgaWRpb21hdGljYWxseSBmb3Igb3ZlcnJpZGFibGUgZnVuY3Rpb24gZW5kcG9pbnRzIHdoaWNoXG4gKiBhbHdheXMgbmVlZCB0byBiZSBjYWxsYWJsZSwgc2luY2UgSlMgbGFja3MgYSBudWxsLWNhbGwgaWRpb20gYWxhIENvY29hLlxuICovXG5mdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge31cblxuY29weVByb3BlcnRpZXMoZW1wdHlGdW5jdGlvbiwge1xuICB0aGF0UmV0dXJuczogbWFrZUVtcHR5RnVuY3Rpb24sXG4gIHRoYXRSZXR1cm5zRmFsc2U6IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKSxcbiAgdGhhdFJldHVybnNUcnVlOiBtYWtlRW1wdHlGdW5jdGlvbih0cnVlKSxcbiAgdGhhdFJldHVybnNOdWxsOiBtYWtlRW1wdHlGdW5jdGlvbihudWxsKSxcbiAgdGhhdFJldHVybnNUaGlzOiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0sXG4gIHRoYXRSZXR1cm5zQXJndW1lbnQ6IGZ1bmN0aW9uKGFyZykgeyByZXR1cm4gYXJnOyB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eUZ1bmN0aW9uO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2VtcHR5RnVuY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgY29weVByb3BlcnRpZXNcbiAqL1xuXG4vKipcbiAqIENvcHkgcHJvcGVydGllcyBmcm9tIG9uZSBvciBtb3JlIG9iamVjdHMgKHVwIHRvIDUpIGludG8gdGhlIGZpcnN0IG9iamVjdC5cbiAqIFRoaXMgaXMgYSBzaGFsbG93IGNvcHkuIEl0IG11dGF0ZXMgdGhlIGZpcnN0IG9iamVjdCBhbmQgYWxzbyByZXR1cm5zIGl0LlxuICpcbiAqIE5PVEU6IGBhcmd1bWVudHNgIGhhcyBhIHZlcnkgc2lnbmlmaWNhbnQgcGVyZm9ybWFuY2UgcGVuYWx0eSwgd2hpY2ggaXMgd2h5XG4gKiB3ZSBkb24ndCBzdXBwb3J0IHVubGltaXRlZCBhcmd1bWVudHMuXG4gKi9cbmZ1bmN0aW9uIGNvcHlQcm9wZXJ0aWVzKG9iaiwgYSwgYiwgYywgZCwgZSwgZikge1xuICBvYmogPSBvYmogfHwge307XG5cbiAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgIGlmIChmKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RvbyBtYW55IGFyZ3VtZW50cyBwYXNzZWQgdG8gY29weVByb3BlcnRpZXMnKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlXTtcbiAgdmFyIGlpID0gMCwgdjtcbiAgd2hpbGUgKGFyZ3NbaWldKSB7XG4gICAgdiA9IGFyZ3NbaWkrK107XG4gICAgZm9yICh2YXIgayBpbiB2KSB7XG4gICAgICBvYmpba10gPSB2W2tdO1xuICAgIH1cblxuICAgIC8vIElFIGlnbm9yZXMgdG9TdHJpbmcgaW4gb2JqZWN0IGl0ZXJhdGlvbi4uIFNlZTpcbiAgICAvLyB3ZWJyZWZsZWN0aW9uLmJsb2dzcG90LmNvbS8yMDA3LzA3L3F1aWNrLWZpeC1pbnRlcm5ldC1leHBsb3Jlci1hbmQuaHRtbFxuICAgIGlmICh2Lmhhc093blByb3BlcnR5ICYmIHYuaGFzT3duUHJvcGVydHkoJ3RvU3RyaW5nJykgJiZcbiAgICAgICAgKHR5cGVvZiB2LnRvU3RyaW5nICE9ICd1bmRlZmluZWQnKSAmJiAob2JqLnRvU3RyaW5nICE9PSB2LnRvU3RyaW5nKSkge1xuICAgICAgb2JqLnRvU3RyaW5nID0gdi50b1N0cmluZztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlQcm9wZXJ0aWVzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2NvcHlQcm9wZXJ0aWVzLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==