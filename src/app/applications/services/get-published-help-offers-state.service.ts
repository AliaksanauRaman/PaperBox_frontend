import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpOffersHttpService } from '../../core/services/help-offers-http.service';

import { HttpRequestWithoutParamsBaseService } from '../../shared/abstracts/http-request-without-params-base-service.class';
import { ListOfPublishedHelpOffersType } from '../../shared/types/list-of-published-help-offers.type';
import { GetPublishedApplicationsStateService } from '../dependencies/get-published-applications-state-service';

@Injectable()
export class GetPublishedHelpOffersService
  extends HttpRequestWithoutParamsBaseService<ListOfPublishedHelpOffersType>
  implements GetPublishedApplicationsStateService
{
  constructor(private readonly _helpOffersHttpService: HelpOffersHttpService) {
    super();
  }

  protected doRequest(): Observable<ListOfPublishedHelpOffersType> {
    return this._helpOffersHttpService.getPublished();
  }
}
