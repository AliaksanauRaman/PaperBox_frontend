import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { SuccessResponseState } from './success-response-state.class';

class InitialState {
  constructor(
    public readonly inProgress = false,
    public readonly data = null,
    public readonly error = null
  ) {}
}

class LoadingState {
  constructor(
    public readonly inProgress = true,
    public readonly data = null,
    public readonly error = null
  ) {}
}

class FailedResponseState {
  constructor(
    public readonly error: HttpErrorResponse,
    public readonly inProgress = false,
    public readonly data = null
  ) {}
}

export type HttpRequestState<T> =
  | InitialState
  | LoadingState
  | SuccessResponseState<T>
  | FailedResponseState;

export class HttpRequestStateMachine<T> {
  private readonly _currentState$ = new BehaviorSubject<HttpRequestState<T>>(
    new InitialState()
  );
  public readonly currentState$ = this._currentState$.asObservable();

  public handleMakeRequest(): void {
    this._currentState$.next(new LoadingState());
  }

  public handleSuccessResponse(responseData: T): void {
    this._currentState$.next(new SuccessResponseState(responseData));
  }

  public handleFailedResponse(responseError: HttpErrorResponse): void {
    this._currentState$.next(new FailedResponseState(responseError));
  }
}
