import { DecodedUserTokenType } from '../types/decoded-user-token.type';

export class DecodedUserToken {
  constructor(private readonly _data: DecodedUserTokenType) {}

  public getData(): DecodedUserTokenType {
    return this._data;
  }

  public isExpired(): boolean {
    return this._data.exp < Date.now() / 1000;
  }
}
