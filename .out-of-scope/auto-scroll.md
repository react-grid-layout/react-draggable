# Auto-scroll while dragging

react-draggable does not scroll a container or the window when a drag nears its edge.

## Why this is out of scope

Auto-scroll needs decisions that belong to the app: which ancestor scrolls, how big the edge zone is, how speed ramps up, and whether `bounds` grows as the content scrolls. Each answer changes with the layout. A fixed default would be wrong for most callers, and a prop covering all of them would be larger than the rest of the library.

It can be built outside the library. Scroll from `onDrag` and let the drag continue:

```jsx
<Draggable
  nodeRef={nodeRef}
  onDrag={(e, data) => {
    const box = scrollerRef.current.getBoundingClientRect();
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    if (y > box.bottom - 40) scrollerRef.current.scrollTop += 10;
    else if (y < box.top + 40) scrollerRef.current.scrollTop -= 10;
  }}
>
  <div ref={nodeRef}>Drag me</div>
</Draggable>
```

If you need scroll-aware drag and drop with sortable containers, use a full drag-and-drop library (dnd-kit, react-dnd).

## Prior requests

- [#151](https://github.com/react-grid-layout/react-draggable/issues/151) - window scrolling on drag up or down causes cursor to lose its place
- [#240](https://github.com/react-grid-layout/react-draggable/issues/240) - Dragging an item does not scroll the container
- [#492](https://github.com/react-grid-layout/react-draggable/issues/492) - Issue when drag and scroll using touch events
- [#767](https://github.com/react-grid-layout/react-draggable/issues/767) - Drag and scroll is very rough and drag item flickers
- [#776](https://github.com/react-grid-layout/react-draggable/issues/776) - Scroll when dragging
