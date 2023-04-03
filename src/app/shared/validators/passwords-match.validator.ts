import { AbstractControl, ValidationErrors } from '@angular/forms';

// TODO: Probably better to make it more reusable
export const passwordsMatchValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const passwordControl = control.get('password');
  const confirmPasswordControl = control.get('confirmPassword');

  if (passwordControl === null || confirmPasswordControl === null) {
    throw new Error('The validator is not applicable!');
  }

  if (
    confirmPasswordControl.errors &&
    !confirmPasswordControl.errors['passwordsMatch']
  ) {
    return null;
  }

  if (passwordControl.value !== confirmPasswordControl.value) {
    confirmPasswordControl.setErrors({ passwordsMatch: true });
  } else {
    confirmPasswordControl.setErrors(null);
  }

  return null;
};
