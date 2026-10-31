/** JSON stays valid while preserving values JSON.stringify normally loses. */
export function stableValue(value: unknown): unknown {
  if (value === undefined) return {$type: 'undefined'};
  if (typeof value === 'number') {
    if (Number.isNaN(value)) return {$number: 'NaN'};
    if (!Number.isFinite(value)) return {$number: String(value)};
    if (Object.is(value, -0)) return {$number: '-0'};
    return Math.round(value * 1e6) / 1e6;
  }
  if (Array.isArray(value)) return value.map(stableValue);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(key => [
      key, stableValue((value as Record<string, unknown>)[key])
    ]));
  }
  return value;
}

export function serialize(trace: {steps: unknown[], [key: string]: unknown}): string {
  const {steps, ...metadata} = trace;
  const header = JSON.stringify(stableValue(metadata), null, 2).slice(0, -2);
  return `${header},\n  "steps": [\n${steps.map(step => `    ${JSON.stringify(stableValue(step))}`).join(',\n')}\n  ]\n}\n`;
}
