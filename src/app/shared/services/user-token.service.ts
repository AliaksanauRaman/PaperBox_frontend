import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  LOCAL_STORAGE,
  LocalStorageType,
} from '../../core/dependencies/local-storage';

import { LocalStorageKey } from '../enums/local-storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class UserTokenService {
  private readonly _value$ = new BehaviorSubject<string | null>(null);

  public readonly value$ = this._value$.asObservable();

  constructor(
    @Inject(LOCAL_STORAGE)
    private readonly _localStorage: LocalStorageType
  ) {}

  public setUserToken(userToken: string): void {
    this._localStorage.setItem(LocalStorageKey.USER_TOKEN, userToken);
    this._value$.next(userToken);
  }

  public removeUserToken(): void {
    this._localStorage.removeItem(LocalStorageKey.USER_TOKEN);
    this._value$.next(null);
  }
}
