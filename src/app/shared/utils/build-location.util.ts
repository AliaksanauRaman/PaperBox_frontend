import { CityType } from '../types/city.type';
import { CountryType } from '../types/country.type';
import { LocationType } from '../types/location.type';
import { buildLocationValue } from './build-location-value.util';

export const buildLocation = (
  country: CountryType,
  city: CityType
): LocationType => {
  return {
    country,
    city,
    value: buildLocationValue(country.value, city.value),
  };
};
