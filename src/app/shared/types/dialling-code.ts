export class DiallingCode {
  public static is(value: unknown): value is DiallingCode {
    return value instanceof DiallingCode;
  }

  public static equals(code1: DiallingCode, code2: DiallingCode): boolean {
    return (
      code1.countryName === code2.countryName && code1.value === code2.value
    );
  }

  constructor(
    public readonly countryName: string,
    public readonly value: string
  ) {}
}
