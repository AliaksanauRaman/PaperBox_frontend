import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, takeUntil } from 'rxjs';

import { AppEventBusService, AppEventName } from '../../events';
import { HttpRequestStateMachine } from './../classes/http-request-state-machine.class';
import { DestroyEmitter } from './destroy-emitter.class';

@Injectable()
export abstract class HttpRequestServiceBase<
  SuccessResponseDataType
> extends DestroyEmitter {
  protected readonly httpRequestStateMachine =
    new HttpRequestStateMachine<SuccessResponseDataType>();

  public readonly state$ = this.httpRequestStateMachine.currentState$;

  constructor(protected readonly eventBusService: AppEventBusService) {
    super();

    this.subToSuccessResponse();
    this.subToFailedResponse();
  }

  public abstract get successResponseEventName(): AppEventName;
  public abstract get failedResponseEventName(): AppEventName;

  private subToSuccessResponse(): void {
    this.eventBusService
      .on<SuccessResponseDataType>(this.successResponseEventName)
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

  private subToFailedResponse(): void {
    this.eventBusService
      .on<HttpErrorResponse>(this.failedResponseEventName)
      .pipe(
        tap((error) => {
          this.httpRequestStateMachine.handleFailedResponse(error);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
