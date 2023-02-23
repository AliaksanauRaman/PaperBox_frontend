import { AppEvent } from '../../../events/app-event.interface';
import { AppEventName } from '../../../events/app-event-name.enum';

import { SuccessGetPublishedHelpRequestsPayload } from './payload';

export class SuccessGetPublishedHelpRequests
  implements AppEvent<SuccessGetPublishedHelpRequestsPayload>
{
  public readonly name = AppEventName.SUCCESS_GET_PUBLISHED_HELP_REQUESTS;

  constructor(public readonly payload: SuccessGetPublishedHelpRequestsPayload) {}
}
