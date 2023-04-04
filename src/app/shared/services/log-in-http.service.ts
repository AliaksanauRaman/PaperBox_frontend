import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../dependencies/api-url';

import { LogInDto } from '../dtos/log-in.dto';
import { SuccessLogInResponseDataType } from '../types/success-log-in-response-data.type';

@Injectable({
  providedIn: 'root',
})
export class LogInHttpService {
  constructor(
    @Inject(API_URL)
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public logIn(loginDto: LogInDto): Observable<SuccessLogInResponseDataType> {
    return this.httpClient.post<SuccessLogInResponseDataType>(
      `${this.apiUrl}/api/login`,
      loginDto
    );
  }
}
