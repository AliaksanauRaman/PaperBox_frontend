import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { BehaviorSubject, tap } from 'rxjs';

import { CreateHelpOfferService } from '../../services/create-help-offer.service';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';
import { CreateHelpOfferDto } from '../../../shared/dtos/create-help-offer.dto';
import { DateControlValueType } from '../../../shared/types/date-control-value.type';
import { ValidCreateHelpOfferFormValueType } from '../../../shared/types/create-help-offer-form-value.type';

const NORMAL_TITLE = 'dialogs.offerHelp.title';
const LOADING_TITLE = 'dialogs.offerHelp.loading';
const SUCCESS_TITLE = 'dialogs.offerHelp.success';

@Component({
  selector: 'app-create-help-offer-dialog',
  templateUrl: './create-help-offer-dialog.component.html',
  styleUrls: [
    './create-help-offer-dialog.component.scss',
    '../../../styles/shared/_create-help-offer-and-request-dialogs-styles.scss',
  ],
  providers: [CreateHelpOfferService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateHelpOfferDialogComponent extends DialogComponent {
  private readonly _dialogTitle$ = new BehaviorSubject<string>(NORMAL_TITLE);
  public readonly dialogTitle$ = this._dialogTitle$.asObservable();

  public readonly createHelpOfferState$ =
    this.createHelpOfferService.state$.pipe(
      tap((state) => {
        if (state.inProgress) {
          this._dialogTitle$.next(LOADING_TITLE);
          this.createHelpOfferForm.disable();
        } else if (state.error !== null) {
          this._dialogTitle$.next(NORMAL_TITLE);
          this.createHelpOfferForm.enable();
        } else if (state.data !== null) {
          this._dialogTitle$.next(SUCCESS_TITLE);
        }
      })
    );

  protected readonly createHelpOfferForm = this.formBuilder.group({
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
      } as DateControlValueType,
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
    private readonly formBuilder: FormBuilder,
    private readonly createHelpOfferService: CreateHelpOfferService
  ) {
    super(dialogRef);
  }

  public handleCreateHelpOfferSubmit(event: SubmitEvent): void {
    if (!event.isTrusted) {
      console.log('Nice try');
      return;
    }

    if (this.createHelpOfferForm.invalid) {
      return;
    }

    this.createHelpOffer(
      // We can type cas here ONLY because the form is valid
      this.createHelpOfferForm.getRawValue() as ValidCreateHelpOfferFormValueType
    );
  }

  private createHelpOffer(
    validFormValue: ValidCreateHelpOfferFormValueType
  ): void {
    const { locations, date, comment, fullName, phones } = validFormValue;

    this.createHelpOfferService.performRequest(
      new CreateHelpOfferDto(
        locations.from,
        locations.to,
        date.start,
        date.end,
        comment,
        fullName,
        phones
      )
    );
  }
}
