# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

**This project uses Yarn, not npm.** Always use `yarn` for package management.

This project uses Make for builds. Key commands:

- `make build` - Full build (cleans, then builds CJS and web bundles)
- `make lint` - Runs Flow type checker, ESLint, and TypeScript type checking on typings
- `make test` - Runs unit tests via Vitest
- `make test-browser` - Runs browser tests via Puppeteer (requires build first)
- `make test-all` - Runs both unit and browser tests
- `make dev` - Starts webpack dev server with example page at localhost:8080

Yarn scripts:
- `yarn test` - Run unit tests (jsdom environment)
- `yarn test:watch` - Run unit tests in watch mode
- `yarn test -- path/to/test.jsx` - Run a single test file
- `yarn test -- -t "test name"` - Run tests matching a pattern
- `yarn test:browser` - Build and run browser tests (Puppeteer)
- `yarn test:all` - Run all tests
- `yarn test:coverage` - Run tests with coverage report

Pre-commit hooks run `make lint` and `make test` automatically.

## Test Architecture

Tests are split into two categories:

1. **Unit tests** (`test/*.test.{js,jsx}`) - Run in jsdom via Vitest
   - Fast, no browser required
   - Test component logic, callbacks, prop handling
   - Some coordinate-based tests skipped (require real browser)

2. **Browser tests** (`test/browser/*.test.js`) - Run in headless Chrome via Puppeteer
   - Test actual drag behavior with real coordinate calculations
   - Test transforms, axis constraints, bounds, scale

### Test Utilities

`test/testUtils.js` provides helpers for simulating drag events:
- `simulateDrag(element, {from, to})` - Complete drag operation
- `startDrag(element, {x, y})` / `moveDrag({x, y})` / `endDrag(element, {x, y})` - Step-by-step drag
- `simulateTouchDrag(element, {from, to})` - Touch event drag

## Architecture

### Component Hierarchy

**DraggableCore** (`lib/DraggableCore.js`) - Low-level component that handles raw drag events
- Maintains minimal internal state (just `dragging`, `lastX`, `lastY`)
- Manages mouse/touch event binding and cleanup
- Provides `onStart`, `onDrag`, `onStop` callbacks with position data
- Use this when you need full control over positioning

**Draggable** (`lib/Draggable.js`) - High-level wrapper around DraggableCore
- Manages position state, bounds checking, axis constraints
- Applies CSS transforms or SVG transform attributes
- Supports controlled (`position` prop) and uncontrolled (`defaultPosition`) modes
- Adds dragging-related CSS classes

### Key Utilities

- `lib/utils/domFns.js` - DOM helpers: event binding, CSS transforms, user-select hacks
- `lib/utils/positionFns.js` - Position calculations: bounds checking, grid snapping, delta computations
- `lib/utils/getPrefix.js` - Browser prefix detection for CSS transforms

### Build Outputs

- `build/cjs/` - CommonJS build (Babel)
- `build/web/react-draggable.min.js` - UMD browser bundle (Webpack)

### Type Systems

The codebase uses Flow for internal type checking (`// @flow` annotations) and ships TypeScript definitions in `typings/index.d.ts`. Both must stay in sync when modifying component props or types.

## Key Patterns

### nodeRef Pattern
To avoid ReactDOM.findDOMNode deprecation warnings in Strict Mode, components accept a `nodeRef` prop:
```jsx
const nodeRef = React.useRef(null);
<Draggable nodeRef={nodeRef}>
  <div ref={nodeRef}>Content</div>
</Draggable>
```

### Callback Return Values
Returning `false` from `onStart`, `onDrag`, or `onStop` cancels the drag operation.

### CSS Transform Approach
Dragging uses CSS transforms (`translate`) rather than absolute positioning, allowing draggable elements to work regardless of their CSS position value.

## Release Process

- Update CHANGELOG.md
- `make release-patch`, `make release-minor`, or `make release-major`
- `make publish`
