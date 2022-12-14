import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HelpOffersService } from './../../services/help-offers.service';

@Component({
  selector: 'app-help-offers-board-header',
  templateUrl: './help-offers-board-header.component.html',
  styleUrls: ['./help-offers-board-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpOffersBoardHeaderComponent {
  constructor(
    private readonly helpOffersService: HelpOffersService,
  ) {}

  protected handleHelpButtonClick(): void {
    this.helpOffersService.openNewHelpOfferDialog();
  }
}
