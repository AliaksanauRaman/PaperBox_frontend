import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { RoutingService } from '../../core/services/routing.service';

import { UserRole } from '../../shared/enums/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class AdminIsLoggedInGuard implements CanActivateChild {
  constructor(
    private readonly _userService: UserService,
    private readonly _routingService: RoutingService
  ) {}

  public async canActivateChild(): Promise<boolean> {
    const user = this._userService.getValueOrNull();

    if (user === null || !user.valid || user.role !== UserRole.ADMIN) {
      return this._routingService.navigateToAdminLogin().then(() => false);
    }

    return true;
  }
}
