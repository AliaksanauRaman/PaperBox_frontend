import { Comparable } from '@shared/interfaces/comparable';
import { DiallingCode } from './dialling-code';

export class Phone implements Comparable<Phone> {
  public static is(value: unknown): value is Phone {
    return value instanceof Phone;
  }

  constructor(
    public readonly diallingCode: DiallingCode | null,
    public readonly number: string
  ) {}

  public equalsTo(phone: Phone): boolean {
    if (this.number !== phone.number) {
      return false;
    }

    if (this.diallingCode === null && phone.diallingCode === null) {
      return true;
    }

    if (this.diallingCode !== null && phone.diallingCode !== null) {
      return this.diallingCode.equalsTo(phone.diallingCode);
    }

    return false;
  }

  public toMap() {
    return {
      diallingCode: this.diallingCode,
      number: this.number,
    };
  }
}
