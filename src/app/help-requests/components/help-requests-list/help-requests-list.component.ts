import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PublishedHelpRequestsService } from '../../services/published-help-requests.service';

@Component({
  selector: 'app-help-requests-list',
  templateUrl: './help-requests-list.component.html',
  styleUrls: ['./help-requests-list.component.scss'],
  providers: [PublishedHelpRequestsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpRequestsListComponent implements OnInit {
  public readonly publishedHelpRequestsState$ =
    this.publishedHelpRequestsService.state$;

  constructor(
    private readonly publishedHelpRequestsService: PublishedHelpRequestsService
  ) {}

  public ngOnInit(): void {
    this.publishedHelpRequestsService.makeGetHttpRequest();
  }
}
