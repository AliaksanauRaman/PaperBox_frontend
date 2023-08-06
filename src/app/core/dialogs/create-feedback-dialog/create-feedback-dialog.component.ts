import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { tap, BehaviorSubject } from 'rxjs';

import { CreateFeedbackService } from '../../services/create-feedback.service';
import { ErrorNotificationService } from '../../services/error-notification.service';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';
import { CustomValidators } from '../../../shared/classes/custom-validators.class';
import { CreateFeedbackDto } from '../../../shared/dtos/create-feedback.dto';
import { ValidCreateFeedbackFormValueType } from '../../../shared/types/create-feedback-form-value.type';
import { ShortSubmitEventType } from '../../../shared/types/short-submit-event.type';
import { NORMAL_TITLE, LOADING_TITLE } from './create-feedback-dialog.config';

type CreateFeedbackDialogDataType = Readonly<{
  userEmail?: string;
}>;

@Component({
  selector: 'app-create-feedback-dialog',
  templateUrl: './create-feedback-dialog.component.html',
  styleUrls: ['./create-feedback-dialog.component.scss'],
  providers: [CreateFeedbackService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFeedbackDialogComponent
  extends DialogComponent
  implements OnInit, OnDestroy
{
  private readonly _dialogTitle$ = new BehaviorSubject<string>(NORMAL_TITLE);
  protected readonly dialogTitle$ = this._dialogTitle$.asObservable();

  protected readonly createFeedbackState$ =
    this._createFeedbackService.state$.pipe(
      tap((state) => {
        if (state.inProgress) {
          this._dialogTitle$.next(LOADING_TITLE);
          this._createFeedbackForm.disable();
        } else if (state.error !== null) {
          this._dialogTitle$.next(NORMAL_TITLE);
          this._createFeedbackForm.enable();
          this._errorNotificationService.showMessage('error.createFeedback');
        } else if (state.data !== null) {
          // Do something on success..
        }
      })
    );

  protected readonly _createFeedbackForm = this._formBuilder.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, CustomValidators.emailFormat]],
    comment: ['', [Validators.required, Validators.minLength(10)]],
    recaptcha: ['', [Validators.required]],
  });

  constructor(
    private readonly _formBuilder: NonNullableFormBuilder,
    private readonly _createFeedbackService: CreateFeedbackService,
    private readonly _errorNotificationService: ErrorNotificationService,
    @Inject(DIALOG_DATA)
    private readonly _dialogData: CreateFeedbackDialogDataType,
    dialogRef: DialogRef<void>
  ) {
    super(dialogRef);
  }

  public ngOnInit(): void {
    this.setFormInitialValues();
  }

  public ngOnDestroy(): void {
    this._createFeedbackService.destroyRequest();
  }

  protected handleCreateFeedbackSubmit(event: ShortSubmitEventType): void {
    if (!event.isTrusted) {
      console.log('Nice try');
      return;
    }

    if (this._createFeedbackForm.invalid) {
      return;
    }

    this.createFeedback(this._createFeedbackForm.getRawValue());
  }

  private setFormInitialValues(): void {
    const userEmail = this._dialogData.userEmail;

    if (userEmail !== undefined) {
      this._createFeedbackForm.patchValue({
        email: userEmail,
      });
    }
  }

  private createFeedback(
    validFormValue: ValidCreateFeedbackFormValueType
  ): void {
    const { fullName, email, comment } = validFormValue;

    this._createFeedbackService.performRequest(
      new CreateFeedbackDto(fullName, email, comment)
    );
  }
}
