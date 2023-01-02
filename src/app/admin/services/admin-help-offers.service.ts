import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AdminManageHelpOfferDialogComponent } from '../dialogs/admin-manage-help-offer-dialog/admin-manage-help-offer-dialog.component';

import { ManageHelpOfferDialogData } from '../classes/manage-help-offer-dialog-data.class';

@Injectable()
export class AdminHelpOffersService {
  constructor(
    private readonly matDialog: MatDialog
  ) {}

  public openManageHelpOfferDialog(helpOfferId: string): void {
    this.matDialog.open<
      AdminManageHelpOfferDialogComponent,
      ManageHelpOfferDialogData
    >(AdminManageHelpOfferDialogComponent, {
      data: new ManageHelpOfferDialogData(helpOfferId),
      // TODO: Sizes
      width: '600px',
      height: '600px',
    });
  }
}
