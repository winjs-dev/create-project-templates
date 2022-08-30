const toString = Object.prototype.toString;

export function isObject(value) {
  return toString.call(value) === '[object Object]';
}

export function isString(value) {
  return toString.call(value) === '[object String]';
}

export function isNumber(value) {
  return toString.call(value) === '[object Number]';
}

export function isDefault(value) {
  return value === void 0;
}
