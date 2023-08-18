import { Injectable, inject } from '@angular/core';
import {
  Selector,
  Action,
  Actions,
  State,
  StateContext,
  Store,
  ofAction,
} from '@ngxs/store';
import { Observable, catchError, takeUntil, tap } from 'rxjs';

import { HelpOffersHttpService } from '@core/services/help-offers-http.service';

import {
  ErrorState,
  InitialState,
  LoadingState,
  ValueState,
} from '@shared/classes/async-data.class';
import { ListOfPublishedHelpOffersType } from '@shared/types/list-of-published-help-offers.type';
import { PublishedHelpOffersStateModel } from './model';
import { PublishedHelpOffers } from './actions';

type StateModel = PublishedHelpOffersStateModel;

@State<StateModel>({
  name: 'publishedHelpOffers',
  defaults: new InitialState(),
})
@Injectable({
  providedIn: 'root',
})
export class PublishedHelpOffersState {
  private readonly _store = inject(Store);
  private readonly _actions$ = inject(Actions);
  private readonly _helpOffersHttpService = inject(HelpOffersHttpService);

  @Selector()
  public static stream(state: StateModel): StateModel {
    return state;
  }

  @Action(PublishedHelpOffers.Get, { cancelUncompleted: true })
  public getPublishedHelpOffers(
    context: StateContext<StateModel>
  ): Observable<ListOfPublishedHelpOffersType> {
    context.setState(new LoadingState());

    return this._helpOffersHttpService.getPublished().pipe(
      tap((listOfPublishedHelpOffers) =>
        this._store.dispatch(
          new PublishedHelpOffers.GetSuccess(listOfPublishedHelpOffers)
        )
      ),
      catchError((error: unknown) => {
        this._store.dispatch(new PublishedHelpOffers.GetFail(error));
        throw error;
      }),
      takeUntil(this._actions$.pipe(ofAction(PublishedHelpOffers.DestroyGet)))
    );
  }

  @Action(PublishedHelpOffers.GetSuccess)
  public getPublishedHelpOffersSuccess(
    context: StateContext<StateModel>,
    action: PublishedHelpOffers.GetSuccess
  ): void {
    context.setState(new ValueState(action.listOfPublishedHelpOffers));
  }

  @Action(PublishedHelpOffers.GetFail)
  public getPublishedHelpOffersFail(
    context: StateContext<StateModel>,
    action: PublishedHelpOffers.GetFail
  ): void {
    context.setState(new ErrorState(action.error));
  }

  @Action(PublishedHelpOffers.Prepend)
  public prependPublishedHelpOffer(
    context: StateContext<StateModel>,
    action: PublishedHelpOffers.Prepend
  ): void {
    const state = context.getState();
    const newValue =
      state.value === null
        ? [action.publishedHelpOffer]
        : [action.publishedHelpOffer, ...state.value];

    context.setState(new ValueState(newValue));
  }
}
