'use strict';

var options = {
  locale    : 'fr-FR',
  currency  : 'EUR',
  isBrowser : !!window,
  precision : 2
};

/**
 * Set default options
 * @param {Object} optionsValue
 */
function setOptions (optionsValue) {
  options.defaultLocale   = optionsValue.locale    || options.locale;
  options.defaultCurrency = optionsValue.currency  || options.currency;
  options.precision       = optionsValue.precision || options.precision;
}
var options;

var formator = {};

formator.setOptions = setOptions;

module.exports = formator;
