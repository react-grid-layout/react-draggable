(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactDraggable"] = factory(require("react"), require("react-dom"));
	else
		root["ReactDraggable"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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

	'use strict';
	
	module.exports = __webpack_require__(1);
	module.exports.DraggableCore = __webpack_require__(10);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(3);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _objectAssign = __webpack_require__(5);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _utilsDomFns = __webpack_require__(6);
	
	var _utilsPositionFns = __webpack_require__(9);
	
	var _utilsShims = __webpack_require__(7);
	
	var _DraggableCore2 = __webpack_require__(10);
	
	var _DraggableCore3 = _interopRequireDefault(_DraggableCore2);
	
	var _utilsLog = __webpack_require__(11);
	
	var _utilsLog2 = _interopRequireDefault(_utilsLog);
	
	//
	// Define <Draggable>
	//
	
	var Draggable = (function (_DraggableCore) {
	  _inherits(Draggable, _DraggableCore);
	
	  function Draggable() {
	    var _this = this;
	
	    _classCallCheck(this, Draggable);
	
	    _get(Object.getPrototypeOf(Draggable.prototype), 'constructor', this).apply(this, arguments);
	
	    this.state = {
	      // Whether or not we are currently dragging.
	      dragging: false,
	
	      // Current transform x and y.
	      clientX: this.props.start.x, clientY: this.props.start.y,
	
	      // Used for compensating for out-of-bounds drags
	      slackX: 0, slackY: 0,
	
	      // Can only determine if SVG after mounting
	      isElementSVG: false
	    };
	
	    this.onDragStart = function (e, coreEvent) {
	      (0, _utilsLog2['default'])('Draggable: onDragStart: %j', coreEvent.position);
	
	      // Short-circuit if user's callback killed it.
	      var shouldStart = _this.props.onStart(e, (0, _utilsDomFns.createUIEvent)(_this, coreEvent));
	      // Kills start event on core as well, so move handlers are never bound.
	      if (shouldStart === false) return false;
	
	      _this.setState({ dragging: true });
	    };
	
	    this.onDrag = function (e, coreEvent) {
	      if (!_this.state.dragging) return false;
	      (0, _utilsLog2['default'])('Draggable: onDrag: %j', coreEvent.position);
	
	      var uiEvent = (0, _utilsDomFns.createUIEvent)(_this, coreEvent);
	
	      var newState = {
	        clientX: uiEvent.position.left,
	        clientY: uiEvent.position.top
	      };
	
	      // Keep within bounds.
	      if (_this.props.bounds) {
	        // Save original x and y.
	        var clientX = newState.clientX;
	        var clientY = newState.clientY;
	
	        // Add slack to the values used to calculate bound position. This will ensure that if
	        // we start removing slack, the element won't react to it right away until it's been
	        // completely removed.
	        newState.clientX += _this.state.slackX;
	        newState.clientY += _this.state.slackY;
	
	        // Get bound position. This will ceil/floor the x and y within the boundaries.
	
	        // Recalculate slack by noting how much was shaved by the boundPosition handler.
	
	        var _getBoundPosition = (0, _utilsPositionFns.getBoundPosition)(_this, newState.clientX, newState.clientY);
	
	        var _getBoundPosition2 = _slicedToArray(_getBoundPosition, 2);
	
	        newState.clientX = _getBoundPosition2[0];
	        newState.clientY = _getBoundPosition2[1];
	        newState.slackX = _this.state.slackX + (clientX - newState.clientX);
	        newState.slackY = _this.state.slackY + (clientY - newState.clientY);
	
	        // Update the event we fire.
	        uiEvent.position.left = clientX;
	        uiEvent.position.top = clientY;
	      }
	
	      // Short-circuit if user's callback killed it.
	      var shouldUpdate = _this.props.onDrag(e, uiEvent);
	      if (shouldUpdate === false) return false;
	
	      _this.setState(newState);
	    };
	
	    this.onDragStop = function (e, coreEvent) {
	      if (!_this.state.dragging) return false;
	
	      // Short-circuit if user's callback killed it.
	      var shouldStop = _this.props.onStop(e, (0, _utilsDomFns.createUIEvent)(_this, coreEvent));
	      if (shouldStop === false) return false;
	
	      (0, _utilsLog2['default'])('Draggable: onDragStop: %j', coreEvent.position);
	
	      _this.setState({
	        dragging: false,
	        slackX: 0,
	        slackY: 0
	      });
	    };
	  }
	
	  _createClass(Draggable, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // Check to see if the element passed is an instanceof SVGElement
	      if (_reactDom2['default'].findDOMNode(this) instanceof SVGElement) {
	        this.setState({ isElementSVG: true });
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.setState({ dragging: false }); // prevents invariant if unmounted while dragging
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var style = undefined,
	          svgTransform = null;
	      // Add a CSS transform to move the element around. This allows us to move the element around
	      // without worrying about whether or not it is relatively or absolutely positioned.
	      // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
	      // has a clean slate.
	      style = (0, _utilsDomFns.createTransform)({
	        // Set left if horizontal drag is enabled
	        x: (0, _utilsPositionFns.canDragX)(this) ? this.state.clientX : this.props.start.x,
	
	        // Set top if vertical drag is enabled
	        y: (0, _utilsPositionFns.canDragY)(this) ? this.state.clientY : this.props.start.y
	      }, this.state.isElementSVG);
	
	      // If this element was SVG, we use the `transform` attribute.
	      if (this.state.isElementSVG) {
	        svgTransform = style;
	        style = {};
	      }
	
	      // zIndex option
	      if (this.state.dragging && !isNaN(this.props.zIndex)) {
	        style.zIndex = this.props.zIndex;
	      }
	
	      // Mark with class while dragging
	      var className = (0, _classnames2['default'])(this.props.children.props.className || '', 'react-draggable', {
	        'react-draggable-dragging': this.state.dragging,
	        'react-draggable-dragged': this.state.dragged
	      });
	
	      // Reuse the child provided
	      // This makes it flexible to use whatever element is wanted (div, ul, etc)
	      return _react2['default'].createElement(
	        _DraggableCore3['default'],
	        _extends({}, this.props, { onStart: this.onDragStart, onDrag: this.onDrag, onStop: this.onDragStop }),
	        _react2['default'].cloneElement(_react2['default'].Children.only(this.props.children), {
	          className: className,
	          style: (0, _objectAssign2['default'])({}, this.props.children.props.style, style),
	          transform: svgTransform
	        })
	      );
	    }
	  }], [{
	    key: 'displayName',
	    value: 'Draggable',
	    enumerable: true
	  }, {
	    key: 'propTypes',
	    value: (0, _objectAssign2['default'])({}, _DraggableCore3['default'].propTypes, {
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
	      axis: _react.PropTypes.oneOf(['both', 'x', 'y', 'none']),
	
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
	      bounds: _react.PropTypes.oneOfType([_react.PropTypes.shape({
	        left: _react.PropTypes.Number,
	        right: _react.PropTypes.Number,
	        top: _react.PropTypes.Number,
	        bottom: _react.PropTypes.Number
	      }), _react.PropTypes.string, _react.PropTypes.oneOf([false])]),
	
	      /**
	       * `start` specifies the x and y that the dragged item should start at
	       *
	       * Example:
	       *
	       * ```jsx
	       *      let App = React.createClass({
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
	      start: _react.PropTypes.shape({
	        x: _react.PropTypes.number,
	        y: _react.PropTypes.number
	      }),
	
	      /**
	       * `zIndex` specifies the zIndex to use while dragging.
	       *
	       * Example:
	       *
	       * ```jsx
	       *   let App = React.createClass({
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
	      zIndex: _react.PropTypes.number,
	
	      /**
	       * These properties should be defined on the child, not here.
	       */
	      className: _utilsShims.dontSetMe,
	      style: _utilsShims.dontSetMe,
	      transform: _utilsShims.dontSetMe
	    }),
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: (0, _objectAssign2['default'])({}, _DraggableCore3['default'].defaultProps, {
	      axis: 'both',
	      bounds: false,
	      start: { x: 0, y: 0 },
	      zIndex: NaN
	    }),
	    enumerable: true
	  }]);
	
	  return Draggable;
	})(_DraggableCore3['default']);
	
	exports['default'] = Draggable;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.matchesSelector = matchesSelector;
	exports.addEvent = addEvent;
	exports.removeEvent = removeEvent;
	exports.outerHeight = outerHeight;
	exports.outerWidth = outerWidth;
	exports.innerHeight = innerHeight;
	exports.innerWidth = innerWidth;
	exports.createTransform = createTransform;
	exports.createCSSTransform = createCSSTransform;
	exports.createSVGTransform = createSVGTransform;
	exports.addUserSelectStyles = addUserSelectStyles;
	exports.removeUserSelectStyles = removeUserSelectStyles;
	exports.styleHacks = styleHacks;
	exports.createCoreEvent = createCoreEvent;
	exports.createUIEvent = createUIEvent;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _shims = __webpack_require__(7);
	
	var _getPrefix = __webpack_require__(8);
	
	var _getPrefix2 = _interopRequireDefault(_getPrefix);
	
	var _objectAssign = __webpack_require__(5);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _reactDom = __webpack_require__(3);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var matchesSelectorFunc = '';
	
	function matchesSelector(el, selector) {
	  if (!(el instanceof Node)) throw new TypeError('Value of argument \'el\' violates contract, expected Node got ' + (el === null ? 'null' : el instanceof Object && el.constructor ? el.constructor.name : typeof el));
	  if (typeof selector !== 'string') throw new TypeError('Value of argument \'selector\' violates contract, expected string got ' + (selector === null ? 'null' : selector instanceof Object && selector.constructor ? selector.constructor.name : typeof selector));
	
	  if (!matchesSelectorFunc) {
	    matchesSelectorFunc = (0, _shims.findInArray)(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
	      return (0, _shims.isFunction)(el[method]);
	    });
	  }
	
	  return el[matchesSelectorFunc].call(el, selector);
	}
	
	function addEvent(el, event, handler) {
	  if (el != null && !(el instanceof Node)) throw new TypeError('Value of argument \'el\' violates contract, expected null or Node got ' + (el === null ? 'null' : el instanceof Object && el.constructor ? el.constructor.name : typeof el));
	  if (typeof event !== 'string') throw new TypeError('Value of argument \'event\' violates contract, expected string got ' + (event === null ? 'null' : event instanceof Object && event.constructor ? event.constructor.name : typeof event));
	  if (typeof handler !== 'function') throw new TypeError('Value of argument \'handler\' violates contract, expected function got ' + (handler === null ? 'null' : handler instanceof Object && handler.constructor ? handler.constructor.name : typeof handler));
	
	  if (!el) {
	    return;
	  }
	  if (el.attachEvent) {
	    el.attachEvent('on' + event, handler);
	  } else if (el.addEventListener) {
	    el.addEventListener(event, handler, true);
	  } else {
	    el['on' + event] = handler;
	  }
	}
	
	function removeEvent(el, event, handler) {
	  if (el != null && !(el instanceof Node)) throw new TypeError('Value of argument \'el\' violates contract, expected null or Node got ' + (el === null ? 'null' : el instanceof Object && el.constructor ? el.constructor.name : typeof el));
	  if (typeof event !== 'string') throw new TypeError('Value of argument \'event\' violates contract, expected string got ' + (event === null ? 'null' : event instanceof Object && event.constructor ? event.constructor.name : typeof event));
	  if (typeof handler !== 'function') throw new TypeError('Value of argument \'handler\' violates contract, expected function got ' + (handler === null ? 'null' : handler instanceof Object && handler.constructor ? handler.constructor.name : typeof handler));
	
	  if (!el) {
	    return;
	  }
	  if (el.detachEvent) {
	    el.detachEvent('on' + event, handler);
	  } else if (el.removeEventListener) {
	    el.removeEventListener(event, handler, true);
	  } else {
	    el['on' + event] = null;
	  }
	}
	
	function outerHeight(node) {
	  if (!(node instanceof Node)) throw new TypeError('Value of argument \'node\' violates contract, expected Node got ' + (node === null ? 'null' : node instanceof Object && node.constructor ? node.constructor.name : typeof node));
	
	  // This is deliberately excluding margin for our calculations, since we are using
	  // offsetTop which is including margin. See getBoundPosition
	  var height = node.clientHeight;
	  var computedStyle = window.getComputedStyle(node);
	  height += (0, _shims.int)(computedStyle.borderTopWidth);
	  height += (0, _shims.int)(computedStyle.borderBottomWidth);
	  return height;
	}
	
	function outerWidth(node) {
	  if (!(node instanceof Node)) throw new TypeError('Value of argument \'node\' violates contract, expected Node got ' + (node === null ? 'null' : node instanceof Object && node.constructor ? node.constructor.name : typeof node));
	
	  // This is deliberately excluding margin for our calculations, since we are using
	  // offsetLeft which is including margin. See getBoundPosition
	  var width = node.clientWidth;
	  var computedStyle = window.getComputedStyle(node);
	  width += (0, _shims.int)(computedStyle.borderLeftWidth);
	  width += (0, _shims.int)(computedStyle.borderRightWidth);
	  return width;
	}
	
	function innerHeight(node) {
	  if (!(node instanceof Node)) throw new TypeError('Value of argument \'node\' violates contract, expected Node got ' + (node === null ? 'null' : node instanceof Object && node.constructor ? node.constructor.name : typeof node));
	
	  var height = node.clientHeight;
	  var computedStyle = window.getComputedStyle(node);
	  height -= (0, _shims.int)(computedStyle.paddingTop);
	  height -= (0, _shims.int)(computedStyle.paddingBottom);
	  return height;
	}
	
	function innerWidth(node) {
	  if (!(node instanceof Node)) throw new TypeError('Value of argument \'node\' violates contract, expected Node got ' + (node === null ? 'null' : node instanceof Object && node.constructor ? node.constructor.name : typeof node));
	
	  var width = node.clientWidth;
	  var computedStyle = window.getComputedStyle(node);
	  width -= (0, _shims.int)(computedStyle.paddingLeft);
	  width -= (0, _shims.int)(computedStyle.paddingRight);
	  return width;
	}
	
	function createTransform(position, isSVG) {
	  if (typeof position !== 'object') throw new TypeError('Value of argument \'position\' violates contract, expected object got ' + (position === null ? 'null' : position instanceof Object && position.constructor ? position.constructor.name : typeof position));
	  if (isSVG != null && typeof isSVG !== 'boolean') throw new TypeError('Value of argument \'isSVG\' violates contract, expected null or boolean got ' + (isSVG === null ? 'null' : isSVG instanceof Object && isSVG.constructor ? isSVG.constructor.name : typeof isSVG));
	
	  if (isSVG) return createSVGTransform(position);
	  return createCSSTransform(position);
	}
	
	function createCSSTransform(_ref) {
	  var x = _ref.x;
	  var y = _ref.y;
	  return (function () {
	    if ({ x: x, y: y } === null || typeof { x: x, y: y } !== 'object' || typeof { x: x, y: y }.x !== 'number' || typeof { x: x, y: y }.y !== 'number') throw new TypeError('Value of argument \'undefined\' violates contract, expected Object with properties x and y got ' + ({ x: x, y: y } === null ? 'null' : { x: x, y: y } instanceof Object && { x: x, y: y }.constructor ? { x: x, y: y }.constructor.name : typeof { x: x, y: y }));
	
	    // Replace unitless items with px
	    var out = { transform: 'translate(' + x + 'px,' + y + 'px)' };
	    // Add single prefixed property as well
	    if (_getPrefix2['default']) {
	      out[_getPrefix2['default'] + 'Transform'] = out.transform;
	    }
	    return out;
	  })();
	}
	
	function createSVGTransform(_ref2) {
	  var x = _ref2.x;
	  var y = _ref2.y;
	  return (function () {
	    if ({ x: x, y: y } === null || typeof { x: x, y: y } !== 'object' || typeof { x: x, y: y }.x !== 'number' || typeof { x: x, y: y }.y !== 'number') throw new TypeError('Value of argument \'undefined\' violates contract, expected Object with properties x and y got ' + ({ x: x, y: y } === null ? 'null' : { x: x, y: y } instanceof Object && { x: x, y: y }.constructor ? { x: x, y: y }.constructor.name : typeof { x: x, y: y }));
	
	    return 'translate(' + x + ',' + y + ')';
	  })();
	}
	
	// User-select Hacks:
	//
	// Useful for preventing blue highlights all over everything when dragging.
	var userSelectStyle = ';user-select: none;';
	if (_getPrefix2['default']) {
	  userSelectStyle += '-' + _getPrefix2['default'].toLowerCase() + '-user-select: none;';
	}
	
	function addUserSelectStyles() {
	  var style = document.body.getAttribute('style') || '';
	  document.body.setAttribute('style', style + userSelectStyle);
	}
	
	function removeUserSelectStyles() {
	  var style = document.body.getAttribute('style') || '';
	  document.body.setAttribute('style', style.replace(userSelectStyle, ''));
	}
	
	function styleHacks() {
	  var childStyle = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  // Workaround IE pointer events; see #51
	  // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
	  var touchHacks = {
	    touchAction: 'none'
	  };
	
	  return (0, _objectAssign2['default'])(touchHacks, childStyle);
	}
	
	// Create an event exposed by <DraggableCore>
	
	function createCoreEvent(draggable, clientX, clientY) {
	  // State changes are often (but not always!) async. We want the latest value.
	  var state = draggable._pendingState || draggable.state;
	  var isStart = !(0, _shims.isNum)(state.lastX);
	
	  return {
	    node: _reactDom2['default'].findDOMNode(draggable),
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
	
	function createUIEvent(draggable, coreEvent) {
	  return {
	    node: _reactDom2['default'].findDOMNode(draggable),
	    position: {
	      left: draggable.state.clientX + coreEvent.position.deltaX,
	      top: draggable.state.clientY + coreEvent.position.deltaY
	    },
	    deltaX: coreEvent.position.deltaX,
	    deltaY: coreEvent.position.deltaY
	  };
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.findInArray = findInArray;
	exports.isFunction = isFunction;
	exports.isNum = isNum;
	exports.int = int;
	exports.dontSetMe = dontSetMe;
	
	function findInArray(array, callback) {
	  for (var i = 0, _length = array.length; i < _length; i++) {
	    if (callback.apply(callback, [array[i], i, array])) return array[i];
	  }
	}
	
	function isFunction(func) {
	  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
	}
	
	function isNum(num) {
	  return typeof num === 'number' && !isNaN(num);
	}
	
	function int(a) {
	  return parseInt(a, 10);
	}
	
	function dontSetMe(props, propName, componentName) {
	  if (props[propName]) {
	    throw new Error('Invalid prop ' + propName + ' passed to ' + componentName + ' - do not set this, set it on the child.');
	  }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = (function () {
	  // Checking specifically for 'window.document' is for pseudo-browser server-side
	  // environments that define 'window' as the global context.
	  // E.g. React-rails (see https://github.com/reactjs/react-rails/pull/84)
	  if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';
	
	  // Thanks David Walsh
	  var styles = window.getComputedStyle(document.documentElement, ''),
	      pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
	  // 'ms' is not titlecased
	  if (pre === undefined || pre === null) return '';
	  if (pre === 'ms') return pre;
	  if (pre === undefined || pre === null) return '';
	  return pre.slice(0, 1).toUpperCase() + pre.slice(1);
	})();
	
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.getBoundPosition = getBoundPosition;
	exports.snapToGrid = snapToGrid;
	exports.canDragX = canDragX;
	exports.canDragY = canDragY;
	exports.getControlPosition = getControlPosition;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _shims = __webpack_require__(7);
	
	var _reactDom = __webpack_require__(3);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _domFns = __webpack_require__(6);
	
	function getBoundPosition(draggable, clientX, clientY) {
	  // If no bounds, short-circuit and move on
	  if (!draggable.props.bounds) return [clientX, clientY];
	
	  // Clone new bounds
	  var bounds = cloneBounds(draggable.props.bounds);
	  var node = _reactDom2['default'].findDOMNode(draggable);
	
	  if (typeof bounds === 'string') {
	    var boundNode = undefined;
	    if (bounds === 'parent') {
	      boundNode = node.parentNode;
	    } else {
	      boundNode = document.querySelector(bounds);
	      if (!boundNode) throw new Error('Bounds selector "' + bounds + '" could not find an element.');
	    }
	    var nodeStyle = window.getComputedStyle(node);
	    var boundNodeStyle = window.getComputedStyle(boundNode);
	    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
	    bounds = {
	      left: -node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingLeft) + (0, _shims.int)(nodeStyle.borderLeftWidth) + (0, _shims.int)(nodeStyle.marginLeft),
	      top: -node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingTop) + (0, _shims.int)(nodeStyle.borderTopWidth) + (0, _shims.int)(nodeStyle.marginTop),
	      right: (0, _domFns.innerWidth)(boundNode) - (0, _domFns.outerWidth)(node) - node.offsetLeft,
	      bottom: (0, _domFns.innerHeight)(boundNode) - (0, _domFns.outerHeight)(node) - node.offsetTop
	    };
	  }
	
	  // Keep x and y below right and bottom limits...
	  if ((0, _shims.isNum)(bounds.right)) clientX = Math.min(clientX, bounds.right);
	  if ((0, _shims.isNum)(bounds.bottom)) clientY = Math.min(clientY, bounds.bottom);
	
	  // But above left and top limits.
	  if ((0, _shims.isNum)(bounds.left)) clientX = Math.max(clientX, bounds.left);
	  if ((0, _shims.isNum)(bounds.top)) clientY = Math.max(clientY, bounds.top);
	
	  return [clientX, clientY];
	}
	
	function snapToGrid(grid, pendingX, pendingY) {
	  var x = Math.round(pendingX / grid[0]) * grid[0];
	  var y = Math.round(pendingY / grid[1]) * grid[1];
	  return [x, y];
	}
	
	function canDragX(draggable) {
	  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
	}
	
	function canDragY(draggable) {
	  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
	}
	
	// Get {clientX, clientY} positions from event.
	
	function getControlPosition(e) {
	  var position = e.targetTouches && e.targetTouches[0] || e;
	  return {
	    clientX: position.clientX,
	    clientY: position.clientY
	  };
	}
	
	// A lot faster than stringify/parse
	function cloneBounds(bounds) {
	  return {
	    left: bounds.left,
	    top: bounds.top,
	    right: bounds.right,
	    bottom: bounds.bottom
	  };
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsDomFns = __webpack_require__(6);
	
	var _utilsPositionFns = __webpack_require__(9);
	
	var _utilsShims = __webpack_require__(7);
	
	var _utilsLog = __webpack_require__(11);
	
	var _utilsLog2 = _interopRequireDefault(_utilsLog);
	
	// Simple abstraction for dragging events names.
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
	
	//
	// Define <DraggableCore>.
	//
	// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
	// work well with libraries that require more control over the element.
	//
	
	var DraggableCore = (function (_React$Component) {
	  _inherits(DraggableCore, _React$Component);
	
	  function DraggableCore() {
	    var _this = this;
	
	    _classCallCheck(this, DraggableCore);
	
	    _get(Object.getPrototypeOf(DraggableCore.prototype), 'constructor', this).apply(this, arguments);
	
	    this.state = {
	      dragging: false,
	      // Used while dragging to determine deltas.
	      lastX: null, lastY: null
	    };
	
	    this.handleDragStart = function (e) {
	      // Make it possible to attach event handlers on top of this one.
	      _this.props.onMouseDown(e);
	
	      // Only accept left-clicks.
	      if (!_this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false;
	
	      // Short circuit if handle or cancel prop was provided and selector doesn't match.
	      if (_this.props.disabled || _this.props.handle && !(0, _utilsDomFns.matchesSelector)(e.target, _this.props.handle) || _this.props.cancel && (0, _utilsDomFns.matchesSelector)(e.target, _this.props.cancel)) {
	        return;
	      }
	
	      // Set touch identifier in component state if this is a touch event. This allows us to
	      // distinguish between individual touches on multitouch screens by identifying which
	      // touchpoint was set to this element.
	      if (e.targetTouches) {
	        _this.setState({ touchIdentifier: e.targetTouches[0].identifier });
	      }
	
	      // Add a style to the body to disable user-select. This prevents text from
	      // being selected all over the page.
	      if (_this.props.enableUserSelectHack) (0, _utilsDomFns.addUserSelectStyles)();
	
	      // Get the current drag point from the event. This is used as the offset.
	
	      var _getControlPosition = (0, _utilsPositionFns.getControlPosition)(e);
	
	      var clientX = _getControlPosition.clientX;
	      var clientY = _getControlPosition.clientY;
	
	      // Create an event object with all the data parents need to make a decision here.
	      var coreEvent = (0, _utilsDomFns.createCoreEvent)(_this, clientX, clientY);
	
	      (0, _utilsLog2['default'])('DraggableCore: handleDragStart: %j', coreEvent.position);
	
	      // Call event handler. If it returns explicit false, cancel.
	      (0, _utilsLog2['default'])('calling', _this.props.onStart);
	      var shouldUpdate = _this.props.onStart(e, coreEvent);
	      if (shouldUpdate === false) return;
	
	      // Initiate dragging. Set the current x and y as offsets
	      // so we know how much we've moved during the drag. This allows us
	      // to drag elements around even if they have been moved, without issue.
	      _this.setState({
	        dragging: true,
	
	        lastX: clientX,
	        lastY: clientY,
	        // Stored so we can adjust our offset if scrolled.
	        scrollX: document.body.scrollLeft,
	        scrollY: document.body.scrollTop
	      });
	
	      // Translate el on page scroll.
	      (0, _utilsDomFns.addEvent)(document, 'scroll', _this.handleScroll);
	      // Add events to the document directly so we catch when the user's mouse/touch moves outside of
	      // this element. We use different events depending on whether or not we have detected that this
	      // is a touch-capable device.
	      (0, _utilsDomFns.addEvent)(document, dragEventFor.move, _this.handleDrag);
	      (0, _utilsDomFns.addEvent)(document, dragEventFor.stop, _this.handleDragStop);
	    };
	
	    this.handleDrag = function (e) {
	      // Return if this is a touch event, but not the correct one for this element
	      if (e.targetTouches && e.targetTouches[0].identifier !== _this.state.touchIdentifier) return;
	
	      var _getControlPosition2 = (0, _utilsPositionFns.getControlPosition)(e);
	
	      var clientX = _getControlPosition2.clientX;
	      var clientY = _getControlPosition2.clientY;
	
	      // Snap to grid if prop has been provided
	      if (Array.isArray(_this.props.grid)) {
	        var deltaX = clientX - _this.state.lastX,
	            deltaY = clientY - _this.state.lastY;
	
	        var _snapToGrid = (0, _utilsPositionFns.snapToGrid)(_this.props.grid, deltaX, deltaY);
	
	        var _snapToGrid2 = _slicedToArray(_snapToGrid, 2);
	
	        deltaX = _snapToGrid2[0];
	        deltaY = _snapToGrid2[1];
	
	        if (!deltaX && !deltaY) return; // skip useless drag
	        clientX = _this.state.lastX + deltaX, clientY = _this.state.lastY + deltaY;
	      }
	
	      var coreEvent = (0, _utilsDomFns.createCoreEvent)(_this, clientX, clientY);
	
	      (0, _utilsLog2['default'])('DraggableCore: handleDrag: %j', coreEvent.position);
	
	      // Call event handler. If it returns explicit false, trigger end.
	      var shouldUpdate = _this.props.onDrag(e, coreEvent);
	      if (shouldUpdate === false) {
	        _this.handleDragStop({});
	        return;
	      }
	
	      _this.setState({
	        lastX: clientX,
	        lastY: clientY
	      });
	    };
	
	    this.handleDragStop = function (e) {
	      if (!_this.state.dragging) return;
	
	      // Short circuit if this is not the correct touch event. `changedTouches` contains all
	      // touch points that have been removed from the surface.
	      if (e.changedTouches && e.changedTouches[0].identifier !== _this.state.touchIdentifier) return;
	
	      // Remove user-select hack
	      if (_this.props.enableUserSelectHack) (0, _utilsDomFns.removeUserSelectStyles)();
	
	      var _getControlPosition3 = (0, _utilsPositionFns.getControlPosition)(e);
	
	      var clientX = _getControlPosition3.clientX;
	      var clientY = _getControlPosition3.clientY;
	
	      var coreEvent = (0, _utilsDomFns.createCoreEvent)(_this, clientX, clientY);
	
	      (0, _utilsLog2['default'])('DraggableCore: handleDragStop: %j', coreEvent.position);
	
	      // Reset the el.
	      _this.setState({
	        dragging: false,
	        lastX: null,
	        lastY: null
	      });
	
	      // Call event handler
	      _this.props.onStop(e, coreEvent);
	
	      // Remove event handlers
	      (0, _utilsLog2['default'])('DraggableCore: Removing handlers');
	      (0, _utilsDomFns.removeEvent)(document, 'scroll', _this.handleScroll);
	      (0, _utilsDomFns.removeEvent)(document, dragEventFor.move, _this.handleDrag);
	      (0, _utilsDomFns.removeEvent)(document, dragEventFor.stop, _this.handleDragStop);
	    };
	
	    this.handleScroll = function (e) {
	      var s = _this.state,
	          x = document.body.scrollLeft,
	          y = document.body.scrollTop;
	
	      // Create the usual event, but make the scroll offset our deltas.
	      var coreEvent = (0, _utilsDomFns.createCoreEvent)(_this);
	      coreEvent.position.deltaX = x - s.scrollX;
	      coreEvent.position.deltaY = y - s.scrollY;
	
	      _this.setState({
	        lastX: s.lastX + coreEvent.position.deltaX,
	        lastY: s.lastY + coreEvent.position.deltaY
	      });
	
	      _this.props.onDrag(e, coreEvent);
	    };
	
	    this.onMouseDown = function (e) {
	      // HACK: Prevent 'ghost click' which happens 300ms after touchstart if the event isn't cancelled.
	      // We don't cancel the event on touchstart because of #37; we might want to make a scrollable item draggable.
	      // More on ghost clicks: http://ariatemplates.com/blog/2014/05/ghost-clicks-in-mobile-browsers/
	      if (dragEventFor === eventsFor.touch) {
	        return e.preventDefault();
	      }
	
	      return _this.handleDragStart(e);
	    };
	
	    this.onTouchStart = function (e) {
	      // We're on a touch device now, so change the event handlers
	      dragEventFor = eventsFor.touch;
	
	      return _this.handleDragStart(e);
	    };
	  }
	
	  _createClass(DraggableCore, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      // Remove any leftover event handlers. Remove both touch and mouse handlers in case
	      // some browser quirk caused a touch event to fire during a mouse move, or vice versa.
	      (0, _utilsDomFns.removeEvent)(document, eventsFor.mouse.move, this.handleDrag);
	      (0, _utilsDomFns.removeEvent)(document, eventsFor.touch.move, this.handleDrag);
	      (0, _utilsDomFns.removeEvent)(document, eventsFor.mouse.stop, this.handleDragStop);
	      (0, _utilsDomFns.removeEvent)(document, eventsFor.touch.stop, this.handleDragStop);
	      (0, _utilsDomFns.removeEvent)(document, 'scroll', this.handleScroll);
	      if (this.props.enableUserSelectHack) (0, _utilsDomFns.removeUserSelectStyles)();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      // Reuse the child provided
	      // This makes it flexible to use whatever element is wanted (div, ul, etc)
	      return _react2['default'].cloneElement(_react2['default'].Children.only(this.props.children), {
	        style: (0, _utilsDomFns.styleHacks)(this.props.children.props.style),
	
	        // Note: mouseMove handler is attached to document so it will still function
	        // when the user drags quickly and leaves the bounds of the element.
	        onMouseDown: this.onMouseDown,
	        onTouchStart: this.onTouchStart,
	        onMouseUp: this.handleDragStop,
	        onTouchEnd: this.handleDragStop
	      });
	    }
	  }], [{
	    key: 'displayName',
	    value: 'DraggableCore',
	    enumerable: true
	  }, {
	    key: 'propTypes',
	    value: {
	      /**
	       * `allowAnyClick` allows dragging using any mouse button.
	       * By default, we only accept the left button.
	       *
	       * Defaults to `false`.
	       */
	      allowAnyClick: _react.PropTypes.bool,
	
	      /**
	       * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
	       * with the exception of `onMouseDown`, will not fire.
	       *
	       * Example:
	       *
	       * ```jsx
	       *   let App = React.createClass({
	       *       render: function () {
	       *           return (
	       *               <Draggable disabled={true}>
	       *                   <div>I can't be dragged</div>
	       *               </Draggable>
	       *           );
	       *       }
	       *   });
	       * ```
	       */
	      disabled: _react.PropTypes.bool,
	
	      /**
	       * By default, we add 'user-select:none' attributes to the document body
	       * to prevent ugly text selection during drag. If this is causing problems
	       * for your app, set this to `false`.
	       */
	      enableUserSelectHack: _react.PropTypes.bool,
	
	      /**
	       * `grid` specifies the x and y that dragging should snap to.
	       *
	       * Example:
	       *
	       * ```jsx
	       *   let App = React.createClass({
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
	      grid: _react.PropTypes.arrayOf(_react.PropTypes.number),
	
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
	      handle: _react.PropTypes.string,
	
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
	       *            <div>Dragging here works fine</div>
	       *                   </div>
	       *               </Draggable>
	       *           );
	       *       }
	       *   });
	       * ```
	       */
	      cancel: _react.PropTypes.string,
	
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
	      onStart: _react.PropTypes.func,
	
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
	      onDrag: _react.PropTypes.func,
	
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
	      onStop: _react.PropTypes.func,
	
	      /**
	       * A workaround option which can be passed if onMouseDown needs to be accessed,
	       * since it'll always be blocked (due to that there's internal use of onMouseDown)
	       */
	      onMouseDown: _react.PropTypes.func,
	
	      /**
	       * These properties should be defined on the child, not here.
	       */
	      className: _utilsShims.dontSetMe,
	      style: _utilsShims.dontSetMe,
	      transform: _utilsShims.dontSetMe
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      allowAnyClick: false, // by default only accept left click
	      cancel: null,
	      disabled: false,
	      enableUserSelectHack: true,
	      handle: null,
	      grid: null,
	      transform: null,
	      onStart: function onStart() {},
	      onDrag: function onDrag() {},
	      onStop: function onStop() {},
	      onMouseDown: function onMouseDown() {}
	    },
	    enumerable: true
	  }]);
	
	  return DraggableCore;
	})(_react2['default'].Component);
	
	exports['default'] = DraggableCore;
	module.exports = exports['default'];

	// When the user scrolls, adjust internal state so the draggable moves along the page properly.
	// This only fires when a drag is active.

	// On mousedown, consider the drag started.

	// Same as onMouseDown (start drag), but now consider this a touch device.

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = log;
	
	function log() {
	  if ((undefined)) console.log.apply(console, arguments);
	}
	
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-draggable.js.map