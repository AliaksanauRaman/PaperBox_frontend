import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../dependencies/api-url';

import { PhoneType } from '../types/phone.type';
import { SuccessLoginResponseDataType } from '../types/success-login-response-data.type';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationHttpService {
  constructor(
    @Inject(API_URL)
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public authenticate(
    phone: PhoneType,
    password: string
  ): Observable<SuccessLoginResponseDataType> {
    return this.httpClient.post<SuccessLoginResponseDataType>(
      `${this.apiUrl}/api/login`,
      { phone, password }
    );
  }
}
