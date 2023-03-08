import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { GetPublishedHelpOffersService } from '../../services/get-published-help-offers.service';

@Component({
  selector: 'app-help-offers-list',
  templateUrl: './help-offers-list.component.html',
  styleUrls: ['./help-offers-list.component.scss'],
  providers: [GetPublishedHelpOffersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpOffersListComponent implements OnInit, OnDestroy {
  public readonly publishedHelpOffersState$ =
    this.getPublishedHelpOffersService.state$;

  constructor(
    private readonly getPublishedHelpOffersService: GetPublishedHelpOffersService
  ) {}

  public ngOnInit(): void {
    this.getPublishedHelpOffersService.performRequest();
  }

  public ngOnDestroy(): void {
    this.getPublishedHelpOffersService.destroyRequest();
  }

  public handleReloadClick(): void {
    this.getPublishedHelpOffersService.performRequest();
  }
}
