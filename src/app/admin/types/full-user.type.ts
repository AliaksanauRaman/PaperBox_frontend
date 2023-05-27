import { UserRole } from '../../shared/enums/user-role.enum';
import { FullUserStatus } from '../enums/full-user-status.enum';

export type FullUserType = Readonly<{
  id: number;
  email: string;
  role: UserRole;
  status: FullUserStatus;
}>;
export type FullUserListType = ReadonlyArray<FullUserType>;
export type MutableFullUserListType = Array<FullUserType>;
