import { AbstractControl, ValidationErrors } from '@angular/forms';

import { emailFormatValidator } from '../validators/email-format.validator';
import { passwordFormatValidator } from '../validators/password-format.validator';
import { passwordsMatchValidator } from '../validators/passwords-match.validator';

export class CustomValidators {
  public static emailFormat(
    control: AbstractControl<string>
  ): ValidationErrors | null {
    return emailFormatValidator(control);
  }

  public static passwordFormat(
    control: AbstractControl<string>
  ): ValidationErrors | null {
    return passwordFormatValidator(control);
  }

  public static passwordsMatch(
    control: AbstractControl
  ): ValidationErrors | null {
    return passwordsMatchValidator(control);
  }
}
