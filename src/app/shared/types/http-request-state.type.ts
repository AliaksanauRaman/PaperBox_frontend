export type HttpRequestState<T = unknown> =
  | HttpRequestInitialState
  | HttpRequestSuccessState<T>
  | HttpRequestFailState
  | HttpRequestInProgressState;

export type HttpRequestInitialState = Readonly<{
  data: null;
  error: null;
  inProgress: false;
}>;

export type HttpRequestSuccessState<T> = Readonly<{
  data: T;
  error: null;
  inProgress: false;
}>;

export type HttpRequestFailState = Readonly<{
  data: null;
  error: unknown;
  inProgress: false;
}>;

export type HttpRequestInProgressState = Readonly<{
  data: null;
  error: null;
  inProgress: true;
}>;
