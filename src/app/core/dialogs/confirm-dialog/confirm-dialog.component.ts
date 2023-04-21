import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  TemplateRef,
} from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';

type ConfirmDialogDataType = Readonly<{
  content?: TemplateRef<unknown>;
}>;

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent extends DialogComponent {
  constructor(
    @Inject(DIALOG_DATA)
    protected readonly _dialogData: ConfirmDialogDataType,
    dialogRef: DialogRef<void>
  ) {
    super(dialogRef);
  }
}
