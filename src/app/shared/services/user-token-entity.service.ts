import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

import { UserTokenService } from './user-token.service';

import {
  NullableUserTokenEntity,
  UserTokenEntity,
} from '../entities/user-token.entity';

@Injectable({
  providedIn: 'root',
})
export class UserTokenEntityService {
  public readonly value$ = this._userTokenService.value$.pipe(
    map((userToken) => {
      if (userToken === null) {
        return null;
      }

      const entity = new UserTokenEntity(userToken);
      entity.decode();
      return entity;
    }),
    tap((userTokenEntity) => (this._value = userTokenEntity))
  );

  public get value(): NullableUserTokenEntity {
    return this._value;
  }

  private _value: NullableUserTokenEntity = null;

  constructor(private readonly _userTokenService: UserTokenService) {}
}
