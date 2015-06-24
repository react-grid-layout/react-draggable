export default function log() {
  if (process.env.DRAGGABLE_DEBUG) console.log(...arguments);
}
