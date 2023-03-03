import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NavigationLinkType } from '../../../shared/types/navigation-link.type';

@Component({
  selector: 'app-admin-work-page-layout',
  templateUrl: './admin-work-page-layout.component.html',
  styleUrls: ['./admin-work-page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminWorkPageLayoutComponent {
  public readonly navLinks: ReadonlyArray<NavigationLinkType> = [
    {
      label: 'Help offers',
      path: '/admin/help-offers',
      disabled: false,
    },
    {
      label: 'Help requests',
      path: '/admin/help-requests',
      disabled: true,
    },
    {
      label: 'Users',
      path: '/admin/users',
      disabled: true,
    },
    {
      label: 'Settings',
      path: '/admin/settings',
      disabled: true,
    },
  ];
}
