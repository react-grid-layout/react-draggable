import {act} from 'react';
import type {createRecorder} from './recorder';

export type TouchPoint = {identifier: number, x: number, y: number, target?: string};
export type Input = {
  type: string, target?: string, x?: number, y?: number, button?: number, ctrlKey?: boolean,
  touches?: TouchPoint[], targetTouches?: TouchPoint[], changedTouches?: TouchPoint[],
  afterBatch?: boolean, props?: Record<string, unknown>
};
type Box = {
  rect?: {left: number, top: number}, size?: [number, number], offset?: [number, number],
  scroll?: [number, number], padding?: number | number[], border?: number | number[],
  margin?: number | number[]
};
export type Geometry = {
  parent?: Box, node?: Box, custom?: Box, offsetParent?: 'parent' | 'body' | 'custom'
};
const sides = ['Top', 'Right', 'Bottom', 'Left'];
const edges = (value: number | number[] = 0): number[] =>
  typeof value === 'number' ? [value, value, value, value] : value;

/** No jsdom layout assumptions: every coordinate read comes from this fixture. */
export function installLayout(nodes: {parent: HTMLElement, node: Element, custom: HTMLElement},
  geometry: Geometry = {}) {
  const styles = new Map<Element, Record<string, string>>();
  function box(node: Element, value: Box, defaultSize: [number, number]) {
    const [width, height] = value.size ?? defaultSize;
    const {left, top} = value.rect ?? {left: 0, top: 0};
    const [offsetLeft, offsetTop] = value.offset ?? [0, 0];
    const [scrollLeft, scrollTop] = value.scroll ?? [0, 0];
    const css: Record<string, string> = {};
    for (const property of ['padding', 'border', 'margin'] as const) {
      edges(value[property]).forEach((edge, i) => {
        css[`${property}${sides[i]}${property === 'border' ? 'Width' : ''}`] = `${edge}px`;
      });
    }
    styles.set(node, css);
    const properties = {clientWidth: width, clientHeight: height, offsetLeft, offsetTop, scrollLeft, scrollTop};
    for (const [key, val] of Object.entries(properties)) {
      Object.defineProperty(node, key, {configurable: true, value: val, writable: true});
    }
    Object.defineProperty(node, 'getBoundingClientRect', {configurable: true, value: () => ({
      x: left, y: top, left, top, right: left + width, bottom: top + height, width, height,
      toJSON: () => ({left, top, width, height})
    })});
  }
  box(nodes.parent, geometry.parent ?? {}, [300, 200]);
  box(nodes.node, geometry.node ?? {}, [40, 30]);
  box(nodes.custom, geometry.custom ?? {}, [500, 400]);
  const offsetParent = geometry.offsetParent === 'body' ? document.body :
    geometry.offsetParent === 'custom' ? nodes.custom : nodes.parent;
  Object.defineProperty(nodes.node, 'offsetParent', {configurable: true, value: offsetParent});
  const original = window.getComputedStyle;
  window.getComputedStyle = function(node, pseudo) {
    const computed = original.call(this, node, pseudo);
    const css = styles.get(node);
    if (!css) return computed;
    return new Proxy(computed, {get(target, key) {
      if (typeof key === 'string' && key in css) return css[key];
      const value = Reflect.get(target, key, target);
      return typeof value === 'function' ? value.bind(target) : value;
    }});
  };
  return () => { window.getComputedStyle = original; };
}

export function pointerDriver(recorder: ReturnType<typeof createRecorder>,
  resolve: (target: string) => EventTarget, nodes: () => Element[]) {
  function dispatch(input: Input) {
    const target = input.target ?? (/down$|start$/.test(input.type) ? 'node' : 'document');
    const point = (p: TouchPoint) => ({
      identifier: p.identifier, clientX: p.x, clientY: p.y, target: resolve(p.target ?? 'node')
    });
    const isTouch = input.type.startsWith('touch');
    let event: Event;
    if (isTouch) {
      event = new Event(input.type, {bubbles: true, cancelable: true});
      const changed = input.changedTouches ?? [{identifier: 1, x: input.x ?? 0, y: input.y ?? 0}];
      const touches = input.touches ?? (input.type === 'touchend' ? [] : changed);
      Object.defineProperties(event, {
        touches: {value: touches.map(point)},
        targetTouches: {value: (input.targetTouches ?? touches).map(point)},
        changedTouches: {value: changed.map(point)}
      });
    } else {
      const Constructor = input.type.startsWith('pointer') ? PointerEvent : MouseEvent;
      event = new Constructor(input.type, {
        bubbles: true, cancelable: true, clientX: input.x ?? 0, clientY: input.y ?? 0,
        button: input.button ?? 0, ctrlKey: input.ctrlKey ?? false
      });
    }
    recorder.trace.push({kind: 'input', ...input, target,
      clientX: (event as MouseEvent).clientX, clientY: (event as MouseEvent).clientY,
      button: (event as MouseEvent).button, ctrlKey: (event as MouseEvent).ctrlKey,
      defaultPrevented: event.defaultPrevented});
    const prevent = event.preventDefault;
    event.preventDefault = function() {
      recorder.trace.push({kind: 'preventDefault', eventType: event.type});
      prevent.call(event);
    };
    resolve(target).dispatchEvent(event);
    recorder.trace.push({kind: 'dispatched', type: input.type, defaultPrevented: event.defaultPrevented});
  }
  function run(inputs: Input[], cadence: string, action: (input: Input) => boolean) {
    const step = (input: Input) => { if (!action(input)) dispatch(input); };
    if (cadence === 'batched') {
      act(() => {
        for (const input of inputs.filter(event => !event.afterBatch)) {
          step(input);
          recorder.snapshot(input.type, nodes());
        }
      });
      recorder.snapshot('commit', nodes());
    }
    for (const input of inputs.filter(event => cadence !== 'batched' || event.afterBatch)) {
      act(() => step(input));
      recorder.snapshot(input.type, nodes());
    }
  }
  return {dispatch, run};
}
