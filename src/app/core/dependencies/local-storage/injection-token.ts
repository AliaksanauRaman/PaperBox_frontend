import { InjectionToken } from '@angular/core';

import { LocalStorageType } from './type';

export const LOCAL_STORAGE = new InjectionToken<LocalStorageType>(
  'LOCAL_STORAGE'
);
