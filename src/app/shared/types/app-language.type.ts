import { AppLanguageValue } from '../enums/app-language-value.enum';

export type AppLanguage = Readonly<{
  label: string;
  value: AppLanguageValue;
  selected: boolean;
}>;
