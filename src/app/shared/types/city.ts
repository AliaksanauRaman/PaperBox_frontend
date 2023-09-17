export class City {
  public static null(): City {
    return new City(-1, -1, 'Unknown city');
  }

  constructor(
    public readonly id: number,
    public readonly countryId: number,
    public readonly label: string
  ) {}
}
