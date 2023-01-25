import { CityType } from '../../../shared/types/city.type';
import { GeorgianCityValue } from '../../../shared/enums/georgian-city-value.enum';

export type GeorgianCitiesType = ReadonlyArray<CityType<GeorgianCityValue>>;
