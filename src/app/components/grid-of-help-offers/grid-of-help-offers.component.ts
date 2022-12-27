import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HelpOffersHttpService } from './../../services/help-offers-http.service';

@Component({
  selector: 'app-grid-of-help-offers',
  templateUrl: './grid-of-help-offers.component.html',
  styleUrls: ['./grid-of-help-offers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridOfHelpOffersComponent {
  protected readonly publicPreviewsOfPublishedHelpOffers$ = this.helpOffersHttpService
    .getPublicPreviewsOfPublished();

  constructor(
    private readonly helpOffersHttpService: HelpOffersHttpService,
  ) {}
}
