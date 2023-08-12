import { Injectable, inject } from '@angular/core';

import { LOCAL_STORAGE } from '../dependencies/local-storage';
import { UserTokenStateService } from '../../state/user-token/user-token-state.service';

import { LocalStorageKey } from '../../shared/enums/local-storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class UserTokenInitializerService {
  private readonly _localStorage = inject(LOCAL_STORAGE);
  private readonly _userTokenStateService = inject(UserTokenStateService);

  public initialize(): void {
    const userToken = this._localStorage.getItem(LocalStorageKey.USER_TOKEN);

    if (userToken === null) {
      return;
    }

    this._userTokenStateService.set(userToken);
  }
}
