import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginHttpService } from './login-http.service';

import { HttpRequestWithParamsBaseService } from '../abstracts/http-request-with-params-base-service.class';
import { SuccessLoginResponseDataType } from '../types/success-login-response-data.type';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class LoginService extends HttpRequestWithParamsBaseService<
  SuccessLoginResponseDataType,
  LoginDto
> {
  constructor(private readonly loginHttpService: LoginHttpService) {
    super();
  }

  public doRequest(
    logInDto: LoginDto
  ): Observable<SuccessLoginResponseDataType> {
    return this.loginHttpService.login(logInDto);
  }
}
