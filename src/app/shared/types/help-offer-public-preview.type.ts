import { DateRangeType } from "./date-range.type";
import { SpecificDateType } from "./specific-date.type";

export type HelpOfferPublicPreviewType = Readonly<{
  id: string;
  authorFullName: string;
  countryFrom: string;
  countryTo: string;
  date: SpecificDateType | DateRangeType;
}>;
