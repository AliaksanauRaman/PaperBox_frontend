import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { Store, Select } from '@ngxs/store';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { ErrorNotificationService } from '../../services/error-notification.service';

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
import { AsyncData } from '@shared/classes/async-data.class';
import { PublishedHelpRequest } from '@shared/models/published-help-request.model';
import {
  CreateOneApplication,
  CreateOneApplicationState,
  DestroyCreateOneApplication,
} from '@store/create-one-application';

@Component({
  selector: 'app-create-help-request-dialog',
  templateUrl: './create-help-request-dialog.component.html',
  styleUrls: [
    './create-help-request-dialog.component.scss',
    '../../../styles/shared/_create-help-offer-and-request-dialogs-styles.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateHelpRequestDialogComponent
  extends DialogComponent
  implements OnDestroy
{
  // TODO: Think about moving this to base class
  private readonly _dialogTitle$ = new BehaviorSubject<string>(NORMAL_TITLE);
  public readonly dialogTitle$ = this._dialogTitle$.asObservable();

  private readonly _store = inject(Store);

  @Select(CreateOneApplicationState.stream)
  private readonly createOneApplicationState$!: Observable<
    AsyncData<PublishedHelpRequest>
  >;

  public readonly createHelpRequestState$ =
    this.createOneApplicationState$.pipe(
      tap((state) => {
        if (state.loading) {
          this._dialogTitle$.next(LOADING_TITLE);
          this.createHelpRequestForm.disable();
        } else if (state.error !== null) {
          this._dialogTitle$.next(NORMAL_TITLE);
          this.createHelpRequestForm.enable();
          this._errorNotificationService.showMessage('error.createHelpRequest');
        } else if (state.value !== null) {
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
    private readonly _errorNotificationService: ErrorNotificationService,
    dialogRef: DialogRef<void>
  ) {
    super(dialogRef);
  }

  public ngOnDestroy(): void {
    this._store.dispatch(new DestroyCreateOneApplication());
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

    this._store.dispatch(
      new CreateOneApplication(
        new CreateHelpRequestDto(
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
