# Ports to other frameworks

react-draggable is React-only. There is no Vue, Svelte, or vanilla build.

## Why this is out of scope

The component model is the library: `<Draggable>` clones its React child, sets props on it, and keeps the position in React component state. A port would be a separate library with its own maintainers. For Vue, look at vue-draggable-resizable. For framework-free dragging, look at interact.js.

## Prior requests

- [#320](https://github.com/react-grid-layout/react-draggable/issues/320) - Vuejs version?
