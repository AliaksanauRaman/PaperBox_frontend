import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ActiveViewService } from '../../services/active-view.service';
import { OfferHelpDialogService } from '../../services/offer-help-dialog.service';

import { ViewName } from '../../../shared/enums/view-name.enum';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  public readonly activeView$ = this.activeViewService.activeView$;
  public readonly viewName = ViewName;

  constructor(
    private readonly activeViewService: ActiveViewService,
    private readonly offerHelpDialogService: OfferHelpDialogService,
  ) {}

  public handleOfferHelpButtonClick(): void {
    this.offerHelpDialogService.openDialog();
  }

  public handleFindHelpButtonClick(): void {
    // TODO
  }
}
