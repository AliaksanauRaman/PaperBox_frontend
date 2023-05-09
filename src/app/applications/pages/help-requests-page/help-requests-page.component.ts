import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GET_PUBLISHED_APPLICATIONS_STATE_SERVICE } from '../../dependencies/get-published-applications-state-service';
import { GetPublishedHelpRequestsStateService } from '../../services/get-published-help-requests-state.service';
import { DELETE_APPLICATION_STATE_SERVICE } from '../../dependencies/delete-application-state-service';
import { DeleteHelpRequestStateService } from '../../services/delete-help-request-state.service';

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
      provide: DELETE_APPLICATION_STATE_SERVICE,
      useClass: DeleteHelpRequestStateService,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpRequestsPageComponent {}
