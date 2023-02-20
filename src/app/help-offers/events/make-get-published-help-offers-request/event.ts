import { AppEvent } from '../../../events/app-event.interface';
import { AppEventName } from '../../../events/app-event-name.enum';

export class MakeGetPublishedHelpOffersRequest implements AppEvent {
  public readonly name = AppEventName.MAKE_GET_PUBLISHED_HELP_OFFERS_REQUEST;
  public readonly payload = null;
}
