import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { RoutingService } from '../services/routing.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedOutUserGuard implements CanActivate {
  constructor(
    private readonly _userService: UserService,
    private readonly _routingService: RoutingService
  ) {}

  public async canActivate(): Promise<boolean> {
    if (!this._userService.isLoggedIn()) {
      return true;
    }

    return this._routingService.navigateToHome().then(() => false);
  }
}
