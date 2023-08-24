import { Injectable, inject } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, tap } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { LocalizationsState } from '@store/localizations';
import { Localization } from '@shared/models/localization.model';
import { LocalizationLanguage } from '@shared/enums/localization-language.enum';

@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  private readonly _translateService = inject(TranslateService);

  @Select(LocalizationsState.current)
  private readonly _currentLocalization$!: Observable<Localization>;

  public setUp(): void {
    this._translateService.setDefaultLang(LocalizationLanguage.BELARUSIAN);
    this._currentLocalization$
      .pipe(tap(({ language }) => this._translateService.use(language)))
      .subscribe();
  }

  public translateByKey(key: string): string {
    return this._translateService.instant(key);
  }
}
