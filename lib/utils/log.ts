/*eslint no-console:0*/
export default function log(...args: unknown[]): void {
  if (typeof process !== "undefined" && process.env?.DRAGGABLE_DEBUG) {
    console.log(...args);
  }
}
