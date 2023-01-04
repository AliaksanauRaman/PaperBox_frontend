import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  BehaviorSubject,
  delay,
  of,
  timer,
  tap,
  take,
  combineLatest,
  map,
  takeUntil,
} from 'rxjs';

import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';
import { ManageHelpOfferDialogData } from '../../classes/manage-help-offer-dialog-data.class';
import { HelpOfferStatus } from '../../../shared/enums/help-offer-status.enum';

import { AdminOneFullHelpOfferService } from '../../services/admin-one-full-help-offer.service';

@Component({
  selector: 'app-admin-manage-help-offer-dialog',
  templateUrl: './admin-manage-help-offer-dialog.component.html',
  styleUrls: ['./admin-manage-help-offer-dialog.component.scss'],
  providers: [AdminOneFullHelpOfferService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminManageHelpOfferDialogComponent
  extends DestroyEmitter
  implements OnInit
{
  public readonly viewContext$ = combineLatest([
    this.oneFullHelpOfferService.fullHelpOffer$,
    this.oneFullHelpOfferService.getByIdInProgress$,
    this.oneFullHelpOfferService.getByIdError$,
    this.oneFullHelpOfferService.updateStatusInProgress$,
    this.oneFullHelpOfferService.updateStatusError$,
    this.oneFullHelpOfferService.deleteByIdInProgress$,
    this.oneFullHelpOfferService.deleteByIdError$,
    this.oneFullHelpOfferService.deleted$,
  ]).pipe(
    map(
      ([
        fullHelpOffer,
        getByIdInProgress,
        getByIdError,
        updateStatusInProgress,
        updateStatusError,
        deleteByIdInProgress,
        deleteByIdError,
        deleted,
      ]) => ({
        fullHelpOffer,
        getByIdInProgress,
        getByIdError,
        updateStatusInProgress,
        updateStatusError,
        deleteByIdInProgress,
        deleteByIdError,
        deleted,
      })
    )
  );

  protected readonly helpOfferStatus = HelpOfferStatus;
  protected readonly deleteButtonEnabled$ = of(true).pipe(delay(3000));

  // TODO: Refactor, move to a separate service
  protected readonly spinnerLength$ = new BehaviorSubject(100);
  private myTimer = timer(0, 3000 / 100)
    .pipe(
      tap(() => this.spinnerLength$.next(this.spinnerLength$.getValue() - 1)),
      take(100),
      takeUntil(this.destroy$)
    )
    .subscribe();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly data: ManageHelpOfferDialogData,
    private readonly dialogRef: MatDialogRef<AdminManageHelpOfferDialogComponent>,
    private readonly oneFullHelpOfferService: AdminOneFullHelpOfferService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.oneFullHelpOfferService.makeRequestToGetById(this.data.helpOfferId);
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  protected handlePublishButtonClick(): void {
    this.oneFullHelpOfferService.makeRequestToUpdateStatus(
      this.data.helpOfferId,
      this.helpOfferStatus.PUBLISHED
    );
  }

  protected handleUnpublishButtonClick(): void {
    this.oneFullHelpOfferService.makeRequestToUpdateStatus(
      this.data.helpOfferId,
      this.helpOfferStatus.UNPUBLISHED
    );
  }

  protected handleRejectButtonClick(): void {
    this.oneFullHelpOfferService.makeRequestToUpdateStatus(
      this.data.helpOfferId,
      this.helpOfferStatus.REJECTED
    );
  }

  protected handleDeleteButtonClick(): void {
    this.oneFullHelpOfferService.makeRequestToDeleteById(this.data.helpOfferId);
  }
}
