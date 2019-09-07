var webpack = require('webpack');
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

    webpack: {
      mode: 'production',
      module: {
        // Suppress power-assert warning
        exprContextCritical: false,
        rules: [
          {
            test: /\.(?:js|es).?$/,
            loader: 'babel-loader?cacheDirectory',
            exclude: /(node_modules)/
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"test"'
          }
        })
      ],
      performance: {
        hints: false
      } 
    },

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
