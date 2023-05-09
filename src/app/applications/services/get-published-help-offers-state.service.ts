import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpOffersHttpService } from '../../core/services/help-offers-http.service';

import { HttpRequestWithoutParamsBaseService } from '../../shared/abstracts/http-request-without-params-base-service.class';
import { PublishedHelpOfferListType } from '../../shared/types/published-help-offer-list.type';
import { GetPublishedApplicationsStateService } from '../dependencies/get-published-applications-state-service';

@Injectable()
export class GetPublishedHelpOffersService
  extends HttpRequestWithoutParamsBaseService<PublishedHelpOfferListType>
  implements GetPublishedApplicationsStateService
{
  constructor(private readonly _helpOffersHttpService: HelpOffersHttpService) {
    super();
  }

  protected doRequest(): Observable<PublishedHelpOfferListType> {
    return this._helpOffersHttpService.getPublished();
  }
}
