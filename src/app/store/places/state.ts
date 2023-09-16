import { Injectable, inject } from '@angular/core';
import { Action, Actions, State, StateContext, ofAction } from '@ngxs/store';
import { tap, catchError, takeUntil, Observable } from 'rxjs';

import { PlacesHttpService } from '@core/http/places/places-http.service';

import { PlacesStateModel } from './model';
import { DestroyGetPlaces, GetPlaces } from './actions';
import {
  ErrorState,
  InitialState,
  LoadingState,
  ValueState,
} from '@shared/classes/async-data.class';
import { Place } from '@shared/types/place';

type StateModel = PlacesStateModel;

@State<StateModel>({
  name: 'places',
  defaults: new InitialState(),
})
@Injectable({
  providedIn: 'root',
})
export class PlacesState {
  private readonly _placesHttpService = inject(PlacesHttpService);
  private readonly _actions$ = inject(Actions);

  @Action(GetPlaces, { cancelUncompleted: true })
  public getPlaces(
    context: StateContext<StateModel>
  ): Observable<ReadonlyArray<Place>> {
    context.setState(new LoadingState());

    return this._placesHttpService.getPlaces().pipe(
      tap((places) => context.setState(new ValueState(places))),
      catchError((error: unknown) => {
        context.setState(new ErrorState(error));
        throw error;
      }),
      takeUntil(this._actions$.pipe(ofAction(DestroyGetPlaces)))
    );
  }
}
