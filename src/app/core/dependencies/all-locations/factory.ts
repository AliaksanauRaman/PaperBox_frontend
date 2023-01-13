import { CountriesMapType } from '../countries-map';
import { AllCitiesType } from '../all-cities';
import { AllLocationsType } from './type';
import { buildLocation } from '../../../shared/utils/build-location.util';

export const allLocationsFactory = (
  countriesMap: CountriesMapType,
  allCities: AllCitiesType
): AllLocationsType => {
  return allCities.map((city) => {
    const { countryValue } = city;
    const countryOfCity = countriesMap.get(countryValue);

    if (countryOfCity === undefined) {
      throw new Error(`Country with value '${countryValue}' does not exist!`);
    }

    return buildLocation(countryOfCity, city);
  });
};
