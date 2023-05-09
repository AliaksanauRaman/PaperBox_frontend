import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpRequestsHttpService } from '../../core/services/help-requests-http.service';

import { HttpRequestWithoutParamsBaseService } from '../../shared/abstracts/http-request-without-params-base-service.class';
import { PublishedHelpRequestListType } from '../../shared/types/published-help-request-list.type';
import { GetPublishedApplicationsStateService } from '../dependencies/get-published-applications-state-service';

@Injectable()
export class GetPublishedHelpRequestsStateService
  extends HttpRequestWithoutParamsBaseService<PublishedHelpRequestListType>
  implements GetPublishedApplicationsStateService
{
  constructor(
    private readonly _helpRequestsHttpService: HelpRequestsHttpService
  ) {
    super();
  }

  public doRequest(): Observable<PublishedHelpRequestListType> {
    return this._helpRequestsHttpService.getPublished();
  }
}
