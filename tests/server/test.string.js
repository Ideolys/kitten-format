const should       = require('should');
const kittenFormat = require('../../build/kittenFormat.server');

describe('String', () => {

  describe('lowerCase', () => {
    it ('should be defined', () => {
      should(kittenFormat.lowerCase).be.a.Function();
    });

    it('should not lower case a string', () => {
      should(kittenFormat.lowerCase()).eql(undefined);
    });

    it('should not lower case a string', () => {
      should(kittenFormat.lowerCase(null)).eql(null);
    });

    it('should not lower case a number', () => {
      should(kittenFormat.lowerCase(100)).eql(100);
    });

    it('should lower case a string', () => {
      should(kittenFormat.lowerCase('AbCdEF')).eql('abcdef');
    });
  });

  describe('upperCase', () => {
    it ('should be defined', () => {
      should(kittenFormat.upperCase).be.a.Function();
    });

    it('should not upper case a string', () => {
      should(kittenFormat.upperCase()).eql(undefined);
    });

    it('should not upper case a string', () => {
      should(kittenFormat.upperCase(null)).eql(null);
    });

    it('should not upper case a number', () => {
      should(kittenFormat.upperCase(100)).eql(100);
    });

    it('should upper case a string', () => {
      should(kittenFormat.upperCase('AbCdef')).eql('ABCDEF');
    });
  });

  describe('upperCaseFirstChar', () => {
    it ('should be defined', () => {
      should(kittenFormat.upperCaseFirstChar).be.a.Function();
    });

    it('should not upper case first char of a string', () => {
      should(kittenFormat.upperCaseFirstChar()).eql(undefined);
    });

    it('should not upper case first char of a string', () => {
      should(kittenFormat.upperCaseFirstChar(null)).eql(null);
    });

    it('should not upper case first char of a number', () => {
      should(kittenFormat.upperCaseFirstChar(100)).eql(100);
    });

    it('should not upper case first chart of empty string', () => {
      should(kittenFormat.upperCaseFirstChar('')).eql('');
    });

    it('should upper case first char of a string', () => {
      should(kittenFormat.upperCaseFirstChar('abcDEf')).eql('Abcdef');
    });

    it('should upper case first char of a string : 1 length', () => {
      should(kittenFormat.upperCaseFirstChar('a')).eql('A');
    });
  });

});
