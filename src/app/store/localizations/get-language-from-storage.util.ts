import { ReadableStorage } from './storage';
import {
  LocalizationLanguage,
  isLocalizationLanguage,
} from '@shared/enums/localization-language.enum';

export const getInitialLanguageFromStorage = (
  storage: ReadableStorage,
  key: string
): LocalizationLanguage | null => {
  const languageFromStorage = storage.getItem(key);

  if (languageFromStorage === null) {
    return null;
  }

  if (isLocalizationLanguage(languageFromStorage)) {
    return languageFromStorage;
  }

  return null;
};
