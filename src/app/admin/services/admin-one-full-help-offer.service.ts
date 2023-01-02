import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, takeUntil } from 'rxjs';

import { AppEventBusService } from '../../events/app-event-bus.service';

import { DestroyEmitter } from '../../shared/abstracts/destroy-emitter.class';
import {
  AppEventName,
  MakeHelpOfferStatusUpdateRequest,
  SuccessHelpOfferStatusUpdatePayload,
} from '../../events';
import { MakeGetOneFullHelpOfferRequest } from '../../events/entries/make-get-one-full-help-offer-request/event';
import { HelpOfferStatus } from '../../shared/enums/help-offer-status.enum';
import { FullHelpOfferType } from '../types/full-help-offer.type';

@Injectable()
export class AdminOneFullHelpOfferService extends DestroyEmitter {
  private readonly _fullHelpOffer$ =
    new BehaviorSubject<FullHelpOfferType | null>(null);
  private readonly _getByIdInProgress$ =
    new BehaviorSubject<boolean>(false);
  private readonly _getByIdError$ =
    new BehaviorSubject<HttpErrorResponse | null>(null);
  private readonly _updateStatusInProgress$ =
    new BehaviorSubject<boolean>(false);
  private readonly _updateStatusError$ =
    new BehaviorSubject<HttpErrorResponse | null>(null);

  public readonly fullHelpOffer$ = this._fullHelpOffer$.asObservable();
  public readonly getByIdInProgress$ = this._getByIdInProgress$.asObservable();
  public readonly getByIdError$ = this._getByIdError$.asObservable();
  public readonly updateStatusInProgress$ = this._updateStatusInProgress$.asObservable();
  public readonly updateStatusError$ = this._updateStatusError$.asObservable();

  constructor(private readonly eventBusService: AppEventBusService) {
    super();

    this.subToSuccessHelpOfferGetFull();
    this.subToFailedHelpOfferGetFull();
    this.subToSuccessHelpOfferStatusUpdate();
    this.subToFailedHelpOfferStatusUpdate();
  }

  public makeRequestToGetById(helpOfferId: string): void {
    this._getByIdInProgress$.next(true);
    this.eventBusService.emit(
      new MakeGetOneFullHelpOfferRequest({ id: helpOfferId })
    );
  }

  public makeRequestToUpdateStatus(
    helpOfferId: string,
    status: HelpOfferStatus
  ): void {
    this._updateStatusInProgress$.next(true);
    this.eventBusService.emit(
      new MakeHelpOfferStatusUpdateRequest({
        id: helpOfferId,
        newStatus: status,
      })
    );
  }

  private subToSuccessHelpOfferGetFull(): void {
    this.eventBusService
      .on<FullHelpOfferType>(AppEventName.SUCCESS_GET_ONE_FULL_HELP_OFFER)
      .pipe(
        tap((fullHelpOffer) => {
          this._fullHelpOffer$.next(fullHelpOffer);
          this._getByIdInProgress$.next(false);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private subToFailedHelpOfferGetFull(): void {
    this.eventBusService
      .on<HttpErrorResponse>(AppEventName.FAILED_GET_ONE_FULL_HELP_OFFER)
      .pipe(
        tap((error) => {
          this._getByIdError$.next(error);
          this._getByIdInProgress$.next(false);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private subToSuccessHelpOfferStatusUpdate(): void {
    this.eventBusService
      .on<SuccessHelpOfferStatusUpdatePayload>(
        AppEventName.SUCCESS_HELP_OFFER_STATUS_UPDATE
      )
      .pipe(
        tap((payload) => {
          const currentFullHelpOffer = this._fullHelpOffer$.getValue();

          if (currentFullHelpOffer === null) {
            throw new Error('Current full help offer cannot be null!');
          }

          if (currentFullHelpOffer.id !== payload.id) {
            throw new Error('A different help offer must be updated!');
          }

          this._fullHelpOffer$.next({
            ...currentFullHelpOffer,
            status: payload.newStatus,
          });
          this._updateStatusInProgress$.next(false);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private subToFailedHelpOfferStatusUpdate(): void {
    this.eventBusService
      .on<HttpErrorResponse>(AppEventName.FAILED_HELP_OFFER_STATUS_UPDATE)
      .pipe(
        tap((error) => {
          this._updateStatusError$.next(error);
          this._updateStatusInProgress$.next(false);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
