import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';
import { ManageHelpOfferDialogData } from '../../classes/manage-help-offer-dialog-data.class';
import { HelpOfferStatus } from '../../../shared/enums/help-offer-status.enum';

import { AdminOneFullHelpOfferService } from '../../services/admin-one-full-help-offer.service';
import { combineLatest, map } from 'rxjs';

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
  protected readonly helpOfferStatus = HelpOfferStatus;

  public readonly viewContext$ = combineLatest([
    this.oneFullHelpOfferService.fullHelpOffer$,
    this.oneFullHelpOfferService.getByIdInProgress$,
    this.oneFullHelpOfferService.getByIdError$,
    this.oneFullHelpOfferService.updateStatusInProgress$,
    this.oneFullHelpOfferService.updateStatusError$,
  ]).pipe(
    map(
      ([
        fullHelpOffer,
        getByIdInProgress,
        getByIdError,
        updateStatusInProgress,
        updateStatusError,
      ]) => ({
        fullHelpOffer,
        getByIdInProgress,
        getByIdError,
        updateStatusInProgress,
        updateStatusError,
      })
    )
  );

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly data: ManageHelpOfferDialogData,
    private readonly oneFullHelpOfferService: AdminOneFullHelpOfferService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.oneFullHelpOfferService.makeRequestToGetById(this.data.helpOfferId);
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
}
