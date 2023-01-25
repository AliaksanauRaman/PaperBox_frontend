import { CountriesMapType } from './type';
import { CountryValue } from '../../../shared/enums/country-value.enum';

const BELARUS = {
  value: CountryValue.BELARUS,
  label: 'country.belarus',
};
const POLAND = {
  value: CountryValue.POLAND,
  label: 'country.poland',
};
const GEORGIA = {
  value: CountryValue.GEORGIA,
  label: 'country.georgia',
};

export const COUNTRIES_MAP_VALUE: CountriesMapType = new Map([
  [CountryValue.BELARUS, BELARUS],
  [CountryValue.POLAND, POLAND],
  [CountryValue.GEORGIA, GEORGIA],
]);
