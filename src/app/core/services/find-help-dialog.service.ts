import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { FindHelpDialogComponent } from '../dialogs/find-help-dialog/find-help-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class FindHelpDialogService {
  constructor(private readonly dialog: Dialog) {}

  public openDialog(): void {
    this.dialog.open(FindHelpDialogComponent, {
      // TODO: Move to constants
      panelClass: 'app-custom-dialog',
    });
  }
}
