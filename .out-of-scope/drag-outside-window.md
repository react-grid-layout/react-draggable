# Dragging outside the browser window

A draggable cannot leave the browser window.

## Why this is out of scope

A DOM element can only render inside its document's viewport. Moving content between windows or to the desktop needs the HTML Drag and Drop API (`dataTransfer`) or a native shell such as Electron. Both are outside what a transform-based drag component can do.

## Prior requests

- [#688](https://github.com/react-grid-layout/react-draggable/issues/688) - Ability to drag outside browser window...?
