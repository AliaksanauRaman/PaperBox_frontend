import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AdminHelpOffersHttpService } from '../../services/admin-help-offers-http.service';

@Component({
  selector: 'app-admin-help-offers-page',
  templateUrl: './admin-help-offers-page.component.html',
  styleUrls: ['./admin-help-offers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHelpOffersPageComponent {
  protected readonly fullPreviewsOfAllHelpOffers$ = this.adminHelpOffersHttpService
    .getFullPreviewsOfAll();

  constructor(
    private readonly adminHelpOffersHttpService: AdminHelpOffersHttpService,
  ) {}
}
