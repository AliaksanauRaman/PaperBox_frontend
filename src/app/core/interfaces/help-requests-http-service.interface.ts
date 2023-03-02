import { Observable } from 'rxjs';

import { PublishedHelpRequestListType } from '../../shared/types/published-help-request-list.type';
import { CreateHelpRequestDto } from '../../shared/dtos/create-help-request.dto';
import { SuccessCreateHelpRequestResponseDataType } from '../../shared/types/success-create-help-request-response-data.type';

export interface HelpRequestsHttpServiceInterface {
  getPublished(): Observable<PublishedHelpRequestListType>;
  createOne(
    createHelpRequestDto: CreateHelpRequestDto
  ): Observable<SuccessCreateHelpRequestResponseDataType>;
}
