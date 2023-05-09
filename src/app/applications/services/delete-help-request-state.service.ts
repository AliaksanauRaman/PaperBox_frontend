import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpRequestsHttpService } from '../../core/services/help-requests-http.service';

import { HttpRequestWithParamsBaseService } from '../../shared/abstracts/http-request-with-params-base-service.class';
import { DeleteHelpRequestResponseDataType } from '../../shared/types/delete-help-request-response-data.type';
import { DeleteApplicationStateService } from '../dependencies/delete-application-state-service';

@Injectable()
export class DeleteHelpRequestStateService
  extends HttpRequestWithParamsBaseService<
    DeleteHelpRequestResponseDataType,
    number
  >
  implements DeleteApplicationStateService
{
  constructor(
    private readonly _helpRequestsHttpService: HelpRequestsHttpService
  ) {
    super();
  }

  protected doRequest(
    helpRequestId: number
  ): Observable<DeleteHelpRequestResponseDataType> {
    return this._helpRequestsHttpService.deleteOne(helpRequestId);
  }
}
