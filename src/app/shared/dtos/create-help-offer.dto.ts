import { PhoneType } from '../types/phone.type';

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
  private readonly locationFrom: string;
  private readonly locationTo: string;
  private readonly startDate: Date;
  private readonly endDate: Date | null;
  private readonly comment: string;
  private readonly fullName: string;
  private readonly phones: ReadonlyArray<PhoneType>;

  constructor(
    locationFrom: string | null,
    locationTo: string | null,
    startDate: Date | null,
    endDate: Date | null,
    comment: string | null,
    fullName: string | null,
    phones: ReadonlyArray<PhoneType> | null
  ) {
    if (locationFrom === null) {
      throw new Error('Location from cannot be null!');
    }

    if (locationTo === null) {
      throw new Error('Location to cannot be null!');
    }

    if (startDate === null) {
      throw new Error('Start date cannot be null!');
    }

    if (comment === null) {
      throw new Error('Comment cannot be null!');
    }

    if (fullName === null) {
      throw new Error('Full name cannot be null!');
    }

    if (phones === null) {
      throw new Error('Phones cannot be null!');
    }

    this.locationFrom = locationFrom;
    this.locationTo = locationTo;
    this.startDate = startDate;
    this.endDate = endDate;
    this.comment = comment;
    this.fullName = fullName;
    this.phones = phones;
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
