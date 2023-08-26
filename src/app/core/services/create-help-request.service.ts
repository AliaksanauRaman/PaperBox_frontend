import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpRequestsHttpService } from './help-requests-http.service';

import { HttpRequestWithParamsBaseService } from '../../shared/abstracts/http-request-with-params-base-service.class';
import { CreateHelpRequestDto } from '../../shared/dtos/create-help-request.dto';
import { PublishedApplicationEntity } from '@shared/entities/published-application.entity';

@Injectable()
export class CreateHelpRequestService extends HttpRequestWithParamsBaseService<
  PublishedApplicationEntity,
  CreateHelpRequestDto
> {
  constructor(
    private readonly helpRequestsHttpService: HelpRequestsHttpService
  ) {
    super();
  }

  protected doRequest(
    createHelpRequestDto: CreateHelpRequestDto
  ): Observable<PublishedApplicationEntity> {
    return this.helpRequestsHttpService.createOne(createHelpRequestDto);
  }
}
