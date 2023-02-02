import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, Validators } from '@angular/forms';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';

@Component({
  selector: 'app-offer-help-dialog',
  templateUrl: './offer-help-dialog.component.html',
  styleUrls: ['./offer-help-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferHelpDialogComponent extends DialogComponent {
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
    console.log(JSON.stringify(this.offerHelpForm.getRawValue(), null, 2));
  }
}
