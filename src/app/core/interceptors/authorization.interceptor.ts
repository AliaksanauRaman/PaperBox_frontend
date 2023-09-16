import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserTokenStateService } from '../../state/user-token/user-token-state.service';

import { IS_AUTHORIZED } from '@core/contexts/is-authorized.context';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationInterceptor implements HttpInterceptor {
  private readonly _userTokenStateService = inject(UserTokenStateService);

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isAuthorized = req.context.get(IS_AUTHORIZED);

    if (!isAuthorized) {
      return next.handle(req);
    }

    const userTokenValue = this._userTokenStateService.get();

    if (userTokenValue === null) {
      return next.handle(req);
    }

    return next.handle(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${userTokenValue}`,
        },
      })
    );
  }
}
