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
  AsyncData,
  ErrorState,
  InitialState,
  LoadingState,
  ValueState,
} from '@shared/classes/async-data.class';
import { ListOfPublishedHelpOffersType } from '@shared/types/list-of-published-help-offers.type';
import { DeleteHelpOfferResponseDataType } from '@shared/types/delete-help-offer-response-data.type';
import { PublishedHelpOffersStateModel } from './model';
import { PublishedHelpOffers } from './actions';

type StateModel = PublishedHelpOffersStateModel;

@State<StateModel>({
  name: 'publishedHelpOffers',
  defaults: {
    get: new InitialState(),
    deleteOne: new InitialState(),
  },
})
@Injectable({
  providedIn: 'root',
})
export class PublishedHelpOffersState {
  private readonly _store = inject(Store);
  private readonly _actions$ = inject(Actions);
  private readonly _helpOffersHttpService = inject(HelpOffersHttpService);

  @Selector()
  public static get(
    state: StateModel
  ): AsyncData<ListOfPublishedHelpOffersType> {
    return state.get;
  }

  @Action(PublishedHelpOffers.Get, { cancelUncompleted: true })
  public getPublishedHelpOffers(
    context: StateContext<StateModel>
  ): Observable<ListOfPublishedHelpOffersType> {
    context.setState({
      ...context.getState(),
      get: new LoadingState(),
    });

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
    context.setState({
      ...context.getState(),
      get: new ValueState(action.listOfPublishedHelpOffers),
    });
  }

  @Action(PublishedHelpOffers.GetFail)
  public getPublishedHelpOffersFail(
    context: StateContext<StateModel>,
    action: PublishedHelpOffers.GetFail
  ): void {
    context.setState({
      ...context.getState(),
      get: new ErrorState(action.error),
    });
  }

  @Action(PublishedHelpOffers.DeleteOne, { cancelUncompleted: true })
  public deleteOnePublishedHelpOffer(
    context: StateContext<StateModel>,
    action: PublishedHelpOffers.DeleteOne
  ): Observable<DeleteHelpOfferResponseDataType> {
    context.setState({
      ...context.getState(),
      deleteOne: new LoadingState(),
    });

    return this._helpOffersHttpService.deleteOne(action.helpOfferId).pipe(
      tap((responseData) =>
        this._store.dispatch(
          new PublishedHelpOffers.DeleteOneSuccess(responseData.id)
        )
      ),
      catchError((error: unknown) => {
        this._store.dispatch(new PublishedHelpOffers.DeleteOneFail(error));
        throw error;
      }),
      takeUntil(
        this._actions$.pipe(ofAction(PublishedHelpOffers.DestroyDeleteOne))
      )
    );
  }

  @Action(PublishedHelpOffers.DeleteOneSuccess)
  public deleteOnePublishedHelpOfferSuccess(
    context: StateContext<StateModel>,
    action: PublishedHelpOffers.DeleteOneSuccess
  ): void {
    const state = context.getState();
    const newValue = state.get.value!.filter(
      (item) => item.id !== action.deletedHelpOfferId
    );

    context.setState({
      ...state,
      get: new ValueState(newValue),
      deleteOne: new ValueState(action.deletedHelpOfferId),
    });
  }

  @Action(PublishedHelpOffers.DeleteOneFail)
  public deleteOnePublishedHelpOfferFail(
    context: StateContext<StateModel>,
    action: PublishedHelpOffers.DeleteOneFail
  ): void {
    context.setState({
      ...context.getState(),
      deleteOne: new ErrorState(action.error),
    });
  }

  @Action(PublishedHelpOffers.Prepend)
  public prependPublishedHelpOffer(
    context: StateContext<StateModel>,
    action: PublishedHelpOffers.Prepend
  ): void {
    const state = context.getState();
    const newValue =
      state.get.value === null
        ? [action.publishedHelpOffer]
        : [action.publishedHelpOffer, ...state.get.value];

    context.setState({
      ...state,
      get: new ValueState(newValue),
    });
  }
}
