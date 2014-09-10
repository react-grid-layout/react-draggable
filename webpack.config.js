module.exports = {
	entry: './index.js',
	output: {
    filename: './dist/react-draggable.js',
    sourceMapFilename: './dist/react-draggable.map',
    library: 'ReactDraggable',
    libraryTarget: 'umd'
	},
  externals: {
    'react/addons': 'React'
  },
	module: {
		loaders: [
			{test: /\.js$/, loader: 'jsx-loader'}
		]
	}
};
