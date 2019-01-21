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

  return _result + ' ' + _unitPrefixes[_averagePower + _power] + _unit;
}

/*
  var _sourcePower = options.sourcePower || 0;
  var _targetPower = options.targetPower || 0;
  var _sourceUnit  = options.unit;

  if (!_sourceUnit) {
    return value;
  }

  var _localeOptions = getLocale(options.locale);
  var _converters    = _localeOptions.converters;
  var _power         = Math.pow(10, Math.abs(_sourcePower) - _targetPower);
  var _value         = _power < 0 || _sourcePower < 0 ? (value / _power) : (value * _power);
  var _result        = formatN(_value, options);
  return _result + ' ' + _converters[_targetPower] + _sourceUnit;
*/
