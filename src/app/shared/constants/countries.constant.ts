import { CountryType } from '../types/country.type';
import { CountryValue } from '../enums/country-value.enum';

export const COUNTRIES: ReadonlyArray<CountryType> = [
  {
    value: CountryValue.BELARUS,
    label: 'country.belarus',
  },
  {
    value: CountryValue.POLAND,
    label: 'country.poland',
  },
];
