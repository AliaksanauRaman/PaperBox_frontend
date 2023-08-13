import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, filter, map, of } from 'rxjs';

import { ConfirmUserResponseDataType } from '../../shared/types/confirm-user-response-data.type';
import { isObject } from '../../shared/type-assertions/is-object.type-assertion';
import { isBoolean } from '../../shared/type-assertions/is-boolean.type-assertion';

@Injectable()
export class ConfirmUserPageService {
  private readonly _activatedRoute = inject(ActivatedRoute);

  public readonly userConfirmationState$ = this._activatedRoute.data.pipe(
    filter(this.isUserConfirmation.bind(this)),
    map(({ userConfirmation }) => userConfirmation),
    catchError((error) => {
      console.error(error);
      return of({ ok: false });
    })
  );

  private isUserConfirmation(
    value: unknown
  ): value is { userConfirmation: ConfirmUserResponseDataType } {
    if (
      isObject(value) &&
      isObject(value['userConfirmation']) &&
      isBoolean(value['userConfirmation']['ok'])
    ) {
      return true;
    }

    throw new Error('User confirmation is broken!');
  }
}
