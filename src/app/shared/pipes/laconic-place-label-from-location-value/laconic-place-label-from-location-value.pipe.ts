import { Inject, Pipe, PipeTransform } from '@angular/core';

import {
  COUNTRIES_MAP,
  CountriesMapType,
} from '../../../core/dependencies/countries-map';
import {
  ALL_CITIES,
  AllCitiesType,
} from '../../../core/dependencies/all-cities';
import { destructureLocationValue } from '../../utils/destructure-location-value.util';
import { isOtherCity } from '../../utils/is-other-city.util';

@Pipe({
  name: 'laconicPlaceLabelFromLocationValue',
})
export class LaconicPlaceLabelFromLocationValuePipe implements PipeTransform {
  constructor(
    @Inject(COUNTRIES_MAP)
    private readonly countriesMap: CountriesMapType,
    @Inject(ALL_CITIES)
    private readonly allCities: AllCitiesType
  ) {}

  public transform(locationValue: string): string {
    const { cityValueAsString, countryValueAsString } =
      destructureLocationValue(locationValue);

    const city = this.allCities.find(
      (city) => city.value === parseInt(cityValueAsString)
    );

    if (city === undefined) {
      throw new Error(`No city found by value: '${cityValueAsString}'!`);
    }

    if (!isOtherCity(city.value)) {
      return city.label;
    }

    const country = this.countriesMap.get(parseInt(countryValueAsString));

    if (country === undefined) {
      throw new Error(`No country found by value: '${countryValueAsString}'!`);
    }

    return country.label;
  }
}
