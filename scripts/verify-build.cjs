#!/usr/bin/env node
'use strict';

// Post-build contract verification.
//
// The published artifacts carry two historical public contracts that the build
// toolchain (tsup for CJS/ESM, webpack for UMD) must preserve. They are easy to
// break invisibly — a wrong export-interop shape or a missing global only shows
// up when a consumer installs the package. This script asserts both right after
// the build, so a regression fails CI instead of shipping. It is wired into the
// Makefile `build` target (runs after build-lib + build-web).

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

// ── Contract 1: CJS export shape (PR #254 / issue #266) ──────────────────────
// require('react-draggable') returns the Draggable class ITSELF (not a namespace
// object), and also exposes .default and .DraggableCore. All three access
// patterns are part of the public API.
const cjsPath = path.join(root, 'build', 'cjs', 'cjs.js');
assert.ok(
  fs.existsSync(cjsPath),
  `Missing CJS build at ${cjsPath} — run \`yarn build\` first.`
);

// eslint-disable-next-line global-require, import/no-dynamic-require
const cjs = require(cjsPath);
assert.equal(
  typeof cjs,
  'function',
  `CJS root export must be the Draggable component, got ${typeof cjs}`
);
assert.equal(
  cjs.name,
  'Draggable',
  `CJS root export should be Draggable, got "${cjs.name}"`
);
assert.equal(cjs, cjs.default, 'require("react-draggable") must === .default');
assert.equal(
  typeof cjs.DraggableCore,
  'function',
  'require("react-draggable").DraggableCore must be exported'
);

// ── Contract 2: UMD global ───────────────────────────────────────────────────
// The unpkg bundle exposes the library as global `ReactDraggable`, with react /
// react-dom consumed as the external globals React / ReactDOM.
const umdPath = path.join(root, 'build', 'web', 'react-draggable.min.js');
assert.ok(fs.existsSync(umdPath), `Missing UMD build at ${umdPath}`);
const umd = fs.readFileSync(umdPath, 'utf8');
assert.ok(
  umd.includes('ReactDraggable'),
  'UMD bundle must expose the global `ReactDraggable`'
);

console.log(
  '✓ build contract OK: CJS module.exports===Draggable (+.default, .DraggableCore); UMD global ReactDraggable'
);
