import type {DraggableData} from '../../lib/utils/types';

export type TraceStep = Record<string, unknown>;
type CallbackName = 'onMouseDown' | 'onStart' | 'onDrag' | 'onStop';
type ReturnValues = Partial<Record<CallbackName, unknown>>;
type Listener = {
  target: EventTarget, type: string, callback: EventListenerOrEventListenerObject | null,
  capture: boolean, passive: boolean | undefined
};

const documentEvents = new Set(['mousemove', 'mouseup', 'touchmove', 'touchend']);
const targetId = (target: EventTarget, doc: Document): string =>
  target === doc ? 'document' : (target as Element).id;

/** Track actual listener identities, including duplicate adds and failed removes. */
export function createRecorder(doc: Document = document) {
  const trace: TraceStep[] = [];
  const attached: Listener[] = [];
  const prototype = doc.defaultView!.EventTarget.prototype;
  const add = prototype.addEventListener;
  const remove = prototype.removeEventListener;
  const relevant = (target: EventTarget, type: string) =>
    (target === doc && documentEvents.has(type)) ||
    (type === 'touchstart' && ['node', 'idle', 'swapped'].includes((target as Element).id));

  function observe(target: EventTarget, type: string, callback: Listener['callback'],
    options: boolean | AddEventListenerOptions | undefined, operation: 'add' | 'remove') {
    if (!relevant(target, type)) return;
    const capture = typeof options === 'boolean' ? options : Boolean(options?.capture);
    const passive = typeof options === 'object' ? options.passive : undefined;
    const index = attached.findIndex(entry => entry.target === target && entry.type === type &&
      entry.callback === callback && entry.capture === capture);
    if (operation === 'add' && index === -1) attached.push({target, type, callback, capture, passive});
    if (operation === 'remove' && index !== -1) attached.splice(index, 1);
    trace.push({kind: 'listener', operation, target: targetId(target, doc), type, capture, passive});
  }

  prototype.addEventListener = function(type, callback, options) {
    observe(this, type, callback, options, 'add');
    return add.call(this, type, callback, options);
  };
  prototype.removeEventListener = function(type, callback, options) {
    observe(this, type, callback, options, 'remove');
    return remove.call(this, type, callback, options);
  };

  function callbacks(component: string, returns: ReturnValues = {},
    effect?: (name: CallbackName, event: Event, data?: DraggableData) => void) {
    return Object.fromEntries((['onMouseDown', 'onStart', 'onDrag', 'onStop'] as const).map(name => [
      name, (event: Event, data?: DraggableData) => {
        const returned = returns[name];
        const serialized = data && {
          nodeId: data.node.id, x: data.x, y: data.y,
          deltaX: data.deltaX, deltaY: data.deltaY, lastX: data.lastX, lastY: data.lastY
        };
        trace.push({kind: 'callback', name, component, eventType: event.type, data: serialized, returned});
        effect?.(name, event, data);
        return returned;
      }
    ]));
  }

  function snapshot(label: string, nodes: Element[]) {
    const style = doc.getElementById('react-draggable-style-el');
    trace.push({
      kind: 'snapshot', label,
      dom: nodes.map(node => ({
        id: node.id, connected: node.isConnected,
        styleTransform: (node as HTMLElement).style.transform,
        translate: (node as HTMLElement).style.translate,
        svgTransformAttr: node.getAttribute('transform'),
        classes: [...node.classList].sort()
      })),
      body: {
        hasSelectionClass: doc.body.classList.contains('react-draggable-transparent-selection'),
        styleElExists: Boolean(style), styleElNonce: style?.getAttribute('nonce') ?? null
      },
      selection: doc.defaultView!.getSelection()?.rangeCount ?? null,
      listeners: attached.map(({target, type, capture, passive}) => ({
        target: targetId(target, doc), type, capture, passive
      })).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))
    });
  }

  function restore() {
    // A known-bug trace may deliberately leave listeners on a detached old node.
    for (const entry of attached) remove.call(entry.target, entry.type, entry.callback, entry.capture);
    prototype.addEventListener = add;
    prototype.removeEventListener = remove;
  }
  return {trace, callbacks, snapshot, restore};
}

/** Browser differential: ignore dispatch mechanics, retain all shared outputs. */
export function observableTrace(trace: TraceStep[]): TraceStep[] {
  return trace.filter(step => step.kind === 'callback' || step.kind === 'snapshot');
}
