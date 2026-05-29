// Type-level compatibility fixture.
//
// This file is NOT run; it is compiled by `test/typeCompat.test.ts` via `tsc`
// against the source entry (lib/cjs.ts, aliased to "react-draggable") — the same
// public surface the shipped declaration is generated from, checked without
// requiring a prior build. It asserts that surface is API-compatible with the
// OLD hand-written typings/index.d.ts.
//
// Every exported name and every prop from the old surface is exercised here. If
// any export is removed/renamed, or any prop is removed/renamed/retyped
// incompatibly, this file STOPS COMPILING and the vitest test fails.

import * as React from 'react';
import Draggable, {
  DraggableCore,
  DraggableProps,
  DraggableCoreProps,
  DraggableBounds,
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
  ControlPosition,
  PositionOffsetControlPosition,
} from 'react-draggable';

// ── Helper: assert that `value` is assignable to type `T` ────────────────────
function expectType<T>(_value: T): void {}

// ── ControlPosition: {x: number, y: number} ─────────────────────────────────
const cp: ControlPosition = {x: 1, y: 2};
expectType<number>(cp.x);
expectType<number>(cp.y);

// ── PositionOffsetControlPosition: {x: number|string, y: number|string} ──────
const pocp1: PositionOffsetControlPosition = {x: 1, y: 2};
const pocp2: PositionOffsetControlPosition = {x: '1px', y: '2%'};
expectType<number | string>(pocp1.x);
expectType<number | string>(pocp2.y);

// ── DraggableBounds: {left?,right?,top?,bottom?: number} ─────────────────────
const db1: DraggableBounds = {};
const db2: DraggableBounds = {left: 0, right: 1, top: 2, bottom: 3};
expectType<number | undefined>(db2.left);
expectType<number | undefined>(db2.right);
expectType<number | undefined>(db2.top);
expectType<number | undefined>(db2.bottom);
void db1;

// ── DraggableData: full shape ────────────────────────────────────────────────
const dd: DraggableData = {
  node: document.createElement('div'),
  x: 0, y: 0,
  deltaX: 0, deltaY: 0,
  lastX: 0, lastY: 0,
};
expectType<HTMLElement>(dd.node);
expectType<number>(dd.x);
expectType<number>(dd.y);
expectType<number>(dd.deltaX);
expectType<number>(dd.deltaY);
expectType<number>(dd.lastX);
expectType<number>(dd.lastY);

// ── DraggableEvent union members ─────────────────────────────────────────────
const ev1: DraggableEvent = {} as React.MouseEvent<HTMLElement | SVGElement>;
const ev2: DraggableEvent = {} as React.TouchEvent<HTMLElement | SVGElement>;
const ev3: DraggableEvent = {} as MouseEvent;
const ev4: DraggableEvent = {} as TouchEvent;
void ev1; void ev2; void ev3; void ev4;

// ── DraggableEventHandler: (e, data) => void | false ─────────────────────────
const handlerVoid: DraggableEventHandler = (_e, _data) => {};
const handlerFalse: DraggableEventHandler = (_e, _data) => false;
// data param must be DraggableData
const handlerUsesData: DraggableEventHandler = (_e, data) => {
  expectType<number>(data.x);
  expectType<HTMLElement>(data.node);
};
void handlerVoid; void handlerFalse; void handlerUsesData;

// ── DraggableCoreProps: every documented prop, exact-ish types ───────────────
const coreProps: DraggableCoreProps = {
  allowAnyClick: true,
  allowMobileScroll: false,
  cancel: '.cancel',
  children: React.createElement('div'),
  disabled: false,
  enableUserSelectHack: true,
  offsetParent: document.body,
  grid: [10, 10],
  handle: '.handle',
  nodeRef: React.createRef<HTMLElement>(),
  onStart: () => {},
  onDrag: () => {},
  onStop: () => {},
  onMouseDown: (_e: MouseEvent) => {},
  scale: 1,
};
expectType<boolean>(coreProps.allowAnyClick);
expectType<boolean>(coreProps.allowMobileScroll);
expectType<string>(coreProps.cancel);
expectType<boolean>(coreProps.disabled);
expectType<boolean>(coreProps.enableUserSelectHack);
expectType<HTMLElement>(coreProps.offsetParent);
expectType<[number, number]>(coreProps.grid);
expectType<string>(coreProps.handle);
expectType<DraggableEventHandler>(coreProps.onStart);
expectType<DraggableEventHandler>(coreProps.onDrag);
expectType<DraggableEventHandler>(coreProps.onStop);
expectType<(e: MouseEvent) => void>(coreProps.onMouseDown);
expectType<number>(coreProps.scale);

// ── children must stay React.ReactNode (v4.5.0 public surface), NOT narrowed ──
// Regression guard: the hand-written typings shipped through v4.5.0 declared
// `children?: React.ReactNode`. If the generated types ever narrow this to
// React.ReactElement (as the internal Flow source did), these assignments fail.
const childString: DraggableCoreProps['children'] = 'a plain string child';
const childNumber: DraggableCoreProps['children'] = 42;
const childFragment: DraggableCoreProps['children'] = <>{'fragment'}</>;
const childArray: DraggableCoreProps['children'] = [<span key="a" />, 'text', 7];
void childString; void childNumber; void childFragment; void childArray;

// ── DraggableProps: extends DraggableCoreProps + the Draggable-only props ────
const props: DraggableProps = {
  ...coreProps,
  axis: 'both',
  bounds: false,
  defaultClassName: 'react-draggable',
  defaultClassNameDragging: 'react-draggable-dragging',
  defaultClassNameDragged: 'react-draggable-dragged',
  defaultPosition: {x: 0, y: 0},
  positionOffset: {x: 0, y: 0},
  position: {x: 0, y: 0},
};
expectType<'both' | 'x' | 'y' | 'none'>(props.axis);
expectType<DraggableBounds | string | false>(props.bounds);
expectType<string>(props.defaultClassName);
expectType<string>(props.defaultClassNameDragging);
expectType<string>(props.defaultClassNameDragged);
expectType<ControlPosition>(props.defaultPosition);
expectType<PositionOffsetControlPosition>(props.positionOffset);
expectType<ControlPosition>(props.position);
// axis accepts each documented literal
const axisX: DraggableProps['axis'] = 'x';
const axisY: DraggableProps['axis'] = 'y';
const axisNone: DraggableProps['axis'] = 'none';
void axisX; void axisY; void axisNone;
// bounds accepts string and object forms
const boundsStr: DraggableProps['bounds'] = 'parent';
const boundsObj: DraggableProps['bounds'] = {left: 0, top: 0};
void boundsStr; void boundsObj;

// DraggableProps must be assignable where DraggableCoreProps is expected (extends).
const asCore: DraggableCoreProps = props;
void asCore;

// ── Default export is the Draggable class; DraggableCore is the named class ──
expectType<typeof React.Component>(Draggable as unknown as typeof React.Component);
expectType<typeof React.Component>(DraggableCore as unknown as typeof React.Component);

// ── JSX usage: every prop is OPTIONAL for consumers (old Partial<...> surface) ─
const node = React.createRef<HTMLDivElement>();
const fullEl = (
  <Draggable
    axis="y"
    handle=".handle"
    cancel=".cancel"
    grid={[10, 10]}
    onStart={() => {}}
    onDrag={() => {}}
    onStop={() => {}}
    offsetParent={document.body}
    onMouseDown={() => {}}
    allowAnyClick
    allowMobileScroll={false}
    disabled
    enableUserSelectHack={false}
    bounds={false}
    defaultClassName="d"
    defaultClassNameDragging="dd"
    defaultClassNameDragged="ddd"
    defaultPosition={{x: 0, y: 0}}
    nodeRef={node}
    positionOffset={{x: 0, y: 0}}
    position={{x: 50, y: 50}}>
    <div ref={node} />
  </Draggable>
);
// Zero-prop usage must compile (this is what would break if props were required).
const bareDraggable = <Draggable><div /></Draggable>;
const bareCore = <DraggableCore><div /></DraggableCore>;
void fullEl; void bareDraggable; void bareCore;

export {};
