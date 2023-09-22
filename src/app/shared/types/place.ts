import { Country } from './country';
import { City } from './city';
import { Comparable } from '@shared/interfaces/comparable';
import { DataSourceOption } from '@shared/classes/data-source-option.class';

export class Place implements Comparable<Place> {
  public static fromOption(option: DataSourceOption<string>): Place {
    const [cityLabel, countryLabel] = option.label.split(', ');
    const [countryId, cityId] = option.value.split(' ');
    return new Place(
      new Country(Number(countryId), countryLabel),
      new City(Number(cityId), cityLabel)
    );
  }

  public static is(value: unknown): value is Place {
    return value instanceof Place;
  }

  constructor(public readonly country: Country, public readonly city: City) {}

  public getId(): number {
    return this.getCityId();
  }

  public getCountryId(): number {
    return this.country.id;
  }

  public getCountryLabel(): string {
    return this.country.label;
  }

  public getCityId(): number {
    return this.city.id;
  }

  public getCityLabel(): string {
    return this.city.label;
  }

  public equalsTo(place: Place): boolean {
    return (
      this.country.equalsTo(place.country) && this.city.equalsTo(place.city)
    );
  }
}
