import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, of, takeUntil, merge } from 'rxjs';

import { HelpRequestsHttpService } from '../../core/services/help-requests-http.service';

import { DestroyEmitter } from '../../shared/abstracts/destroy-emitter.class';
import { AppEventBusService, AppEventName } from '../../events';
import {
  SuccessGetPublishedHelpRequests,
  FailedGetPublishedHelpRequests,
} from '../events';

@Injectable()
// TODO: Unused
export class HelpRequestsEventsProcessorService extends DestroyEmitter {
  constructor(
    private readonly eventBusService: AppEventBusService,
    private readonly helpRequestsHttpService: HelpRequestsHttpService
  ) {
    super();
  }

  public setUpProcessors(): void {
    this.processGetPublishedHelpRequestsRequests();
  }

  private processGetPublishedHelpRequestsRequests(): void {
    this.eventBusService
      .on(AppEventName.MAKE_GET_PUBLISHED_HELP_REQUESTS_REQUEST)
      .pipe(
        tap(() => {
          this.helpRequestsHttpService
            .getPublished()
            .pipe(
              tap((publishedHelpRequestList) =>
                this.eventBusService.emit(
                  new SuccessGetPublishedHelpRequests(publishedHelpRequestList)
                )
              ),
              catchError((error: HttpErrorResponse) => {
                this.eventBusService.emit(
                  new FailedGetPublishedHelpRequests(error)
                );
                return of(null);
              }),
              takeUntil(
                merge(
                  this.destroy$,
                  this.eventBusService.getDestroyStream(
                    AppEventName.MAKE_GET_PUBLISHED_HELP_REQUESTS_REQUEST
                  )
                )
              )
            )
            .subscribe({ complete: () => console.log('completed') });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
