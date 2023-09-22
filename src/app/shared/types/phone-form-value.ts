import { DiallingCode } from './dialling-code';
import { Phone } from './phone';

type RawPhoneFormValue = Partial<{
  diallingCode: DiallingCode | null;
  number: string;
}>;

export class PhoneFormValue {
  public static empty(): PhoneFormValue {
    return new PhoneFormValue({
      diallingCode: null,
      number: '',
    });
  }

  public readonly diallingCode?: DiallingCode | null;
  public readonly number?: string;

  constructor({ diallingCode, number }: RawPhoneFormValue) {
    this.diallingCode = diallingCode;
    this.number = number;
  }

  public toPhone(): Phone {
    return new Phone(this.diallingCode || null, this.number || '');
  }

  public toMap() {
    return {
      diallingCode: this.diallingCode || null,
      number: this.number || '',
    };
  }
}
