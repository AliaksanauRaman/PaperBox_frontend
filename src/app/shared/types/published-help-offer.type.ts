import { PhoneType } from './phone.type';

export type PublishedHelpOfferType = Readonly<{
  id: string;
  publicId: string;
  locationFrom: string;
  locationTo: string;
  comment: string;
  fullName: string;
  phones: ReadonlyArray<PhoneType>;
  startDate: string;
  endDate: string | null;
}>;
