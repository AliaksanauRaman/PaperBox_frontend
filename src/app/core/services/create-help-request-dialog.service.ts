import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { CreateHelpRequestDialogComponent } from '../dialogs/create-help-request-dialog/create-help-request-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CreateHelpRequestDialogService {
  constructor(private readonly dialog: Dialog) {}

  public openDialog(): void {
    this.dialog.open(CreateHelpRequestDialogComponent, {
      // TODO: Move to constants
      panelClass: 'app-custom-dialog',
    });
  }
}
