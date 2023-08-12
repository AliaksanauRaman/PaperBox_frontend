import { InjectionToken } from '@angular/core';

import { JwtTokenDecoder } from './interface';
import { JwtDecodeImplementation } from './jwt-decode.implementation';

export const JWT_TOKEN_DECODER = new InjectionToken<JwtTokenDecoder>(
  'JWT_TOKEN_DECODER',
  {
    providedIn: 'root',
    factory: () => new JwtDecodeImplementation(),
  }
);
