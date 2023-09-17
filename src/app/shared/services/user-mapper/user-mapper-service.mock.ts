import { UserMapperServiceInterface } from './user-mapper-service.interface';
import { User } from '@shared/types/user';

const MOCK_TOKEN = 'mockToken';

export class UserMapperServiceMock implements UserMapperServiceInterface {
  public fromUserTokenToUser(userTokenValue: string): User {
    if (userTokenValue === MOCK_TOKEN) {
      return User.buildMockAdmin();
    }

    throw new Error(
      `The '${MOCK_TOKEN}' value expected! Got: '${userTokenValue}'.`
    );
  }
}
