declare module 'react-draggable' {
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

  export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void | false;

  export interface DraggableData {
    node: HTMLElement,
    x: number, y: number,
    deltaX: number, deltaY: number,
    lastX: number, lastY: number
  }

  export type ControlPosition = {x: number, y: number};

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

  export default class Draggable extends React.Component<Partial<DraggableProps>, {}> {
    static defaultProps : DraggableProps;
  }

  export class DraggableCore extends React.Component<Partial<DraggableCoreProps>, {}> {
    static defaultProps : DraggableCoreProps;
  }
}
