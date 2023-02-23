import { HttpRequestServiceBase } from './http-request-service-base.class';
import { AppEventUnion } from '../../events/app-event.union';

export abstract class HttpGetRequestServiceBase<
  T
> extends HttpRequestServiceBase<T> {
  public abstract buildMakeRequestEvent(): AppEventUnion;

  public makeRequest(): void {
    this.httpRequestStateMachine.handleMakeRequest();
    this.eventBusService.emit(this.buildMakeRequestEvent());
  }
}
