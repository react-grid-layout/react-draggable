'use strict';

/** @jsx React.DOM */
var React = require('react/addons');
var invariant = require('react/lib/invariant');
var emptyFunction = require('react/lib/emptyFunction');

function createUIEvent(draggable) {
	return {
		position: {
			top: draggable.state.clientY,
			left: draggable.state.clientX
		}
	};
}

function canDragY(draggable) {
	return draggable.props.axis === 'both' ||
			draggable.props.axis === 'y';
}

function canDragX(draggable) {
	return draggable.props.axis === 'both' ||
			draggable.props.axis === 'x';
}

function isFunction(fn) {
	return typeof fn === 'function';
}

function matchesSelector(el, selector) {
	if (isFunction(el.matches)) {
		return el.matches(selector);
	} else if (isFunction(el.webkitMatchesSelector)) {
		return el.webkitMatchesSelector(selector);
	} else if (isFunction(el.mozMatchesSelector)) {
		return el.mozMatchesSelector(selector);
	} else if (isFunction(el.msMatchesSelector)) {
		return el.msMatchesSelector(selector);
	} else if (isFunction(el.oMatchesSelector)) {
		return el.oMatchesSelector(selector);
	} else if (isFunction(el.webkitMatchesSelector)) {
		return el.webkitMatchesSelector(selector);
	}
}

function addEvent(el, event, handler) {
	if (!el) { return; }
	if (el.attachEvent) {
		el.attachEvent('on' + event, handler);
	} else if (el.addEventListener) {
		el.addEventListener(event, handler, true);
	} else {
		el['on' + event] = handler;
	}
}

function removeEvent(el, event, handler) {
	if (!el) { return; }
	if (el.detachEvent) {
		el.detachEvent('on' + event, handler);
	} else if (el.removeEventListener) {
		el.removeEventListener(event, handler, true);
	} else {
		el['on' + event] = null;
	}
}

module.exports = React.createClass({
	displayName: 'Draggable',

	propTypes: {
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
		 * `handle` specifies a selector to be used as the handle that initiates drag.
		 *
		 * Example:
		 *
		 * ```jsx
		 * 	var App = React.createClass({
		 * 	    render: function () {
		 * 	    	return (
		 * 	    	 	<Draggable handle=".handle">
		 * 	    	 	  <div>
		 * 	    	 	      <div className="handle">Click me to drag</div>
		 * 	    	 	      <div>This is some other content</div>
		 * 	    	 	  </div>
		 * 	    		</Draggable>
		 * 	    	);
		 * 	    }
		 * 	});
		 * ```
		 */
		handle: React.PropTypes.string,

		/**
		 * `cancel` specifies a selector to be used to prevent drag initialization.
		 *
		 * Example:
		 *
		 * ```jsx
		 * 	var App = React.createClass({
		 * 	    render: function () {
		 * 	        return(
		 * 	            <Draggable cancel=".cancel">
		 * 	                <div>
		 * 	                	<div className="cancel">You can't drag from here</div>
		 *						<div>Dragging here works fine</div>
		 * 	                </div>
		 * 	            </Draggable>
		 * 	        );
		 * 	    }
		 * 	});
		 * ```
		 */
		cancel: React.PropTypes.string,

		/**
		 * `grid` specifies the x and y that dragging should snap to.
		 *
		 * Example:
		 *
		 * ```jsx
		 * 	var App = React.createClass({
		 * 	    render: function () {
		 * 	        return (
		 * 	            <Draggable grid={[25, 25]}>
		 * 	                <div>I snap to a 25 x 25 grid</div>
		 * 	            </Draggable>
		 * 	        );
		 * 	    }
		 * 	});
		 * ```
		 */
		grid: React.PropTypes.arrayOf(React.PropTypes.number),

		/**
		 * `zIndex` specifies the zIndex to use while dragging.
		 *
		 * Example:
		 *
		 * ```jsx
		 * 	var App = React.createClass({
		 * 	    render: function () {
		 * 	        return (
		 * 	            <Draggable zIndex={100}>
		 * 	                <div>I have a zIndex</div>
		 * 	            </Draggable>
		 * 	        );
		 * 	    }
		 * 	});
		 * ```
		 */
		zIndex: React.PropTypes.number,

		/**
		 * Called when dragging starts.
		 *
		 * Example:
		 *
		 * ```js
		 *	function (event, ui) {}
		 * ```
		 *
		 * `event` is the Event that was triggered.
		 * `ui` is an object:
		 *
		 * ```js
		 *	{
		 *		position: {top: 0, left: 0}
		 *	}
		 * ```
		 */
		onStart: React.PropTypes.func,

		/**
		 * Called while dragging.
		 *
		 * Example:
		 *
		 * ```js
		 *	function (event, ui) {}
		 * ```
		 *
		 * `event` is the Event that was triggered.
		 * `ui` is an object:
		 *
		 * ```js
		 *	{
		 *		position: {top: 0, left: 0}
		 *	}
		 * ```
		 */
		onDrag: React.PropTypes.func,

		/**
		 * Called when dragging stops.
		 *
		 * Example:
		 *
		 * ```js
		 *	function (event, ui) {}
		 * ```
		 *
		 * `event` is the Event that was triggered.
		 * `ui` is an object:
		 *
		 * ```js
		 *	{
		 *		position: {top: 0, left: 0}
		 *	}
		 * ```
		 */
		onStop: React.PropTypes.func
	},

	componentWillUnmount: function() {
		// Remove any leftover event handlers
		removeEvent(window, 'mousemove', this.handleMouseMove);
		removeEvent(window, 'mouseup', this.handleMouseUp);
	},

	getDefaultProps: function () {
		return {
			axis: 'both',
			handle: null,
			cancel: null,
			grid: null,
			zIndex: NaN,
			onStart: emptyFunction,
			onDrag: emptyFunction,
			onStop: emptyFunction
		};
	},

	getInitialState: function () {
		return {
			// Whether or not currently dragging
			dragging: false,

			// Start top/left of this.getDOMNode()
			startX: 0, startY: 0,

			// Offset between start top/left and mouse top/left
			offsetX: 0, offsetY: 0,

			// Current top/left of this.getDOMNode()
			clientX: 0, clientY: 0
		};
	},

	handleMouseDown: function (e) {
		var node = this.getDOMNode();

		// Short circuit if handle or cancel prop was provided and selector doesn't match
		if ((this.props.handle && !matchesSelector(e.target, this.props.handle)) ||
			(this.props.cancel && matchesSelector(e.target, this.props.cancel))) {
			return;
		}

		// Initiate dragging
		this.setState({
			dragging: true,
			offsetX: e.clientX,
			offsetY: e.clientY,
			startX: parseInt(node.style.left, 10) || 0,
			startY: parseInt(node.style.top, 10) || 0
		});

		// Call event handler
		this.props.onStart(e, createUIEvent(this));

		// Add event handlers
		addEvent(window, 'mousemove', this.handleMouseMove);
		addEvent(window, 'mouseup', this.handleMouseUp);
	},

	handleMouseUp: function (e) {
		// Short circuit if not currently dragging
		if (!this.state.dragging) {
			return;
		}

		// Turn off dragging
		this.setState({
			dragging: false
		});

		// Call event handler
		this.props.onStop(e, createUIEvent(this));

		// Remove event handlers
		removeEvent(window, 'mousemove', this.handleMouseMove);
		removeEvent(window, 'mouseup', this.handleMouseUp);
	},

	handleMouseMove: function (e) {
		// Calculate top and left
		var clientX = (this.state.startX + (e.clientX - this.state.offsetX));
		var clientY = (this.state.startY + (e.clientY - this.state.offsetY));

		// Snap to grid if prop has been provided
		if (Array.isArray(this.props.grid)) {
			clientX = Math.abs(clientX - this.state.clientX) >= this.props.grid[0]
					? clientX
					: this.state.clientX;

			clientY = Math.abs(clientY - this.state.clientY) >= this.props.grid[1]
					? clientY
					: this.state.clientY;
		}

		// Update top and left
		this.setState({
			clientX: clientX,
			clientY: clientY
		});

		// Call event handler
		this.props.onDrag(e, createUIEvent(this));
	},

	render: function () {
		var style = {
			// Set top if vertical drag is enabled
			top: canDragY(this)
				? this.state.clientY
				: this.state.startY,

			// Set left if horizontal drag is enabled
			left: canDragX(this)
				? this.state.clientX
				: this.state.startX
		};

		// Set zIndex if currently dragging and prop has been provided
		if (this.state.dragging && !isNaN(this.props.zIndex)) {
			style.zIndex = this.props.zIndex;
		}

		// Reuse the child provided
		// This makes it flexible to use whatever element is wanted (div, ul, etc)
		return React.addons.cloneWithProps(React.Children.only(this.props.children), {
			style: style,
			className: 'react-draggable',
			onMouseUp: this.handleMouseUp,
			onMouseDown: this.handleMouseDown
		});
	}
});
