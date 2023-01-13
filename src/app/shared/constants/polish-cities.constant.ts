import { CityType } from '../types/city.type';
import { PolishCityValue } from '../enums/polish-city-value.enum';

export const POLISH_CITIES: ReadonlyArray<CityType<PolishCityValue>> = [
  {
    value: PolishCityValue.WARSAW,
    label: 'city.polish.warsaw',
  },
  {
    value: PolishCityValue.KRAKOW,
    label: 'city.polish.krakow',
  },
  {
    value: PolishCityValue.WROCLAW,
    label: 'city.polish.wroclaw',
  },
  {
    value: PolishCityValue.GDANSK,
    label: 'city.polish.gdansk',
  },
  {
    value: PolishCityValue.LODZ,
    label: 'city.polish.lodz',
  },
  {
    value: PolishCityValue.POZNAN,
    label: 'city.polish.poznan',
  },
  {
    value: PolishCityValue.BIALYSTOK,
    label: 'city.polish.bialystok',
  },
  {
    value: PolishCityValue.OTHER,
    label: 'city.other',
  },
];
