import { Observable } from 'rxjs';

import { HttpRequestBaseService } from './http-request-base-service.class';

export abstract class HttpRequestWithParamsBaseService<
  T,
  ParamsType
> extends HttpRequestBaseService<T> {
  protected abstract doRequest(params: ParamsType): Observable<T>;

  public performRequest(params: ParamsType): void {
    this.httpRequestStateMachine.handleMakeRequest();
    this.handleRequest(this.doRequest(params));
  }
}
