import * as React from 'react';

export interface DraggableBounds {
  left: number
  right: number
  top: number
  bottom: number
}

export interface DraggableProps extends DraggableCoreProps {
  axis: 'both' | 'x' | 'y' | 'none',
  bounds: DraggableBounds | string | false ,
  defaultClassName: string,
  defaultClassNameDragging: string,
  defaultClassNameDragged: string,
  defaultPosition: ControlPosition,
  position: ControlPosition
}
// eslint-disable-next-line no-use-before-define
export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void | false;

export interface DraggableData {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
}

export type Bounds = {
  left: number, top: number, right: number, bottom: number
};
export type ControlPosition = {x: number, y: number};
export type EventHandler<T> = (e: T) => void | false;

export interface DraggableCoreProps {
  allowAnyClick: boolean,
  cancel: string,
  disabled: boolean,
  enableUserSelectHack: boolean,
  offsetParent: HTMLElement,
  grid: [number, number],
  handle: string,
  onStart: DraggableEventHandler,
  onDrag: DraggableEventHandler,
  onStop: DraggableEventHandler,
  onMouseDown: (e: MouseEvent) => void
}

class Draggable extends React.Component<Partial<DraggableProps>, DraggableState> {

}

class DraggableCore extends React.Component<Partial<DraggableCoreProps>, DraggableState> {

}

declare module 'react-draggable' {
  export {
    Draggable,
    DraggableCore
  }
}
