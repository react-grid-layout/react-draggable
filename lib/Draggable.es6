'use strict';

import React from 'react';
import classNames from 'classnames';
import assign from 'object-assign';
import {autobind} from './utils/shims';
import {createUIEvent, createCSSTransform} from './utils/domFns';
import {canDragX, canDragY, getBoundPosition, snapToGrid} from './utils/positionFns';
import DraggableCore from './DraggableCore';

//
// Define <Draggable>
//

export default class Draggable extends DraggableCore {

  constructor(props) {
    super(props);
    this.state = {
      // Whether or not we are currently dragging.
      dragging: false,

      // Current transform x and y.
      clientX: props.start.x, clientY: props.start.y
    };
    autobind(this);
  }

  onDragStart(e, coreEvent) {
    console.log('Draggable: onDragStart: %j', coreEvent.position);

    // Short-circuit if user's callback killed it.
    let shouldStart = this.props.onStart(e, coreEvent);
    // Kills start event on core as well, so move handlers are never bound.
    if (shouldStart === false) return false;

    this.setState({
      dragging: true
    });
  }

  onDrag(e, coreEvent) {
    if (!this.state.dragging) return false;
    console.log('Draggable: onDrag: %j', coreEvent.position);

    // Short-circuit if user's callback killed it.
    let shouldUpdate = this.props.onDrag(e, coreEvent);
    if (shouldUpdate === false) return false;

    var clientX = this.state.clientX + coreEvent.position.deltaX;
    var clientY = this.state.clientY + coreEvent.position.deltaY;

    // Snap to grid if prop has been provided
    if (Array.isArray(this.props.grid)) {
      [clientX, clientY] = snapToGrid(this.props.grid, clientX, clientY);
    }

    // Keep within bounds.
    if (this.props.bounds) {
      [clientX, clientY] = getBoundPosition(this, clientX, clientY);
    }

    // TODO create drag event using createUIEvent and call back with it
    // this.props.onDrag(createUIEvent(e));

    this.setState({clientX, clientY});
  }

  onDragEnd(e, coreEvent) {
    if (!this.state.dragging) return false;

    // Short-circuit if user's callback killed it.
    let shouldStop = this.props.onStop(e, coreEvent);
    if (shouldStop === false) return false;

    console.log('Draggable: onDragEnd: %j', coreEvent.position);

    this.setState({
      dragging: false
    });
  }

  render() {

    // Add a CSS transform to move the element around. This allows us to move the element around
    // without worrying about whether or not it is relatively or absolutely positioned.
    // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
    // has a clean slate.
    var style = createCSSTransform({
      // Set left if horizontal drag is enabled
      x: canDragX(this) ?
        this.state.clientX :
        0,

      // Set top if vertical drag is enabled
      y: canDragY(this) ?
        this.state.clientY :
        0
    });

    // zIndex option
    if (this.state.dragging && !isNaN(this.props.zIndex)) {
      style.zIndex = this.props.zIndex;
    }

    // Mark with class while dragging
    var className = classNames((this.props.children.props.className || ''), 'react-draggable', {
      'react-draggable-dragging': this.state.dragging,
      'react-draggable-dragged': this.state.dragged
    });

    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return (
      <DraggableCore {...this.props} style={style} className={className}
                     onStart={this.onDragStart} onDrag={this.onDrag} onStop={this.onDragEnd}>
        {React.Children.only(this.props.children)}
      </DraggableCore>
    );
  }
}

Draggable.propTypes = assign({}, DraggableCore.propTypes, {
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
   *   var App = React.createClass({
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
   * `grid` specifies the x and y that dragging should snap to.
   *
   * Example:
   *
   * ```jsx
   *   var App = React.createClass({
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
   *      var App = React.createClass({
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
   *   var App = React.createClass({
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
});

Draggable.defaultProps = assign({}, DraggableCore.defaultProps, {
  axis: 'both',
  bounds: false,
  grid: null,
  start: {x: 0, y: 0},
  zIndex: NaN
});

//
// Helpers.
//


//
// End Helpers.
//
