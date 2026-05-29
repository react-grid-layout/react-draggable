import type * as React from 'react';

export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void | false;

export type DraggableData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
};

export type Bounds = {
  left?: number, top?: number, right?: number, bottom?: number
};
export type ControlPosition = {x: number, y: number};
export type PositionOffsetControlPosition = {x: number | string, y: number | string};
export type EventHandler<T> = (e: T) => void | false;

// MouseEvent and TouchEvent are provided by the TS DOM lib, including
// changedTouches/targetTouches, so the Flow class shims are no longer needed.
export type MouseTouchEvent = MouseEvent & TouchEvent;

// `DraggableEvent` is the PUBLIC event type a consumer's handlers may receive.
// Historically (the old typings/index.d.ts) it was the broad UNION of React
// synthetic and native DOM mouse/touch events — NOT the internal
// `MouseTouchEvent` intersection above (which exists only for convenient field
// access inside the handlers). Aliasing the public type to the intersection
// would be an API break: none of the union members are assignable to it. Keep
// the union to preserve compatibility.
export type DraggableEvent =
  | React.MouseEvent<HTMLElement | SVGElement>
  | React.TouchEvent<HTMLElement | SVGElement>
  | MouseEvent
  | TouchEvent;
