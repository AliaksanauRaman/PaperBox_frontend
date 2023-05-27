import { FullUserStatus } from '../enums/full-user-status.enum';

export const FULL_USER_STATUS_LIST: ReadonlyArray<FullUserStatus> = [
  FullUserStatus.ACTIVE,
  FullUserStatus.INACTIVE,
  FullUserStatus.BLOCKED,
];
