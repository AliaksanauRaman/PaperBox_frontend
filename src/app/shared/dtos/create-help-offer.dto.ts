import { PhoneType } from '../types/phone.type';

import { isPhoneValid } from '../utils/is-phone-valid.util';

type CreateHelpOfferRequestBodyType = Readonly<{
  locationFrom: string;
  locationTo: string;
  startDate: Date;
  endDate: Date | null;
  comment: string;
  fullName: string;
  phones: ReadonlyArray<PhoneType>;
}>;

export class CreateHelpOfferDto {
  private readonly phones: ReadonlyArray<PhoneType>;

  constructor(
    private readonly locationFrom: string,
    private readonly locationTo: string,
    private readonly startDate: Date,
    private readonly endDate: Date | null,
    private readonly comment: string,
    private readonly fullName: string,
    phones: ReadonlyArray<PhoneType>
  ) {
    this.phones = phones.filter(isPhoneValid);
  }

  public toRequestBody(): CreateHelpOfferRequestBodyType {
    return {
      locationFrom: this.locationFrom,
      locationTo: this.locationTo,
      startDate: this.startDate,
      endDate: this.endDate,
      comment: this.comment,
      fullName: this.fullName,
      phones: this.phones,
    };
  }
}
