import {
  AES_ENCRYPTION_KEY_WORD_ARRAY,
  AES_ENCRYPTION_IV_WORD_ARRAY,
} from "constants/crypto";
import CryptoJS from "crypto-js";

export function isObject(item) {
  // return Object.prototype.toString.call(o) === '[object Object]';
  return item && typeof item === "object" && !Array.isArray(item);
}

export const isEmpty = (obj) => Object.keys(obj).length === 0;

export function isPlainObject(o) {
  if (isObject(o) === false) return false;

  // If has modified constructor
  const ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  const prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

export function deepMerge(target, source) {
  if (Array.isArray(target) && Array.isArray(source)) {
    const newTarget = [...target];
    for (const key in source) {
      if (typeof source[key] === "object") {
        newTarget[key] = deepMerge(newTarget[key] || {}, source[key]);
      } else {
        newTarget[key] = source[key] || newTarget[key];
      }
    }
  } else if (isObject(target) && isObject(source)) {
    const newTarget = { ...target };
    for (const key in source) {
      if (isObject(source[key])) {
        newTarget[key] = deepMerge(newTarget[key] || {}, source[key]);
      } else {
        newTarget[key] = source[key] || newTarget[key];
      }
    }
    return newTarget;
  }
  return undefined;
}

/**
 * Deep merge two objects.
 * @template {object} T
 * @param {T} target
 * @param {any[]} ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (
    (isObject(target) && isObject(source)) ||
    (Array.isArray(target) && Array.isArray(source))
  ) {
    for (const key in source) {
      if (isObject(target[key]) && isObject(source[key])) {
        // if (!target[key]) {
        //   target[key] = {};
        // }
        target[key] = mergeDeep(target[key], source[key]);
      } else if (Array.isArray(target[key]) && Array.isArray(source[key])) {
        // if (!target[key]) {
        //   target[key] = [];
        // }
        target[key] = mergeDeep(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return mergeDeep(target, ...sources);
}

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

export function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}

/**
 * @template {{}} T
 * @param {T} obj
 * @param {string} desc
 */
export function objectAccessor(obj, desc) {
  const arr = desc ? desc.split(".") : [];
  let result = obj;
  while (arr.length && (result = result?.[arr.shift()]));
  return result;
}

/**
 * @template {{}} T
 * @param {T} values
 * @param {{allowEmptyArray: boolean}} options
 * @returns
 */
export function removeEmptyProperties<T>(
  values: T,
  options = {} as { allowEmptyArray?: boolean }
) {
  const { allowEmptyArray } = options;
  const newTarget = Array.isArray(values) ? [] : isObject(values) ? {} : values;

  if (typeof newTarget === "object") {
    for (const key in values) {
      const value = values[key];
      if (
        (Array.isArray(value) && (allowEmptyArray || value.length)) ||
        (isObject(value) && Object.entries(value).length !== 0)
      ) {
        newTarget[key as any] =
          value instanceof File ? value : removeEmptyProperties(value);
      } else if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !Array.isArray(value) &&
        !isObject(value)
      ) {
        newTarget[key as any] = removeEmptyProperties(value);
      }
    }
  }
  return newTarget;
}

/**
 *
 * @param {*} data
 * @returns
 */
export function objectToFormData(data) {
  const fd = new FormData();
  for (const key in data) {
    if (Array.isArray(data[key])) {
      for (const arrData of data[key]) {
        fd.append(key, arrData);
      }
    } else if (isObject(data[key])) {
      for (const currKey in data[key]) {
        fd.set(`${key}[${currKey}]`, data[key][currKey]);
      }
    } else {
      fd.set(key, data[key]);
    }
  }
  return fd;
}

/**
 * @template {{id?: string}} T
 * @param {T[]} array
 * @param {{getKey: (item: T) => string; getValue: <R>(item: T) => R}} options
 * @returns {{[x: string]: any}}
 */
export function normalizeArray<T>(
  array: T[],
  options = {} as { getKey?: (item: T) => string; getValue: <R>(item: T) => R }
) {
  const { getKey = ({ id }: any) => id, getValue = (value) => value } = options;
  return array?.reduce((acc, curr) => {
    acc[getKey(curr)] = getValue(curr);
    return acc;
  }, {});
}

/**
 * Remove items from objects
 * @param {Object} obj
 * @param {string[]} keys
 * @returns
 */
export function removeKeys(obj, keys) {
  keys.forEach((key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      delete obj[key];
    }
  });
  return obj;
}

/**
 *
 * @param {any} obj
 * @returns
 */
export function stripUndefined(obj) {
  if (!isPlainObject(obj)) {
    return obj;
  }
  const copy = { ...obj };
  for (const [k, v] of Object.entries(copy)) {
    if (v === undefined) delete copy[k];
  }
  return copy;
}

/**
 *
 * @param {any} obj
 */
export function isJsonifiable(obj) {
  return (
    typeof obj === "object" &&
    (isPlainObject(obj) ||
      Array.isArray(obj) ||
      typeof obj.toJSON === "function")
  );
}

/**
 *
 * @param {any} obj
 * @returns
 */
export function encrypt(obj) {
  if (!obj) return null;

  return CryptoJS.AES.encrypt(
    JSON.stringify(obj),
    AES_ENCRYPTION_KEY_WORD_ARRAY,
    {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: AES_ENCRYPTION_IV_WORD_ARRAY,
    }
  ).toString();
}

/**
 *
 * @param {string} obj
 * @returns
 */
export function decrypt(obj) {
  if (!obj) return null;

  const decryptedString = CryptoJS.AES.decrypt(
    obj,
    AES_ENCRYPTION_KEY_WORD_ARRAY,
    {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: AES_ENCRYPTION_IV_WORD_ARRAY,
    }
  ).toString(CryptoJS.enc.Utf8);

  return decryptedString?.length ? JSON.parse(decryptedString) : null;
}
