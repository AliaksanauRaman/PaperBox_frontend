import { Injectable } from '@angular/core';
import { HttpParams, HttpStatusCode } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { HttpService } from '@shared/abstracts/http-service.class';
import { ConfirmUserResponseDataType } from '../../shared/types/confirm-user-response-data.type';

@Injectable({
  providedIn: 'root',
})
export class ConfirmUserHttpService extends HttpService {
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
          console.error(error);

          return of({ ok: false });
        })
      );
  }
}
