import { format }              from './formatters';
import { formatC as formatCurrency } from '../currency';

/**
 * Format currency
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
export function formatC (value, options) {
  let parameters = formatCurrency(value, options);

  if (parameters == null || typeof parameters !== 'object') {
    return parameters;
  }

  if (parameters.precision < 2) {
    parameters.precision = 2;
  }

  return format(parameters.locale, parameters.value, {
    style                 : 'currency',
    minimumFractionDigits : parameters.precision
  });
}
