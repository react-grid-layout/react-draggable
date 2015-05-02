# react-draggable [![Build Status](https://travis-ci.org/mzabriskie/react-draggable.svg?branch=master)](https://travis-ci.org/mzabriskie/react-draggable)

A simple component for making elements draggable.

[View the Changelog](CHANGELOG.md)

## Demo

http://mzabriskie.github.io/react-draggable/example/


## Installing

```bash
$ npm install react-draggable
# or
$ bower install react-draggable
```

## Details

A `<Draggable>` element wraps an existing element and extends it with new event handlers and styles.
It does not create a wrapper element in the DOM.

Draggable items are moved using CSS Transforms. This allows items to be dragged regardless of their current
positioning (relative, absolute, or static). Elements can also be moved between drags without incident.

If the item you are dragging already has a CSS Transform applied, it will be overwritten by `<Draggable>`. Use
an intermediate wrapper (`<Draggable><span>...</span></Draggable>`) in this case.

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
			// The element is moved from its current position using absolute positioning.
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
			// `grid` specifies the x and y that dragging should snap to.
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
				grid={[25, 25]}
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

## Contributing

- Fork the project
- `$ npm install`
- Make changes.
- Run a static server in this folder to see your changes.
  For example: `$ npm install -g static-server; static-server .` and open
  http://localhost:9080/example.index.html
- Run webpack in development mode to recompile changes as you make them:
  `$ npm run dev`
- Add appropriate tests
- `$ npm test`
- If tests don't pass, make them pass.
- Update README with appropriate docs.
- Don't include `/dist` changes. These files are updated per-release.
- Commit and PR

## Release checklist

- Update CHANGELOG
- Update version in `bower.json`
- Update version in `package.json`
- Run build: `$ npm run build`
- Commit, tag, push
- `npm publish`

## License

MIT
