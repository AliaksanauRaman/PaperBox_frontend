import { LocalizationSource } from '@shared/enums/localization-source.enum';
import { LocalizationLabel } from '@shared/enums/localization-label.enum';
import { LocalizationLanguage } from '@shared/enums/localization-language.enum';
import { LocalizationLocale } from '@shared/enums/localization-locale.enum';
import { LocalizationsStateModel } from './model';

export const LOCALIZATIONS_DEFAULTS: LocalizationsStateModel = {
  source: LocalizationSource.NONE,
  list: [
    {
      label: LocalizationLabel.BY,
      language: LocalizationLanguage.BELARUSIAN,
      locale: LocalizationLocale.BY,
      isSelected: true,
    },
    {
      label: LocalizationLabel.RU,
      language: LocalizationLanguage.RUSSIAN,
      locale: LocalizationLocale.RU,
      isSelected: false,
    },
    {
      label: LocalizationLabel.EN,
      language: LocalizationLanguage.ENGLISH,
      locale: LocalizationLocale.EN,
      isSelected: false,
    },
  ],
};
