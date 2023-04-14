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
      default:
        return new Error('error.unknownLoginRequestError');
    }
  }
}
