// @flow
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
// import istanbul from 'rollup-plugin-istanbul';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies);

export default {
  entry: 'index.js',
  plugins: [
    babel(),
    // istanbul({
    //   exclude: ['test/**/*', 'node_modules/**/*']
    // })
    commonjs({
      include: './index.js'
    })
  ],
  external: external,
  exports: 'named',
  targets: [
    {
      dest: pkg['main'],
      format: 'umd',
      moduleName: 'draggable',
      sourceMap: true
    },
    {
      dest: pkg['jsnext:main'],
      format: 'es',
      sourceMap: true
    }
  ]
};
