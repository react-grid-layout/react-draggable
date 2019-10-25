'use strict';

const _ = require('lodash');
process.env.NODE_ENV = 'test';
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: [ 'jasmine'],

    files: [
      'specs/draggable.spec.jsx'
    ],

    exclude: [
    ],

    preprocessors: {
      'specs/draggable.spec.jsx': ['webpack']
    },

    webpack: _.merge(
      require('./webpack.config.js')({}, {}),
      {
        mode: 'production',
        // Remove source maps: *speeeeeed*
        devtool: 'none',
        module: {
          // Suppress power-assert warning
          exprContextCritical: false,
        },
        performance: {
          hints: false,
        },
        // zero out externals; we want to bundle React
        externals: '',
      }
    ),

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
