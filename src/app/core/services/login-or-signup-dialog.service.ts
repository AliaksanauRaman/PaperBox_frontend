import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { LoginOrSignupDialogComponent } from '../dialogs/login-or-signup-dialog/login-or-signup-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class LoginOrSignupDialogService {
  constructor(private readonly dialog: Dialog) {}

  public openDialog(): void {
    this.dialog.open(LoginOrSignupDialogComponent, {
      // TODO: Move to constants
      panelClass: 'app-custom-dialog',
    });
  }
}
