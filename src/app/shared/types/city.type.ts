import { AnyCityValueType } from './any-city-value.type';

export type CityType<T extends AnyCityValueType = AnyCityValueType> = Readonly<{
  value: T;
  label: string;
}>;
