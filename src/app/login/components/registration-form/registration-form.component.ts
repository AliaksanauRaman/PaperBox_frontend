import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

import { CustomValidators } from '../../../shared/classes/custom-validators.class';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  protected readonly _registrationForm = this._formBuilder.group(
    {
      email: ['', [Validators.required, CustomValidators.emailFormat]],
      password: ['', [Validators.required, CustomValidators.passwordFormat]],
      confirmPassword: ['', [Validators.required]],
      personalDataAgreementConfirmation: [false, [Validators.requiredTrue]],
    },
    { validators: [CustomValidators.passwordsMatch] }
  );

  constructor(private readonly _formBuilder: NonNullableFormBuilder) {}
}
