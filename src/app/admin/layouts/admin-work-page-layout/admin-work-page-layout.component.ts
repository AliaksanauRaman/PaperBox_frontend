import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LogoutService } from '../../../core/services/logout.service';
import { RoutingService } from '../../../core/services/routing.service';

import { NavigationLinkType } from '../../../shared/types/navigation-link.type';

@Component({
  selector: 'app-admin-work-page-layout',
  templateUrl: './admin-work-page-layout.component.html',
  styleUrls: ['./admin-work-page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminWorkPageLayoutComponent {
  public readonly navLinks: ReadonlyArray<NavigationLinkType> = [
    {
      label: 'Help offers',
      path: '/admin/help-offers',
    },
    {
      label: 'Help requests',
      path: '/admin/help-requests',
    },
    {
      label: 'Users',
      path: '/admin/users',
    },
    {
      label: 'Settings',
      path: '/admin/settings',
    },
  ];

  constructor(
    private readonly _logoutService: LogoutService,
    private readonly _routingService: RoutingService
  ) {}

  protected handleLogoutButtonClick(): void {
    this._logoutService.doLogout();
    this._routingService.navigateToAdminLogin();
  }
}
