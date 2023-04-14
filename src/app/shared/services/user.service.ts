import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

import { UserTokenEntityService } from './user-token-entity.service';
import { UserMapperService } from './user-mapper.service';

import { NullableUserType } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public readonly user$ = this._userTokenEntityService.value$.pipe(
    map((userTokenEntity) => this._userMapperService.toUser(userTokenEntity)),
    tap((user) => (this._user = user))
  );
  public readonly userIsLoggedIn$ = this.user$.pipe(
    map((user) => this.isUserLoggedIn(user))
  );

  public get user(): NullableUserType {
    return this._user;
  }

  public get userIsLoggedIn(): boolean {
    return this.isUserLoggedIn(this.user);
  }

  private _user: NullableUserType = null;

  constructor(
    private readonly _userTokenEntityService: UserTokenEntityService,
    private readonly _userMapperService: UserMapperService
  ) {}

  private isUserLoggedIn(user: NullableUserType): boolean {
    return user !== null && user.valid;
  }
}
