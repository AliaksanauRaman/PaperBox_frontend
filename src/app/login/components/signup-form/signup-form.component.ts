import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

import { CustomValidators } from '../../../shared/classes/custom-validators.class';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent {
  protected readonly _signupForm = this._formBuilder.group(
    {
      email: ['', [Validators.required, CustomValidators.emailFormat]],
      password: ['', [Validators.required, CustomValidators.passwordFormat]],
      confirmPassword: ['', [Validators.required]],
      personalDataAgreementConfirmation: [false, [Validators.requiredTrue]],
    },
    { validators: [CustomValidators.passwordsMatch] }
  );

  constructor(private readonly _formBuilder: NonNullableFormBuilder) {}

  protected handleSignupSubmit(event: SubmitEvent): void {
    if (!event.isTrusted) {
      console.log('Nice try');
      return;
    }

    if (this._signupForm.invalid) {
      throw new Error('Signup form is invalid!');
    }

    // TODO: !IMPORTANT Make http request
  }
}
