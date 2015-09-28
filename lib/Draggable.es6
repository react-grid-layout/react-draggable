import React from 'react';
import classNames from 'classnames';
import assign from 'object-assign';
import {autobind} from './utils/shims';
import {createUIEvent, createCSSTransform} from './utils/domFns';
import {canDragX, canDragY, getBoundPosition, snapToGrid} from './utils/positionFns';
import DraggableCore from './DraggableCore';
import log from './utils/log';

//
// Define <Draggable>
//

export default class Draggable extends DraggableCore {

  static propTypes = assign({}, DraggableCore.propTypes, {
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
    bounds: React.PropTypes.oneOfType([
      React.PropTypes.shape({
        left: React.PropTypes.Number,
        right: React.PropTypes.Number,
        top: React.PropTypes.Number,
        bottom: React.PropTypes.Number
      }),
      React.PropTypes.oneOf(['parent', false])
    ]),

    /**
     * `disabled`, if true, stops the <Draggable> from dragging. It will stay where it is.
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
    disabled: React.PropTypes.bool,

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
    grid: React.PropTypes.arrayOf(React.PropTypes.number),

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
    start: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number
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
    zIndex: React.PropTypes.number
  })

  static defaultProps = assign({}, DraggableCore.defaultProps, {
    axis: 'both',
    bounds: false,
    disabled: false,
    grid: null,
    start: {x: 0, y: 0},
    zIndex: NaN
  })

  constructor(props) {
    super(props);
    this.state = {
      // Whether or not we are currently dragging.
      dragging: false,

      // Current transform x and y.
      clientX: props.start.x, clientY: props.start.y
    };
    log('Draggable: initializing state: %j, and props: %j', this.state, props);
    autobind(this);
  }

  onDragStart(e, coreEvent) {
    log('Draggable: onDragStart: %j', coreEvent.position);

    // Short-circuit if user's callback killed it.
    let shouldStart = this.props.onStart(e, createUIEvent(this, coreEvent));
    // Kills start event on core as well, so move handlers are never bound.
    if (shouldStart === false) return false;

    this.setState({
      dragging: true
    });
  }

  onDrag(e, coreEvent) {
    if (!this.state.dragging) return false;
    log('Draggable: onDrag: %j', coreEvent.position);

    // Short-circuit if user's callback killed it.
    let shouldUpdate = this.props.onDrag(e, createUIEvent(this, coreEvent));
    if (shouldUpdate === false) return false;

    let newState = {
      clientX: this.state.clientX + coreEvent.position.deltaX,
      clientY: this.state.clientY + coreEvent.position.deltaY
    };

    // Snap to grid if prop has been provided
    if (Array.isArray(this.props.grid)) {
      newState.lastX = (this.state.lastX || newState.clientX) + coreEvent.position.deltaX;
      newState.lastY = (this.state.lastY || newState.clientY) + coreEvent.position.deltaY;
      // Eslint bug, it thinks newState.clientY is undefined
      /*eslint no-undef:0*/
      [newState.clientX, newState.clientY] = snapToGrid(this.props.grid, newState.lastX, newState.lastY);
    }

    // Keep within bounds.
    if (this.props.bounds) {
      [newState.clientX, newState.clientY] = getBoundPosition(this, newState.clientX, newState.clientY);
    }

    this.setState(newState);
  }

  onDragStop(e, coreEvent) {
    if (!this.state.dragging) return false;

    // Short-circuit if user's callback killed it.
    let shouldStop = this.props.onStop(e, createUIEvent(this, coreEvent));
    if (shouldStop === false) return false;

    log('Draggable: onDragStop: %j', coreEvent.position);

    this.setState({
      dragging: false
    });
  }

  render() {

    // Add a CSS transform to move the element around. This allows us to move the element around
    // without worrying about whether or not it is relatively or absolutely positioned.
    // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
    // has a clean slate.
    let style = createCSSTransform({
      // Set left if horizontal drag is enabled
      x: canDragX(this) ?
        this.state.clientX :
        this.props.start.x,

      // Set top if vertical drag is enabled
      y: canDragY(this) ?
        this.state.clientY :
        this.props.start.y
    });

    // zIndex option
    if (this.state.dragging && !isNaN(this.props.zIndex)) {
      style.zIndex = this.props.zIndex;
    }

    // Mark with class while dragging
    let className = classNames((this.props.children.props.className || ''), 'react-draggable', {
      'react-draggable-dragging': this.state.dragging,
      'react-draggable-dragged': this.state.dragged
    });

    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return (
      <DraggableCore {...this.props} style={style} className={className}
                     onStart={this.onDragStart} onDrag={this.onDrag} onStop={this.onDragStop}>
        {React.Children.only(this.props.children)}
      </DraggableCore>
    );
  }
}
