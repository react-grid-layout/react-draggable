const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: {
    "react-draggable": "./index.js",
    "react-draggable.min": "./index.js",
  },
	output: {
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    devtoolModuleFilenameTemplate: '../[resource-path]',
    library: 'ReactDraggable',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'web'),
	},
  devServer: {
    contentBase: '.',
    hot: true,
    open: true,
    openPage: '/example/index.html',
    writeToDisk: true,
  },
  devtool: 'source-map',
  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      // React dep should be available as window.React, not window.react
      'root': 'React'
    },
    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM'
    }
  },
	module: {
		rules: [
			{
        test: /\.(?:js|es).?$/,
        loader: 'babel-loader?cacheDirectory',
        exclude: /(node_modules)/
      }
		]
	},
  plugins: [
    new webpack.EnvironmentPlugin({
      // Default values
      DRAGGABLE_DEBUG: false,
      NODE_ENV: 'production'
    }),
    // Scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      include: /\.min\.js$/,
      sourceMap: true,
      terserOptions: {
      }
    })],
  }
};
