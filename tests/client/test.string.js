describe('String', () => {

  describe('lowerCase', () => {
    it ('should be defined', () => {
      should(formator.lowerCase).be.a.Function();
    });

    it('should not lower case a string', () => {
      should(formator.lowerCase()).eql(undefined);
    });

    it('should not lower case a string', () => {
      should(formator.lowerCase(null)).eql(null);
    });

    it('should not lower case a number', () => {
      should(formator.lowerCase(100)).eql(100);
    });

    it('should lower case a string', () => {
      should(formator.lowerCase('AbCdEF')).eql('abcdef');
    });
  });

  describe('upperCase', () => {
    it ('should be defined', () => {
      should(formator.upperCase).be.a.Function();
    });

    it('should not upper case a string', () => {
      should(formator.upperCase()).eql(undefined);
    });

    it('should not upper case a string', () => {
      should(formator.upperCase(null)).eql(null);
    });

    it('should not upper case a number', () => {
      should(formator.upperCase(100)).eql(100);
    });

    it('should upper case a string', () => {
      should(formator.upperCase('AbCdef')).eql('ABCDEF');
    });
  });

  describe('upperCaseFirstChar', () => {
    it ('should be defined', () => {
      should(formator.upperCaseFirstChar).be.a.Function();
    });

    it('should not upper case first char of a string', () => {
      should(formator.upperCaseFirstChar()).eql(undefined);
    });

    it('should not upper case first char of a string', () => {
      should(formator.upperCaseFirstChar(null)).eql(null);
    });

    it('should not upper case first char of a number', () => {
      should(formator.upperCaseFirstChar(100)).eql(100);
    });

    it('should not upper case first chart of empty string', () => {
      should(formator.upperCaseFirstChar('')).eql('');
    });

    it('should upper case first char of a string', () => {
      should(formator.upperCaseFirstChar('abcDEf')).eql('Abcdef');
    });

    it('should upper case first char of a string : 1 length', () => {
      should(formator.upperCaseFirstChar('a')).eql('A');
    });
  });

});
