import { AppEvent } from '../../../events/app-event.interface';
import { AppEventName } from '../../../events/app-event-name.enum';

import { FailedGetPublishedHelpOffersPayload } from './payload';

export class FailedGetPublishedHelpOffers
  implements AppEvent<FailedGetPublishedHelpOffersPayload>
{
  public readonly name = AppEventName.FAILED_GET_PUBLISHED_HELP_OFFERS;

  constructor(public readonly payload: FailedGetPublishedHelpOffersPayload) {}
}
