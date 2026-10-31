import {expect, it} from 'vitest';
import {serialize} from './serialize';

it('keeps undefined and nonfinite coordinates in valid JSON, one complete step per line', () => {
  const text = serialize({name: 'encoding', steps: [
    {undefined, nan: NaN, positive: Infinity, negative: -Infinity, zero: -0},
    {array: [undefined, NaN], fractional: 1.12345678}
  ]});
  const expected = [
    {undefined: {$type: 'undefined'}, nan: {$number: 'NaN'}, positive: {$number: 'Infinity'},
      negative: {$number: '-Infinity'}, zero: {$number: '-0'}},
    {array: [{$type: 'undefined'}, {$number: 'NaN'}], fractional: 1.123457}
  ];
  expect(JSON.parse(text)).toEqual({name: 'encoding', steps: expected});
  const lines = text.split('\n').filter(line => line.startsWith('    {'));
  expect(lines).toHaveLength(2);
  expect(lines.map(line => JSON.parse(line.replace(/,$/, '')))).toEqual(expected);
});

it('never encodes an ordinary object the same as a sentinel', () => {
  const pairs: Array<[unknown, unknown]> = [
    [undefined, {$type: 'undefined'}],
    [NaN, {$number: 'NaN'}],
    [new Array(1), [{$hole: true}]],
    [new Array(1), [null]],
    [{$type: 'undefined'}, {$escaped: {$type: 'undefined'}}]
  ];
  for (const [sentinel, lookalike] of pairs) {
    expect(serialize({name: 'x', steps: [sentinel]})).not.toBe(serialize({name: 'x', steps: [lookalike]}));
  }
});
