import { InjectionToken } from '@angular/core';

import { RecaptchaConfigType } from './type';

export const RECAPTCHA_CONFIG = new InjectionToken<RecaptchaConfigType>(
  'RECAPTCHA_CONFIG'
);
