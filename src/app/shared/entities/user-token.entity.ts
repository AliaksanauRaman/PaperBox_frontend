import jwt_decode from 'jwt-decode';

import { DecodedUserTokenType } from '../types/decoded-user-token.type';

export class UserTokenEntity {
  public get userToken(): string {
    return this._userToken;
  }

  public get decodedUserToken(): DecodedUserTokenType {
    if (this._decodedUserToken === null) {
      throw new Error('User token is not decoded!');
    }

    return this._decodedUserToken;
  }

  public get expired(): boolean {
    return this.decodedUserToken.exp < Date.now() / 1000;
  }

  private _decodedUserToken: DecodedUserTokenType | null = null;

  constructor(private readonly _userToken: string) {}

  public decode(): void {
    this._decodedUserToken = jwt_decode<DecodedUserTokenType>(this._userToken);
  }
}

export type NullableUserTokenEntity = UserTokenEntity | null;
