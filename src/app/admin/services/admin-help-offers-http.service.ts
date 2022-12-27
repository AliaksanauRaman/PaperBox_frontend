import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from "@angular/core";
import { Observable } from 'rxjs';

import { API_URL } from '../../shared/dependencies/api-url/injection-token';
import { HelpOfferFullPreviewType } from '../../shared/types/help-offer-full-preview.type';

@Injectable()
export class AdminHelpOffersHttpService {
  constructor(
    @Inject(API_URL)
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient,
  ) {}

  public getFullPreviewsOfAll(): Observable<Array<HelpOfferFullPreviewType>> {
    return this.httpClient.get<Array<HelpOfferFullPreviewType>>(
      `${this.apiUrl}/help-offers/full-previews-of-all`
    );
  }
}

