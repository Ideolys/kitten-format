import kittenFormat from './index';
import { setOptions, locale, setOption } from './lib/server/options';

kittenFormat.setOptions = setOptions;
kittenFormat.setOption  = setOption;
kittenFormat.locale     = locale;

export default kittenFormat;
