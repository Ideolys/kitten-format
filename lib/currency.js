import { getLocale } from './options';
import { format }    from './formatters';
import { averageN }  from './number';
import currencies    from './currencies';


/**
 * get currency symbol from ISO 4217
 * @param {Number} isoValue
 * @returns {String} currency symbol
 */
export function getCurrencySymbol (isoValue) {
  let currencySymbol = currencies[isoValue];

  if (!currencySymbol) {
    return getLocale('default').currencySymbol;
  }

  return currencySymbol;
}

/**
 * Format currency
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
export function formatCurrency (value, options) {
  let parameters = formatC(value, options);

  if (parameters == null || typeof parameters !== 'object') {
    return parameters;
  }

  if (parameters.precision < 2) {
    parameters.precision = 2;
  }

  parameters.style                 = 'currency';
  parameters.minimumFractionDigits = parameters.precision;


  if (parameters.minimumFractionDigits == null) {
    parameters.minimumFractionDigits = parameters.locale.precision;
  }
  parameters.maximumFractionDigits = parameters.minimumFractionDigits;

  return format(parameters.locale, parameters.value, parameters);
}


/**
 * Format currency
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
export function formatC (value, options) {
  if (value == null) {
    return value;
  }

  if (typeof value === 'string' && isNaN(value)) {
    return '-';
  }

  options = options || {};

  var _localeOptions = getLocale(options.locale);
  var _precision     = options.shouldNotRound ? options.precision : options.precision || _localeOptions.precision;
  var _currency      = options.currency  || options.source || _localeOptions.currency;
  var _locale        = options.locale    || _localeOptions.locale;

  // If options target is defined, we need to convert
  if (options.target && options.rates && options.rates[options.target]) {
    options.source = _currency;
    _currency      = options.target;
    value          = convC(value, options);
  }

  return {
    locale         : _locale,
    currency       : _currency,
    precision      : _precision,
    value          : value,
    shouldNotRound : options.shouldNotRound
  };
}

/**
 * Convert currency
 * @param {Number} value
 * @param {Object} options
 * @returns {Number}
 */
export function convC (value, options) {
  if (value == null) {
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

/**
 * Average a currency
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
export function averageCurrency (value, options) {
  if (!options) {
    options = {};
  }

  options.unit     = '';
  options.maxPower = 3;

  const average = averageN(value, options);
  let parameters = formatC(value, options);

  if (parameters == null || typeof parameters !== 'object') {
    return parameters;
  }

  parameters.unitPrefix = average.unit;
  parameters.style      = 'currency';

  return format(parameters.locale, average.value, parameters);
}
