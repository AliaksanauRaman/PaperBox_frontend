import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpRequestsHttpService } from '../../core/services/help-requests-http.service';

import { HttpRequestWithoutParamsBaseService } from '../../shared/abstracts/http-request-without-params-base-service.class';
import { ListOfPublishedHelpRequestsType } from '../../shared/types/list-of-published-help-requests.type';
import { GetPublishedApplicationsStateService } from '../dependencies/get-published-applications-state-service';

@Injectable()
export class GetPublishedHelpRequestsStateService
  extends HttpRequestWithoutParamsBaseService<ListOfPublishedHelpRequestsType>
  implements GetPublishedApplicationsStateService
{
  constructor(
    private readonly _helpRequestsHttpService: HelpRequestsHttpService
  ) {
    super();
  }

  public doRequest(): Observable<ListOfPublishedHelpRequestsType> {
    return this._helpRequestsHttpService.getPublished();
  }
}
