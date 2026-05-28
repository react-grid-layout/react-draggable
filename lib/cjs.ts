// Package entry point.
//
// This re-exports <Draggable> as the *default* export and <DraggableCore> as a
// named export. That is the correct shape for the ESM (`module`) build and for
// the auto-generated TypeScript declaration.
//
// ──────────────────────────────────────────────────────────────────────────
// CRITICAL CJS COMPAT CONTRACT — read before changing the build (contract #1):
//
// Historically (PR #254, issue #266) the *root* CJS export of this package IS
// the Draggable class itself, not a namespace object. All three of these access
// patterns are part of the public contract and MUST keep working in the
// CommonJS artifact (build/cjs):
//
//     const Draggable = require('react-draggable');             // === Draggable class
//     const Draggable = require('react-draggable').default;     // === Draggable class
//     const { DraggableCore } = require('react-draggable');     // === DraggableCore class
//
// i.e. the built CJS file must satisfy at runtime:
//     module.exports                === Draggable
//     module.exports.default        === Draggable
//     module.exports.DraggableCore  === DraggableCore
//
// A naive ESM `export default Draggable` compiled to CJS produces
// `exports.default = Draggable` but does NOT make `module.exports === Draggable`,
// which BREAKS every existing `require('react-draggable')` consumer.
//
// The BUILD PHASE owns the final reconciliation. tsup/tsc will likely NOT
// reproduce `module.exports === Draggable` from the ESM re-exports below, so the
// CJS output must be patched to the legacy shape — either via a hand-written CJS
// interop entry equivalent to the old lib/cjs.js:
//
//     const { default: Draggable, DraggableCore } = require('./Draggable');
//     module.exports = Draggable;
//     module.exports.default = Draggable;
//     module.exports.DraggableCore = DraggableCore;
//
// or a tsup footer/onSuccess step that rewrites module.exports accordingly.
// Verify with a runtime `require()` assertion that all three identities above
// hold before shipping.
//
// References:
//   https://github.com/mzabriskie/react-draggable/pull/254
//   https://github.com/mzabriskie/react-draggable/issues/266
// ──────────────────────────────────────────────────────────────────────────

import Draggable, {DraggableCore} from './Draggable';

export default Draggable;
export {DraggableCore};

// Re-export the public type surface so the auto-generated declaration is
// API-compatible with the historical hand-written typings/index.d.ts. The old
// typings exposed these names; consumers `import type { ... } from 'react-draggable'`.
export type {DraggableProps} from './Draggable';
export type {
  DraggableCoreProps,
  DraggableData,
  DraggableEventHandler,
  ControlPosition,
  PositionOffsetControlPosition,
} from './DraggableCore';
// `DraggableBounds` was the public name for the internal `Bounds` type.
// `DraggableEvent` is the public event union (defined in ./utils/types alongside
// the other public types — see the note there on why it must stay a union).
export type {Bounds as DraggableBounds, DraggableEvent} from './utils/types';
