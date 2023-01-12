import { CountryType } from './country.type';
import { CityType } from './city.type';
import { AnyCityValueType } from './any-city-value.type';

export type LocationType<T extends AnyCityValueType = AnyCityValueType> =
  Readonly<{
    country: CountryType;
    city: CityType<T>;
    value: string;
  }>;
