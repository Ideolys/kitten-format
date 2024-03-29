import {
  lowerCase,
  upperCase,
  upperCaseFirstChar
} from './lib/string';
import { setOptions, locale, setOption }                                 from './lib/options';
import { formatNumber, percentNumber, averageNumber }                    from './lib/number';
import { getCurrencySymbol, formatCurrency, convC, averageCurrency }     from './lib/currency';

const kittenFormat = {};

kittenFormat.setOptions = setOptions;
kittenFormat.setOption  = setOption;
kittenFormat.locale     = locale;

kittenFormat.lowerCase          = lowerCase;
kittenFormat.upperCase          = upperCase;
kittenFormat.upperCaseFirstChar = upperCaseFirstChar;

kittenFormat.formatN       = formatNumber;
kittenFormat.formatNumber  = formatNumber;
kittenFormat.percent       = percentNumber;
kittenFormat.averageN      = averageNumber;
kittenFormat.averageNumber = averageNumber;

kittenFormat.getCurrencySymbol  = getCurrencySymbol;
kittenFormat.formatC            = formatCurrency;
kittenFormat.formatCurrency     = formatCurrency;
kittenFormat.convC              = convC;
kittenFormat.convertCurrency    = convC;
kittenFormat.averageC           = averageCurrency;
kittenFormat.averageCurrency    = averageCurrency;

export default kittenFormat;
