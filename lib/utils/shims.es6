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

// There are probably more but this is all we use for now.
let lifeCycleMethods = ['constructor', 'componentWillMount', 'componentDidMount', 'componentWillUnmount', 'render'];
// ES6 classes don't autobind their methods
export function autobind(component) {
  let toBind = Object.getOwnPropertyNames(Object.getPrototypeOf(component));
  // Not using for...of here because it requires a full core-js shim to work everywhere.
  for (var i = 0; i < toBind.length; i++) {
    var key = toBind[i];
    if (!isFunction(component[key]) || lifeCycleMethods.indexOf(key) !== -1) continue;
    component[key] = component[key].bind(component);
  }
}
