import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, of, takeUntil } from 'rxjs';

import { HelpOffersHttpService } from './help-offers-http.service';

import { DestroyEmitter } from '../../shared/abstracts/destroy-emitter.class';
import {
  AppEventBusService,
  AppEventName,
  FailedCreateHelpOffer,
  MakeCreateHelpOfferRequestPayloadType,
  SuccessCreateHelpOffer,
} from '../../events';

@Injectable()
// TODO: Unused
export class CoreEventsProcessorService extends DestroyEmitter {
  constructor(
    private readonly eventBusService: AppEventBusService,
    private readonly helpOffersHttpService: HelpOffersHttpService
  ) {
    super();
  }

  public setUpProcessors(): void {
    this.processCreateHelpOfferRequests();
  }

  private processCreateHelpOfferRequests(): void {
    this.eventBusService
      .on<MakeCreateHelpOfferRequestPayloadType>(
        AppEventName.MAKE_CREATE_HELP_OFFER_REQUEST
      )
      .pipe(
        tap((payload) => {
          this.helpOffersHttpService
            .createOne(payload)
            .pipe(
              tap((response) =>
                this.eventBusService.emit(new SuccessCreateHelpOffer(response))
              ),
              catchError((error: HttpErrorResponse) => {
                this.eventBusService.emit(new FailedCreateHelpOffer(error));
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
