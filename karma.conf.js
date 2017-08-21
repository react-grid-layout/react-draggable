var webpack = require('webpack');
process.env.NODE_ENV = 'test';

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
      module: {
        loaders: [
          {
            test: /\.(?:jsx?)$/,
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
            },
            exclude: /node_modules/
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          }
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"test"'
          }
        })
      ],
      resolve: {
        extensions: ['.js']
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

    browsers: ['PhantomJS_custom', 'Firefox', 'HeadlessChrome'],

    customLaunchers: {
      HeadlessChrome: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          '--remote-debugging-port=9222',
        ]
      },
      PhantomJS_custom: {
        base: 'PhantomJS',
        options: {
          viewportSize: {width: 1024, height: 768}
        }
      }
    },

    singleRun: true,

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-firefox-launcher',
      'karma-chrome-launcher',
      'karma-ie-launcher',
      'karma-webpack',
      'karma-phantomjs-shim',
    ]
  });
};
