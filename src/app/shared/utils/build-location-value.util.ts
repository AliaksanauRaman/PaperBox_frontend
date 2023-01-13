import { CountryValue } from '../enums/country-value.enum';
import { AnyCityValueType } from '../types/any-city-value.type';

export const buildLocationValue = (
  countryValue: CountryValue,
  cityValue: AnyCityValueType
): string => {
  return `${countryValue} ${cityValue}`;
};
