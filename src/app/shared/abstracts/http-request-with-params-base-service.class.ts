import { Observable } from 'rxjs';

import { HttpRequestBaseService } from './http-request-base-service.class';

export abstract class HttpRequestWithParamsBaseService<
  T
> extends HttpRequestBaseService<T> {
  protected abstract doRequest<P>(params: P): Observable<T>;

  public performRequest<P>(params: P): void {
    this.httpRequestStateMachine.handleMakeRequest();
    this.handleRequest(this.doRequest(params));
  }
}
