import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';

import { UserTokenEntityService } from './user-token-entity.service';
import { UserMapperService } from './user-mapper.service';

import { NullableUserType, UserType } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _value$ = new BehaviorSubject<NullableUserType>(null);
  public readonly value$ = this._value$.asObservable();

  private readonly _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public readonly isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(
    private readonly _userTokenEntityService: UserTokenEntityService,
    private readonly _userMapperService: UserMapperService
  ) {}

  public setUp(): void {
    this.subToUserEntityChanges();
    this.subToUserChanges();
  }

  public getValueOrNull(): NullableUserType {
    return this._value$.getValue();
  }

  public getValue(): UserType {
    const value = this.getValueOrNull();

    if (value === null) {
      throw new Error('An instance of UserType is expected!');
    }

    return value;
  }

  public isLoggedIn(): boolean {
    return this._isLoggedIn$.getValue();
  }

  private subToUserEntityChanges(): void {
    this._userTokenEntityService.value$
      .pipe(
        map((userTokenEntity) =>
          this._userMapperService.toUser(userTokenEntity)
        ),
        tap((user) => this._value$.next(user))
      )
      .subscribe();
  }

  private subToUserChanges(): void {
    this._value$
      .pipe(
        map((user) => this.isUserLoggedIn(user)),
        tap((userIsLoggedIn) => this._isLoggedIn$.next(userIsLoggedIn))
      )
      .subscribe();
  }

  private isUserLoggedIn(user: NullableUserType): boolean {
    return user !== null && user.valid;
  }
}
