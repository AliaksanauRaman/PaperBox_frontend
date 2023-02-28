import { FormBuilder, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';

@Component({
  selector: 'app-create-help-request-dialog',
  templateUrl: './create-help-request-dialog.component.html',
  styleUrls: [
    './create-help-request-dialog.component.scss',
    '../find-and-offer-help-dialogs-common-styles.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateHelpRequestDialogComponent extends DialogComponent {
  protected readonly createHelpRequestForm = this.formBuilder.group({
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
    fullName: ['', [Validators.required]],
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
    console.log(JSON.stringify(this.createHelpRequestForm.getRawValue(), null, 2));
  }
}
