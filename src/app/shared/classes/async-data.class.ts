export type AsyncData<ValueType = unknown, ErrorType = unknown> =
  | InitialState
  | LoadingState
  | ValueState<ValueType>
  | ErrorState<ErrorType>;

export class InitialState {
  public readonly loading: false = false;
  public readonly value: null = null;
  public readonly error: null = null;
}

export class LoadingState {
  public readonly loading: true = true;
  public readonly value: null = null;
  public readonly error: null = null;
}

export class ValueState<T> {
  public readonly loading: false = false;
  public readonly error: null = null;

  constructor(public readonly value: T) {}
}

export class ErrorState<T> {
  public readonly loading: false = false;
  public readonly value: null = null;

  constructor(public readonly error: T) {}
}
