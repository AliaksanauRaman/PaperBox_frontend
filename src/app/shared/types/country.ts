export class Country {
  public static null(): Country {
    return new Country(-1, 'Unknown country');
  }

  constructor(public readonly id: number, public readonly label: string) {}
}
