import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { tap, BehaviorSubject } from 'rxjs';

import { CreateFeedbackService } from '../../services/create-feedback.service';

import { CustomValidators } from '../../../shared/classes/custom-validators.class';
import { CreateFeedbackDto } from '../../../shared/dtos/create-feedback.dto';
import { ValidCreateFeedbackFormValueType } from '../../../shared/types/create-feedback-form-value.type';

const NORMAL_TITLE = 'dialogs.createFeedback.title';
const LOADING_TITLE = 'dialogs.createFeedback.loading';
const SUCCESS_TITLE = 'dialogs.createFeedback.success';

@Component({
  selector: 'app-create-feedback-dialog',
  templateUrl: './create-feedback-dialog.component.html',
  styleUrls: ['./create-feedback-dialog.component.scss'],
  providers: [CreateFeedbackService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFeedbackDialogComponent implements OnDestroy {
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
      } else if (state.data !== null) {
        this._dialogTitle$.next(SUCCESS_TITLE);
      }
    })
  );

  public readonly createFeedbackForm = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, CustomValidators.email]],
    comment: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private readonly dialogRef: DialogRef<void>,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly createFeedbackService: CreateFeedbackService
  ) {}

  public ngOnDestroy(): void {
    this.createFeedbackService.destroyRequest();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public handleCreateFeedbackSubmit(event: SubmitEvent): void {
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
