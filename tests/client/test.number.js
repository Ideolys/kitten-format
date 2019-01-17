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
      should(formator.formatN).be.a.Function();
      should(formator.formatNumber).be.a.Function();
    });

    it('should format a number with default locale and precision', () => {
      should(sanitizeSpaces(formator.formatN(20000.345))).eql('20 000,35');
    });

    it('should not format a number if no value is given', () => {
      should(formator.formatN()).eql(undefined);
    });

    it('should not format a number if null value is given', () => {
      should(formator.formatN(null)).eql(null);
    });

    it('should format a number with locale "en-US" and default precision', () => {
      var _options = {
        locale : 'en-US'
      };
      should(sanitizeSpaces(formator.formatN(20000, _options))).eql('20,000');
    });

    it('should format a number with locale "en-US" and precision', () => {
      var _options = {
        locale    : 'en-US',
        precision : 3
      };
      should(sanitizeSpaces(formator.formatN(20000.3456, _options))).eql('20,000.346');
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
          formator.formatN(_data[0], _data[1]);
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

  describe.skip('averageN', () => {
    it ('should be defined', () => {
      should(formator.averageN).be.a.Function();
      should(formator.averageNumber).be.a.Function();
    });

    it('should not average a number if no value is given', () => {
      should(formator.averageN()).eql(undefined);
    });

    it('should not average a number if null value is given', () => {
      should(formator.averageN(null)).eql(null);
    });

    it('should not average a number if no unit is given', () => {
      should(formator.averageN(100)).eql(100);
    });

    it('should average a number', () => {
      console.log(formator.averageN(100.24, {
        sourcePower : 0,
        targetPower : 3,
        unit        : 'g',
        precision   : 1
      }));

      console.log(formator.averageN(100.24, {
        sourcePower : 3,
        targetPower : 0,
        unit        : 'g',
        precision   : 1
      }));

      console.log(formator.averageN(101.24, {
        sourcePower : -3,
        targetPower : 2,
        unit        : 'g',
        precision   : 1
      }));
    });

    it.skip('should be fast', () => {
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
          formator.formatN(_data[0], _data[1]);
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

});
