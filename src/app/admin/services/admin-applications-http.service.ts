import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { API_URL } from '../../shared/dependencies/api-url';

import { FullApplicationStatus } from '../enums/full-application-status.enum';
import { FullApplicationListType } from '../types/full-application.type';
import { UpdateApplicationStatusResponseDataType } from '../types/update-application-status-response-data.type';

@Injectable({
  providedIn: 'root',
})
export class AdminApplicationsHttpService {
  constructor(
    @Inject(API_URL)
    private readonly _apiUrl: string,
    private readonly _httpClient: HttpClient
  ) {}

  public getAllHelpOffers(): Observable<FullApplicationListType> {
    const httpParams = new HttpParams()
      .set('statuses', FullApplicationStatus.PUBLISHED)
      .append('statuses', FullApplicationStatus.UNPUBLISHED)
      .append('statuses', FullApplicationStatus.REJECTED);
    return this._httpClient.get<FullApplicationListType>(
      `${this._apiUrl}/admin/help-offers`,
      { headers: this.buildDefaultHeaders(), params: httpParams }
    );
  }

  public getAllHelpRequests(): Observable<FullApplicationListType> {
    const httpParams = new HttpParams()
      .set('statuses', FullApplicationStatus.PUBLISHED)
      .append('statuses', FullApplicationStatus.UNPUBLISHED)
      .append('statuses', FullApplicationStatus.REJECTED);
    return this._httpClient.get<FullApplicationListType>(
      `${this._apiUrl}/admin/help-requests`,
      { headers: this.buildDefaultHeaders(), params: httpParams }
    );
  }

  public updateHelpOfferStatus(
    id: number,
    newStatus: FullApplicationStatus
  ): Observable<UpdateApplicationStatusResponseDataType> {
    return this._httpClient
      .patch<null>(
        `${this._apiUrl}/api/help-offers/${id}`,
        {
          status: newStatus,
        },
        { headers: this.buildDefaultHeaders(), observe: 'response' }
      )
      .pipe(
        map((response) => {
          if (response.status === HttpStatusCode.Ok) {
            return {
              id,
              ok: true,
            };
          }

          throw new Error('Error during help offer status update!');
        })
      );
  }

  public updateHelpRequestStatus(
    id: number,
    newStatus: FullApplicationStatus
  ): Observable<UpdateApplicationStatusResponseDataType> {
    return this._httpClient
      .patch<null>(
        `${this._apiUrl}/api/help-requests/${id}`,
        {
          status: newStatus,
        },
        { headers: this.buildDefaultHeaders(), observe: 'response' }
      )
      .pipe(
        map((response) => {
          if (response.status === HttpStatusCode.Ok) {
            return {
              id,
              ok: true,
            };
          }

          throw new Error('Error during help request status update!');
        })
      );
  }

  private buildDefaultHeaders(): HttpHeaders {
    return new HttpHeaders().set('showGlobalLoader', 'true');
  }
}
