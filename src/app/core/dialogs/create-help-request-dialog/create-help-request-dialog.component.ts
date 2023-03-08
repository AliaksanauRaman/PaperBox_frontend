import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { BehaviorSubject, tap } from 'rxjs';

import { CreateHelpRequestService } from '../../services/create-help-reqeust.service';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';
import { DateControlValueType } from '../../../shared/types/date-control-value.type';
import { ShortSubmitEventType } from '../../../shared/types/short-submit-event.type';
import { ValidCreateHelpRequestFormValueType } from '../../../shared/types/create-help-request-form-value.type';
import { CreateHelpRequestDto } from '../../../shared/dtos/create-help-request.dto';
import {
  NORMAL_TITLE,
  LOADING_TITLE,
  SUCCESS_TITLE,
} from './create-help-request.config';

@Component({
  selector: 'app-create-help-request-dialog',
  templateUrl: './create-help-request-dialog.component.html',
  styleUrls: [
    './create-help-request-dialog.component.scss',
    '../../../styles/shared/_create-help-offer-and-request-dialogs-styles.scss',
  ],
  providers: [CreateHelpRequestService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateHelpRequestDialogComponent
  extends DialogComponent
  implements OnDestroy
{
  // TODO: Think about moving this to base class
  private readonly _dialogTitle$ = new BehaviorSubject<string>(NORMAL_TITLE);
  public readonly dialogTitle$ = this._dialogTitle$.asObservable();

  public readonly createHelpRequestState$ =
    this.createHelpRequestService.state$.pipe(
      tap((state) => {
        if (state.inProgress) {
          this._dialogTitle$.next(LOADING_TITLE);
          this.createHelpRequestForm.disable();
        } else if (state.error !== null) {
          this._dialogTitle$.next(NORMAL_TITLE);
          this.createHelpRequestForm.enable();
        } else if (state.data !== null) {
          this._dialogTitle$.next(SUCCESS_TITLE);
        }
      })
    );
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
    private readonly createHelpRequestService: CreateHelpRequestService,
    dialogRef: DialogRef<void>
  ) {
    super(dialogRef);
  }

  public ngOnDestroy(): void {
    this.createHelpRequestService.destroyRequest();
  }

  public handleCreateHelpRequestSubmit(event: ShortSubmitEventType): void {
    if (!event.isTrusted) {
      console.log('Nice try');
      return;
    }

    if (this.createHelpRequestForm.invalid) {
      return;
    }

    this.createHelpRequest(
      // We can type cas here ONLY because the form is valid
      this.createHelpRequestForm.getRawValue() as ValidCreateHelpRequestFormValueType
    );
  }

  private createHelpRequest(
    validFormValue: ValidCreateHelpRequestFormValueType
  ): void {
    const { locations, date, comment, fullName, phones } = validFormValue;

    this.createHelpRequestService.performRequest(
      new CreateHelpRequestDto(
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
