import { BelarusianCitiesType } from '../belarusian-cities';
import { PolishCitiesType } from '../polish-cities';
import { GeorgianCitiesType } from '../georgian-cities';
import { UkrainianCitiesType } from '../ukrainian-cities';
import { LithuanianCitiesType } from '../lithuanian-cities';
import { AllCitiesType } from './type';

export const allCitiesFactory = (
  belarusianCities: BelarusianCitiesType,
  polishCities: PolishCitiesType,
  georgianCities: GeorgianCitiesType,
  ukrainianCities: UkrainianCitiesType,
  lithuanianCities: LithuanianCitiesType
): AllCitiesType => {
  return [
    ...belarusianCities,
    ...polishCities,
    ...georgianCities,
    ...ukrainianCities,
    ...lithuanianCities,
  ];
};
