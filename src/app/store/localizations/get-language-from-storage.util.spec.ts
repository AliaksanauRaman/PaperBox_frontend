import { getInitialLanguageFromStorage } from './get-language-from-storage.util';

import { MockStorage } from './storage';
import { LocalizationLanguage } from '@shared/enums/localization-language.enum';

describe('getInitialLanguageFromStorage', () => {
  it(`should return the language from storage if it is valid`, () => {
    const storage = new MockStorage({
      language: LocalizationLanguage.ENGLISH,
    });

    const result = getInitialLanguageFromStorage(storage, 'language');

    expect(result).toBe(LocalizationLanguage.ENGLISH);
  });

  it(`should return null if storage is empty`, () => {
    const storage = new MockStorage({});

    const result = getInitialLanguageFromStorage(storage, 'test');

    expect(result).toBeNull();
  });

  it(`should return null if there is no value in storage by provided key`, () => {
    const storage = new MockStorage({
      language: LocalizationLanguage.ENGLISH,
    });

    const result = getInitialLanguageFromStorage(storage, 'test');

    expect(result).toBeNull();
  });

  it(`should return null if there is an invalid language in storage by provided key`, () => {
    const storage = new MockStorage({
      language: 'enenenen',
    });

    const result = getInitialLanguageFromStorage(storage, 'language');

    expect(result).toBeNull();
  });
});
