/**
 * Sanitize spaces
 * @param {String} str
 * @return {String}
 */
function sanitizeSpaces (str) {
  return str.replace(/\s/, ' ');
}

describe('currency', () => {

  describe('formatC', () => {
    it ('should be defined', () => {
      should(kittenFormat.formatC).be.a.Function();
      should(kittenFormat.formatCurrency).be.a.Function();
    });

    it('should format a currency to default locale "fr-FR" and currency "EUR"', () => {
      should(sanitizeSpaces(kittenFormat.formatC(200))).eql('200,00 €');
    });

    it('should not format a currency if no value is given', () => {
      should(kittenFormat.formatC()).eql(undefined);
    });

    it('should not format a currency if null value is given', () => {
      should(kittenFormat.formatC(null)).eql(null);
    });

    it('should not format a string', () => {
      should(kittenFormat.formatC('123a')).eql('-');
    });

    it('should format a string', () => {
      should(sanitizeSpaces(kittenFormat.formatC('123'))).eql('123,00 €');
    });

     it('should format a currency to option locale and currency "GB"', () => {
      should(kittenFormat.formatC(200, {
        locale : 'en-GB'
      })).eql('£200.00');
    });

    it('should format a currency to default locale and currency "GBP"', () => {
      should(sanitizeSpaces(kittenFormat.formatC(200, {
        currency : 'GBP'
      }))).eql('200,00 £GB');
    });

    it('should format a currency to default locale and currency with precision equals to 3', () => {
      should(sanitizeSpaces(kittenFormat.formatC(200.3456, {
        precision : 3
      }))).eql('200,346 €');
    });

    it('should format a currency to default locale and currency with precision equals to 3 with integer', () => {
      should(sanitizeSpaces(kittenFormat.formatC(200, {
        precision : 3
      }))).eql('200,000 €');
    });

    it('should format a currency to default locale and currency with precision equals to 3 with float', () => {
      should(sanitizeSpaces(kittenFormat.formatC(209.1234 , {
        precision : 3
      }))).eql('209,123 €');
    });

    it('should format a currency to locale "en-GB", currency "GBP" and precision 1', () => {
      // For currency, precision is a minimum
      should(sanitizeSpaces(kittenFormat.formatC(200.14, {
        locale    : 'en-GB',
        currency  : 'GBP',
        precision : 1
      }))).eql('£200.14');
    });

    it('should convert & format a currency from "EUR" to "GBP"', () => {
      var _options = {
        locale   : 'en-GB',
        currency : 'EUR',
        target   : 'GBP',
        rates    : {
          EUR : 1,
          GBP : 2
        }
      };
      should(sanitizeSpaces(kittenFormat.formatC(200, _options))).eql('£400.00');
    });

    it('should not convert but format currency if no target is given', () => {
      var _options = {
        rates  : {
          EUR : 1,
          USD : 2
        }
      };
      should(sanitizeSpaces(kittenFormat.formatC(200, _options))).eql('200,00 €');
    });

    it('should not convert but format currency if no rates is given', () => {
      var _options = {
        target : 'USD'
      };
      should(sanitizeSpaces(kittenFormat.formatC(200, _options))).eql('200,00 €');
    });

    it('should not convert but format currency if no source rate is given', () => {
      var _options = {
        target : 'USD',
        rates  : {}
      };
      should(sanitizeSpaces(kittenFormat.formatC(200, _options))).eql('200,00 €');
    });

    it('should not convert but format currency if no target rate is given', () => {
      var _options = {
        target : 'USD',
        rates  : {
          EUR : 1
        }
      };
      should(sanitizeSpaces(kittenFormat.formatC(200, _options))).eql('200,00 €');
    });

    it('should be fast', () => {
      var _locales        = ['fr-FR', 'en-US', 'en-GB'];
      var _currencies     = ['EUR'  , 'USD'  , 'GBP'  ];
      var _executionTimes = [];

      for (var j = 0; j < 20; j++) {
        var _dataset = [];
        var _datasetlength = 10000;
        for (var i = 0; i < _datasetlength; i++) {
          _dataset.push([
            Math.random() * 10000, // value
            {
              precision : Math.round((Math.random() * (2 - 4) + 4)),
              locale    : _locales[Math.round((Math.random() * (0 - 2) + 2))],
              currency  : _currencies[Math.round((Math.random() * (0 - 2) + 2))],
            }
          ]);
        }

        var _start = window.performance.now();
        for (var i = 0, len = _datasetlength; i < len; i++) {
          var _data = _dataset[i];
          kittenFormat.formatC(_data[0], _data[1]);
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

  describe('convC', () => {
    it('should be defined', () => {
      should(kittenFormat.convC).be.a.Function();
      should(kittenFormat.convertCurrency).be.a.Function();
    });

    it('should not convert a currency if no value is given', () => {
      should(kittenFormat.convC()).eql(undefined);
    });

    it('should not convert a currency if null value is given', () => {
      should(kittenFormat.convC(null)).eql(null);
    });

    it('should not convert a string', () => {
      should(kittenFormat.convC('123')).eql('123');
    });

    it('should not convert a string', () => {
      should(kittenFormat.convC('123a')).eql('-');
    });

    it('should format a currency from "EUR" to "GBP"', () => {
      var _options = {
        source : 'EUR',
        target : 'USD',
        rates  : {
          EUR : 1,
          USD : 2
        }
      };
      should(kittenFormat.convC(200, _options)).eql(400);
    });

    it('should format a currency from default currency "EUR" to "GBP"', () => {
      var _options = {
        target : 'USD',
        rates  : {
          EUR : 1,
          USD : 2
        }
      };
      should(kittenFormat.convC(200, _options)).eql(400);
    });

    it('should not format currency if no target is given', () => {
      var _options = {
        rates  : {
          EUR : 1,
          USD : 2
        }
      };
      should(kittenFormat.convC(200, _options)).eql(200);
    });

    it('should not format currency if no rates is given', () => {
      var _options = {
        target : 'USD'
      };
      should(kittenFormat.convC(200, _options)).eql(200);
    });

    it('should not format currency if no source rate is given', () => {
      var _options = {
        target : 'USD',
        rates  : {}
      };
      should(kittenFormat.convC(200, _options)).eql(200);
    });

    it('should not format currency if no target rate is given', () => {
      var _options = {
        target : 'USD',
        rates  : {
          EUR : 1
        }
      };
      should(kittenFormat.convC(200, _options)).eql(200);
    });

    it('should be fast', () => {
      var _currencies     = ['EUR'  , 'USD'];
      var _executionTimes = [];

      for (var j = 0; j < 20; j++) {
        var _dataset = [];
        var _datasetlength = 10000;
        for (var i = 0; i < _datasetlength; i++) {
          _rates = {};
          _rates[_currencies[1]] = Math.round((Math.random() * (1 - 5) + 1));
          _rates[_currencies[0]] = Math.round((Math.random() * (1 - 5) + 1));
          _dataset.push([
            Math.random() * 10000, // value
            {
              source : _currencies[1],
              target : _currencies[0],
              rates  : _rates
            }
          ]);
        }

        var _start = window.performance.now();
        for (var i = 0, len = _datasetlength; i < len; i++) {
          var _data  = _dataset[i];
          var _rates = {};
          _rates[_data[1]] = _data[3];
          _rates[_data[2]] = _data[4];
          kittenFormat.convC(_data[0], { source : _data[1], target : _data[2], rates : _rates });
        }
        _executionTimes.push(window.performance.now() - _start);
      }

      var _average = 0;
      for (var k = 0; k < _executionTimes.length; k++) {
        _average += (_executionTimes[k] - _average) / (k + 1);
      }

      should(_average).lessThanOrEqual(10); // in ms
    });
  });

});
