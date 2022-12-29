import { HttpRequestInitialState } from '../classes/http-request-initial-state.class';
import { HttpRequestSuccessState } from '../classes/http-request-success-state.class';
import { HttpRequestFailureState } from '../classes/http-request-failure-state.class';

export type HttpRequestStateType<T> =
  | HttpRequestInitialState
  | HttpRequestSuccessState<T>
  | HttpRequestFailureState;
