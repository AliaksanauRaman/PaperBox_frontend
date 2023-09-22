import { DiallingCode } from './dialling-code';

describe('DiallingCode', () => {
  describe('static is', () => {
    it('should return true if an instance of DiallingCode is provided', () => {
      const diallingCode = new DiallingCode('Belarus', '+375');

      expect(DiallingCode.is(diallingCode)).toBe(true);
    });

    it('should return false if not an instance of DiallingCode is provided', () => {
      const diallingCode = { countryName: 'Belarus', value: '+375' };

      expect(DiallingCode.is(diallingCode)).toBe(false);
    });
  });

  describe('equalsTo', () => {
    it('should return true if original and provided dialling codes are equal', () => {
      const diallingCode1 = new DiallingCode('Belarus', '+375');
      const diallingCode2 = new DiallingCode('Belarus', '+375');

      expect(diallingCode1.equalsTo(diallingCode2)).toBe(true);
    });

    it('should return false if original and provided dialling codes are not equal', () => {
      const diallingCode1 = new DiallingCode('Belarus', '+375');
      const diallingCode2 = new DiallingCode('Poland', '+48');

      expect(diallingCode1.equalsTo(diallingCode2)).toBe(false);
    });
  });
});
