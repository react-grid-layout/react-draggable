import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import {createCSSTransform, createSVGTransform} from './utils/domFns'
import {canDragX, canDragY, createDraggableData, createDraggableDataOnDrop, getBoundPosition} from './utils/position'
import DraggableCore from './DraggableCore'

export default class Draggable extends React.Component {

    static propTypes = {
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
     *         )
     *       }
     *   })
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
     *                      <div>I start with transformX: 25px and transformY: 25px</div>
     *                  </Draggable>
     *              )
     *          }
     *      })
         * ```
         */
        defaultPosition: PropTypes.shape({
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
     *                      <div>I start with transformX: 25px and transformY: 25px</div>
     *                  </Draggable>
     *              )
     *          }
     *      })
         * ```
         */
        position: PropTypes.shape({
            x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        })
    }

    static defaultProps = {
        ...DraggableCore.defaultProps,
        axis: 'both',
        bounds: false,
        defaultClassName: 'react-draggable',
        defaultClassNameDragging: 'react-draggable-dragging',
        defaultClassNameDragged: 'react-draggable-dragged',
        defaultPosition: {x: 0, y: 0},
        position: null
    }

    state = {
        // Whether or not we are currently dragging.
        dragging: false,
        // Whether or not we have been dragged before.
        dragged: false,
        // Current transform x and y.
        x: this.props.position ? this.props.position.x : this.props.defaultPosition.x,
        y: this.props.position ? this.props.position.y : this.props.defaultPosition.y,
        // Used for compensating for out-of-bounds drags
        slackX: 0,
        slackY: 0,
        // Can only determine if SVG after mounting
        isElementSVG: false
    }

    componentWillMount() {
        if (this.props.position && !(this.props.onDrag || this.props.onStop)) {
            console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' +
                'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust ' +
                'the `position` of this element.')
        }
    }

    componentDidMount() {
        // Check to see if the element passed is an instanceof SVGElement
        if (typeof SVGElement !== 'undefined' && ReactDOM.findDOMNode(this) instanceof SVGElement) {
            // eslint-disable-next-line react/no-did-mount-set-state
            this.setState({isElementSVG: true})
        }
    }

    componentWillReceiveProps(nextProps) {
        // Set x/y if position has changed
        if (nextProps.position &&
            (!this.props.position ||
                nextProps.position.x !== this.props.position.x ||
                nextProps.position.y !== this.props.position.y
            )
        ) {
            this.setState({x: nextProps.position.x, y: nextProps.position.y})
        }
    }

    componentWillUnmount() {
        this.setState({dragging: false}) // prevents invariant if unmounted while dragging
    }

    render() {
        let style = {}, svgTransform = null

        // If this is controlled, we don't want to move it - unless it's dragging.
        const controlled = Boolean(this.props.position)
        const draggable = !controlled || this.state.dragging

        const position = this.props.position || this.props.defaultPosition
        const transformOpts = {
            // Set left if horizontal drag is enabled
            x: canDragX(this) && draggable ?
                this.state.x :
                position.x,

            // Set top if vertical drag is enabled
            y: canDragY(this) && draggable ?
                this.state.y :
                position.y
        }

        // If this element was SVG, we use the `transform` attribute.
        if (this.state.isElementSVG) {
            svgTransform = createSVGTransform(transformOpts)
        } else {
            // Add a CSS transform to move the element around. This allows us to move the element around
            // without worrying about whether or not it is relatively or absolutely positioned.
            // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
            // has a clean slate.
            style = createCSSTransform(transformOpts)
        }

        const {
            defaultClassName,
            defaultClassNameDragging,
            defaultClassNameDragged
        } = this.props

        // Mark with class while dragging
        const className = classNames((this.props.children.props.className || ''), defaultClassName, {
            [defaultClassNameDragging]: this.state.dragging,
            [defaultClassNameDragged]: this.state.dragged
        })

        // Reuse the child provided
        // This makes it flexible to use whatever element is wanted (div, ul, etc)
        return (
            <DraggableCore {...this.props}
                           onStart={this.onDragStart}
                           onDrag={this.onDrag}
                           onStop={this.onDragStop}>
                {React.cloneElement(React.Children.only(this.props.children), {
                    className: className,
                    style: {...this.props.children.props.style, ...style},
                    transform: svgTransform
                })}
            </DraggableCore>
        )
    }

    onDragStart = (event, coreData) => {
        this.saveMouseOffset(event)
        coreData.node.parentElement.style.zIndex = 10000
        coreData.node.parentElement.style.overflow = 'visible'

        // Short-circuit if user's callback killed it.
        const shouldStart = this.props.onStart(event, createDraggableData(this, coreData))
        // Kills start event on core as well, so move handlers are never bound.
        if (shouldStart === false) {
            return false
        }

        this.setState({dragging: true, dragged: true})
    }

    onDrag = (event, coreData) => {
        if (!this.state.dragging) {
            return false
        }

        const uiData = createDraggableData(this, coreData)
        const newState = {
            x: uiData.x + this.state.slackX,
            y: uiData.y + this.state.slackY
        }

        // Keep within bounds.
        if (this.props.bounds) {
            // Save original x and y.

            // Add slack to the values used to calculate bound position. This will ensure that if
            // we start removing slack, the element won't react to it right away until it's been
            // completely removed.

            // Get bound position. This will ceil/floor the x and y within the boundaries.
            const {x, y} = getBoundPosition(this, newState.x, newState.y)
            newState.x = x
            newState.y = y

            // Recalculate slack by noting how much was shaved by the boundPosition handler.
            newState.slackX = this.state.slackX + (x - newState.x)
            newState.slackY = this.state.slackY + (y - newState.y)

            // Update the event we fire to reflect what really happened after bounds took effect.
            uiData.x = x
            uiData.y = y
            uiData.deltaX = newState.x - this.state.x
            uiData.deltaY = newState.y - this.state.y
        }

        // Short-circuit if user's callback killed it.
        const shouldUpdate = this.props.onDrag(event, uiData)
        if (shouldUpdate === false) {
            return false
        }

        this.setState(newState)
    }

    onDragStop = (event, coreData) => {
        if (!this.state.dragging) {
            return false
        }

        coreData.node.parentElement.style.zIndex = 'auto'
        coreData.node.parentElement.style.overflow = 'auto'

        // Short-circuit if user's callback killed it.
        const shouldStop = this.props.onStop(event, createDraggableDataOnDrop(this, coreData, event, this.state.offset))
        if (shouldStop === false) {
            return false
        }

        const newState = {
            dragging: false,
            slackX: 0,
            slackY: 0
        }

        // If this is a controlled component, the result of this operation will be to
        // revert back to the old position. We expect a handler on `onDragStop`, at the least.
        const controlled = Boolean(this.props.position)
        if (controlled) {
            const {x, y} = this.props.position
            newState.x = x
            newState.y = y
        }

        this.setState(newState)
    }

    saveMouseOffset(event) {
        const rect = event.target.getBoundingClientRect()
        this.setState({offset: {offsetX: event.pageX - rect.left, offsetY: event.pageY - rect.top}})
    }

}
