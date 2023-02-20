import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '../../shared/dependencies/api-url/injection-token';
import { PublishedHelpOfferListType } from '../../shared/types/published-help-offer-list.type';

@Injectable({
  providedIn: 'root',
})
export class HelpOffersHttpService {
  private readonly helpOffersApiUrl = `${this.apiUrl}/api/help-offers`;

  constructor(
    @Inject(API_URL)
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public getPublished(): Observable<PublishedHelpOfferListType> {
    // TODO: !IMPORTANT Make get request once fixed instead
    return this.httpClient.post<PublishedHelpOfferListType>(
      `${this.helpOffersApiUrl}/published`,
      {}
    );
  }

  // TODO: Types
  public createOne(createHelpOfferDto: unknown): Observable<unknown> {
    return this.httpClient.post(this.helpOffersApiUrl, createHelpOfferDto);
  }
}
