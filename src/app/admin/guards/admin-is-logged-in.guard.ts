import { Injectable, inject } from '@angular/core';
import { CanActivateChild } from '@angular/router';

import { UserStateService } from '../../state/user/user-state.service';
import { RoutingService } from '../../core/services/routing.service';

import { UserRole } from '../../shared/enums/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class AdminIsLoggedInGuard implements CanActivateChild {
  private readonly _userStateService = inject(UserStateService);
  private readonly _routingService = inject(RoutingService);

  public async canActivateChild(): Promise<boolean> {
    const user = this._userStateService.get();

    if (user !== null && user.valid && user.role === UserRole.ADMIN) {
      return true;
    }

    return this._routingService.navigateToAdminLogin().then(() => false);
  }
}
