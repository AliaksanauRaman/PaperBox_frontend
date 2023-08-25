import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { API_URL } from '../../shared/dependencies/api-url';
import { AdminHeadersService } from './admin-headers.service';

import { FullApplicationStatus } from '../enums/full-application-status.enum';
import {
  FullApplicationListType,
  listOfFullApplicationsType,
} from '../types/full-application.type';
import { UpdateApplicationStatusResponseDataType } from '../types/update-application-status-response-data.type';

@Injectable({
  providedIn: 'root',
})
export class AdminApplicationsHttpService {
  constructor(
    @Inject(API_URL)
    private readonly _apiUrl: string,
    private readonly _httpClient: HttpClient,
    private readonly _headersService: AdminHeadersService
  ) {}

  public getAllHelpOffers(): Observable<FullApplicationListType> {
    const httpParams = new HttpParams()
      .set('statuses', FullApplicationStatus.PUBLISHED)
      .append('statuses', FullApplicationStatus.UNPUBLISHED)
      .append('statuses', FullApplicationStatus.REJECTED);
    return this._httpClient
      .get<unknown>(`${this._apiUrl}/admin/help-offers`, {
        headers: this._headersService.buildDefault(),
        params: httpParams,
      })
      .pipe(
        map((responseData) => listOfFullApplicationsType.parse(responseData))
      );
  }

  public getAllHelpRequests(): Observable<FullApplicationListType> {
    const httpParams = new HttpParams()
      .set('statuses', FullApplicationStatus.PUBLISHED)
      .append('statuses', FullApplicationStatus.UNPUBLISHED)
      .append('statuses', FullApplicationStatus.REJECTED);
    return this._httpClient
      .get<unknown>(`${this._apiUrl}/admin/help-requests`, {
        headers: this._headersService.buildDefault(),
        params: httpParams,
      })
      .pipe(
        map((responseData) => listOfFullApplicationsType.parse(responseData))
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
        { headers: this._headersService.buildDefault(), observe: 'response' }
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
        { headers: this._headersService.buildDefault(), observe: 'response' }
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
}
