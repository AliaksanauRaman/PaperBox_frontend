import { CreateHelpOfferDto } from "../dtos/create-help-offer.dto";
import { DateType } from "../enums/date-type.enum";
import { NewHelpOfferValidFormValueType } from "../types/new-help-offer-valid-form-value.type";

// TODO: Think
export class HelpOfferFactory {
  constructor(
    private readonly newHelpOfferFormValue: NewHelpOfferValidFormValueType,
  ) {}

  public buildCreateDto(): CreateHelpOfferDto {
    const date = this.newHelpOfferFormValue.dateType === DateType.SPECIFIC
      ? {
        type: this.newHelpOfferFormValue.dateType,
        specificDateAsString: this.newHelpOfferFormValue.specificDateAsString,
      } : {
        type: this.newHelpOfferFormValue.dateType,
        dateFromAsString: this.newHelpOfferFormValue.dateFromAsString,
        dateToAsString: this.newHelpOfferFormValue.dateToAsString,
      };

    return {
      authorFullName: this.newHelpOfferFormValue.authorFullName,
      countryFrom: this.newHelpOfferFormValue.countryFrom,
      cityFrom: this.newHelpOfferFormValue.cityFrom,
      countryTo: this.newHelpOfferFormValue.countryTo,
      cityTo: this.newHelpOfferFormValue.cityTo,
      date,
      phones: this.newHelpOfferFormValue.phones,
      comment: this.newHelpOfferFormValue.comment,
    };
  }
}
