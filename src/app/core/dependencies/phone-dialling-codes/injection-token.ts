import { InjectionToken } from '@angular/core';

import { PhoneDiallingCodesType } from './type';

export const PHONE_DIALLING_CODES = new InjectionToken<PhoneDiallingCodesType>(
  'PHONE_DIALLING_CODES'
);
