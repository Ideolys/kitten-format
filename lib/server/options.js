import defaultLocale from '../../locales/_default';

var locales = {
  default : defaultLocale
};

/**
 * Set default options
 * @param {Object} optionsValue
 */
export function setOptions (optionsValue) {
  locales['default'] = optionsValue;
}

/**
 * Set a default option
 * @param {String} key
 * @param {*} optionsValue
 */
export function setOption (key, optionsValue) {
  locales['default'][key] = optionsValue;
}

/**
 * Set locales to load
 * @param {Object} locale
 */
export function locale (locale) {
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
export function getLocale (locale) {
  if (!locales[locale]) {
    return locales['default'];
  }

  return locales[locale];
}
