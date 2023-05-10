import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GET_PUBLISHED_APPLICATIONS_STATE_SERVICE } from '../../dependencies/get-published-applications-state-service';
import { GetPublishedHelpRequestsStateService } from '../../services/get-published-help-requests-state.service';
import {
  APPLICATION_TYPE,
  ApplicationType,
} from '../../dependencies/application-type';

@Component({
  selector: 'app-help-requests-page',
  templateUrl: './help-requests-page.component.html',
  styleUrls: ['./help-requests-page.component.scss'],
  providers: [
    {
      provide: GET_PUBLISHED_APPLICATIONS_STATE_SERVICE,
      useClass: GetPublishedHelpRequestsStateService,
    },
    {
      provide: APPLICATION_TYPE,
      useValue: ApplicationType.HELP_REQUEST,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpRequestsPageComponent {}
