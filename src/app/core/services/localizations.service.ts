import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';

import { LOCAL_STORAGE } from '@core/dependencies/local-storage';
import { NAVIGATOR } from '@core/dependencies/navigator';

import { LocalizationLanguage } from '@shared/enums/localization-language.enum';
import { LocalStorageKey } from '@shared/enums/local-storage-key.enum';
import { LocalizationSource } from '@shared/enums/localization-source.enum';
import { Localizations } from '@store/localizations';

const LOCAL_STORAGE_LANGUAGE_MAP = new Map<string, LocalizationLanguage>([
  [LocalizationLanguage.BELARUSIAN, LocalizationLanguage.BELARUSIAN],
  [LocalizationLanguage.RUSSIAN, LocalizationLanguage.RUSSIAN],
  [LocalizationLanguage.ENGLISH, LocalizationLanguage.ENGLISH],
]);

@Injectable({
  providedIn: 'root',
})
export class LocalizationsService {
  private readonly _localStorage = inject(LOCAL_STORAGE);
  private readonly _navigator = inject(NAVIGATOR);
  private readonly _store = inject(Store);

  public init(): void {
    const localStorageLanguage = this.getLanguageFromLocalStorage();

    try {
      const localizationLanguage =
        this.determineLanguageByOneFromLocalStorage(localStorageLanguage);

      if (localizationLanguage !== null) {
        this.initLocalization(
          LocalizationSource.LOCAL_STORAGE,
          localizationLanguage
        );
        return;
      }
    } catch (error: unknown) {
      this.removeLanguageFromLocalStorage();
      console.error(error);
    }

    const browserLanguage = this.getLanguageFromBrowser();
    const localizationLanguage =
      this.determineLanguageByOneFromBrowser(browserLanguage);

    if (localizationLanguage !== null) {
      this.initLocalization(LocalizationSource.BROWSER, localizationLanguage);
      return;
    }

    this.initLocalization(
      LocalizationSource.DEFAULT,
      LocalizationLanguage.BELARUSIAN
    );
  }

  private getLanguageFromLocalStorage(): string | null {
    return this._localStorage.getItem(LocalStorageKey.PUSHKA_LANGUAGE);
  }

  private determineLanguageByOneFromLocalStorage(
    localStorageLanguage: string | null
  ): LocalizationLanguage | null {
    if (localStorageLanguage === null) {
      return null;
    }

    const localizationLanguage =
      LOCAL_STORAGE_LANGUAGE_MAP.get(localStorageLanguage);

    if (localizationLanguage === undefined) {
      throw new Error('Unknown language is in local storage!');
    }

    return localizationLanguage;
  }

  private removeLanguageFromLocalStorage(): void {
    this._localStorage.removeItem(LocalStorageKey.PUSHKA_LANGUAGE);
  }

  private getLanguageFromBrowser(): string {
    return this._navigator.language;
  }

  private determineLanguageByOneFromBrowser(
    browserLanguage: string
  ): LocalizationLanguage | null {
    if (browserLanguage.startsWith('en')) {
      return LocalizationLanguage.ENGLISH;
    }

    if (browserLanguage.startsWith('ru')) {
      return LocalizationLanguage.RUSSIAN;
    }

    if (browserLanguage.startsWith('be')) {
      return LocalizationLanguage.BELARUSIAN;
    }

    return null;
  }

  private initLocalization(
    source: LocalizationSource,
    localizationLanguage: LocalizationLanguage
  ): void {
    this._store.dispatch(new Localizations.Init(source, localizationLanguage));
  }
}
