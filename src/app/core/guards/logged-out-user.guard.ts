import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map, take, tap } from 'rxjs';

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

  public canActivate(): Observable<boolean> {
    return this._userService.userIsLoggedIn$.pipe(
      map((userIsLoggedIn) => !userIsLoggedIn),
      tap(async (userIsLoggedOut) => {
        if (!userIsLoggedOut) {
          await this._routingService.navigateToHome();
        }
      }),
      take(1)
    );
  }
}
