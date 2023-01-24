import { InjectionToken } from '@angular/core';

import { AllLocationsWithTranslatedLabelsType } from './type';

export const ALL_LOCATIONS_WITH_TRANSLATED_LABELS =
  new InjectionToken<AllLocationsWithTranslatedLabelsType>(
    'ALL_LOCATIONS_WITH_TRANSLATED_LABELS'
  );
