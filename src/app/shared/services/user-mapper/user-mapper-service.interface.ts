import { User } from '@shared/types/user';

export interface UserMapperServiceInterface {
  fromUserTokenToUser(userTokenValue: string): User;
}
