import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {expect} from 'vitest';
import {serialize, stableValue} from './serialize';

export function expectGolden(name: string, trace: Parameters<typeof serialize>[0]) {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9.-]*$/.test(name)) throw new Error(`Invalid golden name: ${name}`);
  const directory = join(dirname(fileURLToPath(import.meta.url)), '__golden__');
  const path = join(directory, `${name}.golden.json`);
  const actual = serialize(trace);
  if (process.env.GOLDEN_UPDATE === '1') {
    mkdirSync(directory, {recursive: true});
    writeFileSync(path, actual);
    return;
  }
  let expected: string;
  try { expected = readFileSync(path, 'utf8'); }
  catch { throw new Error(`Missing golden ${name}. Run corepack yarn golden:update and review the new trace.`); }
  expect(stableValue(trace), `${name}: observable behavior changed. Explain the golden diff before regenerating.`)
    .toEqual(JSON.parse(expected));
}
