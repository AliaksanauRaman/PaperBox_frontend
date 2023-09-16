import { inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';

import { API_URL } from '@shared/dependencies/api-url';

import { IS_AUTHORIZED } from '@core/contexts/is-authorized.context';

export abstract class HttpService {
  protected readonly _apiUrl = inject(API_URL);
  protected readonly _httpClient = inject(HttpClient);

  protected getAuthorizedContext(): HttpContext {
    return new HttpContext().set(IS_AUTHORIZED, true);
  }
}
