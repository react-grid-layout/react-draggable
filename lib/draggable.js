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

	getDefaultProps: function () {
		return {
			axis: 'both',
			handle: null,
			cancel: null,
			zIndex: NaN,
			onStart: emptyFunction,
			onDrag: emptyFunction,
			onStop: emptyFunction
		};
	},

	getInitialState: function () {
		return {
			dragging: false,
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

		if ((this.props.handle && !matchesSelector(e.target, this.props.handle)) ||
			(this.props.cancel && matchesSelector(e.target, this.props.cancel))) {
			return;
		}

		this.setState({
			dragging: true,
			offsetX: e.clientX,
			offsetY: e.clientY,
			startX: parseInt(node.style.left, 10) || 0,
			startY: parseInt(node.style.top, 10) || 0
		});

		this.props.onStart(e, createUIEvent(this));

		addEvent(window, 'mousemove', this.handleMouseMove);
		addEvent(window, 'mouseup', this.handleMouseUp);
	},

	handleMouseUp: function (e) {
		if (!this.state.dragging) {
			return;
		}

		this.setState({
			dragging: false
		});

		this.props.onStop(e, createUIEvent(this));

		removeEvent(window, 'mousemove', this.handleMouseMove);
		removeEvent(window, 'mouseup', this.handleMouseUp);
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

		if (this.state.dragging && !isNaN(this.props.zIndex)) {
			style.zIndex = this.props.zIndex;
		}

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
