import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { API_URL } from '../dependencies/api-url';
import { AppLanguagesService } from '../../core/services/app-languages.service';

import { SignupDto } from '../dtos/signup.dto';
import { SuccessSignupResponseDataType } from '../types/success-signup-response-data.type';

@Injectable({
  providedIn: 'root',
})
export class SignupHttpService {
  constructor(
    @Inject(API_URL)
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient,
    private readonly languagesService: AppLanguagesService
  ) {}

  public signup(
    signUpDto: SignupDto
  ): Observable<SuccessSignupResponseDataType> {
    const params = new HttpParams();
    params.append('lang', this.languagesService.currentLanguage.value);
    return this.httpClient
      .post<null>(`${this.apiUrl}/api/registration`, signUpDto, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response.status === HttpStatusCode.Ok) {
            return { ok: true };
          }

          throw new Error('Unknown error');
        })
      );
  }
}
