import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-offer-help-dialog',
  templateUrl: './offer-help-dialog.component.html',
  styleUrls: ['./offer-help-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferHelpDialogComponent {
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
    private readonly dialogRef: DialogRef<void>,
    private readonly formBuilder: FormBuilder
  ) {}

  // TODO: Abstract class
  public closeDialog(): void {
    this.dialogRef.close();
  }

  public handleSendButtonClick(): void {
    // TODO: Temp
    console.log(JSON.stringify(this.offerHelpForm.getRawValue(), null, 2));
  }
}
