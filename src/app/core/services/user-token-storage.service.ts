import { Injectable, Inject } from '@angular/core';
import { distinctUntilChanged, tap } from 'rxjs';

import { LOCAL_STORAGE, LocalStorageType } from '../dependencies/local-storage';
import { UserTokenService } from '../../shared/services/user-token.service';

import { LocalStorageKey } from '../../shared/enums/local-storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class UserTokenStorageService {
  constructor(
    @Inject(LOCAL_STORAGE)
    private readonly _localStorage: LocalStorageType,
    private readonly _userTokenService: UserTokenService
  ) {}

  public setUp(): void {
    this.loadUserTokenFromLocalStorage();
    this.subToUserTokenChanges();
  }

  private loadUserTokenFromLocalStorage(): void {
    const userToken = this.getUserTokenFromLocalStorage();

    if (userToken === null) {
      return;
    }

    this._userTokenService.set(userToken);
  }

  private getUserTokenFromLocalStorage(): string | null {
    return this._localStorage.getItem(LocalStorageKey.USER_TOKEN);
  }

  private subToUserTokenChanges(): void {
    this._userTokenService.value$
      .pipe(
        distinctUntilChanged(),
        tap((userToken) => {
          if (userToken === null) {
            this._localStorage.removeItem(LocalStorageKey.USER_TOKEN);
          } else {
            this._localStorage.setItem(LocalStorageKey.USER_TOKEN, userToken);
          }
        })
      )
      .subscribe();
  }
}
