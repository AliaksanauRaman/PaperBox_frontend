import { FailedGetFullPreviewsOfAllHelpOffers } from './../../../events/entries/failed-get-full-previews-of-all-help-offers/event';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AppEventBusService,
  AppEventName,
  SuccessGetFullPreviewsOfAllHelpOffers,
} from './../../../events';
import { AdminHelpOffersHttpService } from '../../services/admin-help-offers-http.service';
import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';
import { catchError, of, switchMap, takeUntil, tap } from 'rxjs';

@Injectable()
export class AdminHelpOffersPageService extends DestroyEmitter {
  constructor(
    private readonly adminHelpOffersHttpService: AdminHelpOffersHttpService,
    private readonly eventBusService: AppEventBusService
  ) {
    super();

    this.subToGetFullPreviewsOfAllHelpOffers();
  }

  private subToGetFullPreviewsOfAllHelpOffers(): void {
    this.eventBusService
      .on(AppEventName.MAKE_GET_FULL_PREVIEWS_OF_ALL_HELP_OFFERS_REQUEST)
      .pipe(
        switchMap(() => this.adminHelpOffersHttpService.getFullPreviewsOfAll()),
        tap((result) =>
          this.eventBusService.emit(
            new SuccessGetFullPreviewsOfAllHelpOffers(result)
          )
        ),
        catchError((error: HttpErrorResponse) => {
          this.eventBusService.emit(
            new FailedGetFullPreviewsOfAllHelpOffers(error)
          );
          return of(null);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
