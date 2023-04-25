import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpRequestsHttpService } from '../../core/services/help-requests-http.service';

import { HttpRequestWithParamsBaseService } from '../../shared/abstracts/http-request-with-params-base-service.class';
import { DeleteHelpRequestResponseDataType } from '../../shared/types/delete-help-request-response-data.type';

@Injectable()
export class DeleteHelpRequestHttpService extends HttpRequestWithParamsBaseService<
  DeleteHelpRequestResponseDataType,
  number
> {
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
