import { ReadableStorage } from './storage';
import { LanguageNavigator } from './navigator';
import { LocalizationLanguage } from '@shared/enums/localization-language.enum';
import { LocalStorageKey } from '@shared/enums/local-storage-key.enum';
import { getInitialLanguageFromStorage } from './get-language-from-storage.util';
import { getInitialLanguageFromNavigator } from './get-language-from-navigator.util';

export const determineInitialLanguage = (
  storage: ReadableStorage,
  navigator: LanguageNavigator
): LocalizationLanguage => {
  const languageFromStorage = getInitialLanguageFromStorage(
    storage,
    LocalStorageKey.PUSHKA_LANGUAGE
  );

  if (languageFromStorage !== null) {
    return languageFromStorage;
  }

  const languageFromNavigator = getInitialLanguageFromNavigator(navigator);

  if (languageFromNavigator !== null) {
    return languageFromNavigator;
  }

  return LocalizationLanguage.BELARUSIAN;
};
