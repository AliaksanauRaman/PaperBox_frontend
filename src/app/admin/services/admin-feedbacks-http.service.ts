import { Injectable, inject } from '@angular/core';
import { HttpParams, HttpStatusCode } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { AdminHeadersService } from './admin-headers.service';

import { HttpService } from '@shared/abstracts/http-service.class';
import { FeedbackListType } from '../types/feedback.type';
import { FeedbackStatus } from '../enums/feedback-status.enum';
import { UpdateFeedbackStatusResponseDataType } from '../types/update-feedback-status-response-data.type';

@Injectable({
  providedIn: 'root',
})
export class AdminFeedbacksHttpService extends HttpService {
  private readonly _headersService = inject(AdminHeadersService);

  public getAll(): Observable<FeedbackListType> {
    return this._httpClient.get<FeedbackListType>(
      `${this._apiUrl}/admin/feedbacks`,
      {
        headers: this._headersService.buildDefault(),
        context: this.getAuthorizedContext(),
      }
    );
  }

  public updateStatusOfOne(
    feedbackId: number,
    newStatus: FeedbackStatus
  ): Observable<UpdateFeedbackStatusResponseDataType> {
    const httpParams = new HttpParams().set('status', newStatus);
    return this._httpClient
      .patch<null>(
        `${this._apiUrl}/admin/feedbacks/${feedbackId}`,
        {},
        {
          headers: this._headersService.buildDefault(),
          params: httpParams,
          observe: 'response',
          context: this.getAuthorizedContext(),
        }
      )
      .pipe(
        map((response) => {
          if (response.status === HttpStatusCode.Ok) {
            return {
              id: feedbackId,
              ok: true,
            };
          }

          throw new Error('Error during feedback status update!');
        })
      );
  }
}
