import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, takeUntil, tap } from 'rxjs';

import { AdminHelpOffersPageService } from './admin-help-offers-page.service';

import {
  AppEventBusService,
  AppEventName,
  MakeGetFullPreviewsOfAllHelpOffersRequest,
  SuccessGetFullPreviewsOfAllHelpOffersPayload,
  SuccessHelpOfferStatusUpdatePayload,
} from './../../../events';
import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';
import { HttpRequestStateName } from '../../../shared/enums/http-request-state-name.enum';
import { HelpOfferFullPreviewType } from '../../../shared/types/help-offer-full-preview.type';

@Component({
  selector: 'app-admin-help-offers-page',
  templateUrl: './admin-help-offers-page.component.html',
  styleUrls: ['./admin-help-offers-page.component.scss'],
  providers: [AdminHelpOffersPageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHelpOffersPageComponent
  extends DestroyEmitter
  implements OnInit
{
  private readonly _fullPreviewsOfAllHelpOffers$ = new BehaviorSubject<
    ReadonlyArray<HelpOfferFullPreviewType>
  >([]);
  public readonly fullPreviewsOfAllHelpOffers$ =
    this._fullPreviewsOfAllHelpOffers$.asObservable();

  public readonly httpRequestStateName = HttpRequestStateName;

  constructor(
    private readonly eventBusService: AppEventBusService,
    private readonly service: AdminHelpOffersPageService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.eventBusService.emit(new MakeGetFullPreviewsOfAllHelpOffersRequest());

    this.subToSuccessGetFullPreviewsOfAllHelpOffers();
    this.subToSuccessHelpOfferStatusUpdate();
  }

  private subToSuccessGetFullPreviewsOfAllHelpOffers(): void {
    this.eventBusService
      .on<SuccessGetFullPreviewsOfAllHelpOffersPayload>(
        AppEventName.SUCCESS_GET_FULL_PREVIEWS_OF_ALL_HELP_OFFERS
      )
      .pipe(
        tap((fullPreviewsOfAllHelpOffers) =>
          this._fullPreviewsOfAllHelpOffers$.next(fullPreviewsOfAllHelpOffers)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  // TODO: Move logic to services
  private subToSuccessHelpOfferStatusUpdate(): void {
    this.eventBusService
      .on<SuccessHelpOfferStatusUpdatePayload>(
        AppEventName.SUCCESS_HELP_OFFER_STATUS_UPDATE
      )
      .pipe(
        tap(({ id, newStatus }) => {
          const currentFullPreviewsOfAllHelpOffers =
            this._fullPreviewsOfAllHelpOffers$.getValue();
          this._fullPreviewsOfAllHelpOffers$.next(
            currentFullPreviewsOfAllHelpOffers.map((preview) => {
              if (preview.id !== id) {
                return preview;
              }

              return {
                ...preview,
                status: newStatus,
              };
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
