'use strict';

const baseConfig = require('./karma.conf.js');
// Phantom build can't handle the modern JS in the module build
process.env.BABEL_MODULE_TYPE = 'cjs';

module.exports = function(config) {
  // Set base config options.
  baseConfig(config);
  // Then set some of our own, to run PhantomJS. It's a bit older, which is the idea.
  // We want to make sure our CJS build still works on old environments.
  config.set({
    // Shim required for phantom
    frameworks: ['phantomjs-shim', 'jasmine'],
    browsers: ['PhantomJS_custom'],
    // Includes Map/Set
    files: [
      'specs/draggable-phantom.spec.jsx'
    ],
    preprocessors: {
      'specs/draggable-phantom.spec.jsx': ['webpack']
    },
    customLaunchers: {
      PhantomJS_custom: {
        base: 'PhantomJS',
        options: {
          viewportSize: {width: 1024, height: 768}
        }
      }
    },
  });
};
