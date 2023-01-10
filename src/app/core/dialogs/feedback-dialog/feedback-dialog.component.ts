import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackDialogComponent {
  constructor(
    private readonly dialogRef: DialogRef<void>,
  ) {}

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
