import { HttpRequestStateName } from '../enums/http-request-state-name.enum';

export class HttpRequestInitialState {
  public readonly name = HttpRequestStateName.INITIAL as const;
  public readonly data = null;
  public readonly error = null;
}
