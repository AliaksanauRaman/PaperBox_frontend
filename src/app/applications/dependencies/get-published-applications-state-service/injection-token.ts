import { InjectionToken } from '@angular/core';

import { GetPublishedApplicationsStateService } from './interface';

export const GET_PUBLISHED_APPLICATIONS_STATE_SERVICE =
  new InjectionToken<GetPublishedApplicationsStateService>(
    'GET_PUBLISHED_APPLICATIONS_STATE_SERVICE'
  );
