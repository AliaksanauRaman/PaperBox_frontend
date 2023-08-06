import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { WINDOW } from '../dependencies/window';
import { CreateFeedbackDialogComponent } from '../dialogs/create-feedback-dialog/create-feedback-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CreateFeedbackDialogService {
  private readonly _window = inject(WINDOW);
  private readonly _dialog = inject(Dialog);

  public openDialog(userEmail?: string): void {
    // The following trick is needed for recaptcha to be rendered well
    this._window.scrollTo(0, 0);
    this._dialog.open(CreateFeedbackDialogComponent, {
      // TODO: Move to constants
      panelClass: 'app-custom-dialog',
      data: !!userEmail ? { userEmail } : {},
    });
  }
}
