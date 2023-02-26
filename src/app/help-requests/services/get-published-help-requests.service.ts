import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpRequestsHttpService } from '../../core/services/help-requests-http.service';

import { PublishedHelpRequestListType } from '../../shared/types/published-help-request-list.type';

import { HttpRequestBaseService } from '../../shared/abstracts/http-request-base-service.class';

@Injectable()
export class GetPublishedHelpRequestsService extends HttpRequestBaseService<PublishedHelpRequestListType> {
  constructor(
    private readonly helpRequestsHttpService: HelpRequestsHttpService
  ) {
    super();
  }

  public doRequest(): Observable<PublishedHelpRequestListType> {
    return this.helpRequestsHttpService.getPublished();
  }
}
