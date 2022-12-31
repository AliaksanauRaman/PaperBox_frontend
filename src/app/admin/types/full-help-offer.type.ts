import { HelpOfferStatus } from '../../shared/enums/help-offer-status.enum';
import { PhoneType } from '../../shared/types/phone.type';
import { SpecificDateType } from '../../shared/types/specific-date.type';
import { DateRangeType } from '../../shared/types/date-range.type';

export type FullHelpOfferType = Readonly<{
  id: string;
  authorFullName: string;
  countryFrom: string;
  cityFrom: string;
  countryTo: string;
  cityTo: string;
  status: HelpOfferStatus;
  phones: ReadonlyArray<PhoneType>;
  date: SpecificDateType | DateRangeType;
  createdAt: Date;
  lastModified: Date;
  comment: string;
}>;
