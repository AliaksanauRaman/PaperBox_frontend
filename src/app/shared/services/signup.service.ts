import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SignupHttpService } from './signup-http.service';

import { HttpRequestWithParamsBaseService } from '../abstracts/http-request-with-params-base-service.class';
import { SuccessSignupResponseDataType } from '../types/success-signup-response-data.type';
import { SignupDto } from '../dtos/signup.dto';

@Injectable()
export class SignupService extends HttpRequestWithParamsBaseService<
  SuccessSignupResponseDataType,
  SignupDto
> {
  constructor(private readonly signUpHttpService: SignupHttpService) {
    super();
  }

  public doRequest(
    signUpDto: SignupDto
  ): Observable<SuccessSignupResponseDataType> {
    return this.signUpHttpService.signup(signUpDto);
  }
}
