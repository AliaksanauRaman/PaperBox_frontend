import { Comparable } from '@shared/interfaces/comparable';

export class City implements Comparable<City> {
  constructor(public readonly id: number, public readonly label: string) {}

  public equalsTo(city: City): boolean {
    return this.id === city.id && this.label === city.label;
  }
}
