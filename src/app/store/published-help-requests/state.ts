import { Injectable, inject } from '@angular/core';
import {
  Selector,
  Action,
  State,
  StateContext,
  Store,
  Actions,
  ofAction,
} from '@ngxs/store';
import { Observable, catchError, takeUntil, map, tap, finalize } from 'rxjs';

import { HelpRequestsHttpService } from '@core/services/help-requests-http.service';

import {
  AsyncData,
  ErrorState,
  InitialState,
  LoadingState,
  ValueState,
} from '@shared/classes/async-data.class';
import { ListOfPublishedHelpRequests } from '@shared/models/published-help-request.model';
import { DeleteHelpRequestResponseDataType } from '@shared/types/delete-help-request-response-data.type';
import { toDisableable } from '@shared/utils/to-disableable.util';
import { disable } from '@shared/utils/disable.util';
import { enable } from '@shared/utils/enable.util';
import { PublishedHelpRequestsStateModel } from './model';
import { PublishedHelpRequests } from './actions';

type StateModel = PublishedHelpRequestsStateModel;

@State<StateModel>({
  name: 'publishedHelpRequests',
  defaults: {
    get: new InitialState(),
    deleteOne: new InitialState(),
  },
})
@Injectable({
  providedIn: 'root',
})
export class PublishedHelpRequestsState {
  private readonly _store = inject(Store);
  private readonly _actions$ = inject(Actions);
  private readonly _helpRequestsHttpService = inject(HelpRequestsHttpService);

  @Selector()
  public static get(state: StateModel): AsyncData<ListOfPublishedHelpRequests> {
    return state.get;
  }

  @Action(PublishedHelpRequests.Get, { cancelUncompleted: true })
  public getPublishedHelpRequests(
    context: StateContext<StateModel>
  ): Observable<ListOfPublishedHelpRequests> {
    context.setState({
      ...context.getState(),
      get: new LoadingState(),
    });

    return this._helpRequestsHttpService.getPublished().pipe(
      map((listOfEntities) => listOfEntities.map(toDisableable)),
      tap((listOfPublishedHelpRequests) => {
        this._store.dispatch(
          new PublishedHelpRequests.GetSuccess(listOfPublishedHelpRequests)
        );
      }),
      catchError((error: unknown) => {
        this._store.dispatch(new PublishedHelpRequests.GetFail(error));
        throw error;
      }),
      takeUntil(this._actions$.pipe(ofAction(PublishedHelpRequests.DestroyGet)))
    );
  }

  @Action(PublishedHelpRequests.GetSuccess)
  public getPublishedHelpRequestsSuccess(
    context: StateContext<StateModel>,
    action: PublishedHelpRequests.GetSuccess
  ): void {
    context.setState({
      ...context.getState(),
      get: new ValueState(action.listOfPublishedHelpRequests),
    });
  }

  @Action(PublishedHelpRequests.GetFail)
  public getPublishedHelpRequestsFail(
    context: StateContext<StateModel>,
    action: PublishedHelpRequests.GetFail
  ): void {
    context.setState({
      ...context.getState(),
      get: new ErrorState(action.error),
    });
  }

  @Action(PublishedHelpRequests.DeleteOne, { cancelUncompleted: true })
  public deleteOnePublishedHelpRequest(
    context: StateContext<StateModel>,
    action: PublishedHelpRequests.DeleteOne
  ): Observable<DeleteHelpRequestResponseDataType> {
    context.setState({
      ...context.getState(),
      deleteOne: new LoadingState(),
    });

    this._store.dispatch(
      new PublishedHelpRequests.DisableOne(action.helpRequestId)
    );

    return this._helpRequestsHttpService.deleteOne(action.helpRequestId).pipe(
      tap((responseData) =>
        this._store.dispatch(
          new PublishedHelpRequests.DeleteOneSuccess(responseData.id)
        )
      ),
      catchError((error: unknown) => {
        this._store.dispatch(new PublishedHelpRequests.DeleteOneFail(error));
        throw error;
      }),
      finalize(() => {
        this._store.dispatch(
          new PublishedHelpRequests.EnableOne(action.helpRequestId)
        );
      }),
      takeUntil(
        this._actions$.pipe(ofAction(PublishedHelpRequests.DestroyDeleteOne))
      )
    );
  }

  @Action(PublishedHelpRequests.DeleteOneSuccess)
  public deleteOnePublishedHelpRequestSuccess(
    context: StateContext<StateModel>,
    action: PublishedHelpRequests.DeleteOneSuccess
  ): void {
    const state = context.getState();
    const previousValue = state.get.value;

    if (previousValue === null) {
      this.throwTheListMustBeDefinedError();
    }

    const newValue = previousValue.filter(
      (helpOffer) => helpOffer.id !== action.deletedHelpRequestId
    );

    context.setState({
      ...state,
      get: new ValueState(newValue),
      deleteOne: new ValueState(action.deletedHelpRequestId),
    });
  }

  @Action(PublishedHelpRequests.DeleteOneFail)
  public deleteOnePublishedHelpRequestFail(
    context: StateContext<StateModel>,
    action: PublishedHelpRequests.DeleteOneFail
  ): void {
    context.setState({
      ...context.getState(),
      deleteOne: new ErrorState(action.error),
    });
  }

  @Action(PublishedHelpRequests.PrependOne)
  public prependOnePublishedHelpRequest(
    context: StateContext<StateModel>,
    action: PublishedHelpRequests.PrependOne
  ): void {
    const state = context.getState();
    const previousValue = state.get.value;

    if (previousValue === null) {
      this.throwTheListMustBeDefinedError();
    }

    const newValue = [action.publishedHelpRequest, ...previousValue];

    context.setState({
      ...state,
      get: new ValueState(newValue),
    });
  }

  @Action(PublishedHelpRequests.DisableOne)
  public disableOnePublishedHelpRequest(
    context: StateContext<StateModel>,
    action: PublishedHelpRequests.DisableOne
  ): void {
    const state = context.getState();
    const previousValue = state.get.value;

    if (previousValue === null) {
      this.throwTheListMustBeDefinedError();
    }

    const newValue = previousValue.map((helpRequest) => {
      if (helpRequest.id === action.helpRequestIdToDisable) {
        return disable(helpRequest);
      }

      return helpRequest;
    });

    context.setState({
      ...state,
      get: new ValueState(newValue),
    });
  }

  @Action(PublishedHelpRequests.EnableOne)
  public enableOnePublishedHelpRequest(
    context: StateContext<StateModel>,
    action: PublishedHelpRequests.EnableOne
  ): void {
    const state = context.getState();
    const previousValue = state.get.value;

    if (previousValue === null) {
      this.throwTheListMustBeDefinedError();
    }

    const newValue = previousValue.map((helpRequest) => {
      if (helpRequest.id === action.helpRequestIdToEnable) {
        return enable(helpRequest);
      }

      return helpRequest;
    });

    context.setState({
      ...state,
      get: new ValueState(newValue),
    });
  }

  private throwTheListMustBeDefinedError(): never {
    throw new Error(
      'The list of published help requests must be defined at this point!'
    );
  }
}
