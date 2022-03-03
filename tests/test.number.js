const should       = require('should');
const kittenFormat = require('../build/kittenFormat.server');
const utils        = require('./utils');

kittenFormat.locale({
  locale         : 'fr-CHF',
  currency       : 'CHF',
  currencySymbol : 'CHF',
  precision      : 2,
  unitPrefixes   : {
    15   : 'P',
    12   : 'T',
    9    : 'G',
    6    : 'M',
    3    : 'k',
    0    : '',
    '-3' : 'm',
    '-6' : 'μ',
    '-9' : 'n'
  },
  thousandSeparator : ' ',
  decimalSeparator  : ','
});
kittenFormat.locale({
  locale         : 'en-GB',
  currency       : 'GBP',
  currencySymbol : '£',
  precision      : 2,
  unitPrefixes   : {
    15   : 'P',
    12   : 'T',
    9    : 'G',
    6    : 'M',
    3    : 'k',
    0    : '',
    '-3' : 'm',
    '-6' : 'μ',
    '-9' : 'n'
  },
  thousandSeparator : ',',
  decimalSeparator  : '.',
  isCurrencyFirst   : true
});
kittenFormat.locale({
  locale         : 'fr-FR',
  currency       : 'EUR',
  currencySymbol : '€',
  precision      : 2,
  unitPrefixes   : {
    15   : { default : 'P', g : 'GT' },
    12   : { default : 'T', g : 'MT' },
    9    : { default : 'G', g : 'kT' },
    6    : { default : 'M', g : 'T'  },
    3    : 'k',
    0    : '',
    '-3' : 'm',
    '-6' : 'μ',
    '-9' : 'n'
  },
  thousandSeparator : ' ',
  decimalSeparator  : ','
});

/**
 * Sanitize spaces
 * @param {String} str
 * @return {String}
 */
function sanitizeSpaces (str) {
  return str.replace(/\s/, ' ');
}

describe('number', () => {

  beforeEach(() => {

    kittenFormat.setOptions();
  });

  describe('formatN', () => {
    it ('should be defined', () => {
      should(kittenFormat.formatN).be.a.Function();
      should(kittenFormat.formatNumber).be.a.Function();
    });

    it('should format a number with default locale and precision', () => {
      should(sanitizeSpaces(kittenFormat.formatN(20000.345))).eql('20 000,35');
    });

    it('should not format a number if no value is given', () => {
      should(kittenFormat.formatN()).eql(undefined);
    });

    it('should not format a number if null value is given', () => {
      should(kittenFormat.formatN(null)).eql(null);
    });

    it('should not format a string (NaN)', () => {
      should(kittenFormat.formatN('123a')).eql('-');
    });

    it('should format a string', () => {
      should(kittenFormat.formatN('123')).eql('123');
    });

    it('should format a number with locale "en-GB" and default precision', () => {
      var _options = {
        locale : 'en-GB'
      };
      should(sanitizeSpaces(kittenFormat.formatN(20000, _options))).eql('20,000');
    });

    it('should format decimal number rounding to next integer at precision 2', () => {
      should(kittenFormat.formatN('14.9999', {
        precision : 2
      })).eql('15');
    })

    it('should format decimal number with large decimal parts', () => {
      should(kittenFormat.formatN('23516.9979741', {
        precision : 2
      })).eql('23 517');
    });

    it('should format a number with minimumFractionDigits', () => {
      should(kittenFormat.formatN('14.4596', {
        minimumFractionDigits : 3,
        precision             : 3
      })).eql('14,460');
    });

    it('should format a number with minimumFractionDigits', () => {
      should(kittenFormat.formatN('14.4596', {
        precision      : 3,
        shouldNotRound : true
      })).eql('14,459');
    });

    it('should format a number with locale "en-GB" and precision', () => {
      var _options = {
        locale    : 'en-GB',
        precision : 3
      };
      should(sanitizeSpaces(kittenFormat.formatN(20000.3456, _options))).eql('20,000.346');
    });

    it('should format a number with locale "fr-FR" and shouldNotRound : true', () => {
      var _options = {
        locale         : 'fr-FR',
        shouldNotRound : true
      };
      should(sanitizeSpaces(kittenFormat.formatN(20000.3456, _options))).eql('20 000,3456');
      should(sanitizeSpaces(kittenFormat.formatN(20000.3, _options))).eql('20 000,3');
      should(sanitizeSpaces(kittenFormat.formatN(20000.99, _options))).eql('20 000,99');
    });

    it('should format a number with locale "fr-FR" and shouldNotRound : true & precision = 2', () => {
      var _options = {
        locale         : 'fr-FR',
        shouldNotRound : true,
        precision      : 2
      };
      should(sanitizeSpaces(kittenFormat.formatN(20000.3456, _options))).eql('20 000,34');
      should(sanitizeSpaces(kittenFormat.formatN(20000.3, _options))).eql('20 000,3');
      should(sanitizeSpaces(kittenFormat.formatN(20000.99, _options))).eql('20 000,99');
    });

    it('should format a number with locale "en-GB" and shouldNotRound : true', () => {
      var _options = {
        locale         : 'en-GB',
        shouldNotRound : true
      };
      should(sanitizeSpaces(kittenFormat.formatN(20000.3456, _options))).eql('20,000.3456');
      should(sanitizeSpaces(kittenFormat.formatN(20000.3, _options))).eql('20,000.3');
      should(sanitizeSpaces(kittenFormat.formatN(20000.99, _options))).eql('20,000.99');
    });

    it('should be fast', () => {
      var _locales        = ['fr-FR', 'fr-CHF', 'en-GB'];
      var _executionTimes = [];

      for (var j = 0; j < 20; j++) {
        var _dataset = [];
        var _datasetlength = 10000;
        for (var i = 0; i < _datasetlength; i++) {
          _dataset.push([
            Math.random() * 10000, // value
            {
              precision : Math.round((Math.random() * (2 - 4) + 4)),
              locale    : _locales[Math.round((Math.random() * (0 - 2) + 2))]
            }
          ]);
        }

        var _start = process.hrtime();
        for (var i = 0, len = _datasetlength; i < len; i++) {
          var _data = _dataset[i];
          kittenFormat.formatN(_data[0], _data[1]);
        }
        _executionTimes.push(utils.getDurationInMS(_start));
      }

      var _average = 0;
      for (var k = 0; k < _executionTimes.length; k++) {
        _average += (_executionTimes[k] - _average) / (k + 1);
      }

      should(_average).lessThanOrEqual(25); // in ms
    });
  });

  describe('averageN', () => {
    it ('should be defined', () => {
      should(kittenFormat.averageN).be.a.Function();
      should(kittenFormat.averageNumber).be.a.Function();
    });

    it('should not average a number if no value is given', () => {
      should(kittenFormat.averageN()).eql(undefined);
    });

    it('should not average a number if null value is given', () => {
      should(kittenFormat.averageN(null)).eql(null);
    });

    it('should not average a number if no unit is given', () => {
      should(kittenFormat.averageN(100)).eql(100);
    });

    it('should not average a string (NaN)', () => {
      should(kittenFormat.averageN('123a')).eql('-');
    });

    it('should average a string', () => {
      should(kittenFormat.averageN('123', { unit : 'g' })).eql('123 g');
    });

    it('should average without precising the source power', () => {
      should(kittenFormat.averageN(1001.24, {
        unit      : 'g',
        precision : 1
      })).eql('1 kg');
    });

    it('should average 10^0', () => {
      should(kittenFormat.averageN(1001.24, {
        power     : 0,
        unit      : 'g',
        precision : 1
      })).eql('1 kg');
    });

    it('should average if it is < 1', () => {
      should(kittenFormat.averageN(0.243, {
        power     : 3,
        unit      : 'g',
        precision : 1
      })).eql('243 g');
    });

    it('should average if it is < 1 : T', () => {
      should(kittenFormat.averageN(0.1, {
        power     : 6,
        unit      : 'g',
        precision : 1
      })).eql('100 kg');
    });

    it('should average 10^3', () => {
      should(kittenFormat.averageN(1001.24, {
        power     : 0,
        unit      : 'l',
        precision : 1
      })).eql('1 kl');
    });

    it('should average 10^3 g', () => {
      should(kittenFormat.averageN(1001.24, {
        power     : 3,
        unit      : 'g',
        precision : 1
      })).eql('1 T');
    });

    it('should average 10^6 g', () => {
      should(kittenFormat.averageN(1001.24, {
        power     : 6,
        unit      : 'g',
        precision : 1
      })).eql('1 kT');
    });

    it('should average 10^9 g', () => {
      should(kittenFormat.averageN(1001.24, {
        power     : 9,
        unit      : 'g',
        precision : 1
      })).eql('1 MT');
    });

    it('should average 10^-3', () => {
      should(kittenFormat.averageN(1001.24, {
        power     : -3,
        unit      : 'g',
        precision : 1
      })).eql('1 g');
    });

    it('should average 10^-6', () => {
      should(kittenFormat.averageN(1001.24, {
        power     : -6,
        unit      : 'g',
        precision : 1
      })).eql('1 mg');
    });

    it('should average 10^-9', () => {
      should(kittenFormat.averageN(1001.24, {
        power     : -9,
        unit      : 'g',
        precision : 1
      })).eql('1 μg');
    });

    it('should not average', () => {
      should(kittenFormat.averageN(101.24, {
        power     : -3,
        unit      : 'g',
        precision : 1
      })).eql('101,2 mg');
    });

    it('should format for another locale', () => {
      should(kittenFormat.averageN(101.24, {
        locale    : 'en-GB',
        power     : -3,
        unit      : 'g',
        precision : 1
      })).eql('101.2 mg');
    });

    it('should average if the power is too high', () => {
      should(kittenFormat.averageN(12345678900, {
        power     : 12,
        unit      : 'g',
        precision : 2
      })).eql('12,35 10^21g');
    });

    it('should average', () => {
      should(kittenFormat.averageN(33026721.53165768, {
        power     : 3,
        unit      : 'g',
        precision : 2
      })).eql('33,03 kT');
    });

    it('should not average: maxPower = null', () => {
      should(kittenFormat.averageN(33026721.53165768, {
        power     : 3,
        unit      : 'g',
        precision : 2,
        maxPower  : null
      })).eql('33,03 kT');
    });

    it('should not average: maxPower = undefined', () => {
      should(kittenFormat.averageN(33026721.53165768, {
        power     : 3,
        unit      : 'g',
        precision : 2
      })).eql('33,03 kT');
    });

    it('should average: maxPower defined', () => {
      should(sanitizeSpaces(kittenFormat.averageN(33026721.53165768, {
        power     : 3,
        unit      : 'g',
        precision : 2,
        maxPower  : 6
      }))).eql('33 026,72 T');
    });

    it('should be fast', () => {
      var _locales        = ['fr-FR', 'fr-CHF', 'en-GB'];
      var _executionTimes = [];

      for (var j = 0; j < 20; j++) {
        var _dataset = [];
        var _datasetlength = 10000;
        for (var i = 0; i < _datasetlength; i++) {
          _dataset.push([
            Math.random() * 10000, // value
            {
              power     : Math.round((Math.random() * (0 - 3) + 3)) * 3,
              unit      : 'g',
              precision : Math.round((Math.random() * (2 - 4) + 4)),
              locale    : _locales[Math.round((Math.random() * (0 - 2) + 2))]
            }
          ]);
        }

        var _start = process.hrtime();
        for (var i = 0, len = _datasetlength; i < len; i++) {
          var _data = _dataset[i];
          kittenFormat.averageN(_data[0], _data[1]);
        }
        _executionTimes.push(utils.getDurationInMS(_start));
      }

      var _average = 0;
      for (var k = 0; k < _executionTimes.length; k++) {
        _average += (_executionTimes[k] - _average) / (k + 1);
      }

      should(_average).lessThanOrEqual(30); // in ms
    });
  });

  describe('percent', () => {
    it ('should be defined', () => {
      should(kittenFormat.percent).be.a.Function();
    });

    it('should not set percentang of  a number if no value is given', () => {
      should(kittenFormat.percent()).eql(undefined);
    });

    it('should not set percentage of a number if null value is given', () => {
      should(kittenFormat.percent(null)).eql(null);
    });

    it('should set percentage of a string', () => {
      should(kittenFormat.percent('0.1')).eql('10%');
    });

    it('should not set percentage of a string (NaN)', () => {
      should(kittenFormat.percent('123a')).eql('-');
    });

    it('should set percentage of a number with locale "en-GB" and default precision', () => {
      var _options = {
        locale : 'en-GB'
      };
      should(sanitizeSpaces(kittenFormat.percent(0.193, _options))).eql('19.3%');
    });

    it('should set percentage of a number with locale "en-GB" and precision', () => {
      var _options = {
        locale    : 'en-GB',
        precision : 3
      };
      should(sanitizeSpaces(kittenFormat.percent(0.193446, _options))).eql('19.345%');
    });

    it('should set percentage of a number = 1', () => {
      should(sanitizeSpaces(kittenFormat.percent(1))).eql('100%');
    });

    it('should set percentage of a number > 1 with isAlreadyPercentageNumber', () => {
      var _options = {
        isAlreadyPercentageNumber : true
      };
      should(sanitizeSpaces(kittenFormat.percent(12.56, _options))).eql('12,56%');
    });

    it('should set percentage of a number = 1 with isAlreadyPercentageNumber', () => {
      var _options = {
        isAlreadyPercentageNumber : true
      };
      should(sanitizeSpaces(kittenFormat.percent(1, _options))).eql('1%');
    });

    it('should set percentage of a string of a number > 1 with isAlreadyPercentageNumber', () => {
      var _options = {
        isAlreadyPercentageNumber : true
      };
      should(kittenFormat.percent('123', _options)).eql('123%');
    });

    it('should be fast', () => {
      var _locales        = ['fr-FR', 'fr-CHF', 'en-GB'];
      var _executionTimes = [];

      for (var j = 0; j < 20; j++) {
        var _dataset = [];
        var _datasetlength = 10000;
        for (var i = 0; i < _datasetlength; i++) {
          _dataset.push([
            Math.random() * 10000, // value
            {
              precision : Math.round((Math.random() * (2 - 4) + 4)),
              locale    : _locales[Math.round((Math.random() * (0 - 2) + 2))]
            }
          ]);
        }

        var _start = process.hrtime();
        for (var i = 0, len = _datasetlength; i < len; i++) {
          var _data = _dataset[i];
          kittenFormat.percent(_data[0], _data[1]);
        }
        _executionTimes.push(utils.getDurationInMS(_start));
      }

      var _average = 0;
      for (var k = 0; k < _executionTimes.length; k++) {
        _average += (_executionTimes[k] - _average) / (k + 1);
      }

      should(_average).lessThanOrEqual(25); // in ms
    });
  });

});
