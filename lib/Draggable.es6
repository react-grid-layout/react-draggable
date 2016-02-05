import {default as React, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import assign from 'object-assign';
import {createUIEvent, createTransform} from './utils/domFns';
import {canDragX, canDragY, getBoundPosition} from './utils/positionFns';
import {dontSetMe} from './utils/shims';
import DraggableCore from './DraggableCore';
import log from './utils/log';

//
// Define <Draggable>
//

export default class Draggable extends DraggableCore {

  static displayName = 'Draggable';

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
    axis: PropTypes.oneOf(['both', 'x', 'y']),

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
        left: PropTypes.Number,
        right: PropTypes.Number,
        top: PropTypes.Number,
        bottom: PropTypes.Number
      }),
      PropTypes.string,
      PropTypes.oneOf([false])
    ]),

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
    start: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
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
    zIndex: PropTypes.number,

    /**
     * These properties should be defined on the child, not here.
     */
    className: dontSetMe,
    style: dontSetMe,
    transform: dontSetMe
  });

  static defaultProps = assign({}, DraggableCore.defaultProps, {
    axis: 'both',
    bounds: false,
    start: {x: 0, y: 0},
    zIndex: NaN
  });

  state = {
    // Whether or not we are currently dragging.
    dragging: false,

    // Current transform x and y.
    clientX: this.props.start.x, clientY: this.props.start.y,

    // Can only determine if SVG after mounting
    isElementSVG: false
  };

  componentDidMount() {
    // Check to see if the element passed is an instanceof SVGElement
    if(ReactDOM.findDOMNode(this) instanceof SVGElement) {
      this.setState({ isElementSVG: true });
    }
  }

  componentWillUnmount() {
    this.setState({dragging: false}); // prevents invariant if unmounted while dragging
  }

  onDragStart = (e, coreEvent) => {
    log('Draggable: onDragStart: %j', coreEvent.position);

    // Short-circuit if user's callback killed it.
    let shouldStart = this.props.onStart(e, createUIEvent(this, coreEvent));
    // Kills start event on core as well, so move handlers are never bound.
    if (shouldStart === false) return false;

    this.setState({dragging: true});
  };

  onDrag = (e, coreEvent) => {
    if (!this.state.dragging) return false;
    log('Draggable: onDrag: %j', coreEvent.position);

    let uiEvent = createUIEvent(this, coreEvent);

    // Short-circuit if user's callback killed it.
    let shouldUpdate = this.props.onDrag(e, uiEvent);
    if (shouldUpdate === false) return false;

    let newState = {
      clientX: uiEvent.position.left,
      clientY: uiEvent.position.top
    };

    // Keep within bounds.
    if (this.props.bounds) {
      [newState.clientX, newState.clientY] = getBoundPosition(this, newState.clientX, newState.clientY);
    }

    this.setState(newState);
  };

  onDragStop = (e, coreEvent) => {
    if (!this.state.dragging) return false;

    // Short-circuit if user's callback killed it.
    let shouldStop = this.props.onStop(e, createUIEvent(this, coreEvent));
    if (shouldStop === false) return false;

    log('Draggable: onDragStop: %j', coreEvent.position);

    this.setState({
      dragging: false
    });
  };

  render() {
    let style, svgTransform = null;
    // Add a CSS transform to move the element around. This allows us to move the element around
    // without worrying about whether or not it is relatively or absolutely positioned.
    // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
    // has a clean slate.
    style = createTransform({
      // Set left if horizontal drag is enabled
      x: canDragX(this) ?
        this.state.clientX :
        this.props.start.x,

      // Set top if vertical drag is enabled
      y: canDragY(this) ?
        this.state.clientY :
        this.props.start.y
    }, this.state.isElementSVG);

    // If this element was SVG, we use the `transform` attribute.
    if (this.state.isElementSVG) {
      svgTransform = style;
      style = {};
    }

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
      <DraggableCore {...this.props} onStart={this.onDragStart} onDrag={this.onDrag} onStop={this.onDragStop}>
        {React.cloneElement(React.Children.only(this.props.children), {
          className: className,
          style: assign({}, this.props.children.props.style, style),
          transform: svgTransform
        })}
      </DraggableCore>
    );
  }
}
