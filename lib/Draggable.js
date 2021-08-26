// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import {createCSSTransform, createSVGTransform} from './utils/domFns';
import {canDragX, canDragY, createDraggableData, getBoundPosition} from './utils/positionFns';
import {dontSetMe} from './utils/shims';
import DraggableCore from './DraggableCore';
import type {ControlPosition, PositionOffsetControlPosition, DraggableCoreProps, DraggableCoreDefaultProps} from './DraggableCore';
import log from './utils/log';
import type {Bounds, DraggableEventHandler} from './utils/types';
import type {Element as ReactElement} from 'react';

type DraggableState = {
  dragging: boolean,
  dragged: boolean,
  x: number, y: number,
  slackX: number, slackY: number,
  isElementSVG: boolean,
  prevPropsPosition: ?ControlPosition,
};

export type DraggableDefaultProps = {
  ...DraggableCoreDefaultProps,
  axis: 'both' | 'x' | 'y' | 'none',
  bounds: Bounds | string | false,
  defaultClassName: string,
  defaultClassNameDragging: string,
  defaultClassNameDragged: string,
  defaultPosition: ControlPosition,
  scale: number,
};

export type DraggableProps = {
  ...DraggableCoreProps,
  ...DraggableDefaultProps,
  positionOffset: PositionOffsetControlPosition,
  position: ControlPosition,
};

//
// Define <Draggable>
//

class Draggable extends React.Component<DraggableProps, DraggableState> {

  static displayName: ?string = 'Draggable';

  static propTypes = {
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

  static defaultProps: DraggableDefaultProps = {
    ...DraggableCore.defaultProps,
    axis: 'both',
    bounds: false,
    defaultClassName: 'react-draggable',
    defaultClassNameDragging: 'react-draggable-dragging',
    defaultClassNameDragged: 'react-draggable-dragged',
    defaultPosition: {x: 0, y: 0},
    scale: 1
  };

  // React 16.3+
  // Arity (props, state)
  static getDerivedStateFromProps({position}: DraggableProps, {prevPropsPosition}: DraggableState): ?$Shape<DraggableState> {
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
    this.setState({dragging: false}); // prevents invariant if unmounted while dragging
  }

  // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
  // the underlying DOM node ourselves. See the README for more information.
  findDOMNode(): ?HTMLElement {
    return this.props?.nodeRef?.current ?? ReactDOM.findDOMNode(this);
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

    const newState: $Shape<DraggableState> = {
      x: uiData.x,
      y: uiData.y
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

    const newState: $Shape<DraggableState> = {
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

    this.setState(newState);
  };

  render(): ReactElement<any> {
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

    // Mark with class while dragging
    const className = clsx((children.props.className || ''), defaultClassName, {
      [defaultClassNameDragging]: this.state.dragging,
      [defaultClassNameDragged]: this.state.dragged
    });

    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return (
      <DraggableCore {...draggableCoreProps} onStart={this.onDragStart} onDrag={this.onDrag} onStop={this.onDragStop}>
        {React.cloneElement(React.Children.only(children), {
          className: className,
          style: {...children.props.style, ...style},
          transform: svgTransform
        })}
      </DraggableCore>
    );
  }
}

export {Draggable as default, DraggableCore};
