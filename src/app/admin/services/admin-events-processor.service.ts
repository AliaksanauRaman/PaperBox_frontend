import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, takeUntil, tap, of } from 'rxjs';

import { AdminHelpOffersHttpService } from './admin-help-offers-http.service';

import { DestroyEmitter } from '../../shared/abstracts/destroy-emitter.class';
import {
  AppEventBusService,
  AppEventName,
  FailedDeleteHelpOffer,
  FailedGetOneFullHelpOffer,
  FailedHelpOfferStatusUpdate,
  MakeDeleteHelpOfferRequestPayload,
  MakeGetOneFullHelpOfferRequestPayload,
  MakeHelpOfferStatusUpdateRequestPayload,
  SuccessDeleteHelpOffer,
  SuccessGetOneFullHelpOffer,
  SuccessHelpOfferStatusUpdate,
} from '../../events';

@Injectable()
export class AdminEventsProcessorService extends DestroyEmitter {
  constructor(
    private readonly eventBusService: AppEventBusService,
    private readonly adminHelpOffersHttpService: AdminHelpOffersHttpService
  ) {
    super();
  }

  public setUpProcessors(): void {
    this.processGetOneFullHelpOfferRequests();
    this.processHelpOfferStatusUpdateRequests();
    this.processDeleteHelpOfferRequests();
  }

  private processGetOneFullHelpOfferRequests(): void {
    this.eventBusService
      .on<MakeGetOneFullHelpOfferRequestPayload>(
        AppEventName.MAKE_GET_ONE_FULL_HELP_OFFER_REQUEST
      )
      .pipe(
        tap(({ id }) => {
          this.adminHelpOffersHttpService
            .getOneFullById(id)
            .pipe(
              tap((response) =>
                this.eventBusService.emit(
                  new SuccessGetOneFullHelpOffer(response)
                )
              ),
              catchError((error: HttpErrorResponse) => {
                this.eventBusService.emit(new FailedGetOneFullHelpOffer(error));
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

  private processHelpOfferStatusUpdateRequests(): void {
    this.eventBusService
      .on<MakeHelpOfferStatusUpdateRequestPayload>(
        AppEventName.MAKE_HELP_OFFER_STATUS_UPDATE_REQUEST
      )
      .pipe(
        tap(({ id, newStatus }) => {
          this.adminHelpOffersHttpService
            .updateStatusOfOneWithId(id, newStatus)
            .pipe(
              tap((response) =>
                this.eventBusService.emit(
                  new SuccessHelpOfferStatusUpdate(response)
                )
              ),
              catchError((error: HttpErrorResponse) => {
                this.eventBusService.emit(
                  new FailedHelpOfferStatusUpdate(error)
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

  private processDeleteHelpOfferRequests(): void {
    this.eventBusService
      .on<MakeDeleteHelpOfferRequestPayload>(
        AppEventName.MAKE_DELETE_HELP_OFFER_REQUEST
      )
      .pipe(
        tap(({ id }) => {
          this.adminHelpOffersHttpService
            .deleteOneById(id)
            .pipe(
              tap((response) =>
                this.eventBusService.emit(new SuccessDeleteHelpOffer(response))
              ),
              catchError((error: HttpErrorResponse) => {
                this.eventBusService.emit(new FailedDeleteHelpOffer(error));
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
