import { Observable } from 'rxjs';

import { ListOfPublishedApplicationEntities } from '../../shared/entities/published-application.entity';
import { CreateHelpRequestDto } from '../../shared/dtos/create-help-request.dto';
import { PublishedApplicationEntity } from '@shared/entities/published-application.entity';
import { DeleteHelpRequestResponseDataType } from '../../shared/types/delete-help-request-response-data.type';

export interface HelpRequestsHttpServiceInterface {
  getPublished(): Observable<ListOfPublishedApplicationEntities>;
  createOne(
    createHelpRequestDto: CreateHelpRequestDto
  ): Observable<PublishedApplicationEntity>;
  deleteOne(
    helpRequestId: number
  ): Observable<DeleteHelpRequestResponseDataType>;
}
