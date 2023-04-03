import { AbstractControl, ValidationErrors } from '@angular/forms';

import { EMAIL_FORMAT_REGEXP } from '../regexps/email-format.regexp';

export const emailFormatValidator = (
  control: AbstractControl<string>
): ValidationErrors | null => {
  if (control.value === '') {
    return null;
  }

  if (EMAIL_FORMAT_REGEXP.test(control.value)) {
    return null;
  }

  return { emailFormat: true };
};
