import { MutableFullUserListType } from '../types/full-user.type';

export class UsersEmailFilter {
  public static filter(
    email: string,
    users: MutableFullUserListType
  ): MutableFullUserListType {
    return users.filter((user) => user.email.toLowerCase().includes(email));
  }
}
