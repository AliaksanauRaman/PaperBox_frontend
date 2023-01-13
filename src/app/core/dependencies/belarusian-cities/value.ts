import { BelarusianCitiesType } from './type';
import { CountryValue } from '../../../shared/enums/country-value.enum';
import { BelarusianCityValue } from '../../../shared/enums/belarusian-city-value.enum';

export const BELARUSIAN_CITIES_VALUE: BelarusianCitiesType = [
  {
    countryValue: CountryValue.BELARUS,
    value: BelarusianCityValue.MINSK,
    label: 'city.belarusian.minsk',
  },
  {
    countryValue: CountryValue.BELARUS,
    value: BelarusianCityValue.VITEBSK,
    label: 'city.belarusian.vitebsk',
  },
  {
    countryValue: CountryValue.BELARUS,
    value: BelarusianCityValue.GOMEL,
    label: 'city.belarusian.gomel',
  },
  {
    countryValue: CountryValue.BELARUS,
    value: BelarusianCityValue.MOGILEV,
    label: 'city.belarusian.mogilev',
  },
  {
    countryValue: CountryValue.BELARUS,
    value: BelarusianCityValue.GRODNO,
    label: 'city.belarusian.grodno',
  },
  {
    countryValue: CountryValue.BELARUS,
    value: BelarusianCityValue.BREST,
    label: 'city.belarusian.brest',
  },
  {
    countryValue: CountryValue.BELARUS,
    value: BelarusianCityValue.OTHER,
    label: 'city.other',
  },
];
