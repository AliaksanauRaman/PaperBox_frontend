import { LanguageNavigator } from './navigator';
import { LocalizationLanguage } from '@shared/enums/localization-language.enum';

const SUPPORTED_BELARUSIAN_LOCALES = ['be', 'be-BY'];
const SUPPORTED_ENGLISH_LOCALES = ['en', 'en-GB', 'en-US'];
const SUPPORTED_RUSSIAN_LOCALES = ['ru', 'ru-RU'];

export const getInitialLanguageFromNavigator = (
  navigator: LanguageNavigator
): LocalizationLanguage | null => {
  const languageFromNavigator = navigator.language;

  if (SUPPORTED_BELARUSIAN_LOCALES.includes(languageFromNavigator)) {
    return LocalizationLanguage.BELARUSIAN;
  }

  if (SUPPORTED_ENGLISH_LOCALES.includes(languageFromNavigator)) {
    return LocalizationLanguage.ENGLISH;
  }

  if (SUPPORTED_RUSSIAN_LOCALES.includes(languageFromNavigator)) {
    return LocalizationLanguage.RUSSIAN;
  }

  return null;
};
