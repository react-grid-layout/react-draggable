/**
 * JSON stays valid while preserving values JSON.stringify normally loses:
 * undefined, NaN, +/-Infinity, -0 and array holes. Finite numbers round to 6
 * decimals so float noise from layout math does not churn traces. Ordinary
 * objects with a "$" key are wrapped in {$escaped}, so none collides with a sentinel.
 */
export function stableValue(value: unknown): unknown {
  if (value === undefined) return {$type: 'undefined'};
  if (typeof value === 'number') {
    if (Number.isNaN(value)) return {$number: 'NaN'};
    if (!Number.isFinite(value)) return {$number: String(value)};
    if (Object.is(value, -0)) return {$number: '-0'};
    return Math.round(value * 1e6) / 1e6;
  }
  if (Array.isArray(value)) {
    return Array.from(value, (entry, i) => (i in value ? stableValue(entry) : {$hole: true}));
  }
  if (value !== null && typeof value === 'object') {
    const keys = Object.keys(value).sort();
    const encoded = Object.fromEntries(keys.map(key => [
      key, stableValue((value as Record<string, unknown>)[key])
    ]));
    // Sentinels are objects with a "$" key, so an ordinary object that has one is
    // wrapped. That keeps undefined and {$type: 'undefined'} distinct.
    return keys.some(key => key.startsWith('$')) ? {$escaped: encoded} : encoded;
  }
  return value;
}

export function serialize(trace: {steps: unknown[], [key: string]: unknown}): string {
  const {steps, ...metadata} = trace;
  const header = JSON.stringify(stableValue(metadata), null, 2).slice(0, -2);
  return `${header},\n  "steps": [\n${steps.map(step => `    ${JSON.stringify(stableValue(step))}`).join(',\n')}\n  ]\n}\n`;
}
