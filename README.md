# React-Draggable

[![CI](https://github.com/react-grid-layout/react-draggable/actions/workflows/ci.yml/badge.svg)](https://github.com/react-grid-layout/react-draggable/actions/workflows/ci.yml)
[![npm downloads](https://img.shields.io/npm/dt/react-draggable.svg?maxAge=2592000)](http://npmjs.com/package/react-draggable)
[![gzip size](http://img.badgesize.io/https://npmcdn.com/react-draggable/build/web/react-draggable.min.js?compression=gzip)]()
[![version](https://img.shields.io/npm/v/react-draggable.svg)]()

<p align="center">
  <img src="https://user-images.githubusercontent.com/6365230/95649276-f3a02480-0b06-11eb-8504-e0614a780ba4.gif" />
</p>

A simple component for making elements draggable.

```jsx
<Draggable>
  <div>I can now be moved around!</div>
</Draggable>
```

- [Demo](http://react-grid-layout.github.io/react-draggable/example/)
- [Changelog](CHANGELOG.md)

| Version | Compatibility   |
| ------- | --------------- |
| 4.x     | React 16.3 - 19 |
| 3.x     | React 15 - 16   |
| 2.x     | React 0.14 - 15 |

---

## Table of Contents

- [Installing](#installing)
- [Quick Start](#quick-start)
- [Exports](#exports)
- [Draggable](#draggable)
- [Draggable API](#draggable-api)
- [Using nodeRef](#using-noderef)
- [Controlled vs. Uncontrolled](#controlled-vs-uncontrolled)
- [DraggableCore](#draggablecore)
- [DraggableCore API](#draggablecore-api)
- [Contributing](#contributing)

## Installing

```bash
npm install react-draggable
# or
yarn add react-draggable
```

TypeScript types are included.

### UMD Build

A [UMD version](build/web/react-draggable.min.js) is available for use in `<script>` tags or AMD loaders. It expects `React` and `ReactDOM` to be available as globals.

To generate a UMD build from `master`, clone the repository and run `make build`.

## Quick Start

```jsx
import React, { useRef } from 'react';
import Draggable from 'react-draggable';

function App() {
  const nodeRef = useRef(null);

  const handleDrag = (e, data) => {
    console.log('Dragging:', data.x, data.y);
  };

  return (
    <Draggable nodeRef={nodeRef} onDrag={handleDrag}>
      <div ref={nodeRef}>Drag me!</div>
    </Draggable>
  );
}
```

## Exports

```js
// ES Modules
import Draggable from 'react-draggable'; // The default
import { DraggableCore } from 'react-draggable'; // <DraggableCore>
import Draggable, { DraggableCore } from 'react-draggable'; // Both

// CommonJS
const Draggable = require('react-draggable');
const { DraggableCore } = require('react-draggable');
```

## `<Draggable>`

A `<Draggable>` element wraps an existing element and extends it with new event handlers and styles. It does not create a wrapper element in the DOM.

Draggable items are moved using CSS Transforms. This allows items to be dragged regardless of their current positioning (relative, absolute, or static). Elements can also be moved between drags without incident.

If the item you are dragging already has a CSS Transform applied, it will be overwritten by `<Draggable>`. Use an intermediate wrapper (`<Draggable><span>...</span></Draggable>`) in this case.

### Draggable Usage

View the [Demo](http://react-grid-layout.github.io/react-draggable/example/) and its [source](/example/example.js) for more examples.

```jsx
import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';

function App() {
  const nodeRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      axis="x"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      grid={[25, 25]}
      scale={1}
      onDrag={handleDrag}
    >
      <div ref={nodeRef}>
        <div className="handle">Drag from here</div>
        <div>
          Position: ({position.x}, {position.y})
        </div>
      </div>
    </Draggable>
  );
}
```

### Draggable API

The `<Draggable/>` component transparently adds draggability to its children.

**Note**: Only a single child is allowed or an Error will be thrown.

For the `<Draggable/>` component to correctly attach itself to its child, the child element must support the following props:

- `style` - used to apply the transform CSS
- `className` - used to apply dragging classes
- `onMouseDown`, `onMouseUp`, `onTouchStart`, `onTouchEnd` - used to track dragging state

React DOM elements support these by default. For custom components, ensure you spread props to the underlying DOM element.

#### `<Draggable>` Props:

```js
//
// Types:
//
type DraggableEventHandler = (e: Event, data: DraggableData) => void | false;
type DraggableData = {
  node: HTMLElement,
  // lastX + deltaX === x
  x: number,
  y: number,
  deltaX: number,
  deltaY: number,
  lastX: number,
  lastY: number,
};

//
// Props:
//
{
  // If set to `true`, will allow dragging on non left-button clicks.
  allowAnyClick: boolean,

  // Default `false`. If set to `true`, the 'touchstart' event will not be
  // prevented, allowing scrolling inside containers. Consider using
  // 'handle' / 'cancel' props instead when possible.
  // See https://github.com/react-grid-layout/react-draggable/issues/728
  allowMobileScroll: boolean,

  // Determines which axis the draggable can move. This only affects
  // flushing to the DOM. Callbacks will still include all values.
  // Accepted values:
  // - `both` allows movement horizontally and vertically (default).
  // - `x` limits movement to horizontal axis.
  // - `y` limits movement to vertical axis.
  // - 'none' stops all movement.
  axis: 'both' | 'x' | 'y' | 'none',

  // Specifies movement boundaries. Accepted values:
  // - `parent` restricts movement within the node's offsetParent
  //    (nearest node with position relative or absolute), or
  // - a selector, restricts movement within the targeted node
  // - An object with `left, top, right, and bottom` properties.
  //   These indicate how far in each direction the draggable
  //   can be moved.
  bounds: { left?: number, top?: number, right?: number, bottom?: number } | string,

  // Specifies a selector to be used to prevent drag initialization.
  // The string is passed to Element.matches, so multiple selectors
  // are supported: `.first, .second`.
  // Example: '.body'
  cancel: string,

  // Class names for draggable UI.
  // Defaults: 'react-draggable', 'react-draggable-dragging', 'react-draggable-dragged'
  defaultClassName: string,
  defaultClassNameDragging: string,
  defaultClassNameDragged: string,

  // Specifies the `x` and `y` that the dragged item should start at.
  // This is generally not necessary to use (you can use absolute or relative
  // positioning of the child directly), but can be helpful for uniformity in
  // your callbacks and with css transforms.
  defaultPosition: { x: number, y: number },

  // If true, will not call any drag handlers.
  disabled: boolean,

  // Default `true`. Adds "user-select: none" while dragging to avoid selecting text.
  enableUserSelectHack: boolean,

  // Specifies the x and y that dragging should snap to.
  grid: [number, number],

  // Specifies a selector to be used as the handle that initiates drag.
  // Example: '.handle'
  handle: string,

  // If desired, you can provide your own offsetParent for drag calculations.
  // By default, we use the Draggable's offsetParent. This can be useful for elements
  // with odd display types or floats.
  offsetParent: HTMLElement,

  // Called whenever the user mouses down. Called regardless of handle or
  // disabled status.
  onMouseDown: (e: MouseEvent) => void,

  // Called when dragging starts. If `false` is returned, the action will cancel.
  onStart: DraggableEventHandler,

  // Called while dragging.
  onDrag: DraggableEventHandler,

  // Called when dragging stops.
  onStop: DraggableEventHandler,

  // Ref to the DOM node being dragged. Required for React Strict Mode.
  // See "Using nodeRef" section below.
  nodeRef: React.RefObject<HTMLElement>,

  // If this property is present, the item becomes 'controlled' and is not
  // responsive to user input. Use `position` if you need direct control
  // of the element.
  position: { x: number, y: number },

  // A position offset to start with. Differs from `defaultPosition` in that
  // it does not affect the position returned in draggable callbacks, and
  // accepts strings like `{x: '10%', y: '10%'}`.
  positionOffset: { x: number | string, y: number | string },

  // Specifies the scale of the canvas you are dragging on. This allows
  // correct drag deltas when zoomed in/out via a transform or matrix
  // in the parent of this element.
  scale: number
}
```

Note that sending `className`, `style`, or `transform` as properties will error - set them on the child element directly.

## Using nodeRef

To avoid `ReactDOM.findDOMNode()` deprecation warnings in React Strict Mode, pass a `nodeRef` prop:

```jsx
import React, { useRef } from 'react';
import Draggable from 'react-draggable';

function App() {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef}>Drag me!</div>
    </Draggable>
  );
}
```

For custom components, you need to forward both the ref and props to the underlying DOM element:

```jsx
import React, { useRef, forwardRef } from 'react';
import Draggable from 'react-draggable';

const MyComponent = forwardRef((props, ref) => (
  <div {...props} ref={ref}>
    Draggable content
  </div>
));

function App() {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef}>
      <MyComponent ref={nodeRef} />
    </Draggable>
  );
}
```

`nodeRef` is also available on `<DraggableCore>`.

## Controlled vs. Uncontrolled

`<Draggable>` is a 'batteries-included' component that manages its own state. If you want complete control over the lifecycle, use `<DraggableCore>`.

For programmatic repositioning while still using `<Draggable>`'s state management, pass the `position` prop:

```jsx
function ControlledDraggable() {
  const nodeRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <>
      <button onClick={resetPosition}>Reset</button>
      <Draggable nodeRef={nodeRef} position={position} onDrag={handleDrag}>
        <div ref={nodeRef}>Drag me or reset!</div>
      </Draggable>
    </>
  );
}
```

When `position` is defined, `<Draggable>` uses the provided position instead of its internal state. You should use at least an `onDrag` or `onStop` handler to synchronize state.

To disable dragging while controlled, pass `disabled={true}`.

## `<DraggableCore>`

For users that require absolute control, `<DraggableCore>` is available. This is useful as an abstraction over touch and mouse events, but with full control. `<DraggableCore>` has no internal state.

See [React-Resizable](https://github.com/react-grid-layout/react-resizable) and [React-Grid-Layout](https://github.com/react-grid-layout/react-grid-layout) for usage examples.

`<DraggableCore>` is a building block for libraries that want to abstract browser-specific quirks and receive callbacks when a user attempts to move an element. It does not set styles or transforms on itself, so callbacks must be attached to be useful.

### DraggableCore API

`<DraggableCore>` takes a limited subset of options:

```js
{
  allowAnyClick: boolean,
  allowMobileScroll: boolean,
  cancel: string,
  disabled: boolean,
  enableUserSelectHack: boolean,
  offsetParent: HTMLElement,
  grid: [number, number],
  handle: string,
  nodeRef: React.RefObject<HTMLElement>,
  onStart: DraggableEventHandler,
  onDrag: DraggableEventHandler,
  onStop: DraggableEventHandler,
  onMouseDown: (e: MouseEvent) => void,
  scale: number
}
```

Note that there is no start position. `<DraggableCore>` simply calls drag handlers with position data (as inferred from the underlying MouseEvent) and deltas. It is up to the parent to set actual positions on `<DraggableCore>`.

Drag callbacks (`onStart`, `onDrag`, `onStop`) are called with the [same arguments as `<Draggable>`](#draggable-api).

---

## Contributing

- Fork the project
- Run the project in development mode: `yarn dev`
- Make changes
- Add appropriate tests
- `yarn test`
- If tests don't pass, make them pass
- Update README with appropriate docs
- Commit and PR

### Release checklist

- Update CHANGELOG
- `make release-patch`, `make release-minor`, or `make release-major`
- `make publish`

## License

MIT
