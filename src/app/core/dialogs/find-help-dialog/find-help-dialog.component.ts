import { FormBuilder, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';

@Component({
  selector: 'app-find-help-dialog',
  templateUrl: './find-help-dialog.component.html',
  styleUrls: [
    './find-help-dialog.component.scss',
    '../find-and-offer-help-dialogs-common-styles.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindHelpDialogComponent extends DialogComponent {
  protected readonly findHelpForm = this.formBuilder.group({
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
    console.log(JSON.stringify(this.findHelpForm.getRawValue(), null, 2));
  }
}
