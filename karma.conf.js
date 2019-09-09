'use strict';

const webpack = require('webpack');
const _ = require('lodash');
process.env.NODE_ENV = 'test';
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['phantomjs-shim', 'jasmine'],

    files: [
      'specs/main.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'specs/main.js': ['webpack']
    },

    webpack: _.merge(
      require('./webpack.config.js')({}, {}),
      {
        mode: 'production',
        // Remove minified build & separate compile of index-src
        entry: '',
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

    browsers: ['PhantomJS_custom', 'Firefox', 'ChromeHeadless'],

    customLaunchers: {
      PhantomJS_custom: {
        base: 'PhantomJS',
        options: {
          viewportSize: {width: 1024, height: 768}
        }
      }
    },

    singleRun: true,
  });
};
