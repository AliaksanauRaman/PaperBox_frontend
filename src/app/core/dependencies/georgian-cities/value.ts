import { GeorgianCitiesType } from './type';
import { CountryValue } from '../../../shared/enums/country-value.enum';
import { GeorgianCityValue } from '../../../shared/enums/georgian-city-value.enum';

export const GEORGIAN_CITIES_VALUE: GeorgianCitiesType = [
  {
    countryValue: CountryValue.GEORGIA,
    value: GeorgianCityValue.TBILISI,
    label: 'city.georgian.tbilisi',
  },
  {
    countryValue: CountryValue.GEORGIA,
    value: GeorgianCityValue.BATUMI,
    label: 'city.georgian.batumi',
  },
  {
    countryValue: CountryValue.GEORGIA,
    value: GeorgianCityValue.OTHER,
    label: 'city.other',
  },
];
