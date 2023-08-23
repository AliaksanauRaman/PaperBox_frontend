import { Inject, Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { MockHelpOffersHttpService } from '../mocks/mock-help-offers-http.service';

import { HelpOffersHttpServiceInterface } from '../interfaces/help-offers-http-service.interface';
import { API_URL } from '@shared/dependencies/api-url/injection-token';
import {
  ListOfPublishedApplicationEntities,
  listOfPublishedApplicationEntities,
  PublishedApplicationEntity,
  publishedApplicationEntity,
} from '@shared/entities/published-application.entity';
import { CreateHelpOfferDto } from '@shared/dtos/create-help-offer.dto';
import { DeleteHelpOfferResponseDataType } from '@shared/types/delete-help-offer-response-data.type';

@Injectable({
  providedIn: 'root',
  useFactory: helpOffersHttpServiceFactory,
  deps: [API_URL, HttpClient],
})
export class HelpOffersHttpService implements HelpOffersHttpServiceInterface {
  private readonly helpOffersApiUrl = `${this.apiUrl}/api/help-offers`;

  constructor(
    @Inject(API_URL)
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public getPublished(): Observable<ListOfPublishedApplicationEntities> {
    return this.httpClient
      .get<unknown>(`${this.helpOffersApiUrl}/published`)
      .pipe(
        map((responseData) =>
          listOfPublishedApplicationEntities.parse(responseData)
        )
      );
  }

  public createOne(
    createHelpOfferDto: CreateHelpOfferDto
  ): Observable<PublishedApplicationEntity> {
    return this.httpClient
      .post<unknown>(this.helpOffersApiUrl, createHelpOfferDto)
      .pipe(
        map((responseData) => publishedApplicationEntity.parse(responseData))
      );
  }

  public deleteOne(
    helpOfferId: number
  ): Observable<DeleteHelpOfferResponseDataType> {
    return this.httpClient
      .patch<null>(
        `${this.helpOffersApiUrl}/${helpOfferId}`,
        {
          status: 'DELETED',
        },
        {
          observe: 'response',
        }
      )
      .pipe(
        map((response) => {
          if (response.status === HttpStatusCode.Ok) {
            return {
              id: helpOfferId,
              deleted: true,
            };
          }

          throw new Error('Unknown error of help offer deletion!');
        })
      );
  }
}

function helpOffersHttpServiceFactory(
  apiUrl: string,
  httpClient: HttpClient
): HelpOffersHttpServiceInterface {
  if (isDevMode()) {
    return new MockHelpOffersHttpService();
  }

  return new HelpOffersHttpService(apiUrl, httpClient);
}
