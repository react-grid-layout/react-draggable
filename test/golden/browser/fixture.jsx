import React from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
import Draggable from '../../../lib/Draggable';
import DraggableCore from '../../../lib/DraggableCore';
import {createRecorder, observableTrace} from '../recorder';
import {stableValue} from '../serialize';
import {scenarios} from '../scenarios/cases';

let mounted;
const settle = () => new Promise(resolve => requestAnimationFrame(() => resolve()));

async function mount(name) {
  if (mounted) throw new Error('The browser fixture already has a mounted scenario.');
  const scenario = scenarios.find(item => item.name === name);
  if (!scenario) throw new Error(`Unknown golden scenario: ${name}`);
  if (scenario.cadence !== 'per-event') throw new Error('Real input requires per-event cadence.');
  if (scenario.geometry || scenario.svg || scenario.useOffsetParent || scenario.strict ||
      scenario.unmountOn || scenario.nodeRef === false) {
    throw new Error('This browser cross-check requires the default HTML geometry and lifecycle.');
  }
  const nodeRef = React.createRef();
  const recorder = createRecorder(document);
  window.__trace = recorder.trace;
  const root = createRoot(document.getElementById('root'));
  const Component = scenario.component === 'DraggableCore' ? DraggableCore : Draggable;
  const callbacks = recorder.callbacks(scenario.component, scenario.returns);

  // Native CSS layout is the independent oracle. Do not import installLayout.
  flushSync(() => root.render(
    <div id="parent" style={{position: 'relative', width: 300, height: 200}}>
      <Component {...scenario.props} {...callbacks} nodeRef={nodeRef}>
        <div id="node" ref={nodeRef} className="seed" style={{width: 40, height: 30}}>
          <span id="handle" className="handle"><span id="nested">drag</span></span>
          <span id="cancel" className="cancel">cancel</span>
        </div>
      </Component>
    </div>
  ));
  await settle();
  mounted = {root, recorder, node: nodeRef.current};
  recorder.snapshot('mount', [mounted.node]);
}

function prepareInput(input) {
  const target = input.target ?? (input.type === 'mousedown' ? 'node' : 'document');
  const node = document.getElementById('node');
  for (const id of ['handle', 'nested', 'cancel']) {
    const child = document.getElementById(id);
    child.style.pointerEvents = 'none';
    child.style.position = 'absolute';
    child.style.inset = '0';
  }
  if (target !== 'document' && target !== 'node') {
    document.getElementById(target).style.pointerEvents = 'auto';
  }
  const hit = document.elementFromPoint(input.x, input.y);
  if (input.type === 'mousedown' && hit?.id !== target) {
    throw new Error(`Expected real pointer target ${target}, got ${hit?.id || hit?.tagName}; ` +
      `point (${input.x}, ${input.y}), node bounds ${JSON.stringify(node.getBoundingClientRect())}`);
  }
}

async function snapshot(label) {
  await settle();
  mounted.recorder.snapshot(label, [mounted.node]);
}

async function unmount() {
  flushSync(() => mounted.root.unmount());
  await settle();
  mounted.recorder.snapshot('unmount', [mounted.node]);
  const result = stableValue(observableTrace(mounted.recorder.trace));
  mounted.recorder.restore();
  mounted = undefined;
  return result;
}

window.goldenBrowser = {mount, prepareInput, snapshot, unmount};
