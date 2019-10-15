import { getLocale } from './options';

var registerdFormatters = {};

/**
 * Get formatter instance
 * @param {String} locale ex: 'fr-FR'
 * @param {String} currency ex: 'EUR'
 * @param {Int} precision ex: 2
 * @returns {Intl}
 */
function getFormatter (locale, currency, precision) {
  if (precision < 2) {
    precision = 2;
  }
  var _key = locale + ':' + currency + ':' + precision;
  if (!registerdFormatters[_key]) {
    registerdFormatters[_key] = new Intl.NumberFormat(locale, {
      minimumFractionDigits : precision,
      currency              : currency,
      style                 : 'currency'
    });
  }

  return registerdFormatters[_key];
}

/**
 * Format currency
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
export function formatC (value, options) {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'string' && isNaN(value)) {
    return '-';
  }

  options = options || {};

  var _localeOptions = getLocale(options.locale);
  var _precision     = options.precision || _localeOptions.precision;
  var _currency      = options.currency  || options.source || _localeOptions.currency;
  var _locale        = options.locale    || _localeOptions.locale;

  // If options target is defined, we need to convert
  if (options.target && options.rates && options.rates[options.target]) {
    options.source = _currency;
    _currency      = options.target;
    value          = convC(value, options);
  }

  return getFormatter(_locale, _currency, _precision).format(value);
}

/**
 * Convert currency
 * @param {Number} value
 * @param {Object} options
 * @returns {Number}
 */
export function convC (value, options) {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'string' && isNaN(value)) {
    return '-';
  }

  options = options || {};

  var _localeOptions = getLocale(options.locale);
  var _source        = options.source || _localeOptions.currency;
  var _target        = options.target;
  var _rates         = options.rates;

  if (!_target || !_rates || (_rates && !_rates[_source]) || (_rates && !_rates[_target])) {
    return value;
  }

  var _value = value / _rates[_source];
  return _value * _rates[_target];
}
