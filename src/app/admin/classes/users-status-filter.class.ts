import { MutableFullUserListType } from '../types/full-user.type';

export class UsersStatusFilter {
  public static filter(
    status: string,
    users: MutableFullUserListType
  ): MutableFullUserListType {
    if (status === '') {
      return users;
    }

    return users.filter((user) => user.status === status);
  }
}
