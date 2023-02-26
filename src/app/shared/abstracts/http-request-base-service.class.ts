import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, tap, catchError, of, takeUntil } from 'rxjs';

import { HttpRequestStateMachine } from '../classes/http-request-state-machine.class';

export abstract class HttpRequestBaseService<T> {
  protected readonly httpRequestStateMachine = new HttpRequestStateMachine<T>();
  public readonly state$ = this.httpRequestStateMachine.currentState$;
  private readonly destroy$ = new Subject<void>();

  protected abstract doRequest(): Observable<T>;

  public makeRequest(): void {
    this.httpRequestStateMachine.handleMakeRequest();

    this.doRequest()
      .pipe(
        tap((responseData) => {
          this.httpRequestStateMachine.handleSuccessResponse(responseData);
        }),
        catchError((responseError: HttpErrorResponse) => {
          this.httpRequestStateMachine.handleFailedResponse(responseError);
          return of(null);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public destroyRequest(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
