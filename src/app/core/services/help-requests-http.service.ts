import { Inject, Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { MockHelpRequestsHttpService } from '../mocks/mock-help-requests-http.service';
import { API_URL } from '../../shared/dependencies/api-url/injection-token';
import { HelpRequestsHttpServiceInterface } from '../interfaces/help-requests-http-service.interface';
import { PublishedHelpRequestListType } from '../../shared/types/published-help-request-list.type';
import { CreateHelpRequestDto } from '../../shared/dtos/create-help-request.dto';
import { SuccessCreateHelpRequestResponseDataType } from '../../shared/types/success-create-help-request-response-data.type';
import { DeleteHelpRequestResponseDataType } from '../../shared/types/delete-help-request-response-data.type';

@Injectable({
  providedIn: 'root',
  useFactory: helpRequestsHttpServiceFactory,
  deps: [API_URL, HttpClient],
})
export class HelpRequestsHttpService
  implements HelpRequestsHttpServiceInterface
{
  private readonly helpRequestsApiUrl = `${this.apiUrl}/api/help-requests`;

  constructor(
    @Inject(API_URL)
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public getPublished(): Observable<PublishedHelpRequestListType> {
    return this.httpClient.get<PublishedHelpRequestListType>(
      `${this.helpRequestsApiUrl}/published`
    );
  }

  public createOne(
    createHelpRequestDto: CreateHelpRequestDto
  ): Observable<SuccessCreateHelpRequestResponseDataType> {
    return this.httpClient.post<SuccessCreateHelpRequestResponseDataType>(
      this.helpRequestsApiUrl,
      createHelpRequestDto
    );
  }

  public deleteOne(
    helpRequestId: number
  ): Observable<DeleteHelpRequestResponseDataType> {
    return this.httpClient
      .patch<null>(
        `${this.helpRequestsApiUrl}/${helpRequestId}`,
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
  apiUrl: string,
  httpClient: HttpClient
): HelpRequestsHttpServiceInterface {
  if (isDevMode()) {
    return new MockHelpRequestsHttpService();
  }

  return new HelpRequestsHttpService(apiUrl, httpClient);
}
