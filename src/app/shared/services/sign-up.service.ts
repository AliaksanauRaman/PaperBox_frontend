import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SignUpHttpService } from './sign-up-http.service';

import { HttpRequestWithParamsBaseService } from '../abstracts/http-request-with-params-base-service.class';
import { SuccessSignUpResponseDataType } from '../types/success-sign-up-response-data.type';
import { SignUpDto } from '../dtos/sign-up.dto';

@Injectable()
export class SignUpService extends HttpRequestWithParamsBaseService<
  SuccessSignUpResponseDataType,
  SignUpDto
> {
  constructor(private readonly signUpHttpService: SignUpHttpService) {
    super();
  }

  public doRequest(
    signUpDto: SignUpDto
  ): Observable<SuccessSignUpResponseDataType> {
    return this.signUpHttpService.signUp(signUpDto);
  }
}
