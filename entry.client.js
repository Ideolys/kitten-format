import formator           from './index';
import { formatC, convC } from './lib/currency';
import { formatN }        from './lib/number';

formator.formatC         = formatC;
formator.formatCurrency  = formatC;
formator.convC           = convC;
formator.convertCurrency = convC;

formator.formatN      = formatN;
formator.formatNumber = formatN;

export default formator;
