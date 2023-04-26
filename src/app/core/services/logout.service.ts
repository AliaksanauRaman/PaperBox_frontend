import { Injectable } from '@angular/core';

import { UserTokenService } from '../../shared/services/user-token.service';
import { InfoNotificationService } from './info-notification.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(
    private readonly _userTokenService: UserTokenService,
    private readonly _infoNotificationService: InfoNotificationService
  ) {}

  public doLogout(): void {
    this._userTokenService.remove();
    this._infoNotificationService.showMessage('info.loggedOutSuccessfully');
  }
}
