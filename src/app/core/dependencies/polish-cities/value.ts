import { PolishCitiesType } from './type';
import { CountryValue } from '../../../shared/enums/country-value.enum';
import { PolishCityValue } from '../../../shared/enums/polish-city-value.enum';

export const POLISH_CITIES_VALUE: PolishCitiesType = [
  {
    countryValue: CountryValue.POLAND,
    value: PolishCityValue.WARSAW,
    label: 'city.polish.warsaw',
  },
  {
    countryValue: CountryValue.POLAND,
    value: PolishCityValue.KRAKOW,
    label: 'city.polish.krakow',
  },
  {
    countryValue: CountryValue.POLAND,
    value: PolishCityValue.WROCLAW,
    label: 'city.polish.wroclaw',
  },
  {
    countryValue: CountryValue.POLAND,
    value: PolishCityValue.GDANSK,
    label: 'city.polish.gdansk',
  },
  {
    countryValue: CountryValue.POLAND,
    value: PolishCityValue.LODZ,
    label: 'city.polish.lodz',
  },
  {
    countryValue: CountryValue.POLAND,
    value: PolishCityValue.POZNAN,
    label: 'city.polish.poznan',
  },
  {
    countryValue: CountryValue.POLAND,
    value: PolishCityValue.BIALYSTOK,
    label: 'city.polish.bialystok',
  },
  {
    countryValue: CountryValue.POLAND,
    value: PolishCityValue.OTHER,
    label: 'city.other',
  },
];
