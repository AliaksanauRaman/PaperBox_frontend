import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, of, takeUntil } from 'rxjs';

import { HelpOffersHttpService } from './help-offers-http.service';

import { DestroyEmitter } from '../../shared/abstracts/destroy-emitter.class';
import { AppEventBusService, AppEventName } from '../../events';
import {
  SuccessGetPublishedHelpOffers,
  FailedGetPublishedHelpOffers,
} from '../events';

@Injectable()
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
              takeUntil(this.destroy$)
            )
            .subscribe();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
