import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LOCAL_STORAGE } from '../dependencies/local-storage';

import { LocalStorageKey } from '../../shared/enums/local-storage-key.enum';

const DEFAULT_APP_LOCALE = 'be-BY';

@Injectable({
  providedIn: 'root',
})
// TODO: Check if refactoring is needed
export class AppLocaleService {
  private readonly _localStorage = inject(LOCAL_STORAGE);

  private readonly _currentLocale$ = new BehaviorSubject(
    this._localStorage.getItem(LocalStorageKey.APP_CURRENT_LOCALE) ||
      DEFAULT_APP_LOCALE
  );
  public readonly currentLocale$ = this._currentLocale$.asObservable();

  public get currentLocale(): string {
    return this._currentLocale$.getValue();
  }

  public setCurrentLocale(locale: string): void {
    this._currentLocale$.next(locale);
    this._localStorage.setItem(LocalStorageKey.APP_CURRENT_LOCALE, locale);
  }
}
