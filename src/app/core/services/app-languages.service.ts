import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { AppLanguageValue } from '../../shared/enums/app-language-value.enum';

// TODO: Inject?
const DEFAULT_APP_LANGUAGES = [
  {
    label: 'BY',
    value: AppLanguageValue.BELARUSIAN,
    selected: true,
  },
  {
    label: 'EN',
    value: AppLanguageValue.ENGLISH,
    selected: false,
  },
];

@Injectable({
  providedIn: 'root',
})
export class AppLanguagesService {
  private readonly _languages$ = new BehaviorSubject(DEFAULT_APP_LANGUAGES);

  public readonly languages$ = this._languages$.asObservable();

  constructor(private readonly translateService: TranslateService) {}

  public setUp(): void {
    this.translateService.setDefaultLang(AppLanguageValue.BELARUSIAN);
    this.translateService.use(AppLanguageValue.BELARUSIAN);
  }

  // TODO: Types?
  public selectLanguage(languageValue: string): void {
    const currentLanguages = this._languages$.getValue();

    this.translateService.use(languageValue);
    this._languages$.next(
      currentLanguages.map((language) => {
        return {
          ...language,
          selected: language.value === languageValue,
        };
      })
    );
  }
}
