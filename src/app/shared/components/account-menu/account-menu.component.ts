import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';

import { LogoutService } from '../../../core/services/logout.service';

@Component({
  exportAs: 'accountMenu',
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatMenuModule, TranslateModule],
})
export class AccountMenuComponent {
  @ViewChild(MatMenu)
  public readonly menuRef!: MatMenu;

  constructor(private readonly logoutService: LogoutService) {}

  public handleLogoutMenuItemClick(): void {
    this.logoutService.doLogout();
  }
}
