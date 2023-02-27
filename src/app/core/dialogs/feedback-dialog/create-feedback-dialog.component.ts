import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { tap } from 'rxjs';

import { CreateFeedbackService } from '../../services/create-feedback.service';

import { CreateFeedbackDto } from '../../../shared/dtos/create-feedback.dto';

type SendEventType = Readonly<{
  isTrusted: boolean;
}>;

@Component({
  selector: 'app-create-feedback-dialog',
  templateUrl: './create-feedback-dialog.component.html',
  styleUrls: ['./create-feedback-dialog.component.scss'],
  providers: [CreateFeedbackService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFeedbackDialogComponent {
  public readonly createFeedbackState$ = this.createFeedbackService.state$.pipe(
    tap((state) => {
      if (state.inProgress) {
        this.createFeedbackForm.disable();
      } else {
        this.createFeedbackForm.enable();
      }
    })
  );

  public readonly createFeedbackForm = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    comment: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private readonly dialogRef: DialogRef<void>,
    private readonly formBuilder: FormBuilder,
    private readonly createFeedbackService: CreateFeedbackService
  ) {}

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public handleSendButtonClick(event: SendEventType): void {
    if (!event.isTrusted) {
      console.log('Nice try.');
      return;
    }

    // TODO: as
    const { fullName, email, comment } = this.createFeedbackForm.getRawValue();
    this.createFeedbackService.performRequest(
      new CreateFeedbackDto(
        fullName as string,
        email as string,
        comment as string
      )
    );
  }
}
