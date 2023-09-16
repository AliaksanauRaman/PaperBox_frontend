import { Injectable, inject } from '@angular/core';
import { HttpParams, HttpStatusCode } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { AdminHeadersService } from './admin-headers.service';

import { HttpService } from '@shared/abstracts/http-service.class';
import { FullApplicationStatus } from '../enums/full-application-status.enum';
import {
  FullApplicationListType,
  listOfFullApplicationsType,
} from '../types/full-application.type';
import { UpdateApplicationStatusResponseDataType } from '../types/update-application-status-response-data.type';

@Injectable({
  providedIn: 'root',
})
export class AdminApplicationsHttpService extends HttpService {
  private readonly _headersService = inject(AdminHeadersService);

  public getAllHelpOffers(): Observable<FullApplicationListType> {
    const httpParams = new HttpParams()
      .set('statuses', FullApplicationStatus.PUBLISHED)
      .append('statuses', FullApplicationStatus.UNPUBLISHED)
      .append('statuses', FullApplicationStatus.REJECTED);
    return this._httpClient
      .get<unknown>(`${this._apiUrl}/admin/help-offers`, {
        headers: this._headersService.buildDefault(),
        params: httpParams,
        context: this.getAuthorizedContext(),
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
        context: this.getAuthorizedContext(),
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
        {
          headers: this._headersService.buildDefault(),
          observe: 'response',
          context: this.getAuthorizedContext(),
        }
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
        {
          headers: this._headersService.buildDefault(),
          observe: 'response',
          context: this.getAuthorizedContext(),
        }
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
