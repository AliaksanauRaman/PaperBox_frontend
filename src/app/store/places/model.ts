import { AsyncData } from '@shared/classes/async-data.class';
import { Place } from '@shared/types/place';

export type PlacesStateModel = AsyncData<ReadonlyArray<Place>>;
