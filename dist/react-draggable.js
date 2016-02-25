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
	
	module.exports = __webpack_require__(1).default;
	module.exports.DraggableCore = __webpack_require__(9).default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(3);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _domFns = __webpack_require__(5);
	
	var _positionFns = __webpack_require__(8);
	
	var _shims = __webpack_require__(6);
	
	var _DraggableCore = __webpack_require__(9);
	
	var _DraggableCore2 = _interopRequireDefault(_DraggableCore);
	
	var _log = __webpack_require__(10);
	
	var _log2 = _interopRequireDefault(_log);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// $FlowIgnore
	
	
	//
	// Define <Draggable>
	//
	
	var Draggable = function (_React$Component) {
	  _inherits(Draggable, _React$Component);
	
	  function Draggable() {
	    var _Object$getPrototypeO;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, Draggable);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Draggable)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
	      // Whether or not we are currently dragging.
	      dragging: false,
	
	      // Whether or not we have been dragged before.
	      dragged: false,
	
	      // Current transform x and y.
	      clientX: _this.props.start.x, clientY: _this.props.start.y,
	
	      // Used for compensating for out-of-bounds drags
	      slackX: 0, slackY: 0,
	
	      // Can only determine if SVG after mounting
	      isElementSVG: false
	    }, _this.onDragStart = function (e, coreEvent) {
	      (0, _log2.default)('Draggable: onDragStart: %j', coreEvent.position);
	
	      // Short-circuit if user's callback killed it.
	      var shouldStart = _this.props.onStart(e, (0, _domFns.createUIEvent)(_this, coreEvent));
	      // Kills start event on core as well, so move handlers are never bound.
	      if (shouldStart === false) return false;
	
	      _this.setState({ dragging: true, dragged: true });
	    }, _this.onDrag = function (e, coreEvent) {
	      if (!_this.state.dragging) return false;
	      (0, _log2.default)('Draggable: onDrag: %j', coreEvent.position);
	
	      var uiEvent = (0, _domFns.createUIEvent)(_this, coreEvent);
	
	      var newState = {
	        clientX: uiEvent.position.left,
	        clientY: uiEvent.position.top
	      };
	
	      // Keep within bounds.
	      if (_this.props.bounds) {
	        // Save original x and y.
	        var _clientX = newState.clientX;
	        var _clientY = newState.clientY;
	
	        // Add slack to the values used to calculate bound position. This will ensure that if
	        // we start removing slack, the element won't react to it right away until it's been
	        // completely removed.
	
	        newState.clientX += _this.state.slackX;
	        newState.clientY += _this.state.slackY;
	
	        // Get bound position. This will ceil/floor the x and y within the boundaries.
	
	
	        // Recalculate slack by noting how much was shaved by the boundPosition handler.
	
	        var _getBoundPosition = (0, _positionFns.getBoundPosition)(_this, newState.clientX, newState.clientY);
	
	        var _getBoundPosition2 = _slicedToArray(_getBoundPosition, 2);
	
	        newState.clientX = _getBoundPosition2[0];
	        newState.clientY = _getBoundPosition2[1];
	        newState.slackX = _this.state.slackX + (_clientX - newState.clientX);
	        newState.slackY = _this.state.slackY + (_clientY - newState.clientY);
	
	        // Update the event we fire to reflect what really happened after bounds took effect.
	        uiEvent.position.left = _clientX;
	        uiEvent.position.top = _clientY;
	        uiEvent.deltaX = newState.clientX - _this.state.clientX;
	        uiEvent.deltaY = newState.clientY - _this.state.clientY;
	      }
	
	      // Short-circuit if user's callback killed it.
	      var shouldUpdate = _this.props.onDrag(e, uiEvent);
	      if (shouldUpdate === false) return false;
	
	      _this.setState(newState);
	    }, _this.onDragStop = function (e, coreEvent) {
	      if (!_this.state.dragging) return false;
	
	      // Short-circuit if user's callback killed it.
	      var shouldStop = _this.props.onStop(e, (0, _domFns.createUIEvent)(_this, coreEvent));
	      if (shouldStop === false) return false;
	
	      (0, _log2.default)('Draggable: onDragStop: %j', coreEvent.position);
	
	      _this.setState({
	        dragging: false,
	        slackX: 0,
	        slackY: 0
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(Draggable, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // Check to see if the element passed is an instanceof SVGElement
	      if (_reactDom2.default.findDOMNode(this) instanceof SVGElement) {
	        this.setState({ isElementSVG: true });
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.position.x !== this.props.position.x || nextProps.position.y !== this.props.position.y) {
	        console.info('setting position');
	        this.setState({ clientX: nextProps.position.x, clientY: nextProps.position.y });
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
	      var style = {},
	          svgTransform = null;
	
	      // Add a CSS transform to move the element around. This allows us to move the element around
	      // without worrying about whether or not it is relatively or absolutely positioned.
	      // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
	      // has a clean slate.
	      var transformOpts = {
	        // Set left if horizontal drag is enabled
	        x: (0, _positionFns.canDragX)(this) ? this.state.clientX : this.props.start.x,
	
	        // Set top if vertical drag is enabled
	        y: (0, _positionFns.canDragY)(this) ? this.state.clientY : this.props.start.y
	      };
	
	      // If this element was SVG, we use the `transform` attribute.
	      if (this.state.isElementSVG) {
	        svgTransform = (0, _domFns.createSVGTransform)(transformOpts);
	      } else {
	        style = (0, _domFns.createCSSTransform)(transformOpts);
	      }
	
	      // zIndex option
	      if (this.state.dragging && !isNaN(this.props.zIndex)) {
	        style.zIndex = this.props.zIndex;
	      }
	
	      // Mark with class while dragging
	      var className = (0, _classnames2.default)(this.props.children.props.className || '', 'react-draggable', {
	        'react-draggable-dragging': this.state.dragging,
	        'react-draggable-dragged': this.state.dragged
	      });
	
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
	
	  position: _react.PropTypes.shape({
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
	  className: _shims.dontSetMe,
	  style: _shims.dontSetMe,
	  transform: _shims.dontSetMe
	});
	Draggable.defaultProps = _extends({}, _DraggableCore2.default.defaultProps, {
	  axis: 'both',
	  bounds: false,
	  start: { x: 0, y: 0 },
	  position: { x: 0, y: 0 },
	  zIndex: NaN
	});
	exports.default = Draggable;

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
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.matchesSelector = matchesSelector;
	exports.addEvent = addEvent;
	exports.removeEvent = removeEvent;
	exports.outerHeight = outerHeight;
	exports.outerWidth = outerWidth;
	exports.innerHeight = innerHeight;
	exports.innerWidth = innerWidth;
	exports.createCSSTransform = createCSSTransform;
	exports.createSVGTransform = createSVGTransform;
	exports.addUserSelectStyles = addUserSelectStyles;
	exports.removeUserSelectStyles = removeUserSelectStyles;
	exports.styleHacks = styleHacks;
	exports.createCoreEvent = createCoreEvent;
	exports.createUIEvent = createUIEvent;
	
	var _shims = __webpack_require__(6);
	
	var _getPrefix = __webpack_require__(7);
	
	var _getPrefix2 = _interopRequireDefault(_getPrefix);
	
	var _reactDom = __webpack_require__(3);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var matchesSelectorFunc = '';
	function matchesSelector(el, selector) {
	  if (!matchesSelectorFunc) {
	    matchesSelectorFunc = (0, _shims.findInArray)(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
	      // $FlowIgnore: Doesn't think elements are indexable
	      return (0, _shims.isFunction)(el[method]);
	    });
	  }
	
	  // $FlowIgnore: Doesn't think elements are indexable
	  return el[matchesSelectorFunc].call(el, selector);
	}
	
	function addEvent(el, event, handler) {
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
	
	function removeEvent(el, event, handler) {
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
	
	function outerHeight(node) {
	  // This is deliberately excluding margin for our calculations, since we are using
	  // offsetTop which is including margin. See getBoundPosition
	  var height = node.clientHeight;
	  var computedStyle = window.getComputedStyle(node);
	  height += (0, _shims.int)(computedStyle.borderTopWidth);
	  height += (0, _shims.int)(computedStyle.borderBottomWidth);
	  return height;
	}
	
	function outerWidth(node) {
	  // This is deliberately excluding margin for our calculations, since we are using
	  // offsetLeft which is including margin. See getBoundPosition
	  var width = node.clientWidth;
	  var computedStyle = window.getComputedStyle(node);
	  width += (0, _shims.int)(computedStyle.borderLeftWidth);
	  width += (0, _shims.int)(computedStyle.borderRightWidth);
	  return width;
	}
	function innerHeight(node) {
	  var height = node.clientHeight;
	  var computedStyle = window.getComputedStyle(node);
	  height -= (0, _shims.int)(computedStyle.paddingTop);
	  height -= (0, _shims.int)(computedStyle.paddingBottom);
	  return height;
	}
	
	function innerWidth(node) {
	  var width = node.clientWidth;
	  var computedStyle = window.getComputedStyle(node);
	  width -= (0, _shims.int)(computedStyle.paddingLeft);
	  width -= (0, _shims.int)(computedStyle.paddingRight);
	  return width;
	}
	
	function createCSSTransform(_ref) {
	  var x = _ref.x;
	  var y = _ref.y;
	
	  // Replace unitless items with px
	  var out = { transform: 'translate(' + x + 'px,' + y + 'px)' };
	  // Add single prefixed property as well
	  if (_getPrefix2.default) {
	    out[_getPrefix2.default + 'Transform'] = out.transform;
	  }
	  return out;
	}
	
	function createSVGTransform(_ref2) {
	  var x = _ref2.x;
	  var y = _ref2.y;
	
	  return 'translate(' + x + ',' + y + ')';
	}
	
	// User-select Hacks:
	//
	// Useful for preventing blue highlights all over everything when dragging.
	var userSelectStyle = ';user-select: none;';
	if (_getPrefix2.default) {
	  userSelectStyle += '-' + _getPrefix2.default.toLowerCase() + '-user-select: none;';
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
	  return _extends({
	    touchAction: 'none'
	  }, childStyle);
	}
	
	// Create an event exposed by <DraggableCore>
	function createCoreEvent(draggable, clientX, clientY) {
	  // State changes are often (but not always!) async. We want the latest value.
	  var state = draggable._pendingState || draggable.state;
	  var isStart = !(0, _shims.isNum)(state.lastX);
	
	  return {
	    node: _reactDom2.default.findDOMNode(draggable),
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
	    node: _reactDom2.default.findDOMNode(draggable),
	    position: {
	      left: draggable.state.clientX + coreEvent.position.deltaX,
	      top: draggable.state.clientY + coreEvent.position.deltaY
	    },
	    deltaX: coreEvent.position.deltaX,
	    deltaY: coreEvent.position.deltaY
	  };
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.findInArray = findInArray;
	exports.isFunction = isFunction;
	exports.isNum = isNum;
	exports.int = int;
	exports.dontSetMe = dontSetMe;
	
	// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
	function findInArray(array, callback) {
	  for (var i = 0, length = array.length; i < length; i++) {
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
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.generatePrefix = generatePrefix;
	function generatePrefix() {
	  // Checking specifically for 'window.document' is for pseudo-browser server-side
	  // environments that define 'window' as the global context.
	  // E.g. React-rails (see https://github.com/reactjs/react-rails/pull/84)
	  if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';
	
	  // Thanks David Walsh
	  var styles = window.getComputedStyle(document.documentElement, ''),
	      pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' ? ['', 'o'] : []))[1];
	  // 'ms' is not titlecased
	  if (pre === undefined || pre === null) return '';
	  if (pre === 'ms') return pre;
	  if (pre === undefined || pre === null) return '';
	  return pre.slice(0, 1).toUpperCase() + pre.slice(1);
	}
	
	exports.default = generatePrefix();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getBoundPosition = getBoundPosition;
	exports.snapToGrid = snapToGrid;
	exports.canDragX = canDragX;
	exports.canDragY = canDragY;
	exports.getControlPosition = getControlPosition;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _shims = __webpack_require__(6);
	
	var _reactDom = __webpack_require__(3);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _domFns = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getBoundPosition(draggable, clientX, clientY) {
	  // If no bounds, short-circuit and move on
	  if (!draggable.props.bounds) return [clientX, clientY];
	
	  // Clone new bounds
	  var bounds = draggable.props.bounds;
	
	  bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds);
	  var node = _reactDom2.default.findDOMNode(draggable);
	
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _domFns = __webpack_require__(5);
	
	var _positionFns = __webpack_require__(8);
	
	var _shims = __webpack_require__(6);
	
	var _log = __webpack_require__(10);
	
	var _log2 = _interopRequireDefault(_log);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	
	var DraggableCore = function (_React$Component) {
	  _inherits(DraggableCore, _React$Component);
	
	  function DraggableCore() {
	    var _Object$getPrototypeO;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, DraggableCore);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DraggableCore)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
	      dragging: false,
	      // Used while dragging to determine deltas.
	      lastX: null, lastY: null
	    }, _this.handleDragStart = function (e) {
	      // Make it possible to attach event handlers on top of this one.
	      _this.props.onMouseDown(e);
	
	      // Only accept left-clicks.
	      if (!_this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false;
	
	      // Short circuit if handle or cancel prop was provided and selector doesn't match.
	      if (_this.props.disabled || _this.props.handle && !(0, _domFns.matchesSelector)(e.target, _this.props.handle) || _this.props.cancel && (0, _domFns.matchesSelector)(e.target, _this.props.cancel)) {
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
	      if (_this.props.enableUserSelectHack) (0, _domFns.addUserSelectStyles)();
	
	      // Get the current drag point from the event. This is used as the offset.
	
	      var _getControlPosition = (0, _positionFns.getControlPosition)(e);
	
	      var clientX = _getControlPosition.clientX;
	      var clientY = _getControlPosition.clientY;
	
	      // Create an event object with all the data parents need to make a decision here.
	
	      var coreEvent = (0, _domFns.createCoreEvent)(_this, clientX, clientY);
	
	      (0, _log2.default)('DraggableCore: handleDragStart: %j', coreEvent.position);
	
	      // Call event handler. If it returns explicit false, cancel.
	      (0, _log2.default)('calling', _this.props.onStart);
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
	      (0, _domFns.addEvent)(document, 'scroll', _this.handleScroll);
	      // Add events to the document directly so we catch when the user's mouse/touch moves outside of
	      // this element. We use different events depending on whether or not we have detected that this
	      // is a touch-capable device.
	      (0, _domFns.addEvent)(document, dragEventFor.move, _this.handleDrag);
	      (0, _domFns.addEvent)(document, dragEventFor.stop, _this.handleDragStop);
	    }, _this.handleDrag = function (e) {
	      // Return if this is a touch event, but not the correct one for this element
	      if (e.targetTouches && e.targetTouches[0].identifier !== _this.state.touchIdentifier) return;
	
	      var _getControlPosition2 = (0, _positionFns.getControlPosition)(e);
	
	      var clientX = _getControlPosition2.clientX;
	      var clientY = _getControlPosition2.clientY;
	
	      // Snap to grid if prop has been provided
	
	      if (Array.isArray(_this.props.grid)) {
	        var deltaX = clientX - _this.state.lastX,
	            deltaY = clientY - _this.state.lastY;
	
	        var _snapToGrid = (0, _positionFns.snapToGrid)(_this.props.grid, deltaX, deltaY);
	
	        var _snapToGrid2 = _slicedToArray(_snapToGrid, 2);
	
	        deltaX = _snapToGrid2[0];
	        deltaY = _snapToGrid2[1];
	
	        if (!deltaX && !deltaY) return; // skip useless drag
	        clientX = _this.state.lastX + deltaX, clientY = _this.state.lastY + deltaY;
	      }
	
	      var coreEvent = (0, _domFns.createCoreEvent)(_this, clientX, clientY);
	
	      (0, _log2.default)('DraggableCore: handleDrag: %j', coreEvent.position);
	
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
	    }, _this.handleDragStop = function (e) {
	      if (!_this.state.dragging) return;
	
	      // Short circuit if this is not the correct touch event. `changedTouches` contains all
	      // touch points that have been removed from the surface.
	      if (e.changedTouches && e.changedTouches[0].identifier !== _this.state.touchIdentifier) return;
	
	      // Remove user-select hack
	      if (_this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)();
	
	      var _getControlPosition3 = (0, _positionFns.getControlPosition)(e);
	
	      var clientX = _getControlPosition3.clientX;
	      var clientY = _getControlPosition3.clientY;
	
	      var coreEvent = (0, _domFns.createCoreEvent)(_this, clientX, clientY);
	
	      (0, _log2.default)('DraggableCore: handleDragStop: %j', coreEvent.position);
	
	      // Reset the el.
	      _this.setState({
	        dragging: false,
	        lastX: null,
	        lastY: null
	      });
	
	      // Call event handler
	      _this.props.onStop(e, coreEvent);
	
	      // Remove event handlers
	      (0, _log2.default)('DraggableCore: Removing handlers');
	      (0, _domFns.removeEvent)(document, 'scroll', _this.handleScroll);
	      (0, _domFns.removeEvent)(document, dragEventFor.move, _this.handleDrag);
	      (0, _domFns.removeEvent)(document, dragEventFor.stop, _this.handleDragStop);
	    }, _this.handleScroll = function (e) {
	      var s = _this.state,
	          x = document.body.scrollLeft,
	          y = document.body.scrollTop;
	
	      // Create the usual event, but make the scroll offset our deltas.
	      var coreEvent = (0, _domFns.createCoreEvent)(_this);
	      coreEvent.position.deltaX = x - s.scrollX;
	      coreEvent.position.deltaY = y - s.scrollY;
	
	      _this.setState({
	        lastX: s.lastX + coreEvent.position.deltaX,
	        lastY: s.lastY + coreEvent.position.deltaY
	      });
	
	      _this.props.onDrag(e, coreEvent);
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
	      (0, _domFns.removeEvent)(document, eventsFor.mouse.move, this.handleDrag);
	      (0, _domFns.removeEvent)(document, eventsFor.touch.move, this.handleDrag);
	      (0, _domFns.removeEvent)(document, eventsFor.mouse.stop, this.handleDragStop);
	      (0, _domFns.removeEvent)(document, eventsFor.touch.stop, this.handleDragStop);
	      (0, _domFns.removeEvent)(document, 'scroll', this.handleScroll);
	      if (this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)();
	    }
	
	    // When the user scrolls, adjust internal state so the draggable moves along the page properly.
	    // This only fires when a drag is active.
	
	
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
	        onMouseDown: this.handleDragStart,
	        onTouchStart: this.onTouchStart,
	        onMouseUp: this.handleDragStop,
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
	  className: _shims.dontSetMe,
	  style: _shims.dontSetMe,
	  transform: _shims.dontSetMe
	};
	DraggableCore.defaultProps = {
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
	};
	exports.default = DraggableCore;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = log;
	function log() {
	  var _console;
	
	  if (true) (_console = console).log.apply(_console, arguments);
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIi4uL3dlYnBhY2svYm9vdHN0cmFwIGEyZjYzZGVkMTMzMTdlOWNjZjc2IiwiLi4vLi9pbmRleC5qcyIsIi4uLy4vbGliL0RyYWdnYWJsZS5lczYiLCIuLi9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImFtZFwiOlwicmVhY3RcIixcInJvb3RcIjpcIlJlYWN0XCJ9IiwiLi4vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0LWRvbVwiLFwiY29tbW9uanMyXCI6XCJyZWFjdC1kb21cIixcImFtZFwiOlwicmVhY3QtZG9tXCIsXCJyb290XCI6XCJSZWFjdERPTVwifSIsIi4uLy4vfi9jbGFzc25hbWVzL2luZGV4LmpzIiwiLi4vLi9saWIvdXRpbHMvZG9tRm5zLmVzNiIsIi4uLy4vbGliL3V0aWxzL3NoaW1zLmVzNiIsIi4uLy4vbGliL3V0aWxzL2dldFByZWZpeC5lczYiLCIuLi8uL2xpYi91dGlscy9wb3NpdGlvbkZucy5lczYiLCIuLi8uL2xpYi9EcmFnZ2FibGVDb3JlLmVzNiIsIi4uLy4vbGliL3V0aWxzL2xvZy5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsUUFBTyxPQUFQLEdBQWlCLG9CQUFRLENBQVIsRUFBMkIsT0FBM0I7QUFDakIsUUFBTyxPQUFQLENBQWUsYUFBZixHQUErQixvQkFBUSxD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QjtBQTRLakIsOEJBNUtpQjs7QUFKQSxlQW1MWixlQUFlO0FBQ3BCLGtCQUFlLEtBQWY7QUFDQSxXQUFRLElBQVI7QUFDQSxhQUFVLEtBQVY7QUFDQSx5QkFBc0IsSUFBdEI7QUFDQSxXQUFRLElBQVI7QUFDQSxTQUFNLElBQU47QUFDQSxjQUFXLElBQVg7QUFDQSxZQUFTLG1CQUFVLEVBQVY7QUFDVCxXQUFRLGtCQUFVLEVBQVY7QUFDUixXQUFRLGtCQUFVLEVBQVY7QUFDUixnQkFBYSx1QkFBVSxFQUFWOzttQkE5TEksYzs7Ozs7Ozs7Ozs7bUJDdENHO0FBQVQsVUFBUyxHQUFULEdBQTJCOzs7QUFDeEMsT0FBSSxNQUE2QixxQkFBUSxHQUFSLDRCQUFqQyIsImZpbGUiOiIuL2Rpc3QvcmVhY3QtZHJhZ2dhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUmVhY3REcmFnZ2FibGVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSwgcmVxdWlyZShcInJlYWN0LWRvbVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUmVhY3REcmFnZ2FibGVcIl0gPSBmYWN0b3J5KHJvb3RbXCJSZWFjdFwiXSwgcm9vdFtcIlJlYWN0RE9NXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYTJmNjNkZWQxMzMxN2U5Y2NmNzZcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL0RyYWdnYWJsZScpLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5EcmFnZ2FibGVDb3JlID0gcmVxdWlyZSgnLi9saWIvRHJhZ2dhYmxlQ29yZScpLmRlZmF1bHQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LmpzXG4gKiovIiwiLy8gQGZsb3dcbmltcG9ydCB7ZGVmYXVsdCBhcyBSZWFjdCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbi8vICRGbG93SWdub3JlXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7Y3JlYXRlVUlFdmVudCwgY3JlYXRlQ1NTVHJhbnNmb3JtLCBjcmVhdGVTVkdUcmFuc2Zvcm19IGZyb20gJy4vdXRpbHMvZG9tRm5zJztcbmltcG9ydCB7Y2FuRHJhZ1gsIGNhbkRyYWdZLCBnZXRCb3VuZFBvc2l0aW9ufSBmcm9tICcuL3V0aWxzL3Bvc2l0aW9uRm5zJztcbmltcG9ydCB7ZG9udFNldE1lfSBmcm9tICcuL3V0aWxzL3NoaW1zJztcbmltcG9ydCBEcmFnZ2FibGVDb3JlIGZyb20gJy4vRHJhZ2dhYmxlQ29yZSc7XG5pbXBvcnQgbG9nIGZyb20gJy4vdXRpbHMvbG9nJztcblxuaW1wb3J0IHR5cGUge0NvcmVFdmVudH0gZnJvbSAnLi91dGlscy9kb21GbnMnO1xuZXhwb3J0IHR5cGUgQ29yZUV2ZW50SGFuZGxlciA9IChlOiBFdmVudCwgY29yZUV2ZW50OiBDb3JlRXZlbnQpID0+IHZvaWQgfCBmYWxzZTtcbmV4cG9ydCB0eXBlIERyYWdnYWJsZVN0YXRlID0ge1xuICBkcmFnZ2luZzogYm9vbGVhbixcbiAgZHJhZ2dlZDogYm9vbGVhbixcbiAgY2xpZW50WDogbnVtYmVyLCBjbGllbnRZOiBudW1iZXIsXG4gIHNsYWNrWDogbnVtYmVyLCBzbGFja1k6IG51bWJlcixcbiAgaXNFbGVtZW50U1ZHOiBib29sZWFuXG59O1xuXG4vL1xuLy8gRGVmaW5lIDxEcmFnZ2FibGU+XG4vL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnZ2FibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBkaXNwbGF5TmFtZSA9ICdEcmFnZ2FibGUnO1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLy8gQWNjZXB0cyBhbGwgcHJvcHMgPERyYWdnYWJsZUNvcmU+IGFjY2VwdHMuXG4gICAgLi4uRHJhZ2dhYmxlQ29yZS5wcm9wVHlwZXMsXG5cbiAgICAvKipcbiAgICAgKiBgYXhpc2AgZGV0ZXJtaW5lcyB3aGljaCBheGlzIHRoZSBkcmFnZ2FibGUgY2FuIG1vdmUuXG4gICAgICpcbiAgICAgKiAgTm90ZSB0aGF0IGFsbCBjYWxsYmFja3Mgd2lsbCBzdGlsbCByZXR1cm4gZGF0YSBhcyBub3JtYWwuIFRoaXMgb25seVxuICAgICAqICBjb250cm9scyBmbHVzaGluZyB0byB0aGUgRE9NLlxuICAgICAqXG4gICAgICogJ2JvdGgnIGFsbG93cyBtb3ZlbWVudCBob3Jpem9udGFsbHkgYW5kIHZlcnRpY2FsbHkuXG4gICAgICogJ3gnIGxpbWl0cyBtb3ZlbWVudCB0byBob3Jpem9udGFsIGF4aXMuXG4gICAgICogJ3knIGxpbWl0cyBtb3ZlbWVudCB0byB2ZXJ0aWNhbCBheGlzLlxuICAgICAqICdub25lJyBsaW1pdHMgYWxsIG1vdmVtZW50LlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gJ2JvdGgnLlxuICAgICAqL1xuICAgIGF4aXM6IFByb3BUeXBlcy5vbmVPZihbJ2JvdGgnLCAneCcsICd5JywgJ25vbmUnXSksXG5cbiAgICAvKipcbiAgICAgKiBgYm91bmRzYCBkZXRlcm1pbmVzIHRoZSByYW5nZSBvZiBtb3ZlbWVudCBhdmFpbGFibGUgdG8gdGhlIGVsZW1lbnQuXG4gICAgICogQXZhaWxhYmxlIHZhbHVlcyBhcmU6XG4gICAgICpcbiAgICAgKiAncGFyZW50JyByZXN0cmljdHMgbW92ZW1lbnQgd2l0aGluIHRoZSBEcmFnZ2FibGUncyBwYXJlbnQgbm9kZS5cbiAgICAgKlxuICAgICAqIEFsdGVybmF0aXZlbHksIHBhc3MgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzLCBhbGwgb2Ygd2hpY2ggYXJlIG9wdGlvbmFsOlxuICAgICAqXG4gICAgICoge2xlZnQ6IExFRlRfQk9VTkQsIHJpZ2h0OiBSSUdIVF9CT1VORCwgYm90dG9tOiBCT1RUT01fQk9VTkQsIHRvcDogVE9QX0JPVU5EfVxuICAgICAqXG4gICAgICogQWxsIHZhbHVlcyBhcmUgaW4gcHguXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganN4XG4gICAgICogICBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAqICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgIDxEcmFnZ2FibGUgYm91bmRzPXt7cmlnaHQ6IDMwMCwgYm90dG9tOiAzMDB9fT5cbiAgICAgKiAgICAgICAgICAgICAgPGRpdj5Db250ZW50PC9kaXY+XG4gICAgICogICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBib3VuZHM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgbGVmdDogUHJvcFR5cGVzLk51bWJlcixcbiAgICAgICAgcmlnaHQ6IFByb3BUeXBlcy5OdW1iZXIsXG4gICAgICAgIHRvcDogUHJvcFR5cGVzLk51bWJlcixcbiAgICAgICAgYm90dG9tOiBQcm9wVHlwZXMuTnVtYmVyXG4gICAgICB9KSxcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMub25lT2YoW2ZhbHNlXSlcbiAgICBdKSxcblxuICAgIC8qKlxuICAgICAqIGBzdGFydGAgc3BlY2lmaWVzIHRoZSB4IGFuZCB5IHRoYXQgdGhlIGRyYWdnZWQgaXRlbSBzaG91bGQgc3RhcnQgYXRcbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgICAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICogICAgICAgICAgICAgICAgICA8RHJhZ2dhYmxlIHN0YXJ0PXt7eDogMjUsIHk6IDI1fX0+XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgPGRpdj5JIHN0YXJ0IHdpdGggdHJhbnNmb3JtWDogMjVweCBhbmQgdHJhbnNmb3JtWTogMjVweDs8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgICAgICApO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKiAgICAgIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHN0YXJ0OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgeDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHk6IFByb3BUeXBlcy5udW1iZXJcbiAgICB9KSxcblxuICAgIHBvc2l0aW9uOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgeDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHk6IFByb3BUeXBlcy5udW1iZXJcbiAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIGB6SW5kZXhgIHNwZWNpZmllcyB0aGUgekluZGV4IHRvIHVzZSB3aGlsZSBkcmFnZ2luZy5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgIHJldHVybiAoXG4gICAgICogICAgICAgICAgICAgICA8RHJhZ2dhYmxlIHpJbmRleD17MTAwfT5cbiAgICAgKiAgICAgICAgICAgICAgICAgICA8ZGl2PkkgaGF2ZSBhIHpJbmRleDwvZGl2PlxuICAgICAqICAgICAgICAgICAgICAgPC9EcmFnZ2FibGU+XG4gICAgICogICAgICAgICAgICk7XG4gICAgICogICAgICAgfVxuICAgICAqICAgfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgekluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuXG4gICAgLyoqXG4gICAgICogVGhlc2UgcHJvcGVydGllcyBzaG91bGQgYmUgZGVmaW5lZCBvbiB0aGUgY2hpbGQsIG5vdCBoZXJlLlxuICAgICAqL1xuICAgIGNsYXNzTmFtZTogZG9udFNldE1lLFxuICAgIHN0eWxlOiBkb250U2V0TWUsXG4gICAgdHJhbnNmb3JtOiBkb250U2V0TWVcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLkRyYWdnYWJsZUNvcmUuZGVmYXVsdFByb3BzLFxuICAgIGF4aXM6ICdib3RoJyxcbiAgICBib3VuZHM6IGZhbHNlLFxuICAgIHN0YXJ0OiB7eDogMCwgeTogMH0sXG4gICAgcG9zaXRpb246IHt4OiAwLCB5OiAwfSxcbiAgICB6SW5kZXg6IE5hTlxuICB9O1xuXG4gIHN0YXRlOiBEcmFnZ2FibGVTdGF0ZSA9IHtcbiAgICAvLyBXaGV0aGVyIG9yIG5vdCB3ZSBhcmUgY3VycmVudGx5IGRyYWdnaW5nLlxuICAgIGRyYWdnaW5nOiBmYWxzZSxcblxuICAgIC8vIFdoZXRoZXIgb3Igbm90IHdlIGhhdmUgYmVlbiBkcmFnZ2VkIGJlZm9yZS5cbiAgICBkcmFnZ2VkOiBmYWxzZSxcblxuICAgIC8vIEN1cnJlbnQgdHJhbnNmb3JtIHggYW5kIHkuXG4gICAgY2xpZW50WDogdGhpcy5wcm9wcy5zdGFydC54LCBjbGllbnRZOiB0aGlzLnByb3BzLnN0YXJ0LnksXG5cbiAgICAvLyBVc2VkIGZvciBjb21wZW5zYXRpbmcgZm9yIG91dC1vZi1ib3VuZHMgZHJhZ3NcbiAgICBzbGFja1g6IDAsIHNsYWNrWTogMCxcblxuICAgIC8vIENhbiBvbmx5IGRldGVybWluZSBpZiBTVkcgYWZ0ZXIgbW91bnRpbmdcbiAgICBpc0VsZW1lbnRTVkc6IGZhbHNlXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBlbGVtZW50IHBhc3NlZCBpcyBhbiBpbnN0YW5jZW9mIFNWR0VsZW1lbnRcbiAgICBpZihSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKSBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0VsZW1lbnRTVkc6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLnBvc2l0aW9uLnggIT09IHRoaXMucHJvcHMucG9zaXRpb24ueCB8fCBuZXh0UHJvcHMucG9zaXRpb24ueSAhPT0gdGhpcy5wcm9wcy5wb3NpdGlvbi55KSB7XG4gICAgICBjb25zb2xlLmluZm8oJ3NldHRpbmcgcG9zaXRpb24nKVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNsaWVudFg6IG5leHRQcm9wcy5wb3NpdGlvbi54LCBjbGllbnRZOiBuZXh0UHJvcHMucG9zaXRpb24ueSB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnZ2luZzogZmFsc2V9KTsgLy8gcHJldmVudHMgaW52YXJpYW50IGlmIHVubW91bnRlZCB3aGlsZSBkcmFnZ2luZ1xuICB9XG5cbiAgb25EcmFnU3RhcnQ6IENvcmVFdmVudEhhbmRsZXIgPSAoZSwgY29yZUV2ZW50KSA9PiB7XG4gICAgbG9nKCdEcmFnZ2FibGU6IG9uRHJhZ1N0YXJ0OiAlaicsIGNvcmVFdmVudC5wb3NpdGlvbik7XG5cbiAgICAvLyBTaG9ydC1jaXJjdWl0IGlmIHVzZXIncyBjYWxsYmFjayBraWxsZWQgaXQuXG4gICAgbGV0IHNob3VsZFN0YXJ0ID0gdGhpcy5wcm9wcy5vblN0YXJ0KGUsIGNyZWF0ZVVJRXZlbnQodGhpcywgY29yZUV2ZW50KSk7XG4gICAgLy8gS2lsbHMgc3RhcnQgZXZlbnQgb24gY29yZSBhcyB3ZWxsLCBzbyBtb3ZlIGhhbmRsZXJzIGFyZSBuZXZlciBib3VuZC5cbiAgICBpZiAoc2hvdWxkU3RhcnQgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnZ2luZzogdHJ1ZSwgZHJhZ2dlZDogdHJ1ZX0pO1xuICB9O1xuXG4gIG9uRHJhZzogQ29yZUV2ZW50SGFuZGxlciA9IChlLCBjb3JlRXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuZHJhZ2dpbmcpIHJldHVybiBmYWxzZTtcbiAgICBsb2coJ0RyYWdnYWJsZTogb25EcmFnOiAlaicsIGNvcmVFdmVudC5wb3NpdGlvbik7XG5cbiAgICBsZXQgdWlFdmVudCA9IGNyZWF0ZVVJRXZlbnQodGhpcywgY29yZUV2ZW50KTtcblxuICAgIGxldCBuZXdTdGF0ZSA9IHtcbiAgICAgIGNsaWVudFg6IHVpRXZlbnQucG9zaXRpb24ubGVmdCxcbiAgICAgIGNsaWVudFk6IHVpRXZlbnQucG9zaXRpb24udG9wXG4gICAgfTtcblxuICAgIC8vIEtlZXAgd2l0aGluIGJvdW5kcy5cbiAgICBpZiAodGhpcy5wcm9wcy5ib3VuZHMpIHtcbiAgICAgIC8vIFNhdmUgb3JpZ2luYWwgeCBhbmQgeS5cbiAgICAgIGxldCB7Y2xpZW50WCwgY2xpZW50WX0gPSBuZXdTdGF0ZTtcblxuICAgICAgLy8gQWRkIHNsYWNrIHRvIHRoZSB2YWx1ZXMgdXNlZCB0byBjYWxjdWxhdGUgYm91bmQgcG9zaXRpb24uIFRoaXMgd2lsbCBlbnN1cmUgdGhhdCBpZlxuICAgICAgLy8gd2Ugc3RhcnQgcmVtb3Zpbmcgc2xhY2ssIHRoZSBlbGVtZW50IHdvbid0IHJlYWN0IHRvIGl0IHJpZ2h0IGF3YXkgdW50aWwgaXQncyBiZWVuXG4gICAgICAvLyBjb21wbGV0ZWx5IHJlbW92ZWQuXG4gICAgICBuZXdTdGF0ZS5jbGllbnRYICs9IHRoaXMuc3RhdGUuc2xhY2tYO1xuICAgICAgbmV3U3RhdGUuY2xpZW50WSArPSB0aGlzLnN0YXRlLnNsYWNrWTtcblxuICAgICAgLy8gR2V0IGJvdW5kIHBvc2l0aW9uLiBUaGlzIHdpbGwgY2VpbC9mbG9vciB0aGUgeCBhbmQgeSB3aXRoaW4gdGhlIGJvdW5kYXJpZXMuXG4gICAgICBbbmV3U3RhdGUuY2xpZW50WCwgbmV3U3RhdGUuY2xpZW50WV0gPSBnZXRCb3VuZFBvc2l0aW9uKHRoaXMsIG5ld1N0YXRlLmNsaWVudFgsIG5ld1N0YXRlLmNsaWVudFkpO1xuXG4gICAgICAvLyBSZWNhbGN1bGF0ZSBzbGFjayBieSBub3RpbmcgaG93IG11Y2ggd2FzIHNoYXZlZCBieSB0aGUgYm91bmRQb3NpdGlvbiBoYW5kbGVyLlxuICAgICAgbmV3U3RhdGUuc2xhY2tYID0gdGhpcy5zdGF0ZS5zbGFja1ggKyAoY2xpZW50WCAtIG5ld1N0YXRlLmNsaWVudFgpO1xuICAgICAgbmV3U3RhdGUuc2xhY2tZID0gdGhpcy5zdGF0ZS5zbGFja1kgKyAoY2xpZW50WSAtIG5ld1N0YXRlLmNsaWVudFkpO1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIGV2ZW50IHdlIGZpcmUgdG8gcmVmbGVjdCB3aGF0IHJlYWxseSBoYXBwZW5lZCBhZnRlciBib3VuZHMgdG9vayBlZmZlY3QuXG4gICAgICB1aUV2ZW50LnBvc2l0aW9uLmxlZnQgPSBjbGllbnRYO1xuICAgICAgdWlFdmVudC5wb3NpdGlvbi50b3AgPSBjbGllbnRZO1xuICAgICAgdWlFdmVudC5kZWx0YVggPSBuZXdTdGF0ZS5jbGllbnRYIC0gdGhpcy5zdGF0ZS5jbGllbnRYO1xuICAgICAgdWlFdmVudC5kZWx0YVkgPSBuZXdTdGF0ZS5jbGllbnRZIC0gdGhpcy5zdGF0ZS5jbGllbnRZO1xuICAgIH1cblxuICAgIC8vIFNob3J0LWNpcmN1aXQgaWYgdXNlcidzIGNhbGxiYWNrIGtpbGxlZCBpdC5cbiAgICBsZXQgc2hvdWxkVXBkYXRlID0gdGhpcy5wcm9wcy5vbkRyYWcoZSwgdWlFdmVudCk7XG4gICAgaWYgKHNob3VsZFVwZGF0ZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9O1xuXG4gIG9uRHJhZ1N0b3A6IENvcmVFdmVudEhhbmRsZXIgPSAoZSwgY29yZUV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmRyYWdnaW5nKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBTaG9ydC1jaXJjdWl0IGlmIHVzZXIncyBjYWxsYmFjayBraWxsZWQgaXQuXG4gICAgbGV0IHNob3VsZFN0b3AgPSB0aGlzLnByb3BzLm9uU3RvcChlLCBjcmVhdGVVSUV2ZW50KHRoaXMsIGNvcmVFdmVudCkpO1xuICAgIGlmIChzaG91bGRTdG9wID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgbG9nKCdEcmFnZ2FibGU6IG9uRHJhZ1N0b3A6ICVqJywgY29yZUV2ZW50LnBvc2l0aW9uKTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgc2xhY2tYOiAwLFxuICAgICAgc2xhY2tZOiAwXG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCk6IFJlYWN0RWxlbWVudCB7XG4gICAgbGV0IHN0eWxlID0ge30sIHN2Z1RyYW5zZm9ybSA9IG51bGw7XG5cbiAgICAvLyBBZGQgYSBDU1MgdHJhbnNmb3JtIHRvIG1vdmUgdGhlIGVsZW1lbnQgYXJvdW5kLiBUaGlzIGFsbG93cyB1cyB0byBtb3ZlIHRoZSBlbGVtZW50IGFyb3VuZFxuICAgIC8vIHdpdGhvdXQgd29ycnlpbmcgYWJvdXQgd2hldGhlciBvciBub3QgaXQgaXMgcmVsYXRpdmVseSBvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQuXG4gICAgLy8gSWYgdGhlIGl0ZW0geW91IGFyZSBkcmFnZ2luZyBhbHJlYWR5IGhhcyBhIHRyYW5zZm9ybSBzZXQsIHdyYXAgaXQgaW4gYSA8c3Bhbj4gc28gPERyYWdnYWJsZT5cbiAgICAvLyBoYXMgYSBjbGVhbiBzbGF0ZS5cbiAgICBjb25zdCB0cmFuc2Zvcm1PcHRzID0ge1xuICAgICAgLy8gU2V0IGxlZnQgaWYgaG9yaXpvbnRhbCBkcmFnIGlzIGVuYWJsZWRcbiAgICAgIHg6IGNhbkRyYWdYKHRoaXMpID9cbiAgICAgICAgdGhpcy5zdGF0ZS5jbGllbnRYIDpcbiAgICAgICAgdGhpcy5wcm9wcy5zdGFydC54LFxuXG4gICAgICAvLyBTZXQgdG9wIGlmIHZlcnRpY2FsIGRyYWcgaXMgZW5hYmxlZFxuICAgICAgeTogY2FuRHJhZ1kodGhpcykgP1xuICAgICAgICB0aGlzLnN0YXRlLmNsaWVudFkgOlxuICAgICAgICB0aGlzLnByb3BzLnN0YXJ0LnlcbiAgICB9O1xuXG4gICAgLy8gSWYgdGhpcyBlbGVtZW50IHdhcyBTVkcsIHdlIHVzZSB0aGUgYHRyYW5zZm9ybWAgYXR0cmlidXRlLlxuICAgIGlmICh0aGlzLnN0YXRlLmlzRWxlbWVudFNWRykge1xuICAgICAgc3ZnVHJhbnNmb3JtID0gY3JlYXRlU1ZHVHJhbnNmb3JtKHRyYW5zZm9ybU9wdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZSA9IGNyZWF0ZUNTU1RyYW5zZm9ybSh0cmFuc2Zvcm1PcHRzKTtcbiAgICB9XG5cbiAgICAvLyB6SW5kZXggb3B0aW9uXG4gICAgaWYgKHRoaXMuc3RhdGUuZHJhZ2dpbmcgJiYgIWlzTmFOKHRoaXMucHJvcHMuekluZGV4KSkge1xuICAgICAgc3R5bGUuekluZGV4ID0gdGhpcy5wcm9wcy56SW5kZXg7XG4gICAgfVxuXG4gICAgLy8gTWFyayB3aXRoIGNsYXNzIHdoaWxlIGRyYWdnaW5nXG4gICAgbGV0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoKHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuY2xhc3NOYW1lIHx8ICcnKSwgJ3JlYWN0LWRyYWdnYWJsZScsIHtcbiAgICAgICdyZWFjdC1kcmFnZ2FibGUtZHJhZ2dpbmcnOiB0aGlzLnN0YXRlLmRyYWdnaW5nLFxuICAgICAgJ3JlYWN0LWRyYWdnYWJsZS1kcmFnZ2VkJzogdGhpcy5zdGF0ZS5kcmFnZ2VkXG4gICAgfSk7XG5cbiAgICAvLyBSZXVzZSB0aGUgY2hpbGQgcHJvdmlkZWRcbiAgICAvLyBUaGlzIG1ha2VzIGl0IGZsZXhpYmxlIHRvIHVzZSB3aGF0ZXZlciBlbGVtZW50IGlzIHdhbnRlZCAoZGl2LCB1bCwgZXRjKVxuICAgIHJldHVybiAoXG4gICAgICA8RHJhZ2dhYmxlQ29yZSB7Li4udGhpcy5wcm9wc30gb25TdGFydD17dGhpcy5vbkRyYWdTdGFydH0gb25EcmFnPXt0aGlzLm9uRHJhZ30gb25TdG9wPXt0aGlzLm9uRHJhZ1N0b3B9PlxuICAgICAgICB7UmVhY3QuY2xvbmVFbGVtZW50KFJlYWN0LkNoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbiksIHtcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgICBzdHlsZTogey4uLnRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuc3R5bGUsIC4uLnN0eWxlfSxcbiAgICAgICAgICB0cmFuc2Zvcm06IHN2Z1RyYW5zZm9ybVxuICAgICAgICB9KX1cbiAgICAgIDwvRHJhZ2dhYmxlQ29yZT5cbiAgICApO1xuICB9XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL0RyYWdnYWJsZS5lczZcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCIsXCJyb290XCI6XCJSZWFjdFwifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmVhY3QtZG9tXCIsXCJjb21tb25qczJcIjpcInJlYWN0LWRvbVwiLFwiYW1kXCI6XCJyZWFjdC1kb21cIixcInJvb3RcIjpcIlJlYWN0RE9NXCJ9XG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jbGFzc25hbWVzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gQGZsb3dcbmltcG9ydCB7ZmluZEluQXJyYXksIGlzRnVuY3Rpb24sIGlzTnVtLCBpbnR9IGZyb20gJy4vc2hpbXMnO1xuaW1wb3J0IGJyb3dzZXJQcmVmaXggZnJvbSAnLi9nZXRQcmVmaXgnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCB0eXBlIERyYWdnYWJsZSBmcm9tICcuLi9EcmFnZ2FibGUnO1xuaW1wb3J0IHR5cGUgRHJhZ2dhYmxlQ29yZSBmcm9tICcuLi9EcmFnZ2FibGVDb3JlJztcblxuZXhwb3J0IHR5cGUgQ29yZUV2ZW50ID0ge1xuICBub2RlOiBIVE1MRWxlbWVudCxcbiAgcG9zaXRpb246IHtcbiAgICBkZWx0YVg6IG51bWJlciwgZGVsdGFZOiBudW1iZXIsXG4gICAgbGFzdFg6IG51bWJlciwgbGFzdFk6IG51bWJlcixcbiAgICBjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlclxuICB9XG59O1xuXG5leHBvcnQgdHlwZSBVSUV2ZW50ID0ge1xuICBub2RlOiBIVE1MRWxlbWVudCxcbiAgcG9zaXRpb246IHtcbiAgICBsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyXG4gIH0sXG4gIGRlbHRhWDogbnVtYmVyLCBkZWx0YVk6IG51bWJlclxufTtcblxubGV0IG1hdGNoZXNTZWxlY3RvckZ1bmMgPSAnJztcbmV4cG9ydCBmdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3IoZWw6IEhUTUxFbGVtZW50LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGlmICghbWF0Y2hlc1NlbGVjdG9yRnVuYykge1xuICAgIG1hdGNoZXNTZWxlY3RvckZ1bmMgPSBmaW5kSW5BcnJheShbXG4gICAgICAnbWF0Y2hlcycsXG4gICAgICAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJyxcbiAgICAgICdtb3pNYXRjaGVzU2VsZWN0b3InLFxuICAgICAgJ21zTWF0Y2hlc1NlbGVjdG9yJyxcbiAgICAgICdvTWF0Y2hlc1NlbGVjdG9yJ1xuICAgIF0sIGZ1bmN0aW9uKG1ldGhvZCl7XG4gICAgICAvLyAkRmxvd0lnbm9yZTogRG9lc24ndCB0aGluayBlbGVtZW50cyBhcmUgaW5kZXhhYmxlXG4gICAgICByZXR1cm4gaXNGdW5jdGlvbihlbFttZXRob2RdKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcbiAgcmV0dXJuIGVsW21hdGNoZXNTZWxlY3RvckZ1bmNdLmNhbGwoZWwsIHNlbGVjdG9yKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50KGVsOiA/Tm9kZSwgZXZlbnQ6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgaWYgKCFlbCkgeyByZXR1cm47IH1cbiAgaWYgKGVsLmF0dGFjaEV2ZW50KSB7XG4gICAgZWwuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgfSBlbHNlIGlmIChlbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gJEZsb3dJZ25vcmU6IERvZXNuJ3QgdGhpbmsgZWxlbWVudHMgYXJlIGluZGV4YWJsZVxuICAgIGVsWydvbicgKyBldmVudF0gPSBoYW5kbGVyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFdmVudChlbDogP05vZGUsIGV2ZW50OiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogdm9pZCB7XG4gIGlmICghZWwpIHsgcmV0dXJuOyB9XG4gIGlmIChlbC5kZXRhY2hFdmVudCkge1xuICAgIGVsLmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgaGFuZGxlcik7XG4gIH0gZWxzZSBpZiAoZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcbiAgICBlbFsnb24nICsgZXZlbnRdID0gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb3V0ZXJIZWlnaHQobm9kZTogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAvLyBUaGlzIGlzIGRlbGliZXJhdGVseSBleGNsdWRpbmcgbWFyZ2luIGZvciBvdXIgY2FsY3VsYXRpb25zLCBzaW5jZSB3ZSBhcmUgdXNpbmdcbiAgLy8gb2Zmc2V0VG9wIHdoaWNoIGlzIGluY2x1ZGluZyBtYXJnaW4uIFNlZSBnZXRCb3VuZFBvc2l0aW9uXG4gIGxldCBoZWlnaHQgPSBub2RlLmNsaWVudEhlaWdodDtcbiAgbGV0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgaGVpZ2h0ICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlclRvcFdpZHRoKTtcbiAgaGVpZ2h0ICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlckJvdHRvbVdpZHRoKTtcbiAgcmV0dXJuIGhlaWdodDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG91dGVyV2lkdGgobm9kZTogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAvLyBUaGlzIGlzIGRlbGliZXJhdGVseSBleGNsdWRpbmcgbWFyZ2luIGZvciBvdXIgY2FsY3VsYXRpb25zLCBzaW5jZSB3ZSBhcmUgdXNpbmdcbiAgLy8gb2Zmc2V0TGVmdCB3aGljaCBpcyBpbmNsdWRpbmcgbWFyZ2luLiBTZWUgZ2V0Qm91bmRQb3NpdGlvblxuICBsZXQgd2lkdGggPSBub2RlLmNsaWVudFdpZHRoO1xuICBsZXQgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICB3aWR0aCArPSBpbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJMZWZ0V2lkdGgpO1xuICB3aWR0aCArPSBpbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJSaWdodFdpZHRoKTtcbiAgcmV0dXJuIHdpZHRoO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlubmVySGVpZ2h0KG5vZGU6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgbGV0IGhlaWdodCA9IG5vZGUuY2xpZW50SGVpZ2h0O1xuICBsZXQgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBoZWlnaHQgLT0gaW50KGNvbXB1dGVkU3R5bGUucGFkZGluZ1RvcCk7XG4gIGhlaWdodCAtPSBpbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nQm90dG9tKTtcbiAgcmV0dXJuIGhlaWdodDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlubmVyV2lkdGgobm9kZTogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICBsZXQgd2lkdGggPSBub2RlLmNsaWVudFdpZHRoO1xuICBsZXQgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICB3aWR0aCAtPSBpbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nTGVmdCk7XG4gIHdpZHRoIC09IGludChjb21wdXRlZFN0eWxlLnBhZGRpbmdSaWdodCk7XG4gIHJldHVybiB3aWR0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNTU1RyYW5zZm9ybSh7eCwgeX06IHt4OiBudW1iZXIsIHk6IG51bWJlcn0pOiBPYmplY3Qge1xuICAvLyBSZXBsYWNlIHVuaXRsZXNzIGl0ZW1zIHdpdGggcHhcbiAgbGV0IG91dCA9IHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUoJyArIHggKyAncHgsJyArIHkgKyAncHgpJ307XG4gIC8vIEFkZCBzaW5nbGUgcHJlZml4ZWQgcHJvcGVydHkgYXMgd2VsbFxuICBpZiAoYnJvd3NlclByZWZpeCkge1xuICAgIG91dFticm93c2VyUHJlZml4ICsgJ1RyYW5zZm9ybSddID0gb3V0LnRyYW5zZm9ybTtcbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU1ZHVHJhbnNmb3JtKHt4LCB5fToge3g6IG51bWJlciwgeTogbnVtYmVyfSk6IHN0cmluZyB7XG4gIHJldHVybiAndHJhbnNsYXRlKCcgKyB4ICsgJywnICsgeSArICcpJztcbn1cblxuLy8gVXNlci1zZWxlY3QgSGFja3M6XG4vL1xuLy8gVXNlZnVsIGZvciBwcmV2ZW50aW5nIGJsdWUgaGlnaGxpZ2h0cyBhbGwgb3ZlciBldmVyeXRoaW5nIHdoZW4gZHJhZ2dpbmcuXG5sZXQgdXNlclNlbGVjdFN0eWxlID0gJzt1c2VyLXNlbGVjdDogbm9uZTsnO1xuaWYgKGJyb3dzZXJQcmVmaXgpIHtcbiAgdXNlclNlbGVjdFN0eWxlICs9ICctJyArIGJyb3dzZXJQcmVmaXgudG9Mb3dlckNhc2UoKSArICctdXNlci1zZWxlY3Q6IG5vbmU7Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFVzZXJTZWxlY3RTdHlsZXMoKSB7XG4gIGxldCBzdHlsZSA9IGRvY3VtZW50LmJvZHkuZ2V0QXR0cmlidXRlKCdzdHlsZScpIHx8ICcnO1xuICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSArIHVzZXJTZWxlY3RTdHlsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVVc2VyU2VsZWN0U3R5bGVzKCkge1xuICBsZXQgc3R5bGUgPSBkb2N1bWVudC5ib2R5LmdldEF0dHJpYnV0ZSgnc3R5bGUnKSB8fCAnJztcbiAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUucmVwbGFjZSh1c2VyU2VsZWN0U3R5bGUsICcnKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZUhhY2tzKGNoaWxkU3R5bGU6IE9iamVjdCA9IHt9KTogT2JqZWN0IHtcbiAgLy8gV29ya2Fyb3VuZCBJRSBwb2ludGVyIGV2ZW50czsgc2VlICM1MVxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9yZWFjdC1kcmFnZ2FibGUvaXNzdWVzLzUxI2lzc3VlY29tbWVudC0xMDM0ODgyNzhcbiAgcmV0dXJuIHtcbiAgICB0b3VjaEFjdGlvbjogJ25vbmUnLFxuICAgIC4uLmNoaWxkU3R5bGVcbiAgfTtcbn1cblxuLy8gQ3JlYXRlIGFuIGV2ZW50IGV4cG9zZWQgYnkgPERyYWdnYWJsZUNvcmU+XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29yZUV2ZW50KGRyYWdnYWJsZTogRHJhZ2dhYmxlQ29yZSwgY2xpZW50WDogbnVtYmVyLCBjbGllbnRZOiBudW1iZXIpOiBDb3JlRXZlbnQge1xuICAvLyBTdGF0ZSBjaGFuZ2VzIGFyZSBvZnRlbiAoYnV0IG5vdCBhbHdheXMhKSBhc3luYy4gV2Ugd2FudCB0aGUgbGF0ZXN0IHZhbHVlLlxuICBsZXQgc3RhdGUgPSBkcmFnZ2FibGUuX3BlbmRpbmdTdGF0ZSB8fCBkcmFnZ2FibGUuc3RhdGU7XG4gIGxldCBpc1N0YXJ0ID0gIWlzTnVtKHN0YXRlLmxhc3RYKTtcblxuICByZXR1cm4ge1xuICAgIG5vZGU6IFJlYWN0RE9NLmZpbmRET01Ob2RlKGRyYWdnYWJsZSksXG4gICAgcG9zaXRpb246IGlzU3RhcnQgP1xuICAgICAgLy8gSWYgdGhpcyBpcyBvdXIgZmlyc3QgbW92ZSwgdXNlIHRoZSBjbGllbnRYIGFuZCBjbGllbnRZIGFzIGxhc3QgY29vcmRzLlxuICAgICAge1xuICAgICAgICBkZWx0YVg6IDAsIGRlbHRhWTogMCxcbiAgICAgICAgbGFzdFg6IGNsaWVudFgsIGxhc3RZOiBjbGllbnRZLFxuICAgICAgICBjbGllbnRYOiBjbGllbnRYLCBjbGllbnRZOiBjbGllbnRZXG4gICAgICB9IDpcbiAgICAgIC8vIE90aGVyd2lzZSBjYWxjdWxhdGUgcHJvcGVyIHZhbHVlcy5cbiAgICAgIHtcbiAgICAgICAgZGVsdGFYOiBjbGllbnRYIC0gc3RhdGUubGFzdFgsIGRlbHRhWTogY2xpZW50WSAtIHN0YXRlLmxhc3RZLFxuICAgICAgICBsYXN0WDogc3RhdGUubGFzdFgsIGxhc3RZOiBzdGF0ZS5sYXN0WSxcbiAgICAgICAgY2xpZW50WDogY2xpZW50WCwgY2xpZW50WTogY2xpZW50WVxuICAgICAgfVxuICB9O1xufVxuXG4vLyBDcmVhdGUgYW4gZXZlbnQgZXhwb3NlZCBieSA8RHJhZ2dhYmxlPlxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVJRXZlbnQoZHJhZ2dhYmxlOiBEcmFnZ2FibGUsIGNvcmVFdmVudDogQ29yZUV2ZW50KTogVUlFdmVudCB7XG4gIHJldHVybiB7XG4gICAgbm9kZTogUmVhY3RET00uZmluZERPTU5vZGUoZHJhZ2dhYmxlKSxcbiAgICBwb3NpdGlvbjoge1xuICAgICAgbGVmdDogZHJhZ2dhYmxlLnN0YXRlLmNsaWVudFggKyBjb3JlRXZlbnQucG9zaXRpb24uZGVsdGFYLFxuICAgICAgdG9wOiBkcmFnZ2FibGUuc3RhdGUuY2xpZW50WSArIGNvcmVFdmVudC5wb3NpdGlvbi5kZWx0YVlcbiAgICB9LFxuICAgIGRlbHRhWDogY29yZUV2ZW50LnBvc2l0aW9uLmRlbHRhWCxcbiAgICBkZWx0YVk6IGNvcmVFdmVudC5wb3NpdGlvbi5kZWx0YVlcbiAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3V0aWxzL2RvbUZucy5lczZcbiAqKi8iLCIvLyBAZmxvd1xuLy8gQGNyZWRpdHMgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcm9nb3pobmlrb2ZmL2E0M2NmZWQyN2M0MWU0ZTY4Y2RjXG5leHBvcnQgZnVuY3Rpb24gZmluZEluQXJyYXkoYXJyYXk6IEFycmF5PGFueT4sIGNhbGxiYWNrOiBGdW5jdGlvbik6IGFueSB7XG4gIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChjYWxsYmFjay5hcHBseShjYWxsYmFjaywgW2FycmF5W2ldLCBpLCBhcnJheV0pKSByZXR1cm4gYXJyYXlbaV07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuYzogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZnVuYykgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bShudW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIG51bSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKG51bSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnQoYTogc3RyaW5nKTogbnVtYmVyIHtcbiAgcmV0dXJuIHBhcnNlSW50KGEsIDEwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvbnRTZXRNZShwcm9wczogT2JqZWN0LCBwcm9wTmFtZTogc3RyaW5nLCBjb21wb25lbnROYW1lOiBzdHJpbmcpIHtcbiAgaWYgKHByb3BzW3Byb3BOYW1lXSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwcm9wICR7cHJvcE5hbWV9IHBhc3NlZCB0byAke2NvbXBvbmVudE5hbWV9IC0gZG8gbm90IHNldCB0aGlzLCBzZXQgaXQgb24gdGhlIGNoaWxkLmApO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi91dGlscy9zaGltcy5lczZcbiAqKi8iLCIvLyBAZmxvd1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUHJlZml4KCk6IHN0cmluZyB7XG4gIC8vIENoZWNraW5nIHNwZWNpZmljYWxseSBmb3IgJ3dpbmRvdy5kb2N1bWVudCcgaXMgZm9yIHBzZXVkby1icm93c2VyIHNlcnZlci1zaWRlXG4gIC8vIGVudmlyb25tZW50cyB0aGF0IGRlZmluZSAnd2luZG93JyBhcyB0aGUgZ2xvYmFsIGNvbnRleHQuXG4gIC8vIEUuZy4gUmVhY3QtcmFpbHMgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVhY3Rqcy9yZWFjdC1yYWlscy9wdWxsLzg0KVxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiAnJztcblxuICAvLyBUaGFua3MgRGF2aWQgV2Fsc2hcbiAgbGV0IHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJycpLFxuICBwcmUgPSAoQXJyYXkucHJvdG90eXBlLnNsaWNlXG4gICAgICAgIC5jYWxsKHN0eWxlcylcbiAgICAgICAgLmpvaW4oJycpXG4gICAgICAgIC5tYXRjaCgvLShtb3p8d2Via2l0fG1zKS0vKSB8fCAoc3R5bGVzLk9MaW5rID09PSAnJyA/IFsnJywgJ28nXSA6IFtdKVxuICAgICAgKVsxXTtcbiAgLy8gJ21zJyBpcyBub3QgdGl0bGVjYXNlZFxuICBpZiAocHJlID09PSB1bmRlZmluZWQgfHwgcHJlID09PSBudWxsKSByZXR1cm4gJyc7XG4gIGlmIChwcmUgPT09ICdtcycpIHJldHVybiBwcmU7XG4gIGlmIChwcmUgPT09IHVuZGVmaW5lZCB8fCBwcmUgPT09IG51bGwpIHJldHVybiAnJztcbiAgcmV0dXJuIHByZS5zbGljZSgwLCAxKS50b1VwcGVyQ2FzZSgpICsgcHJlLnNsaWNlKDEpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZVByZWZpeCgpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdXRpbHMvZ2V0UHJlZml4LmVzNlxuICoqLyIsIi8vIEBmbG93XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtpc051bSwgaW50fSBmcm9tICcuL3NoaW1zJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtpbm5lcldpZHRoLCBpbm5lckhlaWdodCwgb3V0ZXJXaWR0aCwgb3V0ZXJIZWlnaHR9IGZyb20gJy4vZG9tRm5zJztcblxuaW1wb3J0IHR5cGUgRHJhZ2dhYmxlIGZyb20gJy4uL0RyYWdnYWJsZSc7XG5leHBvcnQgdHlwZSBDb250cm9sUG9zaXRpb24gPSB7XG4gIGNsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyXG59O1xuZXhwb3J0IHR5cGUgQm91bmRzID0ge1xuICBsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlclxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJvdW5kUG9zaXRpb24oZHJhZ2dhYmxlOiBEcmFnZ2FibGUsIGNsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB7XG4gIC8vIElmIG5vIGJvdW5kcywgc2hvcnQtY2lyY3VpdCBhbmQgbW92ZSBvblxuICBpZiAoIWRyYWdnYWJsZS5wcm9wcy5ib3VuZHMpIHJldHVybiBbY2xpZW50WCwgY2xpZW50WV07XG5cbiAgLy8gQ2xvbmUgbmV3IGJvdW5kc1xuICBsZXQge2JvdW5kc30gPSBkcmFnZ2FibGUucHJvcHM7XG4gIGJvdW5kcyA9IHR5cGVvZiBib3VuZHMgPT09ICdzdHJpbmcnID8gYm91bmRzIDogY2xvbmVCb3VuZHMoYm91bmRzKTtcbiAgbGV0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShkcmFnZ2FibGUpO1xuXG4gIGlmICh0eXBlb2YgYm91bmRzID09PSAnc3RyaW5nJykge1xuICAgIGxldCBib3VuZE5vZGU7XG4gICAgaWYgKGJvdW5kcyA9PT0gJ3BhcmVudCcpIHtcbiAgICAgIGJvdW5kTm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm91bmROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihib3VuZHMpO1xuICAgICAgaWYgKCFib3VuZE5vZGUpIHRocm93IG5ldyBFcnJvcignQm91bmRzIHNlbGVjdG9yIFwiJyArIGJvdW5kcyArICdcIiBjb3VsZCBub3QgZmluZCBhbiBlbGVtZW50LicpO1xuICAgIH1cbiAgICBsZXQgbm9kZVN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgbGV0IGJvdW5kTm9kZVN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoYm91bmROb2RlKTtcbiAgICAvLyBDb21wdXRlIGJvdW5kcy4gVGhpcyBpcyBhIHBhaW4gd2l0aCBwYWRkaW5nIGFuZCBvZmZzZXRzIGJ1dCB0aGlzIGdldHMgaXQgZXhhY3RseSByaWdodC5cbiAgICBib3VuZHMgPSB7XG4gICAgICBsZWZ0OiAtbm9kZS5vZmZzZXRMZWZ0ICsgaW50KGJvdW5kTm9kZVN0eWxlLnBhZGRpbmdMZWZ0KSArXG4gICAgICAgICAgICBpbnQobm9kZVN0eWxlLmJvcmRlckxlZnRXaWR0aCkgKyBpbnQobm9kZVN0eWxlLm1hcmdpbkxlZnQpLFxuICAgICAgdG9wOiAtbm9kZS5vZmZzZXRUb3AgKyBpbnQoYm91bmROb2RlU3R5bGUucGFkZGluZ1RvcCkgK1xuICAgICAgICAgICAgaW50KG5vZGVTdHlsZS5ib3JkZXJUb3BXaWR0aCkgKyBpbnQobm9kZVN0eWxlLm1hcmdpblRvcCksXG4gICAgICByaWdodDogaW5uZXJXaWR0aChib3VuZE5vZGUpIC0gb3V0ZXJXaWR0aChub2RlKSAtIG5vZGUub2Zmc2V0TGVmdCxcbiAgICAgIGJvdHRvbTogaW5uZXJIZWlnaHQoYm91bmROb2RlKSAtIG91dGVySGVpZ2h0KG5vZGUpIC0gbm9kZS5vZmZzZXRUb3BcbiAgICB9O1xuICB9XG5cbiAgLy8gS2VlcCB4IGFuZCB5IGJlbG93IHJpZ2h0IGFuZCBib3R0b20gbGltaXRzLi4uXG4gIGlmIChpc051bShib3VuZHMucmlnaHQpKSBjbGllbnRYID0gTWF0aC5taW4oY2xpZW50WCwgYm91bmRzLnJpZ2h0KTtcbiAgaWYgKGlzTnVtKGJvdW5kcy5ib3R0b20pKSBjbGllbnRZID0gTWF0aC5taW4oY2xpZW50WSwgYm91bmRzLmJvdHRvbSk7XG5cbiAgLy8gQnV0IGFib3ZlIGxlZnQgYW5kIHRvcCBsaW1pdHMuXG4gIGlmIChpc051bShib3VuZHMubGVmdCkpIGNsaWVudFggPSBNYXRoLm1heChjbGllbnRYLCBib3VuZHMubGVmdCk7XG4gIGlmIChpc051bShib3VuZHMudG9wKSkgY2xpZW50WSA9IE1hdGgubWF4KGNsaWVudFksIGJvdW5kcy50b3ApO1xuXG4gIHJldHVybiBbY2xpZW50WCwgY2xpZW50WV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbmFwVG9HcmlkKGdyaWQ6IFtudW1iZXIsIG51bWJlcl0sIHBlbmRpbmdYOiBudW1iZXIsIHBlbmRpbmdZOiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgbGV0IHggPSBNYXRoLnJvdW5kKHBlbmRpbmdYIC8gZ3JpZFswXSkgKiBncmlkWzBdO1xuICBsZXQgeSA9IE1hdGgucm91bmQocGVuZGluZ1kgLyBncmlkWzFdKSAqIGdyaWRbMV07XG4gIHJldHVybiBbeCwgeV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5EcmFnWChkcmFnZ2FibGU6IFJlYWN0LkNvbXBvbmVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICdib3RoJyB8fCBkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ3gnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FuRHJhZ1koZHJhZ2dhYmxlOiBSZWFjdC5Db21wb25lbnQpOiBib29sZWFuIHtcbiAgcmV0dXJuIGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAnYm90aCcgfHwgZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICd5Jztcbn1cblxuLy8gR2V0IHtjbGllbnRYLCBjbGllbnRZfSBwb3NpdGlvbnMgZnJvbSBldmVudC5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250cm9sUG9zaXRpb24oZTogRXZlbnQpOiBDb250cm9sUG9zaXRpb24ge1xuICBsZXQgcG9zaXRpb24gPSAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlc1swXSkgfHwgZTtcbiAgcmV0dXJuIHtcbiAgICBjbGllbnRYOiBwb3NpdGlvbi5jbGllbnRYLFxuICAgIGNsaWVudFk6IHBvc2l0aW9uLmNsaWVudFlcbiAgfTtcbn1cblxuLy8gQSBsb3QgZmFzdGVyIHRoYW4gc3RyaW5naWZ5L3BhcnNlXG5mdW5jdGlvbiBjbG9uZUJvdW5kcyhib3VuZHM6IEJvdW5kcyk6IEJvdW5kcyB7XG4gIHJldHVybiB7XG4gICAgbGVmdDogYm91bmRzLmxlZnQsXG4gICAgdG9wOiBib3VuZHMudG9wLFxuICAgIHJpZ2h0OiBib3VuZHMucmlnaHQsXG4gICAgYm90dG9tOiBib3VuZHMuYm90dG9tXG4gIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi91dGlscy9wb3NpdGlvbkZucy5lczZcbiAqKi8iLCIvLyBAZmxvd1xuaW1wb3J0IHtkZWZhdWx0IGFzIFJlYWN0LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7bWF0Y2hlc1NlbGVjdG9yLCBjcmVhdGVDb3JlRXZlbnQsIGFkZEV2ZW50LCByZW1vdmVFdmVudCwgYWRkVXNlclNlbGVjdFN0eWxlcyxcbiAgICAgICAgcmVtb3ZlVXNlclNlbGVjdFN0eWxlcywgc3R5bGVIYWNrc30gZnJvbSAnLi91dGlscy9kb21GbnMnO1xuaW1wb3J0IHtnZXRDb250cm9sUG9zaXRpb24sIHNuYXBUb0dyaWR9IGZyb20gJy4vdXRpbHMvcG9zaXRpb25GbnMnO1xuaW1wb3J0IHtkb250U2V0TWV9IGZyb20gJy4vdXRpbHMvc2hpbXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL3V0aWxzL2xvZyc7XG5cbi8vIFNpbXBsZSBhYnN0cmFjdGlvbiBmb3IgZHJhZ2dpbmcgZXZlbnRzIG5hbWVzLlxuY29uc3QgZXZlbnRzRm9yID0ge1xuICB0b3VjaDoge1xuICAgIHN0YXJ0OiAndG91Y2hzdGFydCcsXG4gICAgbW92ZTogJ3RvdWNobW92ZScsXG4gICAgc3RvcDogJ3RvdWNoZW5kJ1xuICB9LFxuICBtb3VzZToge1xuICAgIHN0YXJ0OiAnbW91c2Vkb3duJyxcbiAgICBtb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICBzdG9wOiAnbW91c2V1cCdcbiAgfVxufTtcblxuLy8gRGVmYXVsdCB0byBtb3VzZSBldmVudHMuXG5sZXQgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLm1vdXNlO1xuXG50eXBlIEV2ZW50SGFuZGxlciA9IChlOiBFdmVudCkgPT4gdm9pZDtcbnR5cGUgQ29yZVN0YXRlID0ge1xuICBkcmFnZ2luZzogYm9vbGVhbixcbiAgbGFzdFg6ID9udW1iZXIsXG4gIGxhc3RZOiA/bnVtYmVyXG59O1xuXG4vL1xuLy8gRGVmaW5lIDxEcmFnZ2FibGVDb3JlPi5cbi8vXG4vLyA8RHJhZ2dhYmxlQ29yZT4gaXMgZm9yIGFkdmFuY2VkIHVzYWdlIG9mIDxEcmFnZ2FibGU+LiBJdCBtYWludGFpbnMgbWluaW1hbCBpbnRlcm5hbCBzdGF0ZSBzbyBpdCBjYW5cbi8vIHdvcmsgd2VsbCB3aXRoIGxpYnJhcmllcyB0aGF0IHJlcXVpcmUgbW9yZSBjb250cm9sIG92ZXIgdGhlIGVsZW1lbnQuXG4vL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnZ2FibGVDb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBzdGF0aWMgZGlzcGxheU5hbWUgPSAnRHJhZ2dhYmxlQ29yZSc7XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAvKipcbiAgICAgKiBgYWxsb3dBbnlDbGlja2AgYWxsb3dzIGRyYWdnaW5nIHVzaW5nIGFueSBtb3VzZSBidXR0b24uXG4gICAgICogQnkgZGVmYXVsdCwgd2Ugb25seSBhY2NlcHQgdGhlIGxlZnQgYnV0dG9uLlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gYGZhbHNlYC5cbiAgICAgKi9cbiAgICBhbGxvd0FueUNsaWNrOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8qKlxuICAgICAqIGBkaXNhYmxlZGAsIGlmIHRydWUsIHN0b3BzIHRoZSA8RHJhZ2dhYmxlPiBmcm9tIGRyYWdnaW5nLiBBbGwgaGFuZGxlcnMsXG4gICAgICogd2l0aCB0aGUgZXhjZXB0aW9uIG9mIGBvbk1vdXNlRG93bmAsIHdpbGwgbm90IGZpcmUuXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganN4XG4gICAgICogICBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAqICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgICByZXR1cm4gKFxuICAgICAqICAgICAgICAgICAgICAgPERyYWdnYWJsZSBkaXNhYmxlZD17dHJ1ZX0+XG4gICAgICogICAgICAgICAgICAgICAgICAgPGRpdj5JIGNhbid0IGJlIGRyYWdnZWQ8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgICApO1xuICAgICAqICAgICAgIH1cbiAgICAgKiAgIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8qKlxuICAgICAqIEJ5IGRlZmF1bHQsIHdlIGFkZCAndXNlci1zZWxlY3Q6bm9uZScgYXR0cmlidXRlcyB0byB0aGUgZG9jdW1lbnQgYm9keVxuICAgICAqIHRvIHByZXZlbnQgdWdseSB0ZXh0IHNlbGVjdGlvbiBkdXJpbmcgZHJhZy4gSWYgdGhpcyBpcyBjYXVzaW5nIHByb2JsZW1zXG4gICAgICogZm9yIHlvdXIgYXBwLCBzZXQgdGhpcyB0byBgZmFsc2VgLlxuICAgICAqL1xuICAgIGVuYWJsZVVzZXJTZWxlY3RIYWNrOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8qKlxuICAgICAqIGBncmlkYCBzcGVjaWZpZXMgdGhlIHggYW5kIHkgdGhhdCBkcmFnZ2luZyBzaG91bGQgc25hcCB0by5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgIHJldHVybiAoXG4gICAgICogICAgICAgICAgICAgICA8RHJhZ2dhYmxlIGdyaWQ9e1syNSwgMjVdfT5cbiAgICAgKiAgICAgICAgICAgICAgICAgICA8ZGl2Pkkgc25hcCB0byBhIDI1IHggMjUgZ3JpZDwvZGl2PlxuICAgICAqICAgICAgICAgICAgICAgPC9EcmFnZ2FibGU+XG4gICAgICogICAgICAgICAgICk7XG4gICAgICogICAgICAgfVxuICAgICAqICAgfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgZ3JpZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXG5cbiAgICAvKipcbiAgICAgKiBgaGFuZGxlYCBzcGVjaWZpZXMgYSBzZWxlY3RvciB0byBiZSB1c2VkIGFzIHRoZSBoYW5kbGUgdGhhdCBpbml0aWF0ZXMgZHJhZy5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICByZXR1cm4gKFxuICAgICAqICAgICAgICAgICAgPERyYWdnYWJsZSBoYW5kbGU9XCIuaGFuZGxlXCI+XG4gICAgICogICAgICAgICAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhhbmRsZVwiPkNsaWNrIG1lIHRvIGRyYWc8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDxkaXY+VGhpcyBpcyBzb21lIG90aGVyIGNvbnRlbnQ8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICogICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBoYW5kbGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBgY2FuY2VsYCBzcGVjaWZpZXMgYSBzZWxlY3RvciB0byBiZSB1c2VkIHRvIHByZXZlbnQgZHJhZyBpbml0aWFsaXphdGlvbi5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgIHJldHVybihcbiAgICAgKiAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgY2FuY2VsPVwiLmNhbmNlbFwiPlxuICAgICAqICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhbmNlbFwiPllvdSBjYW4ndCBkcmFnIGZyb20gaGVyZTwvZGl2PlxuICAgICAqICAgICAgICAgICAgPGRpdj5EcmFnZ2luZyBoZXJlIHdvcmtzIGZpbmU8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgICApO1xuICAgICAqICAgICAgIH1cbiAgICAgKiAgIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGNhbmNlbDogUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIGRyYWdnaW5nIHN0YXJ0cy5cbiAgICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGJvb2xlYW4gZmFsc2UsIGRyYWdnaW5nIHdpbGwgYmUgY2FuY2VsZWQuXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganNcbiAgICAgKiAgZnVuY3Rpb24gKGV2ZW50LCB1aSkge31cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIGBldmVudGAgaXMgdGhlIEV2ZW50IHRoYXQgd2FzIHRyaWdnZXJlZC5cbiAgICAgKiBgdWlgIGlzIGFuIG9iamVjdDpcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogIHtcbiAgICAgKiAgICBwb3NpdGlvbjoge3RvcDogMCwgbGVmdDogMH1cbiAgICAgKiAgfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIG9uU3RhcnQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoaWxlIGRyYWdnaW5nLlxuICAgICAqIElmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgYm9vbGVhbiBmYWxzZSwgZHJhZ2dpbmcgd2lsbCBiZSBjYW5jZWxlZC5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqICBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7fVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogYGV2ZW50YCBpcyB0aGUgRXZlbnQgdGhhdCB3YXMgdHJpZ2dlcmVkLlxuICAgICAqIGB1aWAgaXMgYW4gb2JqZWN0OlxuICAgICAqXG4gICAgICogYGBganNcbiAgICAgKiAge1xuICAgICAqICAgIHBvc2l0aW9uOiB7dG9wOiAwLCBsZWZ0OiAwfVxuICAgICAqICB9XG4gICAgICogYGBgXG4gICAgICovXG4gICAgb25EcmFnOiBQcm9wVHlwZXMuZnVuYyxcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIGRyYWdnaW5nIHN0b3BzLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogIGZ1bmN0aW9uIChldmVudCwgdWkpIHt9XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBgZXZlbnRgIGlzIHRoZSBFdmVudCB0aGF0IHdhcyB0cmlnZ2VyZWQuXG4gICAgICogYHVpYCBpcyBhbiBvYmplY3Q6XG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqICB7XG4gICAgICogICAgcG9zaXRpb246IHt0b3A6IDAsIGxlZnQ6IDB9XG4gICAgICogIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBvblN0b3A6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogQSB3b3JrYXJvdW5kIG9wdGlvbiB3aGljaCBjYW4gYmUgcGFzc2VkIGlmIG9uTW91c2VEb3duIG5lZWRzIHRvIGJlIGFjY2Vzc2VkLFxuICAgICAqIHNpbmNlIGl0J2xsIGFsd2F5cyBiZSBibG9ja2VkIChkdWUgdG8gdGhhdCB0aGVyZSdzIGludGVybmFsIHVzZSBvZiBvbk1vdXNlRG93bilcbiAgICAgKi9cbiAgICBvbk1vdXNlRG93bjogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBUaGVzZSBwcm9wZXJ0aWVzIHNob3VsZCBiZSBkZWZpbmVkIG9uIHRoZSBjaGlsZCwgbm90IGhlcmUuXG4gICAgICovXG4gICAgY2xhc3NOYW1lOiBkb250U2V0TWUsXG4gICAgc3R5bGU6IGRvbnRTZXRNZSxcbiAgICB0cmFuc2Zvcm06IGRvbnRTZXRNZVxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgYWxsb3dBbnlDbGljazogZmFsc2UsIC8vIGJ5IGRlZmF1bHQgb25seSBhY2NlcHQgbGVmdCBjbGlja1xuICAgIGNhbmNlbDogbnVsbCxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgZW5hYmxlVXNlclNlbGVjdEhhY2s6IHRydWUsXG4gICAgaGFuZGxlOiBudWxsLFxuICAgIGdyaWQ6IG51bGwsXG4gICAgdHJhbnNmb3JtOiBudWxsLFxuICAgIG9uU3RhcnQ6IGZ1bmN0aW9uKCl7fSxcbiAgICBvbkRyYWc6IGZ1bmN0aW9uKCl7fSxcbiAgICBvblN0b3A6IGZ1bmN0aW9uKCl7fSxcbiAgICBvbk1vdXNlRG93bjogZnVuY3Rpb24oKXt9XG4gIH07XG5cbiAgc3RhdGU6IENvcmVTdGF0ZSA9IHtcbiAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgLy8gVXNlZCB3aGlsZSBkcmFnZ2luZyB0byBkZXRlcm1pbmUgZGVsdGFzLlxuICAgIGxhc3RYOiBudWxsLCBsYXN0WTogbnVsbFxuICB9O1xuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIC8vIFJlbW92ZSBhbnkgbGVmdG92ZXIgZXZlbnQgaGFuZGxlcnMuIFJlbW92ZSBib3RoIHRvdWNoIGFuZCBtb3VzZSBoYW5kbGVycyBpbiBjYXNlXG4gICAgLy8gc29tZSBicm93c2VyIHF1aXJrIGNhdXNlZCBhIHRvdWNoIGV2ZW50IHRvIGZpcmUgZHVyaW5nIGEgbW91c2UgbW92ZSwgb3IgdmljZSB2ZXJzYS5cbiAgICByZW1vdmVFdmVudChkb2N1bWVudCwgZXZlbnRzRm9yLm1vdXNlLm1vdmUsIHRoaXMuaGFuZGxlRHJhZyk7XG4gICAgcmVtb3ZlRXZlbnQoZG9jdW1lbnQsIGV2ZW50c0Zvci50b3VjaC5tb3ZlLCB0aGlzLmhhbmRsZURyYWcpO1xuICAgIHJlbW92ZUV2ZW50KGRvY3VtZW50LCBldmVudHNGb3IubW91c2Uuc3RvcCwgdGhpcy5oYW5kbGVEcmFnU3RvcCk7XG4gICAgcmVtb3ZlRXZlbnQoZG9jdW1lbnQsIGV2ZW50c0Zvci50b3VjaC5zdG9wLCB0aGlzLmhhbmRsZURyYWdTdG9wKTtcbiAgICByZW1vdmVFdmVudChkb2N1bWVudCwgJ3Njcm9sbCcsIHRoaXMuaGFuZGxlU2Nyb2xsKTtcbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVVc2VyU2VsZWN0SGFjaykgcmVtb3ZlVXNlclNlbGVjdFN0eWxlcygpO1xuICB9XG5cbiAgaGFuZGxlRHJhZ1N0YXJ0OiBFdmVudEhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIC8vIE1ha2UgaXQgcG9zc2libGUgdG8gYXR0YWNoIGV2ZW50IGhhbmRsZXJzIG9uIHRvcCBvZiB0aGlzIG9uZS5cbiAgICB0aGlzLnByb3BzLm9uTW91c2VEb3duKGUpO1xuXG4gICAgLy8gT25seSBhY2NlcHQgbGVmdC1jbGlja3MuXG4gICAgaWYgKCF0aGlzLnByb3BzLmFsbG93QW55Q2xpY2sgJiYgdHlwZW9mIGUuYnV0dG9uID09PSAnbnVtYmVyJyAmJiBlLmJ1dHRvbiAhPT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gU2hvcnQgY2lyY3VpdCBpZiBoYW5kbGUgb3IgY2FuY2VsIHByb3Agd2FzIHByb3ZpZGVkIGFuZCBzZWxlY3RvciBkb2Vzbid0IG1hdGNoLlxuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8XG4gICAgICAodGhpcy5wcm9wcy5oYW5kbGUgJiYgIW1hdGNoZXNTZWxlY3RvcihlLnRhcmdldCwgdGhpcy5wcm9wcy5oYW5kbGUpKSB8fFxuICAgICAgKHRoaXMucHJvcHMuY2FuY2VsICYmIG1hdGNoZXNTZWxlY3RvcihlLnRhcmdldCwgdGhpcy5wcm9wcy5jYW5jZWwpKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNldCB0b3VjaCBpZGVudGlmaWVyIGluIGNvbXBvbmVudCBzdGF0ZSBpZiB0aGlzIGlzIGEgdG91Y2ggZXZlbnQuIFRoaXMgYWxsb3dzIHVzIHRvXG4gICAgLy8gZGlzdGluZ3Vpc2ggYmV0d2VlbiBpbmRpdmlkdWFsIHRvdWNoZXMgb24gbXVsdGl0b3VjaCBzY3JlZW5zIGJ5IGlkZW50aWZ5aW5nIHdoaWNoXG4gICAgLy8gdG91Y2hwb2ludCB3YXMgc2V0IHRvIHRoaXMgZWxlbWVudC5cbiAgICBpZiAoZS50YXJnZXRUb3VjaGVzKXtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3RvdWNoSWRlbnRpZmllcjogZS50YXJnZXRUb3VjaGVzWzBdLmlkZW50aWZpZXJ9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYSBzdHlsZSB0byB0aGUgYm9keSB0byBkaXNhYmxlIHVzZXItc2VsZWN0LiBUaGlzIHByZXZlbnRzIHRleHQgZnJvbVxuICAgIC8vIGJlaW5nIHNlbGVjdGVkIGFsbCBvdmVyIHRoZSBwYWdlLlxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZVVzZXJTZWxlY3RIYWNrKSBhZGRVc2VyU2VsZWN0U3R5bGVzKCk7XG5cbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgZHJhZyBwb2ludCBmcm9tIHRoZSBldmVudC4gVGhpcyBpcyB1c2VkIGFzIHRoZSBvZmZzZXQuXG4gICAgbGV0IHtjbGllbnRYLCBjbGllbnRZfSA9IGdldENvbnRyb2xQb3NpdGlvbihlKTtcblxuICAgIC8vIENyZWF0ZSBhbiBldmVudCBvYmplY3Qgd2l0aCBhbGwgdGhlIGRhdGEgcGFyZW50cyBuZWVkIHRvIG1ha2UgYSBkZWNpc2lvbiBoZXJlLlxuICAgIGxldCBjb3JlRXZlbnQgPSBjcmVhdGVDb3JlRXZlbnQodGhpcywgY2xpZW50WCwgY2xpZW50WSk7XG5cbiAgICBsb2coJ0RyYWdnYWJsZUNvcmU6IGhhbmRsZURyYWdTdGFydDogJWonLCBjb3JlRXZlbnQucG9zaXRpb24pO1xuXG4gICAgLy8gQ2FsbCBldmVudCBoYW5kbGVyLiBJZiBpdCByZXR1cm5zIGV4cGxpY2l0IGZhbHNlLCBjYW5jZWwuXG4gICAgbG9nKCdjYWxsaW5nJywgdGhpcy5wcm9wcy5vblN0YXJ0KTtcbiAgICBsZXQgc2hvdWxkVXBkYXRlID0gdGhpcy5wcm9wcy5vblN0YXJ0KGUsIGNvcmVFdmVudCk7XG4gICAgaWYgKHNob3VsZFVwZGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcblxuXG4gICAgLy8gSW5pdGlhdGUgZHJhZ2dpbmcuIFNldCB0aGUgY3VycmVudCB4IGFuZCB5IGFzIG9mZnNldHNcbiAgICAvLyBzbyB3ZSBrbm93IGhvdyBtdWNoIHdlJ3ZlIG1vdmVkIGR1cmluZyB0aGUgZHJhZy4gVGhpcyBhbGxvd3MgdXNcbiAgICAvLyB0byBkcmFnIGVsZW1lbnRzIGFyb3VuZCBldmVuIGlmIHRoZXkgaGF2ZSBiZWVuIG1vdmVkLCB3aXRob3V0IGlzc3VlLlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJhZ2dpbmc6IHRydWUsXG5cbiAgICAgIGxhc3RYOiBjbGllbnRYLFxuICAgICAgbGFzdFk6IGNsaWVudFksXG4gICAgICAvLyBTdG9yZWQgc28gd2UgY2FuIGFkanVzdCBvdXIgb2Zmc2V0IGlmIHNjcm9sbGVkLlxuICAgICAgc2Nyb2xsWDogZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0LFxuICAgICAgc2Nyb2xsWTogZG9jdW1lbnQuYm9keS5zY3JvbGxUb3BcbiAgICB9KTtcblxuICAgIC8vIFRyYW5zbGF0ZSBlbCBvbiBwYWdlIHNjcm9sbC5cbiAgICBhZGRFdmVudChkb2N1bWVudCwgJ3Njcm9sbCcsIHRoaXMuaGFuZGxlU2Nyb2xsKTtcbiAgICAvLyBBZGQgZXZlbnRzIHRvIHRoZSBkb2N1bWVudCBkaXJlY3RseSBzbyB3ZSBjYXRjaCB3aGVuIHRoZSB1c2VyJ3MgbW91c2UvdG91Y2ggbW92ZXMgb3V0c2lkZSBvZlxuICAgIC8vIHRoaXMgZWxlbWVudC4gV2UgdXNlIGRpZmZlcmVudCBldmVudHMgZGVwZW5kaW5nIG9uIHdoZXRoZXIgb3Igbm90IHdlIGhhdmUgZGV0ZWN0ZWQgdGhhdCB0aGlzXG4gICAgLy8gaXMgYSB0b3VjaC1jYXBhYmxlIGRldmljZS5cbiAgICBhZGRFdmVudChkb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLm1vdmUsIHRoaXMuaGFuZGxlRHJhZyk7XG4gICAgYWRkRXZlbnQoZG9jdW1lbnQsIGRyYWdFdmVudEZvci5zdG9wLCB0aGlzLmhhbmRsZURyYWdTdG9wKTtcbiAgfTtcblxuICBoYW5kbGVEcmFnOiBFdmVudEhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIC8vIFJldHVybiBpZiB0aGlzIGlzIGEgdG91Y2ggZXZlbnQsIGJ1dCBub3QgdGhlIGNvcnJlY3Qgb25lIGZvciB0aGlzIGVsZW1lbnRcbiAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIChlLnRhcmdldFRvdWNoZXNbMF0uaWRlbnRpZmllciAhPT0gdGhpcy5zdGF0ZS50b3VjaElkZW50aWZpZXIpKSByZXR1cm47XG5cbiAgICBsZXQge2NsaWVudFgsIGNsaWVudFl9ID0gZ2V0Q29udHJvbFBvc2l0aW9uKGUpO1xuXG4gICAgLy8gU25hcCB0byBncmlkIGlmIHByb3AgaGFzIGJlZW4gcHJvdmlkZWRcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmdyaWQpKSB7XG4gICAgICBsZXQgZGVsdGFYID0gY2xpZW50WCAtIHRoaXMuc3RhdGUubGFzdFgsIGRlbHRhWSA9IGNsaWVudFkgLSB0aGlzLnN0YXRlLmxhc3RZO1xuICAgICAgW2RlbHRhWCwgZGVsdGFZXSA9IHNuYXBUb0dyaWQodGhpcy5wcm9wcy5ncmlkLCBkZWx0YVgsIGRlbHRhWSk7XG4gICAgICBpZiAoIWRlbHRhWCAmJiAhZGVsdGFZKSByZXR1cm47IC8vIHNraXAgdXNlbGVzcyBkcmFnXG4gICAgICBjbGllbnRYID0gdGhpcy5zdGF0ZS5sYXN0WCArIGRlbHRhWCwgY2xpZW50WSA9IHRoaXMuc3RhdGUubGFzdFkgKyBkZWx0YVk7XG4gICAgfVxuXG4gICAgY29uc3QgY29yZUV2ZW50ID0gY3JlYXRlQ29yZUV2ZW50KHRoaXMsIGNsaWVudFgsIGNsaWVudFkpO1xuXG4gICAgbG9nKCdEcmFnZ2FibGVDb3JlOiBoYW5kbGVEcmFnOiAlaicsIGNvcmVFdmVudC5wb3NpdGlvbik7XG5cblxuICAgIC8vIENhbGwgZXZlbnQgaGFuZGxlci4gSWYgaXQgcmV0dXJucyBleHBsaWNpdCBmYWxzZSwgdHJpZ2dlciBlbmQuXG4gICAgY29uc3Qgc2hvdWxkVXBkYXRlID0gdGhpcy5wcm9wcy5vbkRyYWcoZSwgY29yZUV2ZW50KTtcbiAgICBpZiAoc2hvdWxkVXBkYXRlID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5oYW5kbGVEcmFnU3RvcCh7fSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBsYXN0WDogY2xpZW50WCxcbiAgICAgIGxhc3RZOiBjbGllbnRZXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlRHJhZ1N0b3A6IEV2ZW50SGFuZGxlciA9IChlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmRyYWdnaW5nKSByZXR1cm47XG5cbiAgICAvLyBTaG9ydCBjaXJjdWl0IGlmIHRoaXMgaXMgbm90IHRoZSBjb3JyZWN0IHRvdWNoIGV2ZW50LiBgY2hhbmdlZFRvdWNoZXNgIGNvbnRhaW5zIGFsbFxuICAgIC8vIHRvdWNoIHBvaW50cyB0aGF0IGhhdmUgYmVlbiByZW1vdmVkIGZyb20gdGhlIHN1cmZhY2UuXG4gICAgaWYgKGUuY2hhbmdlZFRvdWNoZXMgJiYgKGUuY2hhbmdlZFRvdWNoZXNbMF0uaWRlbnRpZmllciAhPT0gdGhpcy5zdGF0ZS50b3VjaElkZW50aWZpZXIpKSByZXR1cm47XG5cbiAgICAvLyBSZW1vdmUgdXNlci1zZWxlY3QgaGFja1xuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZVVzZXJTZWxlY3RIYWNrKSByZW1vdmVVc2VyU2VsZWN0U3R5bGVzKCk7XG5cbiAgICBsZXQge2NsaWVudFgsIGNsaWVudFl9ID0gZ2V0Q29udHJvbFBvc2l0aW9uKGUpO1xuICAgIGNvbnN0IGNvcmVFdmVudCA9IGNyZWF0ZUNvcmVFdmVudCh0aGlzLCBjbGllbnRYLCBjbGllbnRZKTtcblxuICAgIGxvZygnRHJhZ2dhYmxlQ29yZTogaGFuZGxlRHJhZ1N0b3A6ICVqJywgY29yZUV2ZW50LnBvc2l0aW9uKTtcblxuICAgIC8vIFJlc2V0IHRoZSBlbC5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgIGxhc3RYOiBudWxsLFxuICAgICAgbGFzdFk6IG51bGxcbiAgICB9KTtcblxuICAgIC8vIENhbGwgZXZlbnQgaGFuZGxlclxuICAgIHRoaXMucHJvcHMub25TdG9wKGUsIGNvcmVFdmVudCk7XG5cbiAgICAvLyBSZW1vdmUgZXZlbnQgaGFuZGxlcnNcbiAgICBsb2coJ0RyYWdnYWJsZUNvcmU6IFJlbW92aW5nIGhhbmRsZXJzJyk7XG4gICAgcmVtb3ZlRXZlbnQoZG9jdW1lbnQsICdzY3JvbGwnLCB0aGlzLmhhbmRsZVNjcm9sbCk7XG4gICAgcmVtb3ZlRXZlbnQoZG9jdW1lbnQsIGRyYWdFdmVudEZvci5tb3ZlLCB0aGlzLmhhbmRsZURyYWcpO1xuICAgIHJlbW92ZUV2ZW50KGRvY3VtZW50LCBkcmFnRXZlbnRGb3Iuc3RvcCwgdGhpcy5oYW5kbGVEcmFnU3RvcCk7XG4gIH07XG5cbiAgLy8gV2hlbiB0aGUgdXNlciBzY3JvbGxzLCBhZGp1c3QgaW50ZXJuYWwgc3RhdGUgc28gdGhlIGRyYWdnYWJsZSBtb3ZlcyBhbG9uZyB0aGUgcGFnZSBwcm9wZXJseS5cbiAgLy8gVGhpcyBvbmx5IGZpcmVzIHdoZW4gYSBkcmFnIGlzIGFjdGl2ZS5cbiAgaGFuZGxlU2Nyb2xsOiBFdmVudEhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHMgPSB0aGlzLnN0YXRlLCB4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0LCB5ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG5cbiAgICAvLyBDcmVhdGUgdGhlIHVzdWFsIGV2ZW50LCBidXQgbWFrZSB0aGUgc2Nyb2xsIG9mZnNldCBvdXIgZGVsdGFzLlxuICAgIGxldCBjb3JlRXZlbnQgPSBjcmVhdGVDb3JlRXZlbnQodGhpcyk7XG4gICAgY29yZUV2ZW50LnBvc2l0aW9uLmRlbHRhWCA9IHggLSBzLnNjcm9sbFg7XG4gICAgY29yZUV2ZW50LnBvc2l0aW9uLmRlbHRhWSA9IHkgLSBzLnNjcm9sbFk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxhc3RYOiBzLmxhc3RYICsgY29yZUV2ZW50LnBvc2l0aW9uLmRlbHRhWCxcbiAgICAgIGxhc3RZOiBzLmxhc3RZICsgY29yZUV2ZW50LnBvc2l0aW9uLmRlbHRhWVxuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9wcy5vbkRyYWcoZSwgY29yZUV2ZW50KTtcbiAgfTtcblxuICAvLyBTYW1lIGFzIG9uTW91c2VEb3duIChzdGFydCBkcmFnKSwgYnV0IG5vdyBjb25zaWRlciB0aGlzIGEgdG91Y2ggZGV2aWNlLlxuICBvblRvdWNoU3RhcnQ6IEV2ZW50SGFuZGxlciA9IChlKSA9PiB7XG4gICAgLy8gV2UncmUgb24gYSB0b3VjaCBkZXZpY2Ugbm93LCBzbyBjaGFuZ2UgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLnRvdWNoO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlRHJhZ1N0YXJ0KGUpO1xuICB9O1xuXG4gIG9uVG91Y2hFbmQ6IEV2ZW50SGFuZGxlciA9IChlKSA9PiB7XG4gICAgLy8gV2UncmUgb24gYSB0b3VjaCBkZXZpY2Ugbm93LCBzbyBjaGFuZ2UgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLnRvdWNoO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlRHJhZ1N0b3AoZSk7XG4gIH07XG5cbiAgcmVuZGVyKCk6IFJlYWN0RWxlbWVudCB7XG4gICAgLy8gUmV1c2UgdGhlIGNoaWxkIHByb3ZpZGVkXG4gICAgLy8gVGhpcyBtYWtlcyBpdCBmbGV4aWJsZSB0byB1c2Ugd2hhdGV2ZXIgZWxlbWVudCBpcyB3YW50ZWQgKGRpdiwgdWwsIGV0YylcbiAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KFJlYWN0LkNoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbiksIHtcbiAgICAgIHN0eWxlOiBzdHlsZUhhY2tzKHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuc3R5bGUpLFxuXG4gICAgICAvLyBOb3RlOiBtb3VzZU1vdmUgaGFuZGxlciBpcyBhdHRhY2hlZCB0byBkb2N1bWVudCBzbyBpdCB3aWxsIHN0aWxsIGZ1bmN0aW9uXG4gICAgICAvLyB3aGVuIHRoZSB1c2VyIGRyYWdzIHF1aWNrbHkgYW5kIGxlYXZlcyB0aGUgYm91bmRzIG9mIHRoZSBlbGVtZW50LlxuICAgICAgb25Nb3VzZURvd246IHRoaXMuaGFuZGxlRHJhZ1N0YXJ0LFxuICAgICAgb25Ub3VjaFN0YXJ0OiB0aGlzLm9uVG91Y2hTdGFydCxcbiAgICAgIG9uTW91c2VVcDogdGhpcy5oYW5kbGVEcmFnU3RvcCxcbiAgICAgIG9uVG91Y2hFbmQ6IHRoaXMub25Ub3VjaEVuZFxuICAgIH0pO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9EcmFnZ2FibGVDb3JlLmVzNlxuICoqLyIsIi8vIEBmbG93XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2coLi4uYXJnczogYW55KSB7XG4gIGlmIChwcm9jZXNzLmVudi5EUkFHR0FCTEVfREVCVUcpIGNvbnNvbGUubG9nKC4uLmFyZ3MpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdXRpbHMvbG9nLmVzNlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=