import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoDialogComponent extends DialogComponent {
  protected readonly _clearCheckbox = new FormControl(
    false,
    Validators.requiredTrue
  );

  constructor(
    @Inject(DIALOG_DATA)
    protected readonly _infoMessageTranslateKey: string,
    dialogRef: DialogRef<void>
  ) {
    super(dialogRef);
  }
}
