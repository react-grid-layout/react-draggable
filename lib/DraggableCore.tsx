import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {matchesSelectorAndParentsTo, addEvent, removeEvent, addUserSelectStyles, getTouchIdentifier,
        scheduleRemoveUserSelectStyles} from './utils/domFns';
import {createCoreData, getControlPosition, snapToGrid} from './utils/positionFns';
import {dontSetMe} from './utils/shims';
import log from './utils/log';

import type {EventHandler, MouseTouchEvent} from './utils/types';

// Re-export shared types so existing imports from './DraggableCore' keep working.
export type {DraggableData, DraggableEventHandler, ControlPosition, PositionOffsetControlPosition} from './utils/types';
import type {DraggableEventHandler} from './utils/types';

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

export type DraggableCoreDefaultProps = {
  allowAnyClick: boolean,
  allowMobileScroll: boolean,
  disabled: boolean,
  enableUserSelectHack: boolean,
  onStart: DraggableEventHandler,
  onDrag: DraggableEventHandler,
  onStop: DraggableEventHandler,
  onMouseDown: (e: MouseEvent) => void,
  scale: number,
};

export type DraggableCoreProps = DraggableCoreDefaultProps & {
  cancel: string,
  // Public type stays React.ReactNode for backward compatibility with the
  // hand-written typings shipped through v4.5.0. At runtime React.Children.only
  // still requires exactly one element (enforced in render()).
  children?: React.ReactNode,
  offsetParent: HTMLElement,
  grid: [number, number],
  handle: string,
  nodeRef?: React.RefObject<HTMLElement | null> | null,
  nonce?: string,
};

//
// Define <DraggableCore>.
//
// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
// work well with libraries that require more control over the element.
//

// Public-facing prop shape: every prop is optional for consumers because the
// required ones are supplied by `defaultProps`. This reproduces the historical
// hand-written declaration `React.Component<Partial<DraggableCoreProps>, {}>`
// so the auto-generated .d.ts stays API-compatible with the old typings.
export default class DraggableCore extends React.Component<Partial<DraggableCoreProps>> {

  // Internally, defaultProps guarantees every prop is present at runtime, so we
  // narrow `this.props` back to the fully-resolved type for type-safe access.
  declare props: DraggableCoreProps;

  static displayName: string | undefined = 'DraggableCore';

  // Both the annotation and the `?` are load-bearing:
  //  - The index-signature annotation stops tsc from inferring the
  //    PropTypes.Requireable<...> types and emitting `import PropTypes from
  //    'prop-types'` into the generated public .d.ts, which would force consumers
  //    to install @types/prop-types (the v4.5.0 hand-written typings had none).
  //  - The `?` keeps `propTypes` from being a *required* member of the public
  //    type. React <= 18's JSX LibraryManagedAttributes only consults a
  //    component's `propTypes` when it is required (`C extends {propTypes: ...}`);
  //    when it does, this index-signature `propTypes` makes `defaultProps` stop
  //    marking props optional, so consumers are forced to pass every prop.
  //    Optional dodges that branch; React 19 ignores `propTypes` entirely. The
  //    typings/tsconfig.react18.json check guards against a regression here.
  // Do not remove. See lib/Draggable.tsx for the same guard.
  static propTypes?: {[key: string]: unknown} = {
    /**
     * `allowAnyClick` allows dragging using any mouse button.
     * By default, we only accept the left button.
     *
     * Defaults to `false`.
     */
    allowAnyClick: PropTypes.bool,

    /**
     * `allowMobileScroll` turns off cancellation of the 'touchstart' event
     * on mobile devices. Only enable this if you are having trouble with click
     * events. Prefer using 'handle' / 'cancel' instead.
     *
     * Defaults to `false`.
     */
    allowMobileScroll: PropTypes.bool,

    children: PropTypes.node.isRequired,

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
    offsetParent: function(props: DraggableCoreProps, propName: keyof DraggableCoreProps) {
      if (props[propName] && (props[propName] as HTMLElement).nodeType !== 1) {
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
     * `nonce` is applied to the dynamically-injected <style> element used by the
     * user-select hack, so it isn't blocked under a strict Content Security
     * Policy (`style-src` without `'unsafe-inline'`). If omitted, webpack's
     * `__webpack_nonce__` global is used when available.
     */
    nonce: PropTypes.string,

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

  // Typed as the full `DraggableCoreProps` (not just the default-provided subset)
  // so React's JSX LibraryManagedAttributes treats EVERY prop as optional for
  // consumers, matching the historical hand-written typings. At runtime only the
  // default-able props are actually populated.
  static defaultProps: DraggableCoreProps = {
    allowAnyClick: false, // by default only accept left click
    allowMobileScroll: false,
    disabled: false,
    enableUserSelectHack: true,
    onStart: function(){},
    onDrag: function(){},
    onStop: function(){},
    onMouseDown: function(){},
    scale: 1,
  } as unknown as DraggableCoreProps;

  dragging: boolean = false;

  // Used while dragging to determine deltas.
  lastX: number = NaN;
  lastY: number = NaN;

  touchIdentifier: number | null | undefined = null;

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
      if (this.props.enableUserSelectHack) scheduleRemoveUserSelectStyles(ownerDocument);
    }
  }

  // React 19 removed ReactDOM.findDOMNode, so nodeRef is now required.
  // For backward compatibility with React 18 and earlier, we still support findDOMNode if available.
  findDOMNode(): HTMLElement | null {
    if (this.props?.nodeRef) {
      return this.props.nodeRef.current;
    }
    // ReactDOM.findDOMNode was removed in React 19
    const legacyReactDOM = ReactDOM as unknown as {findDOMNode?: (instance: React.Component) => HTMLElement | null};
    if (typeof legacyReactDOM.findDOMNode === 'function') {
      return legacyReactDOM.findDOMNode(this);
    }
    // In React 19+, nodeRef is required - log a warning via our log utility
    log(
      'react-draggable: ReactDOM.findDOMNode is not available in React 19+. ' +
      'You must provide a nodeRef prop. See: https://github.com/react-grid-layout/react-draggable#noderef'
    );
    return null;
  }

  handleDragStart: EventHandler<MouseTouchEvent> = (e) => {
    // Make it possible to attach event handlers on top of this one.
    this.props.onMouseDown(e);

    // Only accept left-clicks. On macOS, ctrl+click is equivalent to right-click.
    if (!this.props.allowAnyClick && ((typeof e.button === 'number' && e.button !== 0) || e.ctrlKey)) return false;

    // Get nodes. Be sure to grab relative document (could be iframed)
    const thisNode = this.findDOMNode();
    if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
      throw new Error('<DraggableCore> not mounted on DragStart!');
    }
    const {ownerDocument} = thisNode;

    // Short circuit if handle or cancel prop was provided and selector doesn't match.
    if (this.props.disabled ||
      (!(e.target instanceof (ownerDocument.defaultView as Window & typeof globalThis).Node)) ||
      (this.props.handle && !matchesSelectorAndParentsTo(e.target as Node, this.props.handle, thisNode)) ||
      (this.props.cancel && matchesSelectorAndParentsTo(e.target as Node, this.props.cancel, thisNode))) {
      return;
    }

    // Prevent scrolling on mobile devices, like ipad/iphone.
    // Important that this is after handle/cancel.
    if (e.type === 'touchstart' && !this.props.allowMobileScroll) e.preventDefault();

    // Set touch identifier in component state if this is a touch event. This allows us to
    // distinguish between individual touches on multitouch screens by identifying which
    // touchpoint was set to this element.
    const touchIdentifier = getTouchIdentifier(e);
    this.touchIdentifier = touchIdentifier;

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
    if (this.props.enableUserSelectHack) addUserSelectStyles(ownerDocument, this.props.nonce);

    // Initiate dragging. Set the current x and y as offsets
    // so we know how much we've moved during the drag. This allows us
    // to drag elements around even if they have been moved, without issue.
    this.dragging = true;
    this.lastX = x;
    this.lastY = y;

    // Add events to the document directly so we catch when the user's mouse/touch moves outside of
    // this element. We use different events depending on whether or not we have detected that this
    // is a touch-capable device.
    addEvent(ownerDocument, dragEventFor.move, this.handleDrag);
    addEvent(ownerDocument, dragEventFor.stop, this.handleDragStop);
  };

  handleDrag: EventHandler<MouseTouchEvent> = (e) => {

    // Get the current drag point from the event. This is used as the offset.
    const position = getControlPosition(e, this.touchIdentifier, this);
    if (position == null) return;
    let {x, y} = position;

    // Snap to grid if prop has been provided
    if (Array.isArray(this.props.grid)) {
      let deltaX = x - this.lastX, deltaY = y - this.lastY;
      [deltaX, deltaY] = snapToGrid(this.props.grid, deltaX, deltaY);
      if (!deltaX && !deltaY) return; // skip useless drag
      x = this.lastX + deltaX;
      y = this.lastY + deltaY;
    }

    const coreEvent = createCoreData(this, x, y);

    log('DraggableCore: handleDrag: %j', coreEvent);

    // Call event handler. If it returns explicit false, trigger end.
    const shouldUpdate = this.props.onDrag(e, coreEvent);
    if (shouldUpdate === false || this.mounted === false) {
      try {
        this.handleDragStop(new MouseEvent('mouseup') as MouseTouchEvent);
      } catch {
        // Old browsers
        const event = document.createEvent('MouseEvents') as unknown as MouseTouchEvent;
        // I see why this insanity was deprecated
        event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        this.handleDragStop(event);
      }
      return;
    }

    this.lastX = x;
    this.lastY = y;
  };

  handleDragStop: EventHandler<MouseTouchEvent> = (e) => {
    if (!this.dragging) return;

    const position = getControlPosition(e, this.touchIdentifier, this);
    if (position == null) return;
    let {x, y} = position;

    // Snap to grid if prop has been provided
    if (Array.isArray(this.props.grid)) {
      let deltaX = x - this.lastX || 0;
      let deltaY = y - this.lastY || 0;
      [deltaX, deltaY] = snapToGrid(this.props.grid, deltaX, deltaY);
      x = this.lastX + deltaX;
      y = this.lastY + deltaY;
    }

    const coreEvent = createCoreData(this, x, y);

    // Call event handler
    const shouldContinue = this.props.onStop(e, coreEvent);
    if (shouldContinue === false || this.mounted === false) return false;

    const thisNode = this.findDOMNode();
    if (thisNode) {
      // Remove user-select hack
      if (this.props.enableUserSelectHack) scheduleRemoveUserSelectStyles(thisNode.ownerDocument);
    }

    log('DraggableCore: handleDragStop: %j', coreEvent);

    // Reset the el.
    this.dragging = false;
    this.lastX = NaN;
    this.lastY = NaN;

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

  render(): React.ReactElement {
    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    // children is typed as ReactNode for public-API compatibility; Children.only
    // throws at runtime unless it is exactly one element, so the cast is safe.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.cloneElement(React.Children.only(this.props.children) as React.ReactElement<any>, {
      // Note: mouseMove handler is attached to document so it will still function
      // when the user drags quickly and leaves the bounds of the element.
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      // onTouchStart is added on `componentDidMount` so they can be added with
      // {passive: false}, which allows it to cancel. See
      // https://developers.google.com/web/updates/2017/01/scrolling-intervention
      onTouchEnd: this.onTouchEnd
    } as React.Attributes);
  }
}
