import { getLocale } from './options';
import { toFixed }   from './helpers';

var registerdFormatters = {};

/**
 * Get formatter instance
 * @param {String} locale ex: 'fr-FR'
 * @param {String} currency ex: 'EUR'
 * @param {Int} precision ex: 2
 * @returns {Intl}
 */
function getFormatter (locale, precision) {
  var _key = locale + ':' + precision;
  if (!registerdFormatters[_key]) {
    registerdFormatters[_key] = new Intl.NumberFormat(locale, {
      maximumFractionDigits : precision
    });
  }

  return registerdFormatters[_key];
}

/**
 * Format number
 * @param {Number} value
 * @param {Object} options
 * @return {String}
 */
export function formatN (value, options) {
  if (value === undefined || value === null) {
    return value
  }

  if (typeof value === 'string') {
    return '-';
  }

  options = options || {};

  var _localeOptions = getLocale(options.locale);
  var _precision     = options.precision || _localeOptions.precision;
  var _locale        = options.locale    || _localeOptions.locale;

  return getFormatter(_locale, _precision).format(value);
}

/**
 * Average a number
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
export function averageN (value, options) {
  if (value === undefined || value === null) {
    return value;
  }

  if (typeof value === 'string') {
    return '-';
  }

  options = options || {};

  var _power = options.power === null || options.power === undefined ? 0 : options.power;
  var _unit  = options.unit;

  if (!_unit) {
    return value;
  }

  var _valueStr     = (value + '').split('.')[0];
  var _valueLength  = _valueStr.length;
  var _averagePower = Math.trunc(_valueLength / 4) * 4;

  if (_averagePower !== 0) {
    _averagePower--;
  }

  var _localeOptions = getLocale(options.locale);
  var _unitPrefixes  = _localeOptions.unitPrefixes;
  var _value         = value * Math.pow(10, -_averagePower);
  var _result        = formatN(_value, options);

  var _unitPrefix = _unitPrefixes[_averagePower + _power];
  if (typeof _unitPrefix !== 'string') {
    _unitPrefix = _unitPrefix[_unit] || _unitPrefix.default;
  }
  else {
    _unitPrefix += _unit;
  }

  return _result + ' ' + _unitPrefix;
}

/**
 * Set a number as a percentage
 * @param {Number} value
 * @param {Object} options
 */
export function percent (value, options) {
  if (value === undefined || value === null) {
    return value;
  }

  if (typeof value === 'string') {
    return '-';
  }

  var _value = value * 100;

  if (value > 1) {
    _value = value;
  }

  return formatN(_value, options) + '%';
}
