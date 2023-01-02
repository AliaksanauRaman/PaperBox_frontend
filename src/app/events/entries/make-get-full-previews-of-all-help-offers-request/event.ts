import { AppEvent } from '../../app-event.interface';
import { AppEventName } from '../../app-event-name.enum';

export class MakeGetFullPreviewsOfAllHelpOffersRequest implements AppEvent {
  public readonly name =
    AppEventName.MAKE_GET_FULL_PREVIEWS_OF_ALL_HELP_OFFERS_REQUEST;
  public readonly payload = null;
}
