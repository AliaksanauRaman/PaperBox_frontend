import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, takeUntil } from 'rxjs';

import { AppEventBusService } from '../../events/app-event-bus.service';

import { DestroyEmitter } from '../../shared/abstracts/destroy-emitter.class';
import {
  AppEventName,
  MakeDeleteHelpOfferRequest,
  SuccessDeleteHelpOfferPayload,
  MakeHelpOfferStatusUpdateRequest,
  SuccessHelpOfferStatusUpdatePayload,
  FailedGetOneFullHelpOfferPayload,
  FailedHelpOfferStatusUpdatePayload,
  FailedDeleteHelpOfferPayload,
} from '../../events';
import { MakeGetOneFullHelpOfferRequest } from '../../events/entries/make-get-one-full-help-offer-request/event';
import { HelpOfferStatus } from '../../shared/enums/help-offer-status.enum';
import { FullHelpOfferType } from '../types/full-help-offer.type';

@Injectable()
export class AdminOneFullHelpOfferService extends DestroyEmitter {
  // TODO: Refactor
  private readonly _fullHelpOffer$ =
    new BehaviorSubject<FullHelpOfferType | null>(null);
  private readonly _getByIdInProgress$ = new BehaviorSubject<boolean>(false);
  private readonly _getByIdError$ =
    new BehaviorSubject<HttpErrorResponse | null>(null);
  private readonly _updateStatusInProgress$ = new BehaviorSubject<boolean>(
    false
  );
  private readonly _updateStatusError$ =
    new BehaviorSubject<HttpErrorResponse | null>(null);
  private readonly _deleteByIdInProgress$ = new BehaviorSubject<boolean>(false);
  private readonly _deleteByIdError$ =
    new BehaviorSubject<HttpErrorResponse | null>(null);
  private readonly _deleted$ = new BehaviorSubject<boolean>(false);

  public readonly fullHelpOffer$ = this._fullHelpOffer$.asObservable();
  public readonly getByIdInProgress$ = this._getByIdInProgress$.asObservable();
  public readonly getByIdError$ = this._getByIdError$.asObservable();
  public readonly updateStatusInProgress$ =
    this._updateStatusInProgress$.asObservable();
  public readonly updateStatusError$ = this._updateStatusError$.asObservable();
  public readonly deleteByIdInProgress$ = this._deleteByIdInProgress$.asObservable();
  public readonly deleteByIdError$ = this._deleteByIdError$.asObservable();
  public readonly deleted$ = this._deleted$.asObservable();

  constructor(private readonly eventBusService: AppEventBusService) {
    super();

    this.subToSuccessHelpOfferGetFull();
    this.subToFailedHelpOfferGetFull();
    this.subToSuccessHelpOfferStatusUpdate();
    this.subToFailedHelpOfferStatusUpdate();
    this.subToSuccessDeleteHelpOffer();
    this.subToFailedDeleteHelpOffer();
  }

  public makeRequestToGetById(helpOfferId: string): void {
    this._getByIdInProgress$.next(true);
    this._fullHelpOffer$.next(null);
    this._getByIdError$.next(null);
    this.eventBusService.emit(
      new MakeGetOneFullHelpOfferRequest({ id: helpOfferId })
    );
  }

  public makeRequestToUpdateStatus(
    helpOfferId: string,
    status: HelpOfferStatus
  ): void {
    this._updateStatusInProgress$.next(true);
    this._updateStatusError$.next(null);
    this._deleteByIdError$.next(null);
    this.eventBusService.emit(
      new MakeHelpOfferStatusUpdateRequest({
        id: helpOfferId,
        newStatus: status,
      })
    );
  }

  public makeRequestToDeleteById(helpOfferId: string): void {
    this._deleteByIdInProgress$.next(true);
    this._deleteByIdError$.next(null);
    this._updateStatusError$.next(null);
    this.eventBusService.emit(
      new MakeDeleteHelpOfferRequest({ id: helpOfferId })
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
      .on<FailedGetOneFullHelpOfferPayload>(
        AppEventName.FAILED_GET_ONE_FULL_HELP_OFFER
      )
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
      .on<FailedHelpOfferStatusUpdatePayload>(
        AppEventName.FAILED_HELP_OFFER_STATUS_UPDATE
      )
      .pipe(
        tap((error) => {
          this._updateStatusError$.next(error);
          this._updateStatusInProgress$.next(false);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private subToSuccessDeleteHelpOffer(): void {
    this.eventBusService
      .on<SuccessDeleteHelpOfferPayload>(AppEventName.SUCCESS_DELETE_HELP_OFFER)
      .pipe(
        tap((payload) => {
          const currentFullHelpOffer = this._fullHelpOffer$.getValue();

          if (currentFullHelpOffer === null) {
            throw new Error('Current full help offer cannot be null!');
          }

          if (currentFullHelpOffer.id !== payload.id) {
            throw new Error('A different help offer must be updated!');
          }

          this._deleted$.next(true);
          this._deleteByIdInProgress$.next(false);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private subToFailedDeleteHelpOffer(): void {
    this.eventBusService
      .on<FailedDeleteHelpOfferPayload>(AppEventName.FAILED_DELETE_HELP_OFFER)
      .pipe(
        tap((error) => {
          this._deleteByIdError$.next(error);
          this._deleteByIdInProgress$.next(false);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
