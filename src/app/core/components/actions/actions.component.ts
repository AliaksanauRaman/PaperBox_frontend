import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { UserIsLoggedInStateService } from '../../../state/user-is-logged-in/user-is-logged-in-state.service';
import { ActivePageService } from '../../services/active-page.service';
import { CreateHelpOfferDialogService } from '../../services/create-help-offer-dialog.service';
import { CreateHelpRequestDialogService } from '../../services/create-help-request-dialog.service';
import { LoginOrSignupDialogService } from '../../services/login-or-signup-dialog.service';

import { Page } from '../../../shared/enums/page.enum';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  private readonly _userIsLoggedInStateService = inject(
    UserIsLoggedInStateService
  );

  protected readonly _activePage$ = this._activePageService.value$;
  protected readonly _Page = Page;

  constructor(
    private readonly _activePageService: ActivePageService,
    private readonly _createHelpOfferDialogService: CreateHelpOfferDialogService,
    private readonly _createHelpRequestDialogService: CreateHelpRequestDialogService,
    private readonly _loginOrSignupDialogService: LoginOrSignupDialogService
  ) {}

  protected handleOfferHelpButtonClick(): void {
    if (this._userIsLoggedInStateService.get()) {
      this._createHelpOfferDialogService.openDialog();
    } else {
      this._loginOrSignupDialogService.openDialog();
    }
  }

  protected handleFindHelpButtonClick(): void {
    if (this._userIsLoggedInStateService.get()) {
      this._createHelpRequestDialogService.openDialog();
    } else {
      this._loginOrSignupDialogService.openDialog();
    }
  }
}
