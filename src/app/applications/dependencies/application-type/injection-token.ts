import { InjectionToken } from '@angular/core';

import { ApplicationType } from './enum';

export const APPLICATION_TYPE = new InjectionToken<ApplicationType>(
  'APPLICATION_TYPE'
);
