import { LithuanianCitiesType } from './type';
import { CountryValue } from '../../../shared/enums/country-value.enum';
import { LithuanianCityValue } from '../../../shared/enums/lithuanian-city-value.enum';

export const LITHUANIAN_CITIES_VALUE: LithuanianCitiesType = [
  {
    countryValue: CountryValue.LITHUANIA,
    value: LithuanianCityValue.VILNIUS,
    label: 'city.lithuanian.vilnius',
  },
  {
    countryValue: CountryValue.LITHUANIA,
    value: LithuanianCityValue.KAUNAS,
    label: 'city.lithuanian.kaunas',
  },
  {
    countryValue: CountryValue.LITHUANIA,
    value: LithuanianCityValue.OTHER,
    label: 'city.other',
  },
];
