import { Injectable, inject } from '@angular/core';

import { UserTokenStateService } from '../../state/user-token/user-token-state.service';
import { InfoNotificationService } from './info-notification.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private readonly _userTokenStateService = inject(UserTokenStateService);
  private readonly _infoNotificationService = inject(InfoNotificationService);

  public doLogout(): void {
    this._userTokenStateService.remove();
    this._infoNotificationService.showMessage('info.loggedOutSuccessfully');
  }
}
