import { BelarusianCityValue } from '../enums/belarusian-city-value.enum';
import { PolishCityValue } from '../enums/polish-city-value.enum';
import { GeorgianCityValue } from '../enums/georgian-city-value.enum';
import { UkrainianCityValue } from '../enums/ukrainian-city-value.enum';
import { LithuanianCityValue } from '../enums/lithuanian-city-value.enum';

export type AnyCityValueType =
  | BelarusianCityValue
  | PolishCityValue
  | GeorgianCityValue
  | UkrainianCityValue
  | LithuanianCityValue;
