import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { RoutingService } from '../../core/services/routing.service';
import { ConfirmUserHttpService } from '../services/confirm-user-http.service';

import { ConfirmUserResponseDataType } from '../../shared/types/confirm-user-response-data.type';

export const userConfirmationResolver: ResolveFn<
  ConfirmUserResponseDataType
> = (
  route: ActivatedRouteSnapshot
): Observable<ConfirmUserResponseDataType> => {
  const token = route.queryParamMap.get('token');

  if (token === null || token.trim() === '') {
    inject(RoutingService).navigateToNotFound();
    throw new Error('Token is not defined!');
  }

  return inject(ConfirmUserHttpService).confirmUser(token);
};
