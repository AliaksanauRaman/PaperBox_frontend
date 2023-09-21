import { InjectionToken } from '@angular/core';

export const DATE_FORMAT = new InjectionToken<string>('DATE_FORMAT', {
  providedIn: 'root',
  factory: () => DATE_FORMAT_VALUE,
});
export const DATE_FORMAT_VALUE = 'DD.MM.YYYY';
