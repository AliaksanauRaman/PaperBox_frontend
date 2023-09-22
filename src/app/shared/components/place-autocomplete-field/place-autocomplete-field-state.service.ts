import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  PlaceAutocompleteFieldState as State,
  PlaceAutocompleteFieldStateType as StateType,
} from './place-autocomplete-field.config';
import { Place } from '@shared/types/place';

const INITIAL_STATE = new State(StateType.INITIAL, '', null, [], false);

@Injectable()
export class PlaceAutocompleteFieldStateService {
  private _places: ReadonlyArray<Place> = [];
  private readonly _state$ = new BehaviorSubject<State>(INITIAL_STATE);

  public readonly state$ = this._state$.asObservable();

  public handlePlacesSet(places: ReadonlyArray<Place>): void {
    this._places = places;
    this._state$.next({
      ...this._state$.getValue(),
      type: StateType.PLACES_SET,
      filteredPlaces: places,
    });
  }

  public handleWriteNull(value: null): void {
    this._state$.next(
      new State(StateType.WRITE_NULL, '', value, this._places, false)
    );
  }

  public handleWritePlace(value: Place): void {
    this._state$.next(
      new State(
        StateType.WRITE_PLACE,
        this.buildPlaceLabel(value),
        value,
        [value],
        true
      )
    );
  }

  public handlePlaceSelection(place: Place): void {
    this._state$.next(
      new State(
        StateType.PLACE_SELECTION,
        this.buildPlaceLabel(place),
        place,
        [place],
        true
      )
    );
  }

  public handleFieldInput(fieldValue: string): void {
    if (fieldValue === '') {
      this._state$.next(this.buildEmptyFieldValueState(fieldValue));
      return;
    }

    const formattedFieldValue = fieldValue.toLowerCase();
    const nonEmptyValueParts = formattedFieldValue
      .split(' ')
      .filter((valuePart) => valuePart !== '');

    if (nonEmptyValueParts.length === 0) {
      this._state$.next(this.buildEmptyFieldValueState(fieldValue));
      return;
    }

    this._state$.next(
      new State(
        StateType.FIELD_INPUT,
        fieldValue,
        null,
        this._places.filter((place) => {
          const formattedPlaceLabels = [
            place.getCountryLabel().toLowerCase(),
            place.getCityLabel().toLowerCase(),
          ];
          return nonEmptyValueParts.every((part) => {
            return formattedPlaceLabels.some((label) => label.includes(part));
          });
        }),
        fieldValue !== ''
      )
    );
  }

  public handleClearSelection(): void {
    this._state$.next(
      new State(StateType.CLEAR_SELECTION, '', null, this._places, false)
    );
  }

  public checkIsEmit(stateType: StateType): boolean {
    return (
      stateType !== StateType.INITIAL &&
      stateType !== StateType.WRITE_NULL &&
      stateType !== StateType.WRITE_PLACE
    );
  }

  private buildEmptyFieldValueState(fieldValue: string): State {
    return new State(
      StateType.FIELD_INPUT,
      fieldValue,
      null,
      this._places,
      false
    );
  }

  private buildPlaceLabel(place: Place): string {
    return `${place.getCountryLabel()} ${place.getCityLabel()}`;
  }
}
