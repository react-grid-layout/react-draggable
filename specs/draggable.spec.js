/** @jsx React.DOM */

require('./helper');

describe('react-draggable', function () {
	describe('props', function () {
		it('should have default properties', function () {
			var drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

			equal(drag.props.axis, 'both');
			equal(drag.props.handle, null);
			equal(drag.props.cancel, null);
			equal(isNaN(drag.props.zIndex), true);
			equal(typeof drag.props.onStart, 'function');
			equal(typeof drag.props.onDrag, 'function');
			equal(typeof drag.props.onStop, 'function');
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

			equal(drag.props.axis, 'y');
			equal(drag.props.handle, '.handle');
			equal(drag.props.cancel, '.cancel');
			deepEqual(drag.props.grid, [10, 10]);
			equal(drag.props.zIndex, 1000);
			equal(drag.props.onStart, handleStart);
			equal(drag.props.onDrag, handleDrag);
			equal(drag.props.onStop, handleStop);
		});

		it('should call onStart when dragging begins', function () {
			var called = false;
			var drag = TestUtils.renderIntoDocument(
				<Draggable onStart={function () { called = true; }}>
					<div/>
				</Draggable>
			);

			TestUtils.Simulate.mouseDown(drag.getDOMNode());
			equal(called, true);
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
			equal(called, true);
		});
	});

	describe('interaction', function () {
		it('should initialize dragging onmousedown', function () {
			var drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

			TestUtils.Simulate.mouseDown(drag.getDOMNode());
			equal(drag.state.dragging, true);
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
			equal(drag.state.dragging, false);

			TestUtils.Simulate.mouseDown(drag.getDOMNode().querySelector('.handle'));
			equal(drag.state.dragging, true);
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
			equal(drag.state.dragging, false);

			TestUtils.Simulate.mouseDown(drag.getDOMNode().querySelector('.content'));
			equal(drag.state.dragging, true);
		});

		it('should discontinue dragging onmouseup', function () {
			var drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

			TestUtils.Simulate.mouseDown(drag.getDOMNode());
			equal(drag.state.dragging, true);

			TestUtils.Simulate.mouseUp(drag.getDOMNode());
			equal(drag.state.dragging, false);
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

			equal(error, true);
		});

		it('should result with invariant if there\'s more than a single child', function () {
			var drag = (<Draggable><div/><div/></Draggable>);

			var error = false;
			try {
				TestUtils.renderIntoDocument(drag);
			} catch (e) {
				error = true;
			}

			equal(error, true);
		});
	});
});
