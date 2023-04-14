import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { WarningSnackBarComponent } from '../components/warning-snack-bar/warning-snack-bar.component';

const WARNING_NOTIFICATION_DURATION = 6000; // In milliseconds

@Injectable({
  providedIn: 'root',
})
export class WarningNotificationService {
  constructor(private readonly _matSnackBar: MatSnackBar) {}

  public showMessage(messageTranslateKey: string): void {
    this._matSnackBar.openFromComponent(WarningSnackBarComponent, {
      panelClass: 'app-warning-snack-bar',
      data: messageTranslateKey,
      duration: WARNING_NOTIFICATION_DURATION,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
