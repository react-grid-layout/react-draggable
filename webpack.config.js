const path = require('path');
const webpack = require('webpack');

// Builds the UMD web module (build/web/react-draggable.min.js). Only really used
// in example code / the static site and shipped via the package "unpkg" field.
//
// Webpack is retained ONLY for this UMD artifact: it maps the bare react /
// react-dom imports to the global React / ReactDOM (externals below) and emits a
// real UMD wrapper (commonjs/amd/root). tsup/esbuild's IIFE format can't
// reproduce that, so the rest of the build (cjs/esm/dts) lives in tsup.config.ts.
module.exports = (env, argv) => ({
	entry: {
    'react-draggable.min': './lib/umd.ts',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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
    hot: true,
    open: 'example/index.html',
    client: {
      overlay: true,
    },
    devMiddleware: {
      // disableHostCheck: true,
      writeToDisk: true,
    },
    static: {
      directory: '.',
    }
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
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2019',
          tsconfig: path.resolve(__dirname, 'tsconfig.json'),
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
    minimize: false,
  },
  stats: {
    errorDetails: true,
  }
});
