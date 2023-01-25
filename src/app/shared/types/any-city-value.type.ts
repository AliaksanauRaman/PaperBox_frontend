import { BelarusianCityValue } from '../enums/belarusian-city-value.enum';
import { PolishCityValue } from '../enums/polish-city-value.enum';
import { GeorgianCityValue } from '../enums/georgian-city-value.enum';

export type AnyCityValueType =
  | BelarusianCityValue
  | PolishCityValue
  | GeorgianCityValue;
