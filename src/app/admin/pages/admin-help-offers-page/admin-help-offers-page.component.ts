import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-help-offers-page',
  templateUrl: './admin-help-offers-page.component.html',
  styleUrls: [
    './admin-help-offers-page.component.scss',
    '../../styles/_admin-page-common.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHelpOffersPageComponent {}
