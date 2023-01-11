import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { OfferHelpDialogComponent } from '../dialogs/offer-help-dialog/offer-help-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class OfferHelpDialogService {
  constructor(private readonly dialog: Dialog) {}

  public openDialog(): void {
    this.dialog.open(OfferHelpDialogComponent, {
      // TODO: Move to constants
      panelClass: 'app-custom-dialog',
    });
  }
}
