import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Draggable, {DraggableCore} from 'react-draggable';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

function handleStart() {}
function handleDrag() {}
function handleStop() {}
function handleMouseDown() {}

const nodeRef = React.createRef<HTMLDivElement>();
root.render(
  <Draggable
    axis="y"
    handle=".handle"
    cancel=".cancel"
    grid={[10, 10]}
    onStart={handleStart}
    onDrag={handleDrag}
    onStop={handleStop}
    offsetParent={document.body}
    onMouseDown={handleMouseDown}
    allowAnyClick={true}
    allowMobileScroll={false}
    disabled={true}
    enableUserSelectHack={false}
    bounds={false}
    defaultClassName={'draggable'}
    defaultClassNameDragging={'dragging'}
    defaultClassNameDragged={'dragged'}
    defaultPosition={{x: 0, y: 0}}
    nodeRef={nodeRef}
    positionOffset={{x: 0, y: 0}}
    position={{x: 50, y: 50}}>
    <div className="foo bar" ref={nodeRef}>
      <div className="handle"/>
      <div className="cancel"/>
    </div>
  </Draggable>
);

const nodeRefCore = React.createRef<HTMLDivElement>();
root.render(
  <DraggableCore
    handle=".handle"
    cancel=".cancel"
    allowAnyClick={true}
    disabled={true}
    onMouseDown={handleMouseDown}
    grid={[10, 10]}
    nodeRef={nodeRefCore}
    onStart={handleStart}
    onDrag={handleDrag}
    onStop={handleStop}
    offsetParent={document.body}
    enableUserSelectHack={false}
    allowMobileScroll={false}>
    <div className="foo bar" ref={nodeRefCore}>
      <div className="handle"/>
      <div className="cancel"/>
    </div>
  </DraggableCore>
);

root.render(<Draggable><div/></Draggable>);

root.render(<DraggableCore><div/></DraggableCore>);

// Both exports must be ComponentTypes for React.lazy, without consumer casts.
const LazyDraggable = React.lazy(() => import('react-draggable'));
const LazyCore = React.lazy(() => import('react-draggable').then(m => ({default: m.DraggableCore})));

root.render(<LazyDraggable><div/></LazyDraggable>);
root.render(<LazyCore><div/></LazyCore>);

// Lazy loading must preserve the component's prop checks.
// @ts-expect-error axis only accepts the documented directions
root.render(<LazyDraggable axis="diagonal"><div/></LazyDraggable>);
// @ts-expect-error scale must be a number
root.render(<LazyCore scale="large"><div/></LazyCore>);
