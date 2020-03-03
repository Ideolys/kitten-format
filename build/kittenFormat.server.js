'use strict';

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

kittenFormat.lowerCase          = lowerCase;
kittenFormat.upperCase          = upperCase;
kittenFormat.upperCaseFirstChar = upperCaseFirstChar;

var defaultLocale = {
  locale         : 'fr-FR',
  currency       : 'EUR',
  currencySymbol : '€',
  precision      : 2,
  unitPrefixes   : {
    15   : { default : 'P', g : 'GT' },
    12   : { default : 'T', g : 'MT' },
    9    : { default : 'G', g : 'kT' },
    6    : { default : 'M', g : 'T'  },
    3    : 'k',
    0    : '',
    '-3' : 'm',
    '-6' : 'μ',
    '-9' : 'n'
  },
  thousandSeparator : ' ',
  decimalSeparator  : ','
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
  setOptions(locales[locale.locale]);
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
function toFixed (value, precision) {
  var _multiplier = Math.pow(10, precision);
  return (Math.round(value * _multiplier) / _multiplier);
}

/**
 * Get formatter instance
 * @param {String} locale ex: 'fr-FR'
 * @param {*} value
 * @param {Object} options
 *  options.maximumFractionDigits
 *  options.minimumFractionDigits
 * @returns {Intl}
 */
function format (locale$$1, value, options) {
  locale$$1 = getLocale(locale$$1);

  value = value + '';

  let number            = value.split('.');
  let decimal           = number[0];
  let fraction          = number[1] || '';
  let thousandSeparator = locale$$1.thousandSeparator || ' ';

  let thousandIterator = 0;
  let res              = '';
  for (let i = decimal.length - 1; i >= 0; i--) {
    res = decimal[i] + res;
    thousandIterator++;

    if (thousandIterator === 3 && i-1 >= 0) {
      res = thousandSeparator + res;
      thousandIterator = 0;
    }
  }

  if (options && options.style === 'currency') {
    options.maximumFractionDigits = options.minimumFractionDigits;
    if (options && options.minimumFractionDigits == null) {
      options.minimumFractionDigits = locale$$1.precision;
    }
  }

  if (options && options.minimumFractionDigits != null) {
    for (fraction+=''; fraction.length < options.minimumFractionDigits; fraction = '0' + fraction) {}
  }

  if (fraction[fraction.length - 1] !== '0') {
    fraction = (toFixed(Number('0.' + fraction, 10), (options && options.maximumFractionDigits ? options.maximumFractionDigits : locale$$1.precision)) + '').slice(2);
  }

  if (fraction.length) {
    res += locale$$1.decimalSeparator + fraction;
  }

  if (options && options.style === 'currency') {
    if (locale$$1.isCurrencyFirst === true) {
      res = locale$$1.currencySymbol + res;
    }
    else {
      res += ' ' + locale$$1.currencySymbol;
    }
  }

  return res;
}

var locales$1 = {
  default : defaultLocale
};

/**
 * Get the given locale or fallback to the default one
 * @param {String} locale
 */
function getLocale$1 (locale) {
  if (!locales$1[locale]) {
    return locales$1['default'];
  }

  return locales$1[locale];
}

/**
 * Format number
 * @param {Number} value
 * @param {Object} options
 * @return {String}
 */
function formatN (value, options) {
  if (value == null) {
    return value
  }

  if (typeof value === 'string' && isNaN(value)) {
    return '-';
  }

  options = options || {};

  var _localeOptions = getLocale$1(options.locale);
  var _precision     = options.precision || _localeOptions.precision;
  var _locale        = options.locale    || _localeOptions.locale;

  return {
    locale    : _locale,
    precision : _precision
  }
}

/**
 * Average a number
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
function averageN (value, options) {
  if (value == null) {
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

  var _localeOptions = getLocale$1(options.locale);
  var _unitPrefixes  = _localeOptions.unitPrefixes;
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

  return {
    value : _value,
    unit  : _unitPrefix
  }
}

/**
 * Set a number as a percentage
 * @param {Number} value
 */
function percent (value) {
  if (value == null) {
    return value;
  }

  if (typeof value === 'string' && isNaN(value)) {
    return '-';
  }

  var _value = value * 100;

  if (value > 1) {
    _value = value;
  }

  return {
    value : _value
  };
}

/**
 * Format number
 * @param {Number} value
 * @param {Object} options
 * @return {String}
 */
function formatN$1 (value, options) {
  let parameters = formatN(value, options);

  if (parameters == null || typeof parameters !== 'object') {
    return parameters;
  }

  options =  { maximumFractionDigits : parameters.precision };

  return format(parameters.locale, value, options);
}

/**
 * Average a number
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
function averageN$1 (value, options) {
  let parameters = averageN(value, options);

  if (parameters == null || typeof parameters !== 'object') {
    return parameters;
  }

  value = formatN$1(parameters.value, options);

  return value + ' ' + parameters.unit;
}

/**
 * Set a number as a percentage
 * @param {Number} value
 * @param {Object} options
 */
function percent$1 (value, options) {
  let parameters = percent(value);

  if (parameters == null || typeof parameters !== 'object') {
    return parameters;
  }

  return formatN$1(parameters.value, options) + '%';
}

/**
 * Format currency
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
function formatC (value, options) {
  if (value == null) {
    return value;
  }

  if (typeof value === 'string' && isNaN(value)) {
    return '-';
  }

  options = options || {};

  var _localeOptions = getLocale$1(options.locale);
  var _precision     = options.precision || _localeOptions.precision;
  var _currency      = options.currency  || options.source || _localeOptions.currency;
  var _locale        = options.locale    || _localeOptions.locale;

  // If options target is defined, we need to convert
  if (options.target && options.rates && options.rates[options.target]) {
    options.source = _currency;
    _currency      = options.target;
    value          = convC(value, options);
  }

  return {
    locale    : _locale,
    currency  : _currency,
    precision : _precision,
    value     : value
  };
}

/**
 * Convert currency
 * @param {Number} value
 * @param {Object} options
 * @returns {Number}
 */
function convC (value, options) {
  if (value == null) {
    return value;
  }

  if (typeof value === 'string' && isNaN(value)) {
    return '-';
  }

  options = options || {};

  var _localeOptions = getLocale$1(options.locale);
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
 * Format currency
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
function formatC$1 (value, options) {
  let parameters = formatC(value, options);

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

kittenFormat.setOptions = setOptions;
kittenFormat.setOption  = setOption;
kittenFormat.locale     = locale;

kittenFormat.formatN       = formatN$1;
kittenFormat.formatNumber  = formatN$1;
kittenFormat.percent       = percent$1;
kittenFormat.averageN      = averageN$1;
kittenFormat.averageNumber = averageN$1;

kittenFormat.formatC         = formatC$1;
kittenFormat.formatCurrency  = formatC$1;
kittenFormat.convC           = convC;
kittenFormat.convertCurrency = convC;

module.exports = kittenFormat;