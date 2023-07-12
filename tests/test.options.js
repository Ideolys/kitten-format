const should       = require('should');
const kittenFormat = require('../build/kittenFormat.server');

describe('options', () => {

  it('should have defined public properties', () => {
    should(kittenFormat.setOptions).be.a.Function();
    should(kittenFormat.setOption).be.a.Function();
    should(kittenFormat.locale).be.a.Function();
  });

  it('should set correct currency symbol : setOption', () => {
    should(sanitizeSpaces(kittenFormat.formatC(200))).eql('200,00 €');
    kittenFormat.setOption('currency', 'MAD');
    should(sanitizeSpaces(kittenFormat.formatC(200))).eql('200,00 MAD');
    kittenFormat.setOption('currency', 'CHF');
    should(sanitizeSpaces(kittenFormat.formatC(200))).eql('200,00 franc');
    kittenFormat.setOption('currency', 'GBP');
    should(sanitizeSpaces(kittenFormat.formatC(200))).eql('200,00 £');
    kittenFormat.setOption('currency', 'TEST');
    should(sanitizeSpaces(kittenFormat.formatC(200))).eql('200,00 €');
  });
});

/**
 * Sanitize spaces
 * @param {String} str
 * @return {String}
 */
function sanitizeSpaces (str) {
  return str.replace(/\s/, ' ');
}
