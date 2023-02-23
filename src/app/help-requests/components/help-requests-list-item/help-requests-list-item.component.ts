import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PublishedHelpRequestType } from '../../../shared/types/published-help-request.type';

@Component({
  selector: 'app-help-requests-list-item',
  templateUrl: './help-requests-list-item.component.html',
  styleUrls: ['./help-requests-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpRequestsListItemComponent {
  @Input()
  public set publishedHelpRequest(value: PublishedHelpRequestType) {
    this._publishedHelpRequest = value;
  }

  public _publishedHelpRequest?: PublishedHelpRequestType;
}
