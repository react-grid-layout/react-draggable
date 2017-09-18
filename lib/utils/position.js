import {isNum, int} from './shims'
import ReactDOM from 'react-dom'
import {getTouch, innerWidth, innerHeight, offsetXYFromParent, outerWidth, outerHeight} from './domFns'

export function getBoundPosition(draggable, x, y) {
    // If no bounds, short-circuit and move on
    if (!draggable.props.bounds) {
        return [x, y]
    }

    // Clone new bounds
    let {bounds} = draggable.props
    bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds)
    const node = ReactDOM.findDOMNode(draggable)

    if (typeof bounds === 'string') {
        const {ownerDocument} = node
        const ownerWindow = ownerDocument.defaultView
        let boundNode
        if (bounds === 'parent') {
            boundNode = node.parentNode
        } else {
            boundNode = ownerDocument.querySelector(bounds)
            if (!boundNode) {
                throw new Error('Bounds selector "' + bounds + '" could not find an element.')
            }
        }
        const nodeStyle = ownerWindow.getComputedStyle(node)
        const boundNodeStyle = ownerWindow.getComputedStyle(boundNode)
        // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
        bounds = {
            left: -node.offsetLeft + int(boundNodeStyle.paddingLeft) + int(nodeStyle.marginLeft),
            top: -node.offsetTop + int(boundNodeStyle.paddingTop) + int(nodeStyle.marginTop),
            right: innerWidth(boundNode) - outerWidth(node) - node.offsetLeft +
            int(boundNodeStyle.paddingRight) - int(nodeStyle.marginRight),
            bottom: innerHeight(boundNode) - outerHeight(node) - node.offsetTop +
            int(boundNodeStyle.paddingBottom) - int(nodeStyle.marginBottom)
        }
    }

    // Keep x and y below right and bottom limits...
    if (isNum(bounds.right)) {
        x = Math.min(x, bounds.right)
    }
    if (isNum(bounds.bottom)) {
        y = Math.min(y, bounds.bottom)
    }

    // But above left and top limits.
    if (isNum(bounds.left)) {
        x = Math.max(x, bounds.left)
    }
    if (isNum(bounds.top)) {
        y = Math.max(y, bounds.top)
    }

    return {x, y}
}

export function snapToGrid(grid, pendingX, pendingY) {
    const x = Math.round(pendingX / grid[0]) * grid[0]
    const y = Math.round(pendingY / grid[1]) * grid[1]
    return {x, y}
}

export function canDragX(draggable) {
    return draggable.props.axis === 'both' || draggable.props.axis === 'x'
}

export function canDragY(draggable) {
    return draggable.props.axis === 'both' || draggable.props.axis === 'y'
}

// Get {x, y} positions from event.
// Get {x, y} positions from event.
export function getControlPosition(e, touchIdentifier, draggableCore) {
    const touchObj = typeof touchIdentifier === 'number' ? getTouch(e, touchIdentifier) : null
    if (typeof touchIdentifier === 'number' && !touchObj) {
        return null
    } // not the right touch
    const node = ReactDOM.findDOMNode(draggableCore)
    // User can provide an offsetParent if desired.
    const offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body
    return offsetXYFromParent(touchObj || e, offsetParent)
}

// Create an data object exposed by <DraggableCore>'s events
export function createCoreData(draggable, x, y) {
    const state = draggable.state
    const isStart = !isNum(state.lastX)

    if (isStart) {
        // If this is our first move, use the x and y as last coords.
        return {
            node: ReactDOM.findDOMNode(draggable),
            deltaX: 0, deltaY: 0,
            lastX: x, lastY: y,
            x,
            y
        }
    } else {
        // Otherwise calculate proper values.
        return {
            node: ReactDOM.findDOMNode(draggable),
            deltaX: x - state.lastX, deltaY: y - state.lastY,
            lastX: state.lastX, lastY: state.lastY,
            x,
            y
        }
    }
}

export const createDraggableData = (draggable, coreData) => {
    const parent = coreData.node.parentElement
    return {
        node: coreData.node,
        ...getPositionInTheSameParent(draggable.state, coreData, parent),
        deltaX: coreData.deltaX,
        deltaY: coreData.deltaY,
        lastX: draggable.state.x,
        lastY: draggable.state.y
    }
}

export const createDraggableDataOnDrop = (draggable, coreData, event, offset) => {
    const parent = coreData.node.parentElement
    const isDropMadeToTheSameWidget = (parent === event.target)
    const position = isDropMadeToTheSameWidget ?
        getPositionInTheSameParent(draggable.state, coreData, parent) :
        getPositionRelativeToNewParent(event, draggable.state, offset)

    return {
        node: coreData.node,
        parentNode: isDropMadeToTheSameWidget ? coreData.node.parentElement : event.target,
        ...position
    }
}

const getPositionInTheSameParent = ({x, y}, {deltaX, deltaY}, parent) => ({
    x: getPosition(x, deltaX, parent.clientWidth),
    y: getPosition(y, deltaY, parent.clientHeight)
})

const getPositionRelativeToNewParent = (event, {x, y}, {offsetX, offsetY}) => {
    const newParent = event.target
    const rect = newParent.getBoundingClientRect()
    const mouseX = event.clientX - offsetX - rect.left
    const mouseY = event.clientY - offsetY - rect.top

    return {
        x: getPositionFromMouse(x, newParent.clientWidth, mouseX),
        y: getPositionFromMouse(y, newParent.clientHeight, mouseY)
    }
}

const getPositionFromMouse = (position, parentSize, mousePosition,) => {
    if (isNumeric(position)) {
        return mousePosition
    }

    const {value} = parseValue(position)

    if (value === 'px') {
        return mousePosition + value
    }

    return getPercentageValue(mousePosition, parentSize) + value
}

const getPosition = (position, delta, parentSize) => {
    if (isNumeric(position)) {
        return position
    }

    const {text, value} = parseValue(position)

    if (value === 'px') {
        return text + delta + value
    }

    return text + getPercentageValue(delta, parentSize) + value
}

const getPercentageValue = (value, parentValue) =>
    (parseFloat((value / parentValue * 100).toFixed(2)))

const isNumeric = (n) =>
    (!isNaN(parseFloat(n)) && isFinite(n))

const parseValue = (input) => {
    const text = input.replace(/[^-\d.]/g, '')
    const value = input.substring(text.length)
    return {text: parseFloat(text), value}
}

// A lot faster than stringify/parse
function cloneBounds(bounds) {
    return {
        left: bounds.left,
        top: bounds.top,
        right: bounds.right,
        bottom: bounds.bottom
    }
}
