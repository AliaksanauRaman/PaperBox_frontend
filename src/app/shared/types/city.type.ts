import { AnyCityValueType } from './any-city-value.type';
import { CountryValue } from '../enums/country-value.enum';

export type CityType<T extends AnyCityValueType = AnyCityValueType> = Readonly<{
  countryValue: CountryValue;
  value: T;
  label: string;
}>;
