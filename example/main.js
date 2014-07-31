/** @jsx React.DOM */
var React = require('react'),
	Draggable = require('../lib/main');

var App = React.createClass({
	getInitialState: function () {
		return {
			position: {
				top: 0, left: 0
			}
		};
	},

	handleStart: function (e, ui) {
	},

	handleDrag: function (e, ui) {
		this.setState({
			position: ui.position
		});
	},

	handleStop: function (e, ui) {
	},

	render: function () {
		return (
			<div>
				<h1>React Draggable</h1>
				<p>
					<a href="https://github.com/mzabriskie/react-draggable/blob/master/example/main.js">Demo Source</a>
				</p>
				<Draggable zIndex={100}>
					<div className="box">I can be dragged anywhere</div>
				</Draggable>
				<Draggable axis="x" zIndex={100}>
					<div className="box cursor-x">I can only be dragged horizonally</div>
				</Draggable>
				<Draggable axis="y" zIndex={100}>
					<div className="box cursor-y">I can only be dragged vertically</div>
				</Draggable>
				<Draggable onDrag={this.handleDrag} zIndex={100}>
					<div className="box">
						<div>I track my position</div>
						<div>top: {this.state.position.top}, left: {this.state.position.left}</div>
					</div>
				</Draggable>
				<Draggable handle="strong" zIndex={100}>
					<div className="box no-cursor">
						<strong className="cursor">Drag here</strong>
						<div>You must click my handle to drag me</div>
					</div>
				</Draggable>
				<Draggable cancel="strong" zIndex={100}>
					<div className="box">
						<strong className="no-cursor">Can't drag here</strong>
						<div>Dragging here works</div>
					</div>
				</Draggable>
			</div>
		);
	}
});

React.renderComponent(<App/>, document.body);
