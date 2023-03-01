import { Observable } from 'rxjs';

import { PublishedHelpRequestListType } from '../../shared/types/published-help-request-list.type';

export interface HelpRequestsHttpServiceInterface {
  getPublished(): Observable<PublishedHelpRequestListType>;
}
