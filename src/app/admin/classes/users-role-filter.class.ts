import { MutableFullUserListType } from '../types/full-user.type';

export class UsersRoleFilter {
  public static filter(
    role: string,
    users: MutableFullUserListType
  ): MutableFullUserListType {
    if (role === '') {
      return users;
    }

    return users.filter((user) => user.role === role);
  }
}
