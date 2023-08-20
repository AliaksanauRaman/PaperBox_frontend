import { AsyncData } from '@shared/classes/async-data.class';
import { ListOfPublishedHelpRequests } from '@shared/models/published-help-request.model';

export type PublishedHelpRequestsStateModel = Readonly<{
  get: AsyncData<ListOfPublishedHelpRequests>;
  deleteOne: AsyncData<number>;
}>;
