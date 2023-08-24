import { InjectionToken, inject } from '@angular/core';

import { WINDOW } from '../window';

export const LOCAL_STORAGE = new InjectionToken<Storage>('LOCAL_STORAGE', {
  providedIn: 'root',
  factory: () => inject(WINDOW).localStorage,
});
