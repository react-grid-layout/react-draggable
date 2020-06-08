const {ReactDraggable: Draggable, React, ReactDOM} = window;

class App extends React.Component {
  state = {
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  };

  handleDrag = (e, ui) => {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };

  onStart = () => {
    this.setState({activeDrags: ++this.state.activeDrags});
  };

  onStop = () => {
    this.setState({activeDrags: --this.state.activeDrags});
  };

  // For controlled component
  adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {x, y} = this.state.controlledPosition;
    this.setState({controlledPosition: {x: x - 10, y}});
  };

  adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {controlledPosition} = this.state;
    const {x, y} = controlledPosition;
    this.setState({controlledPosition: {x, y: y - 10}});
  };

  onControlledDrag = (e, position) => {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };

  render() {
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;
    return (
      <div>
        <h1>React Draggable</h1>
        <p>Active DragHandlers: {this.state.activeDrags}</p>
        <p>
          <a href="https://github.com/STRML/react-draggable/blob/master/example/example.js">Demo Source</a>
        </p>
        <Draggable {...dragHandlers}>
          <div className="box">I can be dragged anywhere</div>
        </Draggable>
        <Draggable axis="x" {...dragHandlers}>
          <div className="box cursor-x">I can only be dragged horizonally (x axis)</div>
        </Draggable>
        <Draggable axis="y" {...dragHandlers}>
          <div className="box cursor-y">I can only be dragged vertically (y axis)</div>
        </Draggable>
        <Draggable onStart={() => false}>
          <div className="box">I don't want to be dragged</div>
        </Draggable>
        <Draggable onDrag={this.handleDrag} {...dragHandlers}>
          <div className="box">
            <div>I track my deltas</div>
            <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
          </div>
        </Draggable>
        <Draggable handle="strong" {...dragHandlers}>
          <div className="box no-cursor">
            <strong className="cursor"><div>Drag here</div></strong>
            <div>You must click my handle to drag me</div>
          </div>
        </Draggable>
        <Draggable handle="strong">
          <div className="box no-cursor" style={{display: 'flex', flexDirection: 'column'}}>
            <strong className="cursor"><div>Drag here</div></strong>
            <div style={{overflow: 'scroll'}}>
              <div style={{background: 'yellow', whiteSpace: 'pre-wrap'}}>
                I have long scrollable content with a handle
                {'\n' + Array(40).fill('x').join('\n')}
              </div>
            </div>
          </div>
        </Draggable>
        <Draggable cancel="strong" {...dragHandlers}>
          <div className="box">
            <strong className="no-cursor">Can't drag here</strong>
            <div>Dragging here works</div>
          </div>
        </Draggable>
        <Draggable grid={[25, 25]} {...dragHandlers}>
          <div className="box">I snap to a 25 x 25 grid</div>
        </Draggable>
        <Draggable grid={[50, 50]} {...dragHandlers}>
          <div className="box">I snap to a 50 x 50 grid</div>
        </Draggable>
        <Draggable bounds={{top: -100, left: -100, right: 100, bottom: 100}} {...dragHandlers}>
          <div className="box">I can only be moved 100px in any direction.</div>
        </Draggable>
        <div className="box" style={{height: '500px', width: '500px', position: 'relative', overflow: 'auto', padding: '0'}}>
          <div style={{height: '1000px', width: '1000px', padding: '10px'}}>
            <Draggable bounds="parent" {...dragHandlers}>
              <div className="box">
                I can only be moved within my offsetParent.<br /><br />
                Both parent padding and child margin work properly.
              </div>
            </Draggable>
            <Draggable bounds="parent" {...dragHandlers}>
              <div className="box">
                I also can only be moved within my offsetParent.<br /><br />
                Both parent padding and child margin work properly.
              </div>
            </Draggable>
          </div>
        </div>
        <Draggable bounds="body" {...dragHandlers}>
          <div className="box">
            I can only be moved within the confines of the body element.
          </div>
        </Draggable>
        <Draggable {...dragHandlers}>
          <div className="box" style={{position: 'absolute', bottom: '100px', right: '100px'}}>
            I already have an absolute position.
          </div>
        </Draggable>
        <Draggable {...dragHandlers}>
          <RemWrapper>
            <div className="box rem-position-fix" style={{position: 'absolute', bottom: '6.25rem', right: '18rem'}}>
              I use <span style={{ fontWeight: 700 }}>rem</span> instead of <span style={{ fontWeight: 700 }}>px</span> for my transforms. I also have absolute positioning.

              <br /><br />
              I depend on a CSS hack to avoid double absolute positioning.
            </div>
          </RemWrapper>
        </Draggable>
        <Draggable defaultPosition={{x: 25, y: 25}} {...dragHandlers}>
          <div className="box">
            {"I have a default position of {x: 25, y: 25}, so I'm slightly offset."}
          </div>
        </Draggable>
        <Draggable positionOffset={{x: '-10%', y: '-10%'}} {...dragHandlers}>
          <div className="box">
            {'I have a default position based on percents {x: \'-10%\', y: \'-10%\'}, so I\'m slightly offset.'}
          </div>
        </Draggable>
        <Draggable position={controlledPosition} {...dragHandlers} onDrag={this.onControlledDrag}>
          <div className="box">
            My position can be changed programmatically. <br />
            I have a drag handler to sync state.
            <div>
              <a href="#" onClick={this.adjustXPos}>Adjust x ({controlledPosition.x})</a>
            </div>
            <div>
              <a href="#" onClick={this.adjustYPos}>Adjust y ({controlledPosition.y})</a>
            </div>
          </div>
        </Draggable>
        <Draggable position={controlledPosition} {...dragHandlers} onStop={this.onControlledDragStop}>
          <div className="box">
            My position can be changed programmatically. <br />
            I have a dragStop handler to sync state.
            <div>
              <a href="#" onClick={this.adjustXPos}>Adjust x ({controlledPosition.x})</a>
            </div>
            <div>
              <a href="#" onClick={this.adjustYPos}>Adjust y ({controlledPosition.y})</a>
            </div>
          </div>
        </Draggable>

      </div>
    );
  }
}

class RemWrapper extends React.Component {
  // PropTypes is not available in this environment, but here they are.
  // static propTypes = {
  //   style: PropTypes.shape({
  //     transform: PropTypes.string.isRequired
  //   }),
  //   children: PropTypes.node.isRequired,
  //   remBaseline: PropTypes.number,
  // }

  translateTransformToRem(transform, remBaseline = 16) {
    const convertedValues = transform.replace('translate(', '').replace(')', '')
      .split(',')
      .map(px => px.replace('px', ''))
      .map(px => parseInt(px, 10) / remBaseline)
      .map(x => `${x}rem`)
    const [x, y] = convertedValues

    return `translate(${x}, ${y})`
  }

  render() {
    const { children, remBaseline = 16, style } = this.props
    const child = React.Children.only(children)

    const editedStyle = {
      ...child.props.style,
      ...style,
      transform: this.translateTransformToRem(style.transform, remBaseline),
    }

    return React.cloneElement(child, {
       ...child.props,
       ...this.props,
       style: editedStyle
    })
  }
}


ReactDOM.render(<App/>, document.getElementById('container'));
