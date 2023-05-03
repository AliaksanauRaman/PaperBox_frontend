import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs';

import { GetPublishedHelpRequestsService } from '../../services/get-published-help-requests.service';
import { DeleteHelpRequestHttpService } from '../../services/delete-help-request-http.service';
import { ConfirmApplicationDeletionDialogService } from '../../../core/services/confirm-application-deletion-dialog.service';
import { ErrorNotificationService } from '../../../core/services/error-notification.service';
import { UserService } from '../../../shared/services/user.service';

import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';
import { SuccessResponseState } from '../../../shared/classes/success-response-state.class';

@Component({
  selector: 'app-help-requests-list',
  templateUrl: './help-requests-list.component.html',
  styleUrls: ['./help-requests-list.component.scss'],
  providers: [GetPublishedHelpRequestsService, DeleteHelpRequestHttpService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpRequestsListComponent
  extends DestroyEmitter
  implements OnInit, OnDestroy
{
  private readonly _deletedHelpRequestsIds$ = new BehaviorSubject<
    ReadonlyArray<number>
  >([]);

  protected readonly _templateContext$ = combineLatest([
    this._getPublishedHelpRequestsService.state$,
    this._deletedHelpRequestsIds$.asObservable(),
    this._userService.value$,
  ]).pipe(
    map(([state, deletedHelpRequestsIds, user]) => {
      if (state.data !== null) {
        return {
          getPublishedHelpRequests: new SuccessResponseState(
            state.data.filter(
              (item) => !deletedHelpRequestsIds.includes(item.id)
            )
          ),
          deletedHelpRequestsIds,
          user,
        };
      }

      return {
        getPublishedHelpRequests: state,
        deletedHelpRequestsIds,
        user,
      };
    })
  );

  protected _deletingHelpRequestId: number | null = null;

  constructor(
    private readonly _getPublishedHelpRequestsService: GetPublishedHelpRequestsService,
    private readonly _deleteHelpRequestHttpService: DeleteHelpRequestHttpService,
    private readonly _confirmApplicationDeletionDialogService: ConfirmApplicationDeletionDialogService,
    private readonly _errorNotificationService: ErrorNotificationService,
    private readonly _userService: UserService,
    private readonly _cdRef: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this._getPublishedHelpRequestsService.performRequest();
    this.subToDeleteHelpRequestStateChanges();
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._getPublishedHelpRequestsService.destroyRequest();
    this._deleteHelpRequestHttpService.destroyRequest();
  }

  protected handleReloadClick(): void {
    this._getPublishedHelpRequestsService.performRequest();
  }

  protected handleHelpOfferListItemDeleteClick(helpOfferId: number): void {
    this._confirmApplicationDeletionDialogService
      .openDialog()
      .pipe(
        filter((isConfirmed) => isConfirmed),
        tap(() => {
          this._deletingHelpRequestId = helpOfferId;
          this._deleteHelpRequestHttpService.performRequest(helpOfferId);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private subToDeleteHelpRequestStateChanges(): void {
    this._deleteHelpRequestHttpService.state$
      .pipe(
        tap((state) => {
          if (state.data !== null) {
            if (this._deletingHelpRequestId === null) {
              throw new Error('Deleting help request id cannot be null!');
            }

            this._deletedHelpRequestsIds$.next([
              ...this._deletedHelpRequestsIds$.getValue(),
              this._deletingHelpRequestId,
            ]);
            this._deletingHelpRequestId = null;
          } else if (state.error !== null) {
            this._errorNotificationService.showMessage(
              'error.unknownApplicationDeleteError'
            );
            this._deletingHelpRequestId = null;
            this._cdRef.markForCheck();
          }
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
