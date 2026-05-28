// UMD / global build entry (webpack only — see webpack.config.js).
//
// This file exists SEPARATELY from cjs.ts because the UMD global contract
// (contract #2) requires the root global to BE the Draggable class:
//
//     window.ReactDraggable               === Draggable
//     window.ReactDraggable.default        === Draggable
//     window.ReactDraggable.DraggableCore   === DraggableCore
//
// Webpack wraps whatever this module assigns to `module.exports` in the UMD
// boilerplate, so we assign the Draggable class directly (CommonJS style) to
// reproduce the legacy root-is-Draggable shape. Written with CommonJS
// require/module.exports (not ESM import/export) so webpack keeps it a CJS
// module and does not reject the `module.exports =` assignment.
//
// cjs.ts keeps the modern default+named ESM shape for the tsup cjs/esm/dts
// artifacts; this file is consumed only by webpack and is excluded from tsup.

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
const {default: Draggable, DraggableCore} = require('./Draggable') as typeof import('./Draggable');

const root = Draggable as any;
root.default = Draggable;
root.DraggableCore = DraggableCore;

module.exports = root;
