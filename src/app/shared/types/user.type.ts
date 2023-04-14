import { UserRole } from '../enums/user-role.enum';

export type UserType = Readonly<{
  id: number;
  email: string;
  role: UserRole;
  valid: boolean;
}>;
export type NullableUserType = UserType | null;
