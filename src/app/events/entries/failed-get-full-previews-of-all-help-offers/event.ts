import { AppEventName } from './../../app-event-name.enum';
import { AppEvent } from '../../app-event.interface';
import { FailedGetFullPreviewsOfAllHelpOffersPayload } from './payload';

export class FailedGetFullPreviewsOfAllHelpOffers
  implements AppEvent<FailedGetFullPreviewsOfAllHelpOffersPayload>
{
  public readonly name =
    AppEventName.FAILED_GET_FULL_PREVIEWS_OF_ALL_HELP_OFFERS;
  public readonly payload: FailedGetFullPreviewsOfAllHelpOffersPayload;

  constructor(payload: FailedGetFullPreviewsOfAllHelpOffersPayload) {
    this.payload = payload;
  }
}
