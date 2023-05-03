import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  BehaviorSubject,
  map,
  tap,
  combineLatest,
  takeUntil,
  filter,
} from 'rxjs';

import { GetPublishedHelpOffersService } from '../../services/get-published-help-offers.service';
import { DeleteHelpOfferHttpService } from '../../services/delete-help-offer-http.service';
import { ConfirmApplicationDeletionDialogService } from '../../../core/services/confirm-application-deletion-dialog.service';
import { ErrorNotificationService } from '../../../core/services/error-notification.service';
import { UserService } from '../../../shared/services/user.service';

import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';
import { SuccessResponseState } from '../../../shared/classes/success-response-state.class';

@Component({
  selector: 'app-help-offers-list',
  templateUrl: './help-offers-list.component.html',
  styleUrls: ['./help-offers-list.component.scss'],
  providers: [GetPublishedHelpOffersService, DeleteHelpOfferHttpService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpOffersListComponent
  extends DestroyEmitter
  implements OnInit, OnDestroy
{
  private readonly _deletedHelpOffersIds$ = new BehaviorSubject<
    ReadonlyArray<number>
  >([]);

  protected readonly _templateContext$ = combineLatest([
    this._getPublishedHelpOffersService.state$,
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
    private readonly _getPublishedHelpOffersService: GetPublishedHelpOffersService,
    private readonly _deleteHelpOfferHttpService: DeleteHelpOfferHttpService,
    private readonly _confirmApplicationDeletionDialogService: ConfirmApplicationDeletionDialogService,
    private readonly _errorNotificationService: ErrorNotificationService,
    private readonly _userService: UserService,
    private readonly _cdRef: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this._getPublishedHelpOffersService.performRequest();
    this.subToDeleteHelpOfferStateChanges();
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._getPublishedHelpOffersService.destroyRequest();
    this._deleteHelpOfferHttpService.destroyRequest();
  }

  protected handleReloadClick(): void {
    this._getPublishedHelpOffersService.performRequest();
  }

  protected handleHelpOfferListItemDeleteClick(helpOfferId: number): void {
    this._confirmApplicationDeletionDialogService
      .openDialog()
      .pipe(
        filter((isConfirmed) => isConfirmed),
        tap(() => {
          this._deletingHelpOfferId = helpOfferId;
          this._deleteHelpOfferHttpService.performRequest(helpOfferId);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private subToDeleteHelpOfferStateChanges(): void {
    this._deleteHelpOfferHttpService.state$
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
