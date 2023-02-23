import { AppEvent } from '../../../events/app-event.interface';
import { AppEventName } from '../../../events/app-event-name.enum';

export class MakeGetPublishedHelpRequestsRequest implements AppEvent {
  public readonly name = AppEventName.MAKE_GET_PUBLISHED_HELP_REQUESTS_REQUEST;
  public readonly payload = null;
}
