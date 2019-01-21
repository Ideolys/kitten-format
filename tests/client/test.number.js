/**
 * Sanitize spaces
 * @param {String} str
 * @return {String}
 */
function sanitizeSpaces (str) {
  return str.replace(/\s/, ' ');
}

describe('number', () => {

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

    it('should not format a string', () => {
      should(kittenFormat.formatN('123')).eql('-');
    });

    it('should format a number with locale "en-US" and default precision', () => {
      var _options = {
        locale : 'en-US'
      };
      should(sanitizeSpaces(kittenFormat.formatN(20000, _options))).eql('20,000');
    });

    it('should format a number with locale "en-US" and precision', () => {
      var _options = {
        locale    : 'en-US',
        precision : 3
      };
      should(sanitizeSpaces(kittenFormat.formatN(20000.3456, _options))).eql('20,000.346');
    });

    it('should be fast', () => {
      var _locales        = ['fr-FR', 'en-US', 'en-GB'];
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

        var _start = window.performance.now();
        for (var i = 0, len = _datasetlength; i < len; i++) {
          var _data = _dataset[i];
          kittenFormat.formatN(_data[0], _data[1]);
        }
        _executionTimes.push(window.performance.now() - _start);
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

    it('should not average a string', () => {
      should(kittenFormat.averageN('123')).eql('-');
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
      should(kittenFormat.averageN(123100377474, {
        unit      : 'g',
        precision : 2
      })).eql('1,23 10^11g');
    });

    it('should be fast', () => {
      var _locales        = ['fr-FR', 'en-US', 'en-GB'];
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

        var _start = window.performance.now();
        for (var i = 0, len = _datasetlength; i < len; i++) {
          var _data = _dataset[i];
          kittenFormat.averageN(_data[0], _data[1]);
        }
        _executionTimes.push(window.performance.now() - _start);
      }

      var _average = 0;
      for (var k = 0; k < _executionTimes.length; k++) {
        _average += (_executionTimes[k] - _average) / (k + 1);
      }

      should(_average).lessThanOrEqual(25); // in ms
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

    it('should not set percentage of a string', () => {
      should(kittenFormat.percent('123')).eql('-');
    });

    it('should set percentage of a number with locale "en-US" and default precision', () => {
      var _options = {
        locale : 'en-US'
      };
      should(sanitizeSpaces(kittenFormat.percent(0.193, _options))).eql('19.3%');
    });

    it('should set percentage of a number with locale "en-US" and precision', () => {
      var _options = {
        locale    : 'en-US',
        precision : 3
      };
      should(sanitizeSpaces(kittenFormat.percent(0.193446, _options))).eql('19.345%');
    });

    it('should set percentage of a number > 1', () => {
      should(sanitizeSpaces(kittenFormat.percent(12.56))).eql('12,56%');
    });

    it('should be fast', () => {
      var _locales        = ['fr-FR', 'en-US', 'en-GB'];
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

        var _start = window.performance.now();
        for (var i = 0, len = _datasetlength; i < len; i++) {
          var _data = _dataset[i];
          kittenFormat.percent(_data[0], _data[1]);
        }
        _executionTimes.push(window.performance.now() - _start);
      }

      var _average = 0;
      for (var k = 0; k < _executionTimes.length; k++) {
        _average += (_executionTimes[k] - _average) / (k + 1);
      }

      should(_average).lessThanOrEqual(20); // in ms
    });
  });

});
