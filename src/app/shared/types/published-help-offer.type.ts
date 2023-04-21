import { PhoneType } from './phone.type';

export type PublishedHelpOfferType = Readonly<{
  id: number;
  userId: number;
  publicId: string;
  locationFrom: string;
  locationTo: string;
  comment: string;
  fullName: string;
  phones: ReadonlyArray<PhoneType>;
  startDate: Date;
  endDate: Date | null;
}>;
