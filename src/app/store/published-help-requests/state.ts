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
import { Observable, catchError, takeUntil, tap } from 'rxjs';

import { HelpRequestsHttpService } from '../../core/services/help-requests-http.service';

import { PublishedHelpRequestsStateModel } from './model';
import { PublishedHelpRequests } from './actions';
import { ListOfPublishedHelpRequestsType } from '../../shared/types/list-of-published-help-requests.type';

type StateModel = PublishedHelpRequestsStateModel;

@State<StateModel>({
  name: 'publishedHelpRequests',
  defaults: {
    data: null,
    error: null,
    inProgress: false,
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
  public static stream(state: StateModel): StateModel {
    return state;
  }

  @Action(PublishedHelpRequests.Get, { cancelUncompleted: true })
  public getPublishedHelpRequests(
    context: StateContext<StateModel>
  ): Observable<ListOfPublishedHelpRequestsType> {
    context.setState({
      data: null,
      error: null,
      inProgress: true,
    });

    return this._helpRequestsHttpService.getPublished().pipe(
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
      data: action.listOfPublishedHelpRequests,
      error: null,
      inProgress: false,
    });
  }

  @Action(PublishedHelpRequests.GetFail)
  public getPublishedHelpRequestsFail(
    context: StateContext<StateModel>,
    action: PublishedHelpRequests.GetFail
  ): void {
    context.setState({
      data: null,
      error: action.error,
      inProgress: false,
    });
  }

  @Action(PublishedHelpRequests.Prepend)
  public prependPublishedHelpRequest(
    context: StateContext<StateModel>,
    action: PublishedHelpRequests.Prepend
  ): void {
    const state = context.getState();

    context.setState({
      data:
        state.data === null
          ? [action.publishedHelpRequest]
          : [action.publishedHelpRequest, ...state.data],
      error: null,
      inProgress: false,
    });
  }
}
