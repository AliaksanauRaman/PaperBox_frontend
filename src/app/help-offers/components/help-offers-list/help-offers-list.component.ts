import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PublishedHelpOffersService } from '../../services/published-help-offers.service';

@Component({
  selector: 'app-help-offers-list',
  templateUrl: './help-offers-list.component.html',
  styleUrls: ['./help-offers-list.component.scss'],
  providers: [PublishedHelpOffersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpOffersListComponent implements OnInit {
  public readonly publishedHelpOffersState$ =
    this.publishedHelpOffersService.state$;

  constructor(
    private readonly publishedHelpOffersService: PublishedHelpOffersService
  ) {}

  public ngOnInit(): void {
    this.publishedHelpOffersService.makeGetHttpRequest();
  }
}
