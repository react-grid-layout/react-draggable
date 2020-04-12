const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

// Grabbed in .babelrc.js to switch on transpiling modules.
// We want webpack to handle modules if possible.
// This can be overridden and webpack will handle babelified CJS.
process.env.BABEL_MODULE_TYPE = process.env.BABEL_MODULE_TYPE || 'module';

module.exports = (env, argv) => ({
	entry: {
    'react-draggable.min': './lib/cjs.js',
  },
	output: {
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    devtoolModuleFilenameTemplate: '../[resource-path]',
    library: 'ReactDraggable',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'build', 'web'),
	},
  devServer: {
    contentBase: '.',
    hot: true,
    open: true,
    openPage: 'example/index.html',
    disableHostCheck: true,
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
        loader: 'babel-loader',
        options: {
          cacheDirectory: false, // intended, have had bugs with env like DRAGGABLE_DEBUG in the past
        },
        exclude: /(node_modules)/
      }
		]
	},
  plugins: [
    new webpack.EnvironmentPlugin({
      // these are default values
      DRAGGABLE_DEBUG: false,
      NODE_ENV: ['development', 'production'].includes(argv.mode) ? argv.mode : 'production'
    }),
    // Scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      include: /\.min\.js$/,
      sourceMap: true,
      terserOptions: {}
    })],
  }
});
