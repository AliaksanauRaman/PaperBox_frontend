import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import {
  BehaviorSubject,
  map,
  tap,
  combineLatest,
  takeUntil,
  filter,
} from 'rxjs';

import {
  GET_PUBLISHED_APPLICATIONS_STATE_SERVICE,
  GetPublishedApplicationsStateService,
} from '../../dependencies/get-published-applications-state-service';
import {
  DELETE_APPLICATION_STATE_SERVICE,
  DeleteApplicationStateService,
} from '../../dependencies/delete-application-state-service';
import { ConfirmApplicationDeletionDialogService } from '../../../core/services/confirm-application-deletion-dialog.service';
import { ErrorNotificationService } from '../../../core/services/error-notification.service';
import { UserService } from '../../../shared/services/user.service';

import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';
import { SuccessResponseState } from '../../../shared/classes/success-response-state.class';

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
  private readonly _deletedHelpOffersIds$ = new BehaviorSubject<
    ReadonlyArray<number>
  >([]);

  protected readonly _templateContext$ = combineLatest([
    this._getPublishedApplications.state$,
    this._deletedHelpOffersIds$.asObservable(),
    this._userService.value$,
  ]).pipe(
    map(([state, deletedHelpOffersIds, user]) => {
      if (state.data !== null) {
        return {
          getPublishedHelpOffers: new SuccessResponseState(
            state.data.filter((item) => !deletedHelpOffersIds.includes(item.id))
          ),
          deletedHelpOffersIds,
          user,
        };
      }

      return {
        getPublishedHelpOffers: state,
        deletedHelpOffersIds,
        user,
      };
    })
  );

  protected _deletingHelpOfferId: number | null = null;

  constructor(
    @Inject(GET_PUBLISHED_APPLICATIONS_STATE_SERVICE)
    private readonly _getPublishedApplications: GetPublishedApplicationsStateService,
    @Inject(DELETE_APPLICATION_STATE_SERVICE)
    private readonly _deleteApplication: DeleteApplicationStateService,
    private readonly _confirmApplicationDeletionDialogService: ConfirmApplicationDeletionDialogService,
    private readonly _errorNotificationService: ErrorNotificationService,
    private readonly _userService: UserService,
    private readonly _cdRef: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this._getPublishedApplications.performRequest();
    this.subToDeleteHelpOfferStateChanges();
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._getPublishedApplications.destroyRequest();
    this._deleteApplication.destroyRequest();
  }

  protected handleReloadClick(): void {
    this._getPublishedApplications.performRequest();
  }

  protected handleHelpOfferListItemDeleteClick(helpOfferId: number): void {
    this._confirmApplicationDeletionDialogService
      .openDialog()
      .pipe(
        filter((isConfirmed) => isConfirmed),
        tap(() => {
          this._deletingHelpOfferId = helpOfferId;
          this._deleteApplication.performRequest(helpOfferId);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private subToDeleteHelpOfferStateChanges(): void {
    this._deleteApplication.state$
      .pipe(
        tap((state) => {
          if (state.data !== null) {
            if (this._deletingHelpOfferId === null) {
              throw new Error('Deleting help offer id cannot be null!');
            }

            this._deletedHelpOffersIds$.next([
              ...this._deletedHelpOffersIds$.getValue(),
              this._deletingHelpOfferId,
            ]);
            this._deletingHelpOfferId = null;
          } else if (state.error !== null) {
            this._errorNotificationService.showMessage(
              'error.unknownApplicationDeleteError'
            );
            this._deletingHelpOfferId = null;
            this._cdRef.markForCheck();
          }
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
