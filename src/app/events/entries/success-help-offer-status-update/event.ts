import { AppEventName } from './../../app-event-name.enum';
import { AppEvent } from '../../app-event.interface';
import { SuccessHelpOfferStatusUpdatePayload } from './payload';

export class SuccessHelpOfferStatusUpdate
  implements AppEvent<SuccessHelpOfferStatusUpdatePayload>
{
  public readonly name = AppEventName.SUCCESS_HELP_OFFER_STATUS_UPDATE;
  public readonly payload: SuccessHelpOfferStatusUpdatePayload;

  constructor(payload: SuccessHelpOfferStatusUpdatePayload) {
    this.payload = payload;
  }
}
