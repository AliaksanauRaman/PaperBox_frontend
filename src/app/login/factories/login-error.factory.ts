import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginErrorFactory {
  public build(httpErrorResponse: HttpErrorResponse): Error {
    switch (httpErrorResponse.status) {
      case HttpStatusCode.Unauthorized:
        return new Error('error.invalidCredentials');
      // For the future. Currently does not work
      case HttpStatusCode.Forbidden:
        return new Error('error.accountIsNotActivated');
      default:
        return new Error('error.unknownLoginRequestError');
    }
  }
}
