import { Nullish } from './nullish';
import { DiallingCode } from './dialling-code';

export class Phone extends Nullish {
  public static nullish(): Phone {
    return new Phone(DiallingCode.nullish(), '', true);
  }

  public static is(value: unknown): value is Phone {
    return value instanceof Phone;
  }

  public static equals(phone1: Phone, phone2: Phone): boolean {
    return (
      phone1.number === phone2.number &&
      DiallingCode.equals(phone1.diallingCode, phone2.diallingCode)
    );
  }

  constructor(
    public readonly diallingCode: DiallingCode,
    public readonly number: string,
    isNullish = false
  ) {
    super(isNullish);
  }

  public toMap() {
    return {
      diallingCode: this.diallingCode,
      number: this.number,
    };
  }
}
