import React, {act} from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest';
import Draggable from '../../../lib/Draggable';
import DraggableCore from '../../../lib/DraggableCore';
import {version} from '../../../package.json';
import {createRecorder} from '../recorder';
import {expectGolden} from '../expectGolden';
import {pointerDriver} from '../harness';

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.stubGlobal('requestAnimationFrame', callback => { callback(); return 0; });
  document.body.className = '';
  document.getElementById('react-draggable-style-el')?.remove();
  window.getSelection().removeAllRanges();
});
afterEach(() => vi.unstubAllGlobals());

function runLegacy(Component, component, name) {
  const parent = document.createElement('div');
  parent.id = 'parent';
  parent.style.cssText = 'position:relative;width:300px;height:200px';
  document.body.appendChild(parent);
  const recorder = createRecorder(document);
  const root = createRoot(parent);
  let node;
  let mounted = true;
  try {
    // Omitting nodeRef exercises the real React 18 findDOMNode implementation.
    act(() => root.render(
      <Component {...recorder.callbacks(component)}>
        <div id="node" className="seed" style={{width: 40, height: 30}} />
      </Component>
    ));
    node = parent.firstElementChild;
    recorder.snapshot('mount', [node]);
    const events = [
      {type: 'mousedown', target: 'node', x: 10, y: 10},
      {type: 'mousemove', target: 'document', x: 40, y: 25},
      {type: 'mouseup', target: 'document', x: 40, y: 25},
      {type: 'mousemove', target: 'document', x: 70, y: 45},
    ];
    pointerDriver(recorder, target => target === 'node' ? node : document, () => [node])
      .run(events, 'per-event', () => false);
    act(() => root.unmount());
    mounted = false;
    recorder.snapshot('unmount', [node]);
    return {
      schemaVersion: 1, version, reactVersion: React.version, name, component,
      cadence: 'per-event', steps: recorder.trace,
    };
  } finally {
    if (mounted) act(() => root.unmount());
    recorder.restore();
    parent.remove();
    document.body.className = '';
    document.getElementById('react-draggable-style-el')?.remove();
    window.getSelection().removeAllRanges();
  }
}

describe('React 18 legacy findDOMNode source traces', () => {
  test.each([
    ['legacy-core-findDOMNode', 'DraggableCore', DraggableCore],
    ['legacy-draggable-findDOMNode', 'Draggable', Draggable],
  ])('%s', (name, component, Component) => {
    expect(React.version).toBe('18.3.1');
    expect(ReactDOM.version).toBe(React.version);
    const trace = runLegacy(Component, component, name);
    // Regeneration must still demonstrate a successful legacy drag lifecycle.
    expect(trace.steps.filter(step => step.kind === 'callback').map(step => step.name))
      .toEqual(['onMouseDown', 'onStart', 'onDrag', 'onStop']);
    expectGolden(name, trace);
  });
});
