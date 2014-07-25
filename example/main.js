/** @jsx React.DOM */
var React = require('react'),
	Draggable = require('../lib/main');

var App = React.createClass({
	handleStart: function (e, ui) {
		console.log('start');
	},

	handleDrag: function (e, ui) {
		console.log('drag');
	},

	handleStop: function () {
		console.log('stop');
	},

	render: function () {
		return (
			<div>
				<h1>React Draggable</h1>
				<p>
					<a href="https://github.com/mzabriskie/react-draggable/blob/master/example/main.js">Demo Source</a>
				</p>
				<Draggable
					onStart={this.handleStart}
					onDrag={this.handleDrag}
					onStop={this.handleStop}>
					<div className="box">I can be dragged anywhere</div>
				</Draggable>
				<Draggable
					axis='x'
					onStart={this.handleStart}
					onDrag={this.handleDrag}
					onStop={this.handleStop}>
					<div className="box">I can only be dragged horizonally</div>
				</Draggable>
				<Draggable
					axis='y'
					onStart={this.handleStart}
					onDrag={this.handleDrag}
					onStop={this.handleStop}>
					<div className="box">I can only be dragged vertically</div>
				</Draggable>
			</div>
		);
	}
});

React.renderComponent(<App/>, document.body);
