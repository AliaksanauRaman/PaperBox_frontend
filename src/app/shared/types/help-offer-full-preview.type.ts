import { HelpOfferStatus } from "../enums/help-offer-status.enum";
import { DateRangeType } from "./date-range.type";
import { SpecificDateType } from "./specific-date.type";

export type HelpOfferFullPreviewType = Readonly<{
  id: string;
  authorFullName: string;
  countryFrom: string;
  countryTo: string;
  status: HelpOfferStatus;
  date: SpecificDateType | DateRangeType;
  createdAt: Date;
  lastModified: Date;
}>;
