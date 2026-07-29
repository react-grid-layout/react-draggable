import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { clsx } from 'clsx';
import {createCSSTransform, createSVGTransform} from './utils/domFns';
import {canDragX, canDragY, createDraggableData, getBoundPosition} from './utils/positionFns';
import {dontSetMe} from './utils/shims';
import DraggableCore from './DraggableCore';
import type {ControlPosition, PositionOffsetControlPosition, DraggableCoreProps, DraggableCoreDefaultProps} from './DraggableCore';
import log from './utils/log';
import type {Bounds, DraggableEventHandler} from './utils/types';
import type {ReactElement} from 'react';

type DraggableState = {
  dragging: boolean,
  dragged: boolean,
  x: number, y: number,
  slackX: number, slackY: number,
  isElementSVG: boolean,
  prevPropsPosition: ControlPosition | null,
};

export type DraggableDefaultProps = DraggableCoreDefaultProps & {
  axis: 'both' | 'x' | 'y' | 'none',
  bounds: Bounds | string | false,
  defaultClassName: string,
  defaultClassNameDragging: string,
  defaultClassNameDragged: string,
  defaultPosition: ControlPosition,
  scale: number,
};

export type DraggableProps = DraggableCoreProps & DraggableDefaultProps & {
  positionOffset: PositionOffsetControlPosition,
  position: ControlPosition,
};

//
// Define <Draggable>
//

// Public-facing prop shape: every prop is optional for consumers because the
// required ones are supplied by `defaultProps`. This reproduces the historical
// hand-written declaration `React.Component<Partial<DraggableProps>, {}>` so the
// auto-generated .d.ts stays API-compatible with the old typings.
class Draggable extends React.Component<Partial<DraggableProps>, DraggableState> {

  // Internally, defaultProps guarantees every prop is present at runtime, so we
  // narrow `this.props` back to the fully-resolved type for type-safe access.
  declare props: DraggableProps;

  static displayName?: string = 'Draggable';

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
  // Do not remove. See lib/DraggableCore.tsx for the same guard.
  static propTypes?: {[key: string]: unknown} = {
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
    axis: PropTypes.oneOf(['both', 'x', 'y', 'none']),

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
    bounds: PropTypes.oneOfType([
      PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
        top: PropTypes.number,
        bottom: PropTypes.number
      }),
      PropTypes.string,
      PropTypes.oneOf([false])
    ]),

    defaultClassName: PropTypes.string,
    defaultClassNameDragging: PropTypes.string,
    defaultClassNameDragged: PropTypes.string,

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
    defaultPosition: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    positionOffset: PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
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
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
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
  static defaultProps: DraggableProps = {
    ...DraggableCore.defaultProps,
    axis: 'both',
    bounds: false,
    defaultClassName: 'react-draggable',
    defaultClassNameDragging: 'react-draggable-dragging',
    defaultClassNameDragged: 'react-draggable-dragged',
    defaultPosition: {x: 0, y: 0},
    scale: 1
  } as unknown as DraggableProps;

  // React 16.3+
  // Arity (props, state)
  static getDerivedStateFromProps({position}: DraggableProps, {prevPropsPosition}: DraggableState): Partial<DraggableState> | null {
    // Set x/y if a new position is provided in props that is different than the previous.
    if (
      position &&
      (!prevPropsPosition ||
        position.x !== prevPropsPosition.x || position.y !== prevPropsPosition.y
      )
    ) {
      log('Draggable: getDerivedStateFromProps %j', {position, prevPropsPosition});
      return {
        x: position.x,
        y: position.y,
        prevPropsPosition: {...position}
      };
    }
    return null;
  }

  constructor(props: DraggableProps) {
    super(props);

    this.state = {
      // Whether or not we are currently dragging.
      dragging: false,

      // Whether or not we have been dragged before.
      dragged: false,

      // Current transform x and y.
      x: props.position ? props.position.x : props.defaultPosition.x,
      y: props.position ? props.position.y : props.defaultPosition.y,

      prevPropsPosition: {...props.position},

      // Used for compensating for out-of-bounds drags
      slackX: 0, slackY: 0,

      // Can only determine if SVG after mounting
      isElementSVG: false
    };

    if (props.position && !(props.onDrag || props.onStop)) {
      // eslint-disable-next-line no-console
      console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' +
        'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the ' +
        '`position` of this element.');
    }
  }

  componentDidMount() {
    // Check to see if the element passed is an instanceof SVGElement
    if(typeof window.SVGElement !== 'undefined' && this.findDOMNode() instanceof window.SVGElement) {
      this.setState({isElementSVG: true});
    }
  }

  componentWillUnmount() {
    if (this.state.dragging) {
      this.setState({dragging: false}); // prevents invariant if unmounted while dragging
    }
  }

  // React 19 removed ReactDOM.findDOMNode, so nodeRef is now required.
  // For backward compatibility with React 18 and earlier, we still support findDOMNode if available.
  findDOMNode(): HTMLElement | null {
    if (this.props?.nodeRef) {
      return this.props.nodeRef.current;
    }
    // ReactDOM.findDOMNode was removed from React 19's type defs (and runtime),
    // so access it dynamically to stay compatible with React 18 and earlier.
    const legacyReactDOM = ReactDOM as unknown as {
      findDOMNode?: (instance: unknown) => HTMLElement | null;
    };
    if (typeof legacyReactDOM.findDOMNode === 'function') {
      return legacyReactDOM.findDOMNode(this) as HTMLElement | null;
    }
    return null;
  }

  onDragStart: DraggableEventHandler = (e, coreData) => {
    log('Draggable: onDragStart: %j', coreData);

    // Short-circuit if user's callback killed it.
    const shouldStart = this.props.onStart(e, createDraggableData(this, coreData));
    // Kills start event on core as well, so move handlers are never bound.
    if (shouldStart === false) return false;

    this.setState({dragging: true, dragged: true});
  };

  onDrag: DraggableEventHandler = (e, coreData) => {
    if (!this.state.dragging) return false;
    log('Draggable: onDrag: %j', coreData);

    const uiData = createDraggableData(this, coreData);

    const newState = {
      x: uiData.x,
      y: uiData.y,
      slackX: 0,
      slackY: 0,
    };

    // Keep within bounds.
    if (this.props.bounds) {
      // Save original x and y.
      const {x, y} = newState;

      // Add slack to the values used to calculate bound position. This will ensure that if
      // we start removing slack, the element won't react to it right away until it's been
      // completely removed.
      newState.x += this.state.slackX;
      newState.y += this.state.slackY;

      // Get bound position. This will ceil/floor the x and y within the boundaries.
      const [newStateX, newStateY] = getBoundPosition(this, newState.x, newState.y);
      newState.x = newStateX;
      newState.y = newStateY;

      // Recalculate slack by noting how much was shaved by the boundPosition handler.
      newState.slackX = this.state.slackX + (x - newState.x);
      newState.slackY = this.state.slackY + (y - newState.y);

      // Update the event we fire to reflect what really happened after bounds took effect.
      uiData.x = newState.x;
      uiData.y = newState.y;
      uiData.deltaX = newState.x - this.state.x;
      uiData.deltaY = newState.y - this.state.y;
    }

    // Short-circuit if user's callback killed it.
    const shouldUpdate = this.props.onDrag(e, uiData);
    if (shouldUpdate === false) return false;

    this.setState(newState);
  };

  onDragStop: DraggableEventHandler = (e, coreData) => {
    if (!this.state.dragging) return false;

    // Short-circuit if user's callback killed it.
    const shouldContinue = this.props.onStop(e, createDraggableData(this, coreData));
    if (shouldContinue === false) return false;

    log('Draggable: onDragStop: %j', coreData);

    const newState: Partial<DraggableState> = {
      dragging: false,
      slackX: 0,
      slackY: 0
    };

    // If this is a controlled component, the result of this operation will be to
    // revert back to the old position. We expect a handler on `onDragStop`, at the least.
    const controlled = Boolean(this.props.position);
    if (controlled) {
      const {x, y} = this.props.position;
      newState.x = x;
      newState.y = y;
    }

    this.setState(newState as DraggableState);
  };

  render(): ReactElement {
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

    // If this is controlled, we don't want to move it - unless it's dragging.
    const controlled = Boolean(position);
    const draggable = !controlled || this.state.dragging;

    const validPosition = position || defaultPosition;
    const transformOpts = {
      // Set left if horizontal drag is enabled
      x: canDragX(this) && draggable ?
        this.state.x :
        validPosition.x,

      // Set top if vertical drag is enabled
      y: canDragY(this) && draggable ?
        this.state.y :
        validPosition.y
    };

    // If this element was SVG, we use the `transform` attribute.
    if (this.state.isElementSVG) {
      svgTransform = createSVGTransform(transformOpts, positionOffset);
    } else {
      // Add a CSS transform to move the element around. This allows us to move the element around
      // without worrying about whether or not it is relatively or absolutely positioned.
      // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
      // has a clean slate.
      style = createCSSTransform(transformOpts, positionOffset);
    }

    // React.Children.only types its return as ReactElement<unknown>; narrow the
    // single child to an element carrying optional DOM style/className props so
    // we can read and merge them.
    const onlyChild = React.Children.only(children) as ReactElement<{
      className?: string,
      style?: React.CSSProperties,
    }>;

    // Mark with class while dragging
    const className = clsx((onlyChild.props.className || ''), defaultClassName, {
      [defaultClassNameDragging]: this.state.dragging,
      [defaultClassNameDragged]: this.state.dragged
    });

    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return (
      <DraggableCore {...draggableCoreProps} onStart={this.onDragStart} onDrag={this.onDrag} onStop={this.onDragStop}>
        {React.cloneElement(onlyChild, {
          className: className,
          style: {...onlyChild.props.style, ...style},
          transform: svgTransform
        } as Partial<{className: string, style: React.CSSProperties, transform: string | null}>)}
      </DraggableCore>
    );
  }
}

export {Draggable as default, DraggableCore};
