import { AsyncData } from '@shared/classes/async-data.class';
import { ListOfPublishedHelpOffersType } from '@shared/types/list-of-published-help-offers.type';

export type PublishedHelpOffersStateModel = Readonly<{
  get: AsyncData<ListOfPublishedHelpOffersType>;
  deleteOne: AsyncData<number>;
}>;
