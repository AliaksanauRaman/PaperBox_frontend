import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FeedbacksHttpServiceInterface } from '../interfaces/feedbacks-http-service.interface';
import { API_URL } from '../../shared/dependencies/api-url/injection-token';
import { CreateFeedbackDto } from '../../shared/dtos/create-feedback.dto';
import { SuccessCreateFeedbackResponseDataType } from '../../shared/types/success-create-feedback-response-data.type';

@Injectable({
  providedIn: 'root',
})
export class FeedbacksHttpService implements FeedbacksHttpServiceInterface {
  private readonly feedbacksApiUrl = `${this.apiUrl}/api/feedbacks`;

  constructor(
    @Inject(API_URL)
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public createOne(
    createFeedbackDto: CreateFeedbackDto
  ): Observable<SuccessCreateFeedbackResponseDataType> {
    return this.httpClient.post<SuccessCreateFeedbackResponseDataType>(
      this.feedbacksApiUrl,
      createFeedbackDto
    );
  }
}
