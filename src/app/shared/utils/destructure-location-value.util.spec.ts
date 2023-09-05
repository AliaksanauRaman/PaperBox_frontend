import { destructureLocationValue } from './destructure-location-value.util';

describe('destructureLocationValue', () => {
  it('should throw if country is missing', () => {
    const location = ' city';

    const test = () => destructureLocationValue(location);

    expect(test).toThrow();
  });

  it('should throw if city is missing', () => {
    const location = 'country ';

    const test = () => destructureLocationValue(location);

    expect(test).toThrow();
  });

  it('should throw if there are more than 2 parts in location', () => {
    const location = 'country city other';

    const test = () => destructureLocationValue(location);

    expect(test).toThrow();
  });

  it('should destructure provided location with space separator by default', () => {
    const location = 'country city';

    const result = destructureLocationValue(location);

    expect(result).toEqual({
      countryValueAsString: 'country',
      cityValueAsString: 'city',
    });
  });

  it('should destructure provided location with given separator', () => {
    const location = 'country###city';

    const result = destructureLocationValue(location, '###');

    expect(result).toEqual({
      countryValueAsString: 'country',
      cityValueAsString: 'city',
    });
  });
});
