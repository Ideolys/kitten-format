var registerdFormatters = {};

/**
 * Get formatter instance
 * @param {String} locale ex: 'fr-FR'
 * @param {Object} options
 *  options.currency ex: 'EUR'
 *  options.maximumFractionDigits
 *  options.minimumFractionDigits
 * @returns {Intl}
 */
export function getFormatter (locale, options) {
  var _key = locale + ':' + (Object.values(options).join(':'));

  if (!registerdFormatters[_key]) {
    registerdFormatters[_key] = new Intl.NumberFormat(locale, options);
  }

  return registerdFormatters[_key];
}
