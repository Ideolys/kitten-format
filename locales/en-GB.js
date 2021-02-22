import kittenFormat from 'kitten-format';
import currencies   from '../lib/currencies';


var locale = {
  locale         : 'en-GB',
  currency       : 'GBP',
  currencySymbol : currencies.GBP,
  precision      : 2,
  unitPrefixes   : {
    15   : 'P',
    12   : 'T',
    9    : 'G',
    6    : 'M',
    3    : 'k',
    0    : '',
    '-3' : 'm',
    '-6' : 'μ',
    '-9' : 'n'
  },
  thousandSeparator : ',',
  decimalSeparator  : '.',
  isCurrencyFirst   : true
};

kittenFormat.locale(locale);
export default locale;
