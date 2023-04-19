import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dialog } from '@angular/cdk/dialog';

import { InfoSnackBarComponent } from '../components/info-snack-bar/info-snack-bar.component';
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component';

const INFO_NOTIFICATION_DURATION = 9000; // In milliseconds

@Injectable({
  providedIn: 'root',
})
export class InfoNotificationService {
  constructor(
    private readonly _matSnackBar: MatSnackBar,
    private readonly _dialog: Dialog
  ) {}

  public showMessage(messageTranslateKey: string): void {
    this._matSnackBar.openFromComponent(InfoSnackBarComponent, {
      panelClass: 'app-info-snack-bar',
      data: messageTranslateKey,
      duration: INFO_NOTIFICATION_DURATION,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  public showImportantMessage(messageTranslateKey: string): void {
    this._dialog.open(InfoDialogComponent, {
      // TODO: Move to constants
      panelClass: 'app-custom-dialog',
      data: messageTranslateKey,
      disableClose: true,
    });
  }
}
