import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';

import { UserTokenService } from './user-token.service';

import {
  NullableUserTokenEntity,
  UserTokenEntity,
} from '../entities/user-token.entity';

@Injectable({
  providedIn: 'root',
})
export class UserTokenEntityService {
  private readonly _value$ = new BehaviorSubject<NullableUserTokenEntity>(null);
  public readonly value$ = this._value$.asObservable();

  constructor(private readonly _userTokenService: UserTokenService) {}

  public setUp(): void {
    this.subToUserTokenChanges();
  }

  public getValueOrNull(): NullableUserTokenEntity {
    return this._value$.getValue();
  }

  public getValue(): UserTokenEntity {
    const value = this.getValueOrNull();

    if (value === null) {
      throw new Error('An instance of UserTokenEntity is expected!');
    }

    return value;
  }

  private subToUserTokenChanges(): void {
    this._userTokenService.value$
      .pipe(
        map((userToken) => {
          if (userToken === null) {
            return null;
          }

          const entity = new UserTokenEntity(userToken);
          entity.decode();
          return entity;
        }),
        tap((userTokenEntity) => this._value$.next(userTokenEntity))
      )
      .subscribe();
  }
}
