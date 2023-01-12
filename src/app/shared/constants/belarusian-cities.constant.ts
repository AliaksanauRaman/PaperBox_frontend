import { CityType } from '../types/city.type';
import { BelarusianCityValue } from '../enums/belarusian-city-value.enum';

export const BELARUSIAN_CITIES: ReadonlyArray<CityType<BelarusianCityValue>> = [
  {
    value: BelarusianCityValue.MINSK,
    label: 'city.belarusian.minsk',
  },
  {
    value: BelarusianCityValue.VITEBSK,
    label: 'city.belarusian.vitebsk',
  },
  {
    value: BelarusianCityValue.GOMEL,
    label: 'city.belarusian.gomel',
  },
  {
    value: BelarusianCityValue.MOGILEV,
    label: 'city.belarusian.mogilev',
  },
  {
    value: BelarusianCityValue.GRODNO,
    label: 'city.belarusian.grodno',
  },
  {
    value: BelarusianCityValue.BREST,
    label: 'city.belarusian.brest',
  },
  {
    value: BelarusianCityValue.OTHER,
    label: 'city.other',
  },
];
