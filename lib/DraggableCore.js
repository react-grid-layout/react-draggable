// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {matchesSelectorAndParentsTo, addEvent, removeEvent, addUserSelectStyles, getTouchIdentifier,
        removeUserSelectStyles} from './utils/domFns';
import {createCoreData, getControlPosition, snapToGrid} from './utils/positionFns';
import {dontSetMe} from './utils/shims';
import log from './utils/log';

import type {EventHandler, MouseTouchEvent} from './utils/types';
import type {Element as ReactElement} from 'react';

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

type DraggableCoreState = {
  dragging: boolean,
  lastX: number,
  lastY: number,
  touchIdentifier: ?number
};

export type DraggableData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number,
};

export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void | false;

export type ControlPosition = {x: number, y: number};
export type PositionOffsetControlPosition = {x: number|string, y: number|string};

export type DraggableCoreDefaultProps = {
  allowAnyClick: boolean,
  disabled: boolean,
  enableUserSelectHack: boolean,
  onStart: DraggableEventHandler,
  onDrag: DraggableEventHandler,
  onStop: DraggableEventHandler,
  onMouseDown: (e: MouseEvent) => void,
  scale: number,
};

export type DraggableCoreProps = {
  ...DraggableCoreDefaultProps,
  cancel: string,
  children: ReactElement<any>,
  offsetParent: HTMLElement,
  grid: [number, number],
  handle: string,
  nodeRef?: ?React.ElementRef<any>,
};

//
// Define <DraggableCore>.
//
// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
// work well with libraries that require more control over the element.
//

export default class DraggableCore extends React.Component<DraggableCoreProps, DraggableCoreState> {

  static displayName: ?string = 'DraggableCore';

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
     */
    disabled: PropTypes.bool,

    /**
     * By default, we add 'user-select:none' attributes to the document body
     * to prevent ugly text selection during drag. If this is causing problems
     * for your app, set this to `false`.
     */
    enableUserSelectHack: PropTypes.bool,

    /**
     * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
     * instead of using the parent node.
     */
    offsetParent: function(props: DraggableCoreProps, propName: $Keys<DraggableCoreProps>) {
      if (props[propName] && props[propName].nodeType !== 1) {
        throw new Error('Draggable\'s offsetParent must be a DOM Node.');
      }
    },

    /**
     * `grid` specifies the x and y that dragging should snap to.
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
     *                     <div>Dragging here works fine</div>
     *                   </div>
     *               </Draggable>
     *           );
     *       }
     *   });
     * ```
     */
    cancel: PropTypes.string,

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
    nodeRef: PropTypes.object,

    /**
     * Called when dragging starts.
     * If this function returns the boolean false, dragging will be canceled.
     */
    onStart: PropTypes.func,

    /**
     * Called while dragging.
     * If this function returns the boolean false, dragging will be canceled.
     */
    onDrag: PropTypes.func,

    /**
     * Called when dragging stops.
     * If this function returns the boolean false, the drag will remain active.
     */
    onStop: PropTypes.func,

    /**
     * A workaround option which can be passed if onMouseDown needs to be accessed,
     * since it'll always be blocked (as there is internal use of onMouseDown)
     */
    onMouseDown: PropTypes.func,

    /**
     * `scale`, if set, applies scaling while dragging an element
     */
    scale: PropTypes.number,

    /**
     * These properties should be defined on the child, not here.
     */
    className: dontSetMe,
    style: dontSetMe,
    transform: dontSetMe
  };

  static defaultProps: DraggableCoreDefaultProps = {
    allowAnyClick: false, // by default only accept left click
    disabled: false,
    enableUserSelectHack: true,
    onStart: function(){},
    onDrag: function(){},
    onStop: function(){},
    onMouseDown: function(){},
    scale: 1,
  };

  state: DraggableCoreState = {
    dragging: false,
    // Used while dragging to determine deltas.
    lastX: NaN, lastY: NaN,
    touchIdentifier: null
  };

  mounted: boolean = false;

  componentDidMount() {
    this.mounted = true;
    // Touch handlers must be added with {passive: false} to be cancelable.
    // https://developers.google.com/web/updates/2017/01/scrolling-intervention
    const thisNode = this.findDOMNode();
    if (thisNode) {
      addEvent(thisNode, eventsFor.touch.start, this.onTouchStart, {passive: false});
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    // Remove any leftover event handlers. Remove both touch and mouse handlers in case
    // some browser quirk caused a touch event to fire during a mouse move, or vice versa.
    const thisNode = this.findDOMNode();
    if (thisNode) {
      const {ownerDocument} = thisNode;
      removeEvent(ownerDocument, eventsFor.mouse.move, this.handleDrag);
      removeEvent(ownerDocument, eventsFor.touch.move, this.handleDrag);
      removeEvent(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
      removeEvent(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
      removeEvent(thisNode, eventsFor.touch.start, this.onTouchStart, {passive: false});
      if (this.props.enableUserSelectHack) removeUserSelectStyles(ownerDocument);
    }
  }

  // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
  // the underlying DOM node ourselves. See the README for more information.
  findDOMNode(): ?HTMLElement {
    return this.props?.nodeRef?.current ?? ReactDOM.findDOMNode(this);
  }

  handleDragStart: EventHandler<MouseTouchEvent> = (e) => {
    // Make it possible to attach event handlers on top of this one.
    this.props.onMouseDown(e);

    // Only accept left-clicks.
    if (!this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false;

    // Get nodes. Be sure to grab relative document (could be iframed)
    const thisNode = this.findDOMNode();
    if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
      throw new Error('<DraggableCore> not mounted on DragStart!');
    }
    const {ownerDocument} = thisNode;

    // Short circuit if handle or cancel prop was provided and selector doesn't match.
    if (this.props.disabled ||
      (!(e.target instanceof ownerDocument.defaultView.Node)) ||
      (this.props.handle && !matchesSelectorAndParentsTo(e.target, this.props.handle, thisNode)) ||
      (this.props.cancel && matchesSelectorAndParentsTo(e.target, this.props.cancel, thisNode))) {
      return;
    }

    // Prevent scrolling on mobile devices, like ipad/iphone.
    // Important that this is after handle/cancel.
    if (e.type === 'touchstart') e.preventDefault();

    // Set touch identifier in component state if this is a touch event. This allows us to
    // distinguish between individual touches on multitouch screens by identifying which
    // touchpoint was set to this element.
    const touchIdentifier = getTouchIdentifier(e);
    this.setState({touchIdentifier});

    // Get the current drag point from the event. This is used as the offset.
    const position = getControlPosition(e, touchIdentifier, this);
    if (position == null) return; // not possible but satisfies flow
    const {x, y} = position;

    // Create an event object with all the data parents need to make a decision here.
    const coreEvent = createCoreData(this, x, y);

    log('DraggableCore: handleDragStart: %j', coreEvent);

    // Call event handler. If it returns explicit false, cancel.
    log('calling', this.props.onStart);
    const shouldUpdate = this.props.onStart(e, coreEvent);
    if (shouldUpdate === false || this.mounted === false) return;

    // Add a style to the body to disable user-select. This prevents text from
    // being selected all over the page.
    if (this.props.enableUserSelectHack) addUserSelectStyles(ownerDocument);

    // Initiate dragging. Set the current x and y as offsets
    // so we know how much we've moved during the drag. This allows us
    // to drag elements around even if they have been moved, without issue.
    this.setState({
      dragging: true,

      lastX: x,
      lastY: y
    });

    // Add events to the document directly so we catch when the user's mouse/touch moves outside of
    // this element. We use different events depending on whether or not we have detected that this
    // is a touch-capable device.
    addEvent(ownerDocument, dragEventFor.move, this.handleDrag);
    addEvent(ownerDocument, dragEventFor.stop, this.handleDragStop);
  };

  handleDrag: EventHandler<MouseTouchEvent> = (e) => {

    // Get the current drag point from the event. This is used as the offset.
    const position = getControlPosition(e, this.state.touchIdentifier, this);
    if (position == null) return;
    let {x, y} = position;

    // Snap to grid if prop has been provided
    if (Array.isArray(this.props.grid)) {
      let deltaX = x - this.state.lastX, deltaY = y - this.state.lastY;
      [deltaX, deltaY] = snapToGrid(this.props.grid, deltaX, deltaY);
      if (!deltaX && !deltaY) return; // skip useless drag
      x = this.state.lastX + deltaX, y = this.state.lastY + deltaY;
    }

    const coreEvent = createCoreData(this, x, y);

    log('DraggableCore: handleDrag: %j', coreEvent);

    // Call event handler. If it returns explicit false, trigger end.
    const shouldUpdate = this.props.onDrag(e, coreEvent);
    if (shouldUpdate === false || this.mounted === false) {
      try {
        // $FlowIgnore
        this.handleDragStop(new MouseEvent('mouseup'));
      } catch (err) {
        // Old browsers
        const event = ((document.createEvent('MouseEvents'): any): MouseTouchEvent);
        // I see why this insanity was deprecated
        // $FlowIgnore
        event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        this.handleDragStop(event);
      }
      return;
    }

    this.setState({
      lastX: x,
      lastY: y
    });
  };

  handleDragStop: EventHandler<MouseTouchEvent> = (e) => {
    if (!this.state.dragging) return;

    const position = getControlPosition(e, this.state.touchIdentifier, this);
    if (position == null) return;
    let {x, y} = position;

    // Snap to grid if prop has been provided
    if (Array.isArray(this.props.grid)) {
      let deltaX = x - this.state.lastX, deltaY = y - this.state.lastY;
      [deltaX, deltaY] = snapToGrid(this.props.grid, deltaX, deltaY);
      x = this.state.lastX + deltaX, y = this.state.lastY + deltaY;
    }

    const coreEvent = createCoreData(this, x, y);

    // Call event handler
    const shouldContinue = this.props.onStop(e, coreEvent);
    if (shouldContinue === false || this.mounted === false) return false;

    const thisNode = this.findDOMNode();
    if (thisNode) {
      // Remove user-select hack
      if (this.props.enableUserSelectHack) removeUserSelectStyles(thisNode.ownerDocument);
    }

    log('DraggableCore: handleDragStop: %j', coreEvent);

    // Reset the el.
    this.setState({
      dragging: false,
      lastX: NaN,
      lastY: NaN
    });

    if (thisNode) {
      // Remove event handlers
      log('DraggableCore: Removing handlers');
      removeEvent(thisNode.ownerDocument, dragEventFor.move, this.handleDrag);
      removeEvent(thisNode.ownerDocument, dragEventFor.stop, this.handleDragStop);
    }
  };

  onMouseDown: EventHandler<MouseTouchEvent> = (e) => {
    dragEventFor = eventsFor.mouse; // on touchscreen laptops we could switch back to mouse

    return this.handleDragStart(e);
  };

  onMouseUp: EventHandler<MouseTouchEvent> = (e) => {
    dragEventFor = eventsFor.mouse;

    return this.handleDragStop(e);
  };

  // Same as onMouseDown (start drag), but now consider this a touch device.
  onTouchStart: EventHandler<MouseTouchEvent> = (e) => {
    // We're on a touch device now, so change the event handlers
    dragEventFor = eventsFor.touch;

    return this.handleDragStart(e);
  };

  onTouchEnd: EventHandler<MouseTouchEvent> = (e) => {
    // We're on a touch device now, so change the event handlers
    dragEventFor = eventsFor.touch;

    return this.handleDragStop(e);
  };

  render(): React.Element<any> {
    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return React.cloneElement(React.Children.only(this.props.children), {
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
