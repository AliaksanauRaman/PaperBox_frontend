import { Observable } from 'rxjs';

import { CreateFeedbackDto } from '../../shared/dtos/create-feedback.dto';
import { SuccessCreateFeedbackResponseDataType } from '../../shared/types/success-create-feedback-response-data.type';

export interface FeedbacksHttpServiceInterface {
  createOne(
    createFeedbackDto: CreateFeedbackDto
  ): Observable<SuccessCreateFeedbackResponseDataType>;
}
