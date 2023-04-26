import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ActiveViewService } from '../../services/active-view.service';
import { CreateHelpOfferDialogService } from '../../services/create-help-offer-dialog.service';
import { CreateHelpRequestDialogService } from '../../services/create-help-request-dialog.service';
import { UserService } from '../../../shared/services/user.service';
import { LoginOrSignupDialogService } from '../../services/login-or-signup-dialog.service';

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
    private readonly createHelpOfferDialogService: CreateHelpOfferDialogService,
    private readonly createHelpRequestDialogService: CreateHelpRequestDialogService,
    private readonly _userService: UserService,
    private readonly loginOrSignupDialogService: LoginOrSignupDialogService
  ) {}

  public handleOfferHelpButtonClick(): void {
    if (this._userService.isLoggedIn()) {
      this.createHelpOfferDialogService.openDialog();
    } else {
      this.loginOrSignupDialogService.openDialog();
    }
  }

  public handleFindHelpButtonClick(): void {
    if (this._userService.isLoggedIn()) {
      this.createHelpRequestDialogService.openDialog();
    } else {
      this.loginOrSignupDialogService.openDialog();
    }
  }
}
