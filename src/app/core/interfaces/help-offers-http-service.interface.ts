import { Observable } from 'rxjs';

import { PublishedHelpOfferListType } from '../../shared/types/published-help-offer-list.type';
import { CreateHelpOfferDto } from '../../shared/dtos/create-help-offer.dto';
import { SuccessCreateHelpOfferResponseDataType } from '../../shared/types/success-create-help-offer-response-data.type';

export interface HelpOffersHttpServiceInterface {
  getPublished(): Observable<PublishedHelpOfferListType>;
  createOne(
    createHelpOfferDto: CreateHelpOfferDto
  ): Observable<SuccessCreateHelpOfferResponseDataType>;
}
