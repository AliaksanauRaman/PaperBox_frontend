import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

import { LoadingOverlayService } from '../services/loading-overlay.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayInterceptor implements HttpInterceptor {
  private _pendingRequestsCount = 0;

  constructor(private readonly _loadingOverlayService: LoadingOverlayService) {}

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.headers.get('showGlobalLoader') !== 'true') {
      return next.handle(req);
    }

    this._pendingRequestsCount += 1;

    if (!this._loadingOverlayService.isShown()) {
      this._loadingOverlayService.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        this._pendingRequestsCount -= 1;

        if (
          this._loadingOverlayService.isShown() &&
          this._pendingRequestsCount === 0
        ) {
          this._loadingOverlayService.hide();
        }
      })
    );
  }
}
