import { PhoneListType } from '../../shared/types/phone-list.type';

export type FullHelpRequestType = Readonly<{
  id: string;
  publicId: string;
  locationFrom: string;
  locationTo: string;
  startDate: Date;
  endDate: Date | null;
  comment: string;
  fullName: string;
  phones: PhoneListType;
  // TODO: ?
  // createdAt: Date;
  // updatedAt: Date;
}>;
