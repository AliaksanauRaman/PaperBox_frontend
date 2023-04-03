import { AbstractControl, ValidationErrors } from '@angular/forms';

import { PASSWORD_FORMAT_REGEXP } from '../regexps/password-format.regexp';

export const passwordFormatValidator = (
  control: AbstractControl<string>
): ValidationErrors | null => {
  if (control.value === '') {
    return null;
  }

  if (PASSWORD_FORMAT_REGEXP.test(control.value)) {
    return null;
  }

  return { passwordFormat: true };
};
