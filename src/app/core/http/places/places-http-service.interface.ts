import { Observable } from 'rxjs';

import { Place } from '@shared/types/place';

export interface PlacesHttpServiceInterface {
  getPlaces(): Observable<ReadonlyArray<Place>>;
}
