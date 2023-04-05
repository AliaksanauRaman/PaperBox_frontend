import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

import { RoutingService } from '../../services/routing.service';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';

@Component({
  selector: 'app-login-or-signup-dialog',
  templateUrl: './login-or-signup-dialog.component.html',
  styleUrls: ['./login-or-signup-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginOrSignupDialogComponent extends DialogComponent {
  constructor(
    private readonly routingService: RoutingService,
    dialogRef: DialogRef<void>
  ) {
    super(dialogRef);
  }

  protected async handleLoginButtonClick(): Promise<void> {
    this.closeDialog();
    await this.routingService.navigateToLogin();
  }

  protected async handleSignupButtonClick(): Promise<void> {
    this.closeDialog();
    await this.routingService.navigateToSignup();
  }
}
