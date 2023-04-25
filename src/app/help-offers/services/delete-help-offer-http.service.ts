import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpOffersHttpService } from '../../core/services/help-offers-http.service';

import { HttpRequestWithParamsBaseService } from '../../shared/abstracts/http-request-with-params-base-service.class';
import { DeleteHelpOfferResponseDataType } from '../../shared/types/delete-help-offer-response-data.type';

@Injectable()
export class DeleteHelpOfferHttpService extends HttpRequestWithParamsBaseService<
  DeleteHelpOfferResponseDataType,
  number
> {
  constructor(private readonly _helpOffersHttpService: HelpOffersHttpService) {
    super();
  }

  protected doRequest(
    helpOfferId: number
  ): Observable<DeleteHelpOfferResponseDataType> {
    return this._helpOffersHttpService.deleteOne(helpOfferId);
  }
}
