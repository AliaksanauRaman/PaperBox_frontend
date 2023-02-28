import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, of, takeUntil, merge } from 'rxjs';

import { HelpOffersHttpService } from '../../core/services/help-offers-http.service';

import { DestroyEmitter } from '../../shared/abstracts/destroy-emitter.class';
import { AppEventBusService, AppEventName } from '../../events';
import {
  SuccessGetPublishedHelpOffers,
  FailedGetPublishedHelpOffers,
} from '../events';

@Injectable()
// TODO: Unused
export class HelpOffersEventsProcessorService extends DestroyEmitter {
  constructor(
    private readonly eventBusService: AppEventBusService,
    private readonly helpOffersHttpService: HelpOffersHttpService
  ) {
    super();
  }

  public setUpProcessors(): void {
    this.processGetPublishedHelpOffersRequests();
  }

  private processGetPublishedHelpOffersRequests(): void {
    this.eventBusService
      .on(AppEventName.MAKE_GET_PUBLISHED_HELP_OFFERS_REQUEST)
      .pipe(
        tap(() => {
          this.helpOffersHttpService
            .getPublished()
            .pipe(
              tap((publishedHelpOfferList) =>
                this.eventBusService.emit(
                  new SuccessGetPublishedHelpOffers(publishedHelpOfferList)
                )
              ),
              catchError((error: HttpErrorResponse) => {
                this.eventBusService.emit(
                  new FailedGetPublishedHelpOffers(error)
                );
                return of(null);
              }),
              takeUntil(
                merge(
                  this.destroy$,
                  this.eventBusService.getDestroyStream(
                    AppEventName.MAKE_GET_PUBLISHED_HELP_OFFERS_REQUEST
                  )
                )
              )
            )
            .subscribe();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
