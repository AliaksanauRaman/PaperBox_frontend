import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import { AdminFullPreviewsOfAllHelpOffersService } from '../../services/admin-full-previews-of-all-help-offers.service';

import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';

@Component({
  selector: 'app-admin-help-offers-page',
  templateUrl: './admin-help-offers-page.component.html',
  styleUrls: ['./admin-help-offers-page.component.scss'],
  providers: [AdminFullPreviewsOfAllHelpOffersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHelpOffersPageComponent
  extends DestroyEmitter
  implements OnInit
{
  public readonly viewContext$ = combineLatest([
    this.fullPreviewsOfAllHelpOffersService.fullPreviewsOfAllHelpOffers$,
    this.fullPreviewsOfAllHelpOffersService.getFullPreviewsOfAllInProgress$,
    this.fullPreviewsOfAllHelpOffersService.getFullPreviewsOfAllError$,
  ]).pipe(
    map(([items, inProgress, error]) => ({
      items,
      inProgress,
      error,
    }))
  );

  constructor(
    private readonly fullPreviewsOfAllHelpOffersService: AdminFullPreviewsOfAllHelpOffersService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.fullPreviewsOfAllHelpOffersService.makeRequestToGetFullPreviewsOfAll();
  }
}
