import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { Store, Select } from '@ngxs/store';
import { BehaviorSubject, tap, Observable } from 'rxjs';

import { ErrorNotificationService } from '../../services/error-notification.service';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';
import { CreateHelpOfferDto } from '../../../shared/dtos/create-help-offer.dto';
import { DateControlValueType } from '../../../shared/types/date-control-value.type';
import { ValidCreateHelpOfferFormValueType } from '../../../shared/types/create-help-offer-form-value.type';
import { ShortSubmitEventType } from '../../../shared/types/short-submit-event.type';
import {
  NORMAL_TITLE,
  LOADING_TITLE,
  SUCCESS_TITLE,
} from './create-help-offer-dialog.config';
import {
  PublishedHelpOffers,
  PublishedHelpOffersState,
} from '@store/published-help-offers';
import { AsyncData } from '@shared/classes/async-data.class';
import { PublishedHelpOffer } from '@shared/models/published-help-offer.model';

@Component({
  selector: 'app-create-help-offer-dialog',
  templateUrl: './create-help-offer-dialog.component.html',
  styleUrls: [
    './create-help-offer-dialog.component.scss',
    '../../../styles/shared/_create-help-offer-and-request-dialogs-styles.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateHelpOfferDialogComponent
  extends DialogComponent
  implements OnDestroy
{
  private readonly _dialogTitle$ = new BehaviorSubject<string>(NORMAL_TITLE);
  public readonly dialogTitle$ = this._dialogTitle$.asObservable();

  private readonly _store = inject(Store);

  @Select(PublishedHelpOffersState.createOne)
  private readonly createOneHelpOfferState$!: Observable<
    AsyncData<PublishedHelpOffer>
  >;

  protected readonly _createHelpOfferState$ =
    this.createOneHelpOfferState$.pipe(
      tap((state) => {
        if (state.loading) {
          this._dialogTitle$.next(LOADING_TITLE);
          this.createHelpOfferForm.disable();
        } else if (state.error !== null) {
          this._dialogTitle$.next(NORMAL_TITLE);
          this.createHelpOfferForm.enable();
          this._errorNotificationService.showMessage('error.createHelpOffer');
        } else if (state.value !== null) {
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
    allowedItemsConfirmation: [false, Validators.requiredTrue],
    noServiceResponsibilityConfirmation: [false, Validators.requiredTrue],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _errorNotificationService: ErrorNotificationService,
    dialogRef: DialogRef<void>
  ) {
    super(dialogRef);
  }

  public ngOnDestroy(): void {
    this._store.dispatch(new PublishedHelpOffers.DestroyCreateOne());
  }

  public handleCreateHelpOfferSubmit(event: ShortSubmitEventType): void {
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

    this._store.dispatch(
      new PublishedHelpOffers.CreateOne(
        new CreateHelpOfferDto(
          locations.from,
          locations.to,
          date.start,
          date.end,
          comment,
          fullName,
          phones
        )
      )
    );
  }
}
