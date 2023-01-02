import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, tap, catchError, of, takeUntil } from 'rxjs';

import { AdminHelpOffersHttpService } from '../../services/admin-help-offers-http.service';

import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';
import {
  AppEventBusService,
  AppEventName,
  MakeHelpOfferStatusUpdateRequestPayload,
  SuccessHelpOfferStatusUpdate,
  FailedHelpOfferStatusUpdate,
  MakeGetOneFullHelpOfferRequestPayload,
  SuccessGetOneFullHelpOffer,
  FailedGetOneFullHelpOffer,
} from '../../../events';

@Injectable()
export class AdminManageHelpOfferDialogService extends DestroyEmitter {
  constructor(
    private readonly eventBusService: AppEventBusService,
    private readonly adminHelpOffersHttpService: AdminHelpOffersHttpService
  ) {
    super();

    this.subToGetOneFullHelpOffer();
    this.subToUpdateHelpOfferStatus();
  }

  private subToGetOneFullHelpOffer(): void {
    this.eventBusService
      .on<MakeGetOneFullHelpOfferRequestPayload>(
        AppEventName.MAKE_GET_ONE_FULL_HELP_OFFER_REQUEST
      )
      .pipe(
        switchMap(({ id }) =>
          this.adminHelpOffersHttpService.getOneFullById(id)
        ),
        tap((response) =>
          this.eventBusService.emit(new SuccessGetOneFullHelpOffer(response))
        ),
        catchError((error: HttpErrorResponse) => {
          this.eventBusService.emit(new FailedGetOneFullHelpOffer(error));
          return of(null);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private subToUpdateHelpOfferStatus(): void {
    this.eventBusService
      .on<MakeHelpOfferStatusUpdateRequestPayload>(
        AppEventName.MAKE_HELP_OFFER_STATUS_UPDATE_REQUEST
      )
      .pipe(
        switchMap(({ id, newStatus }) =>
          this.adminHelpOffersHttpService.updateStatusOfOneWithId(id, newStatus)
        ),
        tap((response) =>
          this.eventBusService.emit(new SuccessHelpOfferStatusUpdate(response))
        ),
        catchError((error: HttpErrorResponse) => {
          this.eventBusService.emit(new FailedHelpOfferStatusUpdate(error));
          return of(null);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
