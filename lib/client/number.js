import { getFormatter } from './formatters';
import {
  formatN  as formatNumber,
  averageN as averageNumber,
  percent  as percentNumber
} from '../number';

/**
 * Format number
 * @param {Number} value
 * @param {Object} options
 * @return {String}
 */
export function formatN (value, options) {
  let parameters = formatNumber(value, options);

  if (parameters == null || typeof parameters !== 'object') {
    return parameters;
  }

  Object.assign(parameters, options);
  parameters.maximumFractionDigits = parameters.precision;

  return getFormatter(parameters.locale, parameters).format(value);
}

/**
 * Average a number
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
export function averageN (value, options) {
  let parameters = averageNumber(value, options);

  if (parameters == null || typeof parameters !== 'object') {
    return parameters;
  }

  delete options.unit;
  value = formatN(parameters.value, options);

  return value + ' ' + parameters.unit;
}

/**
 * Set a number as a percentage
 * @param {Number} value
 * @param {Object} options
 */
export function percent (value, options) {
  let parameters = percentNumber(value);

  if (parameters == null || typeof parameters !== 'object') {
    return parameters;
  }

  return formatN(parameters.value, options) + '%';
}
