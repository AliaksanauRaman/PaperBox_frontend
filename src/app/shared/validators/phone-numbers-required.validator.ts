import { FormControl, ValidationErrors } from '@angular/forms';

import { PhoneType } from '../types/phone.type';
import { isPhoneFilledIn } from '../utils/is-phone-filled-in.util';

// TODO: Unused
export const phoneNumbersRequired = (amountOfRequiredPhones: number) => {
  return (
    control: FormControl<ReadonlyArray<PhoneType>>
  ): ValidationErrors | null => {
    const nonEmptyPhones = control.value.filter(isPhoneFilledIn);

    if (nonEmptyPhones.length < amountOfRequiredPhones) {
      return { phoneNumbersRequired: true };
    }

    return null;
  };
};
