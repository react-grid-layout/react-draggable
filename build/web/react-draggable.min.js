(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactDraggable"] = factory(require("react"), require("react-dom"));
	else
		root["ReactDraggable"] = factory(root["React"], root["ReactDOM"]);
})(globalThis, (__WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__33__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 12
(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__12__;

/***/ },

/***/ 33
(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__33__;

/***/ },

/***/ 285
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  DraggableCore: () => (/* reexport */ DraggableCore),
  "default": () => (/* binding */ Draggable)
});

// EXTERNAL MODULE: external {"commonjs":"react","commonjs2":"react","amd":"react","root":"React"}
var external_commonjs_react_commonjs2_react_amd_react_root_React_ = __webpack_require__(12);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(556);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: external {"commonjs":"react-dom","commonjs2":"react-dom","amd":"react-dom","root":"ReactDOM"}
var external_commonjs_react_dom_commonjs2_react_dom_amd_react_dom_root_ReactDOM_ = __webpack_require__(33);
var external_commonjs_react_dom_commonjs2_react_dom_amd_react_dom_root_ReactDOM_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_react_dom_commonjs2_react_dom_amd_react_dom_root_ReactDOM_);
;// ./node_modules/clsx/dist/clsx.mjs
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const dist_clsx = ((/* unused pure expression or super */ null && (clsx)));
;// ./lib/utils/shims.ts

function findInArray(array, callback) {
  for (let i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}
function isFunction(func) {
  return typeof func === "function" || Object.prototype.toString.call(func) === "[object Function]";
}
function isNum(num) {
  return typeof num === "number" && !isNaN(num);
}
function shims_int(a) {
  return parseInt(a, 10);
}
function dontSetMe(props, propName, componentName) {
  if (props[propName]) {
    return new Error(`Invalid prop ${propName} passed to ${componentName} - do not set this, set it on the child.`);
  }
}

;// ./lib/utils/getPrefix.ts

const prefixes = ["Moz", "Webkit", "O", "ms"];
function getPrefix(prop = "transform") {
  var _a, _b;
  if (typeof window === "undefined") return "";
  const style = (_b = (_a = window.document) == null ? void 0 : _a.documentElement) == null ? void 0 : _b.style;
  if (!style) return "";
  if (prop in style) return "";
  for (let i = 0; i < prefixes.length; i++) {
    if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
  }
  return "";
}
function browserPrefixToKey(prop, prefix) {
  return prefix ? `${prefix}${kebabToTitleCase(prop)}` : prop;
}
function browserPrefixToStyle(prop, prefix) {
  return prefix ? `-${prefix.toLowerCase()}-${prop}` : prop;
}
function kebabToTitleCase(str) {
  let out = "";
  let shouldCapitalize = true;
  for (let i = 0; i < str.length; i++) {
    if (shouldCapitalize) {
      out += str[i].toUpperCase();
      shouldCapitalize = false;
    } else if (str[i] === "-") {
      shouldCapitalize = true;
    } else {
      out += str[i];
    }
  }
  return out;
}
/* harmony default export */ const utils_getPrefix = (getPrefix());

;// ./lib/utils/domFns.ts



let matchesSelectorFunc = "";
function matchesSelector(el, selector) {
  var _a;
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = (_a = findInArray([
      "matches",
      "webkitMatchesSelector",
      "mozMatchesSelector",
      "msMatchesSelector",
      "oMatchesSelector"
    ], function(method) {
      return isFunction(el[method]);
    })) != null ? _a : "";
  }
  const matchFn = el[matchesSelectorFunc];
  if (!isFunction(matchFn)) return false;
  return Boolean(matchFn.call(el, selector));
}
function matchesSelectorAndParentsTo(el, selector, baseNode) {
  let node = el;
  do {
    if (matchesSelector(node, selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);
  return false;
}
function addEvent(el, event, handler, inputOptions) {
  if (!el) return;
  const options = { capture: true, ...inputOptions };
  const listener = handler;
  if (el.addEventListener) {
    el.addEventListener(event, listener, options);
  } else if (el.attachEvent) {
    el.attachEvent("on" + event, listener);
  } else {
    el["on" + event] = listener;
  }
}
function removeEvent(el, event, handler, inputOptions) {
  if (!el) return;
  const options = { capture: true, ...inputOptions };
  const listener = handler;
  if (el.removeEventListener) {
    el.removeEventListener(event, listener, options);
  } else if (el.detachEvent) {
    el.detachEvent("on" + event, listener);
  } else {
    el["on" + event] = null;
  }
}
function domFns_outerHeight(node) {
  let height = node.clientHeight;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height += shims_int(computedStyle.borderTopWidth);
  height += shims_int(computedStyle.borderBottomWidth);
  return height;
}
function domFns_outerWidth(node) {
  let width = node.clientWidth;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width += shims_int(computedStyle.borderLeftWidth);
  width += shims_int(computedStyle.borderRightWidth);
  return width;
}
function domFns_innerHeight(node) {
  let height = node.clientHeight;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height -= shims_int(computedStyle.paddingTop);
  height -= shims_int(computedStyle.paddingBottom);
  return height;
}
function domFns_innerWidth(node) {
  let width = node.clientWidth;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width -= shims_int(computedStyle.paddingLeft);
  width -= shims_int(computedStyle.paddingRight);
  return width;
}
function offsetXYFromParent(evt, offsetParent, scale) {
  const isBody = offsetParent === offsetParent.ownerDocument.body;
  const offsetParentRect = isBody ? { left: 0, top: 0 } : offsetParent.getBoundingClientRect();
  const x = (evt.clientX + offsetParent.scrollLeft - offsetParentRect.left) / scale;
  const y = (evt.clientY + offsetParent.scrollTop - offsetParentRect.top) / scale;
  return { x, y };
}
function createCSSTransform(controlPos, positionOffset) {
  const translation = getTranslation(controlPos, positionOffset, "px");
  return { [browserPrefixToKey("transform", utils_getPrefix)]: translation };
}
function createSVGTransform(controlPos, positionOffset) {
  const translation = getTranslation(controlPos, positionOffset, "");
  return translation;
}
function getTranslation({ x, y }, positionOffset, unitSuffix) {
  let translation = `translate(${x}${unitSuffix},${y}${unitSuffix})`;
  if (positionOffset) {
    const defaultX = `${typeof positionOffset.x === "string" ? positionOffset.x : positionOffset.x + unitSuffix}`;
    const defaultY = `${typeof positionOffset.y === "string" ? positionOffset.y : positionOffset.y + unitSuffix}`;
    translation = `translate(${defaultX}, ${defaultY})` + translation;
  }
  return translation;
}
function getTouch(e, identifier) {
  return e.targetTouches && findInArray(e.targetTouches, (t) => identifier === t.identifier) || e.changedTouches && findInArray(e.changedTouches, (t) => identifier === t.identifier);
}
function getTouchIdentifier(e) {
  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
}
function getDefaultNonce() {
  return  true ? __webpack_require__.nc : 0;
}
function addUserSelectStyles(doc, nonce) {
  if (!doc) return;
  let styleEl = doc.getElementById("react-draggable-style-el");
  if (!styleEl) {
    styleEl = doc.createElement("style");
    styleEl.type = "text/css";
    styleEl.id = "react-draggable-style-el";
    const resolvedNonce = nonce != null ? nonce : getDefaultNonce();
    if (resolvedNonce) styleEl.setAttribute("nonce", resolvedNonce);
    styleEl.innerHTML = ".react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n";
    styleEl.innerHTML += ".react-draggable-transparent-selection *::selection {all: inherit;}\n";
    doc.getElementsByTagName("head")[0].appendChild(styleEl);
  }
  if (doc.body) addClassName(doc.body, "react-draggable-transparent-selection");
}
function scheduleRemoveUserSelectStyles(doc) {
  if (window.requestAnimationFrame) {
    window.requestAnimationFrame(() => {
      removeUserSelectStyles(doc);
    });
  } else {
    removeUserSelectStyles(doc);
  }
}
function removeUserSelectStyles(doc) {
  if (!doc) return;
  try {
    if (doc.body) removeClassName(doc.body, "react-draggable-transparent-selection");
    const ieSelection = doc.selection;
    if (ieSelection) {
      ieSelection.empty();
    } else {
      const selection = (doc.defaultView || window).getSelection();
      if (selection && selection.type !== "Caret") {
        selection.removeAllRanges();
      }
    }
  } catch {
  }
}
function addClassName(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (!el.className.match(new RegExp(`(?:^|\\s)${className}(?!\\S)`))) {
      el.className += ` ${className}`;
    }
  }
}
function removeClassName(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp(`(?:^|\\s)${className}(?!\\S)`, "g"), "");
  }
}

;// ./lib/utils/positionFns.ts



function getBoundPosition(draggable, x, y) {
  if (!draggable.props.bounds) return [x, y];
  let { bounds } = draggable.props;
  bounds = typeof bounds === "string" ? bounds : cloneBounds(bounds);
  const node = findDOMNode(draggable);
  if (typeof bounds === "string") {
    const { ownerDocument } = node;
    const ownerWindow = ownerDocument.defaultView;
    if (!ownerWindow) {
      throw new Error("Cannot resolve the owner window of the draggable node.");
    }
    let boundNode;
    if (bounds === "parent") {
      boundNode = node.parentNode;
    } else {
      const rootNode = node.getRootNode();
      boundNode = rootNode.querySelector(bounds);
    }
    if (!(boundNode instanceof ownerWindow.HTMLElement)) {
      throw new Error('Bounds selector "' + bounds + '" could not find an element.');
    }
    const boundNodeEl = boundNode;
    const nodeStyle = ownerWindow.getComputedStyle(node);
    const boundNodeStyle = ownerWindow.getComputedStyle(boundNodeEl);
    bounds = {
      left: -node.offsetLeft + shims_int(boundNodeStyle.paddingLeft) + shims_int(nodeStyle.marginLeft),
      top: -node.offsetTop + shims_int(boundNodeStyle.paddingTop) + shims_int(nodeStyle.marginTop),
      right: domFns_innerWidth(boundNodeEl) - domFns_outerWidth(node) - node.offsetLeft + shims_int(boundNodeStyle.paddingRight) - shims_int(nodeStyle.marginRight),
      bottom: domFns_innerHeight(boundNodeEl) - domFns_outerHeight(node) - node.offsetTop + shims_int(boundNodeStyle.paddingBottom) - shims_int(nodeStyle.marginBottom)
    };
  }
  if (isNum(bounds.right)) x = Math.min(x, bounds.right);
  if (isNum(bounds.bottom)) y = Math.min(y, bounds.bottom);
  if (isNum(bounds.left)) x = Math.max(x, bounds.left);
  if (isNum(bounds.top)) y = Math.max(y, bounds.top);
  return [x, y];
}
function snapToGrid(grid, pendingX, pendingY) {
  const x = Math.round(pendingX / grid[0]) * grid[0];
  const y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}
function canDragX(draggable) {
  return draggable.props.axis === "both" || draggable.props.axis === "x";
}
function canDragY(draggable) {
  return draggable.props.axis === "both" || draggable.props.axis === "y";
}
function getControlPosition(e, touchIdentifier, draggableCore) {
  const touchObj = typeof touchIdentifier === "number" ? getTouch(e, touchIdentifier) : null;
  if (typeof touchIdentifier === "number" && !touchObj) return null;
  const node = findDOMNode(draggableCore);
  const offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
  return offsetXYFromParent(touchObj || e, offsetParent, draggableCore.props.scale);
}
function createCoreData(draggable, x, y) {
  const isStart = !isNum(draggable.lastX);
  const node = findDOMNode(draggable);
  if (isStart) {
    return {
      node,
      deltaX: 0,
      deltaY: 0,
      lastX: x,
      lastY: y,
      x,
      y
    };
  } else {
    return {
      node,
      deltaX: x - draggable.lastX,
      deltaY: y - draggable.lastY,
      lastX: draggable.lastX,
      lastY: draggable.lastY,
      x,
      y
    };
  }
}
function createDraggableData(draggable, coreData) {
  const scale = draggable.props.scale;
  return {
    node: coreData.node,
    x: draggable.state.x + coreData.deltaX / scale,
    y: draggable.state.y + coreData.deltaY / scale,
    deltaX: coreData.deltaX / scale,
    deltaY: coreData.deltaY / scale,
    lastX: draggable.state.x,
    lastY: draggable.state.y
  };
}
function cloneBounds(bounds) {
  return {
    left: bounds.left,
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.bottom
  };
}
function findDOMNode(draggable) {
  const node = draggable.findDOMNode();
  if (!node) {
    throw new Error("<DraggableCore>: Unmounted during event!");
  }
  return node;
}

;// ./lib/utils/log.ts

function log(...args) {
  if (false) // removed by dead control flow
{}
}

;// ./lib/DraggableCore.tsx








const eventsFor = {
  touch: {
    start: "touchstart",
    move: "touchmove",
    stop: "touchend"
  },
  mouse: {
    start: "mousedown",
    move: "mousemove",
    stop: "mouseup"
  }
};
let dragEventFor = eventsFor.mouse;
class DraggableCore extends external_commonjs_react_commonjs2_react_amd_react_root_React_.Component {
  constructor() {
    super(...arguments);
    this.dragging = false;
    // Used while dragging to determine deltas.
    this.lastX = NaN;
    this.lastY = NaN;
    this.touchIdentifier = null;
    this.mounted = false;
    this.handleDragStart = (e) => {
      this.props.onMouseDown(e);
      if (!this.props.allowAnyClick && (typeof e.button === "number" && e.button !== 0 || e.ctrlKey)) return false;
      const thisNode = this.findDOMNode();
      if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
        throw new Error("<DraggableCore> not mounted on DragStart!");
      }
      const { ownerDocument } = thisNode;
      if (this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || this.props.handle && !matchesSelectorAndParentsTo(e.target, this.props.handle, thisNode) || this.props.cancel && matchesSelectorAndParentsTo(e.target, this.props.cancel, thisNode)) {
        return;
      }
      if (e.type === "touchstart" && !this.props.allowMobileScroll) e.preventDefault();
      const touchIdentifier = getTouchIdentifier(e);
      this.touchIdentifier = touchIdentifier;
      const position = getControlPosition(e, touchIdentifier, this);
      if (position == null) return;
      const { x, y } = position;
      const coreEvent = createCoreData(this, x, y);
      log("DraggableCore: handleDragStart: %j", coreEvent);
      log("calling", this.props.onStart);
      const shouldUpdate = this.props.onStart(e, coreEvent);
      if (shouldUpdate === false || this.mounted === false) return;
      if (this.props.enableUserSelectHack) addUserSelectStyles(ownerDocument, this.props.nonce);
      this.dragging = true;
      this.lastX = x;
      this.lastY = y;
      addEvent(ownerDocument, dragEventFor.move, this.handleDrag);
      addEvent(ownerDocument, dragEventFor.stop, this.handleDragStop);
    };
    this.handleDrag = (e) => {
      const position = getControlPosition(e, this.touchIdentifier, this);
      if (position == null) return;
      let { x, y } = position;
      if (Array.isArray(this.props.grid)) {
        let deltaX = x - this.lastX, deltaY = y - this.lastY;
        [deltaX, deltaY] = snapToGrid(this.props.grid, deltaX, deltaY);
        if (!deltaX && !deltaY) return;
        x = this.lastX + deltaX;
        y = this.lastY + deltaY;
      }
      const coreEvent = createCoreData(this, x, y);
      log("DraggableCore: handleDrag: %j", coreEvent);
      const shouldUpdate = this.props.onDrag(e, coreEvent);
      if (shouldUpdate === false || this.mounted === false) {
        try {
          this.handleDragStop(new MouseEvent("mouseup"));
        } catch {
          const event = document.createEvent("MouseEvents");
          event.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          this.handleDragStop(event);
        }
        return;
      }
      this.lastX = x;
      this.lastY = y;
    };
    this.handleDragStop = (e) => {
      if (!this.dragging) return;
      const position = getControlPosition(e, this.touchIdentifier, this);
      if (position == null) return;
      let { x, y } = position;
      if (Array.isArray(this.props.grid)) {
        let deltaX = x - this.lastX || 0;
        let deltaY = y - this.lastY || 0;
        [deltaX, deltaY] = snapToGrid(this.props.grid, deltaX, deltaY);
        x = this.lastX + deltaX;
        y = this.lastY + deltaY;
      }
      const coreEvent = createCoreData(this, x, y);
      const shouldContinue = this.props.onStop(e, coreEvent);
      if (shouldContinue === false || this.mounted === false) return false;
      const thisNode = this.findDOMNode();
      if (thisNode) {
        if (this.props.enableUserSelectHack) scheduleRemoveUserSelectStyles(thisNode.ownerDocument);
      }
      log("DraggableCore: handleDragStop: %j", coreEvent);
      this.dragging = false;
      this.lastX = NaN;
      this.lastY = NaN;
      if (thisNode) {
        log("DraggableCore: Removing handlers");
        removeEvent(thisNode.ownerDocument, dragEventFor.move, this.handleDrag);
        removeEvent(thisNode.ownerDocument, dragEventFor.stop, this.handleDragStop);
      }
    };
    this.onMouseDown = (e) => {
      dragEventFor = eventsFor.mouse;
      return this.handleDragStart(e);
    };
    this.onMouseUp = (e) => {
      dragEventFor = eventsFor.mouse;
      return this.handleDragStop(e);
    };
    // Same as onMouseDown (start drag), but now consider this a touch device.
    this.onTouchStart = (e) => {
      dragEventFor = eventsFor.touch;
      return this.handleDragStart(e);
    };
    this.onTouchEnd = (e) => {
      dragEventFor = eventsFor.touch;
      return this.handleDragStop(e);
    };
  }
  componentDidMount() {
    this.mounted = true;
    const thisNode = this.findDOMNode();
    if (thisNode) {
      addEvent(thisNode, eventsFor.touch.start, this.onTouchStart, { passive: false });
    }
  }
  componentWillUnmount() {
    this.mounted = false;
    const thisNode = this.findDOMNode();
    if (thisNode) {
      const { ownerDocument } = thisNode;
      removeEvent(ownerDocument, eventsFor.mouse.move, this.handleDrag);
      removeEvent(ownerDocument, eventsFor.touch.move, this.handleDrag);
      removeEvent(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
      removeEvent(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
      removeEvent(thisNode, eventsFor.touch.start, this.onTouchStart, { passive: false });
      if (this.props.enableUserSelectHack) scheduleRemoveUserSelectStyles(ownerDocument);
    }
  }
  // React 19 removed ReactDOM.findDOMNode, so nodeRef is now required.
  // For backward compatibility with React 18 and earlier, we still support findDOMNode if available.
  findDOMNode() {
    var _a;
    if ((_a = this.props) == null ? void 0 : _a.nodeRef) {
      return this.props.nodeRef.current;
    }
    const legacyReactDOM = (external_commonjs_react_dom_commonjs2_react_dom_amd_react_dom_root_ReactDOM_default());
    if (typeof legacyReactDOM.findDOMNode === "function") {
      return legacyReactDOM.findDOMNode(this);
    }
    log(
      "react-draggable: ReactDOM.findDOMNode is not available in React 19+. You must provide a nodeRef prop. See: https://github.com/react-grid-layout/react-draggable#noderef"
    );
    return null;
  }
  render() {
    return external_commonjs_react_commonjs2_react_amd_react_root_React_.cloneElement(external_commonjs_react_commonjs2_react_amd_react_root_React_.Children.only(this.props.children), {
      // Note: mouseMove handler is attached to document so it will still function
      // when the user drags quickly and leaves the bounds of the element.
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      // onTouchStart is added on `componentDidMount` so they can be added with
      // {passive: false}, which allows it to cancel. See
      // https://developers.google.com/web/updates/2017/01/scrolling-intervention
      onTouchEnd: this.onTouchEnd
    });
  }
}
DraggableCore.displayName = "DraggableCore";
// The index-signature annotation is load-bearing: without it tsc infers the
// PropTypes.Requireable<...> types and emits `import PropTypes from 'prop-types'`
// into the generated public .d.ts, forcing consumers to install
// @types/prop-types (the v4.5.0 hand-written typings had no prop-types dep).
// Do not remove. See lib/Draggable.tsx for the same guard.
DraggableCore.propTypes = {
  /**
   * `allowAnyClick` allows dragging using any mouse button.
   * By default, we only accept the left button.
   *
   * Defaults to `false`.
   */
  allowAnyClick: (prop_types_default()).bool,
  /**
   * `allowMobileScroll` turns off cancellation of the 'touchstart' event
   * on mobile devices. Only enable this if you are having trouble with click
   * events. Prefer using 'handle' / 'cancel' instead.
   *
   * Defaults to `false`.
   */
  allowMobileScroll: (prop_types_default()).bool,
  children: (prop_types_default()).node.isRequired,
  /**
   * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
   * with the exception of `onMouseDown`, will not fire.
   */
  disabled: (prop_types_default()).bool,
  /**
   * By default, we add 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag. If this is causing problems
   * for your app, set this to `false`.
   */
  enableUserSelectHack: (prop_types_default()).bool,
  /**
   * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
   * instead of using the parent node.
   */
  offsetParent: function(props, propName) {
    if (props[propName] && props[propName].nodeType !== 1) {
      throw new Error("Draggable's offsetParent must be a DOM Node.");
    }
  },
  /**
   * `grid` specifies the x and y that dragging should snap to.
   */
  grid: prop_types_default().arrayOf((prop_types_default()).number),
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
  handle: (prop_types_default()).string,
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
  cancel: (prop_types_default()).string,
  /* If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
   * Unfortunately, in order for <Draggable> to work properly, we need raw access
   * to the underlying DOM node. If you want to avoid the warning, pass a `nodeRef`
   * as in this example:
   *
   * function MyComponent() {
   *   const nodeRef = React.useRef(null);
   *   return (
   *     <Draggable nodeRef={nodeRef}>
   *       <div ref={nodeRef}>Example Target</div>
   *     </Draggable>
   *   );
   * }
   *
   * This can be used for arbitrarily nested components, so long as the ref ends up
   * pointing to the actual child DOM node and not a custom component.
   */
  nodeRef: (prop_types_default()).object,
  /**
   * `nonce` is applied to the dynamically-injected <style> element used by the
   * user-select hack, so it isn't blocked under a strict Content Security
   * Policy (`style-src` without `'unsafe-inline'`). If omitted, webpack's
   * `__webpack_nonce__` global is used when available.
   */
  nonce: (prop_types_default()).string,
  /**
   * Called when dragging starts.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onStart: (prop_types_default()).func,
  /**
   * Called while dragging.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onDrag: (prop_types_default()).func,
  /**
   * Called when dragging stops.
   * If this function returns the boolean false, the drag will remain active.
   */
  onStop: (prop_types_default()).func,
  /**
   * A workaround option which can be passed if onMouseDown needs to be accessed,
   * since it'll always be blocked (as there is internal use of onMouseDown)
   */
  onMouseDown: (prop_types_default()).func,
  /**
   * `scale`, if set, applies scaling while dragging an element
   */
  scale: (prop_types_default()).number,
  /**
   * These properties should be defined on the child, not here.
   */
  className: dontSetMe,
  style: dontSetMe,
  transform: dontSetMe
};
// Typed as the full `DraggableCoreProps` (not just the default-provided subset)
// so React's JSX LibraryManagedAttributes treats EVERY prop as optional for
// consumers, matching the historical hand-written typings. At runtime only the
// default-able props are actually populated.
DraggableCore.defaultProps = {
  allowAnyClick: false,
  // by default only accept left click
  allowMobileScroll: false,
  disabled: false,
  enableUserSelectHack: true,
  onStart: function() {
  },
  onDrag: function() {
  },
  onStop: function() {
  },
  onMouseDown: function() {
  },
  scale: 1
};

;// ./lib/Draggable.tsx










class Draggable extends external_commonjs_react_commonjs2_react_amd_react_root_React_.Component {
  constructor(props) {
    super(props);
    this.onDragStart = (e, coreData) => {
      log("Draggable: onDragStart: %j", coreData);
      const shouldStart = this.props.onStart(e, createDraggableData(this, coreData));
      if (shouldStart === false) return false;
      this.setState({ dragging: true, dragged: true });
    };
    this.onDrag = (e, coreData) => {
      if (!this.state.dragging) return false;
      log("Draggable: onDrag: %j", coreData);
      const uiData = createDraggableData(this, coreData);
      const newState = {
        x: uiData.x,
        y: uiData.y,
        slackX: 0,
        slackY: 0
      };
      if (this.props.bounds) {
        const { x, y } = newState;
        newState.x += this.state.slackX;
        newState.y += this.state.slackY;
        const [newStateX, newStateY] = getBoundPosition(this, newState.x, newState.y);
        newState.x = newStateX;
        newState.y = newStateY;
        newState.slackX = this.state.slackX + (x - newState.x);
        newState.slackY = this.state.slackY + (y - newState.y);
        uiData.x = newState.x;
        uiData.y = newState.y;
        uiData.deltaX = newState.x - this.state.x;
        uiData.deltaY = newState.y - this.state.y;
      }
      const shouldUpdate = this.props.onDrag(e, uiData);
      if (shouldUpdate === false) return false;
      this.setState(newState);
    };
    this.onDragStop = (e, coreData) => {
      if (!this.state.dragging) return false;
      const shouldContinue = this.props.onStop(e, createDraggableData(this, coreData));
      if (shouldContinue === false) return false;
      log("Draggable: onDragStop: %j", coreData);
      const newState = {
        dragging: false,
        slackX: 0,
        slackY: 0
      };
      const controlled = Boolean(this.props.position);
      if (controlled) {
        const { x, y } = this.props.position;
        newState.x = x;
        newState.y = y;
      }
      this.setState(newState);
    };
    this.state = {
      // Whether or not we are currently dragging.
      dragging: false,
      // Whether or not we have been dragged before.
      dragged: false,
      // Current transform x and y.
      x: props.position ? props.position.x : props.defaultPosition.x,
      y: props.position ? props.position.y : props.defaultPosition.y,
      prevPropsPosition: { ...props.position },
      // Used for compensating for out-of-bounds drags
      slackX: 0,
      slackY: 0,
      // Can only determine if SVG after mounting
      isElementSVG: false
    };
    if (props.position && !(props.onDrag || props.onStop)) {
      console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element.");
    }
  }
  // React 16.3+
  // Arity (props, state)
  static getDerivedStateFromProps({ position }, { prevPropsPosition }) {
    if (position && (!prevPropsPosition || position.x !== prevPropsPosition.x || position.y !== prevPropsPosition.y)) {
      log("Draggable: getDerivedStateFromProps %j", { position, prevPropsPosition });
      return {
        x: position.x,
        y: position.y,
        prevPropsPosition: { ...position }
      };
    }
    return null;
  }
  componentDidMount() {
    if (typeof window.SVGElement !== "undefined" && this.findDOMNode() instanceof window.SVGElement) {
      this.setState({ isElementSVG: true });
    }
  }
  componentWillUnmount() {
    if (this.state.dragging) {
      this.setState({ dragging: false });
    }
  }
  // React 19 removed ReactDOM.findDOMNode, so nodeRef is now required.
  // For backward compatibility with React 18 and earlier, we still support findDOMNode if available.
  findDOMNode() {
    var _a;
    if ((_a = this.props) == null ? void 0 : _a.nodeRef) {
      return this.props.nodeRef.current;
    }
    const legacyReactDOM = (external_commonjs_react_dom_commonjs2_react_dom_amd_react_dom_root_ReactDOM_default());
    if (typeof legacyReactDOM.findDOMNode === "function") {
      return legacyReactDOM.findDOMNode(this);
    }
    return null;
  }
  render() {
    const {
      axis,
      bounds,
      children,
      defaultPosition,
      defaultClassName,
      defaultClassNameDragging,
      defaultClassNameDragged,
      position,
      positionOffset,
      scale,
      ...draggableCoreProps
    } = this.props;
    let style = {};
    let svgTransform = null;
    const controlled = Boolean(position);
    const draggable = !controlled || this.state.dragging;
    const validPosition = position || defaultPosition;
    const transformOpts = {
      // Set left if horizontal drag is enabled
      x: canDragX(this) && draggable ? this.state.x : validPosition.x,
      // Set top if vertical drag is enabled
      y: canDragY(this) && draggable ? this.state.y : validPosition.y
    };
    if (this.state.isElementSVG) {
      svgTransform = createSVGTransform(transformOpts, positionOffset);
    } else {
      style = createCSSTransform(transformOpts, positionOffset);
    }
    const onlyChild = external_commonjs_react_commonjs2_react_amd_react_root_React_.Children.only(children);
    const className = clsx(onlyChild.props.className || "", defaultClassName, {
      [defaultClassNameDragging]: this.state.dragging,
      [defaultClassNameDragged]: this.state.dragged
    });
    return /* @__PURE__ */ external_commonjs_react_commonjs2_react_amd_react_root_React_.createElement(DraggableCore, { ...draggableCoreProps, onStart: this.onDragStart, onDrag: this.onDrag, onStop: this.onDragStop }, external_commonjs_react_commonjs2_react_amd_react_root_React_.cloneElement(onlyChild, {
      className,
      style: { ...onlyChild.props.style, ...style },
      transform: svgTransform
    }));
  }
}
Draggable.displayName = "Draggable";
// The index-signature annotation is load-bearing: without it tsc infers the
// PropTypes.Requireable<...> types and emits `import PropTypes from 'prop-types'`
// into the generated public .d.ts, forcing consumers to install
// @types/prop-types (the v4.5.0 hand-written typings had no prop-types dep).
// Do not remove. See lib/DraggableCore.tsx for the same guard.
Draggable.propTypes = {
  // Accepts all props <DraggableCore> accepts.
  ...DraggableCore.propTypes,
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
  axis: prop_types_default().oneOf(["both", "x", "y", "none"]),
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
  bounds: prop_types_default().oneOfType([
    prop_types_default().shape({
      left: (prop_types_default()).number,
      right: (prop_types_default()).number,
      top: (prop_types_default()).number,
      bottom: (prop_types_default()).number
    }),
    (prop_types_default()).string,
    prop_types_default().oneOf([false])
  ]),
  defaultClassName: (prop_types_default()).string,
  defaultClassNameDragging: (prop_types_default()).string,
  defaultClassNameDragged: (prop_types_default()).string,
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
  defaultPosition: prop_types_default().shape({
    x: (prop_types_default()).number,
    y: (prop_types_default()).number
  }),
  positionOffset: prop_types_default().shape({
    x: prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]),
    y: prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string])
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
  position: prop_types_default().shape({
    x: (prop_types_default()).number,
    y: (prop_types_default()).number
  }),
  /**
   * These properties should be defined on the child, not here.
   */
  className: dontSetMe,
  style: dontSetMe,
  transform: dontSetMe
};
// Typed as the full `DraggableProps` (not just the default-provided subset) so
// React's JSX LibraryManagedAttributes treats EVERY prop as optional for
// consumers, matching the historical hand-written typings. At runtime only the
// default-able props are actually populated.
Draggable.defaultProps = {
  ...DraggableCore.defaultProps,
  axis: "both",
  bounds: false,
  defaultClassName: "react-draggable",
  defaultClassNameDragging: "react-draggable-dragging",
  defaultClassNameDragged: "react-draggable-dragged",
  defaultPosition: { x: 0, y: 0 },
  scale: 1
};



/***/ },

/***/ 556
(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) // removed by dead control flow
{ var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(694)();
}


/***/ },

/***/ 616
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

const { default: Draggable, DraggableCore } = __webpack_require__(285);
const root = Draggable;
root.default = Draggable;
root.DraggableCore = DraggableCore;
module.exports = root;


/***/ },

/***/ 694
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(925);

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
    bigint: shim,
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


/***/ },

/***/ 925
(module) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(616);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=react-draggable.min.js.map