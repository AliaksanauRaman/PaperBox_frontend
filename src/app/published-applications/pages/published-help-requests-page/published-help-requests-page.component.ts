import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';

import { PublishedApplicationsService } from '../../services/published-applications.service';
import { PublishedHelpRequestsService } from '../../services/published-help-requests.service';

import { PublishedApplicationsLoadingViewComponent } from '../../views/published-applications-loading-view/published-applications-loading-view.component';
import { PublishedApplicationsContentViewComponent } from '../../views/published-applications-content-view/published-applications-content-view.component';
import { PublishedApplicationsErrorViewComponent } from '../../views/published-applications-error-view/published-applications-error-view.component';

import { PublishedApplicationsPageComponent } from '../published-applications-page.component';

@Component({
  selector: 'app-published-help-requests-page',
  templateUrl: './published-help-requests-page.component.html',
  styleUrls: ['./published-help-requests-page.component.scss'],
  providers: [
    {
      provide: PublishedApplicationsService,
      useClass: PublishedHelpRequestsService,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    PublishedApplicationsLoadingViewComponent,
    PublishedApplicationsContentViewComponent,
    PublishedApplicationsErrorViewComponent,
  ],
})
export class PublishedHelpRequestsPageComponent extends PublishedApplicationsPageComponent {}
