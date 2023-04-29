import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-settings-page',
  templateUrl: './admin-settings-page.component.html',
  styleUrls: ['../../styles/_admin-page-common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSettingsPageComponent {}
