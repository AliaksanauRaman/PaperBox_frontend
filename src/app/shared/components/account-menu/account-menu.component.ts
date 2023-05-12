import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { LogoutService } from '../../../core/services/logout.service';
import { UserService } from '../../services/user.service';
import { RoutingService } from '../../../core/services/routing.service';
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

  protected readonly _user$ = this._userService.value$;
  protected readonly _UserRole = UserRole;

  constructor(
    private readonly _logoutService: LogoutService,
    private readonly _userService: UserService,
    private readonly _routingService: RoutingService
  ) {}

  protected handleAdminClick(): void {
    this._routingService.navigateToAdminHome();
  }

  protected handleLogoutMenuItemClick(): void {
    this._logoutService.doLogout();
  }
}
