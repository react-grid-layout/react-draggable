# Function-as-child / render-prop API

`<Draggable>` takes one element child. It does not accept a function child that receives the position.

## Why this is out of scope

The two reasons for the request both have answers now. Reading the position is `onDrag`/`onStop` data, or controlled `position`. Pointing at the DOM node without `findDOMNode` is `nodeRef`. If you need full control over rendering, use `<DraggableCore>`: it applies no transform and hands you the deltas.

## Prior requests

- [#414](https://github.com/react-grid-layout/react-draggable/issues/414) - Accept function as child or pass raw position
