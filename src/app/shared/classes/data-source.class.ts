import { LocationType } from '../types/location.type';
import { DataSourceOption } from './data-source-option.class';
import { buildLocationLabel } from '../utils/build-location-label.util';

// TODO: Refactor, make more OOP-like
export class DataSource<T = unknown> {
  public static createFromLocations(
    locations: ReadonlyArray<LocationType>
  ): DataSource<string> {
    const options = locations.map(
      ({ country, city, value }) =>
        new DataSourceOption(
          buildLocationLabel(country.label, city.label),
          value
        )
    );

    return new DataSource(options);
  }

  public static createEmpty<T = unknown>(): DataSource<T> {
    return new DataSource([]);
  }

  constructor(public readonly options: ReadonlyArray<DataSourceOption<T>>) {}
}
