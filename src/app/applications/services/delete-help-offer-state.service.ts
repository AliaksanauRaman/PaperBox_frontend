import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpOffersHttpService } from '../../core/services/help-offers-http.service';

import { HttpRequestWithParamsBaseService } from '../../shared/abstracts/http-request-with-params-base-service.class';
import { DeleteHelpOfferResponseDataType } from '../../shared/types/delete-help-offer-response-data.type';
import { DeleteApplicationStateService } from '../dependencies/delete-application-state-service';

@Injectable()
export class DeleteHelpOfferStateService
  extends HttpRequestWithParamsBaseService<
    DeleteHelpOfferResponseDataType,
    number
  >
  implements DeleteApplicationStateService
{
  constructor(private readonly _helpOffersHttpService: HelpOffersHttpService) {
    super();
  }

  protected doRequest(
    helpOfferId: number
  ): Observable<DeleteHelpOfferResponseDataType> {
    return this._helpOffersHttpService.deleteOne(helpOfferId);
  }
}
