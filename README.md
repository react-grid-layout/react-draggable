# React-Draggable

[![CI](https://github.com/react-grid-layout/react-draggable/actions/workflows/ci.yml/badge.svg)](https://github.com/react-grid-layout/react-draggable/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/react-draggable.svg)](https://www.npmjs.com/package/react-draggable)
[![npm downloads](https://img.shields.io/npm/dt/react-draggable.svg)](https://www.npmjs.com/package/react-draggable)
[![gzip size](https://img.badgesize.io/https://npmcdn.com/react-draggable/build/web/react-draggable.min.js?compression=gzip)](https://npmcdn.com/react-draggable/build/web/react-draggable.min.js)

A simple component for making elements draggable.

[**[Demo](https://react-grid-layout.github.io/react-draggable/) | [Changelog](CHANGELOG.md)**]

<p align="center">
  <img src="https://user-images.githubusercontent.com/6365230/95649276-f3a02480-0b06-11eb-8504-e0614a780ba4.gif" />
</p>

```jsx
<Draggable>
  <div>I can now be moved around!</div>
</Draggable>
```

## Table of Contents

- [Installation](#installation)
- [Compatibility](#compatibility)
- [Quick Start](#quick-start)
- [API](#api)
  - [Draggable](#draggable)
  - [DraggableCore](#draggablecore)
- [Using nodeRef](#using-noderef)
- [Controlled vs. Uncontrolled](#controlled-vs-uncontrolled)
- [Content Security Policy](#content-security-policy)
- [Contributing](#contributing)

## Installation

```bash
npm install react-draggable
# or
yarn add react-draggable
```

```js
// ES Modules
import Draggable from 'react-draggable';
import { DraggableCore } from 'react-draggable';

// CommonJS
const Draggable = require('react-draggable');
const { DraggableCore } = require('react-draggable');
```

TypeScript types are included.

## Compatibility

| Version | React Version |
|---------|---------------|
| 4.x     | 16.3+         |
| 3.x     | 15 - 16       |
| 2.x     | 0.14 - 15     |

## Quick Start

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

View the [Demo](https://react-grid-layout.github.io/react-draggable/) and its [source](/example/example.js) for more examples.

## API

### `<Draggable>`

A `<Draggable>` element wraps an existing element and extends it with new event handlers and styles. It does not create a wrapper element in the DOM.

Draggable items are moved using CSS Transforms. This allows items to be dragged regardless of their current positioning (relative, absolute, or static). Elements can also be moved between drags without incident.

If the item you are dragging already has a CSS Transform applied, it will be overwritten by `<Draggable>`. Use an intermediate wrapper (`<Draggable><span>...</span></Draggable>`) in this case.

#### Props

```ts
type DraggableEventHandler = (e: Event, data: DraggableData) => void | false;

type DraggableData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number,
};
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowAnyClick` | `boolean` | `false` | Allow dragging on non-left-button clicks |
| `allowMobileScroll` | `boolean` | `false` | Don't prevent `touchstart`, allowing scrolling inside containers |
| `axis` | `'both' \| 'x' \| 'y' \| 'none'` | `'both'` | Axis to allow dragging on |
| `bounds` | `object \| string` | - | Restrict movement. Use `'parent'`, a CSS selector, or `{left, top, right, bottom}` |
| `cancel` | `string` | - | CSS selector for elements that should not initiate drag |
| `defaultClassName` | `string` | `'react-draggable'` | Class name applied to the element |
| `defaultClassNameDragging` | `string` | `'react-draggable-dragging'` | Class name applied while dragging |
| `defaultClassNameDragged` | `string` | `'react-draggable-dragged'` | Class name applied after drag |
| `defaultPosition` | `{x: number, y: number}` | `{x: 0, y: 0}` | Starting position |
| `disabled` | `boolean` | `false` | Disable dragging |
| `enableUserSelectHack` | `boolean` | `true` | Add `user-select: none` while dragging |
| `grid` | `[number, number]` | - | Snap to grid `[x, y]` |
| `handle` | `string` | - | CSS selector for the drag handle |
| `nodeRef` | `React.RefObject` | - | Ref to the DOM element. Required for React Strict Mode |
| `nonce` | `string` | - | CSP nonce for the injected user-select `<style>` element (see [Content Security Policy](#content-security-policy)) |
| `offsetParent` | `HTMLElement` | - | Custom offsetParent for drag calculations |
| `onDrag` | `DraggableEventHandler` | - | Called while dragging |
| `onMouseDown` | `(e: MouseEvent) => void` | - | Called on mouse down |
| `onStart` | `DraggableEventHandler` | - | Called when dragging starts. Return `false` to cancel |
| `onStop` | `DraggableEventHandler` | - | Called when dragging stops |
| `position` | `{x: number, y: number}` | - | Controlled position |
| `positionOffset` | `{x: number \| string, y: number \| string}` | - | Position offset (supports percentages) |
| `scale` | `number` | `1` | Scale factor for dragging inside transformed parents |

**Note:** Setting `className`, `style`, or `transform` on `<Draggable>` will error. Set them on the child element.

### `<DraggableCore>`

For users that require full control, `<DraggableCore>` provides drag callbacks without managing state or styles. It does not set any transforms; you must handle positioning yourself.

See [React-Resizable](https://github.com/react-grid-layout/react-resizable) and [React-Grid-Layout](https://github.com/react-grid-layout/react-grid-layout) for usage examples.

#### Props

`<DraggableCore>` accepts a subset of `<Draggable>` props:

- `allowAnyClick`
- `allowMobileScroll`
- `cancel`
- `disabled`
- `enableUserSelectHack`
- `grid`
- `handle`
- `nodeRef`
- `offsetParent`
- `onDrag`
- `onMouseDown`
- `onStart`
- `onStop`
- `scale`

## Using nodeRef

To avoid `ReactDOM.findDOMNode()` deprecation warnings in React Strict Mode, pass a `nodeRef` prop:

```jsx
function App() {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef}>Drag me!</div>
    </Draggable>
  );
}
```

For custom components, forward both the ref and props:

```jsx
const MyComponent = forwardRef((props, ref) => (
  <div {...props} ref={ref}>Draggable content</div>
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

## Controlled vs. Uncontrolled

`<Draggable>` is a 'batteries-included' component that manages its own state. For complete control, use `<DraggableCore>`.

For programmatic repositioning while using `<Draggable>`'s state management, pass the `position` prop:

```jsx
function ControlledDraggable() {
  const nodeRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const resetPosition = () => setPosition({ x: 0, y: 0 });

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

## Content Security Policy

To prevent text from being highlighted while dragging, react-draggable injects a
small `<style>` element into the document `<head>` the first time a drag starts
(the `enableUserSelectHack`, on by default). Under a strict Content Security
Policy that omits `'unsafe-inline'` from `style-src`, the browser blocks that
element and logs a CSP violation.

You have three ways to handle this:

1. **Pass a `nonce`.** Provide the same nonce your CSP header advertises and it's
   applied to the injected element:

   ```jsx
   <Draggable nonce={cspNonce}>
     <div>Drag me</div>
   </Draggable>
   ```

2. **Do nothing, if you use webpack.** When no `nonce` prop is given,
   react-draggable falls back to webpack's
   [`__webpack_nonce__`](https://webpack.js.org/guides/csp/) global if your build
   defines it — no per-component prop needed.

3. **Opt out of the injected style.** Set `enableUserSelectHack={false}` and add
   the two rules to your own (CSP-compliant) stylesheet:

   ```css
   .react-draggable-transparent-selection *::-moz-selection { all: inherit; }
   .react-draggable-transparent-selection *::selection { all: inherit; }
   ```

The nonce is only read when the element is first created. The same element is
shared by every `<Draggable>`/`<DraggableCore>` on the page, so set the nonce on
whichever instance drags first (or, more simply, set it consistently everywhere).

## Contributing

- Fork the project
- Run `yarn dev` to start the development server
- Make changes and add tests
- Run `yarn test` to ensure tests pass
- Submit a PR

### Release Checklist

1. Update CHANGELOG.md
2. Run `make release-patch`, `make release-minor`, or `make release-major`
3. Run `make publish`

## License

MIT
