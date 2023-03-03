import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationHttpService } from './authentication-http.service';

import { HttpRequestWithParamsBaseService } from '../abstracts/http-request-with-params-base-service.class';
import { SuccessLoginResponseDataType } from '../types/success-login-response-data.type';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class LoginService extends HttpRequestWithParamsBaseService<
  SuccessLoginResponseDataType,
  LoginDto
> {
  constructor(
    private readonly authenticationHttpService: AuthenticationHttpService
  ) {
    super();
  }

  public doRequest(
    loginDto: LoginDto
  ): Observable<SuccessLoginResponseDataType> {
    return this.authenticationHttpService.authenticate(
      loginDto.phone,
      loginDto.password
    );
  }
}
