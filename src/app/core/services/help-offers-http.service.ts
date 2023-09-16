import { Injectable } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { DevModeService } from './dev-mode.service';

import { HttpService } from '@shared/abstracts/http-service.class';
import { MockHelpOffersHttpService } from '../mocks/mock-help-offers-http.service';
import { HelpOffersHttpServiceInterface } from '../interfaces/help-offers-http-service.interface';
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
  deps: [DevModeService],
})
export class HelpOffersHttpService
  extends HttpService
  implements HelpOffersHttpServiceInterface
{
  private readonly _helpOffersEndpoint = `${this._apiUrl}/api/help-offers`;

  public getPublished(): Observable<ListOfPublishedApplicationEntities> {
    return this._httpClient
      .get<unknown>(`${this._helpOffersEndpoint}/published`)
      .pipe(
        map((responseData) =>
          listOfPublishedApplicationEntities.parse(responseData)
        )
      );
  }

  public createOne(
    createHelpOfferDto: CreateHelpOfferDto
  ): Observable<PublishedApplicationEntity> {
    return this._httpClient
      .post<unknown>(this._helpOffersEndpoint, createHelpOfferDto, {
        context: this.getAuthorizedContext(),
      })
      .pipe(
        map((responseData) => publishedApplicationEntity.parse(responseData))
      );
  }

  public deleteOne(
    helpOfferId: number
  ): Observable<DeleteHelpOfferResponseDataType> {
    return this._httpClient
      .patch<null>(
        `${this._helpOffersEndpoint}/${helpOfferId}`,
        {
          status: 'DELETED',
        },
        {
          observe: 'response',
          context: this.getAuthorizedContext(),
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
  devModeService: DevModeService
): HelpOffersHttpServiceInterface {
  if (devModeService.isOn()) {
    return new MockHelpOffersHttpService();
  }

  return new HelpOffersHttpService();
}
