import ResizeObserver from 'resize-observer-polyfill';

import type Draggable from '../Draggable';
import { getBoundPosition } from './positionFns';

export default class BoundsObserver {
  boundElement: HTMLElement;

  constructor(draggable: Draggable) {
    this.ro = new ResizeObserver(() => {
      const [x, y] = getBoundPosition(draggable, draggable.state.x, draggable.state.y, draggable.bounds);
      draggable.setState({ x, y });
    });
  }

  addBoundElementListener(e: HTMLElement) {
    if (this.boundElement) {
      this.ro.unobserve(this.boundElement);
    }
    this.boundElement = e;
    this.ro.observe(this.boundElement);
  }

  removeBoundElementListener() {
    this.ro.unobserve(this.boundElement);
    this.boundElement = undefined;
  }
}