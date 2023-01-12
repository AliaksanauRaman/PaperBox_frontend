import { CountryValue } from '../enums/country-value.enum';

export type CountryType = Readonly<{
  value: CountryValue;
  label: string;
}>;
