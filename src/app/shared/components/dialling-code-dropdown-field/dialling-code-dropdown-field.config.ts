import { InjectionToken } from '@angular/core';

import { DiallingCode } from '@shared/types/dialling-code';

export const DIALLING_CODES = new InjectionToken<ReadonlyArray<DiallingCode>>(
  'DIALLING_CODES',
  { providedIn: 'root', factory: () => DIALLING_CODES_VALUE }
);

export const DIALLING_CODES_VALUE = [
  new DiallingCode('Belarus', '+375'),
  new DiallingCode('Poland', '+48'),
  new DiallingCode('Ukraine', '+380'),
  new DiallingCode('Lithuania', '+370'),
  new DiallingCode('Georgia', '+995'),
];
