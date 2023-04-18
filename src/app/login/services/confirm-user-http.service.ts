import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { API_URL } from '../../shared/dependencies/api-url';

import { ConfirmUserResponseDataType } from '../../shared/types/confirm-user-response-data.type';

@Injectable({
  providedIn: 'root',
})
export class ConfirmUserHttpService {
  constructor(
    @Inject(API_URL) private readonly _apiUrl: string,
    private readonly _httpClient: HttpClient
  ) {}

  public confirmUser(
    userToken: string
  ): Observable<ConfirmUserResponseDataType> {
    return this._httpClient
      .post<null>(
        `${this._apiUrl}/api/registration/confirm`,
        {},
        {
          params: new HttpParams().set('token', userToken),
          observe: 'response',
        }
      )
      .pipe(
        map((response) => {
          if (response.status === HttpStatusCode.Ok) {
            return { ok: true };
          }

          throw new Error('User confirmation failed!');
        }),
        catchError((error: unknown) => {
          console.error('Custom console error', error);

          return of({ ok: false });
        })
      );
  }
}
