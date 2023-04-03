import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { tap, BehaviorSubject } from 'rxjs';

import { CreateFeedbackService } from '../../services/create-feedback.service';
import { ErrorNotificationService } from '../../services/error-notification.service';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';
import { CustomValidators } from '../../../shared/classes/custom-validators.class';
import { CreateFeedbackDto } from '../../../shared/dtos/create-feedback.dto';
import { ValidCreateFeedbackFormValueType } from '../../../shared/types/create-feedback-form-value.type';
import { ShortSubmitEventType } from '../../../shared/types/short-submit-event.type';
import {
  NORMAL_TITLE,
  LOADING_TITLE,
  SUCCESS_TITLE,
} from './create-feedback-dialog.config';

@Component({
  selector: 'app-create-feedback-dialog',
  templateUrl: './create-feedback-dialog.component.html',
  styleUrls: ['./create-feedback-dialog.component.scss'],
  providers: [CreateFeedbackService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFeedbackDialogComponent
  extends DialogComponent
  implements OnDestroy
{
  private readonly _dialogTitle$ = new BehaviorSubject<string>(NORMAL_TITLE);
  public readonly dialogTitle$ = this._dialogTitle$.asObservable();

  public readonly createFeedbackState$ = this.createFeedbackService.state$.pipe(
    tap((state) => {
      if (state.inProgress) {
        this._dialogTitle$.next(LOADING_TITLE);
        this.createFeedbackForm.disable();
      } else if (state.error !== null) {
        this._dialogTitle$.next(NORMAL_TITLE);
        this.createFeedbackForm.enable();
        this._errorNotificationService.showMessage('error.createFeedback');
      } else if (state.data !== null) {
        this._dialogTitle$.next(SUCCESS_TITLE);
      }
    })
  );

  public readonly createFeedbackForm = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, CustomValidators.emailFormat]],
    comment: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly createFeedbackService: CreateFeedbackService,
    private readonly _errorNotificationService: ErrorNotificationService,
    dialogRef: DialogRef<void>
  ) {
    super(dialogRef);
  }

  public ngOnDestroy(): void {
    this.createFeedbackService.destroyRequest();
  }

  public handleCreateFeedbackSubmit(event: ShortSubmitEventType): void {
    if (!event.isTrusted) {
      console.log('Nice try');
      return;
    }

    if (this.createFeedbackForm.invalid) {
      return;
    }

    this.createFeedback(this.createFeedbackForm.getRawValue());
  }

  private createFeedback(
    validFormValue: ValidCreateFeedbackFormValueType
  ): void {
    const { fullName, email, comment } = validFormValue;

    this.createFeedbackService.performRequest(
      new CreateFeedbackDto(fullName, email, comment)
    );
  }
}
