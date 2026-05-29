// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
export function findInArray<T>(
  array: ArrayLike<T>,
  callback: (value: T, index: number, array: ArrayLike<T>) => unknown
): T | undefined {
  for (let i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}

export function isFunction(func: unknown): func is (...args: unknown[]) => unknown {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}

export function isNum(num: unknown): num is number {
  return typeof num === 'number' && !isNaN(num);
}

export function int(a: string): number {
  return parseInt(a, 10);
}

export function dontSetMe(props: {[key: string]: unknown}, propName: string, componentName: string): Error | undefined {
  if (props[propName]) {
    return new Error(`Invalid prop ${propName} passed to ${componentName} - do not set this, set it on the child.`);
  }
}
