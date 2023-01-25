import { FormBuilder } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';

@Component({
  selector: 'app-find-help-dialog',
  templateUrl: './find-help-dialog.component.html',
  styleUrls: ['./find-help-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindHelpDialogComponent extends DialogComponent {
  protected readonly offerHelpForm = this.formBuilder.group({
    locations: [
      {
        from: '',
        to: '',
      },
    ],
    date: [
      {
        start: null,
        end: null,
      },
    ],
    comment: [''],
    fullName: [''],
    phones: [
      [
        {
          diallingCode: '',
          number: '',
        },
      ],
    ],
  });

  constructor(
    dialogRef: DialogRef<void>,
    private readonly formBuilder: FormBuilder
  ) {
    super(dialogRef);
  }

  public handleSendButtonClick(): void {
    // TODO: Temp
    console.log(JSON.stringify(this.offerHelpForm.getRawValue(), null, 2));
  }
}
