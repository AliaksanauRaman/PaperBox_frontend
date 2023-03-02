import { PhoneListType } from '../types/phone-list.type';
import { isPhoneValid } from '../utils/is-phone-valid.util';

export class CreateHelpRequestDto {
  public readonly phones: PhoneListType;

  constructor(
    public readonly locationFrom: string,
    public readonly locationTo: string,
    public readonly startDate: Date,
    public readonly endDate: Date | null,
    public readonly comment: string,
    public readonly fullName: string,
    phones: PhoneListType
  ) {
    const validPhones = phones.filter(isPhoneValid);

    if (validPhones.length === 0) {
      throw new Error('At least one valid phone must be provided!');
    }

    this.phones = validPhones;
  }
}
