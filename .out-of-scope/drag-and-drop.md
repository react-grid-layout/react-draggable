# Drag-and-drop features

react-draggable moves one element. It has no drop targets, sortable lists, drag-to-copy, collision handling, or multi-element selection.

## Why this is out of scope

The library is a drag primitive. It turns pointer events into a position and applies it as a `transform`. Every feature below needs state that spans several elements: a registry of drop zones and hit tests, a list order, a selection set, or a collision model. That state belongs to the app or to a drag-and-drop library built for it.

| You want | Build it with |
|---|---|
| Drop zones, "is it over X?" | `onStop` + `getBoundingClientRect()` on your targets, or dnd-kit / react-dnd |
| Sortable lists | dnd-kit sortable |
| Drop a copy, keep the original | Render a new item in `onStop`, and reset the original via controlled `position` |
| Move several elements together | Controlled `position` on each, updated from one `onDrag` |
| Revert on overlap | Check overlap in `onStop`, and set `position` back |
| Grid dashboards | react-grid-layout |

## Prior requests

- [#308](https://github.com/react-grid-layout/react-draggable/issues/308) - Dragging multiple connected components?
- [#355](https://github.com/react-grid-layout/react-draggable/issues/355) - How to drag from a toolbox and make new created components draggable
- [#415](https://github.com/react-grid-layout/react-draggable/issues/415) - How to move Draggable to a div and it can only be dropped within that?
- [#474](https://github.com/react-grid-layout/react-draggable/issues/474) - Drag multiple objects at once
- [#496](https://github.com/react-grid-layout/react-draggable/issues/496) - Drag elements and reposition overlaid elements
- [#519](https://github.com/react-grid-layout/react-draggable/issues/519) - While Left mouse drag the drop-targets do not recognize it
- [#539](https://github.com/react-grid-layout/react-draggable/issues/539) - Is it possible to somehow detect whether a Draggable has been dropped
- [#593](https://github.com/react-grid-layout/react-draggable/issues/593) - How to copy on drag and drop it?
- [#628](https://github.com/react-grid-layout/react-draggable/issues/628) - Drag and drop a copy of component
- [#697](https://github.com/react-grid-layout/react-draggable/issues/697) - how to place draggable at the first location and drop a copy of it?
- [#703](https://github.com/react-grid-layout/react-draggable/issues/703) - Using React Draggable for dragging list items
- [#724](https://github.com/react-grid-layout/react-draggable/issues/724) - how to cancel the move when draggable elements overlap each other?
