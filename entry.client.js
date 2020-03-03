import kittenFormat                      from './index';
import { setOptions, locale, setOption } from './lib/client/options';
import { convC }                         from './lib/currency';
import { formatC }                       from './lib/client/currency';
import { formatN, percent, averageN }    from './lib/client/number';

kittenFormat.setOptions = setOptions;
kittenFormat.setOption  = setOption;
kittenFormat.locale     = locale;

kittenFormat.formatC         = formatC;
kittenFormat.formatCurrency  = formatC;
kittenFormat.convC           = convC;
kittenFormat.convertCurrency = convC;

kittenFormat.formatN       = formatN;
kittenFormat.formatNumber  = formatN;
kittenFormat.percent       = percent;
kittenFormat.averageN      = averageN;
kittenFormat.averageNumber = averageN;

export default kittenFormat;
