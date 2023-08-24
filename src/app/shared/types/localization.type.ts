import { LocalizationLabel } from '@shared/enums/localization-label.enum';
import { LocalizationLanguage } from '@shared/enums/localization-language.enum';
import { LocalizationLocale } from '@shared/enums/localization-locale.enum';

export type LocalizationType = Readonly<{
  label: LocalizationLabel;
  language: LocalizationLanguage;
  locale: LocalizationLocale;
}>;
export type ListOfLocalizationsType = ReadonlyArray<LocalizationType>;
