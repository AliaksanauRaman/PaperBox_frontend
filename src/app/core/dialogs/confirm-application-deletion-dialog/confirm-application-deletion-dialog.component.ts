import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';

@Component({
  selector: 'app-confirm-application-deletion-dialog',
  templateUrl: './confirm-application-deletion-dialog.component.html',
  styleUrls: ['./confirm-application-deletion-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmApplicationDeletionDialogComponent extends DialogComponent<boolean> {
  constructor(dialogRef: DialogRef<boolean>) {
    super(dialogRef);
  }
}
