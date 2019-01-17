import { setOptions, setLocales } from './lib/options';
import { averageN }               from './lib/number';

var formator = {};

formator.setOptions = setOptions;
formator.setLocales = setLocales;

formator.averageN      = averageN;
formator.averageNumber = averageN;

export default formator;
