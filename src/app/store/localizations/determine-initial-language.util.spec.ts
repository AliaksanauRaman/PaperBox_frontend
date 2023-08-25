import { determineInitialLanguage } from './determine-initial-language.util';

import { MockStorage } from './storage';
import { MockNavigator } from './navigator';
import { LocalStorageKey } from '@shared/enums/local-storage-key.enum';
import { LocalizationLanguage } from '@shared/enums/localization-language.enum';

describe('determineInitialLanguage', () => {
  it('should return the language from storage even if navigator language is valid', () => {
    const result = determineInitialLanguage(
      new MockStorage({
        [LocalStorageKey.PUSHKA_LANGUAGE]: LocalizationLanguage.RUSSIAN,
      }),
      new MockNavigator(LocalizationLanguage.ENGLISH)
    );

    expect(result).toBe(LocalizationLanguage.RUSSIAN);
  });

  it('should return the language from navigator if storage has no language', () => {
    const result = determineInitialLanguage(
      new MockStorage({}),
      new MockNavigator(LocalizationLanguage.ENGLISH)
    );

    expect(result).toBe(LocalizationLanguage.ENGLISH);
  });

  it('should return the belarusian (default) language if there is no valid language in storage and navigator', () => {
    const result = determineInitialLanguage(
      new MockStorage({}),
      new MockNavigator('test')
    );

    expect(result).toBe(LocalizationLanguage.BELARUSIAN);
  });
});
