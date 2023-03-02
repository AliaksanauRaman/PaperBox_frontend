import { Observable, of, delay } from 'rxjs';

import { FeedbacksHttpServiceInterface } from '../interfaces/feedbacks-http-service.interface';
import { CreateFeedbackDto } from '../../shared/dtos/create-feedback.dto';
import { SuccessCreateFeedbackResponseDataType } from '../../shared/types/success-create-feedback-response-data.type';

const DELAY_IN_MS = 1000;

export class MockFeedbacksHttpService implements FeedbacksHttpServiceInterface {
  public createOne(
    createFeedbackDto: CreateFeedbackDto
  ): Observable<SuccessCreateFeedbackResponseDataType> {
    const { fullName, email, comment } = createFeedbackDto;

    return of({
      id: '123123123',
      fullName,
      email,
      comment,
    }).pipe(delay(DELAY_IN_MS));
  }
}
