/** @jsx React.DOM */
var React = require('react'),
	Draggable = require('../lib/main');

React.renderComponent(<div>
	<Draggable>
		<div className="foo">Hello</div>
	</Draggable>
	<Draggable>
		<div className="foo">World</div>
	</Draggable>
</div>, document.body);
