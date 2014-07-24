/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
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

		window.addEventListener('mousemove', this.handleMouseMove);
	},

	handleMouseUp: function (e) {
		window.removeEventListener('mousemove', this.handleMouseMove);
	},

	handleMouseMove: function (e) {
		this.setState({
			clientX: (this.state.startX + (e.clientX - this.state.offsetX)),
			clientY: (this.state.startY + (e.clientY - this.state.offsetY))
		});
	},

	render: function () {
		var style = {
			top: this.state.clientY,
			left: this.state.clientX
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
