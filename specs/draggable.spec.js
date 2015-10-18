'use strict';
var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var Draggable = require('../index');

/*global describe,it,expect,afterEach */
describe('react-draggable', function () {
  var drag;
  afterEach(function() {
    if (drag && drag.getDOMNode) drag.componentWillUnmount();
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
      drag = <Draggable><div className="foo" style={{color: 'black'}}/></Draggable>;
      var renderer = TestUtils.createRenderer();
      renderer.render(drag);
      var output = renderer.getRenderOutput();

      expect(output.props.className).toEqual('foo react-draggable');
      expect(output.props.style.color).toEqual('black');
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
          <div>
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

    it('should call onStart when dragging begins', function () {
      var called = false;
      drag = TestUtils.renderIntoDocument(
        <Draggable onStart={function () { called = true; }}>
          <div/>
        </Draggable>
      );

      TestUtils.Simulate.mouseDown(drag.getDOMNode());
      expect(called).toEqual(true);
    });

    it('should call onStop when dragging ends', function () {
      var called = false;
      drag = TestUtils.renderIntoDocument(
        <Draggable onStop={function () { called = true; }}>
          <div/>
        </Draggable>
      );

      TestUtils.Simulate.mouseDown(drag.getDOMNode());
      TestUtils.Simulate.mouseUp(drag.getDOMNode());
      expect(called).toEqual(true);
    });

    it('should render with style translate() for DOM nodes', function () {
      drag = TestUtils.renderIntoDocument(
        <Draggable>
          <div />
        </Draggable>
      );

      var node = drag.getDOMNode();

      TestUtils.Simulate.mouseDown(node, {clientX: 0, clientY: 0});
      // FIXME why doesn't simulate on the window work?
      // TestUtils.Simulate.mouseMove(window, {clientX: 100, clientY: 100});
      drag.handleDrag({clientX: 100, clientY:100}); // hack
      TestUtils.Simulate.mouseUp(node);

      var style = node.getAttribute('style');
      expect(style.indexOf('transform: translate(100px, 100px);')).not.toEqual(-1);

    });

    it('should detect if an element is instanceof SVGElement and set state.isElementSVG to true', function() {
       drag = TestUtils.renderIntoDocument(
          <Draggable>
            <svg />
          </Draggable>
      );

      var node = drag.getDOMNode();
      expect(drag.state.isElementSVG).toEqual(true);

    });

    it('should detect if an element is NOT an instanceof SVGElement and set state.isElementSVG to false', function() {
       drag = TestUtils.renderIntoDocument(
          <Draggable>
            <div />
          </Draggable>
      );

      var node = drag.getDOMNode();
      expect(drag.state.isElementSVG).toEqual(false);

    });

    it('should render with transform translate() for SVG nodes', function () {
      drag = TestUtils.renderIntoDocument(
          <Draggable>
            <svg />
          </Draggable>
      );

      var node = drag.getDOMNode();

      TestUtils.Simulate.mouseDown(node, {clientX: 0, clientY: 0});
      drag.handleDrag({clientX: 100, clientY:100});
      TestUtils.Simulate.mouseUp(node);

      var transform = node.getAttribute('transform');
      expect(transform.indexOf('translate(100,100)')).not.toEqual(-1);

    });


    it('should add and remove user-select styles', function () {
      // Karma runs in firefox in our tests
      var userSelectStyle = ';user-select: none;-moz-user-select: none;';

      drag = TestUtils.renderIntoDocument(
        <Draggable>
          <div />
        </Draggable>
      );

      var node = drag.getDOMNode();

      expect(document.body.getAttribute('style')).toEqual('');
      TestUtils.Simulate.mouseDown(node, {clientX: 0, clientY: 0});
      expect(document.body.getAttribute('style')).toEqual(userSelectStyle);
      TestUtils.Simulate.mouseUp(node);
      expect(document.body.getAttribute('style')).toEqual('');
    });
  });

  describe('interaction', function () {
    it('should initialize dragging onmousedown', function () {
      drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

      TestUtils.Simulate.mouseDown(drag.getDOMNode());
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

      TestUtils.Simulate.mouseDown(drag.getDOMNode().querySelector('.content'));
      expect(drag.state.dragging).toEqual(false);

      TestUtils.Simulate.mouseDown(drag.getDOMNode().querySelector('.handle'));
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

      TestUtils.Simulate.mouseDown(drag.getDOMNode().querySelector('.cancel'));
      expect(drag.state.dragging).toEqual(false);

      TestUtils.Simulate.mouseDown(drag.getDOMNode().querySelector('.content'));
      expect(drag.state.dragging).toEqual(true);
    });

    it('should discontinue dragging onmouseup', function () {
      drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

      TestUtils.Simulate.mouseDown(drag.getDOMNode());
      expect(drag.state.dragging).toEqual(true);

      TestUtils.Simulate.mouseUp(drag.getDOMNode());
      expect(drag.state.dragging).toEqual(false);
    });
  });

  describe('validation', function () {
    it('should result with invariant when there isn\'t any children', function () {
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
