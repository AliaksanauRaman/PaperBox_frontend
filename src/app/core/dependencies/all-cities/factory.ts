import { BelarusianCitiesType } from '../belarusian-cities';
import { PolishCitiesType } from '../polish-cities';
import { GeorgianCitiesType } from '../georgian-cities';
import { AllCitiesType } from './type';

export const allCitiesFactory = (
  belarusianCities: BelarusianCitiesType,
  polishCities: PolishCitiesType,
  georgianCities: GeorgianCitiesType
): AllCitiesType => {
  return [...belarusianCities, ...polishCities, ...georgianCities];
};
