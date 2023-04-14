import { Injectable } from '@angular/core';

import { UserTokenService } from '../../shared/services/user-token.service';
import { RoutingService } from '../../core/services/routing.service';
import { InfoNotificationService } from '../../core/services/info-notification.service';

import { SuccessLoginResponseDataType } from '../../shared/types/success-login-response-data.type';

@Injectable({
  providedIn: 'root',
})
export class SuccessLoginHandlerService {
  constructor(
    private readonly _userTokenService: UserTokenService,
    private readonly _infoNotificationService: InfoNotificationService,
    private readonly _routingService: RoutingService
  ) {}

  public handle(data: SuccessLoginResponseDataType): void {
    this._userTokenService.setUserToken(data.token);
    this._infoNotificationService.showMessage('info.loggedInSuccessfully');
    this._routingService.navigateToHome();
  }
}
