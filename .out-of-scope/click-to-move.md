# Click-to-pick-up, click-to-drop

react-draggable drags between mousedown/touchstart and mouseup/touchend. It has no mode where one click picks the element up and a second click drops it.

## Why this is out of scope

A sticky pick-up mode changes the whole event model: focus, Escape to cancel, what a click on another element means, and accessibility. That's a different interaction, not a drag option. Build it with a pointer-move listener that updates controlled `position` while your own "picked up" state is true.

## Prior requests

- [#499](https://github.com/react-grid-layout/react-draggable/issues/499) - Allows dragging elements without having to hold the mouse
