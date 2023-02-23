import { PhoneType } from '../types/phone.type';

type CreateHelpOfferRequestBodyType = Readonly<{
  locationFrom: string;
  locationTo: string;
  startDate: Date;
  endDate: Date;
  comment: string;
  fullName: string;
  phones: ReadonlyArray<PhoneType>;
}>;

export class CreateHelpOfferDto {
  constructor(
    private readonly locationFrom: string,
    private readonly locationTo: string,
    private readonly startDate: Date,
    private readonly endDate: Date,
    private readonly comment: string,
    private readonly fullName: string,
    private readonly phones: ReadonlyArray<PhoneType>
  ) {}

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
