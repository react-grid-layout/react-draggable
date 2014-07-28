# react-draggable [![Build Status](https://travis-ci.org/mzabriskie/react-draggable.svg?branch=master)](https://travis-ci.org/mzabriskie/react-draggable)

React draggable component

## Installing

```bash
npm install react-draggable
```

## Demo

http://mzabriskie.github.io/react-draggable/example/

## Example

```js
/** @jsx React.DOM */
var React = require('react'),
	Draggable = require('react-draggable');

var App = React.createClass({
	handleStart: function (event, ui) {
		console.log('Event: ', event);
		console.log('Position: ', ui.position);
	},

	handleDrag: function (event, ui) {
		console.log('Event: ', event);
        console.log('Position: ', ui.position);
	},

	handleStop: function (event, ui) {
		console.log('Event: ', event);
        console.log('Position: ', ui.position);
	},

	render: function () {
		return (
			// <Draggable/> transparently adds draggable interactivity
			// to whatever element is supplied as `this.props.children`.
			// Only a single element is allowed or an Error will be thrown.
			//
			// `axis` determines which axis the draggable can move.
			// - 'both' allows movement horizontally and vertically (default).
			// - 'x' limits movement to horizontal axis.
			// - 'y' limits movement to vertical axis.
			//
			// `handle` specifies a selector to be used as the handle that initiates drag.
			//
			// `cancel` specifies a selector to be used to prevent drag initialization.
			//
			// `zIndex` specifies the zIndex to use while dragging.
			//
			// `onStart` is called when dragging starts.
			//
			// `onDrag` is called while dragging.
			//
			// `onStop` is called when dragging stops.

			<Draggable
				axis="x"
				handle=".handle"
				zIndex={100}
				onStart={this.handleStart}
				onDrag={this.handleDrag}
				onStop={this.handleStop}>
				<div>
					<div className="handle">Drag from here</div>
					<div>Lorem ipsum...</div>
				</div>
			</Draggable>
		);
	}
});

React.renderComponent(<App/>, document.body);
```

## License

MIT