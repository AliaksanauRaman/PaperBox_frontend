import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, Validators } from '@angular/forms';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';

@Component({
  selector: 'app-offer-help-dialog',
  templateUrl: './offer-help-dialog.component.html',
  styleUrls: [
    './offer-help-dialog.component.scss',
    '../find-and-offer-help-dialogs-common-styles.scss',
  ],
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
    const result = this.offerHelpForm.getRawValue();
    console.log(JSON.stringify(result, null, 2));
    console.log(result);

    const mappedResult = {
      locationFrom: result.locations?.from,
      locationTo: result.locations?.to,
      startDate: result.date?.start,
      endDate: result.date?.end,
      comment: result.comment,
      fullName: result.fullName,
      phones: result.phones,
    };

    console.log({ MAPPED: mappedResult });
  }
}
