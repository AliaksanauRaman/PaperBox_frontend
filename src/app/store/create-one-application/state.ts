import { Injectable, inject } from '@angular/core';
import {
  Action,
  Actions,
  Selector,
  State,
  StateContext,
  ofAction,
} from '@ngxs/store';
import { Observable, map, tap, catchError, takeUntil } from 'rxjs';

import { HelpRequestsHttpService } from '@core/services/help-requests-http.service';

import { CreateOneApplicationStateModel } from './model';
import {
  CreateOneApplication,
  CreateOneApplicationFail,
  CreateOneApplicationSuccess,
  DestroyCreateOneApplication,
  ResetCreateOneApplication,
} from './actions';
import {
  ErrorState,
  InitialState,
  LoadingState,
  ValueState,
} from '@shared/classes/async-data.class';
import { PublishedHelpRequest } from '@shared/models/published-help-request.model';
import { toDisableable } from '@shared/utils/to-disableable.util';
import { PublishedHelpRequests } from '@store/published-help-requests';

type StateModel = CreateOneApplicationStateModel;

@State<StateModel>({
  name: 'createOneApplication',
  defaults: new InitialState(),
})
@Injectable({
  providedIn: 'root',
})
export class CreateOneApplicationState {
  private readonly _applicationsHttpService = inject(HelpRequestsHttpService);
  private readonly _actions$ = inject(Actions);

  @Selector()
  public static stream(state: StateModel): StateModel {
    return state;
  }

  @Action(CreateOneApplication, { cancelUncompleted: true })
  public createOneApplication(
    context: StateContext<StateModel>,
    action: CreateOneApplication
  ): Observable<PublishedHelpRequest> {
    context.setState(new LoadingState());

    return this._applicationsHttpService
      .createOne(action.createApplicationDto)
      .pipe(
        map((entity) => toDisableable(entity)),
        tap((application) =>
          context.dispatch(new CreateOneApplicationSuccess(application))
        ),
        catchError((error: unknown) => {
          context.dispatch(new CreateOneApplicationFail(error));
          throw error;
        }),
        takeUntil(this._actions$.pipe(ofAction(DestroyCreateOneApplication)))
      );
  }

  @Action(CreateOneApplicationSuccess)
  public createOneApplicationSuccess(
    context: StateContext<StateModel>,
    action: CreateOneApplicationSuccess
  ): void {
    context.setState(new ValueState(action.createdApplication));
    context.dispatch(
      new PublishedHelpRequests.PrependOne(action.createdApplication)
    );
  }

  @Action(CreateOneApplicationFail)
  public createOneApplicationFail(
    context: StateContext<StateModel>,
    action: CreateOneApplicationFail
  ): void {
    context.setState(new ErrorState(action.error));
  }

  @Action(ResetCreateOneApplication)
  public resetCreateOneApplication(context: StateContext<StateModel>): void {
    context.setState(new InitialState());
  }
}
