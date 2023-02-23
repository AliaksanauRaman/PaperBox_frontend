import { HttpRequestServiceBase } from './http-request-service-base.class';
import { AppEventUnion } from '../../events/app-event.union';

export abstract class HttpPostRequestServiceBase<
  T,
  O
> extends HttpRequestServiceBase<T> {
  public abstract buildMakeRequestEvent(createDto: O): AppEventUnion;

  public makeRequest(createDto: O): void {
    this.httpRequestStateMachine.handleMakeRequest();
    this.eventBusService.emit(this.buildMakeRequestEvent(createDto));
  }
}
