/** @jsx React.DOM */
var React = require('react'),
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

module.exports = React.createClass({
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

	handleMouseDown: function (e) {
		var node = this.getDOMNode();
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

		return (
			<div style={style}
				className="react-draggable"
				onMouseUp={this.handleMouseUp}
				onMouseDown={this.handleMouseDown}>
				{this.props.children}
			</div>
		);
	}
});
