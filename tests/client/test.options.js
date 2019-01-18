/**
 * Sanitize spaces
 * @param {String} str
 * @return {String}
 */
function sanitizeSpaces (str) {
  return str.replace(/\s/, ' ');
}

describe('options', () => {
  it('should have set en-GB lcoale', () => {
    should(kittenFormat_en_GB).ok();
  });

  it('should have not erase default locale', () => {
    should(sanitizeSpaces(kittenFormat.formatC(200.3456, {
      precision : 3
    }))).eql('200,346 €');
  });
});
