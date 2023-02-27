import { Observable } from 'rxjs';

import { HttpRequestBaseService } from './http-request-base-service.class';

export abstract class HttpRequestWithoutParamsBaseService<
  T
> extends HttpRequestBaseService<T> {
  protected abstract doRequest(): Observable<T>;

  public performRequest(): void {
    this.httpRequestStateMachine.handleMakeRequest();
    this.handleRequest(this.doRequest());
  }
}
