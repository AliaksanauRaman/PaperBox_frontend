import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { CreateHelpOfferDialogComponent } from '../dialogs/create-help-offer-dialog/create-help-offer-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CreateHelpOfferDialogService {
  constructor(private readonly dialog: Dialog) {}

  public openDialog(): void {
    this.dialog.open(CreateHelpOfferDialogComponent, {
      // TODO: Move to constants
      panelClass: 'app-custom-dialog',
    });
  }
}
