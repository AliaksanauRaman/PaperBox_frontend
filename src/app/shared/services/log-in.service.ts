import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LogInHttpService } from './log-in-http.service';

import { HttpRequestWithParamsBaseService } from '../abstracts/http-request-with-params-base-service.class';
import { SuccessLogInResponseDataType } from '../types/success-log-in-response-data.type';
import { LogInDto } from '../dtos/log-in.dto';

@Injectable()
export class LogInService extends HttpRequestWithParamsBaseService<
  SuccessLogInResponseDataType,
  LogInDto
> {
  constructor(private readonly logInHttpService: LogInHttpService) {
    super();
  }

  public doRequest(
    logInDto: LogInDto
  ): Observable<SuccessLogInResponseDataType> {
    return this.logInHttpService.logIn(logInDto);
  }
}
