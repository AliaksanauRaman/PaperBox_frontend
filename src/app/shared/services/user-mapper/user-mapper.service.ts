import { Injectable, inject } from '@angular/core';

import { DevModeService } from '@core/services/dev-mode.service';
import { JWT_TOKEN_DECODER } from '@core/services/jwt-token-decoder';

import { UserMapperServiceInterface } from './user-mapper-service.interface';
import { UserMapperServiceMock } from './user-mapper-service.mock';
import { User } from '@shared/types/user';

@Injectable({
  providedIn: 'root',
  useFactory: userMapperServiceFactory,
  deps: [DevModeService],
})
export class UserMapperService implements UserMapperServiceInterface {
  private readonly _jwtTokenDecoder = inject(JWT_TOKEN_DECODER);

  public fromUserTokenToUser(userTokenValue: string): User {
    const decodedUserToken = this._jwtTokenDecoder.decode(userTokenValue);
    const {
      id,
      sub: email,
      permissions: [{ authority: role }],
    } = decodedUserToken.getData();
    return new User(id, email, role, !decodedUserToken.isExpired());
  }
}

function userMapperServiceFactory(
  devModeService: DevModeService
): UserMapperServiceInterface {
  if (devModeService.isOn()) {
    return new UserMapperServiceMock();
  }

  return new UserMapperService();
}
