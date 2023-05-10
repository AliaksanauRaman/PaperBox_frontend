import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GET_PUBLISHED_APPLICATIONS_STATE_SERVICE } from '../../dependencies/get-published-applications-state-service';
import { GetPublishedHelpOffersService } from '../../services/get-published-help-offers-state.service';
import {
  APPLICATION_TYPE,
  ApplicationType,
} from '../../dependencies/application-type';

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
      provide: APPLICATION_TYPE,
      useValue: ApplicationType.HELP_OFFER,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpOffersPageComponent {}
