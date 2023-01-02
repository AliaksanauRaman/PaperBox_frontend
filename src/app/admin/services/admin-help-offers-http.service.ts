import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '../../shared/dependencies/api-url/injection-token';
import { HelpOfferFullPreviewType } from '../../shared/types/help-offer-full-preview.type';
import { FullHelpOfferType } from '../types/full-help-offer.type';
import { UpdateHelpOfferStatusResponseType } from '../types/update-help-offer-status-response.type';
import { HelpOfferStatus } from '../../shared/enums/help-offer-status.enum';

@Injectable()
export class AdminHelpOffersHttpService {
  constructor(
    @Inject(API_URL)
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public getFullPreviewsOfAll(): Observable<Array<HelpOfferFullPreviewType>> {
    return this.httpClient.get<Array<HelpOfferFullPreviewType>>(
      `${this.apiUrl}/help-offers/full-previews-of-all`
    );
  }

  public getOneFullById(helpOfferId: string): Observable<FullHelpOfferType> {
    return this.httpClient.get<FullHelpOfferType>(
      `${this.apiUrl}/help-offers/full/${helpOfferId}`
    );
  }

  public updateStatusOfOneWithId(
    helpOfferId: string,
    newStatus: HelpOfferStatus
  ): Observable<UpdateHelpOfferStatusResponseType> {
    return this.httpClient.patch<UpdateHelpOfferStatusResponseType>(
      `${this.apiUrl}/help-offers/update-status-of-one/${helpOfferId}`,
      { newStatus }
    );
  }
}
