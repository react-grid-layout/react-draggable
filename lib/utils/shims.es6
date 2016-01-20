// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
export function findInArray(array, callback) {
  for (let i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}

export function isFunction(func) {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}

export function isNum(num) {
  return typeof num === 'number' && !isNaN(num);
}

export function int(a) {
  return parseInt(a, 10);
}

export function dontSetMe(props, propName, componentName) {
  if (props[propName]) {
    throw new Error(`Invalid prop ${propName} passed to ${componentName} - do not set this, set it on the child.`);
  }
}
