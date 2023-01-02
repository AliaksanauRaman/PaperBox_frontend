import { AppEventName } from './../../app-event-name.enum';
import { AppEvent } from '../../app-event.interface';
import { SuccessGetFullPreviewsOfAllHelpOffersPayload } from './payload';

export class SuccessGetFullPreviewsOfAllHelpOffers
  implements AppEvent<SuccessGetFullPreviewsOfAllHelpOffersPayload>
{
  public readonly name =
    AppEventName.SUCCESS_GET_FULL_PREVIEWS_OF_ALL_HELP_OFFERS;
  public readonly payload: SuccessGetFullPreviewsOfAllHelpOffersPayload;

  constructor(payload: SuccessGetFullPreviewsOfAllHelpOffersPayload) {
    this.payload = payload;
  }
}
