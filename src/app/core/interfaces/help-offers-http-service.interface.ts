import { Observable } from 'rxjs';

import {
  ListOfPublishedApplicationEntities,
  PublishedApplicationEntity,
} from '@shared/entities/published-application.entity';
import { CreateHelpOfferDto } from '@shared/dtos/create-help-offer.dto';
import { DeleteHelpOfferResponseDataType } from '@shared/types/delete-help-offer-response-data.type';

export interface HelpOffersHttpServiceInterface {
  getPublished(): Observable<ListOfPublishedApplicationEntities>;
  createOne(
    createHelpOfferDto: CreateHelpOfferDto
  ): Observable<PublishedApplicationEntity>;
  deleteOne(helpOfferId: number): Observable<DeleteHelpOfferResponseDataType>;
}
