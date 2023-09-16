import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  ViewChild,
  inject,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { UserStateService } from '../../../state/user/user-state.service';
import { RoutingService } from '../../../core/services/routing.service';
import { LogoutService } from '../../../core/services/logout.service';
import { CommandsPanelService } from '@core/commands/commands-panel.service';

import { UserRole } from '../../enums/user-role.enum';

@Component({
  exportAs: 'accountMenu',
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgIf, AsyncPipe, MatMenuModule, MatIconModule, TranslateModule],
})
export class AccountMenuComponent {
  @ViewChild(MatMenu)
  public readonly menuRef!: MatMenu;

  protected readonly _UserRole = UserRole;

  protected readonly _userStateService = inject(UserStateService);
  private readonly _routingService = inject(RoutingService);
  private readonly _logoutService = inject(LogoutService);
  private readonly _commandPanelService = inject(CommandsPanelService);

  protected handleAdminClick(): void {
    this._routingService.navigateToAdminHome();
  }

  protected handleCommandPanelClick(): void {
    this._commandPanelService.show();
  }

  protected handleLogoutMenuItemClick(): void {
    this._logoutService.doLogout();
  }
}
