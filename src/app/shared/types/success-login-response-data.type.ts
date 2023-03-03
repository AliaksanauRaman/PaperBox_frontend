import { UserRole } from '../enums/user-role.enum';
import { PhoneType } from './phone.type';

export type SuccessLoginResponseDataType = Readonly<{
  token: string;
  id: string;
  role: UserRole;
  phone: PhoneType;
}>;
