import { AsyncData } from '@shared/classes/async-data.class';
import { ListOfPublishedHelpOffers } from '@shared/models/published-help-offer.model';

export type PublishedHelpOffersStateModel = Readonly<{
  get: AsyncData<ListOfPublishedHelpOffers>;
  deleteOne: AsyncData<number>;
}>;
