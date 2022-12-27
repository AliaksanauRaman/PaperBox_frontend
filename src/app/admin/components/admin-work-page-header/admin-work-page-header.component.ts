import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-work-page-header',
  templateUrl: './admin-work-page-header.component.html',
  styleUrls: ['./admin-work-page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminWorkPageHeaderComponent {
  // TODO: Temp
  protected readonly links = [
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
  ];
}
