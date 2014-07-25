'use strict';

/** @jsx React.DOM */
var React = require('react/addons'),
	invariant = require('react/lib/invariant'),
	emptyFunction = require('react/lib/emptyFunction');

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
		 * 	    	 	<Draggable handle="h2">
		 * 	    	 	  <div>
		 * 	    	 	      <h2>Click me to drag</h2>
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

	getDefaultProps: function () {
		return {
			axis: 'both',
			handle: null,
			onStart: emptyFunction,
			onDrag: emptyFunction,
			onStop: emptyFunction
		};
	},

	getInitialState: function () {
		return {
			startX: 0, startY: 0,
			offsetX: 0, offsetY: 0,
			clientX: 0, clientY: 0
		};
	},

	componentWillMount: function () {
		invariant(
			React.Children.count(this.props.children) === 1,
			'There should only be a single child element within Draggable.'
		);
	},

	handleMouseDown: function (e) {
		var node = this.getDOMNode();

		if (this.props.handle && !matchesSelector(e.target, this.props.handle)) {
			return;
		}

		this.setState({
			offsetX: e.clientX,
			offsetY: e.clientY,
			startX: parseInt(node.style.left, 10) || 0,
			startY: parseInt(node.style.top, 10) || 0
		});

		this.props.onStart(e, createUIEvent(this));

		window.addEventListener('mousemove', this.handleMouseMove);
	},

	handleMouseUp: function (e) {
		this.props.onStop(e, createUIEvent(this));

		window.removeEventListener('mousemove', this.handleMouseMove);
	},

	handleMouseMove: function (e) {
		this.setState({
			clientX: (this.state.startX + (e.clientX - this.state.offsetX)),
			clientY: (this.state.startY + (e.clientY - this.state.offsetY))
		});

		this.props.onDrag(e, createUIEvent(this));
	},

	render: function () {
		var style = {
			top: canDragY(this) ? this.state.clientY : this.state.startY,
			left: canDragX(this) ? this.state.clientX : this.state.startX
		};

		// Reuse the child provided
		// This makes it flexible to use whatever element is wanted (div, ul, etc)
		var child = null;
		React.Children.forEach(this.props.children, function (c) {
			if (child === null) {
				child = React.addons.cloneWithProps(c, {
					style: style,
					className: 'react-draggable',
					onMouseUp: this.handleMouseUp,
					onMouseDown: this.handleMouseDown
				});
			}
		}, this);

		return child;
	}
});
