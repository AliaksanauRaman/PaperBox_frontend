/**
 * Must be in sync with translations files names.
 */
export enum LocalizationLanguage {
  BELARUSIAN = 'by',
  ENGLISH = 'en',
  RUSSIAN = 'ru',
}

export const isLocalizationLanguage = (
  language: string
): language is LocalizationLanguage => {
  return (
    language === LocalizationLanguage.BELARUSIAN ||
    language === LocalizationLanguage.ENGLISH ||
    language === LocalizationLanguage.RUSSIAN
  );
};
