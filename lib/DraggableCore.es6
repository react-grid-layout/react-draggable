'use strict';

import React from 'react';
import {autobind} from './utils/shims';
import {matchesSelector, createCoreEvent, addEvent, removeEvent, addUserSelectStyles,
        removeUserSelectStyles, styleHacks} from './utils/domFns';
import {getControlPosition} from './utils/positionFns';

//
// Define <DraggableCore>.
//
// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
// work well with libraries that require more control over the element.
//

export default class DraggableCore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      // Used while dragging to determine deltas.
      lastX: null, lastY: null
    };
    // ES6 classes don't autobind members like React.createClass() does.
    autobind(this);
  }

  componentWillUnmount() {
    // Remove any leftover event handlers. Remove both touch and mouse handlers in case
    // some browser quirk caused a touch event to fire during a mouse move, or vice versa.
    removeEvent(document, eventsFor.mouse.move, this.handleDrag);
    removeEvent(document, eventsFor.touch.move, this.handleDrag);
    removeEvent(document, eventsFor.mouse.end, this.handleDragEnd);
    removeEvent(document, eventsFor.touch.end, this.handleDragEnd);
    if (this.props.enableUserSelectHack) removeUserSelectStyles();
  }

  handleDragStart(e) {
    // Make it possible to attach event handlers on top of this one.
    this.props.onMouseDown(e);

    // Short circuit if handle or cancel prop was provided and selector doesn't match.
    if ((this.props.handle && !matchesSelector(e.target, this.props.handle)) ||
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
    addUserSelectStyles();

    // Get the current drag point from the event. This is used as the offset.
    var {clientX, clientY} = getControlPosition(e);

    // Create an event object with all the data parents need to make a decision here.
    var coreEvent = createCoreEvent(this, clientX, clientY);

    console.log('DraggableCore: handleDragStart: %j', coreEvent.position);

    // Call event handler. If it returns explicit false, cancel.
    console.log('calling', this.props.onStart);
    var shouldUpdate = this.props.onStart(e, coreEvent);
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
    addEvent(document, dragEventFor.end, this.handleDragEnd);
  }

  handleDrag(e) {
    // Return if this is a touch event, but not the correct one for this element
    if (e.targetTouches && (e.targetTouches[0].identifier !== this.state.touchIdentifier)) return;

    var {clientX, clientY} = getControlPosition(e);

    var coreEvent = createCoreEvent(this, clientX, clientY);

    console.log('DraggableCore: handleDrag: %j', coreEvent.position);

    // Call event handler. If it returns explicit false, trigger end.
    var shouldUpdate = this.props.onDrag(e, coreEvent);
    if (shouldUpdate === false) {
      this.handleDragEnd();
      return;
    }

    this.setState({
      lastX: clientX,
      lastY: clientY
    });
  }

  handleDragEnd(e) {
    if (!this.state.dragging) return;

    // Short circuit if this is not the correct touch event. `changedTouches` contains all
    // touch points that have been removed from the surface.
    if (e.changedTouches && (e.changedTouches[0].identifier !== this.state.touchIdentifier)) return;

    // Remove user-select hack
    if (this.props.enableUserSelectHack) removeUserSelectStyles();

    var {clientX, clientY} = getControlPosition(e);
    var coreEvent = createCoreEvent(this, clientX, clientY);

    console.log('DraggableCore: handleDragEnd: %j', coreEvent.position);

    // Reset the el.
    this.setState({
      dragging: false,
      lastX: null,
      lastY: null
    });

    // Call event handler
    this.props.onStop(e, coreEvent);

    // Remove event handlers
    console.log('DraggableCore: Removing handlers');
    removeEvent(document, 'scroll', this.handleScroll);
    removeEvent(document, dragEventFor.move, this.handleDrag);
    removeEvent(document, dragEventFor.end, this.handleDragEnd);
  }

  // When the user scrolls, adjust internal state so the draggable moves along the page properly.
  // This only fires when a drag is active.
  handleScroll() {
    var s = this.state, x = document.body.scrollLeft, y = document.body.scrollTop;

    // Create the usual event, but make the scroll offset our deltas.
    var coreEvent = createCoreEvent(this);
    coreEvent.deltaX = x - s.scrollX;
    coreEvent.deltaY = y - s.scrollY;

    this.setState({
      lastX: s.lastX + coreEvent.deltaX,
      lastY: s.lastY + coreEvent.deltaY
    });

    this.props.onDrag(coreEvent);
  }

  // On mousedown, consider the drag started.
  onMouseDown(e) {
    // HACK: Prevent 'ghost click' which happens 300ms after touchstart if the event isn't cancelled.
    // We don't cancel the event on touchstart because of #37; we might want to make a scrollable item draggable.
    // More on ghost clicks: http://ariatemplates.com/blog/2014/05/ghost-clicks-in-mobile-browsers/
    if (dragEventFor === eventsFor.touch) {
      return e.preventDefault();
    }

    return this.handleDragStart(e);
  }

  // Same as onMouseDown (start drag), but now consider this a touch device.
  onTouchStart(e) {
    // We're on a touch device now, so change the event handlers
    dragEventFor = eventsFor.touch;

    return this.handleDragStart(e);
  }

  render() {
    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return React.cloneElement(React.Children.only(this.props.children), {
      style: styleHacks(this),

      // Note: mouseMove handler is attached to document so it will still function
      // when the user drags quickly and leaves the bounds of the element.
      onMouseDown: this.onMouseDown,
      onTouchStart: this.onTouchStart,
      onMouseUp: this.handleDragEnd,
      onTouchEnd: this.handleDragEnd
    });
  }
}

DraggableCore.propTypes = {
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
  onMouseDown: React.PropTypes.func
};

DraggableCore.defaultProps = {
  handle: null,
  cancel: null,
  enableUserSelectHack: true,
  onStart: function(){},
  onDrag: function(){},
  onStop: function(){},
  onMouseDown: function(){}
};


//
// Helpers.
//

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

//
// End Helpers.
//
