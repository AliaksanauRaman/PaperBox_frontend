import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { InfoSnackBarComponent } from '../components/info-snack-bar/info-snack-bar.component';

const INFO_NOTIFICATION_DURATION = 9000; // In milliseconds

@Injectable({
  providedIn: 'root',
})
export class InfoNotificationService {
  constructor(private readonly _matSnackBar: MatSnackBar) {}

  public showMessage(messageTranslateKey: string): void {
    this._matSnackBar.openFromComponent(InfoSnackBarComponent, {
      panelClass: 'app-info-snack-bar',
      data: messageTranslateKey,
      duration: INFO_NOTIFICATION_DURATION,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
