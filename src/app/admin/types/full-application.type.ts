import { PhoneType } from '../../shared/types/phone.type';
import { FullApplicationStatus } from '../enums/full-application-status.enum';

export type FullApplicationType = Readonly<{
  id: number;
  userId: number;
  locationFrom: string;
  locationTo: string;
  comment: string;
  fullName: string;
  phones: ReadonlyArray<PhoneType>;
  startDate: Date;
  endDate: Date | null;
  status: FullApplicationStatus;
}>;
export type FullApplicationListType = ReadonlyArray<FullApplicationType>;
