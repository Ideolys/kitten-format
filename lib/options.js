import defaultLocale from '../locales/_default';

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
export function setOptions (optionsValue) {
  locales['default'] = optionsValue;
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
