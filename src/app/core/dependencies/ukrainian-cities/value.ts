import { UkrainianCitiesType } from './type';
import { CountryValue } from '../../../shared/enums/country-value.enum';
import { UkrainianCityValue } from '../../../shared/enums/ukrainian-city-value.enum';

export const UKRAINIAN_CITIES_VALUE: UkrainianCitiesType = [
  {
    countryValue: CountryValue.UKRAINE,
    value: UkrainianCityValue.KYIV,
    label: 'city.ukrainian.kyiv',
  },
  {
    countryValue: CountryValue.UKRAINE,
    value: UkrainianCityValue.KHARKIV,
    label: 'city.ukrainian.kharkiv',
  },
  {
    countryValue: CountryValue.UKRAINE,
    value: UkrainianCityValue.LVIV,
    label: 'city.ukrainian.lviv',
  },
  {
    countryValue: CountryValue.UKRAINE,
    value: UkrainianCityValue.ODESSA,
    label: 'city.ukrainian.odessa',
  },
  {
    countryValue: CountryValue.UKRAINE,
    value: UkrainianCityValue.OTHER,
    label: 'city.other',
  },
];
