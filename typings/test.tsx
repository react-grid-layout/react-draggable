import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Draggable, {DraggableCore} from 'react-draggable';

const root = document.getElementById('root')

function handleStart() {}
function handleDrag() {}
function handleStop() {}
function handleMouseDown() {}

ReactDOM.render(
  <Draggable
    axis="y"
    handle=".handle"
    cancel=".cancel"
    grid={[10, 10]}
    onStart={handleStart}
    onDrag={handleDrag}
    onStop={handleStop}
    offsetParent={document.body}
    allowAnyClick={true}
    onMouseDown={handleMouseDown}
    disabled={true}
    enableUserSelectHack={false}
    bounds={false}
    defaultClassName={'draggable'}
    defaultClassNameDragging={'dragging'}
    defaultClassNameDragged={'dragged'}
    defaultPosition={{x: 0, y: 0}}
    positionOffset={{x: 0, y: 0}}
    position={{x: 50, y: 50}}>
    <div className="foo bar">
      <div className="handle"/>
      <div className="cancel"/>
    </div>
  </Draggable>,
  root
);

ReactDOM.render(
  <DraggableCore
    handle=".handle"
    cancel=".cancel"
    allowAnyClick={true}
    disabled={true}
    onMouseDown={handleMouseDown}
    grid={[10, 10]}
    onStart={handleStart}
    onDrag={handleDrag}
    onStop={handleStop}
    offsetParent={document.body}
    enableUserSelectHack={false}>
    <div className="foo bar">
      <div className="handle"/>
      <div className="cancel"/>
    </div>
  </DraggableCore>,
  root
);


ReactDOM.render(<Draggable><div/></Draggable>, root);

ReactDOM.render(<DraggableCore><div/></DraggableCore>, root);
