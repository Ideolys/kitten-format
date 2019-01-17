
/**
 * Lower case a string
 * @param {String} value
 * @returns {String}
 */
export function lowerCase (value) {
  if (value === null || value === undefined || typeof value !== 'string') {
    return value;
  }

  return value.toLowerCase();
}

/**
 * Upper case a string
 * @param {String} value
 * @returns {String}
 */
export function upperCase (value) {
  if (value === null || value === undefined || typeof value !== 'string') {
    return value;
  }

  return value.toUpperCase();
}


/**
 * Upper case first character of a string
 * @param {String} value
 * @returns {String}
 */
export function upperCaseFirstChar (value) {
  if (value === null || value === undefined || typeof value !== 'string' || !value.length) {
    return value;
  }

  return value[0].toUpperCase() + lowerCase(value.slice(1, value.length));
}
