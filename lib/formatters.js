import { getLocale } from './options';
import { toFixed }   from './helpers';

/**
 * Get formatter instance
 * @param {String} locale ex: 'fr-FR'
 * @param {*} value
 * @param {Object} options
 *  options.maximumFractionDigits
 *  options.minimumFractionDigits
 * @returns {Intl}
 */
export function format (locale, value, options) {
  locale = getLocale(locale);

  value = value + '';

  let number            = value.split('.');
  let decimal           = number[0];
  let fraction          = number[1] || '';
  let thousandSeparator = locale.thousandSeparator || ' ';

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

  if (options.style === 'currency') {
    options.maximumFractionDigits = options.minimumFractionDigits;
    if (options.minimumFractionDigits == null) {
      options.minimumFractionDigits = locale.precision;
    }
  }

  if (fraction[fraction.length - 1] !== '0' && options.shouldNotRound !== true) {
    fraction = (toFixed(Number('0.' + fraction, 10), (options.maximumFractionDigits ? options.maximumFractionDigits : locale.precision)) + '').slice(2);
  }

  if (options.minimumFractionDigits != null && options.shouldNotRound !== true) {
    for (fraction+=''; fraction.length < options.minimumFractionDigits; fraction = fraction + '0') {}
  }

  if (fraction.length) {
    res += locale.decimalSeparator + fraction;
  }

  if (options.style === 'currency') {
    if (locale.isCurrencyFirst === true) {
      res = locale.currencySymbol + res;
    }
    else {
      res += ' ' + locale.currencySymbol;
    }
  }

  return res;
}
