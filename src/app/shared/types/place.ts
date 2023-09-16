import { Country } from './country';
import { City } from './city';

export class Place {
  constructor(public readonly country: Country, public readonly city: City) {}
}
