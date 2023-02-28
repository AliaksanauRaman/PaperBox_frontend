import { AbstractControl, ValidationErrors } from '@angular/forms';

import { emailValidator } from './../validators/email.validator';

export class CustomValidators {
  public static email(
    control: AbstractControl<string>
  ): ValidationErrors | null {
    return emailValidator(control);
  }
}
