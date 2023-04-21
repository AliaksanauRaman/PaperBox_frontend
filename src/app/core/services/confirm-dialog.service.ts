import { Injectable, TemplateRef } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

import { CUSTOM_DIALOG_PANEL_CLASS } from '../../shared/constants/custom-dialog-panel-class';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private readonly _dialog: Dialog) {}

  public openDialog(content?: TemplateRef<unknown>): void {
    this._dialog.open(ConfirmDialogComponent, {
      panelClass: CUSTOM_DIALOG_PANEL_CLASS,
      disableClose: true,
      data: content !== undefined ? { content } : {},
    });
  }
}
