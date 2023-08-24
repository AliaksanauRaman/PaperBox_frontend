import { InjectionToken, inject } from '@angular/core';

import { WINDOW } from '../window';

export const NAVIGATOR = new InjectionToken<Navigator>('NAVIGATOR', {
  providedIn: 'root',
  factory: () => inject(WINDOW).navigator,
});
