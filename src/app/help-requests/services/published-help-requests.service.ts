import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, takeUntil } from 'rxjs';

import { AppEventBusService, AppEventName } from '../../events';

import { DestroyEmitter } from '../../shared/abstracts/destroy-emitter.class';
import { PublishedHelpRequestListType } from '../../shared/types/published-help-request-list.type';
import { HttpRequestStateMachine } from '../../shared/classes/http-request-state-machine.class';
import { MakeGetPublishedHelpRequestsRequest } from '../events';

@Injectable()
// TODO: Think about some base class
export class PublishedHelpRequestsService extends DestroyEmitter {
  private readonly httpRequestStateMachine =
    new HttpRequestStateMachine<PublishedHelpRequestListType>();

  public readonly state$ = this.httpRequestStateMachine.currentState$;

  constructor(private readonly eventBusService: AppEventBusService) {
    super();

    this.subToSuccessGet();
    this.subToFailedGet();
  }

  public makeGetHttpRequest(): void {
    this.httpRequestStateMachine.handleMakeRequest();
    this.eventBusService.emit(new MakeGetPublishedHelpRequestsRequest());
  }

  private subToSuccessGet(): void {
    this.eventBusService
      .on<PublishedHelpRequestListType>(
        AppEventName.SUCCESS_GET_PUBLISHED_HELP_REQUESTS
      )
      .pipe(
        tap((publishedHelpRequests) => {
          this.httpRequestStateMachine.handleSuccessResponse(
            publishedHelpRequests
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private subToFailedGet(): void {
    this.eventBusService
      .on<HttpErrorResponse>(AppEventName.FAILED_GET_PUBLISHED_HELP_REQUESTS)
      .pipe(
        tap((error) => {
          this.httpRequestStateMachine.handleFailedResponse(error);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
