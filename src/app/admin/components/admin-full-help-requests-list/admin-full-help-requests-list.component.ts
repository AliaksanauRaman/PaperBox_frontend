import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FullHelpRequestType } from '../../types/full-help-request.type';

@Component({
  selector: 'app-admin-full-help-requests-list',
  templateUrl: './admin-full-help-requests-list.component.html',
  styleUrls: ['./admin-full-help-requests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFullHelpRequestsListComponent {
  @Input()
  public set fullHelpRequestsList(value: ReadonlyArray<FullHelpRequestType>) {
    this._fullHelpRequestsList = value;
  }

  public _fullHelpRequestsList: ReadonlyArray<FullHelpRequestType> = [];
}
