import { getInitialLanguageFromNavigator } from './get-language-from-navigator.util';

import { MockNavigator } from './navigator';
import { LocalizationLanguage } from '@shared/enums/localization-language.enum';

describe('getInitialLanguageFromNavigator', () => {
  it(`should return belarusian language for 'be' value`, () => {
    const navigator = new MockNavigator('be');

    const result = getInitialLanguageFromNavigator(navigator);

    expect(result).toBe(LocalizationLanguage.BELARUSIAN);
  });

  it(`should return belarusian language for 'be-BY' value`, () => {
    const navigator = new MockNavigator('be-BY');

    const result = getInitialLanguageFromNavigator(navigator);

    expect(result).toBe(LocalizationLanguage.BELARUSIAN);
  });

  it(`should return english language for 'en' value`, () => {
    const navigator = new MockNavigator('en');

    const result = getInitialLanguageFromNavigator(navigator);

    expect(result).toBe(LocalizationLanguage.ENGLISH);
  });

  it(`should return english language for 'en-GB' value`, () => {
    const navigator = new MockNavigator('en-GB');

    const result = getInitialLanguageFromNavigator(navigator);

    expect(result).toBe(LocalizationLanguage.ENGLISH);
  });

  it(`should return russian language for 'ru' value`, () => {
    const navigator = new MockNavigator('ru');

    const result = getInitialLanguageFromNavigator(navigator);

    expect(result).toBe(LocalizationLanguage.RUSSIAN);
  });

  it(`should return russian language for 'ru-RU' value`, () => {
    const navigator = new MockNavigator('ru-RU');

    const result = getInitialLanguageFromNavigator(navigator);

    expect(result).toBe(LocalizationLanguage.RUSSIAN);
  });

  it(`should return null for an unsupported ('pl-PL') value`, () => {
    const navigator = new MockNavigator('pl-PL');

    const result = getInitialLanguageFromNavigator(navigator);

    expect(result).toBeNull();
  });
});
