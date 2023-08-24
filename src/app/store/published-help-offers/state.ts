import { Injectable, inject } from '@angular/core';
import {
  Selector,
  Action,
  Actions,
  State,
  StateContext,
  ofAction,
} from '@ngxs/store';
import { Observable, catchError, finalize, map, takeUntil, tap } from 'rxjs';

import { HelpOffersHttpService } from '@core/services/help-offers-http.service';

import {
  AsyncData,
  ErrorState,
  InitialState,
  LoadingState,
  ValueState,
} from '@shared/classes/async-data.class';
import {
  ListOfPublishedHelpOffers,
  PublishedHelpOffer,
} from '@shared/models/published-help-offer.model';
import { DeleteHelpOfferResponseDataType } from '@shared/types/delete-help-offer-response-data.type';
import { toDisableable } from '@shared/utils/to-disableable.util';
import { disable } from '@shared/utils/disable.util';
import { enable } from '@shared/utils/enable.util';
import { PublishedHelpOffersStateModel } from './model';
import { PublishedHelpOffers } from './actions';

type StateModel = PublishedHelpOffersStateModel;

@State<StateModel>({
  name: 'publishedHelpOffers',
  defaults: {
    get: new InitialState(),
    deleteOne: new InitialState(),
    createOne: new InitialState(),
  },
})
@Injectable({
  providedIn: 'root',
})
export class PublishedHelpOffersState {
  private readonly _actions$ = inject(Actions);
  private readonly _helpOffersHttpService = inject(HelpOffersHttpService);

  @Selector()
  public static get(state: StateModel): AsyncData<ListOfPublishedHelpOffers> {
    return state.get;
  }

  @Selector()
  public static createOne(state: StateModel): AsyncData<PublishedHelpOffer> {
    return state.createOne;
  }

  @Action(PublishedHelpOffers.Get, { cancelUncompleted: true })
  public getPublishedHelpOffers(
    context: StateContext<StateModel>
  ): Observable<ListOfPublishedHelpOffers> {
    context.setState({
      ...context.getState(),
      get: new LoadingState(),
    });

    return this._helpOffersHttpService.getPublished().pipe(
      map((listOfEntities) => listOfEntities.map(toDisableable)),
      tap((listOfPublishedHelpOffers) =>
        context.dispatch(
          new PublishedHelpOffers.GetSuccess(listOfPublishedHelpOffers)
        )
      ),
      catchError((error: unknown) => {
        context.dispatch(new PublishedHelpOffers.GetFail(error));
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

  @Action(PublishedHelpOffers.CreateOne, { cancelUncompleted: true })
  public createOnePublishedHelpOffer(
    context: StateContext<StateModel>,
    action: PublishedHelpOffers.CreateOne
  ): Observable<PublishedHelpOffer> {
    context.setState({
      ...context.getState(),
      createOne: new LoadingState(),
    });

    return this._helpOffersHttpService
      .createOne(action.createHelpOfferDto)
      .pipe(
        map((entity) => toDisableable(entity)),
        tap((publishedHelpOffer) =>
          context.dispatch(
            new PublishedHelpOffers.CreateOneSuccess(publishedHelpOffer)
          )
        ),
        catchError((error: unknown) => {
          context.dispatch(new PublishedHelpOffers.CreateOneFail(error));
          throw error;
        }),
        takeUntil(
          this._actions$.pipe(ofAction(PublishedHelpOffers.DestroyCreateOne))
        )
      );
  }

  @Action(PublishedHelpOffers.CreateOneSuccess)
  public createOnePublishedHelpOfferSuccess(
    context: StateContext<StateModel>,
    action: PublishedHelpOffers.CreateOneSuccess
  ): void {
    context.setState({
      ...context.getState(),
      createOne: new ValueState(action.newHelpOffer),
    });

    context.dispatch(new PublishedHelpOffers.PrependOne(action.newHelpOffer));
  }

  @Action(PublishedHelpOffers.CreateOneFail)
  public createOnePublishedHelpOfferFail(
    context: StateContext<StateModel>,
    action: PublishedHelpOffers.CreateOneFail
  ): void {
    context.setState({
      ...context.getState(),
      createOne: new ErrorState(action.error),
    });
  }

  @Action(PublishedHelpOffers.ResetCreateOne)
  public resetCreateOnePublishedHelpOffer(
    context: StateContext<StateModel>
  ): void {
    context.setState({
      ...context.getState(),
      createOne: new InitialState(),
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

    context.dispatch(new PublishedHelpOffers.DisableOne(action.helpOfferId));

    return this._helpOffersHttpService.deleteOne(action.helpOfferId).pipe(
      tap((responseData) =>
        context.dispatch(
          new PublishedHelpOffers.DeleteOneSuccess(responseData.id)
        )
      ),
      catchError((error: unknown) => {
        context.dispatch(new PublishedHelpOffers.DeleteOneFail(error));
        throw error;
      }),
      finalize(() => {
        context.dispatch(new PublishedHelpOffers.EnableOne(action.helpOfferId));
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
    const previousValue = state.get.value;

    if (previousValue === null) {
      this.throwTheListMustBeDefinedError();
    }

    const newValue = previousValue.filter(
      (helpOffer) => helpOffer.id !== action.deletedHelpOfferId
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

  @Action(PublishedHelpOffers.PrependOne)
  public prependOnePublishedHelpOffer(
    context: StateContext<StateModel>,
    action: PublishedHelpOffers.PrependOne
  ): void {
    const state = context.getState();
    const previousValue = state.get.value;

    if (previousValue === null) {
      this.throwTheListMustBeDefinedError();
    }

    const newValue = [action.publishedHelpOffer, ...previousValue];

    context.setState({
      ...state,
      get: new ValueState(newValue),
    });
  }

  @Action(PublishedHelpOffers.DisableOne)
  public disableOnePublishedHelpOffer(
    context: StateContext<StateModel>,
    action: PublishedHelpOffers.DisableOne
  ): void {
    const state = context.getState();
    const previousValue = state.get.value;

    if (previousValue === null) {
      this.throwTheListMustBeDefinedError();
    }

    const newValue = previousValue.map((helpOffer) => {
      if (helpOffer.id === action.helpOfferIdToDisable) {
        return disable(helpOffer);
      }

      return helpOffer;
    });

    context.setState({
      ...state,
      get: new ValueState(newValue),
    });
  }

  @Action(PublishedHelpOffers.EnableOne)
  public enableOnePublishedHelpOffer(
    context: StateContext<StateModel>,
    action: PublishedHelpOffers.EnableOne
  ): void {
    const state = context.getState();
    const previousValue = state.get.value;

    if (previousValue === null) {
      this.throwTheListMustBeDefinedError();
    }

    const newValue = previousValue.map((helpOffer) => {
      if (helpOffer.id === action.helpOfferIdToEnable) {
        return enable(helpOffer);
      }

      return helpOffer;
    });

    context.setState({
      ...state,
      get: new ValueState(newValue),
    });
  }

  private throwTheListMustBeDefinedError(): never {
    throw new Error(
      'The list of published help offers must be defined at this point!'
    );
  }
}
