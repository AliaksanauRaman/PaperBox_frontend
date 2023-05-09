import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { ActiveViewService } from '../../../core/services/active-view.service';

@Component({
  selector: 'app-help-requests-page',
  templateUrl: './help-requests-page.component.html',
  styleUrls: ['./help-requests-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// TODO: Finish
export class HelpRequestsPageComponent implements OnDestroy {
  constructor(private readonly _activeViewService: ActiveViewService) {}

  public ngOnDestroy(): void {
    this._activeViewService.resetActiveView();
  }
}
