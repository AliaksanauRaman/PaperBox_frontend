import { HttpRequestState } from '../../shared/types/http-request-state.type';
import { ListOfPublishedHelpRequestsType } from '../../shared/types/list-of-published-help-requests.type';

export type PublishedHelpRequestsStateModel =
  HttpRequestState<ListOfPublishedHelpRequestsType>;
