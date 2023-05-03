import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Observable, map } from 'rxjs';

import { ConfirmApplicationDeletionDialogComponent } from '../dialogs/confirm-application-deletion-dialog/confirm-application-deletion-dialog.component';

import { CUSTOM_DIALOG_PANEL_CLASS } from '../../shared/constants/custom-dialog-panel-class';

@Injectable({
  providedIn: 'root',
})
export class ConfirmApplicationDeletionDialogService {
  constructor(private readonly _dialog: Dialog) {}

  public openDialog(): Observable<boolean> {
    return this._dialog
      .open<boolean>(ConfirmApplicationDeletionDialogComponent, {
        panelClass: CUSTOM_DIALOG_PANEL_CLASS,
        disableClose: true,
      })
      .closed.pipe(
        map((dialogResult) => {
          if (dialogResult === undefined) {
            throw new Error('Dialog result cannot be undefined!');
          }

          return dialogResult;
        })
      );
  }
}
