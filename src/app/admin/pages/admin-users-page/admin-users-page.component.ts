import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['../../styles/_admin-page-common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUsersPageComponent {}
