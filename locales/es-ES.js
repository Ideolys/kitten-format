import kittenFormat from 'kitten-format'

var locale = {
  locale         : 'es-ES',
  currency       : 'EUR',
  currencySymbol : '€',
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
  thousandSeparator : ' ',
  decimalSeparator  : ','
};

kittenFormat.locale(locale);
export default locale;
