// @flow
export default function log(...args: any) {
  if (process.env.DRAGGABLE_DEBUG) console.log(...args);
}
