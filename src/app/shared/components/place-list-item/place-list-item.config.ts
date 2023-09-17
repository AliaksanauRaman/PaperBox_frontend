import { InjectionToken } from '@angular/core';

export const PATH_TO_ARROW_ICON = new InjectionToken<string>(
  'PATH_TO_ARROW_ICON',
  {
    providedIn: 'root',
    factory: () => '/assets/svg/icons/slim-arrow-right-icon.svg',
  }
);
export const PATH_TO_ACTIVE_ARROW_ICON = new InjectionToken<string>(
  'PATH_TO_ACTIVE_ARROW_ICON',
  {
    providedIn: 'root',
    factory: () => '/assets/svg/icons/slim-arrow-right-active-icon.svg',
  }
);
