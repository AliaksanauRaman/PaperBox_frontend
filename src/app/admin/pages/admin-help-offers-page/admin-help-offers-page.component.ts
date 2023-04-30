import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { catchError, map, tap, finalize, takeUntil } from 'rxjs';

import { AdminApplicationsHttpService } from '../../services/admin-applications-http.service';

import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';
import { FullApplicationList } from '../../classes/application-list.class';
import { FullApplicationType } from '../../types/full-application.type';
import { FullApplicationStatus } from '../../enums/full-application-status.enum';

@Component({
  selector: 'app-admin-help-offers-page',
  templateUrl: './admin-help-offers-page.component.html',
  styleUrls: ['../../styles/_admin-page-common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHelpOffersPageComponent
  extends DestroyEmitter
  implements OnInit
{
  protected _loading = true;
  protected _allHelpOffers?: FullApplicationList;
  protected _getAllHelpOffersError = false;

  constructor(
    private readonly _applicationsHttpService: AdminApplicationsHttpService,
    private readonly _cdRef: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this._applicationsHttpService
      .getAllHelpOffers()
      .pipe(
        map((allHelpOffers) => new FullApplicationList(allHelpOffers)),
        tap(
          (fullApplicationList) => (this._allHelpOffers = fullApplicationList)
        ),
        catchError((error: unknown) => {
          this._getAllHelpOffersError = true;
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
    this.throwIfAllHelpOffersAreUndefined();
    this._applicationsHttpService
      .updateHelpOfferStatus(application.id, FullApplicationStatus.PUBLISHED)
      .pipe(tap(() => this._allHelpOffers!.publishOne(application.id)))
      .subscribe();
  }

  protected handleUnpublishApplication(application: FullApplicationType): void {
    this.throwIfAllHelpOffersAreUndefined();
    this._applicationsHttpService
      .updateHelpOfferStatus(application.id, FullApplicationStatus.UNPUBLISHED)
      .pipe(tap(() => this._allHelpOffers!.unpublishOne(application.id)))
      .subscribe();
  }

  protected handleRejectApplication(application: FullApplicationType): void {
    this.throwIfAllHelpOffersAreUndefined();
    this._applicationsHttpService
      .updateHelpOfferStatus(application.id, FullApplicationStatus.REJECTED)
      .pipe(tap(() => this._allHelpOffers!.rejectOne(application.id)))
      .subscribe();
  }

  protected handleDeleteApplication(application: FullApplicationType): void {
    this.throwIfAllHelpOffersAreUndefined();
    this._applicationsHttpService
      .updateHelpOfferStatus(application.id, FullApplicationStatus.DELETED)
      .pipe(tap(() => this._allHelpOffers!.deleteOne(application.id)))
      .subscribe();
  }

  private throwIfAllHelpOffersAreUndefined(): void | never {
    if (this._allHelpOffers === undefined) {
      throw new Error('All help Offers are not defined!');
    }
  }
}
