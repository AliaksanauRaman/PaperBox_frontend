import { UserRole } from '../../shared/enums/user-role.enum';
import { FullUserStatus } from '../enums/full-user-status.enum';

export type UsersFilterValueType = Readonly<{
  email: string;
  role: UserRole | '';
  status: FullUserStatus | '';
}>;
