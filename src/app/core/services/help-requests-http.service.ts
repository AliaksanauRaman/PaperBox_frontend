import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../../shared/dependencies/api-url/injection-token';

import { PublishedHelpRequestListType } from '../../shared/types/published-help-request-list.type';

@Injectable({ providedIn: 'root' })
export class HelpRequestsHttpService {
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
