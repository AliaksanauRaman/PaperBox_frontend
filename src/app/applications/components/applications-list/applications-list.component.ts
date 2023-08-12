import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Inject,
  inject,
} from '@angular/core';
import { BehaviorSubject, map, combineLatest } from 'rxjs';

import {
  GET_PUBLISHED_APPLICATIONS_STATE_SERVICE,
  GetPublishedApplicationsStateService,
} from '../../dependencies/get-published-applications-state-service';
import { UserStateService } from '../../../state/user/user-state.service';

import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';
import { SuccessResponseState } from '../../../shared/classes/success-response-state.class';
import { PublishedApplicationType } from '../../types/published-application.type';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsListComponent
  extends DestroyEmitter
  implements OnInit, OnDestroy
{
  private readonly _userStateService = inject(UserStateService);

  private readonly _deletedApplicationsIds$ = new BehaviorSubject<
    ReadonlyArray<number>
  >([]);

  protected readonly _templateContext$ = combineLatest([
    this._getPublishedApplications.state$,
    this._deletedApplicationsIds$.asObservable(),
    this._userStateService.stream$,
  ]).pipe(
    map(([state, deletedApplicationsIds, user]) => {
      if (state.data !== null) {
        return {
          getPublishedApplications: new SuccessResponseState(
            state.data.filter(
              (item) => !deletedApplicationsIds.includes(item.id)
            )
          ),
          deletedApplicationsIds,
          user,
        };
      }

      return {
        getPublishedApplications: state,
        deletedApplicationsIds,
        user,
      };
    })
  );

  constructor(
    @Inject(GET_PUBLISHED_APPLICATIONS_STATE_SERVICE)
    private readonly _getPublishedApplications: GetPublishedApplicationsStateService
  ) {
    super();
  }

  public ngOnInit(): void {
    this._getPublishedApplications.performRequest();
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._getPublishedApplications.destroyRequest();
  }

  protected handleReloadClick(): void {
    this._getPublishedApplications.performRequest();
  }

  protected trackApplicationById(
    _index: number,
    application: PublishedApplicationType
  ): number {
    return application.id;
  }

  protected handleApplicationDelete(applicationId: number): void {
    this._deletedApplicationsIds$.next([
      ...this._deletedApplicationsIds$.getValue(),
      applicationId,
    ]);
  }
}
