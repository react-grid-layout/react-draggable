var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var Draggable = require('../index');

describe('react-draggable', function () {
	describe('props', function () {
		it('should have default properties', function () {
			var drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

			expect(drag.props.axis).toEqual('both');
			expect(drag.props.handle).toEqual(null);
			expect(drag.props.cancel).toEqual(null);
			expect(isNaN(drag.props.zIndex)).toEqual(true);
			expect(typeof drag.props.onStart).toEqual('function');
			expect(typeof drag.props.onDrag).toEqual('function');
			expect(typeof drag.props.onStop).toEqual('function');
		});

		it('should honor props', function () {
			function handleStart() {}
			function handleDrag() {}
			function handleStop() {}

			var drag = TestUtils.renderIntoDocument(
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
			var drag = TestUtils.renderIntoDocument(
				<Draggable onStart={function () { called = true; }}>
					<div/>
				</Draggable>
			);

			TestUtils.Simulate.mouseDown(drag.getDOMNode());
			expect(called).toEqual(true);
		});

		it('should call onStop when dragging ends', function () {
			var called = false;
			var drag = TestUtils.renderIntoDocument(
				<Draggable onStop={function () { called = true; }}>
					<div/>
				</Draggable>
			);

			TestUtils.Simulate.mouseDown(drag.getDOMNode());
			TestUtils.Simulate.mouseUp(drag.getDOMNode());
			expect(called).toEqual(true);
		});
	});

	describe('interaction', function () {
		it('should initialize dragging onmousedown', function () {
			var drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

			TestUtils.Simulate.mouseDown(drag.getDOMNode());
			expect(drag.state.dragging).toEqual(true);
		});

		it('should only initialize dragging onmousedown of handle', function () {
			var drag = TestUtils.renderIntoDocument(
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
			var drag = TestUtils.renderIntoDocument(
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
			var drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

			TestUtils.Simulate.mouseDown(drag.getDOMNode());
			expect(drag.state.dragging).toEqual(true);

			TestUtils.Simulate.mouseUp(drag.getDOMNode());
			expect(drag.state.dragging).toEqual(false);
		});
	});

	describe('validation', function () {
		it('should result with invariant when there isn\'t any children', function () {
			var drag = (<Draggable/>);

			var error = false;
			try {
				TestUtils.renderIntoDocument(drag);
			} catch (e) {
				error = true;
			}

			expect(error).toEqual(true);
		});

		it('should result with invariant if there\'s more than a single child', function () {
			var drag = (<Draggable><div/><div/></Draggable>);

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
