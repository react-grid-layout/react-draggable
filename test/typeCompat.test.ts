import {describe, it, expect} from 'vitest';
import {execFileSync} from 'node:child_process';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';

// ─────────────────────────────────────────────────────────────────────────────
// Public type-surface compatibility guard.
//
// After the Flow -> TypeScript migration the public `.d.ts` is generated from the
// source entry (lib/cjs.ts) instead of hand-written (the old typings/index.d.ts,
// now deleted). The published declaration is a faithful tsc/tsup projection of
// that source surface, so this test asserts compatibility against the source
// entry directly — which keeps the check build-order-independent (no prior
// `yarn build` required) while exercising the exact public surface the shipped
// `.d.ts` is derived from. The build itself (tsup --dts) is what guarantees the
// declaration emits cleanly.
//
// Both projects below map `react-draggable` -> ../lib/cjs.ts and compile with
// `tsc`:
//   1. test/typeCompat/fixture.tsx — exhaustively exercises every exported name
//      and every prop from the old typings/index.d.ts. Removing/renaming/retyping
//      any export or prop (e.g. narrowing children from ReactNode) stops it
//      compiling.
//   2. typings/test.tsx — the project's existing consumer-style smoke test,
//      compiled UNCHANGED (incl. zero-prop usage, which only works if the public
//      props remain optional like the old `Partial<DraggableProps>` surface).
// ─────────────────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const require = createRequire(import.meta.url);
const tscBin = require.resolve('typescript/bin/tsc');

function runTsc(projectDir: string): {ok: boolean; output: string} {
  try {
    execFileSync(process.execPath, [tscBin, '-p', projectDir], {
      cwd: repoRoot,
      stdio: 'pipe',
    });
    return {ok: true, output: ''};
  } catch (err: any) {
    const stdout = err.stdout ? err.stdout.toString() : '';
    const stderr = err.stderr ? err.stderr.toString() : '';
    return {ok: false, output: stdout + stderr};
  }
}

// Each case shells out to a full `tsc` compile of the source type graph, which
// can take several seconds on slower CI runners — well past vitest's 5s default.
const TSC_TIMEOUT_MS = 60_000;

// These cases spawn `tsc` against the source type graph. The result is purely a
// function of the TypeScript dependency + source — it does NOT depend on the Node
// runtime version. CI runs `yarn test` across a Node version matrix, so without a
// guard this full-graph compile would run once per matrix entry, recompiling the
// identical type graph N times for zero added coverage. CI sets
// SKIP_TSC_TYPE_COMPAT=1 on every non-primary matrix node so the compile happens
// exactly once. Locally (env unset) it always runs.
const describeTypeCompat = process.env.SKIP_TSC_TYPE_COMPAT
  ? describe.skip
  : describe;

describeTypeCompat('public type-surface compatibility', () => {
  it('public surface is API-compatible with the old hand-written surface', () => {
    const {ok, output} = runTsc(resolve(__dirname, 'typeCompat'));
    expect(output, output).toBe('');
    expect(ok).toBe(true);
  }, TSC_TIMEOUT_MS);

  it('the existing typings/test.tsx still compiles unchanged against the public surface', () => {
    const {ok, output} = runTsc(resolve(repoRoot, 'typings'));
    expect(output, output).toBe('');
    expect(ok).toBe(true);
  }, TSC_TIMEOUT_MS);
});
