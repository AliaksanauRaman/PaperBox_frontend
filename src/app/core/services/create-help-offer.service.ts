import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpOffersHttpService } from './help-offers-http.service';

import { HttpRequestWithParamsBaseService } from '../../shared/abstracts/http-request-with-params-base-service.class';
import { PublishedApplicationEntity } from '@shared/entities/published-application.entity';
import { CreateHelpOfferDto } from '../../shared/dtos/create-help-offer.dto';

@Injectable()
export class CreateHelpOfferService extends HttpRequestWithParamsBaseService<
  PublishedApplicationEntity,
  CreateHelpOfferDto
> {
  constructor(private readonly helpOffersHttpService: HelpOffersHttpService) {
    super();
  }

  protected doRequest(
    createHelpOfferDto: CreateHelpOfferDto
  ): Observable<PublishedApplicationEntity> {
    return this.helpOffersHttpService.createOne(createHelpOfferDto);
  }
}
