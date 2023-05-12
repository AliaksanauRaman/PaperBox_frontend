import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserTokenEntityService } from '../../shared/services/user-token-entity.service';

type RequestType = Readonly<{
  method: 'POST' | 'GET';
  endpoint: string;
}>;
const REQUESTS_TO_SKIP: ReadonlyArray<RequestType> = [
  {
    method: 'POST',
    endpoint: '/api/login',
  },
  {
    method: 'POST',
    endpoint: '/api/registration',
  },
  {
    method: 'GET',
    endpoint: '/api/help-offers/published',
  },
  {
    method: 'GET',
    endpoint: '/api/help-requests/published',
  },
  {
    method: 'GET',
    endpoint: '/assets',
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
    if (this.isRequestToSkip(req)) {
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

  private isRequestToSkip(req: HttpRequest<unknown>): boolean {
    const { url: currentRequestUrl, method: currentRequestMethod } = req;
    return REQUESTS_TO_SKIP.some(
      ({ method, endpoint }) =>
        currentRequestMethod === method && currentRequestUrl.includes(endpoint)
    );
  }
}
