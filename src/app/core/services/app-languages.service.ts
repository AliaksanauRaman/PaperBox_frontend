import { Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

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

// TODO: Refactor it please
const getInitialStateOfAppLanguages = (
  initiallySelectedLanguageValue: string
): ReadonlyArray<typeof APP_LANGUAGES[number]> => {
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

  public get currentLanguage(): string {
    return this.translateService.currentLang;
  }

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

  public translateByKey(key: string): string {
    return this.translateService.instant(key);
  }
}
