/* oxlint-disable no-console */
const log = typeof process !== 'undefined' && process.env.DRAGGABLE_DEBUG ? console.log.bind(console) : function noop(): void {};
export default log;
