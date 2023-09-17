import { Country } from './country';
import { City } from './city';
import { DataSourceOption } from '@shared/classes/data-source-option.class';

export class Place {
  public static fromOption(option: DataSourceOption<string>): Place {
    const [cityLabel, countryLabel] = option.label.split(', ');
    const [countryId, cityId] = option.value.split(' ');
    return new Place(
      new Country(Number(countryId), countryLabel),
      new City(Number(cityId), Number(countryId), cityLabel)
    );
  }

  public static null(): Place {
    return new Place(Country.null(), City.null());
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
}
