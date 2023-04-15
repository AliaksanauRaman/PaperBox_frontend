import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignupErrorFactory {
  public build(httpErrorResponse: HttpErrorResponse): Error {
    switch (httpErrorResponse.status) {
      case HttpStatusCode.Conflict:
        return new Error('error.userWithSuchEmailAlreadyExists');
      default:
        return new Error('error.unknownSignupRequestError');
    }
  }
}
