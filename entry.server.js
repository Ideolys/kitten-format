import kittenFormat from './index';
import { setOptions, locale, setOption } from './lib/server/options';
import { formatN, percent, averageN }    from './lib/server/number';
import { formatC }                       from './lib/server/currency';
import { convC }                         from './lib/currency';

kittenFormat.setOptions = setOptions;
kittenFormat.setOption  = setOption;
kittenFormat.locale     = locale;

kittenFormat.formatN       = formatN;
kittenFormat.formatNumber  = formatN;
kittenFormat.percent       = percent;
kittenFormat.averageN      = averageN;
kittenFormat.averageNumber = averageN;

kittenFormat.formatC         = formatC;
kittenFormat.formatCurrency  = formatC;
kittenFormat.convC           = convC;
kittenFormat.convertCurrency = convC;

export default kittenFormat;
