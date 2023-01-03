import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '../../shared/dependencies/api-url/injection-token';
import { HelpOfferFullPreviewType } from '../../shared/types/help-offer-full-preview.type';
import { FullHelpOfferType } from '../types/full-help-offer.type';
import { UpdateHelpOfferStatusResponseType } from '../types/update-help-offer-status-response.type';
import { HelpOfferStatus } from '../../shared/enums/help-offer-status.enum';
import { DeleteHelpOfferResponseType } from '../types/delete-help-offer-response.type';

@Injectable()
export class AdminHelpOffersHttpService {
  private readonly helpOffersApiUrl = `${this.apiUrl}/help-offers`;

  constructor(
    @Inject(API_URL)
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public getFullPreviewsOfAll(): Observable<Array<HelpOfferFullPreviewType>> {
    return this.httpClient.get<Array<HelpOfferFullPreviewType>>(
      `${this.helpOffersApiUrl}/full-previews-of-all`
    );
  }

  public getOneFullById(helpOfferId: string): Observable<FullHelpOfferType> {
    return this.httpClient.get<FullHelpOfferType>(
      `${this.helpOffersApiUrl}/one-full/${helpOfferId}`
    );
  }

  public updateStatusOfOneWithId(
    helpOfferId: string,
    newStatus: HelpOfferStatus
  ): Observable<UpdateHelpOfferStatusResponseType> {
    return this.httpClient.patch<UpdateHelpOfferStatusResponseType>(
      `${this.helpOffersApiUrl}/update-status-of-one/${helpOfferId}`,
      { newStatus }
    );
  }

  public deleteOneById(
    helpOfferId: string
  ): Observable<DeleteHelpOfferResponseType> {
    return this.httpClient.delete<DeleteHelpOfferResponseType>(
      `${this.helpOffersApiUrl}/one/${helpOfferId}`
    );
  }
}
