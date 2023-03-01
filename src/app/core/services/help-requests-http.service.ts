import { Inject, Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';

import { MockHelpRequestsHttpService } from '../mocks/mock-help-requests-http.service';
import { API_URL } from '../../shared/dependencies/api-url/injection-token';
import { HelpRequestsHttpServiceInterface } from '../interfaces/help-requests-http-service.interface';
import { PublishedHelpRequestListType } from '../../shared/types/published-help-request-list.type';

@Injectable({
  providedIn: 'root',
  useFactory: helpRequestsHttpServiceFactory,
  deps: [API_URL, HttpClient],
})
export class HelpRequestsHttpService
  implements HelpRequestsHttpServiceInterface
{
  private readonly helpRequestsApiUrl = `${this.apiUrl}/api/help-requests`;

  constructor(
    @Inject(API_URL)
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public getPublished(): Observable<PublishedHelpRequestListType> {
    return this.httpClient.get<PublishedHelpRequestListType>(
      `${this.helpRequestsApiUrl}/published`
    );
  }
}

function helpRequestsHttpServiceFactory(
  apiUrl: string,
  httpClient: HttpClient
): HelpRequestsHttpServiceInterface {
  if (isDevMode()) {
    return new MockHelpRequestsHttpService();
  }

  return new HelpRequestsHttpService(apiUrl, httpClient);
}
