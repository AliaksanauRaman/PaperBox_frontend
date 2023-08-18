import { AsyncData } from '@shared/classes/async-data.class';
import { ListOfPublishedHelpRequestsType } from '@shared/types/list-of-published-help-requests.type';

export type PublishedHelpRequestsStateModel =
  AsyncData<ListOfPublishedHelpRequestsType>;
