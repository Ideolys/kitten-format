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
  setOptions(locales[locale.locale]);
}

kittenFormat.setOptions = setOptions;
kittenFormat.setOption  = setOption;
kittenFormat.locale     = locale;

module.exports = kittenFormat;
