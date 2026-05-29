/*eslint no-console:0*/
export default function log(...args: unknown[]): void {
  if (process.env.DRAGGABLE_DEBUG) console.log(...args);
}
