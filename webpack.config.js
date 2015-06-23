module.exports = {
	entry: './index.js',
	output: {
    filename: './dist/react-draggable.js',
    sourceMapFilename: './dist/react-draggable.map',
    devtoolModuleFilenameTemplate: '../[resource-path]',
    library: 'ReactDraggable',
    libraryTarget: 'umd'
	},
  externals: {
    'react': 'React'
  },
	module: {
		loaders: [
			{
        test: /\.(?:js|es).?$/,
        loader: 'babel-loader'
      }
		]
	},
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".es6"]
  }
};
