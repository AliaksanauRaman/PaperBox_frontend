import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FeedbacksHttpService } from './feedbacks-http.service';

import { HttpRequestWithParamsBaseService } from '../../shared/abstracts/http-request-with-params-base-service.class';
import { SuccessCreateFeedbackResponseDataType } from '../../shared/types/success-create-feedback-response-data.type';
import { CreateFeedbackDto } from '../../shared/dtos/create-feedback.dto';

@Injectable()
export class CreateFeedbackService extends HttpRequestWithParamsBaseService<
  SuccessCreateFeedbackResponseDataType,
  CreateFeedbackDto
> {
  constructor(private readonly feedbacksHttpService: FeedbacksHttpService) {
    super();
  }

  protected doRequest(
    createFeedbackDto: CreateFeedbackDto
  ): Observable<SuccessCreateFeedbackResponseDataType> {
    return this.feedbacksHttpService.createOne(createFeedbackDto);
  }
}
