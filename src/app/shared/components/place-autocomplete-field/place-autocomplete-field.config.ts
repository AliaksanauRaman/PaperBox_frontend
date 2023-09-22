import { Place } from '@shared/types/place';

export enum PlaceAutocompleteFieldStateType {
  INITIAL = 'initial',
  PLACES_SET = 'places-set',
  WRITE_NULL = 'write-null',
  WRITE_PLACE = 'write-place',
  PLACE_SELECTION = 'place-selection',
  FIELD_INPUT = 'field-input',
  CLEAR_SELECTION = 'clear-selection',
}

export class PlaceAutocompleteFieldState {
  constructor(
    public readonly type: PlaceAutocompleteFieldStateType,
    public readonly fieldValue: string,
    public readonly selectedPlace: Place | null,
    public readonly filteredPlaces: ReadonlyArray<Place>,
    public readonly isClearShown: boolean
  ) {}
}
