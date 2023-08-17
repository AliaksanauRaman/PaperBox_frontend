import { HttpRequestState } from '../../shared/types/http-request-state.type';
import { PublishedHelpRequestType } from '../../shared/types/published-help-request.type';

export type PublishedHelpRequestsStateModel = HttpRequestState<
  ReadonlyArray<PublishedHelpRequestType>
>;
