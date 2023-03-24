import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpRequestsHttpService } from './help-requests-http.service';

import { HttpRequestWithParamsBaseService } from '../../shared/abstracts/http-request-with-params-base-service.class';
import { SuccessCreateHelpRequestResponseDataType } from '../../shared/types/success-create-help-request-response-data.type';
import { CreateHelpRequestDto } from '../../shared/dtos/create-help-request.dto';

@Injectable()
export class CreateHelpRequestService extends HttpRequestWithParamsBaseService<
  SuccessCreateHelpRequestResponseDataType,
  CreateHelpRequestDto
> {
  constructor(
    private readonly helpRequestsHttpService: HelpRequestsHttpService
  ) {
    super();
  }

  protected doRequest(
    createHelpRequestDto: CreateHelpRequestDto
  ): Observable<SuccessCreateHelpRequestResponseDataType> {
    return this.helpRequestsHttpService.createOne(createHelpRequestDto);
  }
}
