import { InjectionToken } from '@angular/core';

import { CountriesMapType } from './type';

export const COUNTRIES_MAP = new InjectionToken<CountriesMapType>(
  'COUNTRIES_MAP'
);
