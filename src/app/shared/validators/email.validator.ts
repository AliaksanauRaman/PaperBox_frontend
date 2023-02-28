import { AbstractControl, ValidationErrors } from '@angular/forms';

import { emailRegExp } from '../regexps/email.regexp';

export const emailValidator = (
  control: AbstractControl<string>
): ValidationErrors | null => {
  if (control.value === '') {
    return null;
  }

  if (emailRegExp.test(control.value)) {
    return null;
  }

  return { email: true };
};
