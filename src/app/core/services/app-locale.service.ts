import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LOCAL_STORAGE, LocalStorageType } from '../dependencies/local-storage';

import { LocalStorageKey } from '../../shared/enums/local-storage-key.enum';

const DEFAULT_APP_LOCALE = 'be-BY';

@Injectable({
  providedIn: 'root',
})
// TODO: Check if refactoring is needed
export class AppLocaleService {
  private readonly _currentLocale$ = new BehaviorSubject(
    this.localStorage.getItem(LocalStorageKey.APP_CURRENT_LOCALE) ||
      DEFAULT_APP_LOCALE
  );
  public readonly currentLocale$ = this._currentLocale$.asObservable();

  public get currentLocale(): string {
    return this._currentLocale$.getValue();
  }

  constructor(
    @Inject(LOCAL_STORAGE)
    private readonly localStorage: LocalStorageType
  ) {}

  public setCurrentLocale(locale: string): void {
    this._currentLocale$.next(locale);
    this.localStorage.setItem(LocalStorageKey.APP_CURRENT_LOCALE, locale);
  }
}
