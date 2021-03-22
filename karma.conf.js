'use strict';

const _ = require('lodash');
const webpack = require('webpack');
process.env.NODE_ENV = 'development';
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  const webpackConfig = _.merge(
    require('./webpack.config.js')({}, {}),
    {
      mode: 'development',
      // Remove source maps: *speeeeeed*
      devtool: false,
      cache: true,
      performance: {
        hints: false,
      },
      // zero out externals; we want to bundle React
      externals: '',
    }
  );

  delete webpackConfig.entry; // karma-webpack complains
  delete webpackConfig.output; // karma-webpack complains
  // Make sure `process.env` is present as an object
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    process: {env: {}},
  }));

  config.set({

    basePath: '',

    frameworks: ['webpack', 'jasmine'],

    files: [
      'specs/draggable.spec.jsx'
    ],

    exclude: [
    ],

    preprocessors: {
      'specs/draggable.spec.jsx': ['webpack']
    },

    webpack: webpackConfig,

    webpackServer: {
      stats: {
        chunks: false,
        colors: true
      }
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Firefox', 'ChromeHeadless'],

    singleRun: true,
  });
};
