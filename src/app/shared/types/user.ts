import { UserRole } from '@shared/enums/user-role.enum';

export class User {
  public static buildMockAdmin(): User {
    return new User(-1, 'mock.admin@gmail.com', UserRole.ADMIN, true);
  }

  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly role: UserRole,
    public readonly valid: boolean
  ) {}
}
