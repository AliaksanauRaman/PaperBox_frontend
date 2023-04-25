import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';
import { ConfirmDialogDataType } from '../../../shared/types/confirm-dialog-data.type';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent extends DialogComponent<boolean> {
  constructor(
    @Inject(DIALOG_DATA)
    protected readonly _dialogData: ConfirmDialogDataType,
    dialogRef: DialogRef<boolean>
  ) {
    super(dialogRef);
  }
}
