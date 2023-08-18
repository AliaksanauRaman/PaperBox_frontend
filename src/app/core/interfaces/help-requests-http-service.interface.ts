import { Observable } from 'rxjs';

import { ListOfPublishedHelpRequestsType } from '../../shared/types/list-of-published-help-requests.type';
import { CreateHelpRequestDto } from '../../shared/dtos/create-help-request.dto';
import { SuccessCreateHelpRequestResponseDataType } from '../../shared/types/success-create-help-request-response-data.type';
import { DeleteHelpRequestResponseDataType } from '../../shared/types/delete-help-request-response-data.type';

export interface HelpRequestsHttpServiceInterface {
  getPublished(): Observable<ListOfPublishedHelpRequestsType>;
  createOne(
    createHelpRequestDto: CreateHelpRequestDto
  ): Observable<SuccessCreateHelpRequestResponseDataType>;
  deleteOne(
    helpRequestId: number
  ): Observable<DeleteHelpRequestResponseDataType>;
}
