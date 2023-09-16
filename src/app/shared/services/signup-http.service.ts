import { Injectable, inject } from '@angular/core';
import { HttpParams, HttpStatusCode } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Observable, map } from 'rxjs';

import { HttpService } from '@shared/abstracts/http-service.class';
import { SignupDto } from '../dtos/signup.dto';
import { SuccessSignupResponseDataType } from '../types/success-signup-response-data.type';
import { LocalizationsState } from '@store/localizations';

@Injectable({
  providedIn: 'root',
})
export class SignupHttpService extends HttpService {
  private readonly _store = inject(Store);

  public signup(
    signUpDto: SignupDto
  ): Observable<SuccessSignupResponseDataType> {
    const currentLocalization = this._store.selectSnapshot(
      LocalizationsState.current
    );
    return this._httpClient
      .post<null>(`${this._apiUrl}/api/registration`, signUpDto, {
        params: new HttpParams().append('lang', currentLocalization.language),
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
