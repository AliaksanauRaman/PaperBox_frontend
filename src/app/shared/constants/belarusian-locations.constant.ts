import { COUNTRIES } from './countries.constant';
import { BELARUSIAN_CITIES } from './belarusian-cities.constant';
import { LocationType } from '../types/location.type';
import { BelarusianCityValue } from '../enums/belarusian-city-value.enum';

const BELARUS = COUNTRIES[0];

// TODO: Move to util/factory/service
export const BELARUSIAN_LOCATIONS: ReadonlyArray<
  LocationType<BelarusianCityValue>
> = BELARUSIAN_CITIES.map((city) => ({
  country: BELARUS,
  city,
  value: `${BELARUS.value} ${city.value}`,
}));
