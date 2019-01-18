import { setOptions, locale } from './lib/options';
import { averageN }           from './lib/number';
import {
  lowerCase,
  upperCase,
  upperCaseFirstChar
} from './lib/string';

var kittenFormat = {};

kittenFormat.setOptions = setOptions;
kittenFormat.locale     = locale;

kittenFormat.averageN      = averageN;
kittenFormat.averageNumber = averageN;

kittenFormat.lowerCase          = lowerCase;
kittenFormat.upperCase          = upperCase;
kittenFormat.upperCaseFirstChar = upperCaseFirstChar;

export default kittenFormat;
