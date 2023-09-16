import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '@shared/abstracts/http-service.class';
import { LoginDto } from '../dtos/login.dto';
import { SuccessLoginResponseDataType } from '../types/success-login-response-data.type';

@Injectable({
  providedIn: 'root',
})
export class LoginHttpService extends HttpService {
  public login(loginDto: LoginDto): Observable<SuccessLoginResponseDataType> {
    return this._httpClient.post<SuccessLoginResponseDataType>(
      `${this._apiUrl}/api/login`,
      loginDto
    );
  }
}
