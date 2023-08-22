import { ListOfPhoneEntities } from './phone.entity';

export type PublishedHelpRequestEntity = Readonly<{
  id: number;
  userId: number;
  publicId: string;
  locationFrom: string;
  locationTo: string;
  comment: string;
  fullName: string;
  phones: ListOfPhoneEntities;
  startDate: Date;
  endDate: Date | null;
}>;
export type ListOfPublishedHelpRequestEntities =
  ReadonlyArray<PublishedHelpRequestEntity>;
