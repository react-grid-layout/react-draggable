var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var Draggable = require('../index');
var DraggableCore = require('../index').DraggableCore;
var _ = require('lodash');

/*global describe,it,expect,afterEach */
describe('react-draggable', function () {
  var drag;

  afterEach(function() {
    try {
      React.findDOMNode(drag);
      drag.componentWillUnmount();
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

      expect(renderToHTML(drag)).toEqual('<div class="foo" ' +
        'style="touch-action:none;color:black;transform:translate(0px,0px);-moz-transform:translate(0px,0px);" ' +
        'data-reactid=".1"></div>');
    });

    // NOTE: this runs a shallow renderer, which DOES NOT actually render <DraggableCore>
    it('should pass handle on to <DraggableCore>', function () {
      drag = <Draggable handle=".foo"><div /></Draggable>;
      var renderer = TestUtils.createRenderer();
      renderer.render(drag);
      var output = renderer.getRenderOutput();

      var expected = (
        <DraggableCore {...Draggable.defaultProps} handle=".foo" className="react-draggable"
          style={{
            'transform': 'translate(0px,0px)',
            'MozTransform': 'translate(0px,0px)'
          }}>
          <div />
        </DraggableCore>
      );
      // Not easy to actually test equality here. The functions are autobound so we can't test those easily.
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

      TestUtils.Simulate.mouseDown(React.findDOMNode(drag));
      expect(called).toEqual(true);
    });

    it('should call onStop when dragging ends', function () {
      var called = false;
      drag = TestUtils.renderIntoDocument(
        <Draggable onStop={function () { called = true; }}>
          <div/>
        </Draggable>
      );

      TestUtils.Simulate.mouseDown(React.findDOMNode(drag));
      TestUtils.Simulate.mouseUp(React.findDOMNode(drag));
      expect(called).toEqual(true);
    });

    it('should render with translate()', function () {
      var dragged = false;
      drag = TestUtils.renderIntoDocument(
        <Draggable onDrag={function() { dragged = true; }}>
          <div />
        </Draggable>
      );

      var node = React.findDOMNode(drag);

      TestUtils.Simulate.mouseDown(node, {clientX: 0, clientY: 0});
      // Simulate a movement; can't use TestUtils here because it uses react's event system only,
      // but <DraggableCore> attaches event listeners directly to the document.
      var e = new MouseEvent('mousemove', {clientX: 100, clientY: 100});
      document.dispatchEvent(e);
      TestUtils.Simulate.mouseUp(node);

      var style = node.getAttribute('style');
      expect(dragged).toEqual(true);
      expect(style.indexOf('transform: translate(100px, 100px);')).not.toEqual(-1);
    });

    it('should add and remove user-select styles', function () {
      // Karma runs in firefox in our tests
      var userSelectStyle = ';user-select: none;-moz-user-select: none;';

      drag = TestUtils.renderIntoDocument(
        <Draggable>
          <div />
        </Draggable>
      );

      var node = React.findDOMNode(drag);

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

      TestUtils.Simulate.mouseDown(React.findDOMNode(drag));
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

      TestUtils.Simulate.mouseDown(React.findDOMNode(drag).querySelector('.content'));
      expect(drag.state.dragging).toEqual(false);

      TestUtils.Simulate.mouseDown(React.findDOMNode(drag).querySelector('.handle'));
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

      TestUtils.Simulate.mouseDown(React.findDOMNode(drag).querySelector('.cancel'));
      expect(drag.state.dragging).toEqual(false);

      TestUtils.Simulate.mouseDown(React.findDOMNode(drag).querySelector('.content'));
      expect(drag.state.dragging).toEqual(true);
    });

    it('should discontinue dragging onmouseup', function () {
      drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

      TestUtils.Simulate.mouseDown(React.findDOMNode(drag));
      expect(drag.state.dragging).toEqual(true);

      TestUtils.Simulate.mouseUp(React.findDOMNode(drag));
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

function renderToHTML(component) {
  return React.findDOMNode(TestUtils.renderIntoDocument(component)).outerHTML;
}
