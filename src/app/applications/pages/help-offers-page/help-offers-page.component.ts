import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GET_PUBLISHED_APPLICATIONS_STATE_SERVICE } from '../../dependencies/get-published-applications-state-service';
import { GetPublishedHelpOffersService } from '../../services/get-published-help-offers-state.service';
import { DELETE_APPLICATION_STATE_SERVICE } from '../../dependencies/delete-application-state-service';
import { DeleteHelpOfferStateService } from '../../services/delete-help-offer-state.service';

@Component({
  selector: 'app-help-offers-page',
  templateUrl: './help-offers-page.component.html',
  styleUrls: ['./help-offers-page.component.scss'],
  providers: [
    {
      provide: GET_PUBLISHED_APPLICATIONS_STATE_SERVICE,
      useClass: GetPublishedHelpOffersService,
    },
    {
      provide: DELETE_APPLICATION_STATE_SERVICE,
      useClass: DeleteHelpOfferStateService,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpOffersPageComponent {}
