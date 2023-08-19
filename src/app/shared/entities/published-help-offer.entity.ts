import { ListOfPhoneEntity } from './phone.entity';

export type PublishedHelpOfferEntity = Readonly<{
  id: number;
  userId: number;
  publicId: string;
  locationFrom: string;
  locationTo: string;
  comment: string;
  fullName: string;
  phones: ListOfPhoneEntity;
  startDate: Date;
  endDate: Date | null;
}>;
export type ListOfPublishedHelpOfferEntities =
  ReadonlyArray<PublishedHelpOfferEntity>;
