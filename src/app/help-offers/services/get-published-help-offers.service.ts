import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpOffersHttpService } from './help-offers-http.service';

import { HttpRequestBaseService } from '../../shared/abstracts/http-request-base-service.class';
import { PublishedHelpOfferListType } from '../../shared/types/published-help-offer-list.type';

@Injectable()
export class GetPublishedHelpOffersService extends HttpRequestBaseService<PublishedHelpOfferListType> {
  constructor(private readonly helpOffersHttpService: HelpOffersHttpService) {
    super();
  }

  protected doRequest(): Observable<PublishedHelpOfferListType> {
    return this.helpOffersHttpService.getPublished();
  }
}
