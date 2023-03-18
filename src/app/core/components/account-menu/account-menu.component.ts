import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { MatMenu } from '@angular/material/menu';

import { LogoutService } from '../../services/logout.service';

@Component({
  exportAs: 'accountMenu',
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AccountMenuComponent {
  @ViewChild(MatMenu)
  public readonly menuRef!: MatMenu;

  constructor(private readonly logoutService: LogoutService) {}

  public handleLogoutMenuItemClick(): void {
    this.logoutService.doLogout();
  }
}
