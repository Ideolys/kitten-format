(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.formator = factory());
}(this, function () { 'use strict';

  var locales = {
    'default' : {
      locale     : 'fr-FR',
      currency   : 'EUR',
      precision  : 2,
      converters : {
        3    : "k",
        2    : "h",
        1    : "da",
        0    : "",
        '-1' : "d",
        '-2' : "c",
        '-3' : "m"
      }
    }
    }
  ;

  /**
   * Set default options
   * @param {Object} optionsValue
   */
  function setOptions (optionsValue) {
    locales['default'] = optionsValue;
  }

  /**
   * Set locales to load
   * @param {Array} locales
   */
  function setLocales (localesValue) {
    if (!localesValue.length) {
      return;
    }

    // First given locale is the default one
    setOptions(localesValue[0]);

    for (var i = 1; i < localesValue.length; i++) {
      locales[localesValue[i].locale] = localesValue[i];
    }
  }

  /**
   * Get the given locale or fallback to the default one
   * @param {String} locale
   */
  function getLocale (locale) {
    if (!locales[locale]) {
      return locales['default'];
    }

    return locales[locale];
  }

  /**
   * Fixed decimal part to precision
   * @param {Number} value
   * @param {Int} precision
   * @returns {Number}
   */

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
  function formatN (value, options) {
    if (value === undefined || value === null) {
      return value
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
  function averageN (value, options) {
    if (value === undefined || value === null) {
      return value;
    }

    options = options || {};

    var _sourcePower = options.sourcePower || 0;
    var _targetPower = options.targetPower || 0;
    var _sourceUnit  = options.unit;

    if (!_sourceUnit) {
      return value;
    }

    var _power  = Math.pow(10, Math.abs(_sourcePower) - _targetPower);
    var _value  = _power < 0 || _sourcePower < 0 ? (value / _power) : (value * _power);
    var _result = formatN(_value, options);
    return _result + ' ' + power[_targetPower] + _sourceUnit;
  }

  var formator = {};

  formator.setOptions = setOptions;
  formator.setLocales = setLocales;

  formator.averageN      = averageN;
  formator.averageNumber = averageN;

  var registerdFormatters$1 = {};

  /**
   * Get formatter instance
   * @param {String} locale ex: 'fr-FR'
   * @param {String} currency ex: 'EUR'
   * @param {Int} precision ex: 2
   * @returns {Intl}
   */
  function getFormatter$1 (locale, currency, precision) {
    if (precision < 2) {
      precision = 2;
    }
    var _key = locale + ':' + currency + ':' + precision;
    if (!registerdFormatters$1[_key]) {
      registerdFormatters$1[_key] = new Intl.NumberFormat(locale, {
        maximumFractionDigits : precision,
        currency              : currency,
        style                 : 'currency'
      });
    }

    return registerdFormatters$1[_key];
  }

  /**
   * Format currency
   * @param {Number} value
   * @param {Object} options
   * @returns {String}
   */
  function formatC (value, options) {
    if (value === null || value === undefined) {
      return value;
    }

    options = options || {};

    var _localeOptions = getLocale(options.locale);
    var _precision     = options.precision || _localeOptions.precision;
    var _currency      = options.currency  || _localeOptions.currency;
    var _locale        = options.locale    || _localeOptions.locale;

    return getFormatter$1(_locale, _currency, _precision).format(value);
  }

  /**
   * COnvert currency
   * @param {Number} value
   * @param {Object} options
   * @returns {Number}
   */
  function convC (value, options) {
    if (value === null || value === undefined) {
      return value;
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

  formator.formatC         = formatC;
  formator.formatCurrency  = formatC;
  formator.convC           = convC;
  formator.convertCurrency = convC;

  formator.formatN      = formatN;
  formator.formatNumber = formatN;

  return formator;

}));
