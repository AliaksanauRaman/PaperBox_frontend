import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { API_URL } from "../shared/dependencies/api-url";
import { CreateHelpOfferDto } from "../shared/dtos/create-help-offer.dto";
import { HelpOfferPublicPreviewType } from "../shared/types/help-offer-public-preview.type";


@Injectable({
  providedIn: 'root',
})
export class HelpOffersHttpService {
  private readonly helpOffersApiUrl = `${this.apiUrl}/help-offers`;

  constructor(
    @Inject(API_URL)
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient,
  ) {}

  public getPublicPreviewsOfPublished(): Observable<Array<HelpOfferPublicPreviewType>> {
    return this.httpClient.get<Array<HelpOfferPublicPreviewType>>(
      `${this.helpOffersApiUrl}/public-previews-of-published`
    );
  }

  public createOneUnpublished(createHelpOfferDto: CreateHelpOfferDto): Observable<unknown> {
    return this.httpClient.post(
      `${this.helpOffersApiUrl}/one-unpublished`,
      createHelpOfferDto,
    );
  }
}
