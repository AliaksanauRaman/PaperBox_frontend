import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DevModeService } from './dev-mode.service';

import { HttpService } from '@shared/abstracts/http-service.class';
import { FeedbacksHttpServiceInterface } from '../interfaces/feedbacks-http-service.interface';
import { MockFeedbacksHttpService } from '../mocks/mock-feedbacks-http.service';
import { CreateFeedbackDto } from '../../shared/dtos/create-feedback.dto';
import { SuccessCreateFeedbackResponseDataType } from '../../shared/types/success-create-feedback-response-data.type';

@Injectable({
  providedIn: 'root',
  useFactory: feedbacksHttpServiceFactory,
  deps: [DevModeService],
})
export class FeedbacksHttpService
  extends HttpService
  implements FeedbacksHttpServiceInterface
{
  public createOne(
    createFeedbackDto: CreateFeedbackDto
  ): Observable<SuccessCreateFeedbackResponseDataType> {
    return this._httpClient.post<SuccessCreateFeedbackResponseDataType>(
      `${this._apiUrl}/api/feedbacks`,
      createFeedbackDto
    );
  }
}

function feedbacksHttpServiceFactory(
  devModeService: DevModeService
): FeedbacksHttpServiceInterface {
  if (devModeService.isOn()) {
    return new MockFeedbacksHttpService();
  }

  return new FeedbacksHttpService();
}
