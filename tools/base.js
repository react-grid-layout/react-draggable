// @flow
'use strict';
/**
 * Based on Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const {minify} = require ('uglify-js');
const path = require('path');
const BASE = path.join(__dirname, '..');
const babelrc = require('json5').parse(fs.readFileSync(path.join(BASE, '.babelrc')));
const pkg = require('../package.json');
const cp = (src, dest) => fs.writeFileSync(dest, fs.readFileSync(src, 'utf-8'), 'utf-8');

module.exports = function doBundle(src/*: string*/, dest/*: string*/, rollupOpts/*: ?Object */, bundleOpts/*: ?Object */) {
  // Clean up the output directory
  return del([`${dest}/*`, `${dest}/.*`])

  // Compile source code into a distributable format with Babel
  .then(() => Promise.all(
    ['es', 'cjs', 'umd'].map(format => {
      return rollup.rollup(Object.assign({
        entry: src,
        external: Object.keys(pkg.dependencies),
        plugins: [
          nodeResolve(),
          commonjs(),
          babel(Object.assign(babelrc, {
            babelrc: false,
            exclude: 'node_modules/**',
            runtimeHelpers: true,
          })),
          // uglify({}, minify),
        ],
      }, rollupOpts))
      .then(bundle => {
        return bundle.write(Object.assign({
          dest: `${dest}/${format === 'cjs' ? 'index' : `index.${format}`}.js`,
          format,
          sourceMap: true,
          moduleName: format === 'umd' ? pkg.name : undefined,
        }, bundleOpts));
      });
    })
  ))

  // Copy package.json and LICENSE.txt
  .then(() => {
    delete pkg.private;
    delete pkg.devDependencies;
    delete pkg.scripts;
    delete pkg.eslintConfig;
    delete pkg.babel;
    delete pkg['pre-commit'];
    pkg.main.replace('src/', ''); // We munge the main so it works both when git cloning & when downloading the pkg
    pkg['jsnext:main'] = 'index.es.js'; // this doesn't exist in the git pkg
    fs.writeFileSync(`${dest}/package.json`, JSON.stringify(pkg, null, '  '), 'utf-8');
    cp('LICENSE.txt', `${dest}/LICENSE.txt`);
    cp('.flowconfig', `${dest}/.flowconfig`);
  })
  .catch(err => console.error(err.stack)); // eslint-disable-line no-console
};
