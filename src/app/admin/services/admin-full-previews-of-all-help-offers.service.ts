import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, takeUntil, tap } from 'rxjs';

import { DestroyEmitter } from '../../shared/abstracts/destroy-emitter.class';
import {
  AppEventBusService,
  AppEventName,
  FailedGetFullPreviewsOfAllHelpOffersPayload,
  MakeGetFullPreviewsOfAllHelpOffersRequest,
  SuccessDeleteHelpOfferPayload,
  SuccessGetFullPreviewsOfAllHelpOffersPayload,
  SuccessHelpOfferStatusUpdatePayload,
} from '../../events';
import { HelpOfferFullPreviewType } from '../../shared/types/help-offer-full-preview.type';

@Injectable()
export class AdminFullPreviewsOfAllHelpOffersService extends DestroyEmitter {
  private readonly _fullPreviewsOfAllHelpOffers$ = new BehaviorSubject<
    ReadonlyArray<HelpOfferFullPreviewType>
  >([]);
  private readonly _getFullPreviewsOfAllInProgress$ =
    new BehaviorSubject<boolean>(false);
  private readonly _getFullPreviewsOfAllError$ =
    new BehaviorSubject<HttpErrorResponse | null>(null);

  public readonly fullPreviewsOfAllHelpOffers$ =
    this._fullPreviewsOfAllHelpOffers$.asObservable();
  public readonly getFullPreviewsOfAllInProgress$ =
    this._getFullPreviewsOfAllInProgress$.asObservable();
  public readonly getFullPreviewsOfAllError$ =
    this._getFullPreviewsOfAllError$.asObservable();

  constructor(private readonly eventBusService: AppEventBusService) {
    super();

    this.subToSuccessGetFullPreviewsOfAll();
    this.subToFailedGetFullPreviewsOfAll();
    this.subToSuccessHelpOfferStatusUpdate();
    this.subToSuccessDeleteHelpOffer();
  }

  public makeRequestToGetFullPreviewsOfAll(): void {
    this._getFullPreviewsOfAllInProgress$.next(true);
    this._getFullPreviewsOfAllError$.next(null);
    this.eventBusService.emit(new MakeGetFullPreviewsOfAllHelpOffersRequest());
  }

  private subToSuccessGetFullPreviewsOfAll(): void {
    this.eventBusService
      .on<SuccessGetFullPreviewsOfAllHelpOffersPayload>(
        AppEventName.SUCCESS_GET_FULL_PREVIEWS_OF_ALL_HELP_OFFERS
      )
      .pipe(
        tap((payload) => {
          this._fullPreviewsOfAllHelpOffers$.next(payload);
          this._getFullPreviewsOfAllInProgress$.next(false);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private subToFailedGetFullPreviewsOfAll(): void {
    this.eventBusService
      .on<FailedGetFullPreviewsOfAllHelpOffersPayload>(
        AppEventName.FAILED_GET_FULL_PREVIEWS_OF_ALL_HELP_OFFERS
      )
      .pipe(
        tap((error) => {
          this._getFullPreviewsOfAllError$.next(error);
          this._getFullPreviewsOfAllInProgress$.next(false);
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
        tap(({ id, newStatus }) => {
          this._fullPreviewsOfAllHelpOffers$.next(
            this._fullPreviewsOfAllHelpOffers$.getValue().map((preview) => {
              if (preview.id !== id) {
                return preview;
              }

              return {
                ...preview,
                status: newStatus,
              };
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private subToSuccessDeleteHelpOffer(): void {
    this.eventBusService
      .on<SuccessDeleteHelpOfferPayload>(AppEventName.SUCCESS_DELETE_HELP_OFFER)
      .pipe(
        tap(({ id }) => {
          this._fullPreviewsOfAllHelpOffers$.next(
            this._fullPreviewsOfAllHelpOffers$
              .getValue()
              .filter((preview) => preview.id !== id)
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
