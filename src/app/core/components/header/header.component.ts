import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { UserIsLoggedInStateService } from '../../../state/user-is-logged-in/user-is-logged-in-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly _userIsLoggedInStateService = inject(
    UserIsLoggedInStateService
  );
}
