import React from 'react';
import {act, render, cleanup} from '@testing-library/react';
import {flushSync} from 'react-dom';
import Draggable, {DraggableCore} from '../../../lib/Draggable';
import {createRecorder} from '../recorder';
import {installLayout, pointerDriver} from '../harness';

/** Exercise the public component boundary. Lifecycle actions share the input timeline. */
export function runScenario(scenario) {
  document.body.className = '';
  document.getElementById('react-draggable-style-el')?.remove();
  window.getSelection().removeAllRanges();
  const recorder = createRecorder(document);
  const nodeRef = React.createRef();
  const idleRef = React.createRef();
  const parentRef = React.createRef();
  const customRef = React.createRef();
  const observedNodes = [];
  let restoreLayout;
  let props = {...scenario.props};
  let swapped = false;
  let showIdle = scenario.events.some(event => event.type === 'unmount-idle');
  let mounted = true;
  let view;
  const onError = event => {
    recorder.trace.push({kind: 'error', message: event.error?.message ?? event.message});
    event.preventDefault();
  };
  window.addEventListener('error', onError);

  function unmount() {
    if (!mounted) return;
    view?.unmount();
    mounted = false;
  }
  const callbacks = recorder.callbacks(scenario.component, scenario.returns, name => {
    if (scenario.unmountOn === name) flushSync(unmount);
  });

  function tree() {
    const Component = scenario.component === 'DraggableCore' ? DraggableCore : Draggable;
    const attach = node => {
      nodeRef.current = node;
      if (!node || observedNodes.includes(node)) return;
      observedNodes.push(node);
    };
    const child = scenario.svg ?
      <rect id={swapped ? 'swapped' : 'node'} className="seed" ref={attach} width="40" height="30" /> :
      React.createElement(swapped ? 'span' : 'div', {
        id: swapped ? 'swapped' : 'node', className: 'seed', ref: attach,
        style: {width: 40, height: 30}
      }, <span id="handle" className="handle"><span id="nested">drag</span></span>,
      <span id="cancel" className="cancel">cancel</span>);
    const offsetParent = scenario.useOffsetParent ? customRef.current : props.offsetParent;
    const draggable = <Component {...props} {...callbacks}
      {...(scenario.nodeRef === false ? {} : {nodeRef})}
      {...(offsetParent ? {offsetParent} : {})}>{child}</Component>;
    return <React.Fragment>
      <div id="custom" ref={customRef} />
      <div id="parent" ref={parentRef} style={{position: 'relative', width: 300, height: 200}}>
        {scenario.svg ? <svg>{draggable}</svg> : draggable}
        {showIdle && <DraggableCore nodeRef={idleRef}>
          <div id="idle" ref={node => {
            idleRef.current = node;
            if (node && !observedNodes.includes(node)) observedNodes.push(node);
          }} />
        </DraggableCore>}
      </div>
    </React.Fragment>;
  }
  function renderTree() {
    const element = scenario.strict ? <React.StrictMode>{tree()}</React.StrictMode> : tree();
    if (view) view.rerender(element);
    else view = render(element);
    if (nodeRef.current) {
      restoreLayout?.();
      restoreLayout = installLayout({node: nodeRef.current, parent: parentRef.current, custom: customRef.current}, scenario.geometry);
    }
  }

  function action(input) {
    if (['unmount', 'unmount-idle', 'swap-node', 'rerender', 'select', 'flush-frame'].includes(input.type)) {
      recorder.trace.push({kind: 'action', ...input});
    }
    switch (input.type) {
      case 'flush-frame': return true; // test/setup.js runs requestAnimationFrame synchronously.
      case 'unmount': unmount(); return true;
      case 'unmount-idle': showIdle = false; renderTree(); return true;
      case 'swap-node': swapped = true; renderTree(); return true;
      case 'rerender': props = {...props, ...input.props}; renderTree(); return true;
      case 'select': {
        const range = document.createRange();
        range.selectNodeContents(document.getElementById('handle'));
        window.getSelection().addRange(range);
        return true;
      }
      default: return false;
    }
  }

  try {
    renderTree();
    // The supplied offsetParent is available after refs attach, before input.
    if (scenario.useOffsetParent) renderTree();
    recorder.snapshot('mount', observedNodes);
    const driver = pointerDriver(recorder, target => {
      if (target === 'document') return document;
      if (target === 'node') return nodeRef.current ?? observedNodes[observedNodes.length - 1];
      const element = document.getElementById(target);
      if (!element) throw new Error(`Missing input target: ${target}`);
      return element;
    }, () => observedNodes);
    driver.run(scenario.events, scenario.cadence, action);
    if (mounted) {
      act(unmount);
      recorder.snapshot('unmount', observedNodes);
    }
    return {
      schemaVersion: 1, name: scenario.name, component: scenario.component,
      cadence: scenario.cadence, ...(scenario.knownBug ? {knownBug: scenario.knownBug} : {}),
      steps: recorder.trace
    };
  } finally {
    try {
      act(unmount);
      cleanup();
    } finally {
      restoreLayout?.();
      recorder.restore();
      window.removeEventListener('error', onError);
      document.body.className = '';
      document.getElementById('react-draggable-style-el')?.remove();
      window.getSelection().removeAllRanges();
    }
  }
}
