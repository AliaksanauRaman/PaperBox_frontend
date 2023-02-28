import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpOffersHttpService } from '../../core/services/help-offers-http.service';

import { HttpRequestWithoutParamsBaseService } from '../../shared/abstracts/http-request-without-params-base-service.class';
import { PublishedHelpOfferListType } from '../../shared/types/published-help-offer-list.type';

@Injectable()
export class GetPublishedHelpOffersService extends HttpRequestWithoutParamsBaseService<PublishedHelpOfferListType> {
  constructor(private readonly helpOffersHttpService: HelpOffersHttpService) {
    super();
  }

  protected doRequest(): Observable<PublishedHelpOfferListType> {
    return this.helpOffersHttpService.getPublished();
  }
}
