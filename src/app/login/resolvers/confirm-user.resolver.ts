import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { RoutingService } from '../../core/services/routing.service';
import { ConfirmUserHttpService } from '../services/confirm-user-http.service';

import { ConfirmUserResponseDataType } from '../../shared/types/confirm-user-response-data.type';

@Injectable({
  providedIn: 'root',
})
export class ConfirmUserResolver
  implements Resolve<ConfirmUserResponseDataType>
{
  constructor(
    private readonly _routingService: RoutingService,
    private readonly _confirmUserHttpService: ConfirmUserHttpService
  ) {}

  public resolve(
    route: ActivatedRouteSnapshot
  ): Observable<ConfirmUserResponseDataType> {
    const { token } = route.queryParams;

    if (token === undefined || token === '') {
      this._routingService.navigateToNotFound();
      throw new Error('Token is invalid!');
    }

    return this._confirmUserHttpService.confirmUser(token);
  }
}
