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
