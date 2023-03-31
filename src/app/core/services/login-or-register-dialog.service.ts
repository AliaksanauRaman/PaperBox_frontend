import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { LoginOrRegisterDialogComponent } from '../dialogs/login-or-register-dialog/login-or-register-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class LoginOrRegisterDialogService {
  constructor(private readonly dialog: Dialog) {}

  public openDialog(): void {
    this.dialog.open(LoginOrRegisterDialogComponent, {
      // TODO: Move to constants
      panelClass: 'app-custom-dialog',
    });
  }
}
