import { MakeGetOneFullHelpOfferRequest } from './../../../events/entries/make-get-one-full-help-offer-request/event';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, takeUntil, tap } from 'rxjs';

import { AdminManageHelpOfferDialogService } from './admin-manage-help-offer.service';

import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';
import { ManageHelpOfferDialogData } from '../../classes/manage-help-offer-dialog-data.class';
import { HttpRequestStateName } from '../../../shared/enums/http-request-state-name.enum';
import { HelpOfferStatus } from '../../../shared/enums/help-offer-status.enum';
import { FullHelpOfferType } from '../../types/full-help-offer.type';

// TODO: Temp
import {
  AppEventBusService,
  AppEventName,
  MakeHelpOfferStatusUpdateRequest,
  SuccessHelpOfferStatusUpdatePayload,
} from '../../../events';

@Component({
  selector: 'app-admin-manage-help-offer-dialog',
  templateUrl: './admin-manage-help-offer-dialog.component.html',
  styleUrls: ['./admin-manage-help-offer-dialog.component.scss'],
  providers: [AdminManageHelpOfferDialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminManageHelpOfferDialogComponent
  extends DestroyEmitter
  implements OnInit
{
  protected readonly httpRequestStateName = HttpRequestStateName;
  protected readonly helpOfferStatus = HelpOfferStatus;

  protected readonly publishingInProgress$ = new BehaviorSubject<boolean>(
    false
  );
  protected readonly allButtonsDisabled$ = new BehaviorSubject<boolean>(false);

  private readonly _fullHelpOffer$ =
    new BehaviorSubject<FullHelpOfferType | null>(null);
  public readonly fullHelpOffer$ = this._fullHelpOffer$.asObservable();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly data: ManageHelpOfferDialogData,
    private readonly service: AdminManageHelpOfferDialogService,
    // TODO: Temp
    private readonly eventBusService: AppEventBusService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.getOneFullHelpOfferById();
    this.subToSuccessHelpOfferGetFull();
    this.subToSuccessHelpOfferStatusUpdate();
    this.subToFailedHelpOfferStatusUpdate();
  }

  protected handlePublishButtonClick(): void {
    this.eventBusService.emit(
      new MakeHelpOfferStatusUpdateRequest({
        id: this.data.helpOfferId,
        newStatus: this.helpOfferStatus.PUBLISHED,
      })
    );
  }

  protected handleUnpublishButtonClick(): void {
    this.eventBusService.emit(
      new MakeHelpOfferStatusUpdateRequest({
        id: this.data.helpOfferId,
        newStatus: this.helpOfferStatus.UNPUBLISHED,
      })
    );
  }

  protected handleRejectButtonClick(): void {
    this.eventBusService.emit(
      new MakeHelpOfferStatusUpdateRequest({
        id: this.data.helpOfferId,
        newStatus: this.helpOfferStatus.REJECTED,
      })
    );
  }

  private getOneFullHelpOfferById(): void {
    this.eventBusService.emit(
      new MakeGetOneFullHelpOfferRequest({ id: this.data.helpOfferId })
    );
  }

  private subToSuccessHelpOfferGetFull(): void {
    this.eventBusService
      .on<FullHelpOfferType>(AppEventName.SUCCESS_GET_ONE_FULL_HELP_OFFER)
      .pipe(
        tap((fullHelpOffer) => this._fullHelpOffer$.next(fullHelpOffer)),
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
            throw new Error('Impossible!');
          }

          this._fullHelpOffer$.next({
            ...currentFullHelpOffer,
            status: payload.newStatus,
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private subToFailedHelpOfferStatusUpdate(): void {
    // TODO
    this.eventBusService
      .on(AppEventName.FAILED_HELP_OFFER_STATUS_UPDATE)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
