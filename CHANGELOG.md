# Changelog

### 0.1.0 (Jul 25, 2014)

- Initial release

### 0.1.1 (Jul 26, 2014)

- Fixing dragging not stopping on mouseup in some cases

### 0.2.0 (Sep 10, 2014)

- Adding support for snapping to a grid
- Adding support for specifying start position
- Ensure event handlers are destroyed on unmount
- Adding browserify support
- Adding bower support

### 0.2.1 (Sep 10, 2014)

- Exporting as ReactDraggable

### 0.3.0 (Oct 21, 2014)

- Adding support for touch devices

### 0.4.0 (Jan 03, 2015)

- Improving accuracy of snap to grid
- Updating to React 0.12
- Adding dragging className
- Adding reactify support for browserify
- Fixing issue with server side rendering

### 0.4.1 (Apr 30, 2015)

- Remove react/addons dependency (now depending on `react` directly)
- Add MIT License file
- Fix an issue where browser may be detected as touch-enabled but touch event isn't thrown.

### 0.4.2 (Apr 30, 2015)

- Add `"browser"` config to package.json for browserify imports (fix #45).
- Remove unnecessary `emptyFunction` and `React.addons.classSet` imports.

### 0.4.3 (Apr 30, 2015)

- Fix React.addons error caused by faulty test.
