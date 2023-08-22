import { Observable } from 'rxjs';

import { ListOfPublishedApplicationEntities } from '@shared/entities/published-application.entity';
import { CreateHelpOfferDto } from '@shared/dtos/create-help-offer.dto';
import { SuccessCreateHelpOfferResponseDataType } from '@shared/types/success-create-help-offer-response-data.type';
import { DeleteHelpOfferResponseDataType } from '@shared/types/delete-help-offer-response-data.type';

export interface HelpOffersHttpServiceInterface {
  getPublished(): Observable<ListOfPublishedApplicationEntities>;
  createOne(
    createHelpOfferDto: CreateHelpOfferDto
  ): Observable<SuccessCreateHelpOfferResponseDataType>;
  deleteOne(helpOfferId: number): Observable<DeleteHelpOfferResponseDataType>;
}
