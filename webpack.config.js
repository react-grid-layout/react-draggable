var webpack = require('webpack');

module.exports = {
	entry: './index.js',
	output: {
    filename: './dist/react-draggable.js',
    sourceMapFilename: './dist/react-draggable.js.map',
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
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
		]
	},
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".es6"]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        DRAGGABLE_DEBUG: process.env.DRAGGABLE_DEBUG
      }
    })
  ]
};
