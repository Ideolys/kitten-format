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
      15   : { default : 'P', g : 'GT' },
      12   : { default : 'T', g : 'MT' },
      9    : { default : 'G', g : 'kT' },
      6    : { default : 'M', g : 'T'  },
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

  /**
   * Set default options
   * @param {Object} optionsValue
   */
  function setOptions (optionsValue) {
    locales['default'] = optionsValue;
  }

  /**
   * Set a default option
   * @param {String} key
   * @param {*} optionsValue
   */
  function setOption (key, optionsValue) {
    locales['default'][key] = optionsValue;
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

    var browserLocale = detectLocale();

    // Set default locale as browser one if exists
    if (browserLocale !== locales.default.locale && locales[browserLocale]) {
      setOptions(locales[browserLocale]);
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

    if (typeof value === 'string' && isNaN(value)) {
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
  function averageN (value, options) {
    if (value === undefined || value === null) {
      return value;
    }

    if (typeof value === 'string' && isNaN(value)) {
      return '-';
    }

    options = options || {};

    var _power = options.power === null || options.power === undefined ? 0 : options.power;
    var _unit  = options.unit;

    if (!_unit) {
      return value;
    }

    var _value        = value;
    var _averagePower = 0;
    var _displayPower = null;

    if (value >= 1) {
      var _valueStr    = (value + '').split('.')[0];
      var _valueLength = _valueStr.length;
      _averagePower    = Math.trunc(_valueLength / 3) * 3;

      if ((options.maxPower !== null && options.maxPower !== undefined) && _averagePower + _power > options.maxPower) {
        _displayPower = options.maxPower - _power;
      }

      _value = value * Math.pow(10, -(_displayPower !== null ?_displayPower : _averagePower));
    }

    if (_value < 1) {
      _value = _value * Math.pow(10, 3);
      _power -= 3;

      if (_power === -0) {
        _power = 0;
      }
    }

    var _localeOptions = getLocale(options.locale);
    var _unitPrefixes  = _localeOptions.unitPrefixes;
    var _result        = formatN(_value, options);

    var _unitPrefix = _unitPrefixes[(_displayPower !== null ? _displayPower : _averagePower) + _power];

    if (_unitPrefix === undefined) {
      _unitPrefix = '10^' + (_averagePower + _power) + _unit;
    }
    else if (typeof _unitPrefix !== 'string') {
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
  function percent (value, options) {
    if (value === undefined || value === null) {
      return value;
    }

    if (typeof value === 'string' && isNaN(value)) {
      return '-';
    }

    var _value = value * 100;

    if (value > 1) {
      _value = value;
    }

    return formatN(_value, options) + '%';
  }

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
  kittenFormat.setOption  = setOption;
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
  function getFormatter$1 (locale, currency, precision) {
    if (precision < 2) {
      precision = 2;
    }
    var _key = locale + ':' + currency + ':' + precision;
    if (!registerdFormatters$1[_key]) {
      registerdFormatters$1[_key] = new Intl.NumberFormat(locale, {
        minimumFractionDigits : precision,
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

    return getFormatter$1(_locale, _currency, _precision).format(value);
  }

  /**
   * Convert currency
   * @param {Number} value
   * @param {Object} options
   * @returns {Number}
   */
  function convC (value, options) {
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

  kittenFormat.formatC         = formatC;
  kittenFormat.formatCurrency  = formatC;
  kittenFormat.convC           = convC;
  kittenFormat.convertCurrency = convC;

  kittenFormat.formatN      = formatN;
  kittenFormat.formatNumber = formatN;
  kittenFormat.percent      = percent;

  return kittenFormat;

}));
