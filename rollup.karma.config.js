var globals = require('rollup-plugin-node-globals');
var json = require('rollup-plugin-json');
var babel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');


export default {
  entry: './specs/draggable.spec.es6',
  // rollup settings. See Rollup documentation
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs({
      ignoreGlobal: true,
      // include: 'node_modules/**',  // Default: undefined
    }),
    globals(),
    json(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  // external: external,
  moduleName: 'draggable',
  format: 'iife',
  sourceMap: 'inline',
  dest: './derp.js'
};
