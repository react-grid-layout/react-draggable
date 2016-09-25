'use strict';
const nodeGlobals = require('rollup-plugin-node-globals');
const json = require('rollup-plugin-json');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const nodeResolve = require('rollup-plugin-node-resolve');

module.exports = {
  entry: './specs/draggable.spec.js',
  // rollup settings. See Rollup documentation
  plugins: [
    nodeResolve({
      preferBuiltins: false,
      browser: true,
    }),
    replace({
      // This is totally broken somehow - DCE eliminates the function in CSSPropertyOperations
      include: 'node_modules/react/lib/CSSPropertyOperations.js',
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    commonjs(),
    nodeGlobals(),
    json(),
  ],
  moduleName: 'draggable',
  format: 'umd'
};
