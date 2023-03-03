import { Observable } from 'rxjs';

import { HttpRequestBaseService } from './http-request-base-service.class';

export abstract class HttpRequestWithoutParamsBaseService<
  SuccessResponseDataType
> extends HttpRequestBaseService<SuccessResponseDataType> {
  protected abstract doRequest(): Observable<SuccessResponseDataType>;

  public performRequest(): void {
    this.httpRequestStateMachine.handleMakeRequest();
    this.handleRequest(this.doRequest());
  }
}
