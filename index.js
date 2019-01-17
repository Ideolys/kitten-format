import { setOptions, setLocales } from './lib/options';
import { averageN }               from './lib/number';
import {
  lowerCase,
  upperCase,
  upperCaseFirstChar
} from './lib/string';

var formator = {};

formator.setOptions = setOptions;
formator.setLocales = setLocales;

formator.averageN      = averageN;
formator.averageNumber = averageN;

formator.lowerCase          = lowerCase;
formator.upperCase          = upperCase;
formator.upperCaseFirstChar = upperCaseFirstChar;

export default formator;
