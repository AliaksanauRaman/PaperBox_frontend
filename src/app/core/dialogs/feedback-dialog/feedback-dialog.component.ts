import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackDialogComponent {
  public readonly feedbackForm = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    comment: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private readonly dialogRef: DialogRef<void>,
    private readonly formBuilder: FormBuilder
  ) {}

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
