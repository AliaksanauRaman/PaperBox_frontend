import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Observable, map } from 'rxjs';

import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

import { ConfirmDialogDataType } from '../../shared/types/confirm-dialog-data.type';
import { CUSTOM_DIALOG_PANEL_CLASS } from '../../shared/constants/custom-dialog-panel-class';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private readonly _dialog: Dialog) {}

  public openDialog(data: ConfirmDialogDataType = {}): Observable<boolean> {
    return this._dialog
      .open<boolean>(ConfirmDialogComponent, {
        panelClass: CUSTOM_DIALOG_PANEL_CLASS,
        disableClose: true,
        data,
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
