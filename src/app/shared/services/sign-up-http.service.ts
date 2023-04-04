import { AppLanguagesService } from './../../core/services/app-languages.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../dependencies/api-url';

import { SignUpDto } from '../dtos/sign-up.dto';
import { SuccessLogInResponseDataType } from '../types/success-log-in-response-data.type';

@Injectable({
  providedIn: 'root',
})
export class SignUpHttpService {
  constructor(
    @Inject(API_URL)
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient,
    private readonly languagesService: AppLanguagesService
  ) {}

  public signUp(
    signUpDto: SignUpDto
  ): Observable<SuccessLogInResponseDataType> {
    const params = new HttpParams();
    params.append('lang', this.languagesService.currentLanguage.value);
    return this.httpClient.post<SuccessLogInResponseDataType>(
      `${this.apiUrl}/api/registration`,
      signUpDto,
      { params }
    );
  }
}
