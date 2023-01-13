import { BelarusianCitiesType } from '../belarusian-cities';
import { PolishCitiesType } from '../polish-cities';
import { AllCitiesType } from './type';

export const allCitiesFactory = (
  belarusianCities: BelarusianCitiesType,
  polishCities: PolishCitiesType
): AllCitiesType => {
  return [...belarusianCities, ...polishCities];
};
