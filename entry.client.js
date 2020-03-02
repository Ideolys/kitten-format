import kittenFormat                      from './index';
import { setOptions, locale, setOption } from './lib/client/options';
import { formatC, convC }                from './lib/client/currency';
import { formatN, percent }              from './lib/client/number';
import { averageN }                      from './lib/client/number';

kittenFormat.setOptions = setOptions;
kittenFormat.setOption  = setOption;
kittenFormat.locale     = locale;

kittenFormat.averageN      = averageN;
kittenFormat.averageNumber = averageN;

kittenFormat.formatC         = formatC;
kittenFormat.formatCurrency  = formatC;
kittenFormat.convC           = convC;
kittenFormat.convertCurrency = convC;

kittenFormat.formatN      = formatN;
kittenFormat.formatNumber = formatN;
kittenFormat.percent      = percent;

export default kittenFormat;
