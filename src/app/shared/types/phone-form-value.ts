import { DiallingCode } from './dialling-code';
import { Phone } from './phone';

export class PhoneFormValue {
  constructor(
    public readonly diallingCode?: DiallingCode,
    public readonly number?: string
  ) {}

  public toPhone(): Phone {
    return new Phone(
      this.diallingCode || DiallingCode.nullish(),
      this.number || ''
    );
  }
}
