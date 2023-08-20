import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SpinnerModule } from '@shared/components/spinner/spinner.module';

@Component({
  selector: 'app-published-applications-loading-view',
  templateUrl: './published-applications-loading-view.component.html',
  styleUrls: ['./published-applications-loading-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SpinnerModule],
})
export class PublishedApplicationsLoadingViewComponent {}
