'use strict';
const nodeGlobals = require('rollup-plugin-node-globals');
const json = require('rollup-plugin-json');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const nodeResolve = require('rollup-plugin-node-resolve');


// const externals = ['react', 'react-dom'];
const externals = [];

module.exports = {
  entry: './specs/draggable.spec.js',
  // rollup settings. See Rollup documentation
  plugins: [
    nodeResolve({
      preferBuiltins: false,
      browser: true,
      skip: externals,
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    commonjs({
      // ignoreGlobal: true,
      // include: 'node_modules/**',  // Default: undefined
    }),
    nodeGlobals(),
    json(),
  ],
  external: externals,
  moduleName: 'draggable',
  format: 'umd',
  dest: './derp.js'
};
