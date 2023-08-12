import { Injectable, inject } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UserIsLoggedInStateService } from '../../state/user-is-logged-in/user-is-logged-in-state.service';
import { RoutingService } from '../services/routing.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedOutUserGuard implements CanActivate {
  private readonly _userIsLoggedInStateService = inject(
    UserIsLoggedInStateService
  );
  private readonly _routingService = inject(RoutingService);

  public async canActivate(): Promise<boolean> {
    if (!this._userIsLoggedInStateService.get()) {
      return true;
    }

    return this._routingService.navigateToHome().then(() => false);
  }
}
