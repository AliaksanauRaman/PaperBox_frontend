import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, takeUntil } from 'rxjs';

import { AppEventBusService, AppEventName } from '../../events';

import { DestroyEmitter } from '../../shared/abstracts/destroy-emitter.class';
import { PublishedHelpOfferListType } from '../../shared/types/published-help-offer-list.type';
import { HttpRequestStateMachine } from '../../shared/classes/http-request-state-machine.class';
import { MakeGetPublishedHelpOffersRequest } from '../events';

@Injectable()
export class PublishedHelpOffersService extends DestroyEmitter {
  private readonly httpRequestStateMachine =
    new HttpRequestStateMachine<PublishedHelpOfferListType>();

  public readonly state$ = this.httpRequestStateMachine.currentState$;

  constructor(private readonly eventBusService: AppEventBusService) {
    super();

    this.subToSuccessGet();
    this.subToFailedGet();
  }

  public makeGetHttpRequest(): void {
    this.httpRequestStateMachine.handleMakeRequest();
    this.eventBusService.emit(new MakeGetPublishedHelpOffersRequest());
  }

  private subToSuccessGet(): void {
    this.eventBusService
      .on<PublishedHelpOfferListType>(
        AppEventName.SUCCESS_GET_PUBLISHED_HELP_OFFERS
      )
      .pipe(
        tap((publishedHelpOffers) => {
          this.httpRequestStateMachine.handleSuccessResponse(
            publishedHelpOffers
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private subToFailedGet(): void {
    this.eventBusService
      .on<HttpErrorResponse>(AppEventName.FAILED_GET_PUBLISHED_HELP_OFFERS)
      .pipe(
        tap((error) => {
          this.httpRequestStateMachine.handleFailedResponse(error);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
