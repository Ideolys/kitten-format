import kittenFormat       from './index';
import { formatC, convC } from './lib/currency';
import { formatN }        from './lib/number';

kittenFormat.formatC         = formatC;
kittenFormat.formatCurrency  = formatC;
kittenFormat.convC           = convC;
kittenFormat.convertCurrency = convC;

kittenFormat.formatN      = formatN;
kittenFormat.formatNumber = formatN;

export default kittenFormat;
