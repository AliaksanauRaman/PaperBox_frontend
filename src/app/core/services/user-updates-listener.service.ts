import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';

import { UserStateService } from '../../state/user/user-state.service';
import { UserIsLoggedInStateService } from '../../state/user-is-logged-in/user-is-logged-in-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserUpdatesListenerService {
  private readonly _userStateService = inject(UserStateService);
  private readonly _userIsLoggedInStateService = inject(
    UserIsLoggedInStateService
  );

  public setUp(): void {
    this._userStateService.stream$
      .pipe(
        tap((user) => {
          this._userIsLoggedInStateService.set(user !== null && user.valid);
        })
      )
      .subscribe();
  }
}
