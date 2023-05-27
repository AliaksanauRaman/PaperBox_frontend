import { UserRole } from '../../shared/enums/user-role.enum';

export class UpdateFullUserRoleDto {
  constructor(public readonly role: UserRole) {}
}
