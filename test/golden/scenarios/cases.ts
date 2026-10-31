import type {Geometry, Input} from '../harness';

export type Scenario = {
  name: string,
  component: 'Draggable' | 'DraggableCore',
  cadence: 'per-event' | 'batched',
  props: Record<string, unknown>,
  events: Input[],
  returns?: Partial<Record<'onStart' | 'onDrag' | 'onStop' | 'onMouseDown', boolean>>,
  knownBug?: string,
  strict?: boolean,
  nodeRef?: boolean,
  svg?: boolean,
  geometry?: Geometry,
  useOffsetParent?: boolean,
  unmountOn?: 'onStart' | 'onDrag' | 'onStop'
};

type Case = Omit<Scenario, 'component' | 'cadence' | 'props'> & {
  props?: Scenario['props']
};

const down = (x = 10, y = 10, target = 'node'): Input =>
  ({type: 'mousedown', x, y, target});
const move = (x: number, y: number): Input => ({type: 'mousemove', x, y});
const up = (x: number, y: number, target = 'document'): Input =>
  ({type: 'mouseup', x, y, target});
const mouse = (target = 'node'): Input[] => [
  down(10, 10, target), move(35, 25), move(65, 45), up(65, 45)
];
const point = (identifier: number, x: number, y: number) =>
  ({identifier, x, y, target: 'node'});
const touch = (type: string, points: ReturnType<typeof point>[],
  changed = points, target = type === 'touchstart' ? 'node' : 'document'): Input => ({
  type, target, touches: points, targetTouches: points, changedTouches: changed
});
const touchDrag = (): Input[] => [
  touch('touchstart', [point(7, 10, 10)]),
  touch('touchmove', [point(7, 35, 25)]),
  touch('touchend', [], [point(7, 35, 25)])
];

// Public callback/DOM/listener contracts shared by both component layers.
// Each refusal sends later movement too, so a wrongly accepted start is visible.
const shared: Case[] = [
  {name: 'mouse-basic', events: mouse()},
  {name: 'mouse-repeated-drags', events: [
    ...mouse(), down(20, 15), move(5, 5), up(5, 5)
  ]},
  {name: 'mouse-disabled-still-calls-onMouseDown', props: {disabled: true}, events: mouse()},
  {name: 'touch-disabled-does-not-prevent-default', props: {disabled: true}, events: touchDrag()},
  {name: 'handle-match', props: {handle: '.handle'}, events: mouse('handle')},
  {name: 'handle-miss', props: {handle: '.handle'}, events: mouse()},
  {name: 'handle-nested-match', props: {handle: '.handle'}, events: mouse('nested')},
  {name: 'cancel-match', props: {cancel: '.cancel'}, events: mouse('cancel')},
  {name: 'cancel-miss', props: {cancel: '.cancel'}, events: mouse()},
  {name: 'cancel-nested-match', props: {cancel: '.handle'}, events: mouse('nested')},
  {name: 'cancel-wins-over-handle', props: {handle: '.handle', cancel: '#nested'}, events: mouse('nested')},
  {name: 'touch-handle-miss-does-not-prevent-default', props: {handle: '.handle'}, events: touchDrag()},
  {name: 'touch-cancel-does-not-prevent-default', props: {cancel: '.cancel'}, events: [
    {...touch('touchstart', [point(7, 10, 10)]), target: 'cancel'},
    touch('touchmove', [point(7, 35, 25)]),
    touch('touchend', [], [point(7, 35, 25)])
  ]},
  ...([1, 2] as const).flatMap(button => [
    {name: `mouse-button-${button}-rejected`, events: [
      {...down(), button}, move(35, 25), {...up(35, 25), button}
    ]},
    {name: `mouse-button-${button}-allowed`, props: {allowAnyClick: true}, events: [
      {...down(), button}, move(35, 25), {...up(35, 25), button}
    ]}
  ]),
  {name: 'mouse-control-left-rejected', events: [
    {...down(), ctrlKey: true}, move(35, 25), {...up(35, 25), ctrlKey: true}
  ]},
  {name: 'mouse-control-left-allowed', props: {allowAnyClick: true}, events: [
    {...down(), ctrlKey: true}, move(35, 25), {...up(35, 25), ctrlKey: true}
  ]},
  {name: 'onMouseDown-false-does-not-veto-start', returns: {onMouseDown: false}, events: mouse()},
  {name: 'mouse-onStart-false', returns: {onStart: false}, events: mouse()},
  {name: 'touch-onStart-false-still-prevents-default', returns: {onStart: false}, events: touchDrag()},
  {name: 'mouse-onDrag-false-synthesizes-stop-at-zero', returns: {onDrag: false}, events: mouse()},
  {name: 'touch-onDrag-false-remains-active', returns: {onDrag: false},
    knownBug: 'R3: mouseup cancellation cannot resolve the active touch identifier.', events: [
      touch('touchstart', [point(7, 10, 10)]),
      touch('touchmove', [point(7, 35, 25)]),
      touch('touchmove', [point(7, 65, 45)]),
      touch('touchend', [], [point(7, 65, 45)])
    ]},
  {name: 'mouse-onStop-false-on-node-runs-twice', returns: {onStop: false},
    knownBug: 'R2: document capture and React mouseup both invoke the vetoed stop.', events: [
      down(), move(35, 25), up(35, 25, 'node'), move(65, 45), up(65, 45)
    ]},
  {name: 'mouse-onStop-false-on-document-retains-listeners', returns: {onStop: false}, events: [
    down(), move(35, 25), up(35, 25), move(65, 45), up(65, 45)
  ]},
  {name: 'touch-onStop-false-on-node-runs-twice', returns: {onStop: false},
    knownBug: 'R2: document capture and React touchend both invoke the vetoed stop.', events: [
      touch('touchstart', [point(7, 10, 10)]),
      touch('touchmove', [point(7, 35, 25)]),
      touch('touchend', [], [point(7, 35, 25)], 'node'),
      touch('touchmove', [point(7, 65, 45)])
    ]},
  {name: 'touch-single-finger', events: touchDrag()},
  {name: 'touch-changedTouches-fallback', events: [
    touch('touchstart', [], [point(0, 10, 10)]),
    touch('touchmove', [], [point(0, 35, 25)]),
    touch('touchend', [], [point(0, 35, 25)])
  ]},
  {name: 'touch-unrelated-finger-ignored', events: [
    touch('touchstart', [point(7, 10, 10)]),
    {type: 'touchmove', touches: [point(7, 10, 10), point(9, 80, 60)],
      targetTouches: [point(9, 80, 60)], changedTouches: [point(9, 80, 60)]},
    touch('touchend', [point(9, 80, 60)], [point(9, 80, 60)]),
    touch('touchmove', [point(7, 35, 25)]),
    touch('touchend', [], [point(7, 35, 25)])
  ]},
  {name: 'touch-second-start-restarts-first-finger',
    knownBug: 'R4: a second start repeats onStart and retains targetTouches[0].', events: [
      touch('touchstart', [point(1, 10, 10)]),
      touch('touchmove', [point(1, 20, 15)]),
      touch('touchstart', [point(1, 20, 15), point(2, 80, 60)], [point(2, 80, 60)]),
      touch('touchmove', [point(1, 30, 20), point(2, 90, 70)], [point(2, 90, 70)]),
      touch('touchend', [point(2, 90, 70)], [point(1, 30, 20)])
    ]},
  {name: 'mouse-second-start-resets-origin',
    knownBug: 'R4: mousedown during an active drag repeats onStart and resets last.', events: [
      down(), move(20, 15), down(25, 20), move(40, 35), up(40, 35)
    ]},
  {name: 'hybrid-touchend-during-mouse-leaks-listeners',
    knownBug: 'R10: touchend stops a mouse drag with NaN data and removes the touch listener pair.', events: [
      down(), move(20, 15), touch('touchend', [], [point(3, 20, 15)], 'node'),
      move(45, 30), up(45, 30)
    ]},
  {name: 'grid-suppresses-subthreshold-and-snaps-stop', props: {grid: [10, 20]}, events: [
    down(), move(14, 19), move(16, 21), move(24, 36), up(29, 48)
  ]},
  {name: 'grid-negative-half-ties', props: {grid: [10, 10]}, events: [
    down(), move(5, 5), move(4, 4), move(-5, -5), up(-6, -6)
  ]},
  {name: 'grid-relative-to-nonzero-origin', props: {grid: [10, 15]}, events: [
    down(13, 7), move(20, 18), move(29, 29), up(33, 40)
  ]},
  ...([0.5, 2] as const).map(scale => ({
    name: `scale-${scale}`, props: {scale}, events: mouse()
  })),
  {name: 'offsetParent-body-ignores-parent-rect', geometry: {
    offsetParent: 'body', parent: {rect: {left: 100, top: 70}, scroll: [13, 17]}
  }, events: mouse()},
  {name: 'offsetParent-parent-rect-and-scroll', geometry: {
    parent: {rect: {left: 100, top: 70}, scroll: [13, 17]}
  }, events: [down(110, 80), move(140, 100), up(140, 100)]},
  {name: 'offsetParent-prop-overrides-node-parent', useOffsetParent: true, geometry: {
    offsetParent: 'parent', parent: {rect: {left: 100, top: 70}},
    custom: {rect: {left: 40, top: 25}, scroll: [9, 11]}
  }, events: [down(110, 80), move(140, 100), up(140, 100)]},
  {name: 'user-select-hack-disabled-preserves-selection', props: {enableUserSelectHack: false}, events: [
    {type: 'select'}, ...mouse()
  ]},
  {name: 'user-select-stop-clears-selection', events: [
    down(), {type: 'select'}, move(35, 25), up(35, 25), {type: 'flush-frame'}
  ]},
  {name: 'user-select-nonce-created-once', props: {nonce: 'golden-first'}, events: [
    ...mouse(), {type: 'rerender', props: {nonce: 'golden-second'}},
    down(), move(20, 15), up(20, 15)
  ]},
  {name: 'touch-allowMobileScroll-keeps-default', props: {allowMobileScroll: true}, events: touchDrag()},
  {name: 'mouse-unmount-mid-drag-cleans-listeners', events: [
    down(), move(35, 25), {type: 'unmount'}, move(65, 45), up(65, 45), {type: 'flush-frame'}
  ]},
  {name: 'touch-unmount-mid-drag-cleans-listeners', events: [
    touch('touchstart', [point(7, 10, 10)]),
    touch('touchmove', [point(7, 35, 25)]), {type: 'unmount'},
    touch('touchmove', [point(7, 65, 45)]), touch('touchend', [], [point(7, 65, 45)]),
    {type: 'flush-frame'}
  ]},
  ...(['onStart', 'onDrag', 'onStop'] as const).map(unmountOn => ({
    name: `mouse-unmount-during-${unmountOn}`, unmountOn, events: mouse()
  })),
  {name: 'idle-unmount-removes-active-selection-hack',
    knownBug: 'R5: unmounting an idle sibling removes the active body class and page selection.', events: [
      down(), {type: 'select'}, {type: 'unmount-idle'}, {type: 'flush-frame'},
      move(35, 25), up(35, 25)
    ]},
  {name: 'node-swap-loses-touchstart-but-keeps-mouse',
    knownBug: 'R9: touchstart stays bound to the detached node after ref retargeting.', events: [
      {type: 'swap-node'}, ...touchDrag(), ...mouse()
    ]},
  {name: 'strict-mode-mount-drag-cleanup', strict: true, events: mouse()},
  {name: 'without-nodeRef-react19-start-error', nodeRef: false, events: mouse()},
  {name: 'svg-drag', svg: true, events: mouse()},
  {name: 'pointerdown-is-ignored',
    knownBug: 'R11: pointerdown alone has no registered start handler.', events: [
      {type: 'pointerdown', x: 10, y: 10}, move(35, 25), up(35, 25)
    ]},
  {name: 'disabled-rerender-mid-drag-keeps-active-listeners', events: [
    down(), {type: 'rerender', props: {disabled: true}}, move(35, 25), up(35, 25)
  ]}
];

// Rendering, controlled state and bounds are owned by the Draggable wrapper.
const draggable: Case[] = [
  {name: 'defaultPosition-retained-after-drag', props: {defaultPosition: {x: 20, y: -10}}, events: mouse()},
  {name: 'defaultPosition-rerender-does-not-reset-state', props: {defaultPosition: {x: 20, y: -10}}, events: [
    ...mouse(), {type: 'rerender', props: {defaultPosition: {x: 90, y: 80}}}, ...mouse()
  ]},
  {name: 'controlled-position-reverts-after-drag', props: {position: {x: 5, y: 5}}, events: [
    down(), move(35, 25), up(35, 25)
  ]},
  {name: 'controlled-position-rerender-during-drag', props: {position: {x: 5, y: 5}}, events: [
    down(), move(35, 25), {type: 'rerender', props: {position: {x: 80, y: 60}}},
    move(55, 45), up(55, 45)
  ]},
  {name: 'controlled-position-rerender-idle', props: {position: {x: 5, y: 5}}, events: [
    {type: 'rerender', props: {position: {x: -15, y: 25}}}, ...mouse()
  ]},
  {name: 'positionOffset-pixels', props: {positionOffset: {x: 3, y: -4}}, events: mouse()},
  {name: 'positionOffset-percent', props: {positionOffset: {x: '50%', y: '-25%'}}, events: mouse()},
  ...(['x', 'y', 'both', 'none'] as const).map(axis => ({
    name: `axis-${axis}`, props: {axis}, events: mouse()
  })),
  {name: 'axis-switch-reveals-accumulated-hidden-coordinate', props: {axis: 'x'}, events: [
    down(), move(35, 25), {type: 'rerender', props: {axis: 'y'}},
    move(55, 45), up(55, 45)
  ]},
  {name: 'axis-none-uses-defaultPosition', props: {axis: 'none', defaultPosition: {x: 20, y: -10}}, events: mouse()},
  {name: 'bounds-false-permits-negative-movement', props: {bounds: false}, events: [
    down(), move(-90, -60), up(-90, -60)
  ]},
  {name: 'bounds-object-limits-all-sides', props: {bounds: {left: -20, top: -15, right: 60, bottom: 50}}, events: [
    down(), move(100, 90), move(-80, -70), move(20, 15), up(20, 15)
  ]},
  {name: 'bounds-object-slack-requires-pointer-return', props: {bounds: {left: 0, top: 0, right: 60, bottom: 40}}, events: [
    down(), move(110, 90), move(90, 70), move(65, 45), move(40, 30), up(40, 30)
  ]},
  {name: 'bounds-object-negative-box', props: {bounds: {left: -100, top: -80, right: -20, bottom: -10}}, events: [
    down(), move(-40, -30), move(-140, -110), move(-70, -50), up(-70, -50)
  ]},
  {name: 'bounds-object-one-sided', props: {bounds: {right: 40}}, events: [
    down(), move(100, -70), move(-40, -100), up(-40, -100)
  ]},
  {name: 'bounds-parent', props: {bounds: 'parent'}, events: [
    down(), move(410, 310), move(-100, -80), up(-100, -80)
  ]},
  {name: 'bounds-selector', props: {bounds: '#parent'}, events: [
    down(), move(410, 310), up(410, 310)
  ]},
  {name: 'bounds-selector-missing-errors-on-move', props: {bounds: '#missing-bounds'}, events: mouse()},
  {name: 'bounds-parent-padding-border-margin-scroll', props: {bounds: 'parent'}, geometry: {
    parent: {rect: {left: 100, top: 70}, size: [300, 200], padding: [7, 11, 13, 17], border: [2, 3, 4, 5], scroll: [19, 23]},
    node: {size: [40, 30], offset: [31, 29], margin: [3, 5, 7, 9], padding: [2, 4, 6, 8], border: [1, 2, 3, 4]}
  }, events: [down(140, 110), move(600, 500), move(-100, -100), up(-100, -100)]},
  {name: 'bounds-selector-negative-offset-and-margins', props: {bounds: '#parent'}, geometry: {
    parent: {size: [180, 140], padding: [4, 8, 12, 16]},
    node: {size: [55, 45], offset: [-20, -15], margin: [1, 3, 5, 7], border: 2}
  }, events: [down(), move(-40, -30), move(300, 250), up(300, 250)]},
  {name: 'bounds-grid-scale-order', props: {bounds: {left: -10, top: -20, right: 35, bottom: 45}, grid: [20, 30], scale: 2}, events: [
    down(), move(160, 190), move(120, 130), move(50, 40), up(50, 40)
  ]},
  {name: 'mouseup-reports-position-without-rendering-it',
    knownBug: 'R6: uncontrolled onStop includes the release delta while the transform retains the last move.', events: [
      down(0, 0), move(50, 0), up(80, 0)
    ]},
  {name: 'touchend-reports-changedTouches-without-rendering-it',
    knownBug: 'R6: touchend changedTouches delta reaches onStop without updating rendered position.', events: [
      touch('touchstart', [point(7, 0, 0)]),
      touch('touchmove', [point(7, 50, 0)]), touch('touchend', [], [point(7, 80, 0)])
    ]},
  {name: 'mouseup-stop-data-ignores-bounds', props: {bounds: {right: 60}},
    knownBug: 'R7: release coordinates bypass bounds clamping in onStop.', events: [
      down(0, 0), move(50, 0), up(200, 0)
    ]},
  {name: 'custom-class-names-preserve-child-class', props: {
    defaultClassName: 'golden-base', defaultClassNameDragging: 'golden-active', defaultClassNameDragged: 'golden-used'
  }, events: mouse()},
  {name: 'svg-positionOffset-percent', svg: true, props: {
    positionOffset: {x: '50%', y: '-25%'}, defaultPosition: {x: 7, y: -3}
  }, events: mouse()}
];

const componentPrefix = (component: Scenario['component']) =>
  component === 'DraggableCore' ? 'core' : 'draggable';
const make = (component: Scenario['component'], spec: Case,
  cadence: Scenario['cadence'] = 'per-event'): Scenario => ({
  ...spec, name: `${componentPrefix(component)}-${spec.name}${cadence === 'batched' ? '-batched' : ''}`,
  component, cadence, props: spec.props ?? {}
});

// Cadence mirrors focus on state/lifecycle boundaries. Repeating every selector
// and button filter in one act would add no separate branch contract.
const batchedShared = new Set([
  'mouse-basic', 'touch-single-finger', 'mouse-onStart-false',
  'mouse-onDrag-false-synthesizes-stop-at-zero', 'touch-onDrag-false-remains-active',
  'mouse-onStop-false-on-node-runs-twice', 'mouse-unmount-mid-drag-cleans-listeners'
]);
const batchedDraggable = new Set([
  'defaultPosition-retained-after-drag', 'controlled-position-reverts-after-drag',
  'positionOffset-percent', 'axis-none', 'bounds-object-slack-requires-pointer-return',
  'bounds-grid-scale-order'
]);

export const scenarios: Scenario[] = [
  ...(['DraggableCore', 'Draggable'] as const).flatMap(component =>
    shared.map(spec => make(component, spec))),
  ...draggable.map(spec => make('Draggable', spec)),
  ...(['DraggableCore', 'Draggable'] as const).flatMap(component =>
    shared.filter(spec => batchedShared.has(spec.name)).map(spec => make(component, spec, 'batched'))),
  ...draggable.filter(spec => batchedDraggable.has(spec.name)).map(spec => make('Draggable', spec, 'batched')),
  make('Draggable', {
    name: 'R1-stuck-later-buttonless-move',
    knownBug: 'R1-stuck: batched start/move/stop leaves dragging active and accepts a later buttonless move.',
    events: [down(0, 0), move(100, 100), up(100, 100),
      {...move(150, 150), afterBatch: true}]
  }, 'batched')
];

// These starts lie inside the rendered 40x30 HTML child. The browser uses real
// mouse input and real geometry for an independent check of the jsdom fixture.
export const browserScenarioNames = [
  'core-mouse-basic',
  'draggable-mouse-basic',
  'core-mouse-disabled-still-calls-onMouseDown',
  'core-handle-match',
  'core-handle-miss',
  'core-cancel-match',
  'core-handle-nested-match',
  'core-scale-0.5',
  'core-scale-2',
  'draggable-scale-2',
  'draggable-axis-x',
  'draggable-axis-y',
  'draggable-axis-none',
  'draggable-controlled-position-reverts-after-drag',
  'draggable-bounds-selector',
  'draggable-bounds-object-slack-requires-pointer-return'
];
