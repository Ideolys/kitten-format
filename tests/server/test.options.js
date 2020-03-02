const should       = require('should');
const kittenFormat = require('../../build/kittenFormat.server');

/**
 * Sanitize spaces
 * @param {String} str
 * @return {String}
 */
function sanitizeSpaces (str) {
  return str.replace(/\s/, ' ');
}

describe('options', () => {

  it('should have defined public properties', () => {
    should(kittenFormat.setOptions).be.a.Function();
    should(kittenFormat.setOption).be.a.Function();
    should(kittenFormat.locale).be.a.Function();
  })

});
