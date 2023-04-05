import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

import { RoutingService } from '../../services/routing.service';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';

@Component({
  selector: 'app-login-or-register-dialog',
  templateUrl: './login-or-register-dialog.component.html',
  styleUrls: ['./login-or-register-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginOrRegisterDialogComponent extends DialogComponent {
  constructor(
    private readonly routingService: RoutingService,
    dialogRef: DialogRef<void>
  ) {
    super(dialogRef);
  }

  protected async handleLoginButtonClick(): Promise<void> {
    this.closeDialog();
    await this.routingService.navigateToLogIn();
  }

  protected async handleRegistrationButtonClick(): Promise<void> {
    this.closeDialog();
    await this.routingService.navigateToSignUp();
  }
}
