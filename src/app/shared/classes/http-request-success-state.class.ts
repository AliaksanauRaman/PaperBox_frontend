import { HttpRequestStateName } from '../enums/http-request-state-name.enum';

export class HttpRequestSuccessState<T> {
  public readonly name = HttpRequestStateName.SUCCESS as const;
  public readonly data: T;
  public readonly error = null;

  constructor(data: T) {
    this.data = data;
  }
}
