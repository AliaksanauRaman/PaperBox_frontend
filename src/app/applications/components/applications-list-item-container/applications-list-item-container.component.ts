import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Injector,
  OnDestroy,
  Output,
} from '@angular/core';
import { takeUntil, tap, filter } from 'rxjs';

import { DeleteHelpOfferStateService } from '../../services/delete-help-offer-state.service';
import { DeleteHelpRequestStateService } from '../../services/delete-help-request-state.service';
import {
  DELETE_APPLICATION_STATE_SERVICE,
  DeleteApplicationStateService,
} from '../../dependencies/delete-application-state-service';
import {
  APPLICATION_TYPE,
  ApplicationType,
} from '../../dependencies/application-type';
import { ConfirmApplicationDeletionDialogService } from '../../../core/services/confirm-application-deletion-dialog.service';
import { ErrorNotificationService } from '../../../core/services/error-notification.service';

import { ApplicationsListItemComponent } from '../applications-list-item/applications-list-item.component';

import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';

@Component({
  selector: 'app-applications-list-item-container',
  templateUrl: './applications-list-item-container.component.html',
  styleUrls: ['./applications-list-item-container.component.scss'],
  providers: [
    DeleteHelpOfferStateService,
    DeleteHelpRequestStateService,
    {
      provide: DELETE_APPLICATION_STATE_SERVICE,
      useFactory: deleteApplicationStateServiceFactory,
      deps: [APPLICATION_TYPE, Injector],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsListItemContainerComponent
  extends DestroyEmitter
  implements AfterContentInit, OnDestroy
{
  @Output()
  public readonly delete = new EventEmitter<number>();

  @ContentChild(ApplicationsListItemComponent)
  private readonly _applicationsListItem?: ApplicationsListItemComponent;

  constructor(
    @Inject(DELETE_APPLICATION_STATE_SERVICE)
    private readonly _deleteApplication: DeleteApplicationStateService,
    private readonly _confirmApplicationDeletionDialogService: ConfirmApplicationDeletionDialogService,
    private readonly _errorNotificationService: ErrorNotificationService
  ) {
    super();
  }

  public ngAfterContentInit(): void {
    this._applicationsListItem!.deleteClick.pipe(
      tap(this.handleApplicationDeleteClick.bind(this)),
      takeUntil(this.destroy$)
    ).subscribe();

    this._deleteApplication.state$
      .pipe(
        tap((state) => {
          if (state.error !== null) {
            this._applicationsListItem!.deletionInProgress = false;
            this._errorNotificationService.showMessage(
              'error.unknownApplicationDeleteError'
            );
          } else if (state.data !== null) {
            this.delete.emit(state.data.id);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._deleteApplication.destroyRequest();
  }

  private handleApplicationDeleteClick(applicationId: number): void {
    this._confirmApplicationDeletionDialogService
      .openDialog()
      .pipe(
        filter((isConfirmed): isConfirmed is true => isConfirmed),
        tap(() => {
          this._applicationsListItem!.deletionInProgress = true;
          this._deleteApplication.performRequest(applicationId);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}

function deleteApplicationStateServiceFactory(
  type: ApplicationType,
  injector: Injector
): DeleteApplicationStateService {
  if (type === ApplicationType.HELP_OFFER) {
    return injector.get(DeleteHelpOfferStateService);
  }

  if (type === ApplicationType.HELP_REQUEST) {
    return injector.get(DeleteHelpRequestStateService);
  }

  throw new Error(`Application type '${type}' is unknown!`);
}
