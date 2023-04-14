import { Injectable } from '@angular/core';

import { NullableUserType } from '../types/user.type';
import { UserTokenEntity } from '../entities/user-token.entity';

@Injectable({
  providedIn: 'root',
})
export class UserMapperService {
  public toUser(userTokenEntity: UserTokenEntity | null): NullableUserType {
    if (userTokenEntity === null) {
      return null;
    }

    const {
      id,
      sub: email,
      permissions: [{ authority: role }],
    } = userTokenEntity.decodedUserToken;
    return { id, email, role, valid: !userTokenEntity.expired };
  }
}
