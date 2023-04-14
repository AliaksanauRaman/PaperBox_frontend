import { UserRole } from '../enums/user-role.enum';

export type DecodedUserTokenType = Readonly<{
  id: number;
  sub: string;
  permissions: ReadonlyArray<Readonly<{ authority: UserRole }>>;
  exp: number;
  iat: number;
}>;
export type NullableDecodedUserTokenType = DecodedUserTokenType | null;
