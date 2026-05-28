import {describe, it, expect, beforeAll} from 'vitest';
import {execFileSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';

// ─────────────────────────────────────────────────────────────────────────────
// Public type-surface compatibility guard.
//
// After the Flow -> TypeScript migration the public `.d.ts` is AUTO-GENERATED
// from source (build/cjs/cjs.d.ts) instead of hand-written (the old
// typings/index.d.ts, now deleted). This test asserts the generated surface is
// still API-compatible with that old surface by compiling two type-assertion
// files against the generated declaration with `tsc`:
//
//   1. test/typeCompat/fixture.tsx — exhaustively exercises every exported name
//      and every prop from the old typings/index.d.ts. Removing/renaming/retyping
//      any export or prop makes this stop compiling.
//   2. typings/test.tsx — the project's existing consumer-style smoke test,
//      compiled UNCHANGED against the generated types (incl. zero-prop usage,
//      which only works if the public props remain optional like the old
//      `Partial<DraggableProps>` surface).
//
// If the CJS declaration hasn't been built yet, the test fails with an actionable
// message rather than silently passing.
// ─────────────────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const require = createRequire(import.meta.url);
const tscBin = require.resolve('typescript/bin/tsc');
const generatedDts = resolve(repoRoot, 'build/cjs/cjs.d.ts');

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

describe('public type-surface compatibility', () => {
  beforeAll(() => {
    if (!existsSync(generatedDts)) {
      throw new Error(
        `Generated declaration not found at ${generatedDts}. Run \`yarn build\` ` +
          `before running the type-compat test (it asserts against the built .d.ts).`
      );
    }
  });

  it('generated .d.ts is API-compatible with the old hand-written surface', () => {
    const {ok, output} = runTsc(resolve(__dirname, 'typeCompat'));
    expect(output, output).toBe('');
    expect(ok).toBe(true);
  });

  it('the existing typings/test.tsx still compiles unchanged against generated types', () => {
    const {ok, output} = runTsc(resolve(repoRoot, 'typings'));
    expect(output, output).toBe('');
    expect(ok).toBe(true);
  });
});
