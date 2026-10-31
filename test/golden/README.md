# Golden interaction traces

These tests pin react-draggable 4.7.2 behavior, including known bugs, before
refactors change the event pipeline. They import `lib/` source and use local React.

```text
scenario → DOM input → React commit → callbacks + DOM + listeners
                                        ↓
                             __golden__/<name>.golden.json
```

## Run and regenerate

| Command | Purpose |
| --- | --- |
| `corepack yarn test` | Run existing tests and the golden suite |
| `corepack yarn test test/golden` | Compare only golden tests and serializer checks |
| `corepack yarn golden:update` | Explicitly regenerate interaction traces |
| `corepack yarn golden:typecheck` | Check the TypeScript test tooling |
| `corepack yarn golden:browser` | Run the separate Playwright cross-check |
| `corepack yarn golden:legacy` | Compare the optional React 18 traces |
| `corepack yarn golden:legacy:update` | Regenerate the optional React 18 traces |

Golden diffs in a PR must be explained. Describe the changed inputs, callbacks,
or rendered output, and whether the behavior change is intended. Review the diff
before committing regenerated files. A missing golden fails an ordinary test run;
only `GOLDEN_UPDATE=1` permits writes.

## What a trace records

| Row | Recorded values |
| --- | --- |
| Input | Event type, target, coordinates, buttons, touch lists, initial cancellation |
| Callback | Ordered `onMouseDown`, `onStart`, `onDrag`, `onStop`; event type, return value, all six data coordinates and node ID |
| Listener | Native add/remove operations, capture/passive options, target |
| Dispatched | Whether the event was cancelled, including touch scrolling prevention |
| Snapshot | Transform style, CSS translate, SVG transform attribute, class set, node connectivity, selection class/style/nonce, selection ranges, attached library listeners |
| Action/error | Rerender, node swap, selection, unmount, or reported event error |

Each trace step occupies one line of valid JSON. Object keys are sorted.
`undefined` becomes `{"$type":"undefined"}`; nonfinite numbers and negative zero
use `{"$number":"NaN"}`, `"Infinity"`, `"-Infinity"`, or `"-0"`. Finite coordinates
are rounded to six decimal places. Timestamps and unstable node identities are omitted.

The recorder tracks listener identity and capture mode, so a duplicate add does
not invent a second attachment. It records failed removals too. Framework event
delegation is excluded; document move/stop listeners and native node touchstart
bindings are included. Cleanup after the final snapshot removes even deliberately
leaked listeners from known-bug cases, keeping scenarios independent.

## Event cadence and geometry

`harness.ts` dispatches one event per `act()` by default, then snapshots after React
commits. This reaches `Draggable.onDrag`, including bounds, slack, and the user
callback. The older helpers can dispatch a whole gesture before the start state
commits, leaving that path untested.

The `batched` cadence deliberately puts the entire gesture in one `act()`. Its
event snapshots show the DOM before commit, followed by a `commit` snapshot.
`afterBatch` inputs run in separate acts after that commit. This pins the latent
stuck-dragging behavior without confusing it with ordinary event delivery.

Geometry fixtures specify parent/node size, offsets, rectangles, scroll,
padding, borders, and margins. The harness stubs layout reads and the relevant
computed styles. Defaults are a 300×200 parent at (0,0), a 40×30 node, and zero
insets/scroll. `useOffsetParent` supplies a separate parent through the public prop.
The existing synchronous animation-frame setup is retained; `flush-frame` is an
explicit timeline marker, not a deferred-frame race test.

`scenarios/cases.ts` owns the matrix. Shared cases exercise both components;
position, axis, and bounds cases exercise the wrapper. Cadence mirrors focus on
state and lifecycle boundaries. React 19 without `nodeRef` records today's start
error because that runtime no longer has `findDOMNode`.

The optional `vitest.golden-legacy.config.js` project exercises the actual React 18
`findDOMNode` path for both components. Set `REACT18_MODULE_ROOT` to a separate
`node_modules` containing matching React 18 and ReactDOM 18 packages and their
dependencies. The config checks their versions and resolution before running:

```sh
REACT18_MODULE_ROOT=/path/to/react18/node_modules corepack yarn golden:legacy
```

This keeps the two React runtimes isolated. The normal suite pins React 19, and
`golden:update` regenerates its traces. Use `golden:legacy:update` with the same
environment variable to regenerate the two legacy traces. A separate cached
React 18.3.1 installation was used to generate and verify them offline.

## Known bugs

Keep a passing trace of the observed bug and add a top-level `knownBug` string:

```json
{"knownBug":"R7: release coordinates bypass bounds clamping in onStop."}
```

| ID | Pinned behavior |
| --- | --- |
| R1-stuck | A batched gesture retains dragging state and accepts a later move |
| R2 | A vetoed stop over the node runs twice |
| R3 | Returning false from a touch drag fails to stop it |
| R4 | A second start repeats the start callback and resets the origin |
| R5 | Idle sibling unmount clears the active selection hack and text selection |
| R6 | Stop data includes release movement that the transform never renders |
| R7 | Stop data bypasses bounds |
| R9 | Replacing the child leaves touchstart attached to the detached node |
| R10 | Hybrid mouse/touch stop reports NaN and removes the wrong listeners |
| R11 | Pointer-only input has no start handler |

When fixing a bug later, update its trace and explain or remove the `knownBug`
annotation in the same PR. This suite makes no library behavior changes.

## Browser cross-check

The separate project serves source and local React through Vite. Playwright sends
real mouse input through the same selected scenarios, using native CSS layout
rather than jsdom stubs. The existing Puppeteer/UMD/CDN suite remains separate.

`playwright` is a devDependency and CI runs this check after the browser tests.
Run `yarn playwright install chromium` once, or set `PLAYWRIGHT_MODULE_PATH` to
another Playwright package directory. `PLAYWRIGHT_EXECUTABLE_PATH` optionally selects an
installed Chromium executable. The runner never installs packages or browsers.
For example:

```sh
PLAYWRIGHT_MODULE_PATH=/path/to/node_modules/playwright corepack yarn golden:browser
```

The comparison retains callback data and DOM/body/listener snapshots. It omits
selection range counts because native clicks create selection in the browser,
and normalizes whitespace around transform commas. The checked-in traces keep
their exact jsdom strings. Each input runs in its own browser task; snapshots
wait for React and animation-frame cleanup. Page requests to other origins fail.

This project was collected and its source fixture compiled during authoring.
Chromium could not launch in the macOS sandbox (MachPort permission denied), so
browser parity remains unverified. Launch failures fail the suite rather than skip it.
