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

  public static createFromPhoneDiallingCodes(
    phoneDiallingCodes: ReadonlyArray<string>
  ): DataSource<string> {
    const options = phoneDiallingCodes.map((code) => ({
      label: code,
      value: code,
    }));

    return new DataSource(options);
  }

  public static createEmpty<T = unknown>(): DataSource<T> {
    return new DataSource([]);
  }

  constructor(public readonly options: ReadonlyArray<DataSourceOption<T>>) {}

  public getOptionsValues(): ReadonlyArray<T> {
    return this.options.map(({ value }) => value);
  }

  public getOptionByValue(optionValue: T): DataSourceOption<T> {
    const foundOption = this.options.find(({ value }) => value === optionValue);

    if (foundOption === undefined) {
      throw new Error(`Option with value '${optionValue}' was not found!`);
    }

    return foundOption;
  }

  // TODO: Probably is not needed
  public getOptionByLabel(optionLabel: string): DataSourceOption<T> {
    const foundOption = this.options.find(({ label }) => label === optionLabel);

    if (foundOption === undefined) {
      throw new Error(`Option with label '${optionLabel}' was not found!`);
    }

    return foundOption;
  }
}
