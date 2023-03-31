import { AbstractControl, ValidationErrors } from '@angular/forms';

export const passwordsMatchValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const passwordControl = control.get('password');
  const confirmPasswordControl = control.get('confirmPassword');

  if (passwordControl === null || confirmPasswordControl === null) {
    throw new Error('The validator is not applicable!');
  }

  if (passwordControl.invalid || confirmPasswordControl.invalid) {
    return null;
  }

  if (passwordControl.value === confirmPasswordControl.value) {
    return null;
  }

  return { passwordsMatch: true };
};
