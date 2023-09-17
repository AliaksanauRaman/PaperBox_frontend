import { Injectable, inject } from '@angular/core';
import { filter, tap } from 'rxjs';

import { UserTokenStateService } from '../../state/user-token/user-token-state.service';
import { UserStateService } from '../../state/user/user-state.service';
import { UserMapperService } from '@shared/services/user-mapper/user-mapper.service';
import { LOCAL_STORAGE } from '../dependencies/local-storage';

import { LocalStorageKey } from '../../shared/enums/local-storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class UserTokenUpdatesListenerService {
  private readonly _userTokenStateService = inject(UserTokenStateService);
  private readonly _userStateService = inject(UserStateService);
  private readonly _userMapperService = inject(UserMapperService);
  private readonly _localStorage = inject(LOCAL_STORAGE);

  private readonly _userTokenNullValues$ =
    this._userTokenStateService.stream$.pipe(
      filter((value): value is null => value === null)
    );
  private readonly _userTokenNonNullValues$ =
    this._userTokenStateService.stream$.pipe(
      filter((value): value is string => value !== null)
    );

  public setUp(): void {
    this.subToNullUserTokenValues();
    this.subToNonNullUserTokenValues();
  }

  private subToNullUserTokenValues(): void {
    this._userTokenNullValues$
      .pipe(
        tap(() => {
          this._localStorage.removeItem(LocalStorageKey.USER_TOKEN);
          this._userStateService.remove();
        })
      )
      .subscribe();
  }

  private subToNonNullUserTokenValues(): void {
    this._userTokenNonNullValues$
      .pipe(
        tap((userTokenValue) => {
          this._localStorage.setItem(
            LocalStorageKey.USER_TOKEN,
            userTokenValue
          );
          const user =
            this._userMapperService.fromUserTokenToUser(userTokenValue);
          this._userStateService.set(user);
        })
      )
      .subscribe();
  }
}
