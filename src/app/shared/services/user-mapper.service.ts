import { Injectable, inject } from '@angular/core';

import { JWT_TOKEN_DECODER } from '../../core/services/jwt-token-decoder';

import { UserType } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserMapperService {
  private readonly _jwtTokenDecoder = inject(JWT_TOKEN_DECODER);

  public fromUserTokenToUser(userTokenValue: string): UserType {
    const decodedUserToken = this._jwtTokenDecoder.decode(userTokenValue);
    const {
      id,
      sub: email,
      permissions: [{ authority: role }],
    } = decodedUserToken.getData();
    return { id, email, role, valid: !decodedUserToken.isExpired() };
  }
}
