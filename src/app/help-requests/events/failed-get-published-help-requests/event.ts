import { AppEvent } from '../../../events/app-event.interface';
import { AppEventName } from '../../../events/app-event-name.enum';

import { FailedGetPublishedHelpRequestsPayload } from './payload';

export class FailedGetPublishedHelpRequests
  implements AppEvent<FailedGetPublishedHelpRequestsPayload>
{
  public readonly name = AppEventName.FAILED_GET_PUBLISHED_HELP_REQUESTS;

  constructor(public readonly payload: FailedGetPublishedHelpRequestsPayload) {}
}
