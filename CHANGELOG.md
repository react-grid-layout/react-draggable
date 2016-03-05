# Changelog

### 1.3.4 (Mar 5, 2015)

- Bugfix: Scrolling while dragging caused items to move unpredictably.

### 1.3.3 (Feb 11, 2015)

- Bugfix: #116: Android/Chrome are finicky; give up on canceling ghost clicks entirely.

### 1.3.2 (Feb 11, 2015)

- Bugfix: #116: Child inputs not focusing on touch events.

### 1.3.1 (Feb 10, 2015)

- Internal: Babel 6 and Flow definitions
- Bugfix: 1.3.0 broke string bounds ('parent', selectors, etc.).
- Bugfix: 1.3.0 wasn't updating deltaX and deltaY on a bounds hit.

### 1.3.0 (Feb 10, 2015)

- Possibly breaking change: bounds are calculated before `<Draggable>` fires `drag` events, as they should have been.
- Added `'none'` axis type. This allows using `<Draggable>` somewhat like `<DraggableCore>` - state will be kept
  internally (which makes bounds checks etc possible), but updates will not be flushed to the DOM.
- Performance tweaks.

### 1.2.0 (Feb 5, 2015)

- Added arbitrary boundary selector. Now you don't have to just use `'parent'`, you can select any element
  on the page, including `'body'`.
- Bugfix: Prevent invariant if a `<Draggable>` is unmounted while dragging.
- Bugfix: Fix #133, where items would eagerly start dragging off the mouse cursor if you hit boundaries and
  came back. This is due to how `<DraggableCore>` handles deltas only and does not keep state. Added new state
  properties `slackX` and `slackY` to `<Draggable>` to handle this and restore pre-v1 behavior.

### 1.1.3 (Nov 25, 2015)

- Bugfix: Server-side rendering with react-rails, which does bad things like mock `window`

### 1.1.2 (Nov 23, 2015)

- Bugfix: `<Draggable>` was calling back with clientX/Y, not offsetX/Y as it did pre-1.0. This unintended
  behavior has been fixed and a test has been added.

### 1.1.1 (Nov 14, 2015)

- Bugfix: Clean up scroll events if a component is unmounted before drag stops.
- Bugfix: `NaN` was returning from scroll events due to event structure change.
- Add scroll drag modulation test.

### 1.1.0 (Nov 14, 2015)

- Move `grid` into `<DraggableCore>` directly. It will continue to work on `<Draggable>`.
- Development fixes.

### 1.0.2 (Nov 7, 2015)

- Fix `enableUserSelectHack` not properly disabling.
- Fix a crash when the user scrolls the page with a Draggable active.

### 1.0.1 (Oct 28, 2015)

- Fix missing dist files for webpack.
- Ignore non-primary clicks. Added `allowAnyClick` option to allow other click types.

### 1.0.0 (Oct 27, 2015)

- Breaking: Removed `resetState()` instance method
- Breaking: Removed `moveOnStartChange` prop
- Breaking: React `0.14` support only.
- Refactored project.
- Module now exports a `<DraggableCore>` element upon which `<Draggable>` is based.
  This module is useful for building libraries and is completely stateless.

### 0.8.5 (Oct 20, 2015)

- Bugfix: isElementSVG no longer can be overwritten by getInitialState (#83)
- Bugfix: Fix for element prefixes in JSDOM

### 0.8.4 (Oct 15, 2015)

- Bugfix: SVG elements now properly use `transform` attribute instead of `style`. Thanks @martinRoss

### 0.8.3 (Oct 12, 2015)

- Bugfix: Short-circuiting drag throws due to `e.changedTouches` check.

### 0.8.2 (Sep 21, 2015)

- Handle scrolling while dragging. (#60)
- Add multi-touch support. (#68)
- IE fixes.
- Documentation updates. (#77)

### 0.8.1 (June 3, 2015)

- Add `resetState()` instance method for use by parents. See README ("State Problems?").

### 0.8.0 (May 19, 2015)

- Touch/mouse events rework. Fixes #51, #37, and #43, as well as IE11 support.
- Moved mousemove/mouseup and touch event handlers to document from window. Fixes IE9/10 support.
  IE8 is still not supported, as it is not supported by React.

### 0.7.4 (May 18, 2015)

- Fix a bug where a quick drag out of bounds to `0,0` would cause the element to remain in an inaccurate position,
  because the translation was removed from the CSS. See #55.

### 0.7.3 (May 13, 2015)

- Removed a `moveOnStartChange` optimization that was causing problems when attempting to move a `<Draggable>` back
  to its initial position. See https://github.com/STRML/react-grid-layout/issues/56

### 0.7.2 (May 8, 2015)

- Added `moveOnStartChange` property. See README.

### 0.7.1 (May 7, 2015)

- The `start` param is back. Pass `{x: Number, y: Number}` to kickoff the CSS transform. Useful in certain
  cases for simpler callback math (so you don't have to know its existing relative position and add it to
  the dragged position). Fixes #52.

### 0.7.0 (May 7, 2015)

- Breaking change: `bounds` with coordinates was confusing because it was using the item's width/height,
  which was not intuitive. When providing coordinates, `bounds` now simply restricts movement in each
  direction by that many pixels.

### 0.6.0 (May 2, 2015)

- Breaking change: Cancel dragging when onDrag or onStart handlers return an explicit `false`.
- Fix sluggish movement when `grid` option was active.
- Example updates.
- Move `user-select:none` hack to document.body for better highlight prevention.
- Add `bounds` option to restrict dragging within parent or within coordinates.

### 0.5.0 (May 2, 2015)

- Remove browserify browser config, reactify, and jsx pragma. Fixes #38
- Use React.cloneElement instead of addons cloneWithProps (requires React 0.13)
- Move to CSS transforms. Simplifies implementation and fixes #48, #34, #31.
- Fixup linting and space/tab errors. Fixes #46.

### 0.4.3 (Apr 30, 2015)

- Fix React.addons error caused by faulty test.

### 0.4.2 (Apr 30, 2015)

- Add `"browser"` config to package.json for browserify imports (fix #45).
- Remove unnecessary `emptyFunction` and `React.addons.classSet` imports.

### 0.4.1 (Apr 30, 2015)

- Remove react/addons dependency (now depending on `react` directly).
- Add MIT License file.
- Fix an issue where browser may be detected as touch-enabled but touch event isn't thrown.

### 0.4.0 (Jan 03, 2015)

- Improving accuracy of snap to grid
- Updating to React 0.12
- Adding dragging className
- Adding reactify support for browserify
- Fixing issue with server side rendering

### 0.3.0 (Oct 21, 2014)

- Adding support for touch devices

### 0.2.1 (Sep 10, 2014)

- Exporting as ReactDraggable

### 0.2.0 (Sep 10, 2014)

- Adding support for snapping to a grid
- Adding support for specifying start position
- Ensure event handlers are destroyed on unmount
- Adding browserify support
- Adding bower support

### 0.1.1 (Jul 26, 2014)

- Fixing dragging not stopping on mouseup in some cases

### 0.1.0 (Jul 25, 2014)

- Initial release
