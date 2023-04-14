import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';

import { LoginService } from '../../../shared/services/login.service';
import { SuccessLoginHandlerService } from '../../services/success-login-handler.service';
import { ErrorNotificationService } from '../../../core/services/error-notification.service';
import { LoginErrorFactory } from '../../factories/login-error.factory';

import { CustomValidators } from '../../../shared/classes/custom-validators.class';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [LoginService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  protected readonly _loginRequestState$ = this._loginService.state$.pipe(
    tap((state) => {
      if (state.inProgress) {
        this._loginForm.disable();
      } else if (state.data !== null) {
        this._successLoginHandlerService.handle(state.data);
      } else if (state.error !== null) {
        this._loginForm.enable();
        const loginError = this._loginErrorFactory.build(state.error);
        this._errorNotificationService.showMessage(loginError.message);
      }
    })
  );
  protected readonly _loginForm = this._formBuilder.group({
    email: ['', [Validators.required, CustomValidators.emailFormat]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly _formBuilder: NonNullableFormBuilder,
    private readonly _loginService: LoginService,
    private readonly _successLoginHandlerService: SuccessLoginHandlerService,
    private readonly _errorNotificationService: ErrorNotificationService,
    private readonly _loginErrorFactory: LoginErrorFactory
  ) {}

  protected handleLoginSubmit(event: SubmitEvent): void {
    if (!event.isTrusted) {
      console.log('Nice try');
      return;
    }

    if (this._loginForm.invalid) {
      throw new Error('Login form is invalid!');
    }

    this._loginService.performRequest(this._loginForm.getRawValue());
  }
}
