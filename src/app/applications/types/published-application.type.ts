import { PhoneListType } from '../../shared/types/phone.type';

export type PublishedApplicationType = Readonly<{
  id: number;
  userId: number;
  publicId: string;
  locationFrom: string;
  locationTo: string;
  comment: string;
  fullName: string;
  phones: PhoneListType;
  startDate: Date;
  endDate: Date | null;
}>;
export type PublishedApplicationListType =
  ReadonlyArray<PublishedApplicationType>;
