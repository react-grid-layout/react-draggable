#!/usr/bin/env node
'use strict';

// Post-build contract verification.
//
// The published artifacts carry public contracts that the build toolchain (tsup
// for CJS/ESM, webpack for UMD) must preserve. They are easy to break invisibly —
// a wrong export-interop shape, a missing global or a mistyped `exports` map only
// shows up when a consumer installs the package. This script asserts them right
// after the build, so a regression fails CI instead of shipping. It is wired into
// the Makefile `build` target (runs after build-lib + build-web).

const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
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

// ── Contract 3: generated declarations must not leak internal-only deps ──────
// The shipped .d.ts is generated from source. The v4.5.0 hand-written typings
// depended only on `react`; if a `propTypes`/`defaultProps` static loses its
// index-signature annotation, tsc infers PropTypes.* types and emits
// `import ... 'prop-types'` into the public declaration, silently forcing
// consumers to install @types/prop-types. Fail the build if that creeps back.
const dtsDir = path.join(root, 'build', 'cjs');
const dtsFiles = fs
  .readdirSync(dtsDir)
  .filter((f) => f.endsWith('.d.ts') || f.endsWith('.d.mts'));
const leaks = dtsFiles.filter((f) =>
  /['"]prop-types['"]/.test(fs.readFileSync(path.join(dtsDir, f), 'utf8'))
);
assert.equal(
  leaks.length,
  0,
  `Generated declarations leak 'prop-types' (consumers would need @types/prop-types): ${leaks.join(', ')}. ` +
    `Annotate the offending static (e.g. \`static propTypes?: {[key: string]: unknown}\`) so tsc does not emit PropTypes types.`
);

// ── Contract 4: no unguarded `process` in browser-facing bundles (issue #806) ─
// lib/utils/log.ts reads process.env.DRAGGABLE_DEBUG. Webpack's EnvironmentPlugin
// substitutes that exact member expression with a literal in the UMD build, but
// tsup/esbuild does not, so the raw read survives into the CJS/ESM output. A
// bundler that does not shim `process` then throws "process is not defined" the
// moment a consumer imports the package. The `typeof process` guard is what makes
// the read safe; note that optional chaining (`process.env?.FOO`) silently
// defeats the webpack substitution, so the guard is the only thing holding here.
// Strip every guarded read, then fail if any bare `process` reference remains.
const GUARDED_PROCESS_READ =
  /typeof\s+process\s*!==\s*(['"])undefined\1\s*(?:&&\s*process\.env\.[A-Za-z_$][\w$]*)?/g;
const bundles = [umdPath].concat(
  fs
    .readdirSync(dtsDir)
    .filter((f) => f.endsWith('.js') || f.endsWith('.mjs'))
    .map((f) => path.join(dtsDir, f))
);
const unguarded = bundles.filter((p) =>
  /\bprocess\b/.test(fs.readFileSync(p, 'utf8').replace(GUARDED_PROCESS_READ, ''))
);
assert.equal(
  unguarded.length,
  0,
  `Unguarded \`process\` reference in browser-facing bundle(s): ${unguarded
    .map((p) => path.relative(root, p))
    .join(', ')}. ` +
    `Wrap the read in \`typeof process !== 'undefined' && process.env.NAME\` (plain member access, no optional chaining).`
);


// ── Contract 5: ESM consumers resolve ESM types (issue #816) ─────────────────
// `exports` must carry a `types` INSIDE each condition. A single condition-
// independent `"types"` key types both the `import` and the `require` entry with
// the same file, and since this package has no `"type": "module"` that file is a
// CommonJS declaration — so under `moduleResolution: node16/nodenext` a default
// import is typed as the whole `module.exports` object and `<Draggable>` stops
// being a valid JSX element (TS2604/TS2786), while attw reports the ESM entry as
// "masquerading as CJS". tsup already emits the correct `.d.mts`; only the map
// has to point at it. Bundler resolution ignores all of this, which is why the
// existing type checks (all `moduleResolution: node` against lib/ source) could
// not see the breakage.
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const rootExport = pkg.exports['.'];

assert.ok(
  !('types' in rootExport),
  'exports["."] must not carry a condition-independent "types" key: it types the ESM entry with the CJS declaration. Put a "types" inside each condition instead.'
);
for (const [condition, expectedExt] of [
  ['import', '.d.mts'],
  ['require', '.d.ts'],
]) {
  const entry = rootExport[condition];
  assert.equal(
    typeof entry,
    'object',
    `exports["."].${condition} must be an object declaring its own "types" and "default"`
  );
  assert.ok(
    entry.types && entry.types.endsWith(expectedExt),
    `exports["."].${condition}.types must be a ${expectedExt} declaration, got ${entry.types}`
  );
  for (const field of ['types', 'default']) {
    const target = path.join(root, entry[field]);
    assert.ok(
      fs.existsSync(target),
      `exports["."].${condition}.${field} points at a missing file: ${entry[field]}`
    );
  }
}

// The map can be shaped correctly and still resolve to the wrong flavour of
// declaration, so type-check a real consumer against the built package: an ESM
// file importing 'react-draggable' by name under nodenext, resolved through the
// exports map via a node_modules symlink (NOT a tsconfig `paths` mapping, which
// would bypass `exports` and hide exactly the bug this guards).
const consumerDir = fs.mkdtempSync(path.join(os.tmpdir(), 'react-draggable-esm-types-'));
try {
  const nodeModules = path.join(consumerDir, 'node_modules');
  fs.mkdirSync(nodeModules);
  fs.symlinkSync(root, path.join(nodeModules, 'react-draggable'), 'dir');
  for (const dep of ['react', '@types']) {
    fs.symlinkSync(path.join(root, 'node_modules', dep), path.join(nodeModules, dep), 'dir');
  }
  fs.writeFileSync(
    path.join(consumerDir, 'package.json'),
    JSON.stringify({name: 'esm-consumer', type: 'module', version: '0.0.0'})
  );
  fs.writeFileSync(
    path.join(consumerDir, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        module: 'NodeNext',
        moduleResolution: 'NodeNext',
        target: 'ES2019',
        jsx: 'react-jsx',
        esModuleInterop: true,
        strict: true,
        noEmit: true,
        lib: ['ES2019', 'DOM'],
        types: ['react'],
      },
      files: ['consumer.tsx'],
    })
  );
  fs.writeFileSync(
    path.join(consumerDir, 'consumer.tsx'),
    `import Draggable, {DraggableCore} from 'react-draggable';\n` +
      `export const Dragged = () => <Draggable><div /></Draggable>;\n` +
      `export const Core = () => <DraggableCore><div /></DraggableCore>;\n`
  );

  try {
    execFileSync(
      process.execPath,
      [path.join(root, 'node_modules', 'typescript', 'bin', 'tsc'), '-p', consumerDir],
      {cwd: root, stdio: 'pipe'}
    );
  } catch (err) {
    const output = `${err.stdout || ''}${err.stderr || ''}`.trim();
    assert.fail(
      `An ESM consumer cannot type-check against the built package under moduleResolution nodenext:\n${output}`
    );
  }
} finally {
  fs.rmSync(consumerDir, {recursive: true, force: true});
}

console.log(
  '✓ build contract OK: CJS module.exports===Draggable (+.default, .DraggableCore); UMD global ReactDraggable; no prop-types leak in .d.ts; no unguarded process; ESM consumers get ESM types'
);
