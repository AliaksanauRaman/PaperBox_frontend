import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

import { emailValidator } from '../validators/email.validator';
import { passwordsMatchValidator } from '../validators/passwords-match.validator';

export class CustomValidators {
  public static email(
    control: AbstractControl<string>
  ): ValidationErrors | null {
    return emailValidator(control);
  }

  public static passwordsMatch(
    control: AbstractControl
  ): ValidationErrors | null {
    return passwordsMatchValidator(control);
  }
}
