import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { ActiveViewService } from '../../../core/services/active-view.service';

@Component({
  selector: 'app-help-offers-page',
  templateUrl: './help-offers-page.component.html',
  styleUrls: ['./help-offers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// TODO: Finish
export class HelpOffersPageComponent implements OnDestroy {
  constructor(private readonly _activeViewService: ActiveViewService) {}

  public ngOnDestroy(): void {
    this._activeViewService.resetActiveView();
  }
}
