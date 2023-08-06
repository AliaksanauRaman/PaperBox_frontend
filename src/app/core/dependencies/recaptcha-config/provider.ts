import { ValueProvider } from '@angular/core';

import { RECAPTCHA_CONFIG } from './injection-token';
import { RECAPTCHA_CONFIG_VALUE } from './value';

export const RECAPTCHA_CONFIG_PROVIDER: ValueProvider = {
  provide: RECAPTCHA_CONFIG,
  useValue: RECAPTCHA_CONFIG_VALUE,
};
