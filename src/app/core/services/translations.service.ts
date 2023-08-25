import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { LocalizationsState } from '@store/localizations';
import { Localization } from '@shared/models/localization.model';

@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  private readonly _store = inject(Store);
  private readonly _translateService = inject(TranslateService);

  @Select(LocalizationsState.current)
  private readonly _currentLocalization$!: Observable<Localization>;

  public setUp(): void {
    const initialLocalization = this._store.selectSnapshot(
      LocalizationsState.current
    );
    this._translateService.setDefaultLang(initialLocalization.language);

    this._currentLocalization$
      .pipe(tap(({ language }) => this._translateService.use(language)))
      .subscribe();
  }

  public translateByKey(key: string): string {
    return this._translateService.instant(key);
  }
}
