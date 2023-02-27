import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { CreateFeedbackDialogComponent } from '../dialogs/feedback-dialog/create-feedback-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CreateFeedbackDialogService {
  constructor(private readonly dialog: Dialog) {}

  public openDialog(): void {
    this.dialog.open(CreateFeedbackDialogComponent, {
      // TODO: Move to constants
      panelClass: 'app-custom-dialog',
    });
  }
}
