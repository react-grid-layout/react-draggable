/*eslint no-unused-vars:0*/
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react/lib/ReactTestUtils');
var Draggable = require('../index');
var DraggableCore = require('../index').DraggableCore;
var _ = require('lodash');
var browserPrefix = require('../lib/utils/getPrefix.es6');
var dashedBrowserPrefix = browserPrefix ? '-' + browserPrefix.toLowerCase() + '-' : '';

/*global describe,it,expect,afterEach */
describe('react-draggable', function () {
  var drag;

  beforeEach(function() {
    spyOn(console, 'error');
  });

  afterEach(function() {
    try {
      React.unmountComponentAtNode(React.findDOMNode(drag).parentNode);
      // TestUtils.Simulate.mouseUp(ReactDOM.findDOMNode(drag));
    } catch(e) { return; }
  });

  describe('props', function () {
    it('should have default properties', function () {
      drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

      expect(drag.props.axis).toEqual('both');
      expect(drag.props.handle).toEqual(null);
      expect(drag.props.cancel).toEqual(null);
      expect(drag.props.bounds).toBeFalsy();
      expect(isNaN(drag.props.zIndex)).toEqual(true);
      expect(typeof drag.props.onStart).toEqual('function');
      expect(typeof drag.props.onDrag).toEqual('function');
      expect(typeof drag.props.onStop).toEqual('function');
    });

    it('should pass style and className properly from child', function () {
      drag = (<Draggable><div className="foo" style={{color: 'black'}}/></Draggable>);

      expect(renderToHTML(drag)).toEqual('<div class="foo react-draggable" ' +
        'style="touch-action:none;color:black;transform:translate(0px,0px);' + dashedBrowserPrefix +
        'transform:translate(0px,0px);" data-reactid=".1"></div>');
    });

    // NOTE: this runs a shallow renderer, which DOES NOT actually render <DraggableCore>
    it('should pass handle on to <DraggableCore>', function () {
      drag = <Draggable handle=".foo"><div /></Draggable>;
      var renderer = TestUtils.createRenderer();
      renderer.render(drag);
      var output = renderer.getRenderOutput();

      var expected = (
        <DraggableCore {...Draggable.defaultProps} handle=".foo">
          <div
            className="react-draggable"
            style={{
              'transform': 'translate(0px,0px)',
              [browserPrefix + 'Transform']: 'translate(0px,0px)'
            }}
            transform={null} />
        </DraggableCore>
      );
      // Not easy to actually test equality here. The functions are bound as static props so we can't test those easily.
      var toOmit = ['onStart', 'onStop', 'onDrag'];
      expect(_.isEqual(
        _.omit(output.props, toOmit),
        _.omit(expected.props, toOmit))
      ).toEqual(true);
    });

    it('should honor props', function () {
      function handleStart() {}
      function handleDrag() {}
      function handleStop() {}

      drag = TestUtils.renderIntoDocument(
        <Draggable
          axis="y"
          handle=".handle"
          cancel=".cancel"
          grid={[10, 10]}
          zIndex={1000}
          onStart={handleStart}
          onDrag={handleDrag}
          onStop={handleStop}>
          <div className="foo bar">
            <div className="handle"/>
            <div className="cancel"/>
          </div>
        </Draggable>
      );

      expect(drag.props.axis).toEqual('y');
      expect(drag.props.handle).toEqual('.handle');
      expect(drag.props.cancel).toEqual('.cancel');
      expect(drag.props.grid).toEqual([10, 10]);
      expect(drag.props.zIndex).toEqual(1000);
      expect(drag.props.onStart).toEqual(handleStart);
      expect(drag.props.onDrag).toEqual(handleDrag);
      expect(drag.props.onStop).toEqual(handleStop);
    });

    it('should throw when setting className', function () {
      drag = (<Draggable className="foo"><span /></Draggable>);

      TestUtils.renderIntoDocument(drag);

      expect(console.error).toHaveBeenCalledWith('Warning: Failed propType: Invalid prop className passed to Draggable - do not set this, set it on the child.');
    });

    it('should throw when setting style', function () {
      drag = (<Draggable style={{color: 'red'}}><span /></Draggable>);

      TestUtils.renderIntoDocument(drag);

      expect(console.error).toHaveBeenCalledWith('Warning: Failed propType: Invalid prop style passed to Draggable - do not set this, set it on the child.');
    });

    it('should throw when setting transform', function () {
      drag = (<Draggable transform="translate(100, 100)"><span /></Draggable>);

      TestUtils.renderIntoDocument(drag);

      expect(console.error).toHaveBeenCalledWith('Warning: Failed propType: Invalid prop transform passed to Draggable - do not set this, set it on the child.');
    });

    it('should call onStart when dragging begins', function () {
      var called = false;
      drag = TestUtils.renderIntoDocument(
        <Draggable onStart={function () { called = true; }}>
          <div/>
        </Draggable>
      );

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag));
      expect(called).toEqual(true);
    });

    it('should call onStop when dragging ends', function () {
      var called = false;
      drag = TestUtils.renderIntoDocument(
        <Draggable onStop={function () { called = true; }}>
          <div/>
        </Draggable>
      );

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag));
      TestUtils.Simulate.mouseUp(ReactDOM.findDOMNode(drag));
      expect(called).toEqual(true);
    });

    it('should not call onStart when dragging begins and disabled', function () {
      var called = false;
      drag = TestUtils.renderIntoDocument(
        <Draggable onStart={function () { called = true; }} disabled={true}>
          <div/>
        </Draggable>
      );

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag));
      expect(called).toEqual(false);
    });

    it('should render with style translate() for DOM nodes', function () {
      var dragged = false;
      drag = TestUtils.renderIntoDocument(
        <Draggable onDrag={function() { dragged = true; }}>
          <div />
        </Draggable>
      );

      var node = ReactDOM.findDOMNode(drag);
      simulateMovementFromTo(drag, 0, 0, 100, 100);

      var style = node.getAttribute('style');
      expect(dragged).toEqual(true);
      expect(style.indexOf('transform: translate(100px, 100px);')).not.toEqual(-1);
    });

    it('should honor "x" axis', function () {
      var dragged = false;
      drag = TestUtils.renderIntoDocument(
        <Draggable onDrag={function() { dragged = true; }} axis="x">
          <div />
        </Draggable>
      );

      var node = ReactDOM.findDOMNode(drag);
      simulateMovementFromTo(drag, 0, 0, 100, 100);

      var style = node.getAttribute('style');
      expect(dragged).toEqual(true);
      expect(style.indexOf('transform: translate(100px, 0px);')).not.toEqual(-1);
    });

    it('should honor "y" axis', function () {
      var dragged = false;
      drag = TestUtils.renderIntoDocument(
        <Draggable onDrag={function() { dragged = true; }} axis="y">
          <div />
        </Draggable>
      );

      var node = ReactDOM.findDOMNode(drag);
      simulateMovementFromTo(drag, 0, 0, 100, 100);

      var style = node.getAttribute('style');
      expect(dragged).toEqual(true);
      expect(style.indexOf('transform: translate(0px, 100px);')).not.toEqual(-1);
    });

    it('should honor "none" axis', function () {
      var dragged = false;
      drag = TestUtils.renderIntoDocument(
        <Draggable onDrag={function() { dragged = true; }} axis="none">
          <div />
        </Draggable>
      );

      var node = ReactDOM.findDOMNode(drag);
      simulateMovementFromTo(drag, 0, 0, 100, 100);

      var style = node.getAttribute('style');
      expect(dragged).toEqual(true);
      // No idea why the spacing is different here
      expect(style.indexOf('transform:translate(0px,0px);')).not.toEqual(-1);
    });

    it('should detect if an element is instanceof SVGElement and set state.isElementSVG to true', function() {
       drag = TestUtils.renderIntoDocument(
          <Draggable>
            <svg />
          </Draggable>
      );

      expect(drag.state.isElementSVG).toEqual(true);
    });

    it('should detect if an element is NOT an instanceof SVGElement and set state.isElementSVG to false', function() {
       drag = TestUtils.renderIntoDocument(
          <Draggable>
            <div />
          </Draggable>
      );

      expect(drag.state.isElementSVG).toEqual(false);
    });

    it('should render with transform translate() for SVG nodes', function () {
      drag = TestUtils.renderIntoDocument(
          <Draggable>
            <svg />
          </Draggable>
      );

      var node = ReactDOM.findDOMNode(drag);
      simulateMovementFromTo(drag, 0, 0, 100, 100);

      var transform = node.getAttribute('transform');
      expect(transform.indexOf('translate(100,100)')).not.toEqual(-1);

    });

    it('should add and remove user-select styles', function () {
      // Karma runs in firefox in our tests
      var userSelectStyle = ';user-select: none;' + dashedBrowserPrefix + 'user-select: none;';

      drag = TestUtils.renderIntoDocument(
        <Draggable>
          <div />
        </Draggable>
      );

      var node = ReactDOM.findDOMNode(drag);

      expect(document.body.getAttribute('style')).toEqual('');
      TestUtils.Simulate.mouseDown(node, {clientX: 0, clientY: 0});
      expect(document.body.getAttribute('style')).toEqual(userSelectStyle);
      TestUtils.Simulate.mouseUp(node);
      expect(document.body.getAttribute('style')).toEqual('');
    });

    it('should not add and remove user-select styles when disabled', function () {
      // Karma runs in firefox in our tests
      var userSelectStyle = ';user-select: none;' + dashedBrowserPrefix + 'user-select: none;';

      drag = TestUtils.renderIntoDocument(
        <Draggable enableUserSelectHack={false}>
          <div />
        </Draggable>
      );

      var node = ReactDOM.findDOMNode(drag);

      expect(document.body.getAttribute('style')).toEqual('');
      TestUtils.Simulate.mouseDown(node, {clientX: 0, clientY: 0});
      expect(document.body.getAttribute('style')).toEqual('');
      TestUtils.Simulate.mouseUp(node);
      expect(document.body.getAttribute('style')).toEqual('');
    });
  });

  describe('interaction', function () {
    it('should initialize dragging onmousedown', function () {
      drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag));
      expect(drag.state.dragging).toEqual(true);
    });

    it('should only initialize dragging onmousedown of handle', function () {
      drag = TestUtils.renderIntoDocument(
        <Draggable handle=".handle">
          <div>
            <div className="handle">Handle</div>
            <div className="content">Lorem ipsum...</div>
          </div>
        </Draggable>
      );

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag).querySelector('.content'));
      expect(drag.state.dragging).toEqual(false);

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag).querySelector('.handle'));
      expect(drag.state.dragging).toEqual(true);
    });

    it('should not initialize dragging onmousedown of cancel', function () {
      drag = TestUtils.renderIntoDocument(
        <Draggable cancel=".cancel">
          <div>
            <div className="cancel">Cancel</div>
            <div className="content">Lorem ipsum...</div>
          </div>
        </Draggable>
      );

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag).querySelector('.cancel'));
      expect(drag.state.dragging).toEqual(false);

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag).querySelector('.content'));
      expect(drag.state.dragging).toEqual(true);
    });

    it('should discontinue dragging onmouseup', function () {
      drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag));
      expect(drag.state.dragging).toEqual(true);

      TestUtils.Simulate.mouseUp(ReactDOM.findDOMNode(drag));
      expect(drag.state.dragging).toEqual(false);
    });

    it('should modulate position on scroll', function (done) {
      // This test fails in karma under PhantomJS & Firefox, scroll event quirks
      var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
      if (!is_chrome) return done();

      var dragCalled = false;

      function onDrag(e, coreEvent) {
        expect(coreEvent.deltaY).toEqual(500);
        dragCalled = true;
      }
      drag = TestUtils.renderIntoDocument(<Draggable onDrag={onDrag}><div/></Draggable>);
      var node = ReactDOM.findDOMNode(drag);

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag)); // start drag so window listener is up
      expect(drag.state.dragging).toEqual(true);

      document.body.style.height = '10000px';
      window.scrollTo(0, 500);
      setTimeout(function() {
        expect(dragCalled).toEqual(true);
        expect(drag.state.clientY).toEqual(500);
        done();
      }, 50);
    });
  });

  describe('draggable callbacks', function () {
    it('should call back on drag', function () {
      function onDrag(event, data) {
        expect(data.position.left).toEqual(100);
        expect(data.position.top).toEqual(100);
        expect(data.deltaX).toEqual(100);
        expect(data.deltaY).toEqual(100);
      }
      drag = TestUtils.renderIntoDocument(
        <Draggable onDrag={onDrag}>
          <div />
        </Draggable>
      );

      // (element, fromX, fromY, toX, toY)
      simulateMovementFromTo(drag, 0, 0, 100, 100);
    });

    it('should call back with offset left/top, not client', function () {
      function onDrag(event, data) {
        expect(data.position.left).toEqual(100);
        expect(data.position.top).toEqual(100);
        expect(data.deltaX).toEqual(100);
        expect(data.deltaY).toEqual(100);
      }
      drag = TestUtils.renderIntoDocument(
        <Draggable onDrag={onDrag} style={{position: 'relative', top: '200px', left: '200px'}}>
          <div />
        </Draggable>
      );

      simulateMovementFromTo(drag, 200, 200, 300, 300);
    });
  });

  describe('validation', function () {
    it('should result with invariant when there isn\'t a child', function () {
      drag = (<Draggable/>);

      var error = false;
      try {
        TestUtils.renderIntoDocument(drag);
      } catch (e) {
        error = true;
      }

      expect(error).toEqual(true);
    });

    it('should result with invariant if there\'s more than a single child', function () {
      drag = (<Draggable><div/><div/></Draggable>);

      var error = false;
      try {
        TestUtils.renderIntoDocument(drag);
      } catch (e) {
        error = true;
      }

      expect(error).toEqual(true);
    });
  });
});

function renderToHTML(component) {
  return ReactDOM.findDOMNode(TestUtils.renderIntoDocument(component)).outerHTML;
}

// Simulate a movement; can't use TestUtils here because it uses react's event system only,
// but <DraggableCore> attaches event listeners directly to the document.
// Would love to new MouseEvent() here but it doesn't work with PhantomJS / old browsers.
// var e = new MouseEvent('mousemove', {clientX: 100, clientY: 100});
function mouseMove(x, y) {
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent('mousemove', true, true, window,
      0, 0, 0, x, y, false, false, false, false, 0, null);
  document.dispatchEvent(evt);
  return evt;
}


function simulateMovementFromTo(drag, fromX, fromY, toX, toY) {
  var node = ReactDOM.findDOMNode(drag);

  TestUtils.Simulate.mouseDown(node, {clientX: fromX, clientY: fromX});
  mouseMove(toX, toY);
  TestUtils.Simulate.mouseUp(node);
}
