import { Comparable } from '@shared/interfaces/comparable';

export class DiallingCode implements Comparable<DiallingCode> {
  public static is(value: unknown): value is DiallingCode {
    return value instanceof DiallingCode;
  }

  constructor(
    public readonly countryName: string,
    public readonly value: string
  ) {}

  public equalsTo(diallingCode: DiallingCode): boolean {
    return (
      this.countryName === diallingCode.countryName &&
      this.value === diallingCode.value
    );
  }
}
