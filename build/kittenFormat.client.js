(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.kittenFormat = factory());
}(this, function () { 'use strict';

  var defaultLocale = {
    locale       : 'fr-FR',
    currency     : 'EUR',
    precision    : 2,
    unitPrefixes : {
      15   : 'P',
      12   : 'T',
      9    : 'G',
      6    : 'M',
      3    : 'k',
      0    : '',
      '-3' : 'm',
      '-6' : 'μ',
      '-9' : 'n'
    }
  };

  var locales = {
    default : defaultLocale
  };
  var browserLocale = detectLocale();

  // Set default locale as browser one if exists
  if (browserLocale !== locales.default.locale && locales[browserLocale]) {
    setOptions(locales[browserLocale]);
  }

  /**
   * Set default options
   * @param {Object} optionsValue
   */
  function setOptions (optionsValue) {
    locales['default'] = optionsValue;
  }

  /**
   * Set locales to load
   * @param {Object} locale
   */
  function locale (locale) {
    if (!locale) {
      return;
    }

    locales[locale.locale] = locale;
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
   * Detect current browser locale
   * https://github.com/maxogden/browser-locale/blob/master/index.js
   */
  function detectLocale () {
    var _lang = null;

    if (navigator.languages && navigator.languages.length) {
      // latest versions of Chrome and Firefox set this correctly
      _lang = navigator.languages[0];
    } else if (navigator.userLanguage) {
      // IE only
      _lang = navigator.userLanguage;
    } else {
      // latest versions of Chrome, Firefox, and Safari set this correctly
      _lang = navigator.language;
    }

    var _exceptions = {
      'en' : 'en-GB',
      'fr' : 'fr-FR'
    };

    if (_exceptions[_lang]) {
      _lang = _exceptions[_lang];
    }

    return _lang;
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
  function getFormatter (locale$$1, precision) {
    var _key = locale$$1 + ':' + precision;
    if (!registerdFormatters[_key]) {
      registerdFormatters[_key] = new Intl.NumberFormat(locale$$1, {
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

  /**
   * Lower case a string
   * @param {String} value
   * @returns {String}
   */
  function lowerCase (value) {
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
  function upperCase (value) {
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
  function upperCaseFirstChar (value) {
    if (value === null || value === undefined || typeof value !== 'string' || !value.length) {
      return value;
    }

    return value[0].toUpperCase() + lowerCase(value.slice(1, value.length));
  }

  var kittenFormat = {};

  kittenFormat.setOptions = setOptions;
  kittenFormat.locale     = locale;

  kittenFormat.averageN      = averageN;
  kittenFormat.averageNumber = averageN;

  kittenFormat.lowerCase          = lowerCase;
  kittenFormat.upperCase          = upperCase;
  kittenFormat.upperCaseFirstChar = upperCaseFirstChar;

  var registerdFormatters$1 = {};

  /**
   * Get formatter instance
   * @param {String} locale ex: 'fr-FR'
   * @param {String} currency ex: 'EUR'
   * @param {Int} precision ex: 2
   * @returns {Intl}
   */
  function getFormatter$1 (locale$$1, currency, precision) {
    if (precision < 2) {
      precision = 2;
    }
    var _key = locale$$1 + ':' + currency + ':' + precision;
    if (!registerdFormatters$1[_key]) {
      registerdFormatters$1[_key] = new Intl.NumberFormat(locale$$1, {
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

  kittenFormat.formatC         = formatC;
  kittenFormat.formatCurrency  = formatC;
  kittenFormat.convC           = convC;
  kittenFormat.convertCurrency = convC;

  kittenFormat.formatN      = formatN;
  kittenFormat.formatNumber = formatN;

  return kittenFormat;

}));
