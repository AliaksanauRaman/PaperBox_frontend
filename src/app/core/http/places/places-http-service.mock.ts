import { Observable, of } from 'rxjs';

import { PlacesHttpServiceInterface } from './places-http-service.interface';
import { Place } from '@shared/types/place';
import { Country } from '@shared/types/country';
import { City } from '@shared/types/city';

export class PlacesHttpServiceMock implements PlacesHttpServiceInterface {
  public getPlaces(): Observable<ReadonlyArray<Place>> {
    return of(MOCK_PLACES);
  }
}

const BELARUS = new Country(1, 'country.belarus');
const POLAND = new Country(2, 'country.poland');

const MINSK = new City(1, 'city.belarusian.minsk');
const WARSAW = new City(2, 'city.polish.warsaw');

const MOCK_PLACES = [new Place(BELARUS, MINSK), new Place(POLAND, WARSAW)];
