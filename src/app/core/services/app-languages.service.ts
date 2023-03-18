import { Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, map } from 'rxjs';

import { LocalStorageType, LOCAL_STORAGE } from '../dependencies/local-storage';
import { AppLocaleService } from './app-locale.service';

import { AppLanguageValue } from '../../shared/enums/app-language-value.enum';
import { LocalStorageKey } from '../../shared/enums/local-storage-key.enum';
import { AppLanguage } from '../../shared/types/app-language.type';

const DEFAULT_APP_LANGUAGE = AppLanguageValue.BELARUSIAN;
// TODO: Inject?
const APP_LANGUAGES: ReadonlyArray<AppLanguage> = [
  {
    label: 'BY',
    value: AppLanguageValue.BELARUSIAN,
    selected: false,
  },
  {
    label: 'EN',
    value: AppLanguageValue.ENGLISH,
    selected: false,
  },
];

// TODO: !IMPORTANT Refactor it please
const getInitialStateOfAppLanguages = (
  initiallySelectedLanguageValue: string
): ReadonlyArray<AppLanguage> => {
  return APP_LANGUAGES.map((language) => ({
    ...language,
    selected: language.value === initiallySelectedLanguageValue,
  }));
};

const getLocaleByLanguageValue = (languageValue: string): string => {
  if (AppLanguageValue.BELARUSIAN === languageValue) {
    return 'be-BY';
  }

  if (AppLanguageValue.ENGLISH === languageValue) {
    return 'en-GB';
  }

  throw new Error(`No locale found for '${languageValue}' language!`);
};

@Injectable({
  providedIn: 'root',
})
// TODO: Name? AppLocalizationService
export class AppLanguagesService {
  private readonly _languages$ = new BehaviorSubject(
    getInitialStateOfAppLanguages(
      this.localStorage.getItem(LocalStorageKey.APP_CURRENT_LANGUAGE) ||
        DEFAULT_APP_LANGUAGE
    )
  );

  public readonly languages$ = this._languages$.asObservable();
  public readonly currentLanguage$ = this._languages$.asObservable().pipe(
    map((languages) => {
      const currentLanguage = languages.find(({ selected }) => selected);

      if (currentLanguage === undefined) {
        throw new Error('None language is selected!');
      }

      return currentLanguage;
    })
  );

  constructor(
    @Inject(LOCAL_STORAGE)
    private readonly localStorage: LocalStorageType,
    private readonly translateService: TranslateService,
    private readonly localeService: AppLocaleService
  ) {}

  public setUp(): void {
    this.translateService.setDefaultLang(DEFAULT_APP_LANGUAGE);
    this.translateService.use(
      this.localStorage.getItem(LocalStorageKey.APP_CURRENT_LANGUAGE) ||
        DEFAULT_APP_LANGUAGE
    );
  }

  // TODO: Types?
  public selectLanguage(languageValue: string): void {
    const currentLanguages = this._languages$.getValue();

    // TODO: Refactor it please
    this.translateService.use(languageValue);
    this.localStorage.setItem(
      LocalStorageKey.APP_CURRENT_LANGUAGE,
      languageValue
    );
    this.localeService.setCurrentLocale(
      getLocaleByLanguageValue(languageValue)
    );

    this._languages$.next(
      currentLanguages.map((language) => {
        return {
          ...language,
          selected: language.value === languageValue,
        };
      })
    );
  }

  public selectNextLanguage(): void {
    const currentLanguages = this._languages$.getValue();
    const nextLanguage = this.getLanguageNextToSelected(currentLanguages);
    const nextLanguageValue = nextLanguage.value;

    this.translateService.use(nextLanguageValue);
    this.localStorage.setItem(
      LocalStorageKey.APP_CURRENT_LANGUAGE,
      nextLanguageValue
    );
    this.localeService.setCurrentLocale(
      getLocaleByLanguageValue(nextLanguageValue)
    );

    this._languages$.next(
      currentLanguages.map((language) => {
        return {
          ...language,
          selected: language.value === nextLanguageValue,
        };
      })
    );
  }

  public translateByKey(key: string): string {
    return this.translateService.instant(key);
  }

  private getLanguageNextToSelected(
    languageList: ReadonlyArray<AppLanguage>
  ): AppLanguage {
    const selectedLanguageIndex = languageList.findIndex(
      ({ selected }) => selected
    );

    if (selectedLanguageIndex === -1) {
      throw new Error('None language is selected!');
    }

    const languageNextToSelected: AppLanguage | undefined =
      languageList[selectedLanguageIndex + 1];
    const firstLanguage = languageList[0];

    if (languageNextToSelected !== undefined) {
      return languageNextToSelected;
    }

    return firstLanguage;
  }
}
