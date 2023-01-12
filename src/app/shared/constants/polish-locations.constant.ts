import { LocationType } from '../types/location.type';
import { PolishCityValue } from '../enums/polish-city-value.enum';
import { COUNTRIES } from './countries.constant';
import { POLISH_CITIES } from './polish-cities.constant';

const POLAND = COUNTRIES[1];

// TODO: Move to util/factory/service
export const POLISH_LOCATIONS: ReadonlyArray<LocationType<PolishCityValue>> =
  POLISH_CITIES.map((city) => ({
    country: POLAND,
    city,
    value: `${POLAND.value} ${city.value}`,
  }));
