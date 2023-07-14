import { FactoryProvider } from '@angular/core';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';

import { RecaptchaConfigType, RECAPTCHA_CONFIG } from '../recaptcha-config';

export const RECAPTCHA_LANGUAGE_PROVIDER: FactoryProvider = {
  provide: RECAPTCHA_LANGUAGE,
  useFactory: ({ locale }: RecaptchaConfigType) => locale,
  deps: [RECAPTCHA_CONFIG],
};
