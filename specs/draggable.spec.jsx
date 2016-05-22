/*eslint no-unused-vars:0, no-console:0*/
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Draggable, {DraggableCore} from '../index';
import assert from 'power-assert';
import _ from 'lodash';
import {getPrefix, browserPrefixToKey, browserPrefixToStyle} from '../lib/utils/getPrefix';
const transformStyle = browserPrefixToStyle('transform', getPrefix('transform'));
const transformKey = browserPrefixToKey('transform', getPrefix('transform'));
const userSelectStyle = browserPrefixToStyle('user-select', getPrefix('user-select'));

/*global describe,it,expect, afterEach */
describe('react-draggable', function () {
  var drag;

  beforeEach(function() {
    spyOn(console, 'error');
  });

  afterEach(function() {
    try {
      TestUtils.Simulate.mouseUp(ReactDOM.findDOMNode(drag)); // reset user-select
      React.unmountComponentAtNode(ReactDOM.findDOMNode(drag).parentNode);
    } catch(e) { return; }
  });

  describe('props', function () {
    it('should have default properties', function () {
      drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

      assert(drag.props.axis === 'both');
      assert(drag.props.handle === null);
      assert(drag.props.cancel === null);
      assert(drag.props.bounds == false);
      assert(isNaN(drag.props.zIndex) === true);
      assert(typeof drag.props.onStart === 'function');
      assert(typeof drag.props.onDrag === 'function');
      assert(typeof drag.props.onStop === 'function');
    });

    it('should pass style and className properly from child', function () {
      drag = (<Draggable><div className="foo" style={{color: 'black'}}/></Draggable>);

      var node = renderToNode(drag);
      if ('touchAction' in document.body.style) {
        assert(node.getAttribute('style').indexOf('touch-action: none') >= 0);
      }
      assert(node.getAttribute('style').indexOf('color: black') >= 0);
      assert(node.getAttribute('style').indexOf(transformStyle + ': translate(0px, 0px)') >= 0);
      assert(node.getAttribute('class') === 'foo react-draggable');
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
              [transformKey]: 'translate(0px, 0px)'
            }}
            transform={null} />
        </DraggableCore>
      );

      // Not easy to actually test equality here. The functions are bound as static props so we can't test those easily.
      var toOmit = ['onStart', 'onStop', 'onDrag', 'onMouseDown', 'children'];
      assert(_.isEqual(
        _.omit(output.props, toOmit),
        _.omit(expected.props, toOmit))
      );
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

      assert(drag.props.axis === 'y');
      assert(drag.props.handle === '.handle');
      assert(drag.props.cancel === '.cancel');
      assert(_.isEqual(drag.props.grid, [10, 10]));
      assert(drag.props.zIndex === 1000);
      assert(drag.props.onStart === handleStart);
      assert(drag.props.onDrag === handleDrag);
      assert(drag.props.onStop === handleStop);
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
      assert(called === true);
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
      assert(called === true);
    });

    it('should not call onStart when dragging begins and disabled', function () {
      var called = false;
      drag = TestUtils.renderIntoDocument(
        <Draggable onStart={function () { called = true; }} disabled={true}>
          <div/>
        </Draggable>
      );

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag));
      assert(called === false);
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
      assert(dragged === true);
      assert(style.indexOf('transform: translate(100px, 100px);') >= 0);
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
      assert(dragged === true);
      assert(style.indexOf('transform: translate(100px, 0px);') >= 0);
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
      assert(dragged === true);
      assert(style.indexOf('transform: translate(0px, 100px);') >= 0);
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
      assert(dragged === true);
      assert(style.indexOf('transform: translate(0px, 0px);') >= 0);
    });

    it('should detect if an element is instanceof SVGElement and set state.isElementSVG to true', function() {
       drag = TestUtils.renderIntoDocument(
          <Draggable>
            <svg />
          </Draggable>
      );

      assert(drag.state.isElementSVG === true);
    });

    it('should detect if an element is NOT an instanceof SVGElement and set state.isElementSVG to false', function() {
       drag = TestUtils.renderIntoDocument(
          <Draggable>
            <div />
          </Draggable>
      );

      assert(drag.state.isElementSVG === false);
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
      assert(transform.indexOf('translate(100,100)') >= 0);
    });

    it('should add and remove user-select styles', function () {
      var userSelectStyleStr = `;${userSelectStyle}: none;`;

      drag = TestUtils.renderIntoDocument(
        <Draggable>
          <div />
        </Draggable>
      );

      var node = ReactDOM.findDOMNode(drag);

      assert(document.body.getAttribute('style') === '');
      TestUtils.Simulate.mouseDown(node, {clientX: 0, clientY: 0});
      assert(document.body.getAttribute('style') === userSelectStyleStr);
      TestUtils.Simulate.mouseUp(node);
      assert(document.body.getAttribute('style') === '');
    });

    it('should not add and remove user-select styles when disabled', function () {

      drag = TestUtils.renderIntoDocument(
        <Draggable enableUserSelectHack={false}>
          <div />
        </Draggable>
      );

      var node = ReactDOM.findDOMNode(drag);

      assert(document.body.getAttribute('style') === '');
      TestUtils.Simulate.mouseDown(node, {clientX: 0, clientY: 0});
      assert(document.body.getAttribute('style') === '');
      TestUtils.Simulate.mouseUp(node);
      assert(document.body.getAttribute('style') === '');
    });

    it('should not add and remove user-select styles when onStart returns false', function () {
      function onStart() { return false; }

      drag = TestUtils.renderIntoDocument(
        <Draggable onStart={onStart}>
          <div />
        </Draggable>
      );

      var node = ReactDOM.findDOMNode(drag);

      assert(document.body.getAttribute('style') === '');
      TestUtils.Simulate.mouseDown(node, {clientX: 0, clientY: 0});
      assert(document.body.getAttribute('style') === '');
      TestUtils.Simulate.mouseUp(node);
      assert(document.body.getAttribute('style') === '');
    });
  });

  describe('interaction', function () {

    function mouseDownOn(drag, selector, shouldDrag) {
      resetDragging(drag);
      const node = ReactDOM.findDOMNode(drag).querySelector(selector);
      if (!node) throw new Error(`Selector not found: ${selector}`);
      TestUtils.Simulate.mouseDown(node);
      assert(drag.state.dragging === shouldDrag);
    }

    function resetDragging(drag) {
      TestUtils.Simulate.mouseUp(ReactDOM.findDOMNode(drag));
      assert(drag.state.dragging === false);
    }

    it('should initialize dragging onmousedown', function () {
      drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag));
      assert(drag.state.dragging === true);
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

      mouseDownOn(drag, '.content', false);
      mouseDownOn(drag, '.handle', true);
    });

    it('should only initialize dragging onmousedown of handle, even if children fire event', function () {
      drag = TestUtils.renderIntoDocument(
        <Draggable handle=".handle">
          <div>
            <div className="handle">
              <div><span><div className="deep">Handle</div></span></div>
            </div>
            <div className="content">Lorem ipsum...</div>
          </div>
        </Draggable>
      );

      mouseDownOn(drag, '.content', false);
      mouseDownOn(drag, '.deep', true);
      mouseDownOn(drag, '.handle > div', true);
      mouseDownOn(drag, '.handle span', true);
      mouseDownOn(drag, '.handle', true);
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

      mouseDownOn(drag, '.cancel', false);
      mouseDownOn(drag, '.content', true);
    });

    it('should not initialize dragging onmousedown of handle, even if children fire event', function () {
      drag = TestUtils.renderIntoDocument(
        <Draggable cancel=".cancel">
          <div>
            <div className="cancel">
              <div><span><div className="deep">Cancel</div></span></div>
            </div>
            <div className="content">Lorem ipsum...</div>
          </div>
        </Draggable>
      );

      mouseDownOn(drag, '.content', true);
      mouseDownOn(drag, '.deep', false);
      mouseDownOn(drag, '.cancel > div', false);
      mouseDownOn(drag, '.cancel span', false);
      mouseDownOn(drag, '.cancel', false);
    });

    it('should discontinue dragging onmouseup', function () {
      drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag));
      assert(drag.state.dragging === true);

      resetDragging(drag);
    });

    it('should modulate position on scroll', function (done) {
      // This test fails in karma under Chrome & Firefox, positioning quirks
      // FIXME: Why? Chrome reports 2x scrollTo, Phantom reports 0x, Firefox reports 1x as it should
      var is_ff = navigator.userAgent.toLowerCase().indexOf('Firefox') > -1;
      if (!is_ff) return done();

      var dragCalled = false;

      function onDrag(e, coreEvent) {
        assert(coreEvent.deltaY === 500);
        dragCalled = true;
      }
      drag = TestUtils.renderIntoDocument(<Draggable onDrag={onDrag}><div/></Draggable>);
      var node = ReactDOM.findDOMNode(drag);

      TestUtils.Simulate.mouseDown(node, {clientX: 0, clientY: 0});
      assert(drag.state.dragging === true);

      document.body.style.height = '10000px';
      window.scrollTo(0, 500);
      TestUtils.Simulate.mouseUp(node, {clientX: 0, clientY: 0});
      setTimeout(function() {
        assert(dragCalled === true);
        assert(drag.state.clientY === 500);
        done();
      }, 50);
    });
  });

  describe('draggable callbacks', function () {
    it('should call back on drag', function () {
      function onDrag(event, data) {
        assert(data.x === 100);
        assert(data.y === 100);
        assert(data.deltaX === 100);
        assert(data.deltaY === 100);
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
        assert(data.x === 100);
        assert(data.y === 100);
        assert(data.deltaX === 100);
        assert(data.deltaY === 100);
      }
      drag = TestUtils.renderIntoDocument(
        <Draggable onDrag={onDrag} style={{position: 'relative', top: '200px', left: '200px'}}>
          <div />
        </Draggable>
      );

      simulateMovementFromTo(drag, 200, 200, 300, 300);
    });
  });

  describe('DraggableCore callbacks', function () {
    it('should call back with node on drag', function () {
      function onDrag(event, data) {
        assert(data.x === 100);
        assert(data.y === 100);
        assert(data.deltaX === 100);
        assert(data.deltaY === 100);
        assert(data.node === ReactDOM.findDOMNode(drag));
      }
      drag = TestUtils.renderIntoDocument(
        <DraggableCore onDrag={onDrag}>
          <div />
        </DraggableCore>
      );

      // (element, fromX, fromY, toX, toY)
      simulateMovementFromTo(drag, 0, 0, 100, 100);
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

      assert(error === true);
    });

    it('should result with invariant if there\'s more than a single child', function () {
      drag = (<Draggable><div/><div/></Draggable>);

      var error = false;
      try {
        TestUtils.renderIntoDocument(drag);
      } catch (e) {
        error = true;
      }

      assert(error === true);
    });
  });
});

function renderToHTML(component) {
  return renderToNode(component).outerHTML;
}

function renderToNode(component) {
  return ReactDOM.findDOMNode(TestUtils.renderIntoDocument(component));
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
