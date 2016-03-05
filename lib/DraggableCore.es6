// @flow
import {default as React, PropTypes} from 'react';
import {matchesSelector, createCoreEvent, addEvent, removeEvent, addUserSelectStyles,
        removeUserSelectStyles, styleHacks} from './utils/domFns';
import {getControlPosition, snapToGrid} from './utils/positionFns';
import {dontSetMe} from './utils/shims';
import log from './utils/log';

// Simple abstraction for dragging events names.
const eventsFor = {
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
let dragEventFor = eventsFor.mouse;

type EventHandler = (e: Event) => void;
type CoreState = {
  dragging: boolean,
  lastX: ?number,
  lastY: ?number
};

//
// Define <DraggableCore>.
//
// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
// work well with libraries that require more control over the element.
//

export default class DraggableCore extends React.Component {

  static displayName = 'DraggableCore';

  static propTypes = {
    /**
     * `allowAnyClick` allows dragging using any mouse button.
     * By default, we only accept the left button.
     *
     * Defaults to `false`.
     */
    allowAnyClick: PropTypes.bool,

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
    disabled: PropTypes.bool,

    /**
     * By default, we add 'user-select:none' attributes to the document body
     * to prevent ugly text selection during drag. If this is causing problems
     * for your app, set this to `false`.
     */
    enableUserSelectHack: PropTypes.bool,

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
    grid: PropTypes.arrayOf(PropTypes.number),

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
    handle: PropTypes.string,

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
    cancel: PropTypes.string,

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
    onStart: PropTypes.func,

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
    onDrag: PropTypes.func,

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
    onStop: PropTypes.func,

    /**
     * A workaround option which can be passed if onMouseDown needs to be accessed,
     * since it'll always be blocked (due to that there's internal use of onMouseDown)
     */
    onMouseDown: PropTypes.func,

    /**
     * These properties should be defined on the child, not here.
     */
    className: dontSetMe,
    style: dontSetMe,
    transform: dontSetMe
  };

  static defaultProps = {
    allowAnyClick: false, // by default only accept left click
    cancel: null,
    disabled: false,
    enableUserSelectHack: true,
    handle: null,
    grid: null,
    transform: null,
    onStart: function(){},
    onDrag: function(){},
    onStop: function(){},
    onMouseDown: function(){}
  };

  state: CoreState = {
    dragging: false,
    // Used while dragging to determine deltas.
    lastX: null, lastY: null
  };

  componentWillUnmount() {
    // Remove any leftover event handlers. Remove both touch and mouse handlers in case
    // some browser quirk caused a touch event to fire during a mouse move, or vice versa.
    removeEvent(document, eventsFor.mouse.move, this.handleDrag);
    removeEvent(document, eventsFor.touch.move, this.handleDrag);
    removeEvent(document, eventsFor.mouse.stop, this.handleDragStop);
    removeEvent(document, eventsFor.touch.stop, this.handleDragStop);
    removeEvent(document, 'scroll', this.handleScroll);
    if (this.props.enableUserSelectHack) removeUserSelectStyles();
  }

  handleDragStart: EventHandler = (e) => {
    // Make it possible to attach event handlers on top of this one.
    this.props.onMouseDown(e);

    // Only accept left-clicks.
    if (!this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false;

    // Short circuit if handle or cancel prop was provided and selector doesn't match.
    if (this.props.disabled ||
      (this.props.handle && !matchesSelector(e.target, this.props.handle)) ||
      (this.props.cancel && matchesSelector(e.target, this.props.cancel))) {
      return;
    }

    // Set touch identifier in component state if this is a touch event. This allows us to
    // distinguish between individual touches on multitouch screens by identifying which
    // touchpoint was set to this element.
    if (e.targetTouches){
      this.setState({touchIdentifier: e.targetTouches[0].identifier});
    }

    // Add a style to the body to disable user-select. This prevents text from
    // being selected all over the page.
    if (this.props.enableUserSelectHack) addUserSelectStyles();

    // Get the current drag point from the event. This is used as the offset.
    let {clientX, clientY} = getControlPosition(e);

    // Create an event object with all the data parents need to make a decision here.
    let coreEvent = createCoreEvent(this, clientX, clientY);

    log('DraggableCore: handleDragStart: %j', coreEvent.position);

    // Call event handler. If it returns explicit false, cancel.
    log('calling', this.props.onStart);
    let shouldUpdate = this.props.onStart(e, coreEvent);
    if (shouldUpdate === false) return;


    // Initiate dragging. Set the current x and y as offsets
    // so we know how much we've moved during the drag. This allows us
    // to drag elements around even if they have been moved, without issue.
    this.setState({
      dragging: true,

      lastX: clientX,
      lastY: clientY,
      // Stored so we can adjust our offset if scrolled.
      scrollX: document.body.scrollLeft,
      scrollY: document.body.scrollTop
    });

    // Translate el on page scroll.
    addEvent(document, 'scroll', this.handleScroll);
    // Add events to the document directly so we catch when the user's mouse/touch moves outside of
    // this element. We use different events depending on whether or not we have detected that this
    // is a touch-capable device.
    addEvent(document, dragEventFor.move, this.handleDrag);
    addEvent(document, dragEventFor.stop, this.handleDragStop);
  };

  handleDrag: EventHandler = (e) => {
    // Return if this is a touch event, but not the correct one for this element
    if (e.targetTouches && (e.targetTouches[0].identifier !== this.state.touchIdentifier)) return;

    let {clientX, clientY} = getControlPosition(e);

    // Snap to grid if prop has been provided
    if (Array.isArray(this.props.grid)) {
      let deltaX = clientX - this.state.lastX, deltaY = clientY - this.state.lastY;
      [deltaX, deltaY] = snapToGrid(this.props.grid, deltaX, deltaY);
      if (!deltaX && !deltaY) return; // skip useless drag
      clientX = this.state.lastX + deltaX, clientY = this.state.lastY + deltaY;
    }

    const coreEvent = createCoreEvent(this, clientX, clientY);

    log('DraggableCore: handleDrag: %j', coreEvent.position);


    // Call event handler. If it returns explicit false, trigger end.
    const shouldUpdate = this.props.onDrag(e, coreEvent);
    if (shouldUpdate === false) {
      this.handleDragStop({});
      return;
    }

    this.setState({
      lastX: clientX,
      lastY: clientY
    });
  };

  handleDragStop: EventHandler = (e) => {
    if (!this.state.dragging) return;

    // Short circuit if this is not the correct touch event. `changedTouches` contains all
    // touch points that have been removed from the surface.
    if (e.changedTouches && (e.changedTouches[0].identifier !== this.state.touchIdentifier)) return;

    // Remove user-select hack
    if (this.props.enableUserSelectHack) removeUserSelectStyles();

    let {clientX, clientY} = getControlPosition(e);
    const coreEvent = createCoreEvent(this, clientX, clientY);

    log('DraggableCore: handleDragStop: %j', coreEvent.position);

    // Reset the el.
    this.setState({
      dragging: false,
      lastX: null,
      lastY: null
    });

    // Call event handler
    this.props.onStop(e, coreEvent);

    // Remove event handlers
    log('DraggableCore: Removing handlers');
    removeEvent(document, 'scroll', this.handleScroll);
    removeEvent(document, dragEventFor.move, this.handleDrag);
    removeEvent(document, dragEventFor.stop, this.handleDragStop);
  };

  // When the user scrolls, adjust internal state so the draggable moves along the page properly.
  // This only fires when a drag is active.
  handleScroll: EventHandler = (e) => {
    const s = this.state, x = document.body.scrollLeft, y = document.body.scrollTop;

    // Create the usual event, but make the scroll offset our deltas.
    let coreEvent = createCoreEvent(this);
    coreEvent.position.deltaX = x - s.scrollX;
    coreEvent.position.deltaY = y - s.scrollY;

    this.setState({
      lastX: s.lastX + coreEvent.position.deltaX,
      lastY: s.lastY + coreEvent.position.deltaY,
      scrollX: x,
      scrollY: y
    });

    this.props.onDrag(e, coreEvent);
  };

  // Same as onMouseDown (start drag), but now consider this a touch device.
  onTouchStart: EventHandler = (e) => {
    // We're on a touch device now, so change the event handlers
    dragEventFor = eventsFor.touch;

    return this.handleDragStart(e);
  };

  onTouchEnd: EventHandler = (e) => {
    // We're on a touch device now, so change the event handlers
    dragEventFor = eventsFor.touch;

    return this.handleDragStop(e);
  };

  render(): ReactElement {
    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return React.cloneElement(React.Children.only(this.props.children), {
      style: styleHacks(this.props.children.props.style),

      // Note: mouseMove handler is attached to document so it will still function
      // when the user drags quickly and leaves the bounds of the element.
      onMouseDown: this.handleDragStart,
      onTouchStart: this.onTouchStart,
      onMouseUp: this.handleDragStop,
      onTouchEnd: this.onTouchEnd
    });
  }
}
