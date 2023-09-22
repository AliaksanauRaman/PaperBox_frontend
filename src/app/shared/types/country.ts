import { Comparable } from '@shared/interfaces/comparable';

export class Country implements Comparable<Country> {
  constructor(public readonly id: number, public readonly label: string) {}

  public equalsTo(country: Country): boolean {
    return this.id === country.id && this.label === country.label;
  }
}
