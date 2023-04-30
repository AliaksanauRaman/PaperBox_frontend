import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { catchError, map, tap, finalize, takeUntil } from 'rxjs';

import { AdminApplicationsHttpService } from '../../services/admin-applications-http.service';

import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';
import { FullApplicationType } from '../../types/full-application.type';
import { FullApplicationStatus } from '../../enums/full-application-status.enum';
import { FullApplicationList } from '../../classes/application-list.class';

@Component({
  selector: 'app-admin-help-requests-page',
  templateUrl: './admin-help-requests-page.component.html',
  styleUrls: ['../../styles/_admin-page-common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHelpRequestsPageComponent
  extends DestroyEmitter
  implements OnInit
{
  protected _loading = true;
  protected _allHelpRequests?: FullApplicationList;
  protected _getAllHelpRequestsError = false;

  constructor(
    private readonly _applicationsHttpService: AdminApplicationsHttpService,
    private readonly _cdRef: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this._applicationsHttpService
      .getAllHelpRequests()
      .pipe(
        map((allHelpRequests) => new FullApplicationList(allHelpRequests)),
        tap(
          (fullApplicationList) => (this._allHelpRequests = fullApplicationList)
        ),
        catchError((error: unknown) => {
          this._getAllHelpRequestsError = true;
          throw error;
        }),
        finalize(() => {
          this._loading = false;
          this._cdRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  protected handlePublishApplication(application: FullApplicationType): void {
    this.throwIfAllHelpRequestsAreUndefined();
    this._applicationsHttpService
      .updateHelpRequestStatus(application.id, FullApplicationStatus.PUBLISHED)
      .pipe(tap(() => this._allHelpRequests!.publishOne(application.id)))
      .subscribe();
  }

  protected handleUnpublishApplication(application: FullApplicationType): void {
    this.throwIfAllHelpRequestsAreUndefined();
    this._applicationsHttpService
      .updateHelpRequestStatus(
        application.id,
        FullApplicationStatus.UNPUBLISHED
      )
      .pipe(tap(() => this._allHelpRequests!.unpublishOne(application.id)))
      .subscribe();
  }

  protected handleRejectApplication(application: FullApplicationType): void {
    this.throwIfAllHelpRequestsAreUndefined();
    this._applicationsHttpService
      .updateHelpRequestStatus(application.id, FullApplicationStatus.REJECTED)
      .pipe(tap(() => this._allHelpRequests!.rejectOne(application.id)))
      .subscribe();
  }

  protected handleDeleteApplication(application: FullApplicationType): void {
    this.throwIfAllHelpRequestsAreUndefined();
    this._applicationsHttpService
      .updateHelpRequestStatus(application.id, FullApplicationStatus.DELETED)
      .pipe(tap(() => this._allHelpRequests!.deleteOne(application.id)))
      .subscribe();
  }

  private throwIfAllHelpRequestsAreUndefined(): void | never {
    if (this._allHelpRequests === undefined) {
      throw new Error('All help requests are not defined!');
    }
  }
}
