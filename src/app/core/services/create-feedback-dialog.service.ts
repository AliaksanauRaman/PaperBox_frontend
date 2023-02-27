import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { FeedbackDialogComponent } from '../dialogs/feedback-dialog/feedback-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CreateFeedbackDialogService {
  constructor(private readonly dialog: Dialog) {}

  public openDialog(): void {
    this.dialog.open(FeedbackDialogComponent, {
      // TODO: Move to constants
      panelClass: 'app-custom-dialog',
    });
  }
}
