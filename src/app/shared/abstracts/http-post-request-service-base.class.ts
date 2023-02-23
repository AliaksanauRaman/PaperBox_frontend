import { HttpRequestServiceBase } from './http-request-service-base.class';
import { AppEventUnion } from '../../events/app-event.union';

export abstract class HttpPostRequestServiceBase<
  SuccessResponseDataType,
  DtoType
> extends HttpRequestServiceBase<SuccessResponseDataType> {
  public makeRequest(createDto: DtoType): void {
    this.httpRequestStateMachine.handleMakeRequest();
    this.eventBusService.emit(this.buildMakeRequestEvent(createDto));
  }

  protected abstract buildMakeRequestEvent(createDto: DtoType): AppEventUnion;
}
