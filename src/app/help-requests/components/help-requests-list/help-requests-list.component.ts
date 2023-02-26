import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { GetPublishedHelpRequestsService } from '../../services/get-published-help-requests.service';

@Component({
  selector: 'app-help-requests-list',
  templateUrl: './help-requests-list.component.html',
  styleUrls: ['./help-requests-list.component.scss'],
  providers: [GetPublishedHelpRequestsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpRequestsListComponent implements OnInit, OnDestroy {
  public readonly publishedHelpRequestsState$ =
    this.getPublishedHelpRequestsService.state$;

  constructor(
    private readonly getPublishedHelpRequestsService: GetPublishedHelpRequestsService
  ) {}

  public ngOnInit(): void {
    this.getPublishedHelpRequestsService.makeRequest();
  }

  public ngOnDestroy(): void {
    this.getPublishedHelpRequestsService.destroyRequest();
  }
}
