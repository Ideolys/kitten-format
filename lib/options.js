var locales = {
  'default' : {
    locale       : 'fr-FR',
    currency     : 'EUR',
    precision    : 2,
    unitPrefixes : {
      '15' : 'P',
      '12' : 'T',
      '9'  : 'G',
      '6'  : 'M',
      '3'  : 'k',
      '0'  : '',
      '-3' : 'm',
      '-6' : 'μ',
      '-9' : 'n'
    }
  }
};

/**
 * Set default options
 * @param {Object} optionsValue
 */
export function setOptions (optionsValue) {
  locales['default'] = optionsValue;
}

/**
 * Set locales to load
 * @param {Array} locales
 */
export function setLocales (localesValue) {
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
export function getLocale (locale) {
  if (!locales[locale]) {
    return locales['default'];
  }

  return locales[locale];
}
