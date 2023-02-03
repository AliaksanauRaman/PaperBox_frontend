import { Pipe, PipeTransform } from '@angular/core';

type DestructuredLocationLabel = Readonly<{
  countryName: string;
  cityName: string;
}>;

@Pipe({
  name: 'destructureLocationLabel',
  pure: true,
})
export class DestructureLocationLabelPipe implements PipeTransform {
  public transform(locationLabel: string): DestructuredLocationLabel {
    const [cityName, countryName] = locationLabel
      .split(',')
      .map((part) => part.trim());

    if (!cityName) {
      throw new Error(`No city name for '${locationLabel}' location label!`);
    }

    if (!countryName) {
      throw new Error(`No country name for '${locationLabel}' location label!`);
    }

    return {
      cityName,
      countryName,
    };
  }
}
