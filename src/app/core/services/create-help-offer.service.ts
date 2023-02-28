import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpOffersHttpService } from './help-offers-http.service';

import { HttpRequestWithParamsBaseService } from '../../shared/abstracts/http-request-with-params-base-service.class';
import { SuccessCreateHelpOfferResponseDataType } from '../../shared/types/success-create-help-offer-response-data.type';
import { CreateHelpOfferDto } from '../../shared/dtos/create-help-offer.dto';

@Injectable()
export class CreateHelpOfferService extends HttpRequestWithParamsBaseService<
  SuccessCreateHelpOfferResponseDataType,
  CreateHelpOfferDto
> {
  constructor(private readonly helpOffersHttpService: HelpOffersHttpService) {
    super();
  }

  protected doRequest(
    createHelpOfferDto: CreateHelpOfferDto
  ): Observable<SuccessCreateHelpOfferResponseDataType> {
    return this.helpOffersHttpService.createOne(createHelpOfferDto);
  }
}
