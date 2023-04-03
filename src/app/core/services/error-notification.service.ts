import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ErrorSnackBarComponent } from '../components/error-snack-bar/error-snack-bar.component';

const ERROR_NOTIFICATION_DURATION = 9000; // In milliseconds

@Injectable({
  providedIn: 'root',
})
export class ErrorNotificationService {
  constructor(private readonly _matSnackBar: MatSnackBar) {}

  public showMessage(messageTranslateKey: string): void {
    this._matSnackBar.openFromComponent(ErrorSnackBarComponent, {
      panelClass: 'app-error-snack-bar',
      data: messageTranslateKey,
      duration: ERROR_NOTIFICATION_DURATION,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
