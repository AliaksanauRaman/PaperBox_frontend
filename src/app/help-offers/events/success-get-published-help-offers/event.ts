import { AppEvent } from '../../../events/app-event.interface';
import { AppEventName } from '../../../events/app-event-name.enum';

import { SuccessGetPublishedHelpOffersPayload } from './payload';

export class SuccessGetPublishedHelpOffers
  implements AppEvent<SuccessGetPublishedHelpOffersPayload>
{
  public readonly name = AppEventName.SUCCESS_GET_PUBLISHED_HELP_OFFERS;

  constructor(public readonly payload: SuccessGetPublishedHelpOffersPayload) {}
}
