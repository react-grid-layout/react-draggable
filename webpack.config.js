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
    },
    'classnames': {
      'commonjs': 'classnames',
      'commonjs2': 'classnames',
      'amd': 'classnames',
      'root': 'classNames'
    },
    'prop-types': {
      'commonjs': 'prop-types',
      'commonjs2': 'prop-types',
      'amd': 'prop-types',
      'root': 'PropTypes'
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
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        DRAGGABLE_DEBUG: process.env.DRAGGABLE_DEBUG
      }
    }),
    // Scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
};
