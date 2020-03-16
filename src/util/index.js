export function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export const hasProto = '__proto__' in {}

export function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}