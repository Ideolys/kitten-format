/**
 * Fixed decimal part to precision
 * @param {Number} value
 * @param {Int} precision
 * @returns {Number}
 */
export function toFixed (value, precision) {
  var _multiplier = Math.pow(10, precision);
  return (Math.round(value * _multiplier) / _multiplier);
}
