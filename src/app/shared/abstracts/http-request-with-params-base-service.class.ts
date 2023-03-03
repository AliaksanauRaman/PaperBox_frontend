import { Observable } from 'rxjs';

import { HttpRequestBaseService } from './http-request-base-service.class';

export abstract class HttpRequestWithParamsBaseService<
  SuccessResponseDataType,
  ParamsType
> extends HttpRequestBaseService<SuccessResponseDataType> {
  protected abstract doRequest(
    params: ParamsType
  ): Observable<SuccessResponseDataType>;

  public performRequest(params: ParamsType): void {
    this.httpRequestStateMachine.handleMakeRequest();
    this.handleRequest(this.doRequest(params));
  }
}
