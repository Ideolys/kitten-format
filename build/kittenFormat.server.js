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

var currencies = {
  EUR : '€',
  GBP : '£',
  CHF : 'CHF',
  USD : '$',
  AED : 'AED',
  SAR : 'SAR',
  XPF : 'XPF'
};

var defaultLocale = {
  locale         : 'fr-FR',
  currency       : 'EUR',
  currencySymbol : currencies.EUR,
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
  if (!optionsValue) {
    return;
  }

  locales['default'] = optionsValue;
}

/**
 * Set a default option
 * @param {String} key
 * @param {*} optionsValue
 */
function setOption (key, optionsValue) {
  if (key == null) {
    return;
  }

  if (key === 'currency') {
    locales['default'].currencySymbol = currencies[optionsValue] || defaultLocale.currencySymbol;
  }

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
    return locales.default;
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

  if (fraction[fraction.length - 1] !== '0' && options.shouldNotRound !== true) {
    fraction = (toFixed(Number('0.' + fraction, 10), (options.maximumFractionDigits != null ? options.maximumFractionDigits : locale$$1.precision)) + '');

    if (Number(fraction) === 1) {
      decimal = Number(decimal) + 1 + '';
    }

    fraction = fraction.slice(2);
  }

  for (let i = decimal.length - 1; i >= 0; i--) {
    res = decimal[i] + res;
    thousandIterator++;

    if (thousandIterator === 3 && i-1 >= 0) {
      res = thousandSeparator + res;
      thousandIterator = 0;
    }
  }

  if (options.minimumFractionDigits != null) {
    for (fraction+=''; fraction.length < options.minimumFractionDigits; fraction = fraction + '0') {}
  }

  if (options.shouldNotRound === true) {
    fraction = fraction.slice(0, options.maximumFractionDigits != null ? options.maximumFractionDigits : fraction.length);
  }

  if (fraction.length) {
    res += locale$$1.decimalSeparator + fraction;
  }

  if (options.style === 'currency') {
    if (locale$$1.isCurrencyFirst === true) {
      res = (options.unitPrefix || '') + locale$$1.currencySymbol + res;
    }
    else {
      res += ' ' + (options.unitPrefix || '') + locale$$1.currencySymbol;
    }
  }

  return res;
}

/**
 * Format number
 * @param {Number} value
 * @param {Object} options
 * @return {String}
 */
function formatNumber (value, options) {
  let parameters = formatN(value, options);

  if (parameters == null || typeof parameters !== 'object') {
    return parameters;
  }

  options                       = options || {};
  options.maximumFractionDigits = parameters.precision;

  return format(parameters.locale, value, options);
}

/**
 * Average a number
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
function averageNumber (value, options) {
  let parameters = averageN(value, options);

  if (parameters == null || typeof parameters !== 'object') {
    return parameters;
  }

  options = options || {};
  value   = formatNumber(parameters.value, options);

  return value + ' ' + parameters.unit;
}

/**
 * Set a number as a percentage
 * @param {Number} value
 * @param {Object} options
 */
function percentNumber (value, options) {
  let parameters = percent(value, options);

  if (parameters == null || typeof parameters !== 'object') {
    return parameters;
  }

  return formatNumber(parameters.value, options) + '%';
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

  var _localeOptions = getLocale(options.locale);
  var _precision     = options.precision;

  if (!options.shouldNotRound && (_precision === null || _precision === undefined)) {
    _precision = _localeOptions.precision;
  }

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

  if (_unit === null || _unit === undefined) {
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
 * @param {Object} { isAlreadyPercentageNumber : {Boolean}  }
 */
function percent (value, options) {
  if (value == null) {
    return value;
  }

  if (typeof value === 'string' && isNaN(value)) {
    return '-';
  }

  var _value = value * 100;

  if (options && options.isAlreadyPercentageNumber) {
    _value = value;
  }

  return {
    value : _value
  };
}

/**
 * Format currency
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
function formatCurrency (value, options) {
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
function formatC (value, options) {
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
function convC (value, options) {
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
function averageCurrency (value, options) {
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

const kittenFormat = {};

kittenFormat.setOptions = setOptions;
kittenFormat.setOption  = setOption;
kittenFormat.locale     = locale;

kittenFormat.lowerCase          = lowerCase;
kittenFormat.upperCase          = upperCase;
kittenFormat.upperCaseFirstChar = upperCaseFirstChar;

kittenFormat.formatN       = formatNumber;
kittenFormat.formatNumber  = formatNumber;
kittenFormat.percent       = percentNumber;
kittenFormat.averageN      = averageNumber;
kittenFormat.averageNumber = averageNumber;

kittenFormat.formatC         = formatCurrency;
kittenFormat.formatCurrency  = formatCurrency;
kittenFormat.convC           = convC;
kittenFormat.convertCurrency = convC;
kittenFormat.averageC         = averageCurrency;
kittenFormat.averageCurrency  = averageCurrency;

module.exports = kittenFormat;
