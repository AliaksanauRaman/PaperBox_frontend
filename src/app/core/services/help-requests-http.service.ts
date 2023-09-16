import { Injectable } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { HttpService } from '@shared/abstracts/http-service.class';
import { MockHelpRequestsHttpService } from '../mocks/mock-help-requests-http.service';
import { DevModeService } from './dev-mode.service';
import { HelpRequestsHttpServiceInterface } from '../interfaces/help-requests-http-service.interface';
import {
  ListOfPublishedApplicationEntities,
  listOfPublishedApplicationEntities,
  PublishedApplicationEntity,
  publishedApplicationEntity,
} from '@shared/entities/published-application.entity';
import { CreateHelpRequestDto } from '../../shared/dtos/create-help-request.dto';
import { DeleteHelpRequestResponseDataType } from '../../shared/types/delete-help-request-response-data.type';

@Injectable({
  providedIn: 'root',
  useFactory: helpRequestsHttpServiceFactory,
  deps: [DevModeService],
})
export class HelpRequestsHttpService
  extends HttpService
  implements HelpRequestsHttpServiceInterface
{
  public getPublished(): Observable<ListOfPublishedApplicationEntities> {
    return this._httpClient
      .get<unknown>(`${this._apiUrl}/help-requests/published`)
      .pipe(
        map((responseData) =>
          listOfPublishedApplicationEntities.parse(responseData)
        )
      );
  }

  public createOne(
    createHelpRequestDto: CreateHelpRequestDto
  ): Observable<PublishedApplicationEntity> {
    return this._httpClient
      .post<unknown>(`${this._apiUrl}/help-requests`, createHelpRequestDto)
      .pipe(
        map((responseData) => publishedApplicationEntity.parse(responseData))
      );
  }

  public deleteOne(
    helpRequestId: number
  ): Observable<DeleteHelpRequestResponseDataType> {
    return this._httpClient
      .patch<null>(
        `${this._apiUrl}/help-requests/${helpRequestId}`,
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
              id: helpRequestId,
              deleted: true,
            };
          }

          throw new Error('Unknown error of help request deletion!');
        })
      );
  }
}

function helpRequestsHttpServiceFactory(
  devModeService: DevModeService
): HelpRequestsHttpServiceInterface {
  if (devModeService.isOn()) {
    return new MockHelpRequestsHttpService();
  }

  return new HelpRequestsHttpService();
}
