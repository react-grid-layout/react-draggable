# React-Draggable [![Build Status](https://travis-ci.org/mzabriskie/react-draggable.svg?branch=master)](https://travis-ci.org/mzabriskie/react-draggable)

A simple component for making elements draggable.

[View the Changelog](CHANGELOG.md)

### Demo

[View Demo](http://mzabriskie.github.io/react-draggable/example/)


### Installing

```bash
$ npm install react-draggable
```

If you aren't using browserify/webpack, a
[UMD version of react-draggable](dist/react-draggable.js) is available. It is updated per-release only.
This bundle is also what is loaded when installing from npm. It expects external `React` and `ReactDOM`.

If you want a UMD version of the latest `master` revision, you can generate it yourself from master by cloning this
repository and running `$ make`. This will create umd dist files in the `dist/` folder.

### Exports

The default export is `<Draggable>`. At the `.DraggableCore` property is `<DraggableCore>`. Here's how to use it:

```js
// ES6
import Draggable from 'react-draggable'; // The default
import {DraggableCore} from 'react-draggable'; // <DraggableCore>
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

// CommonJS
let Draggable = require('react-draggable');
let DraggableCore = Draggable.DraggableCore;
```

## Draggable

A `<Draggable>` element wraps an existing element and extends it with new event handlers and styles.
It does not create a wrapper element in the DOM.

Draggable items are moved using CSS Transforms. This allows items to be dragged regardless of their current
positioning (relative, absolute, or static). Elements can also be moved between drags without incident.

If the item you are dragging already has a CSS Transform applied, it will be overwritten by `<Draggable>`. Use
an intermediate wrapper (`<Draggable><span>...</span></Draggable>`) in this case.


### Draggable API

The `<Draggable/>` component transparently adds draggable to whatever element is supplied as `this.props.children`.
**Note**: Only a single element is allowed or an Error will be thrown.

For the `<Draggable/>` component to correctly attach itself to its child, the child element must provide support for the following props:
- `style` is used to give the transform css to the child.
- `className` is used to apply the proper classes to the object being dragged.
- `onMouseDown` is used along with onMouseUp to keep track of dragging state.
- `onMouseUp` is used along with onMouseDown to keep track of dragging state.
- `onTouchStart` is used along with onTouchEnd to keep track of dragging state.
- `onTouchEnd` is used along with onTouchStart to keep track of dragging state.

React.DOM elements support the above six properties by default, so you may use those elements as children without any changes. If you wish to use a React component you created, you might find [this React page](https://facebook.github.io/react/docs/transferring-props.html) helpful.

Props:

```js
{
// Called when dragging starts. If `false` is returned from this method,
// dragging will cancel.
// These callbacks are called with the arity:
// (event: Event,
//  {
//     position: {left: number, top: number},
//     deltaX: number,
//     deltaY: number
//  }
// )
onStart: Function,

// Called while dragging.
onDrag: Function,

// Called when dragging stops.
onStop: Function,

// Called whenever the user mouses down. Called regardless of handle or
//  disabled status.
onMouseDown: Function,

// Specifies the `x` and `y` that the dragged item should start at.
// This is generally not necessary to use (you can use absolute or relative
// positioning of the child directly), but can be helpful for uniformity in
// your callbacks and with css transforms.
start: {x: number, y: number},

// If true, will not call any drag handlers.
disabled: boolean,

// Specifies a selector to be used to prevent drag initialization.
// Example: '.body'
cancel: string,

// Specifies a selector to be used as the handle that initiates drag.
// Example: '.handle'
handle: string,

// If set to `true`, will allow dragging on non left-button clicks.
allowAnyClick: boolean,

// Determines which axis the draggable can move. Accepted values:
// - `both` allows movement horizontally and vertically (default).
// - `x` limits movement to horizontal axis.
// - `y` limits movement to vertical axis.
axis: string,

// Specifies movement boundaries. Accepted values:
// - `parent` restricts movement within the node's offsetParent
//    (nearest node with position relative or absolute), or
// - An object with `left, top, right, and bottom` properties.
//   These indicate how far in each direction the draggable
//   can be moved.
bounds: {left: number, top: number, right: number, bottom: number} | string,

// Specifies the x and y that dragging should snap to.
grid: [number, number],

// Specifies the zIndex to use while dragging.
zIndex: number
}
```


Note that sending `className`, `style`, or `transform` as properties will error - set them on the child element
directly.


### Draggable Usage

```js
var React = require('react'),;
var ReactDOM = require('react-dom');
var Draggable = require('react-draggable');

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
			<Draggable
				axis="x"
				handle=".handle"
				start={{x: 0, y: 0}}
				grid={[25, 25]}
				zIndex={100}
				onStart={this.handleStart}
				onDrag={this.handleDrag}
				onStop={this.handleStop}>
				<div>
					<div className="handle">Drag from here</div>
					<div>This readme is really dragging on...</div>
				</div>
			</Draggable>
		);
	}
});

ReactDOM.render(<App/>, document.body);
```

## <DraggableCore>

For users that require more control, a `<DraggableCore>` element is available. This is useful for more programmatic
usage of the element. See [React-Resizable](https://github.com/STRML/react-resizable) and
[React-Grid-Layout](https://github.com/STRML/react-grid-layout) for some examples of this.

`<DraggableCore>` is a useful building block for other libraries that simply want to abstract browser-specific
quirks and receive callbacks when a user attempts to move an element. It does not set styles or transforms
on itself.

### DraggableCore API

`<DraggableCore>` takes all of the above `<Draggable>` options, with the exception of:

* `axis`
* `bounds`
* `start`
* `zIndex`

Drag callbacks are called with the following parameters:

```js
(
 event: Event,
 ui:{
      node: Node
      position:
        {
        	// lastX + deltaX === clientX
          deltaX: number, deltaY: number,
          lastX: number, lastY: number,
          clientX: number, clientY: number
        }
    }
)
```

----

### Contributing

- Fork the project
- Run the project in development mode: `$ npm run dev`
- Make changes.
- Add appropriate tests
- `$ npm test`
- If tests don't pass, make them pass.
- Update README with appropriate docs.
- Commit and PR

### Release checklist

- Update CHANGELOG
- `make release-patch`, `make release-minor`, or `make-release-major`
- `make publish`

### License

MIT
