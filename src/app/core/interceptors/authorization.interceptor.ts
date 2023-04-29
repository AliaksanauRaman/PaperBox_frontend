import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserTokenEntityService } from '../../shared/services/user-token-entity.service';

// TODO: !IMPORTANT It must be enhanced
const REQUESTS_TO_AUTHORIZE = [
  {
    method: 'POST',
    endpoint: '/api/help-offers',
  },
  {
    method: 'POST',
    endpoint: '/api/help-requests',
  },
  {
    method: 'PATCH',
    endpoint: '/api/help-offers',
  },
  {
    method: 'PATCH',
    endpoint: '/api/help-requests',
  },
  {
    method: 'GET',
    endpoint: '/admin/help-offers',
  },
  {
    method: 'GET',
    endpoint: '/admin/help-requests',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(
    private readonly _userTokenEntityService: UserTokenEntityService
  ) {}

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRequestToAuthorize(req)) {
      return next.handle(req);
    }

    const userTokenEntity = this._userTokenEntityService.getValueOrNull();

    if (userTokenEntity === null || userTokenEntity.expired) {
      return next.handle(req);
    }

    return next.handle(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${userTokenEntity.userToken}`,
        },
      })
    );
  }

  private isRequestToAuthorize(req: HttpRequest<unknown>): boolean {
    const { url: currentRequestUrl, method: currentRequestMethod } = req;
    return REQUESTS_TO_AUTHORIZE.some(
      ({ method, endpoint }) =>
        currentRequestMethod === method && currentRequestUrl.includes(endpoint)
    );
  }
}
