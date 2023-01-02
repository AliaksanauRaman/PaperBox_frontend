import { AppEventName } from './../../app-event-name.enum';
import { AppEvent } from '../../app-event.interface';
import { FailedHelpOfferStatusUpdatePayload } from './payload';

export class FailedHelpOfferStatusUpdate
  implements AppEvent<FailedHelpOfferStatusUpdatePayload>
{
  public readonly name = AppEventName.FAILED_HELP_OFFER_STATUS_UPDATE;
  public readonly payload: FailedHelpOfferStatusUpdatePayload;

  constructor(payload: FailedHelpOfferStatusUpdatePayload) {
    this.payload = payload;
  }
}
