import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

import { CustomValidators } from '../../../shared/classes/custom-validators.class';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  protected readonly loginForm = this._formBuilder.group({
    email: ['', [Validators.required, CustomValidators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private readonly _formBuilder: NonNullableFormBuilder) {}

  protected handleLoginSubmit(event: SubmitEvent): void {
    if (!event.isTrusted) {
      console.log('Nice try');
      return;
    }

    if (this.loginForm.invalid) {
      throw new Error('Login form is invalid!');
    }

    // TODO: !IMPORTANT Make http request
  }
}
