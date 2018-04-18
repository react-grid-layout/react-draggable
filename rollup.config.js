import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const input = './lib/umd.js';

export default [
  {
    input,
    output: {
      file: 'dist/react-draggable.js',
      format: 'umd',
      sourcemap: true,
      name: 'ReactDraggable',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    },
    external: ['react', 'react-dom'],
    plugins: [
      nodeResolve(),
      commonjs({ include: 'node_modules/**' }),
      babel({ exclude: 'node_modules/**', plugins: ['external-helpers'] }),
      replace({
        'process.env.DRAGGABLE_DEBUG': 'false',
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      sizeSnapshot()
    ]
  },

  {
    input,
    output: {
      file: 'dist/react-draggable.min.js',
      format: 'umd',
      sourcemap: true,
      name: 'ReactDraggable',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    },
    external: ['react', 'react-dom'],
    plugins: [
      nodeResolve(),
      commonjs({ include: 'node_modules/**' }),
      babel({ exclude: 'node_modules/**', plugins: ['external-helpers'] }),
      replace({
        'process.env.DRAGGABLE_DEBUG': 'false',
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      sizeSnapshot(),
      uglify()
    ]
  }
];
