import { AppEventName } from './app-event-name.enum';

export interface AppEvent<T = null> {
  readonly name: AppEventName;
  readonly payload: T;
}
