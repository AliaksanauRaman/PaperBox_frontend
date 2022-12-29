import { HttpErrorResponse } from "@angular/common/http";

import { HttpRequestStateName } from '../enums/http-request-state-name.enum';

export class HttpRequestFailureState {
  public readonly name = HttpRequestStateName.FAILURE as const;
  public readonly data = null;
  public readonly error: HttpErrorResponse;

  constructor(error: HttpErrorResponse) {
    this.error = error;
  }
}
