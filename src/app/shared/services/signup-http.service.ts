import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Observable, map } from 'rxjs';

import { API_URL } from '../dependencies/api-url';

import { SignupDto } from '../dtos/signup.dto';
import { SuccessSignupResponseDataType } from '../types/success-signup-response-data.type';
import { LocalizationsState } from '@store/localizations';

@Injectable({
  providedIn: 'root',
})
export class SignupHttpService {
  private readonly _store = inject(Store);

  constructor(
    @Inject(API_URL)
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public signup(
    signUpDto: SignupDto
  ): Observable<SuccessSignupResponseDataType> {
    const params = new HttpParams();
    const currentLocalization = this._store.selectSnapshot(
      LocalizationsState.current
    );
    return this.httpClient
      .post<null>(`${this.apiUrl}/api/registration`, signUpDto, {
        params: params.append('lang', currentLocalization.language),
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
