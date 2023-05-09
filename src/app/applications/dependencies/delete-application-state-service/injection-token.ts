import { InjectionToken } from '@angular/core';

import { DeleteApplicationStateService } from './interface';

export const DELETE_APPLICATION_STATE_SERVICE =
  new InjectionToken<DeleteApplicationStateService>(
    'DELETE_APPLICATION_STATE_SERVICE'
  );
