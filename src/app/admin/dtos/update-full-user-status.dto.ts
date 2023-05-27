import { FullUserStatus } from '../enums/full-user-status.enum';

export class UpdateFullUserStatusDto {
  constructor(public readonly status: FullUserStatus) {}
}
