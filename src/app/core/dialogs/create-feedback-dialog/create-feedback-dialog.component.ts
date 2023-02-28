import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { tap, BehaviorSubject } from 'rxjs';

import { CreateFeedbackService } from '../../services/create-feedback.service';
import { CreateFeedbackDialogService } from '../../services/create-feedback-dialog.service';

import { CustomValidators } from '../../../shared/classes/custom-validators.class';
import { CreateFeedbackDto } from '../../../shared/dtos/create-feedback.dto';

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
  @HostListener('document:keydown.enter', ['$event'])
  private handleEnterPress(event: KeyboardEvent): void {
    event.stopImmediatePropagation();

    if (!event.isTrusted) {
      console.log('Nice try');
      return;
    }

    if (this.createFeedbackForm.invalid) {
      return;
    }

    this.createFeedback();
  }

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
    private readonly formBuilder: FormBuilder,
    private readonly createFeedbackService: CreateFeedbackService,
    private readonly createFeedbackDialogService: CreateFeedbackDialogService
  ) {}

  public ngOnDestroy(): void {
    this.createFeedbackService.destroyRequest();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public handleSendButtonClick(event: MouseEvent): void {
    if (!event.isTrusted) {
      console.log('Nice try');
      return;
    }

    this.createFeedback();
  }

  private createFeedback(): void {
    const formValue = this.createFeedbackForm.getRawValue();

    if (!this.createFeedbackDialogService.isFormValueValid(formValue)) {
      throw new Error('Create feedback form value is invalid!');
    }

    this.createFeedbackService.performRequest(
      new CreateFeedbackDto(
        formValue.fullName,
        formValue.email,
        formValue.comment
      )
    );
  }
}
